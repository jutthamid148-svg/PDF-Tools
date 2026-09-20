import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-pdf-question-generator")({
  head: () => aiDocumentHead("/ai-pdf-question-generator"),
  component: () => <AiDocumentToolPage href="/ai-pdf-question-generator" />,
});
