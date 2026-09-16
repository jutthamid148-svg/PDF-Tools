import type { PageThumb } from "#/lib/pdf";
import { CheckIcon } from "./Icons";
import { button, cx } from "./ui";

interface PagePickerProps {
  thumbs: PageThumb[];
  /** Zero-based page indexes that are currently selected. */
  selected: Set<number>;
  onToggle: (index: number) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  disabled?: boolean;
  /** Describes what ticking a page does, e.g. "Pages to delete". */
  legend: string;
  hint?: string;
  tone?: "brand" | "danger";
}

export function PagePicker({
  thumbs,
  selected,
  onToggle,
  onSelectAll,
  onSelectNone,
  disabled = false,
  legend,
  hint,
  tone = "brand",
}: PagePickerProps) {
  return (
    <fieldset disabled={disabled}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <legend className="text-sm font-semibold text-ink-900 dark:text-white">
            {legend}
          </legend>
          {hint && <p className="mt-1 text-sm text-ink-500 dark:text-ink-500">{hint}</p>}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onSelectAll} className={button("secondary", "sm")}>
            Select all
          </button>
          <button type="button" onClick={onSelectNone} className={button("ghost", "sm")}>
            Clear
          </button>
        </div>
      </div>

      <ul className="mt-4 grid max-h-[26rem] grid-cols-2 gap-3 overflow-y-auto rounded-xl bg-ink-50 p-3 sm:grid-cols-3 md:grid-cols-4 dark:bg-ink-950/60">
        {thumbs.map((thumb) => {
          const index = thumb.pageNumber - 1;
          const checked = selected.has(index);
          return (
            <li key={thumb.pageNumber}>
              <label
                className={cx(
                  "relative flex cursor-pointer flex-col items-center gap-2 rounded-xl bg-white p-2 ring-1 transition-all duration-150",
                  checked
                    ? tone === "danger"
                      ? "ring-2 ring-red-500 dark:ring-red-400"
                      : "ring-2 ring-brand-500 dark:ring-brand-400"
                    : "ring-ink-200 hover:ring-ink-300 dark:ring-ink-700 dark:hover:ring-ink-600",
                  disabled && "cursor-not-allowed opacity-60",
                  "dark:bg-ink-900",
                )}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => onToggle(index)}
                />
                <span
                  className={cx(
                    "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md ring-1 transition-colors",
                    checked
                      ? tone === "danger"
                        ? "bg-red-600 text-white ring-red-600"
                        : "bg-brand-600 text-white ring-brand-600"
                      : "bg-white/90 text-transparent ring-ink-300 dark:bg-ink-800/90 dark:ring-ink-600",
                  )}
                  aria-hidden="true"
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
                <img
                  src={thumb.url}
                  alt={`Page ${thumb.pageNumber}`}
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-full rounded-lg object-contain"
                />
                <span className="text-xs font-medium text-ink-600 dark:text-ink-400">
                  Page {thumb.pageNumber}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
