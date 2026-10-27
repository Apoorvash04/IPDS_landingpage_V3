import { site } from '@/lib/site';
import ContactForm from './ContactForm';

export default function Contact() {
  const { address: a } = site;
  return (
    <section className="sec" id="contact" aria-labelledby="contact-title" style={{ paddingTop: 'clamp(60px,8vw,120px)' }}>
      <div className="wrap contact-grid">
        <div>
          <div className="label" data-up style={{ marginBottom: 22 }}><b>(06)</b> Contact</div>
          <h2 id="contact-title" className="h2" data-split>Get in <em>touch.</em></h2>
          <address className="cinfo">
            <a href={`tel:${site.phones[0].tel}`} data-up>
              <small>Phone</small>
              <span>{site.phones.map((p, i) => <span key={p.tel}>{i > 0 && <br />}{p.display}</span>)}</span>
            </a>
            <a href={`mailto:${site.email}`} data-up><small>Email</small><span>{site.email}</span></a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" data-up><small>WhatsApp</small><span>{site.phones[1].display}</span></a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" data-up>
              <small>Office</small><span>{a.street}, {a.locality}, {a.city}</span>
            </a>
          </address>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
