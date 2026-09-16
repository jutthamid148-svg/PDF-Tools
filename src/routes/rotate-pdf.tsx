import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OptionCards } from "#/components/OptionCards";
import { OptionGroup, ToolShell } from "#/components/ToolShell";
import { VisualPageTool } from "#/components/VisualPageTool";
import { rotatePdf, type RotationAngle } from "#/lib/operations";
import { pageHead } from "#/lib/seo";
import { toolByHref } from "#/lib/tools";

const tool = toolByHref("/rotate-pdf");

export const Route = createFileRoute("/rotate-pdf")({
  head: () =>
    pageHead({
      title: tool.title,
      description: tool.description,
      path: tool.href,
    }),
  component: RotatePage,
});

const ANGLES = [
  { value: "90" as const, label: "90° right", description: "A quarter turn clockwise" },
  { value: "180" as const, label: "180°", description: "Upside down pages" },
  { value: "270" as const, label: "90° left", description: "A quarter turn anticlockwise" },
];

const FAQ = [
  {
    question: "Is the rotation saved permanently?",
    answer:
      "Yes. The new page orientation is written into the PDF itself, so it opens the right way up in every reader and prints correctly. This is different from turning a page in your viewer, which is not saved.",
  },
  {
    question: "Can I rotate only some pages?",
    answer:
      "Yes. Every page starts ticked so you can rotate the whole document in one go, but you can clear the selection and pick only the pages that came out sideways.",
  },
  {
    question: "Which way is 90 degrees?",
    answer:
      "90° right turns pages clockwise, which is the fix for a page whose text reads bottom to top. 90° left turns them the other way. Rotation is added to whatever the page already had.",
  },
  {
    question: "Does rotating reduce quality?",
    answer:
      "No. Only the page's orientation setting changes. The content itself is untouched, so nothing is re-encoded and the file size barely moves.",
  },
  {
    question: "Is my file uploaded?",
    answer:
      "No. The rotation is applied in this browser tab on your own device.",
  },
];

function RotatePage() {
  const [angle, setAngle] = useState<"90" | "180" | "270">("90");

  return (
    <ToolShell tool={tool} faq={FAQ} about={<About />}>
      <VisualPageTool
        toolName={tool.name}
        legend="Pages to rotate"
        hint="Every page starts selected. Untick any that are already the right way up."
        actionLabel="Rotate PDF"
        startOverLabel="Rotate Another PDF"
        successTitle="PDF rotated successfully"
        selectAllByDefault
        emptySelectionMessage="Select at least one page to rotate."
        options={({ disabled }) => (
          <OptionGroup legend="How far should they turn?">
            <OptionCards
              name="angle"
              options={ANGLES}
              value={angle}
              onChange={setAngle}
              disabled={disabled}
            />
          </OptionGroup>
        )}
        run={async (file, indexes, report) => [
          await rotatePdf(file, indexes, Number(angle) as RotationAngle, report),
        ]}
        stats={({ selected, pageCount }) => [
          { label: "Pages rotated", value: String(selected.length), highlight: true },
          { label: "Turned", value: ANGLES.find((a) => a.value === angle)!.label },
          { label: "Document", value: `${pageCount} pages` },
        ]}
      />
    </ToolShell>
  );
}

function About() {
  return (
    <>
      <p>
        A scanner that fed a page in sideways produces a PDF nobody can read
        without tilting their head. Rotating writes the correct orientation into
        the file, so the fix travels with the document instead of living only in
        your own viewer.
      </p>
      <p>
        The page previews show what you are working with, so mixed documents are
        easy to handle: leave the portrait pages alone and turn only the
        landscape scans that came out wrong.
      </p>
      <p>
        Nothing inside the page is redrawn, which means text stays selectable,
        images stay sharp and the file size stays essentially the same.
      </p>
    </>
  );
}
