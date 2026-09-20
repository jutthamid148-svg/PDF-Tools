import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OptionCards } from "#/components/OptionCards";
import { OptionGroup, ToolShell } from "#/components/ToolShell";
import { VisualPageTool } from "#/components/VisualPageTool";
import {
  addPageNumbers,
  type PageNumberPosition,
} from "#/lib/operations";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";
import { cx } from "#/components/ui";

const tool = toolByHref("/add-page-numbers");

export const Route = createFileRoute("/add-page-numbers")({
  head: () =>
    pageHead({
      title: tool.title,
      description: tool.description,
      path: tool.href,
    }),
  component: AddPageNumbersPage,
});

const POSITIONS = [
  {
    value: "bottom-left" as const,
    label: "Bottom left",
    description: "Inside the lower-left margin",
  },
  {
    value: "bottom-center" as const,
    label: "Bottom center",
    description: "Centered beneath the page",
  },
  {
    value: "bottom-right" as const,
    label: "Bottom right",
    description: "Inside the lower-right margin",
  },
];

const FAQ = [
  {
    question: "Can I choose where page numbers go?",
    answer:
      "Yes. Choose bottom left, bottom center or bottom right before creating the new PDF.",
  },
  {
    question: "Can numbering start from a page other than 1?",
    answer:
      "Yes. Set any whole starting number. For example, start at 5 to label the first selected page as 5.",
  },
  {
    question: "Can I number only selected pages?",
    answer:
      "Yes. Every page starts selected, but you can untick any cover, divider or existing numbered page that should be skipped.",
  },
  {
    question: "Will my PDF quality change?",
    answer:
      "No. The existing pages are preserved. This tool only adds a small text label to the pages you choose.",
  },
  {
    question: "Is my PDF uploaded?",
    answer:
      "No. Page numbers are added inside your browser, so the original PDF stays on your device.",
  },
];

function AddPageNumbersPage() {
  const [position, setPosition] = useState<PageNumberPosition>("bottom-center");
  const [startAt, setStartAt] = useState("1");
  const startNumber = Number(startAt);
  const validStart = Number.isInteger(startNumber) && startNumber >= 1;

  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <VisualPageTool
        toolName={tool.name}
        legend="Pages to number"
        hint="Every page starts selected. Untick covers or pages that already have a number."
        actionLabel="Add Page Numbers"
        startOverLabel="Number Another PDF"
        successTitle="Page numbers added successfully"
        selectAllByDefault
        emptySelectionMessage="Select at least one page to number."
        canRun={validStart}
        options={({ disabled }) => (
          <div className="space-y-5">
            <OptionGroup legend="Where should the number appear?">
              <OptionCards
                name="page-number-position"
                options={POSITIONS}
                value={position}
                onChange={setPosition}
                disabled={disabled}
              />
            </OptionGroup>

            <div>
              <label
                htmlFor="page-number-start"
                className="block text-sm font-semibold text-ink-900 dark:text-white"
              >
                Start numbering at
              </label>
              <input
                id="page-number-start"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={startAt}
                disabled={disabled}
                onChange={(event) => setStartAt(event.target.value)}
                aria-invalid={!validStart}
                aria-describedby="page-number-start-help"
                className={cx(
                  "mt-2 block w-full max-w-xs rounded-xl bg-white px-3.5 py-2.5 text-base text-ink-900 ring-1 transition-colors placeholder:text-ink-400 disabled:opacity-60 dark:bg-ink-900 dark:text-white",
                  validStart
                    ? "ring-ink-200 focus:ring-2 focus:ring-brand-500 dark:ring-ink-700"
                    : "ring-red-400 focus:ring-2 focus:ring-red-400 dark:ring-red-600",
                )}
              />
              <p
                id="page-number-start-help"
                className={cx(
                  "mt-2 text-sm",
                  validStart ? "text-ink-500 dark:text-ink-500" : "text-red-600 dark:text-red-400",
                )}
              >
                {validStart
                  ? `The first selected page will be labelled ${startNumber}.`
                  : "Use a whole number of 1 or more."}
              </p>
            </div>
          </div>
        )}
        run={async (file, indexes, report) => [
          await addPageNumbers(file, indexes, { position, startAt: startNumber }, report),
        ]}
        stats={({ selected }) => [
          { label: "Pages numbered", value: String(selected.length), highlight: true },
          { label: "Starts at", value: validStart ? String(startNumber) : "-" },
          { label: "Placement", value: POSITIONS.find((item) => item.value === position)!.label },
        ]}
      />
    </ToolShell>
  );
}

function About() {
  return (
    <>
      <p>
        Page numbers make reports, handouts and scanned documents much easier to
        discuss. Pick the pages that need a label, choose a lower-page position,
        and download a fresh numbered copy.
      </p>
      <p>
        Covers, divider pages and pre-numbered sheets are easy to leave out with
        the visual selector. Numbering then continues through only the pages you
        selected, starting from the number you entered.
      </p>
      <p>
        Your document is not flattened or converted to images. The tool adds a
        compact text label while keeping your source PDF on your own device.
      </p>
    </>
  );
}
