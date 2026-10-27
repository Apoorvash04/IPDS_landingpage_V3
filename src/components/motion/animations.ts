/**
 * All scroll/intro animations. Each init* function looks for its elements and does nothing
 * if they aren't on the current page, so new pages can reuse the generic hooks:
 *   data-up     → fade up when scrolled into view
 *   data-split  → heading words rise from a mask
 *   data-card   → card pop-in (staggered)
 *   .magnetic   → button follows the cursor
 * Called inside a gsap.context() in MotionRoot, which reverts everything on route change.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './lenis';
import { splitChars, splitMaskWords, splitWords } from './split';

export type Cleanup = () => void;

const $ = <T extends HTMLElement = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
const $$ = <T extends HTMLElement = HTMLElement>(s: string, c: ParentNode = document) => [...c.querySelectorAll<T>(s)];

let introPlayed = false;

/** Preloader counter → curtain → hero letters. Plays the full sequence once per visit. */
export function initIntro() {
  const chars = $$('.hero-title .sp').flatMap(splitChars);
  if (!chars.length) return;
  const pre = $('#pre');
  const shader = $('#gl');
  const finish = () => { pre?.classList.add('done'); introPlayed = true; getLenis()?.start(); };

  if (introPlayed || !pre) {
    finish();
    gsap.from(chars, { yPercent: 115, rotate: 8, duration: 1.2, ease: 'expo.out', stagger: 0.02 });
    gsap.from('.hf', { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.2 });
    return;
  }

  getLenis()?.stop();
  gsap.set(chars, { yPercent: 115, rotate: 8 });
  gsap.set('.hf', { y: 30, opacity: 0 });
  gsap.set('.nav', { y: -40, opacity: 0 });
  if (shader) gsap.set(shader, { opacity: 0, scale: 1.15 });

  const n = { v: 0 };
  const num = $('#preNum');
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.pre-logo', { scale: 0.6, opacity: 0, rotate: -20, duration: 1 }, 0)
    .from('.pre-top span', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.1)
    .to(n, { v: 100, duration: 1.8, ease: 'power3.inOut', onUpdate: () => { if (num) num.textContent = String(Math.round(n.v)).padStart(3, '0'); } }, 0.1)
    .to('.pre-line i', { scaleX: 1, duration: 1.8, ease: 'power3.inOut' }, 0.1)
    .to('.pre-inner', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, '+=.1')
    .to('.pre-panel.p1', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=.2')
    .to('.pre-panel.p2', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=.95')
    .add(finish, '-=.2')
    .addLabel('hero', '-=.75');
  if (shader) tl.to(shader, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, 'hero');
  tl.to(chars, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.028 }, 'hero')
    .to('.nav', { y: 0, opacity: 1, duration: 1.2 }, 'hero+=.4')
    .to('.hf', { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 'hero+=.5');

  // Hero scroll-out parallax
  gsap.to('.hero-title', { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  if (shader) gsap.to(shader, { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
}

/** Generic reveal hooks + section-specific text effects. */
export function initReveals() {
  const ups = $$('[data-up]');
  if (ups.length) {
    gsap.set(ups, { y: 50, opacity: 0 });
    ScrollTrigger.batch(ups, { start: 'top 88%', once: true,
      onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.09, overwrite: true }) });
  }

  $$('[data-split]').forEach((el) => {
    const w = splitMaskWords(el);
    gsap.set(w, { yPercent: 110 });
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(w, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.045 }) });
  });

  const cards = $$('[data-card]');
  if (cards.length) {
    gsap.set(cards, { y: 80, opacity: 0, scale: 0.96 });
    ScrollTrigger.batch(cards, { start: 'top 90%', once: true,
      onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, scale: 1, duration: 1.3, ease: 'expo.out', stagger: 0.1, overwrite: true }) });
  }

  // Manifesto words light up with scroll
  const mf = $('#mf');
  if (mf) gsap.fromTo(splitWords(mf), { opacity: 0.13 }, { opacity: 1, ease: 'none', stagger: 0.1,
    scrollTrigger: { trigger: mf, start: 'top 80%', end: 'bottom 50%', scrub: 0.6 } });

  if ($('.cta-title')) gsap.fromTo('.cta-title', { scale: 0.9 }, { scale: 1, ease: 'none',
    scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'center center', scrub: true } });

  if ($('#wordmark')) gsap.from('#wordmark span', { yPercent: 100, ease: 'expo.out', duration: 1.4, stagger: 0.07,
    scrollTrigger: { trigger: '#wordmark', start: 'top 95%' } });
}

/** Process section: pinned horizontal scroll on desktop, stacked reveal elsewhere. */
export function initProcess(): Cleanup | void {
  const track = $('#track');
  if (!track) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    const dist = () => Math.max(0, track.scrollWidth - innerWidth + parseFloat(getComputedStyle(track).paddingLeft));
    const tw = gsap.to(track, { x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '#processPin', pin: true, scrub: 1, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true, anticipatePin: 1 } });
    gsap.to('#pbar', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#processPin', start: 'top top', end: () => '+=' + dist(), scrub: true } });
    $$('.panel .num').forEach((nm) => gsap.fromTo(nm, { xPercent: 30 }, { xPercent: -10, ease: 'none',
      scrollTrigger: { trigger: nm.parentElement, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } }));
  });
  mm.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
    gsap.set('.panel', { y: 60, opacity: 0 });
    ScrollTrigger.batch('.panel', { start: 'top 90%', once: true,
      onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1 }) });
  });
  return () => mm.revert();
}

/** Why-us marquees: constant drift that speeds up and skews with scroll velocity. */
export function initMarquee(reduce: boolean): Cleanup | void {
  const rows = $$('.mq').map((el) => ({ el, dir: el.classList.contains('r2') ? 1 : -1, x: 0 }));
  if (!rows.length) return;
  rows.forEach((r) => { r.x = r.dir === 1 ? -r.el.scrollWidth / 2 : 0; });
  let vel = 0, skew = 0;
  if (!reduce) ScrollTrigger.create({ trigger: '#why', start: 'top bottom', end: 'bottom top', onUpdate: (s) => { vel = s.getVelocity(); } });
  const tick = (_t: number, dt: number) => {
    vel *= 0.92;
    const boost = 1 + Math.min(Math.abs(vel) / 220, 6);
    skew += (gsap.utils.clamp(-8, 8, vel / -180) - skew) * 0.1;
    rows.forEach((r) => {
      const half = r.el.scrollWidth / 2;
      r.x += r.dir * 0.06 * dt * boost;
      if (r.x <= -half) r.x += half;
      if (r.x > 0) r.x -= half;
      r.el.style.transform = `translate3d(${r.x}px,0,0) skewX(${skew}deg)`;
    });
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

/** Nav: hide on scroll down, show on scroll up; highlight the link of the section in view. */
export function initNav() {
  const nav = $('#nav');
  if (!nav) return;
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => {
    nav.dataset.hidden = String(s.direction === 1 && s.scroll() > 300 && !document.body.classList.contains('menu-open'));
  } });
  const links = $$<HTMLAnchorElement>('.nav-pill a');
  links.forEach((a) => {
    const sec = document.getElementById(a.hash.slice(1));
    if (!sec) return;
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: (s) => { if (s.isActive) links.forEach((x) => { x.dataset.active = String(x === a); }); } });
  });
}

/** Desktop pointer effects: cursor ring, magnetic buttons, bento border glow. */
export function initPointer(): Cleanup | void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const off: Cleanup[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: EventTarget, ev: K | string, fn: (e: PointerEvent) => void) => {
    el.addEventListener(ev, fn as EventListener);
    off.push(() => el.removeEventListener(ev, fn as EventListener));
  };

  const cur = $('#cur'), dot = $('#curDot');
  if (cur && dot) {
    const cx = gsap.quickTo(cur, 'x', { duration: 0.55, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: 0.55, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.12 }), dy = gsap.quickTo(dot, 'y', { duration: 0.12 });
    on(window, 'pointermove', (e) => { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); cur.style.opacity = dot.style.opacity = '1'; });
    on(document, 'pointerleave', () => { cur.style.opacity = dot.style.opacity = '0'; });
    // Delegated so elements added later get the hover state too
    on(document, 'pointerover', (e) => {
      cur.dataset.hover = String(!!(e.target as Element).closest?.('a, button, [data-card], .qa'));
    });
  }

  $$('.magnetic').forEach((el) => {
    const k = el.classList.contains('roundbtn') ? 0.4 : 0.25;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    on(el, 'pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * k); yTo((e.clientY - r.top - r.height / 2) * k); });
    on(el, 'pointerleave', () => { gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1,.35)' }); });
  });

  const bento = $('#bento');
  if (bento) on(bento, 'pointermove', (e) => {
    $$('[data-card]', bento).forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--x', `${e.clientX - r.left}px`);
      c.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });

  return () => off.forEach((f) => f());
}
