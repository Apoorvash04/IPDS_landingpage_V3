import { marqueeRows, whyUs } from '@/lib/site';

export default function WhyUs() {
  return (
    <section className="sec why" id="why" aria-labelledby="why-title">
      <div className="wrap" style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
        <h2 id="why-title" className="label" data-up><b>(04)</b> Why IPDS</h2>
      </div>
      {marqueeRows.map((row, r) => (
        // Rendered twice so the loop is seamless; motion/animations.ts drives the scroll
        <div className={`mq r${r + 1}`} aria-hidden="true" key={r}>
          {[...row, ...row].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      ))}
      <div className="wrap">
        <div className="why-grid">
          {whyUs.map((w, i) => (
            <div className="wp" data-up key={w.title}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
