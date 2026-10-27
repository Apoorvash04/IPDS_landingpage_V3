export default function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <span className="blob b1" aria-hidden="true" />
      <span className="blob b2" aria-hidden="true" />
      <div className="wrap">
        <h2 id="cta-title" className="cta-title" data-split>Let&apos;s build<br />something <em>secure.</em></h2>
        <p data-up>Tell us about your network, your data and where your business is headed.</p>
        <a href="/#contact" className="roundbtn magnetic" aria-label="Get in touch">
          <svg className="txt" viewBox="0 0 226 226" aria-hidden="true">
            <defs><path id="circ" d="M113 113 m-97 0 a97 97 0 1 1 194 0 a97 97 0 1 1 -194 0" /></defs>
            <text><textPath href="#circ">GET IN TOUCH • GET IN TOUCH • GET IN TOUCH • </textPath></text>
          </svg>
          <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </section>
  );
}
