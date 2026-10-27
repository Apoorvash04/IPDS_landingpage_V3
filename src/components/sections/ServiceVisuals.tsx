import type { ServiceId } from '@/lib/site';
import Terminal from './Terminal';

/** Decorative animated illustration for each service card (CSS-driven, aria-hidden). */

const Rack = () => (
  <div className="rack" aria-hidden="true">
    {Array.from({ length: 7 }, (_, i) => (
      <div className="u" key={i}><i /><i /><i /><span className="slots" /><span className="bar" /></div>
    ))}
  </div>
);

const Ring = () => (
  <div className="ring" aria-hidden="true">
    <svg viewBox="0 0 132 132">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF6A4A" /><stop offset="1" stopColor="#E3164D" /></linearGradient>
      </defs>
      <circle className="bgc" cx="66" cy="66" r="56" />
      <circle className="fg" cx="66" cy="66" r="56" />
    </svg>
    <div className="in">
      <div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 01-15.5 6.2M3 12a9 9 0 0115.5-6.2" /><path d="M18 2v4h-4M6 22v-4h4" /></svg>
        <small>SYNC</small>
      </div>
    </div>
  </div>
);

const Wifi = () => (
  <div className="wifi" aria-hidden="true">
    <svg viewBox="0 0 150 110"><path d="M10 45a90 90 0 01130 0" /><path d="M33 68a58 58 0 0184 0" /><path d="M55 90a27 27 0 0140 0" /><circle cx="75" cy="102" r="6" /></svg>
  </div>
);

const CABLES = ['M70 30 C250 30 350 75 530 75', 'M70 75 C250 75 350 30 530 30', 'M70 120 C250 120 350 120 530 120', 'M70 30 C250 30 350 120 530 120', 'M70 120 C250 120 350 75 530 75'];
const PORTS = [30, 75, 120];
const Cables = () => (
  <svg className="cables" viewBox="0 0 600 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    {CABLES.map((d) => <path className="base" d={d} key={`b${d}`} />)}
    {CABLES.map((d) => <path className="flow" d={d} key={`f${d}`} />)}
    {PORTS.flatMap((y) => [
      <rect key={`l${y}`} x="20" y={y - 12} width="50" height="24" rx="6" />,
      <rect key={`r${y}`} x="530" y={y - 12} width="50" height="24" rx="6" />,
      <circle key={`ll${y}`} className="led" cx="32" cy={y} r="3" />,
      <circle key={`rl${y}`} className="led" cx="568" cy={y} r="3" />,
    ])}
  </svg>
);

const Wave = () => (
  <div className="wave" aria-hidden="true">
    {Array.from({ length: 32 }, (_, i) => (
      <i key={i} style={{ '--i': i, '--h': (0.3 + Math.abs(Math.sin(i * 0.55)) * 0.7).toFixed(2) } as React.CSSProperties} />
    ))}
  </div>
);

export default function ServiceVisual({ id }: { id: ServiceId }) {
  switch (id) {
    case 'server': return <Rack />;
    case 'backup': return <Ring />;
    case 'wireless': return <Wifi />;
    case 'cabling': return <Cables />;
    case 'telephony': return <Wave />;
    case 'professional': return <Terminal />;
  }
}
