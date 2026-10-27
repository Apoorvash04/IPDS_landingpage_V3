'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { navLinks, site } from '@/lib/site';
import { getLenis } from '@/components/motion/lenis';
import ArrowButton from '@/components/ui/ArrowButton';

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const lenis = getLenis();
    if (open) {
      if (lenis) lenis.stop();
      else document.body.style.overflow = 'hidden';
      gsap.fromTo('.menu a.big span, .menu-foot', { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.25, overwrite: true });
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav-in">
          <a href="/#top" className="logo" aria-label={`${site.name} home`} onClick={close}>
            <Image src="/logo-icon.png" alt="" width={30} height={33} priority />
            {site.shortName}
          </a>
          <nav className="nav-pill" aria-label="Primary">
            {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <ArrowButton href="/#contact">Get a quote</ArrowButton>
          <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
            <i /><i />
          </button>
        </div>
      </header>
      <div className="menu" id="menu" aria-hidden={!open}>
        {[...navLinks, { href: '/#contact', label: 'Contact' }].map((l) => (
          <a key={l.href} className="big" href={l.href} onClick={close} tabIndex={open ? 0 : -1}><span>{l.label}</span></a>
        ))}
        <div className="menu-foot">
          <a href={`tel:${site.phones[0].tel}`} tabIndex={open ? 0 : -1}>{site.phones[0].display}</a>
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>{site.email}</a>
        </div>
      </div>
    </>
  );
}
