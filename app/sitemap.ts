import { MetadataRoute } from 'next'
import { routing } from '../i18n/routing'

const BASE_URL = 'https://3cwaypoint.com'

const routes = [
  { path: '',         changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
] satisfies { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const { path, changeFrequency, priority } of routes) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      })
    }
  }

  return entries
}
