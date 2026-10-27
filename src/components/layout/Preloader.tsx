import { site } from '@/lib/site';

/** Intro overlay. Its animation lives in motion/animations.ts (initIntro); it hides itself when done. */
export default function Preloader() {
  return (
    <div className="pre" id="pre" aria-hidden="true">
      <div className="pre-panel p2" />
      <div className="pre-panel p1">
        <div className="pre-inner">
          <div className="pre-top"><span>{site.name}</span><span>{site.address.city}, IN</span></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pre-logo" src="/logo-mark-white.png" alt="" width={64} height={71} />
          <div className="pre-bottom"><div className="pre-line"><i /></div><div className="pre-num" id="preNum">000</div></div>
        </div>
      </div>
    </div>
  );
}
