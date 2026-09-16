import type { FaqItem } from "#/lib/seo";
import { heading } from "./ui";

export function Faq({
  items,
  title = "Frequently asked questions",
  id = "faq",
}: {
  items: FaqItem[];
  title?: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-16">
      <h2 id={`${id}-heading`} className={heading.h2}>
        {title}
      </h2>
      <div className="mt-6 divide-y divide-ink-200 border-t border-ink-200 dark:divide-ink-800 dark:border-ink-800">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink-900 marker:content-none dark:text-white">
              {item.question}
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-transform duration-150 group-open:rotate-45 dark:bg-ink-800 dark:text-ink-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
