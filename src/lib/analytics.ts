declare global {
  interface Window {
    whop?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Anonymous product events only after the visitor allows analytics. No
 * filenames, file contents, document text, or contact details are sent.
 */
export function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem("pqt-cookie-consent") !== "accepted") return;
  } catch {
    return;
  }
  window.whop?.track(event, data);
}

export const toolEvents = {
  opened: (tool: string) => track("tool_opened", { tool }),
  fileSelected: (tool: string, count: number, bytes: number) =>
    track("file_selected", { tool, count, bytes }),
  started: (tool: string) => track("processing_started", { tool }),
  completed: (tool: string, ms: number) =>
    track("processing_completed", { tool, ms }),
  failed: (tool: string, reason: string) =>
    track("processing_failed", { tool, reason }),
  downloaded: (tool: string) => track("download_clicked", { tool }),
};
