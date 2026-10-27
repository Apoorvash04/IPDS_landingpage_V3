import { processSteps } from '@/lib/site';
import ArrowButton from '@/components/ui/ArrowButton';

export default function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="process-pin" id="processPin">
        <div className="wrap" style={{ width: '100%' }}>
          <div className="process-head">
            <div>
              <div className="label" data-up style={{ marginBottom: 22 }}><b>(03)</b> Process</div>
              <h2 id="process-title" className="h2" data-split>From first call to<br /><em>fully supported.</em></h2>
            </div>
            <div className="pbar" aria-hidden="true"><i id="pbar" /></div>
          </div>
        </div>
        <ol className="track" id="track">
          {processSteps.map((s, i) => (
            <li className="panel" key={s.title}>
              <span className="glow" aria-hidden="true" />
              <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </li>
          ))}
          <li className="panel end">
            <h3>Ready when<br />you are.</h3>
            <p>Tell us where your infrastructure is today. We&apos;ll show you where it could be.</p>
            <ArrowButton href="/#contact" variant="plain" arrow>Start a project</ArrowButton>
          </li>
        </ol>
      </div>
    </section>
  );
}
