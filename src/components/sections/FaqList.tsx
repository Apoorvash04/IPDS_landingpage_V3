'use client';

import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Accordion. Answers stay in the HTML when collapsed, so search engines index all of them. */
export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((o) => (o === i ? null : i));
    // Section heights change → recalculate pinned/scroll-triggered positions after the transition
    setTimeout(() => ScrollTrigger.refresh(), 750);
  };

  return (
    <>
      {items.map((f, i) => (
        <div className={`qa${open === i ? ' open' : ''}`} key={f.q}>
          <h3 style={{ font: 'inherit', margin: 0 }}>
            <button aria-expanded={open === i} aria-controls={`faq-a${i}`} id={`faq-q${i}`} onClick={() => toggle(i)}>
              {f.q}<span className="pm" aria-hidden="true" />
            </button>
          </h3>
          <div className="ans" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
            <div><p>{f.a}</p></div>
          </div>
        </div>
      ))}
    </>
  );
}
