import { loadPdfJs } from "./pdf";

/**
 * Extract text content from a PDF file using pdfjs-dist.
 * Returns the full text content of all pages.
 */
export async function extractPdfText(file: File): Promise<string> {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .filter((item) => "str" in item)
      .map((item) => (item as { str: string }).str)
      .join(" ");
    if (pageText.trim()) {
      textParts.push(`[Page ${i}]\n${pageText.trim()}`);
    }
  }

  return textParts.join("\n\n");
}

/**
 * Truncate text to fit within token limits.
 * Rough estimate: 1 token ≈ 4 characters.
 */
export function truncateForTokens(text: string, maxTokens: number): string {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "\n\n[Content truncated...]";
}

/**
 * Call Gemini API via server function.
 */
export async function callGemini(prompt: string): Promise<string> {
  const { askGeminiServerFn } = await import("#/server/askGemini");
  const result = await askGeminiServerFn({ data: prompt });
  return result;
}

/**
 * Streaming version — falls back to non-streaming.
 */
export async function callGeminiStream(
  prompt: string,
  onChunk: (text: string) => void,
): Promise<string> {
  const { askGeminiServerFn } = await import("#/server/askGemini");
  const result = await askGeminiServerFn({ data: prompt });
  onChunk(result);
  return result;
}

// ── Prompt Templates ──────────────────────────────────────────────

export function summarizePrompt(text: string): string {
  return `Analyze the following PDF content and provide a comprehensive summary.

PDF Content:
${truncateForTokens(text, 8000)}

Please provide:
1. **Summary**: A concise 2-3 sentence summary of the document
2. **Key Points**: 5-8 bullet points of the most important information
3. **Main Topics**: 3-5 main topics covered in the document
4. **Reading Time**: Estimated reading time for the original document (assume 200 words/minute)

Format your response as JSON with this exact structure:
{
  "summary": "...",
  "keyPoints": ["...", "..."],
  "topics": ["...", "..."],
  "readingTime": "X min read"
}`;
}

export function chatPrompt(text: string, question: string): string {
  return `You are a helpful AI assistant that answers questions about PDF documents.

PDF Content:
${truncateForTokens(text, 8000)}

User Question: ${question}

Please provide a clear, concise answer based on the PDF content. If the answer is not in the document, say so politely. Keep your response focused and helpful.`;
}

export function suggestToolsPrompt(text: string): string {
  return `Analyze the following PDF content and suggest which PDF tools would be most useful for this document.

PDF Content:
${truncateForTokens(text, 4000)}

Based on the content, suggest 3-5 tools from this list with a brief reason for each:
- Compress PDF: Reduce file size
- Merge PDF: Combine multiple PDFs
- Split PDF: Extract specific pages
- PDF to JPG: Convert pages to images
- JPG to PDF: Convert images to PDF
- Rotate PDF: Fix page orientation
- Delete Pages: Remove unwanted pages
- Extract Pages: Keep only specific pages

Format as JSON array:
[
  { "tool": "Compress PDF", "reason": "...", "href": "/compress-pdf" },
  ...
]`;
}

export function quizPrompt(text: string): string {
  return `Create a quiz based on the following PDF content. Generate a mix of question types.

PDF Content:
${truncateForTokens(text, 8000)}

Generate 8-10 questions with this mix:
- 4 Multiple Choice Questions (4 options each, 1 correct)
- 3 True/False questions
- 3 Short Answer questions

Format as JSON:
{
  "questions": [
    {
      "type": "mcq",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "..."
    },
    {
      "type": "true-false",
      "question": "...",
      "correct": true,
      "explanation": "..."
    },
    {
      "type": "short-answer",
      "question": "...",
      "correctAnswer": "...",
      "explanation": "..."
    }
  ]
}`;
}

export function notesPrompt(text: string): string {
  return `Create well-structured study notes from the following PDF content.

PDF Content:
${truncateForTokens(text, 8000)}

Generate organized notes with:
1. **Title**: A descriptive title for the notes
2. **Overview**: 2-3 sentence overview
3. **Sections**: 3-6 sections, each with:
   - Section heading
   - Key points (bullet points)
   - Important details
4. **Summary**: A brief concluding summary

Format as JSON:
{
  "title": "...",
  "overview": "...",
  "sections": [
    {
      "heading": "...",
      "points": ["...", "..."],
      "details": "..."
    }
  ],
  "summary": "..."
}`;
}

export function actionsPrompt(text: string): string {
  return `Based on this PDF content, suggest 3-4 quick AI actions the user might want to take.

PDF Content:
${truncateForTokens(text, 3000)}

Suggest actions like:
- Summarize this document
- Explain key concepts
- List important dates/deadlines
- Create study notes
- Generate quiz questions
- Extract action items
- Find key statistics
- Simplify the language

Format as JSON array:
[
  { "label": "...", "prompt": "..." },
  ...
]

The prompt field should be a complete instruction that could be sent to an AI.`;
}
