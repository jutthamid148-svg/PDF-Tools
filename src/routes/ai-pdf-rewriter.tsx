import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-pdf-rewriter")({
  head: () => aiDocumentHead("/ai-pdf-rewriter"),
  component: () => <AiDocumentToolPage href="/ai-pdf-rewriter" />,
});
