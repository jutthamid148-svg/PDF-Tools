import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-flashcard-generator")({
  head: () => aiDocumentHead("/ai-flashcard-generator"),
  component: () => <AiDocumentToolPage href="/ai-flashcard-generator" />,
});
