import { pillars } from '@/lib/site';

export default function About() {
  return (
    <section className="manifesto" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title" className="label" data-up><b>(01)</b> Who we are</h2>
        <p className="mf-text" id="mf">
          IP &amp; Data Solutions is an ICT company that builds and protects the technology businesses depend on. From the <em>server room</em> to
          the <em>last cable</em>, we deliver infrastructure that is fast, reliable and <em>secure by design</em>, for companies in every industry.
        </p>
        <div className="mf-grid">
          {pillars.map((p) => (
            <div className="mf-item" data-up key={p.title}>
              <span className="mono">{p.kicker}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
