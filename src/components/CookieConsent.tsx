import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CloseIcon, LockIcon } from "./Icons";
import { button } from "./ui";

const CONSENT_KEY = "pqt-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      document.cookie = `${CONSENT_KEY}=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
    } catch {
      // The banner can still be dismissed when browser storage is unavailable.
    }
    window.dispatchEvent(new Event("pqt-cookie-consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div className="flex items-start gap-3">
        <span className="cookie-banner-icon" aria-hidden="true">
          <LockIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="cookie-title" className="text-sm font-bold text-ink-900 dark:text-white">Cookies and privacy</h2>
          <p id="cookie-description" className="mt-1 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
            We use essential storage for preferences only. Read our{" "}
            <Link to="/privacy" className="font-semibold text-brand-700 underline underline-offset-2 dark:text-brand-300">Privacy Policy</Link>.
          </p>
        </div>
        <button type="button" onClick={() => choose("declined")} className="cookie-banner-close" aria-label="Dismiss cookie notice">
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2 sm:pl-8">
        <button type="button" onClick={() => choose("declined")} className={button("secondary", "sm")}>Decline</button>
        <button type="button" onClick={() => choose("accepted")} className={button("primary", "sm")}>Accept cookies</button>
      </div>
    </div>
  );
}
