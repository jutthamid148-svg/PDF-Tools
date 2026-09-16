/**
 * A reserved, clearly labelled space between content sections. It holds its own
 * height so nothing shifts when an ad loads later, and it sits well away from
 * download buttons so it can never be mistaken for one.
 */
export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside
      aria-label={label}
      className="my-12 flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 px-4 py-6 dark:border-ink-800 dark:bg-ink-900/30"
    >
      <p className="text-[11px] font-medium uppercase tracking-widest text-ink-400 dark:text-ink-600">
        {label}
      </p>
    </aside>
  );
}
