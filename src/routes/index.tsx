import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdSlot } from "#/components/AdSlot";
import { Faq } from "#/components/Faq";
import {
  ArrowRightIcon,
  BoltIcon,
  CheckIcon,
  LockIcon,
  SparkIcon,
} from "#/components/Icons";
import { ToolCard } from "#/components/ToolCard";
import { button, heading, muted, sectionWrap } from "#/components/ui";
import { callGemini } from "#/lib/ai";
import { faqJsonLd, pageHead, softwareJsonLd, type FaqItem } from "#/lib/seo";
import { MAX_FILE_LABEL, SITE_NAME } from "#/lib/site";
import { TOOLS, toolByHref } from "#/lib/tools";

const TITLE = `${SITE_NAME} — Free Online PDF Tools`;
const DESCRIPTION =
  "Free online PDF tools to compress, merge, split, convert, rotate and manage PDF files quickly and easily.";

export const Route = createFileRoute("/")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/" }),
  component: Home,
});

const FAQ: FaqItem[] = [
  {
    question: `Is ${SITE_NAME} free?`,
    answer:
      "Yes. Every tool on the site is free to use, with no trial period and no paid tier hiding the useful settings.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. There is no signup, no email address and no phone verification. Open a tool, choose a file and use it.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes. Every tool is built for a phone screen as well as a desktop, including the upload area and the page thumbnails.",
  },
  {
    question: "Is there a file size limit?",
    answer: `Yes, ${MAX_FILE_LABEL} per file. Because the work happens on your own device, very large documents also depend on how much memory your phone or computer has free.`,
  },
  {
    question: "Can I merge multiple PDFs?",
    answer:
      "Yes. Add as many PDFs as you need, arrange them in the order you want, and download one combined document.",
  },
  {
    question: "Can I compress a PDF?",
    answer:
      "Yes. Choose strong, recommended or basic compression, and the result screen shows the real before and after file sizes.",
  },
  {
    question: "What happens to my files?",
    answer:
      "Nothing leaves your device. Every tool runs inside your own browser tab, so there is no upload, no server copy and nothing to delete afterwards.",
  },
];

const popular = TOOLS.filter((tool) => tool.popular);

const aiTools = [
  toolByHref("/ai-summarizer"),
  toolByHref("/ai-chat"),
  toolByHref("/ai-quiz"),
  toolByHref("/ai-notes"),
];

const STATS = [
  { value: "100%", label: "Client-Side Privacy", sub: "Files never hit servers" },
  { value: "0 sec", label: "Queue Wait Time", sub: "Instant local execution" },
  { value: "12+", label: "Essential PDF Tools", sub: "Including Next-Gen AI" },
  { value: "Free", label: "No Subscriptions", sub: "No watermarks or limits" },
];

function StatsBanner() {
  return (
    <section className={`${sectionWrap} mt-12 mb-4`}>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl bg-white/70 p-6 text-center ring-1 ring-ink-200/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/10 hover:ring-brand-300 dark:bg-ink-900/70 dark:ring-ink-800 dark:hover:ring-brand-500/40"
          >
            <div className="text-3xl font-black tracking-tight text-brand-600 sm:text-4xl dark:text-brand-400 group-hover:scale-105 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-bold text-ink-900 dark:text-white">
              {stat.label}
            </div>
            <div className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            softwareJsonLd({ name: SITE_NAME, description: DESCRIPTION, path: "/" }),
            faqJsonLd(FAQ),
          ]),
        }}
      />

      <Hero />

      <StatsBanner />

      <section aria-labelledby="tools-heading" className={`${sectionWrap} mt-12 animate-fade-in-up`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="tools-heading" className={heading.h2}>
              Popular PDF tools
            </h2>
            <p className={`mt-2 ${muted}`}>
              The five people reach for most. Each one opens, does its job and
              hands the file back.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
          >
            See all {TOOLS.length} tools
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-bounce">
          {popular.map((tool) => (
            <li key={tool.href}>
              <ToolCard tool={tool} />
            </li>
          ))}
          <li>
            <Link
              to="/tools"
              className="flex h-full flex-col justify-center rounded-2xl border-2 border-dashed border-ink-300 p-5 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/40 dark:border-ink-700 dark:hover:border-brand-600 dark:hover:bg-brand-600/5"
            >
              <span className="text-base font-semibold text-ink-900 dark:text-white">
                All PDF tools
              </span>
              <span className="mt-1 text-sm text-ink-600 dark:text-ink-400">
                Rotate, delete pages, extract pages and more.
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* AI Tools */}
      <section className={`${sectionWrap} mt-24 animate-blur-in`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-brand-500/25 animate-glow-pulse">
              <SparkIcon className="h-6 w-6 animate-float" />
            </span>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 mb-1">
                Next-Gen AI
              </div>
              <h2 className={heading.h2}>AI-Powered PDF Workspace</h2>
              <p className={`mt-1 text-sm sm:text-base ${muted}`}>
                Deep document understanding, instant summaries, quizzes & study notes in seconds
              </p>
            </div>
          </div>
          <Link
            to="/ai-summarizer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-600 dark:text-brand-300"
          >
            Explore AI Suite <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-flip">
          {aiTools.map((tool) => (
            <li key={tool.href}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Live AI Demo ── */}
      <AiDemo />

      <HowItWorks />

      <AdSlotRow />

      <WhyUs />

      <Privacy />

      <section className={`${sectionWrap} mt-20 animate-fade-in-up`}>
        <Faq items={FAQ} title="Frequently asked questions" id="home-faq" />
      </section>

      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-200/70 bg-gradient-to-br from-white via-brand-50/30 to-purple-50/20 dark:border-ink-800 dark:from-[#0a0a14] dark:via-[#0d0d1a] dark:to-[#0a0f1a]">
      {/* ── Animated background orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-500/[0.07] blur-[100px] animate-float" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-purple-500/[0.06] blur-[80px] animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-400/[0.04] blur-[90px] animate-float" style={{ animationDelay: "2s" }} />
        {/* subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className={`${sectionWrap} relative py-20 sm:py-24 lg:py-28 xl:py-32`}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* ── Left — Text content ── */}
          <div className="animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50/90 px-4 py-2 text-xs font-semibold text-brand-700 ring-1 ring-brand-200/60 backdrop-blur-sm dark:bg-brand-900/30 dark:text-brand-300 dark:ring-brand-700/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              100% Browser-Based — No Upload
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-[4rem]">
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:via-brand-300 dark:to-purple-400">
                PDF Tools.
              </span>
              <br />
              <span className="text-ink-900 dark:text-white">Simple. Fast. Free.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg/relaxed text-ink-600 sm:text-xl/relaxed dark:text-ink-400">
              Compress, merge, split, convert and manage your PDF files in seconds.
              No complicated software. No sign-up. Just drag, drop, done.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/tools"
                className="btn-press group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-xl hover:shadow-brand-600/30 hover:from-brand-500 hover:to-brand-600 dark:from-brand-500 dark:to-brand-600 dark:shadow-brand-600/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                ✨ Explore PDF Tools
              </Link>
              <Link
                to="/compress-pdf"
                className="btn-press inline-flex items-center gap-2 rounded-xl bg-white/80 px-7 py-3.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-200 backdrop-blur-sm transition-all hover:bg-white hover:ring-ink-300 hover:shadow-md dark:bg-ink-800/60 dark:text-ink-200 dark:ring-ink-700 dark:hover:bg-ink-800 dark:hover:ring-ink-600"
              >
                📄 Compress a PDF
              </Link>
            </div>

            {/* Trust badges */}
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink-600 dark:text-ink-400">
              {[
                { icon: "🔒", text: "No account needed" },
                { icon: "🚫", text: "No watermarks" },
                { icon: "📱", text: "Works on mobile" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-sm dark:bg-emerald-900/20">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right — Laptop mockup with floating icons ── */}
          <div className="relative mx-auto hidden w-full max-w-lg lg:block animate-slide-in-right" style={{ perspective: "1200px" }}>
            {/* Ambient glow behind laptop */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-cyan-500/10 blur-2xl" />

            {/* Main desk surface */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#12121e] via-[#161625] to-[#1a1a2e] p-6 sm:p-8 ring-1 ring-white/[0.06] shadow-2xl shadow-black/40">
              {/* Screen reflection on desk */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-brand-500/[0.04] blur-2xl" />

              {/* ── Laptop body ── */}
              <div className="relative" style={{ transform: "rotateX(2deg)" }}>
                {/* Lid / screen housing */}
                <div className="rounded-t-2xl bg-gradient-to-b from-[#2a2a3a] to-[#1e1e2e] p-[3px] ring-1 ring-white/[0.08] shadow-inner">
                  {/* Webcam dot */}
                  <div className="relative flex justify-center pt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ink-700 ring-1 ring-ink-600/50">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/50 animate-glow-pulse" />
                    </div>
                  </div>
                  {/* Screen bezel */}
                  <div className="mx-1 mb-1 mt-1.5 overflow-hidden rounded-lg bg-white dark:bg-[#0c0c18]" style={{ aspectRatio: "16/10" }}>
                    {/* ── App UI mockup ── */}
                    <div className="flex h-full">
                      {/* Sidebar */}
                      <div className="hidden w-[22%] flex-shrink-0 border-r border-ink-200/80 bg-gradient-to-b from-ink-50 to-white p-2 dark:border-ink-700/60 dark:from-[#111120] dark:to-[#0e0e1c] sm:block">
                        {/* Logo */}
                        <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-2 dark:bg-brand-600/15">
                          <div className="h-3 w-3 rounded bg-gradient-to-br from-brand-500 to-brand-600" />
                          <div className="h-1.5 w-10 rounded-full bg-brand-300/80 dark:bg-brand-500/60" />
                        </div>
                        {/* Nav items */}
                        {[
                          { name: "Dashboard", active: true },
                          { name: "Compress", active: false },
                          { name: "Merge", active: false },
                          { name: "Split", active: false },
                          { name: "Convert", active: false },
                          { name: "AI Tools", active: false },
                        ].map((item) => (
                          <div
                            key={item.name}
                            className={`mb-0.5 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[7px] sm:text-[8px] transition-colors ${
                              item.active
                                ? "bg-brand-100 font-semibold text-brand-700 dark:bg-brand-600/20 dark:text-brand-300"
                                : "text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800/50"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-sm ${item.active ? "bg-brand-500" : "bg-ink-300 dark:bg-ink-600"}`} />
                            {item.name}
                          </div>
                        ))}
                      </div>
                      {/* Main area */}
                      <div className="flex-1 p-3 sm:p-4">
                        {/* Top bar */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="h-2 w-24 rounded-full bg-ink-200/80 dark:bg-ink-700/60" />
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-ink-200 dark:bg-ink-700" />
                            <div className="h-2 w-2 rounded-full bg-ink-200 dark:bg-ink-700" />
                          </div>
                        </div>
                        {/* Upload zone */}
                        <div className="rounded-xl border-[1.5px] border-dashed border-brand-300/70 bg-gradient-to-b from-brand-50/60 to-white p-4 text-center dark:border-brand-700/50 dark:from-brand-900/15 dark:to-transparent sm:p-6">
                          <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 shadow-sm dark:from-brand-800/40 dark:to-brand-900/20">
                            <span className="text-base">📄</span>
                          </div>
                          <p className="text-[8px] font-bold text-brand-700 sm:text-[10px] dark:text-brand-300">
                            Drop your PDF here
                          </p>
                          <p className="mt-1 text-[6px] text-ink-400 sm:text-[7px] dark:text-ink-500">
                            or click to browse
                          </p>
                        </div>
                        {/* Quick tools row */}
                        <div className="mt-3 flex gap-1.5 sm:mt-4 sm:gap-2">
                          {[
                            { label: "Compress", gradient: "from-teal-400 to-teal-500", shadow: "shadow-teal-500/20" },
                            { label: "Merge", gradient: "from-purple-400 to-purple-500", shadow: "shadow-purple-500/20" },
                            { label: "Split", gradient: "from-blue-400 to-blue-500", shadow: "shadow-blue-500/20" },
                            { label: "Convert", gradient: "from-orange-400 to-orange-500", shadow: "shadow-orange-500/20" },
                          ].map((tool) => (
                            <div
                              key={tool.label}
                              className={`flex-1 cursor-pointer rounded-lg bg-gradient-to-br ${tool.gradient} p-1.5 text-center shadow-sm ${tool.shadow} transition-transform hover:scale-105 sm:rounded-xl sm:p-2.5`}
                            >
                              <div className="mx-auto mb-1 h-3.5 w-3.5 rounded-md bg-white/30 sm:h-4 sm:w-4" />
                              <p className="text-[5px] font-bold text-white/90 sm:text-[7px]">{tool.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hinge */}
                <div className="h-1.5 w-full bg-gradient-to-b from-[#2a2a3a] to-[#222232]" />
                {/* Base / keyboard area */}
                <div className="relative rounded-b-xl bg-gradient-to-b from-[#252535] to-[#1e1e2e] p-2 ring-1 ring-white/[0.05]">
                  <div className="mx-auto h-1 w-12 rounded-full bg-ink-600/40" />
                  {/* Keyboard hint */}
                  <div className="mt-2 grid grid-cols-6 gap-0.5 px-4">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="h-1 rounded-sm bg-ink-600/30" />
                    ))}
                  </div>
                  {/* Trackpad */}
                  <div className="mx-auto mt-2 h-4 w-[40%] rounded-md bg-ink-600/20 ring-1 ring-ink-600/10" />
                </div>
              </div>

              {/* ── Floating 3D icon badges ── */}
              {/* PDF badge — top left */}
              <div className="absolute -top-5 -left-5 animate-float" style={{ animationDelay: "0s" }}>
                <div className="group flex h-14 w-14 cursor-default items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-xl shadow-red-500/25 ring-1 ring-red-400/20 transition-transform hover:scale-110">
                  <span className="text-sm font-extrabold tracking-tight">PDF</span>
                </div>
              </div>

              {/* Merge badge — top right */}
              <div className="absolute -top-3 -right-6 animate-float" style={{ animationDelay: "0.6s" }}>
                <div className="group flex h-12 w-12 cursor-default items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-xl shadow-purple-500/25 ring-1 ring-purple-400/20 transition-transform hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              </div>

              {/* Compress badge — bottom left */}
              <div className="absolute -bottom-4 left-6 animate-float" style={{ animationDelay: "1.2s" }}>
                <div className="group flex h-11 w-11 cursor-default items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-xl shadow-teal-500/25 ring-1 ring-teal-400/20 transition-transform hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              {/* Split badge — right middle */}
              <div className="absolute top-1/2 -right-7 -translate-y-1/2 animate-float" style={{ animationDelay: "1.8s" }}>
                <div className="group flex h-11 w-11 cursor-default items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl shadow-blue-500/25 ring-1 ring-blue-400/20 transition-transform hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>

              {/* AI sparkle badge — top center */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: "0.3s" }}>
                <div className="group flex h-10 w-10 cursor-default items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-500/25 ring-1 ring-amber-400/20 transition-transform hover:scale-110">
                  <span className="text-base">✨</span>
                </div>
              </div>

              {/* Desk props */}
              {/* Coffee mug */}
              <div className="absolute -bottom-3 right-8 hidden animate-float sm:block" style={{ animationDelay: "2.2s" }}>
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg rounded-br-none bg-gradient-to-b from-ink-700 to-ink-800 ring-1 ring-ink-600/50">
                    <span className="text-[6px] font-bold tracking-wide text-brand-300/80 uppercase">PDF</span>
                  </div>
                  {/* Handle */}
                  <div className="absolute -right-1.5 top-1.5 h-4 w-2 rounded-r-full border-2 border-ink-600 border-l-0" />
                  {/* Steam */}
                  <div className="absolute -top-3 left-2.5 flex gap-0.5 opacity-40">
                    <div className="h-2 w-px rounded-full bg-ink-400 animate-float" style={{ animationDelay: "0.2s" }} />
                    <div className="h-3 w-px rounded-full bg-ink-400 animate-float" style={{ animationDelay: "0.5s" }} />
                    <div className="h-2 w-px rounded-full bg-ink-400 animate-float" style={{ animationDelay: "0.8s" }} />
                  </div>
                </div>
              </div>

              {/* Tiny plant */}
              <div className="absolute -bottom-4 left-0 hidden sm:block animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex flex-col items-center">
                  <div className="text-base leading-none">🌿</div>
                  <div className="mt-0.5 h-3 w-4 rounded-b-lg bg-gradient-to-b from-amber-700 to-amber-800" />
                </div>
              </div>

              {/* Connection lines (SVG) */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 300" fill="none">
                <defs>
                  <linearGradient id="hero-trail" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path d="M70 35 C 150 50, 280 25, 350 45" stroke="url(#hero-trail)" strokeWidth="1" strokeDasharray="3 5" />
                <path d="M330 130 C 280 170, 180 180, 80 250" stroke="url(#hero-trail)" strokeWidth="1" strokeDasharray="3 5" />
                <path d="M200 15 C 200 60, 160 100, 140 140" stroke="url(#hero-trail)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMO_PROMPTS = [
  { label: "📝 Summarize", prompt: "Summarize what PDF Quick Tools offers in 3 bullet points." },
  { label: "💡 Explain", prompt: "Explain how PDF compression works in simple terms." },
  { label: "🎯 Quiz me", prompt: "Create 3 true/false questions about PDF file formats." },
  { label: "🔑 Key points", prompt: "List the top 5 most useful free PDF tools everyone should know about." },
];

function AiDemo() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(prompt?: string) {
    const q = prompt || input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const reply = await callGemini(
        `You are a friendly AI assistant for PDF Quick Tools (a free browser-based PDF utility). Keep answers short (2-4 sentences max), helpful, and casual. User asked: ${q}`,
      );
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ AI is unavailable right now. Try again in a moment!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={`${sectionWrap} mt-20`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0c1a] via-[#10102a] to-[#0a0f1e] p-6 sm:p-8 lg:p-10 ring-1 ring-white/[0.06] shadow-2xl shadow-brand-900/20">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 text-white animate-glow-pulse">
              <SparkIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Try AI Live — No Upload Needed
              </h2>
              <p className="text-xs text-ink-400 sm:text-sm">
                Ask anything about PDFs, file formats, or our tools
              </p>
            </div>
          </div>

          {/* Quick prompt chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {DEMO_PROMPTS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                disabled={loading}
                onClick={() => handleSend(chip.prompt)}
                className="btn-press rounded-full bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-ink-300 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.1] hover:text-white hover:ring-brand-500/40 disabled:opacity-50 sm:text-sm"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div className="mt-5 max-h-72 space-y-3 overflow-y-auto rounded-2xl bg-black/20 p-4 ring-1 ring-white/[0.04]">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] ring-1 ring-white/[0.06]">
                  <span className="text-2xl">🧠</span>
                </div>
                <p className="text-sm font-medium text-ink-300">
                  Pick a prompt above or type your own question
                </p>
                <p className="mt-1 text-xs text-ink-500">
                  Powered by Gemini AI — instant responses
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-white/[0.07] text-ink-200 ring-1 ring-white/[0.06] rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3 ring-1 ring-white/[0.06]">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: "0s" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: "0.15s" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="mt-4 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about PDFs..."
              disabled={loading}
              className="flex-1 rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-ink-500 ring-1 ring-white/[0.08] outline-none transition-all focus:ring-brand-500/50 focus:ring-2 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-press rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition-all hover:shadow-xl hover:shadow-brand-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Select & Upload",
    body: "Drop your PDF file or pick from device. Instant loading with zero wait time.",
    icon: "📂",
    badge: "100% Local",
  },
  {
    number: "02",
    title: "One-Click Magic",
    body: "Choose compress, merge, convert, or chat with AI. Fast browser-side processing.",
    icon: "⚡",
    badge: "Hardware-Accelerated",
  },
  {
    number: "03",
    title: "Download Instantly",
    body: "Grab clean, un-watermarked results directly to your disk with zero data trails.",
    icon: "🎯",
    badge: "No Watermark",
  },
];

function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className={`${sectionWrap} mt-24 animate-slide-in-right`}>
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:ring-brand-700/40 mb-3">
          Streamlined Process
        </span>
        <h2 id="how-heading" className={heading.h2}>
          How It Works in 3 Quick Steps
        </h2>
        <p className={`mt-2.5 text-base ${muted}`}>
          Zero sign-ups, no waiting in cloud queues, and zero file uploads to foreign servers.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-3 stagger-slide relative">
        {STEPS.map((step, idx) => (
          <li
            key={step.number}
            className="group relative rounded-3xl bg-white p-8 ring-1 ring-ink-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-300 dark:bg-ink-900 dark:ring-ink-800 dark:hover:ring-brand-500/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl group-hover:scale-110 transition-transform duration-300 dark:bg-brand-900/30">
                {step.icon}
              </span>
              <span className="text-3xl font-black text-ink-200 group-hover:text-brand-400/60 transition-colors dark:text-ink-800">
                {step.number}
              </span>
            </div>

            <div className="mt-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {step.badge}
              </span>
              <h3 className="mt-1 text-lg font-bold text-ink-900 dark:text-white">
                {step.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function AdSlotRow() {
  return (
    <div className={sectionWrap}>
      <AdSlot />
    </div>
  );
}

const REASONS = [
  {
    icon: BoltIcon,
    title: "Blazing Browser Speed",
    body: "Direct WebAssembly and client-side processing without uploading megabytes over the wire.",
    highlight: "Zero Latency",
  },
  {
    icon: LockIcon,
    title: "100% Client Privacy",
    body: "Your sensitive contracts, tax docs, and personal files never touch any external server.",
    highlight: "Bank-Grade Privacy",
  },
  {
    icon: SparkIcon,
    title: "Free Forever & Unlimited",
    body: "No hidden subscriptions, watermark traps, or page limits on everyday document workflows.",
    highlight: "No Hidden Paywall",
  },
];

function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className={`${sectionWrap} mt-20 animate-fade-in-up`}>
      <div className="text-center max-w-xl mx-auto">
        <h2 id="why-heading" className={heading.h2}>
          Engineered for Frictionless Workflows
        </h2>
        <p className={`mt-2.5 ${muted}`}>
          Why thousands choose PDF Quick Tools over heavy software suites.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3 stagger-bounce">
        {REASONS.map((reason) => (
          <li
            key={reason.title}
            className="group relative rounded-3xl bg-white p-8 ring-1 ring-ink-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-300 dark:bg-ink-900 dark:ring-ink-800 dark:hover:ring-brand-500/50"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white dark:from-brand-900/40 dark:to-brand-800/30 dark:text-brand-300 dark:group-hover:bg-brand-600 dark:group-hover:text-white">
              <reason.icon className="h-6 w-6" />
            </span>
            <span className="mt-6 inline-block text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {reason.highlight}
            </span>
            <h3 className="mt-1 text-lg font-bold text-ink-900 dark:text-white">
              {reason.title}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{reason.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const PRIVACY_POINTS = [
  "Your file is opened and processed by your own browser, on your own device.",
  "Nothing is uploaded, so there is no copy of your document on any server.",
  "The finished file is held in your browser's memory until you close the tab.",
  "No account, no email address and no tracking of what is inside your files.",
];

function Privacy() {
  return (
    <section
      aria-labelledby="privacy-heading"
      className={`${sectionWrap} mt-20 animate-blur-in`}
    >
      <div className="overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 text-white sm:px-10 dark:bg-ink-900 dark:ring-1 dark:ring-ink-800">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300 animate-glow-pulse">
              <LockIcon className="h-5.5 w-5.5 animate-float" />
            </span>
            <h2 id="privacy-heading" className="mt-5 text-2xl font-bold sm:text-3xl">
              Your files stay private
            </h2>
            <p className="mt-4 text-ink-300">
              Most online PDF tools ask you to upload your document to their
              servers first. This one does not, because it does not need to.
              Everything runs inside the browser tab you already have open.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/privacy" className={button("primary", "md")}>
                Read the Privacy Policy
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
              >
                Try a tool
              </Link>
            </div>
          </div>

          <ul className="space-y-3.5">
            {PRIVACY_POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-ink-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-ink-400">
          We don't need your account to use our basic PDF tools.
        </p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={`${sectionWrap} mt-20 animate-fade-in-up`}>
      <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-purple-600 px-6 py-12 text-center sm:px-10 sm:py-14 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Pick a tool and get it done
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">
          Upload, process, download. No account, no software, no waiting for an
          upload to finish.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/tools"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-brand-700 transition-colors hover:bg-brand-50 btn-ripple hover-scale"
          >
            Explore PDF Tools
          </Link>
          <Link
            to="/merge-pdf"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/10 btn-ripple hover-scale"
          >
            Merge PDFs
          </Link>
        </div>
      </div>
    </section>
  );
}
