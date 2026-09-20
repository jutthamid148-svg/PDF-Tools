import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EXTENSION_DOWNLOAD_URL, GITHUB_RELEASE_URL, SITE_NAME } from "#/lib/site";
import { CloseIcon, MenuIcon } from "./Icons";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { button, cx } from "./ui";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/ai-summarizer", label: "AI Tools" },
  { to: "/compress-pdf", label: "Compress" },
  { to: "/merge-pdf", label: "Merge" },
  { to: "/split-pdf", label: "Split" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // A tap on a nav link changes the route without unmounting the header.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/80 bg-white/85 backdrop-blur-md dark:border-ink-800 dark:bg-ink-950/85">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-lg text-ink-900 dark:text-white"
        >
          <BrandMark />
          <span className="text-[17px] font-bold tracking-tight line-grow">{SITE_NAME}</span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white line-grow"
                  activeProps={{
                    className:
                      "block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 bg-brand-50 dark:text-brand-300 dark:bg-brand-600/15",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <InstallAppButton />
          <ThemeToggle />
          <Link to="/tools" className={cx(button("primary", "sm"), "hidden sm:inline-flex")}>
            All Tools
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100 lg:hidden dark:text-ink-300 dark:hover:bg-ink-800"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className={cx(
          "border-t border-ink-200 bg-white lg:hidden dark:border-ink-800 dark:bg-ink-950",
          open && "animate-slide-down",
        )}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                  activeProps={{
                    className:
                      "block rounded-lg px-3 py-3 text-base font-semibold text-brand-700 bg-brand-50 dark:text-brand-300 dark:bg-brand-600/15",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link to="/tools" className={cx(button("primary", "md"), "w-full")}>
                All Tools
              </Link>
            </li>
            <li className="mt-2 grid gap-2 sm:grid-cols-2">
              <a href={EXTENSION_DOWNLOAD_URL} download className={cx(button("secondary", "md"), "w-full")}>
                Chrome Extension
              </a>
              <a href={GITHUB_RELEASE_URL} target="_blank" rel="noreferrer" className={cx(button("secondary", "md"), "w-full")}>
                GitHub Release
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function capture(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);

  async function install() {
    const prompt = installPrompt;
    if (!prompt) {
      setMessage("Use your browser menu and choose Install PDF Quick Tools.");
      return;
    }
    await prompt.prompt();
    await prompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <>
      <button type="button" onClick={() => void install()} className={button("secondary", "sm")}>
        Install App
      </button>
      {message && (
        <span className="sr-only" role="status" aria-live="polite">
          {message}
        </span>
      )}
    </>
  );
}
