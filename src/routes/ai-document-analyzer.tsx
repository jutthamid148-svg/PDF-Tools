import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-document-analyzer")({
  head: () => aiDocumentHead("/ai-document-analyzer"),
  component: () => <AiDocumentToolPage href="/ai-document-analyzer" />,
});
