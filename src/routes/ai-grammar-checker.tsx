import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-grammar-checker")({
  head: () => aiDocumentHead("/ai-grammar-checker"),
  component: () => <AiDocumentToolPage href="/ai-grammar-checker" />,
});
