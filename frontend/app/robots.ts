import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vedicpanchanga.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/v1/*', // Block API routes from indexing
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI's crawler (ChatGPT)
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google's AI (/Gemini)
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Anthropic's crawler (Claude)
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot', // Claude's web crawler
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple Intelligence
        allow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl (used by many AI trainers)
        allow: '/',
      },
      {
        userAgent: 'FacebookBot', // Meta AI
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
