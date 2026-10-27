import { faqs, services, site } from '@/lib/site';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** LocalBusiness + WebSite schema, rendered on every page. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
            '@id': `${site.url}/#organization`,
            name: site.name,
            alternateName: site.shortName,
            url: site.url,
            logo: `${site.url}/logo-icon.png`,
            image: `${site.url}/opengraph-image`,
            description: site.description,
            slogan: site.tagline,
            email: site.email,
            telephone: site.phones[0].tel,
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.address.street,
              addressLocality: `${site.address.locality}, ${site.address.city}`,
              addressRegion: site.address.region,
              addressCountry: site.address.country,
            },
            areaServed: { '@type': 'State', name: site.address.region },
            contactPoint: site.phones.map((p) => ({
              '@type': 'ContactPoint',
              telephone: p.tel,
              contactType: 'sales',
              areaServed: 'IN',
              availableLanguage: ['en', 'hi'],
            })),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'IT infrastructure services',
              itemListElement: services.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.title, description: s.description },
              })),
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: site.name,
            publisher: { '@id': `${site.url}/#organization` },
            inLanguage: 'en-IN',
          },
        ],
      }}
    />
  );
}

/** FAQPage schema: lets Google show the questions as rich results. */
export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    />
  );
}
