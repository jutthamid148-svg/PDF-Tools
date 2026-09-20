import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OptionCards } from "#/components/OptionCards";
import { OptionGroup, ToolShell } from "#/components/ToolShell";
import { VisualPageTool } from "#/components/VisualPageTool";
import { cx } from "#/components/ui";
import { watermarkPdf } from "#/lib/operations";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";

const tool = toolByHref("/watermark-pdf");

export const Route = createFileRoute("/watermark-pdf")({
  head: () => pageHead({ title: tool.title, description: tool.description, path: tool.href }),
  component: WatermarkPage,
});

const COLORS = [
  { value: "dark" as const, label: "Ink", description: "Clear and professional" },
  { value: "blue" as const, label: "Blue", description: "Use the site accent" },
  { value: "red" as const, label: "Red", description: "Attention or draft copy" },
];

const COLOR_VALUES = {
  dark: [0.18, 0.22, 0.3] as [number, number, number],
  blue: [0.12, 0.36, 0.82] as [number, number, number],
  red: [0.72, 0.16, 0.16] as [number, number, number],
};

const FAQ = [
  { question: "Can I watermark only some pages?", answer: "Yes. Select the pages you want from the visual page picker before applying the watermark." },
  { question: "Can I rotate the watermark?", answer: "Yes. Choose a diagonal, horizontal or vertical angle, or enter any angle between -180 and 180 degrees." },
  { question: "Is the watermark permanent?", answer: "The downloaded PDF contains the watermark as page content. Keep your original if you may need an unmarked copy later." },
  { question: "Are my files uploaded?", answer: "No. The watermark is applied inside your browser and your PDF stays on your device." },
];

function WatermarkPage() {
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState("42");
  const [angle, setAngle] = useState("-35");
  const [opacity, setOpacity] = useState("0.22");
  const [color, setColor] = useState<(typeof COLORS)[number]["value"]>("dark");
  const valid = text.trim().length > 0 && Number(fontSize) >= 8 && Number(angle) >= -180 && Number(angle) <= 180;

  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <VisualPageTool
        toolName={tool.name}
        legend="Pages to watermark"
        hint="Every page starts selected. Untick pages that should remain unchanged."
        actionLabel="Add Watermark"
        startOverLabel="Watermark Another PDF"
        successTitle="Watermark added successfully"
        selectAllByDefault
        emptySelectionMessage="Select at least one page to watermark."
        canRun={valid}
        options={({ disabled }) => (
          <div className="space-y-5">
            <OptionGroup legend="Watermark settings" hint="The text is centered on each selected page.">
              <label className="block text-sm font-semibold text-ink-900 dark:text-white" htmlFor="watermark-text">Text</label>
              <input id="watermark-text" value={text} disabled={disabled} onChange={(event) => setText(event.target.value)} maxLength={80} className="mt-2 block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-ink-900 ring-1 ring-ink-200 focus:ring-2 focus:ring-brand-500 dark:bg-ink-900 dark:text-white dark:ring-ink-700" />
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <NumberInput id="watermark-size" label="Font size" value={fontSize} disabled={disabled} onChange={setFontSize} min="8" max="96" />
                <NumberInput id="watermark-angle" label="Angle" value={angle} disabled={disabled} onChange={setAngle} min="-180" max="180" />
                <NumberInput id="watermark-opacity" label="Opacity" value={opacity} disabled={disabled} onChange={setOpacity} min="0.05" max="1" step="0.05" />
              </div>
            </OptionGroup>
            <OptionGroup legend="Watermark color">
              <OptionCards name="watermark-color" options={COLORS} value={color} onChange={setColor} disabled={disabled} />
            </OptionGroup>
            {!valid && <p className="text-sm text-red-600 dark:text-red-400">Enter text, a font size from 8 to 96, and an angle from -180 to 180.</p>}
          </div>
        )}
        run={async (file, indexes, report) => [await watermarkPdf(file, indexes, { text, fontSize: Number(fontSize), angle: Number(angle), opacity: Number(opacity), color: COLOR_VALUES[color] }, report)]}
        stats={({ selected }) => [
          { label: "Pages watermarked", value: String(selected.length), highlight: true },
          { label: "Text", value: text.trim() || "-" },
          { label: "Angle", value: `${angle}°` },
        ]}
      />
    </ToolShell>
  );
}

function NumberInput({ id, label, value, disabled, onChange, min, max, step = "1" }: { id: string; label: string; value: string; disabled: boolean; onChange: (value: string) => void; min: string; max: string; step?: string }) {
  return (
    <label className="block text-sm font-semibold text-ink-900 dark:text-white" htmlFor={id}>
      {label}
      <input id={id} type="number" value={value} min={min} max={max} step={step} disabled={disabled} onChange={(event) => onChange(event.target.value)} className={cx("mt-2 block w-full rounded-xl bg-white px-3.5 py-2.5 font-normal text-ink-900 ring-1 ring-ink-200 focus:ring-2 focus:ring-brand-500 dark:bg-ink-900 dark:text-white dark:ring-ink-700", disabled && "opacity-60")} />
    </label>
  );
}

function About() {
  return <><p>Add a visible ownership, review or confidentiality label to selected pages without sending the source document anywhere.</p><p>The watermark is drawn as PDF text, so the original page remains sharp and the output stays compact.</p></>;
}
