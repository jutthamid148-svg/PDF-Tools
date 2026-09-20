import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage, Block, Bullets } from "#/components/Prose";
import { pageHead } from "#/lib/seo";
import { SITE_NAME } from "#/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: `About | ${SITE_NAME}`,
      description: `Learn about the mission, owner, and privacy-first approach behind ${SITE_NAME}.`,
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <ArticlePage
      title="About"
      intro={`Meet the person behind ${SITE_NAME}: a privacy-first PDF toolkit built to make document work faster, simpler, and safer.`}
      updated="20 September 2026"
    >
      <div className="overflow-hidden rounded-[28px] border border-ink-200 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900/40">
        <img
          src="/about-portrait.jpg"
          alt="Portrait of the owner of PDF Quick Tools"
          className="h-[520px] w-full object-cover"
          style={{ objectPosition: "center 18%" }}
        />
      </div>

      <Block title="Our story">
        <p>
          PDF Quick Tools was created to solve a practical problem: people need
          quick, reliable tools for PDF work without paying for complicated
          software or handing their files to unknown services. The goal is simple:
          make document work straightforward and keep trust intact.
        </p>
        <p>
          The site is built around a core belief that users should stay in control
          of their files. Everything important runs in the browser, on the device
          you already have, so the process stays private, fast, and transparent.
        </p>
      </Block>

      <Block title="What we stand for">
        <Bullets
          items={[
            "Simple tools that do one job clearly and well.",
            "Zero account friction and no unnecessary signup steps.",
            "Privacy-first processing that keeps documents on the user's device.",
            "Open and honest communication about functionality, limits, and risks.",
          ]}
        />
      </Block>

      <Block title="Google policy alignment">
        <p>
          This project is designed to align with Google quality, transparency, and
          user-safety principles. That includes being clear about what the site
          does, keeping user data handling simple, avoiding deceptive practices,
          and respecting the user's right to privacy and control over their own
          documents.
        </p>
        <Bullets
          items={[
            "No hidden collection of document contents or personal file data.",
            "No surprise account creation or confusing consent flows.",
            "Clear user-facing information about privacy, terms, and how the tools work.",
            "A focus on useful, safe functionality instead of low-quality or misleading claims.",
          ]}
        />
      </Block>

      <Block title="Built for everyday use">
        <p>
          Whether you need to merge PDFs, split a document, compress a file, or
          convert between formats, the tools are designed to be quick to open and
          quick to trust. The user experience is intentionally clean so that the
          job gets done without clutter or confusion.
        </p>
      </Block>
    </ArticlePage>
  );
}
