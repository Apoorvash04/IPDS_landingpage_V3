import type Lenis from 'lenis';

/** Shared handle to the smooth-scroll instance (null when reduced motion is on or before mount). */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { instance = l; };
export const getLenis = () => instance;
