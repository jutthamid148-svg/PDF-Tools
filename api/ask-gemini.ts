const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

const MAX_PROMPT_LENGTH = 36_000;
const MAX_ATTACHMENT_LENGTH = 10_000_000;

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Keeps the Gemini credential on Vercel rather than exposing it in the browser
 * bundle. The UI only ever sends the prepared prompt to this same-origin route.
 */
export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return json({ error: "Cross-origin requests are not allowed." }, 403);
    }

    let prompt: unknown;
    let attachment: unknown;
    try {
      ({ prompt, attachment } = (await request.json()) as {
        prompt?: unknown;
        attachment?: unknown;
      });
    } catch {
      return json({ error: "Send a valid JSON request." }, 400);
    }

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return json({ error: "A prompt is required." }, 400);
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return json({ error: "That document is too large for one AI request." }, 413);
    }

    let attachmentPart: { inline_data: { mime_type: string; data: string } } | null = null;
    if (attachment !== undefined) {
      if (!attachment || typeof attachment !== "object") {
        return json({ error: "The uploaded file could not be read." }, 400);
      }
      const candidate = attachment as { mimeType?: unknown; data?: unknown };
      if (
        typeof candidate.mimeType !== "string" ||
        !candidate.mimeType.startsWith("image/") ||
        typeof candidate.data !== "string" ||
        candidate.data.length > MAX_ATTACHMENT_LENGTH
      ) {
        return json({ error: "Please upload an image smaller than 7 MB." }, 413);
      }
      attachmentPart = {
        inline_data: { mime_type: candidate.mimeType, data: candidate.data },
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return json({ error: "AI is not configured yet." }, 503);
    }

    try {
      const upstream = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // The key remains inside this Vercel Function and out of URL logs.
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                ...(attachmentPart ? [attachmentPart] : []),
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
          },
        }),
      });

      if (!upstream.ok) {
        return json({ error: "The AI service is unavailable. Please try again." }, 502);
      }

      const payload = (await upstream.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: unknown }> } }>;
      };
      const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof text !== "string" || text.trim().length === 0) {
        return json({ error: "The AI service returned an empty response." }, 502);
      }

      return json({ text });
    } catch {
      return json({ error: "The AI service could not be reached. Please try again." }, 502);
    }
  },
};
