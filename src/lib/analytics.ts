declare global {
  interface Window {
    whop?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Anonymous product events only: which tool, how many files, how big, whether
 * it worked. No filenames, no file contents, nothing identifying.
 */
export function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
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
