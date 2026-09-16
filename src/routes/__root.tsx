import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { SiteFooter } from "#/components/SiteFooter";
import { SiteHeader } from "#/components/SiteHeader";
import { themeBootScript } from "#/components/ThemeToggle";
import { button } from "#/components/ui";
import { pageHead } from "#/lib/seo";
import { SITE_NAME, SITE_URL } from "#/lib/site";

import appCss from "../styles.css?url";

const defaults = pageHead({
  title: `${SITE_NAME} — Free Online PDF Tools`,
  description:
    "Free online PDF tools to compress, merge, split, convert, rotate and manage PDF files quickly and easily.",
  path: "/",
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#4f46e5" },
      ...defaults.meta,
    ],
    // Meta is de-duplicated by name across routes, so these act as fallbacks.
    // Links are not, so the canonical belongs to each route, never here.
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Applies the saved theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          <span className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Skip to content
          </span>
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
        We could not find that page
      </h1>
      <p className="mt-4 text-lg text-ink-600 dark:text-ink-400">
        The link may be out of date, or the page may have moved. All of the PDF
        tools are still one click away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/tools" className={button("primary", "lg")}>
          Browse All Tools
        </Link>
        <Link to="/" className={button("secondary", "lg")}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
