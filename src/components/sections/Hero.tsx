import { services, site } from '@/lib/site';
import ArrowButton from '@/components/ui/ArrowButton';
import HeroCanvas from './HeroCanvas';
import WordCycler from './WordCycler';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="wrap">
        <h1 id="hero-title" className="hero-h1">
          <span className="hero-tag hf"><span className="dot-live" aria-hidden="true" />IT Infrastructure, Security &amp; Data Protection in {site.address.city}</span>
          <span className="sr-only">{site.tagline}</span>
          <span className="hero-title" aria-hidden="true">
            <span className="ln"><span className="sp">Secure.</span></span>
            <span className="ln right outline"><span className="sp">Connected.</span></span>
            <span className="ln red"><span className="sp">Protected.</span></span>
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="hf">
            <p>From innovation to information, we design, build and look after the infrastructure that keeps your business running, and protect what matters most: your IP and your data.</p>
            <div className="hero-ctas">
              <ArrowButton href="/#contact">Talk to an expert</ArrowButton>
              <ArrowButton href="/#services" variant="line">Explore services</ArrowButton>
            </div>
          </div>
          <div className="cycler hf" aria-hidden="true">
            <span className="now">( We deliver )</span>
            <WordCycler words={services.map((s) => s.title)} />
          </div>
          <div className="scroll-cue hf" aria-hidden="true">Scroll<i /></div>
        </div>
      </div>
    </section>
  );
}
