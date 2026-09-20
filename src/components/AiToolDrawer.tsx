import { Link } from "@tanstack/react-router";
import { CloseIcon, ToolIcon } from "./Icons";
import { TOOLS } from "#/lib/tools";

export function AiToolDrawer({ onClose }: { onClose: () => void }) {
  const tools = TOOLS.filter((tool) => tool.category === "AI Tools");

  return (
    <>
      <button
        type="button"
        className="ai-drawer-backdrop"
        aria-label="Close AI tools"
        onClick={onClose}
      />
      <aside className="ai-tool-drawer" aria-label="AI tools" aria-modal="true">
        <div className="ai-drawer-header">
          <div>
            <p className="ai-drawer-kicker">PDF TOOL AI</p>
            <h2>AI Tools</h2>
            <p>Choose an AI tool for your PDF.</p>
          </div>
          <button type="button" onClick={onClose} className="ai-drawer-close" aria-label="Close AI tools">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <ul className="ai-drawer-list">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link to={tool.href} onClick={onClose} className="ai-drawer-tool">
                <span className="ai-drawer-icon">
                  <ToolIcon name={tool.icon} className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong>{tool.name}</strong>
                  <small>{tool.blurb}</small>
                </span>
                <span className="ai-drawer-arrow" aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
