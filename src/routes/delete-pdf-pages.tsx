import { createFileRoute } from "@tanstack/react-router";
import { ToolShell } from "#/components/ToolShell";
import { VisualPageTool } from "#/components/VisualPageTool";
import { deletePages } from "#/lib/operations";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";

const tool = toolByHref("/delete-pdf-pages");

export const Route = createFileRoute("/delete-pdf-pages")({
  head: () =>
    pageHead({
      title: tool.title,
      description: tool.description,
      path: tool.href,
    }),
  component: DeletePagesPage,
});

const FAQ = [
  {
    question: "How do I choose which pages to delete?",
    answer:
      "A thumbnail of every page is shown. Tick the ones you want gone and the count updates as you go, so there is no guessing from page numbers alone.",
  },
  {
    question: "Is the original file changed?",
    answer:
      "No. Your original stays exactly as it is on your device. You download a new PDF with the ticked pages left out.",
  },
  {
    question: "Can I delete every page?",
    answer:
      "No. A PDF needs at least one page, so the tool stops you and says so rather than producing a file that will not open.",
  },
  {
    question: "Do the remaining pages change?",
    answer:
      "They are copied across untouched, in their original order and quality. Only the page numbering shifts, because there are fewer pages.",
  },
  {
    question: "Are my files uploaded?",
    answer:
      "No. Previews and the new PDF are both produced in this browser tab on your own device.",
  },
];

function DeletePagesPage() {
  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <VisualPageTool
        toolName={tool.name}
        legend="Pages to delete"
        hint="Tick the pages you want removed. Everything else is kept."
        tone="danger"
        actionLabel="Delete Pages"
        startOverLabel="Edit Another PDF"
        successTitle="Pages deleted successfully"
        selectAllByDefault={false}
        emptySelectionMessage="Select at least one page to delete."
        run={async (file, indexes, report) => [
          await deletePages(file, new Set(indexes), report),
        ]}
        stats={({ selected, pageCount }) => [
          { label: "Pages removed", value: String(selected.length), highlight: true },
          { label: "Pages kept", value: String(pageCount - selected.length) },
          { label: "Was", value: `${pageCount} pages` },
        ]}
      />
    </ToolShell>
  );
}

function About() {
  return (
    <>
      <p>
        Most documents carry something you would rather not send: a blank sheet
        the scanner picked up, a cover page, an internal note at the end. Deleting
        those pages produces a clean copy without touching the file you started
        with.
      </p>
      <p>
        Working from thumbnails matters here. Page 14 of a contract is not
        memorable, but the page with the blank scan on it is obvious the moment
        you see it, so you tick the right one first time.
      </p>
      <p>
        Kept pages are copied over exactly as they were. Nothing is compressed,
        re-encoded or resized on the way out.
      </p>
    </>
  );
}
