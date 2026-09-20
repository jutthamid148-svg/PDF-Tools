import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-pdf-to-presentation")({
  head: () => aiDocumentHead("/ai-pdf-to-presentation"),
  component: () => <AiDocumentToolPage href="/ai-pdf-to-presentation" />,
});
