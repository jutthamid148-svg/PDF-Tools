export type ToolIconName =
  | "compress"
  | "merge"
  | "split"
  | "toJpg"
  | "toPdf"
  | "rotate"
  | "reorder"
  | "delete"
  | "extract"
  | "pageNumbers"
  | "watermark"
  | "sign"
  | "summarize"
  | "chat"
  | "quiz"
  | "notes"
  | "brain"
  | "wand"
  | "translate"
  | "rewrite"
  | "ask"
  | "presentation"
  | "flashcard"
  | "citation"
  | "grammar"
  | "analyze"
  | "resume"
  | "questions";

export type ToolCategory =
  | "Organize PDF"
  | "Edit PDF"
  | "Convert"
  | "Optimize"
  | "AI Tools";

export type ToolHref =
  | "/compress-pdf"
  | "/merge-pdf"
  | "/split-pdf"
  | "/pdf-to-jpg"
  | "/jpg-to-pdf"
  | "/rotate-pdf"
  | "/rearrange-pdf-pages"
  | "/delete-pdf-pages"
  | "/extract-pdf-pages"
  | "/add-page-numbers"
  | "/watermark-pdf"
  | "/sign-pdf"
  | "/ai-summarizer"
  | "/ai-chat"
  | "/ai-quiz"
  | "/ai-notes"
  | "/ai-pdf-translator"
  | "/ai-pdf-rewriter"
  | "/ai-ask-pdf"
  | "/ai-pdf-to-presentation"
  | "/ai-flashcard-generator"
  | "/ai-citation-generator"
  | "/ai-grammar-checker"
  | "/ai-document-analyzer"
  | "/ai-resume-analyzer"
  | "/ai-pdf-question-generator";

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
    href: "/rearrange-pdf-pages",
    name: "Rearrange PDF",
    blurb: "Drag pages into the order you need.",
    subtitle: "Put your PDF pages in the right order.",
    icon: "reorder",
    category: "Organize PDF",
    title: "Rearrange PDF Pages — Reorder Pages Online Free",
    description:
      "Rearrange PDF pages online by dragging them into a new order. Your document stays in the browser and the reordered copy downloads instantly.",
    popular: true,
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
    href: "/add-page-numbers",
    name: "Add Page Numbers",
    blurb: "Place clear page numbers exactly where you want them.",
    subtitle: "Add page numbers to your PDF in seconds.",
    icon: "pageNumbers",
    category: "Organize PDF",
    title: "Add Page Numbers to PDF Online Free",
    description:
      "Add page numbers to a PDF online. Choose the pages, placement and starting number. Free and no account needed.",
    popular: false,
  },
  {
    href: "/watermark-pdf",
    name: "Watermark PDF",
    blurb: "Stamp a custom text watermark onto selected pages.",
    subtitle: "Add a clear watermark to your PDF in seconds.",
    icon: "watermark",
    category: "Edit PDF",
    title: "Watermark PDF — Add Text Watermarks Online Free",
    description:
      "Add a custom text watermark to selected PDF pages. Choose the wording, size, color and angle, then download the watermarked document. Free and no account needed.",
    popular: true,
  },
  {
    href: "/sign-pdf",
    name: "Sign PDF",
    blurb: "Draw your signature and place it on selected pages.",
    subtitle: "Sign your PDF directly in the browser.",
    icon: "sign",
    category: "Edit PDF",
    title: "Sign PDF — Add Your Signature Online Free",
    description:
      "Draw a signature, choose the pages and place it onto your PDF. Your document stays in your browser and the signed copy downloads instantly.",
    popular: true,
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
  {
    href: "/ai-pdf-translator",
    name: "AI PDF Translator",
    blurb: "Translate PDF text while keeping its structure clear.",
    subtitle: "Translate your PDF with AI.",
    icon: "translate",
    category: "AI Tools",
    title: "AI PDF Translator — Translate PDF Text Online",
    description: "Translate text from a PDF into English, Urdu, Arabic, Spanish, French, German, Hindi, Chinese, Portuguese or Turkish with AI.",
    popular: false,
  },
  {
    href: "/ai-pdf-rewriter",
    name: "AI PDF Rewriter",
    blurb: "Rewrite PDF text for clarity, tone or length.",
    subtitle: "Rewrite PDF content with AI.",
    icon: "rewrite",
    category: "AI Tools",
    title: "AI PDF Rewriter — Rewrite PDF Text with AI",
    description: "Rewrite PDF text professionally, simply, concisely or with improved clarity while keeping the original visible.",
    popular: false,
  },
  {
    href: "/ai-ask-pdf",
    name: "AI Ask PDF",
    blurb: "Ask follow-up questions about one PDF in a focused chat.",
    subtitle: "Ask questions about your PDF.",
    icon: "ask",
    category: "AI Tools",
    title: "AI Ask PDF — Ask Questions About a PDF",
    description: "Upload a PDF, ask document-specific questions and get answers grounded in its extracted text.",
    popular: false,
  },
  {
    href: "/ai-pdf-to-presentation",
    name: "AI PDF to Presentation",
    blurb: "Turn a PDF into a structured presentation outline.",
    subtitle: "Create presentation slides from a PDF.",
    icon: "presentation",
    category: "AI Tools",
    title: "AI PDF to Presentation — Create Slides from PDF",
    description: "Generate a presentation title, slide outline, key points and optional speaker notes from a PDF.",
    popular: false,
  },
  {
    href: "/ai-flashcard-generator",
    name: "AI Flashcard Generator",
    blurb: "Create study flashcards from your PDF content.",
    subtitle: "Generate flashcards from a PDF.",
    icon: "flashcard",
    category: "AI Tools",
    title: "AI Flashcard Generator — Create Study Cards from PDF",
    description: "Generate 5, 10, 20 or 50 document-grounded flashcards, flip through them and export the set.",
    popular: false,
  },
  {
    href: "/ai-citation-generator",
    name: "AI Citation Generator",
    blurb: "Create APA, MLA, Chicago or Harvard citations from a PDF.",
    subtitle: "Generate accurate citations from a PDF.",
    icon: "citation",
    category: "AI Tools",
    title: "AI Citation Generator — Create Citations from PDF",
    description: "Detect bibliographic details from a PDF and format citations in APA, MLA, Chicago or Harvard style without inventing missing data.",
    popular: false,
  },
  {
    href: "/ai-grammar-checker",
    name: "AI Grammar & Writing Checker",
    blurb: "Find grammar, spelling, clarity and repetition issues.",
    subtitle: "Improve your PDF writing with AI.",
    icon: "grammar",
    category: "AI Tools",
    title: "AI Grammar Checker — Improve PDF Writing with AI",
    description: "Review PDF text for grammar, spelling, punctuation, clarity, awkward wording and repetition with explanations.",
    popular: false,
  },
  {
    href: "/ai-document-analyzer",
    name: "AI Document Analyzer",
    blurb: "Extract topics, dates, entities, sections and useful facts.",
    subtitle: "Understand the structure of your PDF.",
    icon: "analyze",
    category: "AI Tools",
    title: "AI Document Analyzer — Analyze PDF Content with AI",
    description: "Extract a document summary, topics, dates, entities, statistics, sections, keywords and document type from a PDF.",
    popular: false,
  },
  {
    href: "/ai-resume-analyzer",
    name: "AI Resume Analyzer",
    blurb: "Review resume content, structure and job-description alignment.",
    subtitle: "Analyze your resume with AI.",
    icon: "resume",
    category: "AI Tools",
    title: "AI Resume Analyzer — Review Your Resume with AI",
    description: "Analyze resume structure, skills, experience, education, clarity, formatting and keyword coverage with optional job matching.",
    popular: false,
  },
  {
    href: "/ai-pdf-question-generator",
    name: "AI PDF Question Generator",
    blurb: "Generate document-grounded questions at three difficulty levels.",
    subtitle: "Create questions from your PDF with AI.",
    icon: "questions",
    category: "AI Tools",
    title: "AI PDF Question Generator — Create Questions from PDF",
    description: "Generate 5, 10, 20 or 50 multiple choice, true/false or short-answer questions based only on your PDF.",
    popular: false,
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  "AI Tools",
  "Edit PDF",
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
