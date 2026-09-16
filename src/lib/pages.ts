import { friendly } from "./files";

/**
 * Parses "1-3, 7, 10-12" into zero-based page indexes, in the order written,
 * de-duplicated. Throws a message meant for a person, not a log.
 */
export function parsePageRange(input: string, pageCount: number): number[] {
  const text = input.trim();
  if (text.length === 0) {
    return friendly("Enter which pages you want, for example 1-3, 7.");
  }

  const seen = new Set<number>();
  const pages: number[] = [];

  for (const rawPart of text.split(",")) {
    const part = rawPart.trim();
    if (part.length === 0) continue;

    const range = /^(\d+)\s*-\s*(\d+)$/.exec(part);
    const single = /^(\d+)$/.exec(part);

    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      assertInRange(start, pageCount);
      assertInRange(end, pageCount);
      if (start > end) {
        return friendly(
          `The range "${part}" runs backwards. Write the smaller page first, like ${end}-${start}.`,
        );
      }
      for (let page = start; page <= end; page += 1) push(page);
    } else if (single) {
      const page = Number(single[1]);
      assertInRange(page, pageCount);
      push(page);
    } else {
      return friendly(
        `"${part}" is not a page number or range. Use numbers like 2 or 4-9, separated by commas.`,
      );
    }
  }

  if (pages.length === 0) {
    return friendly("Enter which pages you want, for example 1-3, 7.");
  }
  return pages;

  function push(page: number) {
    const index = page - 1;
    if (seen.has(index)) return;
    seen.add(index);
    pages.push(index);
  }

  function assertInRange(page: number, count: number) {
    if (page < 1 || page > count) {
      friendly(
        `Page ${page} does not exist. This PDF has ${count} page${count === 1 ? "" : "s"}.`,
      );
    }
  }
}

/** Turns zero-based indexes back into "1-3, 7" for display. */
export function formatPageList(indexes: number[]): string {
  if (indexes.length === 0) return "none";
  const sorted = [...indexes].sort((a, b) => a - b);
  const parts: string[] = [];
  let start = sorted[0];
  let previous = sorted[0];

  for (let i = 1; i <= sorted.length; i += 1) {
    const current = sorted[i];
    if (i < sorted.length && current === previous + 1) {
      previous = current;
      continue;
    }
    parts.push(start === previous ? `${start + 1}` : `${start + 1}-${previous + 1}`);
    if (i < sorted.length) {
      start = current;
      previous = current;
    }
  }
  return parts.join(", ");
}
