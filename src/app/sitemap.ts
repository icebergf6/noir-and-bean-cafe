import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noirandbean.com';

  const routes = [
    '',
    '/menu',
    '/order',
    '/reservation',
    '/experience',
    '/about',
    '/events',
    '/promotions',
    '/contact',
    '/account',
    '/admin'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/menu' || route === '/promotions' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/menu' || route === '/order' ? 0.9 : 0.7,
  }));
}
