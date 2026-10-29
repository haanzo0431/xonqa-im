export default function sitemap() {
  const baseUrl = 'https://xonqa-im.uz';

  const routes = [
    '',
    '/achievements',
    '/clubs',
    '/contact',
    '/news',
    '/school-profile',
    '/teachers-team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}