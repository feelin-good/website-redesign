import type { MetadataRoute } from 'next'

// Staging deploy: keep the whole preview out of search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  }
}
