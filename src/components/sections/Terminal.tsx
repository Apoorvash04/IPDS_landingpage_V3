'use client';

import { useEffect, useRef } from 'react';

const SCRIPT: [cls: string, prefix: string, text: string][] = [
  ['pr', '$ ', 'ipds assess --site=hq'],
  ['ok', '✓ ', 'network topology mapped'],
  ['ok', '✓ ', 'firewall policy hardened'],
  ['ok', '✓ ', 'backup schedule verified'],
  ['pr', '→ ', 'ready to deploy'],
];

/** Fake terminal that types a short script in a loop once it scrolls into view. */
export default function Terminal() {
  const pre = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = pre.current;
    if (!el) return;
    let alive = true;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      while (alive) {
        el.replaceChildren();
        for (const [cls, prefix, text] of SCRIPT) {
          const row = document.createElement('div');
          const p = document.createElement('span'); p.className = cls; p.textContent = prefix;
          const tx = document.createElement('span');
          const caret = document.createElement('span'); caret.className = 'caret';
          row.append(p, tx, caret);
          el.appendChild(row);
          for (const ch of text) { if (!alive) return; tx.textContent += ch; await wait(28 + Math.random() * 40); }
          caret.remove();
          await wait(380);
        }
        const end = document.createElement('div');
        end.innerHTML = '<span class="caret"></span>';
        el.appendChild(end);
        await wait(3200);
      }
    };

    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); run(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => { alive = false; io.disconnect(); };
  }, []);

  return (
    <div className="term" aria-hidden="true">
      <div className="term-top"><i /><i /><i /></div>
      <pre ref={pre} />
    </div>
  );
}
