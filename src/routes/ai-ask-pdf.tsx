import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-ask-pdf")({
  head: () => aiDocumentHead("/ai-ask-pdf"),
  component: () => <AiDocumentToolPage href="/ai-ask-pdf" />,
});
