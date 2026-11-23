import type { MetadataRoute } from 'next';
import { business } from '../lib/business';
import { services } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', 'careers', ...services.map(service => 'services/' + service.slug)];

  return routes.map(route => ({ url: new URL(route, business.url).href }));
}
