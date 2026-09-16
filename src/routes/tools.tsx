import { createFileRoute } from "@tanstack/react-router";
import { AdSlot } from "#/components/AdSlot";
import { ToolCard } from "#/components/ToolCard";
import { heading, muted, sectionWrap } from "#/components/ui";
import { pageHead } from "#/lib/seo";
import { SITE_NAME } from "#/lib/site";
import { TOOLS, TOOL_CATEGORIES } from "#/lib/tools";

export const Route = createFileRoute("/tools")({
  head: () =>
    pageHead({
      title: `All PDF Tools — Compress, Merge, Split and Convert | ${SITE_NAME}`,
      description:
        "Every free PDF tool in one place: compress, merge, split, rotate, delete pages, extract pages, PDF to JPG and JPG to PDF. No account needed.",
      path: "/tools",
    }),
  component: AllTools,
});

const CATEGORY_BLURBS: Record<string, string> = {
  "AI Tools": "Summarize, chat with, quiz, and take notes from your PDFs using AI.",
  "Organize PDF": "Rearrange, trim and fix the pages inside a document.",
  Convert: "Move between PDF and image formats.",
  Optimize: "Make a file smaller without leaving the browser.",
};

function AllTools() {
  return (
    <div className={`${sectionWrap} py-12 sm:py-16`}>
      <header className="max-w-2xl animate-slide-in-left">
        <h1 className={heading.h1}>All PDF Tools</h1>
        <p className={`mt-3 text-lg ${muted}`}>
          {TOOLS.length} tools for the everyday PDF jobs. Every one of them runs
          in your browser, needs no account, and hands the file straight back to
          you.
        </p>
      </header>

      {TOOL_CATEGORIES.map((category, index) => {
        const tools = TOOLS.filter((tool) => tool.category === category);
        return (
          <section
            key={category}
            aria-labelledby={`cat-${index}`}
            className="mt-12 first:mt-14"
          >
            <h2 id={`cat-${index}`} className={heading.h2}>
              {category}
            </h2>
            <p className={`mt-1.5 ${muted}`}>{CATEGORY_BLURBS[category]}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-bounce">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <ToolCard tool={tool} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <AdSlot />

      <section className="rounded-2xl bg-ink-50 p-6 sm:p-8 dark:bg-ink-900/50 animate-blur-in">
        <h2 className={heading.h3}>Cannot find what you need?</h2>
        <p className={`mt-2 max-w-2xl text-sm ${muted}`}>
          We would rather build eight tools that work every time than fifty that
          mostly do. If there is a PDF job you keep doing by hand, tell us what it
          is and it goes on the list.
        </p>
      </section>
    </div>
  );
}
