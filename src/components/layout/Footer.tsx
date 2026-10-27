import Image from 'next/image';
import { navLinks, services, site } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <a href="/#top" className="logo">
              <Image src="/logo-icon.png" alt="" width={30} height={33} />
              {site.name}
            </a>
            <p>From innovation to information, we protect what matters most: your IP and your data.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="h4">Explore</h2>
            <ul>{navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <div>
            <h2 className="h4">Services</h2>
            <ul>{services.slice(0, 5).map((s) => <li key={s.id}><a href="/#services">{s.title}</a></li>)}</ul>
          </div>
          <address>
            <h2 className="h4">Contact</h2>
            <ul>
              {site.phones.map((p) => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></li>)}
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </address>
        </div>
        <div className="wordmark" id="wordmark" aria-hidden="true">
          <span>I</span><span>P</span><span className="amp">&amp;</span><span>D</span><span>S</span>
        </div>
        <div className="foot-bottom">
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>{site.address.locality}, {site.address.city}, {site.address.region}</span>
        </div>
      </div>
    </footer>
  );
}
