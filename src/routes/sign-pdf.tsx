import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { VisualPageTool } from "#/components/VisualPageTool";
import { ToolShell } from "#/components/ToolShell";
import { signPdf } from "#/lib/operations";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";

const tool = toolByHref("/sign-pdf");

export const Route = createFileRoute("/sign-pdf")({
  head: () => pageHead({ title: tool.title, description: tool.description, path: tool.href }),
  component: SignPage,
});

const FAQ = [
  { question: "Where does my signature appear?", answer: "It is placed near the lower-right corner of every selected page, sized to fit common document layouts." },
  { question: "Can I sign multiple pages at once?", answer: "Yes. Select every page that needs the same signature, then create the signed PDF." },
  { question: "Is the signature saved anywhere?", answer: "No. The signature is kept in this browser tab and embedded only into the PDF you download." },
  { question: "Can I use a phone or tablet?", answer: "Yes. The signature pad supports mouse, pen and touch input." },
];

function SignPage() {
  const [signature, setSignature] = useState("");
  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <VisualPageTool
        toolName={tool.name}
        legend="Pages to sign"
        hint="Select the pages where your signature should appear."
        actionLabel="Sign PDF"
        startOverLabel="Sign Another PDF"
        successTitle="PDF signed successfully"
        selectAllByDefault
        emptySelectionMessage="Select at least one page to sign."
        canRun={signature.length > 0}
        options={({ disabled }) => <SignaturePad disabled={disabled} value={signature} onChange={setSignature} />}
        run={async (file, indexes, report) => [await signPdf(file, indexes, signature, report)]}
        stats={({ selected }) => [
          { label: "Pages signed", value: String(selected.length), highlight: true },
          { label: "Signature", value: "Embedded PNG" },
        ]}
      />
    </ToolShell>
  );
}

function SignaturePad({ disabled, value, onChange }: { disabled: boolean; value: string; onChange: (value: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#172033";
    context.lineWidth = 3;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.setLineDash([]);
  }, []);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const bounds = canvas.getBoundingClientRect();
    return { x: (event.clientX - bounds.left) * (canvas.width / bounds.width), y: (event.clientY - bounds.top) * (canvas.height / bounds.height) };
  }

  function start(event: React.PointerEvent<HTMLCanvasElement>) {
    if (disabled) return;
    drawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const { x, y } = point(event);
    context.beginPath();
    context.moveTo(x, y);
  }

  function move(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const { x, y } = point(event);
    context.lineTo(x, y);
    context.stroke();
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL("image/png"));
  }

  function clear() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  }

  return (
    <div className="rounded-2xl bg-ink-50 p-4 ring-1 ring-ink-200/80 dark:bg-ink-950/45 dark:ring-ink-800">
      <div className="flex items-center justify-between gap-3">
        <div><h3 className="text-sm font-semibold text-ink-900 dark:text-white">Draw your signature</h3><p className="mt-1 text-xs text-ink-500">Use your mouse, finger or stylus.</p></div>
        <button type="button" onClick={clear} disabled={disabled || !value} className="text-sm font-semibold text-brand-700 disabled:opacity-40 dark:text-brand-300">Clear</button>
      </div>
      <canvas ref={canvasRef} width={720} height={220} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} className="mt-4 h-44 w-full touch-none rounded-xl bg-white ring-1 ring-ink-200 dark:bg-ink-900 dark:ring-ink-700" aria-label="Signature drawing area" />
      {!value && <p className="mt-2 text-xs text-ink-500">A signature is required before signing.</p>}
    </div>
  );
}

function About() {
  return <><p>Sign a PDF with a handwritten signature captured directly in the browser. The signature is converted to a transparent image and placed onto the selected pages.</p><p>This is designed for quick approvals and personal workflows. For regulated e-signatures, use a certified signing provider with identity verification and audit trails.</p></>;
}
