import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#07070B',
    theme_color: '#E3164D',
    icons: [{ src: '/logo-icon.png', sizes: '231x255', type: 'image/png' }],
  };
}
