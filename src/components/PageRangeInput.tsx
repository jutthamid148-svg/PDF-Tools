import { useId, useMemo } from "react";
import { FriendlyError } from "#/lib/files";
import { formatPageList, parsePageRange } from "#/lib/pages";
import { cx } from "./ui";

export function usePageRange(value: string, pageCount: number) {
  return useMemo(() => {
    if (pageCount <= 0) return { pages: [] as number[], problem: null as string | null };
    try {
      return { pages: parsePageRange(value, pageCount), problem: null };
    } catch (error) {
      return {
        pages: [] as number[],
        problem: error instanceof FriendlyError ? error.message : "That range is not valid.",
      };
    }
  }, [value, pageCount]);
}

export function PageRangeInput({
  value,
  onChange,
  pageCount,
  pages,
  problem,
  disabled = false,
  label = "Pages",
}: {
  value: string;
  onChange: (value: string) => void;
  pageCount: number;
  pages: number[];
  problem: string | null;
  disabled?: boolean;
  label?: string;
}) {
  const id = useId();
  const helpId = `${id}-help`;
  const touched = value.trim().length > 0;
  const invalid = touched && problem !== null;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={pageCount > 1 ? `1-${Math.min(pageCount, 3)}, ${pageCount}` : "1"}
        aria-invalid={invalid}
        aria-describedby={helpId}
        className={cx(
          "mt-2 block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-ink-900 ring-1 transition-colors placeholder:text-ink-400 disabled:opacity-60 dark:bg-ink-900 dark:text-white",
          invalid
            ? "ring-red-400 dark:ring-red-600"
            : "ring-ink-200 focus:ring-2 focus:ring-brand-500 dark:ring-ink-700",
        )}
      />
      <p
        id={helpId}
        className={cx(
          "mt-2 text-sm",
          invalid ? "text-red-600 dark:text-red-400" : "text-ink-500 dark:text-ink-500",
        )}
      >
        {invalid
          ? problem
          : touched && pages.length > 0
            ? `${pages.length} page${pages.length === 1 ? "" : "s"} selected: ${formatPageList(pages)}`
            : `Use numbers and ranges, like 1-3, 7. This PDF has ${pageCount} page${pageCount === 1 ? "" : "s"}.`}
      </p>
    </div>
  );
}
