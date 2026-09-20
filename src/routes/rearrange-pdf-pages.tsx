import { createFileRoute } from "@tanstack/react-router";
import { ReorderPageTool } from "#/components/ReorderPageTool";
import { ToolShell } from "#/components/ToolShell";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";

const tool = toolByHref("/rearrange-pdf-pages");

export const Route = createFileRoute("/rearrange-pdf-pages")({
  head: () =>
    pageHead({
      title: tool.title,
      description: tool.description,
      path: tool.href,
    }),
  component: RearrangePdfPagesPage,
});

const FAQ = [
  {
    question: "How do I change the page order?",
    answer: "Upload a PDF, then drag its page thumbnails into the order you want. Arrow controls are also available on small screens.",
  },
  {
    question: "Does rearranging change the quality?",
    answer: "No. Pages are copied into a new order without rasterizing or compressing their contents.",
  },
  {
    question: "Are my files uploaded?",
    answer: "No. The previews and reordered PDF are created in your browser on your own device.",
  },
];

function RearrangePdfPagesPage() {
  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <ReorderPageTool toolName={tool.name} />
    </ToolShell>
  );
}

function About() {
  return (
    <>
      <p>Rearranging is useful when scanned pages arrive out of sequence, a cover page belongs at the end, or a document needs a cleaner reading flow.</p>
      <p>The tool keeps the original PDF untouched and saves a separate copy with the new page order.</p>
    </>
  );
}
