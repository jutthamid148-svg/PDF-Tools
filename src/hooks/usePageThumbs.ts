import { useCallback, useEffect, useRef, useState } from "react";
import { FriendlyError } from "#/lib/files";
import { renderThumbnails, revokeThumbnails, type PageThumb } from "#/lib/pdf";

const GENERIC =
  "That PDF could not be previewed. It may be damaged or password protected.";

/** Renders a thumbnail of every page so the visual page pickers have something to show. */
export function usePageThumbs() {
  const [thumbs, setThumbs] = useState<PageThumb[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const thumbsRef = useRef<PageThumb[]>([]);
  const token = useRef(0);

  thumbsRef.current = thumbs;

  useEffect(() => () => revokeThumbnails(thumbsRef.current), []);

  const clear = useCallback(() => {
    token.current += 1;
    revokeThumbnails(thumbsRef.current);
    thumbsRef.current = [];
    setThumbs([]);
    setLoading(false);
    setLoaded(0);
    setTotal(0);
    setError(null);
  }, []);

  const load = useCallback(async (file: File) => {
    token.current += 1;
    const mine = token.current;
    revokeThumbnails(thumbsRef.current);
    thumbsRef.current = [];
    setThumbs([]);
    setError(null);
    setLoaded(0);
    setTotal(0);
    setLoading(true);

    try {
      const { thumbs: rendered, pageCount } = await renderThumbnails(
        file,
        (done, count) => {
          if (token.current !== mine) return;
          setLoaded(done);
          setTotal(count);
        },
      );
      if (token.current !== mine) {
        revokeThumbnails(rendered);
        return;
      }
      thumbsRef.current = rendered;
      setThumbs(rendered);
      setTotal(pageCount);
    } catch (caught) {
      if (token.current !== mine) return;
      setError(caught instanceof FriendlyError ? caught.message : GENERIC);
    } finally {
      if (token.current === mine) setLoading(false);
    }
  }, []);

  return { thumbs, loading, loaded, total, error, load, clear };
}
