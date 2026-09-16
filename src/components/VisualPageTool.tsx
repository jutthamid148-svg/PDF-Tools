import { useCallback, useEffect, useState } from "react";
import { FileList } from "./FileList";
import { FileUploader } from "./FileUploader";
import { PagePicker } from "./PagePicker";
import {
  ErrorMessage,
  ProgressBar,
  SuccessPanel,
  type ResultStat,
} from "./ToolFeedback";
import { ToolPanel } from "./ToolShell";
import { button } from "./ui";
import { useToolRun, type Report } from "#/hooks/useToolRun";
import { usePageThumbs } from "#/hooks/usePageThumbs";
import { type AcceptedFile, type ResultFile } from "#/lib/files";
import { formatPageList } from "#/lib/pages";

interface VisualPageToolProps {
  toolName: string;
  legend: string;
  hint: string;
  tone?: "brand" | "danger";
  actionLabel: string;
  startOverLabel: string;
  successTitle: string;
  /** Whether every page starts ticked. Rotate wants all, delete wants none. */
  selectAllByDefault: boolean;
  emptySelectionMessage: string;
  options?: (state: { disabled: boolean }) => React.ReactNode;
  run: (file: File, indexes: number[], report: Report) => Promise<ResultFile[]>;
  stats?: (input: {
    selected: number[];
    pageCount: number;
    results: ResultFile[];
  }) => ResultStat[];
}

/**
 * The shared workspace behind Rotate, Delete Pages and Extract Pages: upload a
 * PDF, see a thumbnail of every page, tick the ones you mean, run the job.
 */
export function VisualPageTool({
  toolName,
  legend,
  hint,
  tone = "brand",
  actionLabel,
  startOverLabel,
  successTitle,
  selectAllByDefault,
  emptySelectionMessage,
  options,
  run: operation,
  stats,
}: VisualPageToolProps) {
  const [file, setFile] = useState<AcceptedFile | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const thumbs = usePageThumbs();
  const run = useToolRun(toolName);
  const busy = run.status === "working";

  // Once the thumbnails land we know the page count, so apply the default.
  useEffect(() => {
    if (thumbs.thumbs.length === 0) return;
    setSelected(
      selectAllByDefault
        ? new Set(thumbs.thumbs.map((thumb) => thumb.pageNumber - 1))
        : new Set(),
    );
  }, [thumbs.thumbs, selectAllByDefault]);

  const startOver = useCallback(() => {
    setFile(null);
    setSelected(new Set());
    thumbs.clear();
    run.reset();
  }, [run, thumbs]);

  async function pick(files: AcceptedFile[]) {
    const chosen = files[0];
    setFile(chosen);
    run.reset();
    await thumbs.load(chosen.file);
  }

  function toggle(index: number) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const order = [...selected].sort((a, b) => a - b);

  async function start() {
    if (!file) return;
    if (order.length === 0) {
      run.fail(emptySelectionMessage);
      return;
    }
    await run.run((report) => operation(file.file, order, report));
  }

  const pageCount = thumbs.thumbs.length;

  return (
    <ToolPanel>
      {!file && (
        <FileUploader
          kind="pdf"
          toolName={toolName}
          onFiles={pick}
          onRejected={run.fail}
        />
      )}

      {file && run.status !== "done" && (
        <>
          <FileList
            files={[file]}
            kind="pdf"
            disabled={busy}
            status={
              thumbs.loading
                ? `Preparing previews ${thumbs.loaded}/${thumbs.total || "?"}`
                : pageCount > 0
                  ? `${pageCount} page${pageCount === 1 ? "" : "s"}`
                  : undefined
            }
            onRemove={startOver}
          />

          {thumbs.loading && (
            <ProgressBar
              progress={{
                percent: thumbs.total ? (thumbs.loaded / thumbs.total) * 100 : 5,
                label: "Preparing page previews",
              }}
            />
          )}

          {thumbs.error && (
            <ErrorMessage message={thumbs.error} onStartOver={startOver} />
          )}

          {!thumbs.loading && pageCount > 0 && (
            <>
              <PagePicker
                thumbs={thumbs.thumbs}
                selected={selected}
                onToggle={toggle}
                onSelectAll={() =>
                  setSelected(new Set(thumbs.thumbs.map((t) => t.pageNumber - 1)))
                }
                onSelectNone={() => setSelected(new Set())}
                disabled={busy}
                legend={legend}
                hint={hint}
                tone={tone}
              />

              <p className="text-sm text-ink-600 dark:text-ink-400">
                {order.length === 0
                  ? "No pages selected yet."
                  : `${order.length} of ${pageCount} selected: ${formatPageList(order)}`}
              </p>

              {options?.({ disabled: busy })}

              {busy && <ProgressBar progress={run.progress} />}

              {run.status === "error" && run.error && (
                <ErrorMessage
                  message={run.error}
                  onRetry={order.length > 0 ? start : undefined}
                  onStartOver={startOver}
                />
              )}

              {!busy && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={start}
                    disabled={order.length === 0}
                    className={button("primary", "lg")}
                  >
                    {actionLabel}
                  </button>
                  <button
                    type="button"
                    onClick={startOver}
                    className={button("secondary", "lg")}
                  >
                    Choose Another PDF
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {run.status === "done" && run.results.length > 0 && (
        <SuccessPanel
          title={successTitle}
          stats={stats?.({ selected: order, pageCount, results: run.results })}
          results={run.results}
          toolName={toolName}
          onStartOver={startOver}
          startOverLabel={startOverLabel}
        />
      )}

      {run.status === "error" && !file && run.error && (
        <ErrorMessage message={run.error} onStartOver={startOver} />
      )}
    </ToolPanel>
  );
}
