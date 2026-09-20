import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-pdf-translator")({
  head: () => aiDocumentHead("/ai-pdf-translator"),
  component: () => <AiDocumentToolPage href="/ai-pdf-translator" />,
});
