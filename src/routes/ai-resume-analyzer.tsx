import { createFileRoute } from "@tanstack/react-router";
import { AiDocumentToolPage, aiDocumentHead } from "#/components/AiDocumentTool";

export const Route = createFileRoute("/ai-resume-analyzer")({
  head: () => aiDocumentHead("/ai-resume-analyzer"),
  component: () => <AiDocumentToolPage href="/ai-resume-analyzer" />,
});
