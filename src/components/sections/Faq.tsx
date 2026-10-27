import { faqs } from '@/lib/site';
import FaqList from './FaqList';

export default function Faq() {
  return (
    <section className="sec" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
      <div className="wrap faq-grid">
        <div>
          <div className="label" data-up style={{ marginBottom: 22 }}><b>(05)</b> FAQ</div>
          <h2 id="faq-title" className="h2" data-split>Questions,<br /><em>answered.</em></h2>
        </div>
        <div data-up>
          <FaqList items={faqs} />
        </div>
      </div>
    </section>
  );
}
