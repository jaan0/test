"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

function splitWords(text) {
  // Preserve spaces by splitting on spaces and re-adding them in render
  return text.trim().split(/\s+/g);
}

export default function TextScrollReveal({
  text,
  className = "",
  baseOpacity = 0.2,
  durationMs = 250,
  // For scroll-driven reveal, this is the scroll "distance budget" per word (in px)
  pxPerWord = 36,
  as: Tag = "h2",
  inactiveClassName = "text-gray-500",
  activeClassName = "text-white",
  wordGapClassName = "mr-[0.25ch]",
}) {
  const ref = useRef(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const words = useMemo(() => splitWords(text), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      // Progress starts when the element is near entering viewport, and advances as you scroll past it.
      // Map scroll distance to "words revealed" using pxPerWord.
      const start = vh * 0.85; // start revealing when top gets close to viewport
      const distance = start - rect.top; // increases as you scroll down
      const next = Math.max(0, Math.min(words.length, Math.floor(distance / pxPerWord)));

      setRevealedCount((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, idx) => (
        <span
          key={`${w}-${idx}`}
          aria-hidden="true"
          className={[
            "textscroll_word",
            wordGapClassName,
            idx < revealedCount ? activeClassName : inactiveClassName,
          ].join(" ")}
          style={{
            opacity: idx < revealedCount ? 1 : baseOpacity,
            transition: `opacity ${durationMs}ms ease, color ${durationMs}ms ease`,
          }}
        >
          {w}
        </span>
      ))}
    </Tag>
  );
}

