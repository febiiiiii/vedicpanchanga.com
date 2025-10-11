import { Metadata } from 'next'

export const siteConfig = {
  name: 'Vedic Panchanga',
  description: 'Calculate accurate Hindu Panchanga (calendar) with Tithi, Nakshatra, Yoga, Karana, and more using Swiss Ephemeris. Get precise Vedic astrology calculations for any date and location.',
  url: 'https://vedicpanchanga.com',
  ogImage: 'https://vedicpanchanga.com/og-image.png',
  keywords: [
    'Vedic Panchanga',
    'Hindu Calendar',
    'Tithi Calculator',
    'Nakshatra',
    'Yoga',
    'Karana',
    'Vedic Astrology',
    'Swiss Ephemeris',
    'Drik Panchanga',
    'Birth Chart',
    'Kundali',
    'Muhurat',
    'Rahu Kalam',
    'Abhijit Muhurta',
    'Hindu Almanac',
    'Lunar Calendar',
    'Indian Calendar',
  ],
  authors: [
    {
      name: 'Vedic Panchanga Team',
      url: 'https://vedicpanchanga.com',
    },
  ],
  creator: 'Vedic Panchanga',
  publisher: 'Vedic Panchanga',
  locale: 'en_US',
  alternateLocales: ['hi_IN', 'sa_IN'],
}

export function generateMetadata({
  title,
  description,
  path = '',
  images,
}: {
  title?: string
  description?: string
  path?: string
  images?: string[]
}): Metadata {
  const finalTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const finalDescription = description || siteConfig.description
  const finalUrl = `${siteConfig.url}${path}`

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: finalUrl,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalUrl,
      siteName: siteConfig.name,
      images: images || [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: images || [siteConfig.ogImage],
      creator: '@vedicpanchanga',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification tokens when you have them
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  }
}

/**
 * Generate JSON-LD structured data for rich snippets
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/vedicpanchanga',
      // 'https://facebook.com/vedicpanchanga',
      // 'https://instagram.com/vedicpanchanga',
    ],
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
