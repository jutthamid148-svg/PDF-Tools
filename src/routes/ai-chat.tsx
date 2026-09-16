import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { FileUploader } from "#/components/FileUploader";
import { ProgressBar, ErrorMessage } from "#/components/ToolFeedback";
import { ToolPanel, ToolShell } from "#/components/ToolShell";
import { button } from "#/components/ui";
import { useToolRun } from "#/hooks/useToolRun";
import { type AcceptedFile, FriendlyError } from "#/lib/files";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";
import { extractPdfText, callGemini, chatPrompt } from "#/lib/ai";
import { AiChat, type ChatMessage } from "#/components/AiChat";

const tool = toolByHref("/ai-chat");

export const Route = createFileRoute("/ai-chat")({
  head: () =>
    pageHead({
      title: tool.title,
      description: tool.description,
      path: tool.href,
    }),
  component: AiChatPage,
});

const FAQ = [
  {
    question: "How does AI Chat work?",
    answer:
      "Upload a PDF and ask any question about its content. The AI reads the document and provides answers based on what's in the PDF.",
  },
  {
    question: "Can I ask follow-up questions?",
    answer:
      "Yes! You can have a conversation about the PDF. Ask as many questions as you need to understand the content.",
  },
  {
    question: "Is my PDF uploaded?",
    answer:
      "The PDF text is extracted in your browser. Only the extracted text is sent to the AI for answering your questions. The original file stays on your device.",
  },
  {
    question: "What languages are supported?",
    answer:
      "The AI can understand and answer questions about PDFs in most languages, and can respond in English.",
  },
];

const SUGGESTED_QUESTIONS = [
  "What is this document about?",
  "What are the main conclusions?",
  "Can you explain the key concepts?",
  "What are the important dates or numbers?",
];

function AiChatPage() {
  const [file, setFile] = useState<AcceptedFile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pdfText, setPdfText] = useState("");
  const run = useToolRun(tool.name);
  const busy = run.status === "working";

  function add(incoming: AcceptedFile[]) {
    setFile(incoming[0] ?? null);
    setMessages([]);
    setPdfText("");
    if (run.status !== "idle") run.reset();
  }

  function startOver() {
    setFile(null);
    setMessages([]);
    setPdfText("");
    run.reset();
  }

  const handleLoadPdf = useCallback(async () => {
    if (!file) return;
    await run.run(async (report) => {
      report(20, "Loading PDF...");
      const text = await extractPdfText(file.file);
      if (!text.trim()) {
        throw new FriendlyError("Could not extract text from this PDF. It may be a scanned document.");
      }
      setPdfText(text);
      report(100, "Ready!");
      return [];
    });
  }, [file, run]);

  const handleSend = useCallback(
    async (question: string) => {
      if (!pdfText) return;

      const userMsg: ChatMessage = {
        role: "user",
        content: question,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const prompt = chatPrompt(pdfText, question);
        const response = await callGemini(prompt);

        const assistantMsg: ChatMessage = {
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        const errorMsg: ChatMessage = {
          role: "assistant",
          content: "Sorry, I couldn't process that question. Please try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    },
    [pdfText],
  );

  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <ToolPanel>
        {!file && (
          <FileUploader
            kind="pdf"
            toolName={tool.name}
            onFiles={add}
            onRejected={run.fail}
            label="Upload PDF to Chat"
          />
        )}

        {run.status === "error" && !file && run.error && (
          <ErrorMessage message={run.error} />
        )}

        {file && !pdfText && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-xs text-ink-500">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>

            {busy && <ProgressBar progress={run.progress} />}

            {run.status === "error" && run.error && (
              <ErrorMessage
                message={run.error}
                onRetry={handleLoadPdf}
                onStartOver={startOver}
              />
            )}

            {!busy && run.status !== "error" && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleLoadPdf}
                  className={button("primary", "lg")}
                >
                  💬 Start Chatting
                </button>
                <button
                  type="button"
                  onClick={startOver}
                  className={button("secondary", "lg")}
                >
                  Change File
                </button>
              </div>
            )}
          </div>
        )}

        {pdfText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900 dark:text-white">
                💬 Chat with: {file?.name}
              </p>
              <button
                type="button"
                onClick={startOver}
                className={button("ghost", "sm")}
              >
                Start Over
              </button>
            </div>
            <AiChat
              onSend={handleSend}
              messages={messages}
              isLoading={busy}
              suggestedQuestions={messages.length === 0 ? SUGGESTED_QUESTIONS : undefined}
            />
          </div>
        )}
      </ToolPanel>
    </ToolShell>
  );
}

function About() {
  return (
    <>
      <p>
        AI Chat lets you have a conversation with your PDF. Upload any document
        and ask questions about its content — the AI will answer based on what's
        in the file.
      </p>
      <p>
        This is great for understanding complex documents, finding specific
        information quickly, or getting explanations of technical content. You can
        ask follow-up questions to dive deeper into any topic.
      </p>
      <p>
        The PDF text is extracted in your browser and sent to our AI service for
        analysis. The original file never leaves your device.
      </p>
    </>
  );
}
