import { heading, muted, sectionWrap } from "./ui";

export function ArticlePage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${sectionWrap} py-12 sm:py-16`}>
      <article className="mx-auto max-w-3xl">
        <h1 className={heading.h1}>{title}</h1>
        <p className={`mt-3 text-lg ${muted}`}>{intro}</p>
        {updated && (
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-500">
            Last updated {updated}
          </p>
        )}
        <div className="mt-10 space-y-8">{children}</div>
      </article>
    </div>
  );
}

export function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-ink-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-600 dark:text-ink-400">
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
