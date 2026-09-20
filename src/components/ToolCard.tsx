import { Link } from "@tanstack/react-router";
import type { Tool } from "#/lib/tools";
import { ArrowRightIcon, ToolIcon } from "./Icons";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="tool-card-motion group relative flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-ink-200/80 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-600/10 hover:ring-brand-300 dark:bg-ink-900 dark:ring-ink-800 dark:hover:shadow-black/30 dark:hover:ring-brand-600/60 hover-lift card-glow">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-600/15 dark:text-brand-300 dark:group-hover:bg-brand-600 dark:group-hover:text-white">
        <ToolIcon name={tool.icon} className="h-5.5 w-5.5" />
      </span>

      <h3 className="mt-5 text-base font-semibold text-ink-900 dark:text-white">
        <Link to={tool.href} className="before:absolute before:inset-0 before:content-['']">
          {tool.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{tool.blurb}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all duration-150 group-hover:gap-2.5 dark:text-brand-300">
        Use Tool
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
      </span>
    </div>
  );
}
