import { useCallback, useId, useRef, useState } from "react";
import { toolEvents } from "#/lib/analytics";
import {
  IMAGE_ACCEPT,
  PDF_ACCEPT,
  toAcceptedFile,
  validateFile,
  type AcceptedFile,
  type FileKind,
} from "#/lib/files";
import { MAX_FILE_LABEL } from "#/lib/site";
import { ImageFileIcon, PdfFileIcon, UploadIcon } from "./Icons";
import { button, cx } from "./ui";

interface FileUploaderProps {
  kind: FileKind;
  multiple?: boolean;
  toolName: string;
  onFiles: (files: AcceptedFile[]) => void;
  onRejected: (message: string) => void;
  label?: string;
  hint?: string;
  compact?: boolean;
}

export function FileUploader({
  kind,
  multiple = false,
  toolName,
  onFiles,
  onRejected,
  label,
  hint,
  compact = false,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const depth = useRef(0);
  const inputId = useId();
  const hintId = useId();

  const noun = kind === "pdf" ? "PDF" : "image";

  const accept = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      const incoming = multiple ? Array.from(list) : [list[0]];
      const good: AcceptedFile[] = [];
      const problems: string[] = [];

      for (const file of incoming) {
        const problem = validateFile(file, kind);
        if (problem) problems.push(problem);
        else good.push(toAcceptedFile(file));
      }

      if (problems.length > 0) onRejected(problems[0]);
      if (good.length > 0) {
        toolEvents.fileSelected(
          toolName,
          good.length,
          good.reduce((sum, item) => sum + item.size, 0),
        );
        onFiles(good);
      }
    },
    [kind, multiple, onFiles, onRejected, toolName],
  );

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragEnter={(event) => {
          event.preventDefault();
          depth.current += 1;
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          event.preventDefault();
          depth.current -= 1;
          if (depth.current <= 0) {
            depth.current = 0;
            setDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          depth.current = 0;
          setDragging(false);
          accept(event.dataTransfer.files);
        }}
        className={cx(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition-all duration-300 animate-blur-in",
          compact ? "gap-2 px-5 py-8" : "gap-3 px-6 py-12 sm:py-16",
          dragging
            ? "border-brand-500 bg-brand-50 upload-pulse dark:border-brand-400 dark:bg-brand-600/10"
            : "border-ink-300 bg-ink-50/60 hover:border-brand-400 hover:bg-brand-50/50 dark:border-ink-700 dark:bg-ink-900/40 dark:hover:border-brand-500 dark:hover:bg-brand-600/5",
        )}
      >
        <span
          className={cx(
            "flex items-center justify-center rounded-2xl bg-white text-brand-600 ring-1 ring-ink-200 dark:bg-ink-800 dark:text-brand-300 dark:ring-ink-700",
            compact ? "h-11 w-11" : "h-14 w-14",
          )}
        >
          {kind === "pdf" ? (
            <PdfFileIcon className={compact ? "h-5 w-5" : "h-6 w-6"} />
          ) : (
            <ImageFileIcon className={compact ? "h-5 w-5" : "h-6 w-6"} />
          )}
        </span>

        <span className="text-base font-semibold text-ink-900 dark:text-white">
          {label ?? `Upload ${multiple ? `${noun}s` : noun}`}
        </span>
        <span className="text-sm text-ink-600 dark:text-ink-400">
          Drag and drop {multiple ? `your ${noun}s` : `your ${noun}`} here
        </span>

        <span
          className={cx(button("primary", "md"), "pointer-events-none mt-1")}
          aria-hidden="true"
        >
          <UploadIcon className="h-4 w-4" />
          Choose {multiple ? "Files" : "File"}
        </span>

        <span id={hintId} className="mt-1 text-xs text-ink-500 dark:text-ink-500">
          {hint ?? `Maximum size: ${MAX_FILE_LABEL} per file`}
        </span>
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="sr-only"
        accept={kind === "pdf" ? PDF_ACCEPT : IMAGE_ACCEPT}
        multiple={multiple}
        aria-describedby={hintId}
        onChange={(event) => {
          accept(event.target.files);
          // Allow re-picking the same file after a reset.
          event.target.value = "";
        }}
      />
    </div>
  );
}
