import { useCallback, useEffect, useRef, useState } from "react";
import { toolEvents } from "#/lib/analytics";
import { FriendlyError, revokeResults, type ResultFile } from "#/lib/files";

export type RunStatus = "idle" | "working" | "done" | "error";

export interface Progress {
  percent: number;
  label: string;
}

export type Report = (percent: number, label?: string) => void;

const GENERIC_ERROR =
  "Something went wrong while processing your PDF. Please try again.";

/**
 * The shared upload → process → download state machine. Every tool page uses
 * it, so progress, failure and cleanup behave identically across the site.
 */
export function useToolRun(toolName: string) {
  const [status, setStatus] = useState<RunStatus>("idle");
  const [progress, setProgress] = useState<Progress>({ percent: 0, label: "" });
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultFile[]>([]);
  const resultsRef = useRef<ResultFile[]>([]);
  const running = useRef(false);

  resultsRef.current = results;

  // Object URLs are the only thing this site holds on to. Release them when
  // the page goes away.
  useEffect(() => {
    return () => revokeResults(resultsRef.current);
  }, []);

  const clearResults = useCallback(() => {
    revokeResults(resultsRef.current);
    resultsRef.current = [];
    setResults([]);
  }, []);

  const reset = useCallback(() => {
    clearResults();
    setStatus("idle");
    setError(null);
    setProgress({ percent: 0, label: "" });
  }, [clearResults]);

  const fail = useCallback(
    (message: string) => {
      setError(message);
      setStatus("error");
      toolEvents.failed(toolName, message.slice(0, 120));
    },
    [toolName],
  );

  const run = useCallback(
    async (job: (report: Report) => Promise<ResultFile[]>) => {
      if (running.current) return;
      running.current = true;
      clearResults();
      setError(null);
      setProgress({ percent: 0, label: "Getting started" });
      setStatus("working");
      toolEvents.started(toolName);
      const startedAt = Date.now();

      const report: Report = (percent, label) => {
        setProgress((current) => ({
          percent: Math.max(0, Math.min(100, Math.round(percent))),
          label: label ?? current.label,
        }));
      };

      try {
        // Let the browser paint the working state before the main thread gets busy.
        await new Promise((resolve) => setTimeout(resolve, 16));
        const produced = await job(report);
        resultsRef.current = produced;
        setResults(produced);
        setProgress({ percent: 100, label: "Finished" });
        setStatus("done");
        toolEvents.completed(toolName, Date.now() - startedAt);
      } catch (caught) {
        if (caught instanceof FriendlyError) {
          fail(caught.message);
        } else if (caught instanceof Error && import.meta.env.DEV) {
          console.error(caught);
          fail(caught.message || GENERIC_ERROR);
        } else {
          if (import.meta.env.DEV) console.error(caught);
          fail(GENERIC_ERROR);
        }
      } finally {
        running.current = false;
      }
    },
    [clearResults, fail, toolName],
  );

  return { status, progress, error, results, run, reset, fail };
}
