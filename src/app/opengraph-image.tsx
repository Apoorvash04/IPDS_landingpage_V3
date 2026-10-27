import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/lib/site';

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social share preview (WhatsApp, LinkedIn, X, Facebook…). Generated at build time. */
export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo-icon.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#fff',
          background:
            'radial-gradient(circle at 85% 15%, rgba(227,22,77,.65), transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,106,74,.35), transparent 50%), #07070B',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 34, fontWeight: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={58} height={64} alt="" />
          {site.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Secure.</span>
          <span style={{ color: 'rgba(255,255,255,.55)' }}>Connected.</span>
          <span style={{ color: '#E3164D' }}>Protected.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#B4B4C2' }}>
          IT Infrastructure · Security · Data Protection · Jodhpur
        </div>
      </div>
    ),
    size,
  );
}
