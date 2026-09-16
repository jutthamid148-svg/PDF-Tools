export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

export const buttonSizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
} as const;

export const buttonVariants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-600/20",
  secondary:
    "bg-white text-ink-800 ring-1 ring-inset ring-ink-200 hover:bg-ink-50 dark:bg-ink-900 dark:text-ink-100 dark:ring-ink-700 dark:hover:bg-ink-800",
  ghost:
    "text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white",
  danger:
    "bg-white text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50 dark:bg-ink-900 dark:text-red-400 dark:ring-red-900/60 dark:hover:bg-red-950/40",
} as const;

export function button(
  variant: keyof typeof buttonVariants = "primary",
  size: keyof typeof buttonSizes = "md",
  extra?: string,
): string {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size], extra);
}

export const card =
  "rounded-2xl bg-white ring-1 ring-ink-200/80 shadow-sm dark:bg-ink-900 dark:ring-ink-800";

export const sectionWrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";

export const heading = {
  h1: "text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-white",
  h2: "text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white",
  h3: "text-lg font-semibold text-ink-900 dark:text-white",
};

export const muted = "text-ink-600 dark:text-ink-400";
