import { createServerFn } from "@tanstack/react-start";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

async function callGeminiAPI(prompt: string, apiKey: string) {
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("[askGemini] API error:", response.status, errorBody);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const json = await response.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    console.error("[askGemini] Empty response:", JSON.stringify(json));
    throw new Error("No response from AI");
  }
  return text;
}

export const askGeminiServerFn = createServerFn({ method: "POST" })
  .validator((prompt: string) => prompt)
  .handler(async ({ data: prompt }) => {
    const apiKey = process.env.GEMINI_API_KEY ?? "";

    if (!apiKey) {
      console.error("[askGemini] GEMINI_API_KEY not set");
      throw new Error(
        "AI key not configured. Set GEMINI_API_KEY in .env",
      );
    }

    try {
      const result = await callGeminiAPI(prompt, apiKey);
      return result;
    } catch (err) {
      console.error("[askGemini] Failed:", err);
      throw err;
    }
  });

export async function askGemini(prompt: string): Promise<string> {
  return await askGeminiServerFn({ data: prompt });
}
