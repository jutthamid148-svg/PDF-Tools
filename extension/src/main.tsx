import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CATEGORIES, QUICK_TOOLS, SITE_URL, STORAGE_KEY, TOOLS, toolUrl, type ExtensionTool } from "./toolsConfig";
import "./styles.css";

interface Preferences {
  favorites: string[];
  recent: string[];
  theme: "system" | "light" | "dark";
  defaultTool: string;
}

const DEFAULT_PREFERENCES: Preferences = { favorites: [], recent: [], theme: "system", defaultTool: "/ai-summarizer" };

async function readPreferences(): Promise<Preferences> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const saved = result[STORAGE_KEY] as Partial<Preferences> | undefined;
    return { ...DEFAULT_PREFERENCES, ...saved, favorites: saved?.favorites ?? [], recent: saved?.recent ?? [] };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

async function writePreferences(preferences: Preferences): Promise<void> {
  try { await chrome.storage.local.set({ [STORAGE_KEY]: preferences }); } catch { /* Popup still works without persistence. */ }
}

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<string, React.ReactNode> = {
    compress: <><path d="M4 9V6a2 2 0 0 1 2-2h3M20 9V6a2 2 0 0 0-2-2h-3M4 15v3a2 2 0 0 0 2 2h3M20 15v3a2 2 0 0 1-2 2h-3"/><path d="M8 12h8m-6-2.5 2-2 2 2m-4 5 2 2 2-2"/></>,
    merge: <><rect x="3" y="3" width="9" height="11" rx="2"/><rect x="12" y="10" width="9" height="11" rx="2"/><path d="M7 18h4"/></>,
    split: <><path d="M12 3v6m0 6v6M4 12h16" strokeDasharray="3 3"/><path d="m9 6 3-3 3 3m-6 12 3 3 3-3"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 17 5-5 4.5 4.5L17 13l3 3"/></>,
    file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v4a1 1 0 0 0 1 1h4M8 14h8m-8 4h5"/></>,
    rotate: <><path d="M20 11a8 8 0 1 0-2.6 5.9"/><path d="M20 5v6h-6"/></>,
    watermark: <><path d="M4 5h16v14H4zM7 16l10-8"/><path d="M7 9h.01M17 15h.01"/></>,
    sign: <><path d="M4 19c3-5 4-9 6-9s-1 6 1 6 3-5 5-5 0 4 4 4M4 21h16"/></>,
    numbers: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v4a1 1 0 0 0 1 1h4M8 12h8M8 16h3m5 0h.01"/></>,
    reorder: <><rect x="4" y="4" width="11" height="7" rx="1.5"/><rect x="9" y="13" width="11" height="7" rx="1.5"/><path d="M18 7h2m-2-2 2 2-2 2"/></>,
    delete: <><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7m-6 4v6m4-6v6"/></>,
    extract: <><path d="M8 16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6l4 4v2"/><rect x="10" y="10" width="10" height="11" rx="2"/><path d="M13 15h4m-4 3h4"/></>,
    spark: <><path d="M12 3v5m0 8v5M4 12h5m6 0h5"/><circle cx="12" cy="12" r="3"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-4-.9L4 20l1-3.6a7 7 0 0 1-1-4.1 7.5 7.5 0 0 1 8-6.8 7.5 7.5 0 0 1 8 6z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    quiz: <><path d="M9 9a3 3 0 1 1 4.8 2.4c-1.3 1-1.8 1.4-1.8 2.6M12 18h.01"/><circle cx="12" cy="12" r="9"/></>,
    notes: <><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></>,
    translate: <><path d="M4 5h8M8 3v2m-3 4c1 2.7 3 4.4 6 5.5M7 14c1.6-1.2 2.8-2.6 3.6-4M14 5h6m-3 0v15m-4-4h8"/></>,
    wand: <><path d="m15 4 5 5M4 20l12-12M14 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/></>,
    ask: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1-1.5 2M12 16h.01"/></>,
    presentation: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4M7 9h10M7 12h6"/></>,
    cards: <><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
    citation: <><path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4"/></>,
    grammar: <><path d="M4 5h16M4 12h16M4 19h10"/><path d="m16 17 2 2 3-4"/></>,
    analyze: <><path d="M4 19V5h16v14zM8 15v-3m4 3V8m4 7v-5"/></>,
    resume: <><circle cx="12" cy="8" r="3"/><path d="M5 20a7 7 0 0 1 14 0M4 4h16v17H4z"/></>,
    questions: <><path d="M4 5h16v14H4zM8 9h8M8 13h5"/><circle cx="17" cy="17" r="2"/></>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L9 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H7.7v-2h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L9 9l1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L20 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2h-.2a1.7 1.7 0 0 0-1.7 1z"/></>,
    back: <><path d="m15 18-6-6 6-6M9 12h11"/></>,
    arrow: <><path d="M4 12h15m-6-6 6 6-6 6"/></>,
  };
  return <svg {...common}>{paths[name] ?? paths.file}</svg>;
}

function Brand() {
  return <div className="brand"><img src={chrome.runtime.getURL("icons/icon-128.svg")} alt=""/><span>PDF Tool</span></div>;
}

function ToolRow({ tool, favorite, onOpen, onToggleFavorite }: { tool: ExtensionTool; favorite: boolean; onOpen: (tool: ExtensionTool) => void; onToggleFavorite: (tool: ExtensionTool) => void }) {
  return <div className="tool-row">
    <button className="tool-open" type="button" onClick={() => onOpen(tool)}>
      <span className="tool-icon"><Icon name={tool.icon} /></span>
      <span className="tool-copy"><strong>{tool.name}</strong><small>{tool.description}</small></span>
    </button>
    <button className={`favorite ${favorite ? "is-favorite" : ""}`} type="button" aria-label={favorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`} onClick={() => onToggleFavorite(tool)}>{favorite ? "★" : "☆"}</button>
  </div>;
}

function Popup() {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [query, setQuery] = useState("");
  const [settings, setSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => { void readPreferences().then(setPreferences); void chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => setActiveTab(tabs[0] ?? null)).catch(() => setActiveTab(null)); }, []);
  useEffect(() => { const root = document.documentElement; const dark = preferences.theme === "dark" || (preferences.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches); root.classList.toggle("dark", dark); }, [preferences.theme]);

  const pdfUrl = activeTab?.url && /^https?:\/\//i.test(activeTab.url) && /\.pdf(?:[?#]|$)/i.test(activeTab.url) ? activeTab.url : null;
  const visibleTools = useMemo(() => { const normalized = query.trim().toLowerCase(); return TOOLS.filter((tool) => !normalized || `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(normalized)); }, [query]);
  const recentTools = preferences.recent.map((id) => TOOLS.find((tool) => tool.id === id)).filter((tool): tool is ExtensionTool => Boolean(tool));
  const favoriteTools = preferences.favorites.map((id) => TOOLS.find((tool) => tool.id === id)).filter((tool): tool is ExtensionTool => Boolean(tool));

  function save(next: Preferences) { setPreferences(next); void writePreferences(next).catch(() => setStorageError(true)); }
  function openTool(tool: ExtensionTool, sourceUrl?: string) { save({ ...preferences, recent: [tool.id, ...preferences.recent.filter((id) => id !== tool.id)].slice(0, 5) }); void chrome.tabs.create({ url: toolUrl(tool, sourceUrl) }); }
  function toggleFavorite(tool: ExtensionTool) { const favorites = preferences.favorites.includes(tool.id) ? preferences.favorites.filter((id) => id !== tool.id) : [...preferences.favorites, tool.id]; save({ ...preferences, favorites }); }
  function openWebsite() { void chrome.tabs.create({ url: SITE_URL }); }

  if (settings) return <main className="popup"><header className="topbar"><button className="icon-button" type="button" onClick={() => setSettings(false)} aria-label="Back"><Icon name="back" /></button><Brand /><span className="top-spacer" /></header><section className="settings-page"><h1>Settings</h1><p className="muted">Keep the companion quick and private.</p><label className="setting-row"><span>Default tool</span><select value={preferences.defaultTool} onChange={(event) => save({ ...preferences, defaultTool: event.target.value })}>{TOOLS.filter((tool) => tool.category === "AI Tools" || tool.popular).map((tool) => <option key={tool.route} value={tool.route}>{tool.name}</option>)}</select></label><label className="setting-row"><span>Theme</span><select value={preferences.theme} onChange={(event) => save({ ...preferences, theme: event.target.value as Preferences["theme"] })}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label><button className="wide-button secondary" type="button" onClick={openWebsite}>Open website</button><button className="wide-button secondary" type="button" onClick={() => save({ ...preferences, recent: [] })}>Clear recent tools</button><button className="wide-button secondary" type="button" onClick={() => save({ ...preferences, favorites: [] })}>Clear favorites</button><div className="privacy-note"><strong>Privacy</strong><p>The extension stores only tool preferences. It does not store PDFs, document text, passwords or API keys. PDF files open in the website only after you choose an action.</p></div><p className="version">PDF Tool Extension v1.0.0</p></section></main>;

  return <main className="popup"><header className="topbar"><Brand /><span className="top-spacer" /><button className="icon-button" type="button" onClick={() => setSettings(true)} aria-label="Open settings"><Icon name="settings" /></button></header><section className="welcome"><div><p className="eyebrow">PDF TOOL COMPANION</p><h1>Work with PDFs faster.</h1><p>Open a trusted PDF tool in one click.</p></div><span className="welcome-mark"><Icon name="spark" size={24} /></span></section>{pdfUrl ? <section className="current-page"><div><strong>PDF detected on this page</strong><small className="truncate">{activeTab?.title || pdfUrl}</small></div><button type="button" onClick={() => openTool(TOOLS.find((tool) => tool.route === preferences.defaultTool) ?? QUICK_TOOLS[0], pdfUrl)}>Use current PDF</button></section> : <section className="current-page subtle"><span>No PDF detected in the current tab.</span><button type="button" onClick={openWebsite}>Open PDF Tool</button></section>}<label className="search"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search PDF tools" aria-label="Search PDF tools" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}</label><div className="content">{storageError && <p className="notice">Preferences could not be saved in this browser session.</p>}{query ? <section className="tool-section"><SectionTitle title="Search results" count={visibleTools.length} />{visibleTools.length ? visibleTools.map((tool) => <ToolRow key={tool.id} tool={tool} favorite={preferences.favorites.includes(tool.id)} onOpen={openTool} onToggleFavorite={toggleFavorite} />) : <p className="empty">No matching tools.</p>}</section> : <><section className="tool-section"><SectionTitle title="Quick access" />{QUICK_TOOLS.map((tool) => <ToolRow key={tool.id} tool={tool} favorite={preferences.favorites.includes(tool.id)} onOpen={openTool} onToggleFavorite={toggleFavorite} />)}</section>{favoriteTools.length > 0 && <section className="tool-section"><SectionTitle title="Favorites" />{favoriteTools.map((tool) => <ToolRow key={tool.id} tool={tool} favorite onOpen={openTool} onToggleFavorite={toggleFavorite} />)}</section>}{recentTools.length > 0 && <section className="tool-section"><SectionTitle title="Recent" />{recentTools.map((tool) => <ToolRow key={tool.id} tool={tool} favorite={preferences.favorites.includes(tool.id)} onOpen={openTool} onToggleFavorite={toggleFavorite} />)}</section>}{CATEGORIES.map((category) => <section className="tool-section" key={category}><SectionTitle title={category} />{TOOLS.filter((tool) => tool.category === category).slice(0, category === "AI Tools" ? 12 : 5).map((tool) => <ToolRow key={tool.id} tool={tool} favorite={preferences.favorites.includes(tool.id)} onOpen={openTool} onToggleFavorite={toggleFavorite} />)}{TOOLS.filter((tool) => tool.category === category).length > (category === "AI Tools" ? 12 : 5) && <button className="see-all" type="button" onClick={() => openWebsite()}>See all {category}</button>}</section>)}</>}</div><footer><button type="button" onClick={openWebsite}>Open full PDF Tool website <Icon name="arrow" size={14} /></button><span>Files stay in your browser.</span></footer></main>;
}

function SectionTitle({ title, count }: { title: string; count?: number }) { return <div className="section-title"><h2>{title}</h2>{count !== undefined && <span>{count}</span>}</div>; }

createRoot(document.getElementById("root")!).render(<Popup />);
