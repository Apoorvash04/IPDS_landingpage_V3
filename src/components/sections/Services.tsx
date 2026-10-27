import { extraServices, services } from '@/lib/site';
import ServiceVisual from './ServiceVisuals';

const AREA = ['ca', 'cb', 'cc', 'cd', 'ce', 'cf'];

export default function Services() {
  return (
    <section className="sec" id="services" aria-labelledby="services-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="label" data-up style={{ marginBottom: 22 }}><b>(02)</b> Services</div>
            <h2 id="services-title" className="h2" data-split>Everything your<br />infrastructure <em>needs.</em></h2>
          </div>
          <p data-up>Six core practices, delivered by one team, from first rack to round-the-clock support.</p>
        </div>

        <div className="bento" id="bento">
          {services.map((s, i) => (
            <article className={`card ${AREA[i]}`} data-card key={s.id}>
              <div className="k"><span>{s.kicker}</span>{s.meta && <span>{s.meta}</span>}</div>
              <div className="viz"><ServiceVisual id={s.id} /></div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </article>
          ))}
          <article className="card cg" data-card>
            <div className="k"><span>+ Also</span></div>
            <ul className="viz chips">{extraServices.map((x) => <li key={x}>{x}</li>)}</ul>
            <div>
              <h3>And more</h3>
              <p>Ask us about your stack.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
