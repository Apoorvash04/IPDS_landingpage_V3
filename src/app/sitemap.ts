import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Add new pages here as the site grows.
const routes = [{ path: '/', priority: 1, changeFrequency: 'monthly' as const }];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
