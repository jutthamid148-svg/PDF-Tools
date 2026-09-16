import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArticlePage, Block } from "#/components/Prose";
import { button, cx } from "#/components/ui";
import { track } from "#/lib/analytics";
import { pageHead } from "#/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "#/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: `Contact | ${SITE_NAME}`,
      description: `Get in touch about ${SITE_NAME}: report a file that will not process, suggest a tool, or ask about privacy.`,
      path: "/contact",
    }),
  component: Contact,
});

const SUBJECTS = [
  "A file would not process",
  "Tool suggestion",
  "Privacy question",
  "Something else",
];

function Contact() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  function send(event: React.FormEvent) {
    event.preventDefault();
    track("contact", { subject });
    if (email.trim().length > 0) track("identify", { email: email.trim() });

    const body = `${message}\n\n---\nReply to: ${email || "(not given)"}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `${SITE_NAME}: ${subject}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "mt-2 block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-ink-900 ring-1 ring-ink-200 transition-colors placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500 dark:bg-ink-900 dark:text-white dark:ring-ink-700";
  const label = "block text-sm font-semibold text-ink-900 dark:text-white";

  return (
    <ArticlePage
      title="Contact"
      intro={`${SITE_NAME} is built and run by Aifinancepk. If something did not work, telling us is genuinely useful.`}
    >
      <Block title="Before you write">
        <p>
          A file that will not open is almost always password protected or
          partly downloaded. Try opening it in your normal PDF reader first. If
          it asks for a password, remove the password there and save a copy, then
          come back.
        </p>
        <p>
          Please do not attach the document itself. We cannot accept files, and
          the whole point of the site is that your documents stay with you. Tell
          us what the file was like instead: how many pages, roughly how large,
          and where it came from.
        </p>
      </Block>

      <Block title="Send a message">
        <form onSubmit={send} className="space-y-5">
          <div>
            <label htmlFor="subject" className={label}>
              What is this about?
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className={field}
            >
              {SUBJECTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className={label}>
              Your email <span className="font-normal text-ink-500">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={field}
            />
          </div>

          <div>
            <label htmlFor="message" className={label}>
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What happened, and which tool were you using?"
              className={cx(field, "resize-y")}
            />
          </div>

          <button type="submit" className={button("primary", "lg")}>
            Open Email
          </button>
          <p className="text-sm text-ink-500 dark:text-ink-500">
            This opens your own email app with the message ready to send, so
            nothing is posted to a server from this page.
          </p>
        </form>
      </Block>

      <Block title="Privacy">
        <p>
          What we do and do not collect is set out in full on the{" "}
          <Link to="/privacy" className="font-semibold text-brand-700 dark:text-brand-300">
            privacy policy
          </Link>
          .
        </p>
      </Block>
    </ArticlePage>
  );
}
