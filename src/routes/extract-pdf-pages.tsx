import { createFileRoute } from "@tanstack/react-router";
import { ToolShell } from "#/components/ToolShell";
import { VisualPageTool } from "#/components/VisualPageTool";
import { keepPages } from "#/lib/operations";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";

const tool = toolByHref("/extract-pdf-pages");

export const Route = createFileRoute("/extract-pdf-pages")({
  head: () =>
    pageHead({
      title: tool.title,
      description: tool.description,
      path: tool.href,
    }),
  component: ExtractPagesPage,
});

const FAQ = [
  {
    question: "What is the difference between extracting and splitting?",
    answer:
      "They produce the same kind of result from opposite directions. Extract shows you a thumbnail of every page so you can pick visually, while Split PDF takes typed page ranges. Use whichever suits the document in front of you.",
  },
  {
    question: "Do the extracted pages keep their order?",
    answer:
      "Yes. Pages appear in the new PDF in their original document order, whatever order you ticked them in.",
  },
  {
    question: "Is the quality affected?",
    answer:
      "No. Pages are copied at full quality, keeping their fonts, images and page size. Nothing is re-encoded.",
  },
  {
    question: "Can I extract pages from a password protected PDF?",
    answer:
      "Not while the password is on it. Open the file in your PDF reader, save a copy without the password, then extract from that copy.",
  },
  {
    question: "Are my files uploaded?",
    answer:
      "No. Both the previews and the new PDF are made in this browser tab on your own device.",
  },
];

function ExtractPagesPage() {
  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <VisualPageTool
        toolName={tool.name}
        legend="Pages to keep"
        hint="Tick the pages you want in the new PDF. Everything else is left behind."
        actionLabel="Extract Pages"
        startOverLabel="Extract From Another PDF"
        successTitle="Pages extracted successfully"
        selectAllByDefault={false}
        emptySelectionMessage="Select at least one page to extract."
        run={async (file, indexes, report) => [
          await keepPages(file, indexes, report, "extracted"),
        ]}
        stats={({ selected, pageCount }) => [
          { label: "Pages extracted", value: String(selected.length), highlight: true },
          { label: "Left behind", value: String(pageCount - selected.length) },
          { label: "Original", value: `${pageCount} pages` },
        ]}
      />
    </ToolShell>
  );
}

function About() {
  return (
    <>
      <p>
        Extracting answers a question people ask constantly: can you send me just
        the invoice page. Tick the pages that matter, and you get a short
        document with nothing else attached to it.
      </p>
      <p>
        It is also the safe way to share part of something sensitive. A single
        page pulled out of a bank statement carries only what is on that page,
        rather than a whole document with one section highlighted.
      </p>
      <p>
        Pages come across at their original quality and in their original order,
        so the extract is indistinguishable from the pages in the source file.
      </p>
    </>
  );
}
