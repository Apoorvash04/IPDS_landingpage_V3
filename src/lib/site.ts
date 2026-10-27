/**
 * Single source of truth for company details and page content.
 * Edit text here; sections, metadata, sitemap and structured data all read from this file.
 */

export const site = {
  name: 'IP & Data Solutions',
  shortName: 'IPDS',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ipds.co.in',
  tagline: 'Secure. Connected. Protected.',
  title: 'IP & Data Solutions | IT Infrastructure, Security & Data Protection in Jodhpur',
  description:
    'IP & Data Solutions (IPDS) is a Jodhpur-based ICT company delivering server & storage, backup and disaster recovery, structured cabling, wireless networks, IP telephony and professional IT services for businesses in every industry.',
  keywords: [
    'IT infrastructure Jodhpur',
    'IT company Jodhpur',
    'server and storage solutions',
    'backup and disaster recovery',
    'structured cabling',
    'wireless networking',
    'IP telephony',
    'firewall and network security',
    'managed IT services',
    'data protection',
    'Rajasthan',
  ],
  email: 'info@ipds.co.in',
  phones: [
    { display: '+91 95495 42771', tel: '+919549542771' },
    { display: '+91 99298 42771', tel: '+919929842771' },
  ],
  whatsapp: '919929842771',
  address: {
    street: '371, Ayushman Ashapurna Valley, Near New High Court',
    locality: 'Jhalamand',
    city: 'Jodhpur',
    region: 'Rajasthan',
    country: 'IN',
  },
  mapsUrl: 'https://maps.google.com/?q=Ayushman+Ashapurna+Valley+Jhalamand+Jodhpur',
} as const;

export const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#why', label: 'Why us' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export type ServiceId = 'server' | 'backup' | 'wireless' | 'cabling' | 'telephony' | 'professional';

export const services: { id: ServiceId; title: string; kicker: string; meta?: string; description: string }[] = [
  { id: 'server', title: 'Server & Storage', kicker: '01 — Compute', meta: 'Core', description: 'Reliable compute and storage platforms, scaled to your workloads and ready to grow with you.' },
  { id: 'backup', title: 'Backup Solutions', kicker: '02 — Recovery', description: 'Automated backups and disaster recovery.' },
  { id: 'wireless', title: 'Wireless Solutions', kicker: '03 — Wireless', description: 'Secure, seamless Wi-Fi coverage.' },
  { id: 'cabling', title: 'Structured Cabling', kicker: '04 — Cabling', meta: 'Copper · Fibre', description: 'Clean, standards-based cabling that forms a dependable foundation for your entire network.' },
  { id: 'telephony', title: 'IP Telephony', kicker: '05 — Voice', description: 'Modern voice that keeps every team connected.' },
  { id: 'professional', title: 'Professional Services', kicker: '06 — Expertise', meta: 'Consult · Deploy · Support', description: 'Consulting, deployment and ongoing support from engineers who know your environment.' },
];

export const extraServices = ['Managed IT', 'Cloud Computing', 'Firewall & Security', 'Virtualization / VDI'];

export const pillars = [
  { kicker: '— End to end', title: 'One accountable team', text: 'Consulting, supply, deployment and support, all under one roof.' },
  { kicker: '— Security first', title: 'Protection built in', text: 'Firewalls, backups and recovery plans designed in from day one.' },
  { kicker: '— Any industry', title: 'Sized to your business', text: 'Solutions shaped around how your teams actually work.' },
];

export const processSteps = [
  { title: 'Assess', text: 'We understand your goals, audit your current setup and map the risks and gaps.', tags: ['Site survey', 'Network audit', 'Risk review'] },
  { title: 'Design', text: 'We architect a solution that fits your budget, scale and security requirements.', tags: ['Architecture', 'Sizing', 'Proposal'] },
  { title: 'Deploy', text: 'Our engineers install, configure and test everything with minimal disruption.', tags: ['Installation', 'Configuration', 'Testing'] },
  { title: 'Support', text: 'Ongoing monitoring, maintenance and help whenever you need it.', tags: ['Monitoring', 'Maintenance', 'Helpdesk'] },
];

export const whyUs = [
  { title: 'Security at every layer', text: 'From the firewall to the backup vault, protection is designed in, not bolted on.' },
  { title: 'One partner, end to end', text: 'Consulting, supply, installation and support from a single accountable team.' },
  { title: 'Built for any industry', text: 'Every solution is tailored to how your business actually works.' },
  { title: 'Local, responsive support', text: 'Based in Jodhpur, close by when you need us, with clear communication throughout.' },
];

export const marqueeRows = [
  ['Security-first', 'End-to-end', 'Any industry', 'Local support'],
  ['Reliable', 'Scalable', 'Protected', 'Connected'],
];

export const faqs = [
  { q: 'What industries do you work with?', a: 'We serve businesses across all industries. Every solution is tailored to the size, workflow and requirements of your organisation.' },
  { q: 'Can you take over our existing IT setup?', a: 'Yes. We start by assessing your current infrastructure, then improve, extend or manage it, without forcing you to start from scratch.' },
  { q: 'How do your backup and recovery solutions work?', a: 'We set up automated, scheduled backups of your critical systems and data, along with a tested recovery plan so you can restore operations quickly after an incident.' },
  { q: 'Do you provide support after installation?', a: 'Absolutely. Our professional services include ongoing maintenance, monitoring and support so your systems stay healthy long after go-live.' },
  { q: 'How do I get a quote?', a: "Fill in the form below, call us, or message us on WhatsApp. We'll discuss your requirements and send a tailored proposal." },
];
