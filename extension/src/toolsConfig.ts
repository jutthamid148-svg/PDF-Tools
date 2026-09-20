export type ToolCategory = "AI Tools" | "Edit PDF" | "Organize PDF" | "Convert" | "Optimize";

export interface ExtensionTool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  route: string;
  icon: string;
  popular?: boolean;
}

export const SITE_URL = "https://pd-f-tool.vercel.app";
export const STORAGE_KEY = "pdf-tool-extension-preferences";

export const TOOLS: ExtensionTool[] = [
  { id: "compress", name: "Compress PDF", description: "Reduce PDF file size.", category: "Optimize", route: "/compress-pdf", icon: "compress", popular: true },
  { id: "merge", name: "Merge PDF", description: "Combine PDFs into one file.", category: "Organize PDF", route: "/merge-pdf", icon: "merge", popular: true },
  { id: "split", name: "Split PDF", description: "Extract selected pages.", category: "Organize PDF", route: "/split-pdf", icon: "split", popular: true },
  { id: "pdf-to-jpg", name: "PDF to JPG", description: "Convert pages to images.", category: "Convert", route: "/pdf-to-jpg", icon: "image", popular: true },
  { id: "jpg-to-pdf", name: "JPG to PDF", description: "Turn images into one PDF.", category: "Convert", route: "/jpg-to-pdf", icon: "file", popular: true },
  { id: "rotate", name: "Rotate PDF", description: "Fix page orientation.", category: "Edit PDF", route: "/rotate-pdf", icon: "rotate" },
  { id: "watermark", name: "Watermark PDF", description: "Add a text watermark.", category: "Edit PDF", route: "/watermark-pdf", icon: "watermark" },
  { id: "sign", name: "Sign PDF", description: "Add your signature.", category: "Edit PDF", route: "/sign-pdf", icon: "sign" },
  { id: "page-numbers", name: "Add Page Numbers", description: "Number selected pages.", category: "Edit PDF", route: "/add-page-numbers", icon: "numbers" },
  { id: "rearrange", name: "Rearrange PDF", description: "Put pages in order.", category: "Organize PDF", route: "/rearrange-pdf-pages", icon: "reorder" },
  { id: "delete-pages", name: "Delete Pages", description: "Remove unwanted pages.", category: "Organize PDF", route: "/delete-pdf-pages", icon: "delete" },
  { id: "extract-pages", name: "Extract Pages", description: "Keep only chosen pages.", category: "Organize PDF", route: "/extract-pdf-pages", icon: "extract" },
  { id: "summarizer", name: "AI Summarizer", description: "Get the key points fast.", category: "AI Tools", route: "/ai-summarizer", icon: "spark", popular: true },
  { id: "ai-chat", name: "AI Chat", description: "Ask questions about a PDF.", category: "AI Tools", route: "/ai-chat", icon: "chat", popular: true },
  { id: "ai-quiz", name: "AI Quiz Generator", description: "Create a quiz from a PDF.", category: "AI Tools", route: "/ai-quiz", icon: "quiz" },
  { id: "ai-notes", name: "AI Notes Generator", description: "Turn a PDF into notes.", category: "AI Tools", route: "/ai-notes", icon: "notes" },
  { id: "translator", name: "AI PDF Translator", description: "Translate PDF text.", category: "AI Tools", route: "/ai-pdf-translator", icon: "translate" },
  { id: "rewriter", name: "AI PDF Rewriter", description: "Rewrite for clarity and tone.", category: "AI Tools", route: "/ai-pdf-rewriter", icon: "wand" },
  { id: "ask-pdf", name: "AI Ask PDF", description: "Chat with one document.", category: "AI Tools", route: "/ai-ask-pdf", icon: "ask" },
  { id: "presentation", name: "AI PDF to Presentation", description: "Create a slide outline.", category: "AI Tools", route: "/ai-pdf-to-presentation", icon: "presentation" },
  { id: "flashcards", name: "AI Flashcard Generator", description: "Make study flashcards.", category: "AI Tools", route: "/ai-flashcard-generator", icon: "cards" },
  { id: "citations", name: "AI Citation Generator", description: "Format citations from a PDF.", category: "AI Tools", route: "/ai-citation-generator", icon: "citation" },
  { id: "grammar", name: "AI Grammar Checker", description: "Improve PDF writing.", category: "AI Tools", route: "/ai-grammar-checker", icon: "grammar" },
  { id: "analyzer", name: "AI Document Analyzer", description: "Extract useful document facts.", category: "AI Tools", route: "/ai-document-analyzer", icon: "analyze" },
  { id: "resume", name: "AI Resume Analyzer", description: "Review resume content.", category: "AI Tools", route: "/ai-resume-analyzer", icon: "resume" },
  { id: "questions", name: "AI PDF Question Generator", description: "Generate questions from a PDF.", category: "AI Tools", route: "/ai-pdf-question-generator", icon: "questions" },
];

export const CATEGORIES: ToolCategory[] = ["AI Tools", "Edit PDF", "Organize PDF", "Convert", "Optimize"];
export const QUICK_TOOLS = TOOLS.filter((tool) => tool.popular);

export function toolUrl(tool: ExtensionTool, sourceUrl?: string): string {
  const url = new URL(tool.route, SITE_URL);
  if (sourceUrl) url.searchParams.set("sourceUrl", sourceUrl);
  return url.toString();
}
