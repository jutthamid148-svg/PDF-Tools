export type ToolIconName =
  | "compress"
  | "merge"
  | "split"
  | "toJpg"
  | "toPdf"
  | "rotate"
  | "delete"
  | "extract"
  | "summarize"
  | "chat"
  | "quiz"
  | "notes"
  | "brain"
  | "wand";

export type ToolCategory = "Organize PDF" | "Convert" | "Optimize" | "AI Tools";

export type ToolHref =
  | "/compress-pdf"
  | "/merge-pdf"
  | "/split-pdf"
  | "/pdf-to-jpg"
  | "/jpg-to-pdf"
  | "/rotate-pdf"
  | "/delete-pdf-pages"
  | "/extract-pdf-pages"
  | "/ai-summarizer"
  | "/ai-chat"
  | "/ai-quiz"
  | "/ai-notes";

export interface Tool {
  href: ToolHref;
  name: string;
  /** Card / grid copy. One short sentence. */
  blurb: string;
  /** <h1> support line on the tool page. */
  subtitle: string;
  icon: ToolIconName;
  category: ToolCategory;
  title: string;
  description: string;
  popular: boolean;
}

export const TOOLS: Tool[] = [
  {
    href: "/compress-pdf",
    name: "Compress PDF",
    blurb: "Reduce PDF file size while keeping good quality.",
    subtitle: "Reduce your PDF file size in seconds.",
    icon: "compress",
    category: "Optimize",
    title: "Compress PDF — Reduce PDF File Size Online Free",
    description:
      "Compress a PDF online to make it smaller and easier to email or upload. Choose strong, recommended or basic compression. Free and no account needed.",
    popular: true,
  },
  {
    href: "/merge-pdf",
    name: "Merge PDF",
    blurb: "Combine multiple PDF files into one.",
    subtitle: "Combine several PDFs into a single file.",
    icon: "merge",
    category: "Organize PDF",
    title: "Merge PDF — Combine PDF Files Online Free",
    description:
      "Merge two or more PDF files into one document. Reorder the files before you combine them, then download the result. Free and no account needed.",
    popular: true,
  },
  {
    href: "/split-pdf",
    name: "Split PDF",
    blurb: "Extract selected pages from your PDF.",
    subtitle: "Take a page range out of your PDF.",
    icon: "split",
    category: "Organize PDF",
    title: "Split PDF — Separate PDF Pages Online Free",
    description:
      "Split a PDF by page range or pull out single pages as a new document. Pick the pages you need and download them. Free and no account needed.",
    popular: true,
  },
  {
    href: "/pdf-to-jpg",
    name: "PDF to JPG",
    blurb: "Turn PDF pages into JPG images.",
    subtitle: "Convert PDF pages into JPG images.",
    icon: "toJpg",
    category: "Convert",
    title: "PDF to JPG — Convert PDF Pages to Images Online Free",
    description:
      "Convert PDF pages into high quality JPG images. Choose the pages and the image quality, then download them one by one. Free and no account needed.",
    popular: true,
  },
  {
    href: "/jpg-to-pdf",
    name: "JPG to PDF",
    blurb: "Turn JPG and PNG images into one PDF.",
    subtitle: "Turn your images into a single PDF.",
    icon: "toPdf",
    category: "Convert",
    title: "JPG to PDF — Convert Images to PDF Online Free",
    description:
      "Convert JPG, PNG or WebP images into one PDF document. Reorder the images, pick a page size, then download the PDF. Free and no account needed.",
    popular: true,
  },
  {
    href: "/rotate-pdf",
    name: "Rotate PDF",
    blurb: "Turn pages 90, 180 or 270 degrees.",
    subtitle: "Fix sideways or upside down pages.",
    icon: "rotate",
    category: "Organize PDF",
    title: "Rotate PDF — Turn PDF Pages Online Free",
    description:
      "Rotate PDF pages by 90, 180 or 270 degrees and save the change permanently. Rotate every page or only the ones you pick. Free and no account needed.",
    popular: false,
  },
  {
    href: "/delete-pdf-pages",
    name: "Delete Pages",
    blurb: "Remove pages you no longer need.",
    subtitle: "Remove the pages you do not need.",
    icon: "delete",
    category: "Organize PDF",
    title: "Delete PDF Pages — Remove Pages Online Free",
    description:
      "Delete pages from a PDF. See a thumbnail of every page, tick the ones to remove, and download the shorter document. Free and no account needed.",
    popular: false,
  },
  {
    href: "/extract-pdf-pages",
    name: "Extract Pages",
    blurb: "Keep only the pages you select.",
    subtitle: "Keep only the pages you choose.",
    icon: "extract",
    category: "Organize PDF",
    title: "Extract PDF Pages — Save Selected Pages Online Free",
    description:
      "Extract pages from a PDF into a new document. Pick the pages visually or by range and keep their original order. Free and no account needed.",
    popular: false,
  },
  {
    href: "/ai-summarizer",
    name: "AI Summarizer",
    blurb: "Get instant summaries of any PDF with AI.",
    subtitle: "Summarize your PDF in seconds with AI.",
    icon: "summarize",
    category: "AI Tools",
    title: "AI Summarizer — Summarize PDF with AI Online Free",
    description:
      "Upload a PDF and get an instant AI-powered summary with key points, main topics, and estimated reading time. Free and no account needed.",
    popular: true,
  },
  {
    href: "/ai-chat",
    name: "AI Chat",
    blurb: "Ask questions about your PDF content.",
    subtitle: "Chat with your PDF using AI.",
    icon: "chat",
    category: "AI Tools",
    title: "AI Chat — Ask Questions About Your PDF Free",
    description:
      "Upload a PDF and ask any question about its content. Get instant AI-powered answers based on the document. Free and no account needed.",
    popular: true,
  },
  {
    href: "/ai-quiz",
    name: "AI Quiz Generator",
    blurb: "Generate quizzes from your PDF content.",
    subtitle: "Create quizzes from your PDF with AI.",
    icon: "quiz",
    category: "AI Tools",
    title: "AI Quiz Generator — Create Quizzes from PDF Free",
    description:
      "Upload a PDF and automatically generate multiple choice, true/false, and short answer questions. Perfect for studying. Free and no account needed.",
    popular: false,
  },
  {
    href: "/ai-notes",
    name: "AI Notes Generator",
    blurb: "Turn your PDF into structured notes.",
    subtitle: "Generate notes from your PDF with AI.",
    icon: "notes",
    category: "AI Tools",
    title: "AI Notes Generator — Create Notes from PDF Free",
    description:
      "Upload a PDF and get well-organized notes with headings, key points, and summaries. Perfect for studying and review. Free and no account needed.",
    popular: false,
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  "AI Tools",
  "Organize PDF",
  "Convert",
  "Optimize",
];

export function toolByHref(href: ToolHref): Tool {
  const tool = TOOLS.find((candidate) => candidate.href === href);
  if (!tool) throw new Error(`Unknown tool: ${href}`);
  return tool;
}

/** Up to `count` other tools, for the internal links block on a tool page. */
export function relatedTools(href: ToolHref, count = 4): Tool[] {
  const self = toolByHref(href);
  const sameCategory = TOOLS.filter(
    (tool) => tool.href !== href && tool.category === self.category,
  );
  const rest = TOOLS.filter(
    (tool) => tool.href !== href && tool.category !== self.category,
  );
  return [...sameCategory, ...rest].slice(0, count);
}
