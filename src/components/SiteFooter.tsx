import { Link } from "@tanstack/react-router";
import { SITE_NAME, SITE_TAGLINE } from "#/lib/site";
import { PdfFileIcon } from "./Icons";

const TOOL_LINKS = [
  { to: "/compress-pdf", label: "Compress PDF" },
  { to: "/merge-pdf", label: "Merge PDF" },
  { to: "/split-pdf", label: "Split PDF" },
  { to: "/pdf-to-jpg", label: "PDF to JPG" },
  { to: "/jpg-to-pdf", label: "JPG to PDF" },
] as const;

const MORE_LINKS = [
  { to: "/ai-summarizer", label: "AI Summarizer" },
  { to: "/ai-chat", label: "AI Chat" },
  { to: "/ai-quiz", label: "AI Quiz" },
  { to: "/ai-notes", label: "AI Notes" },
  { to: "/tools", label: "All Tools" },
] as const;

const SITE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
] as const;

function Column({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink-900 dark:text-white">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-ink-600 transition-colors hover:text-brand-700 dark:text-ink-400 dark:hover:text-brand-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-ink-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <PdfFileIcon className="h-4.5 w-4.5" />
              </span>
              <span className="font-bold tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-600 dark:text-ink-400">
              {SITE_TAGLINE} Everything runs in your own browser, so your files
              never leave your device.
            </p>
          </div>
          <Column title="Popular tools" links={TOOL_LINKS} />
          <Column title="More tools" links={MORE_LINKS} />
          <Column title="Site" links={SITE_LINKS} />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-200 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between dark:border-ink-800 dark:text-ink-500">
          <p>© 2026 {SITE_NAME}</p>
          <p>A product of Aifinancepk.</p>
        </div>
      </div>
    </footer>
  );
}
