/**
 * Text splitters for reveal animations. They run client-side after hydration, so the server HTML
 * (what search engines read) stays plain text. Each is idempotent: calling twice returns the same spans.
 */

const done = (el: HTMLElement, key: string) => el.dataset[key] === '1';

/** Wraps every character in <span class="ch">. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  if (!done(el, 'splitChars')) {
    el.innerHTML = [...(el.textContent ?? '')]
      .map((c, i) => `<span class="ch" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`)
      .join('');
    el.dataset.splitChars = '1';
  }
  return [...el.querySelectorAll<HTMLElement>('.ch')];
}

function splitTextNodes(el: HTMLElement, make: (word: string) => HTMLElement) {
  const walk = (node: Node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      (n.textContent ?? '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(' ') : make(part));
      });
      n.replaceWith(frag);
    } else if (n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName !== 'BR') walk(n);
  });
  walk(el);
}

/** Wraps every word in a clipping mask (.wm > .wi), keeping <em>/<br> intact. */
export function splitMaskWords(el: HTMLElement): HTMLElement[] {
  if (!done(el, 'splitMask')) {
    splitTextNodes(el, (w) => {
      const m = document.createElement('span'); m.className = 'wm';
      const i = document.createElement('span'); i.className = 'wi'; i.textContent = w;
      m.appendChild(i);
      return m;
    });
    el.dataset.splitMask = '1';
  }
  return [...el.querySelectorAll<HTMLElement>('.wi')];
}

/** Wraps every word in <span class="w">. */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (!done(el, 'splitWords')) {
    splitTextNodes(el, (w) => {
      const s = document.createElement('span'); s.className = 'w'; s.textContent = w;
      return s;
    });
    el.dataset.splitWords = '1';
  }
  return [...el.querySelectorAll<HTMLElement>('.w')];
}
