'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setLenis } from './lenis';
import { initIntro, initMarquee, initNav, initPointer, initProcess, initReveals, type Cleanup } from './animations';

/** Boots smooth scrolling and all animations; re-runs on every route change. Renders nothing. */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('js-motion'); // JS took over: disables the CSS preloader fallback
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth scroll (skipped for reduced motion)
    let lenis: Lenis | null = null;
    const raf = (t: number) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    // Same-page hash links scroll smoothly instead of jumping
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a');
      if (!a || !a.hash || a.target) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const target = url.hash === '#top' ? 0 : document.querySelector<HTMLElement>(url.hash);
      if (target === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.6, force: true, easing: (x) => 1 - Math.pow(1 - x, 4) });
      else if (target === 0) scrollTo({ top: 0, behavior: 'smooth' });
      else target.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);

    const cleanups: (Cleanup | void)[] = [];
    const ctx = gsap.context(() => {
      initIntro();
      initReveals();
      cleanups.push(initProcess(), initMarquee(reduce), initPointer());
      initNav();
    });

    const refresh = () => ScrollTrigger.refresh();
    addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cleanups.forEach((c) => c?.());
      ctx.revert();
      document.removeEventListener('click', onClick);
      removeEventListener('load', refresh);
      if (lenis) { gsap.ticker.remove(raf); lenis.destroy(); setLenis(null); }
    };
  }, [pathname]);

  return null;
}
