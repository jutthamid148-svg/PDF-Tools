import { useId } from "react";
import { cx } from "./ui";

export interface OptionItem<T extends string> {
  value: T;
  label: string;
  description: string;
}

export function OptionCards<T extends string>({
  name,
  options,
  value,
  onChange,
  disabled = false,
  columns = 3,
}: {
  name: string;
  options: ReadonlyArray<OptionItem<T>>;
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const groupId = useId();
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-3";

  return (
    <div className={cx("grid gap-3", gridClass)}>
      {options.map((option) => {
        const id = `${groupId}-${option.value}`;
        const checked = value === option.value;
        return (
          <div key={option.value}>
            <input
              type="radio"
              id={id}
              name={`${name}-${groupId}`}
              value={option.value}
              checked={checked}
              disabled={disabled}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <label
              htmlFor={id}
              className={cx(
                "flex h-full cursor-pointer flex-col rounded-xl px-4 py-3.5 ring-1 transition-colors duration-150",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600",
                checked
                  ? "bg-brand-50 ring-2 ring-brand-500 dark:bg-brand-600/15 dark:ring-brand-400"
                  : "bg-white ring-ink-200 hover:ring-ink-300 dark:bg-ink-900 dark:ring-ink-700 dark:hover:ring-ink-600",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <span
                className={cx(
                  "text-sm font-semibold",
                  checked
                    ? "text-brand-800 dark:text-brand-200"
                    : "text-ink-900 dark:text-white",
                )}
              >
                {option.label}
              </span>
              <span className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                {option.description}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
