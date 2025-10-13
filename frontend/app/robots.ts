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
      // Major Search Engine Crawlers
      {
        userAgent: 'Googlebot', // Google Search
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image', // Google Images
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Mobile', // Google Mobile
        allow: '/',
      },
      {
        userAgent: 'Bingbot', // Microsoft Bing & Copilot
        allow: '/',
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot', // DuckDuckGo
        allow: '/',
      },
      {
        userAgent: 'Baiduspider', // Baidu (China - important for Asian market)
        allow: '/',
      },
      {
        userAgent: 'YandexBot', // Yandex (Russia)
        allow: '/',
      },
      // AI Training & LLM Crawlers
      {
        userAgent: 'GPTBot', // OpenAI's crawler (ChatGPT)
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google's AI (Gemini/Bard)
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
        userAgent: 'Claude-Web', // Claude web search
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
      },
      {
        userAgent: 'Applebot', // Apple Search
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
      {
        userAgent: 'cohere-ai', // Cohere AI
        allow: '/',
      },
      {
        userAgent: 'Bytespider', // ByteDance (TikTok) AI
        allow: '/',
      },
      {
        userAgent: 'ImagesiftBot', // Image AI training
        allow: '/',
      },
      {
        userAgent: 'Omgilibot', // News aggregation
        allow: '/',
      },
      {
        userAgent: 'Diffbot', // Knowledge graph AI
        allow: '/',
      },
      {
        userAgent: 'YouBot', // You.com AI search
        allow: '/',
      },
      // Social Media & Link Preview Crawlers (Important for Marketing)
      {
        userAgent: 'facebookexternalhit', // Facebook link previews
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent', // Meta platforms
        allow: '/',
      },
      {
        userAgent: 'Twitterbot', // Twitter/X link previews
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot', // LinkedIn link previews
        allow: '/',
      },
      {
        userAgent: 'Pinterest', // Pinterest
        allow: '/',
      },
      {
        userAgent: 'Pinterestbot', // Pinterest bot
        allow: '/',
      },
      {
        userAgent: 'redditbot', // Reddit link previews
        allow: '/',
      },
      {
        userAgent: 'TelegramBot', // Telegram link previews
        allow: '/',
      },
      {
        userAgent: 'WhatsApp', // WhatsApp link previews
        allow: '/',
      },
      {
        userAgent: 'Slackbot', // Slack link unfurling
        allow: '/',
      },
      {
        userAgent: 'Slackbot-LinkExpanding', // Slack link expansion
        allow: '/',
      },
      {
        userAgent: 'Discordbot', // Discord link previews
        allow: '/',
      },
      // SEO & Analytics Tools
      {
        userAgent: 'Screaming Frog SEO Spider', // SEO auditing
        allow: '/',
      },
      {
        userAgent: 'Semrushbot', // SEMrush SEO tool
        allow: '/',
      },
      {
        userAgent: 'AhrefsBot', // Ahrefs SEO tool
        allow: '/',
      },
      {
        userAgent: 'Moz', // Moz SEO tool
        allow: '/',
      },
      {
        userAgent: 'rogerbot', // Moz crawler
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
