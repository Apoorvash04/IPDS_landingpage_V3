'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Rolls through words every few seconds. Text is swapped imperatively so React never re-renders mid-animation. */
export default function WordCycler({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const win = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = win.current;
    if (!el || words.length < 2) return;
    let i = 0;
    const id = setInterval(() => {
      const cur = el.lastElementChild as HTMLElement;
      i = (i + 1) % words.length;
      const nx = document.createElement('span');
      nx.textContent = words[i];
      el.appendChild(nx);
      gsap.timeline({ onComplete: () => cur.remove() })
        .to(cur, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' })
        .fromTo(nx, { yPercent: 0 }, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 0)
        .set(nx, { yPercent: 0 });
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return <span className="win" ref={win}><span>{words[0]}</span></span>;
}
