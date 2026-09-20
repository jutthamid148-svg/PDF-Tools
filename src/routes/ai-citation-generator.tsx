import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-citation-generator")({
  head: () => aiDocumentHead("/ai-citation-generator"),
  component: () => <AiDocumentToolPage href="/ai-citation-generator" />,
});
