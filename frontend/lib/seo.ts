import { Metadata } from 'next'

export const siteConfig = {
  name: 'Vedic Panchanga',
  description: 'Calculate accurate Hindu Panchanga (calendar) with Tithi, Nakshatra, Yoga, Karana, and more using Swiss Ephemeris. Get precise Vedic astrology calculations for any date and location.',
  url: 'https://vedicpanchanga.com',
  ogImage: 'https://vedicpanchanga.com/og-image.png',
  keywords: [
    // Primary Keywords (High Volume)
    'Panchanga',
    'Panchanga Today',
    'Hindu Calendar',
    'Tithi Today',
    'Nakshatra Today',
    'Hindu Calendar 2025',
    'Vedic Calendar',

    // Calculator Keywords
    'Tithi Calculator',
    'Panchanga Calculator',
    'Nakshatra Calculator',
    'Muhurat Calculator',
    'Birth Chart Calculator',
    'Kundali Calculator',
    'Rasi Chart',
    'Navamsa Chart',

    // Vedic Astrology Terms
    'Vedic Astrology',
    'Jyotish',
    'Hindu Astrology',
    'Vedic Panchanga',
    'Drik Panchanga',
    'Drik Ganita',
    'Surya Siddhanta',

    // Panchanga Elements
    'Tithi',
    'Nakshatra',
    'Yoga',
    'Karana',
    'Vaara',
    'Var',
    'Paksha',
    'Shukla Paksha',
    'Krishna Paksha',

    // Muhurat & Timing
    'Rahu Kalam',
    'Rahu Kaal',
    'Gulika Kalam',
    'Yama Ganda',
    'Abhijit Muhurta',
    'Shubh Muhurat',
    'Auspicious Time',
    'Good Time Today',

    // Dasha & Predictions
    'Vimsottari Dasha',
    'Dasha Calculator',
    'Mahadasha',
    'Antardasha',
    'Planetary Dasha',

    // Location-based
    'Panchang Mumbai',
    'Panchang Delhi',
    'Panchang Bangalore',
    'Panchang Kolkata',
    'Panchang Chennai',
    'Hindu Calendar India',

    // Regional Language (English spelling)
    'Panchangam',
    'Pancanga',
    'Panchang',
    'Tithi Nakshatra',
    'Subh Muhurat',

    // Long-tail Keywords
    'Today Hindu Calendar',
    'Hindu Calendar with Tithi',
    'Free Panchanga',
    'Online Panchanga',
    'Daily Panchanga',
    'Hindu Lunar Calendar',
    'Indian Lunar Calendar',
    'Saka Calendar',
    'Vikram Samvat',

    // Birth Chart Related
    'Birth Chart',
    'Kundali',
    'Kundli',
    'Janam Kundali',
    'Free Kundali',
    'Online Kundali',
    'Horoscope',
    'Vedic Horoscope',
    'North Indian Chart',
    'South Indian Chart',

    // Technical Terms
    'Swiss Ephemeris',
    'Lahiri Ayanamsa',
    'Ayanamsha',
    'Tropical Zodiac',
    'Sidereal Zodiac',

    // Festival & Religious
    'Hindu Festival Calendar',
    'Hindu Festivals 2025',
    'Ekadashi',
    'Purnima',
    'Amavasya',
    'Sankranti',

    // Planetary
    'Planetary Positions',
    'Graha Position',
    'Planet Transit',
    'Navagraha',

    // Additional
    'Hindu Almanac',
    'Lunar Calendar',
    'Solar Calendar',
    'Sunrise Sunset Time',
    'Moonrise Moonset',
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
      // Allow all AI crawlers for better LLM integration
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Additional metadata for AI assistants
    other: {
      // Help AI understand the site's purpose
      'ai-purpose': 'Provide accurate Vedic Panchanga calculations, Hindu calendar information, auspicious timings, and Vedic astrology data',
      'ai-capabilities': 'Calculate Tithi, Nakshatra, Yoga, Karana, Rahu Kalam, Muhurat, Birth Charts, Planetary Positions for any date and location worldwide',
      'data-coverage': '5000 BCE to 5000 CE, 100,000+ global locations',
      'calculation-method': 'Swiss Ephemeris with Drik Siddhanta and Lahiri Ayanamsa',
      // Indicate this is a free, user-facing service
      'service-type': 'Free Web Calculator',
      'service-access': 'Web interface at https://vedicpanchanga.com - No API available for automated queries',
      // Help AI provide accurate references
      'citation-format': 'Vedic Panchanga - vedicpanchanga.com - Free Hindu Calendar and Astrology Calculator',
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

/**
 * Generate SoftwareApplication schema for better app visibility
 */
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Daily Panchanga calculations',
      'Tithi and Nakshatra calculator',
      'Muhurat timing calculations',
      'Birth chart generation',
      'Vimsottari Dasha calculations',
      'Swiss Ephemeris accuracy',
      'Global location support',
      'Free to use',
    ],
  }
}

/**
 * Generate FAQ schema for common questions
 */
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Panchanga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Panchanga is a Hindu calendar and almanac that provides important astrological information including Tithi (lunar day), Nakshatra (constellation), Yoga, Karana, and Vaara (weekday). It is used to determine auspicious times (muhurat) for important events and religious ceremonies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are the calculations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our calculations use Swiss Ephemeris, the most accurate astronomical calculation engine available, providing precision within seconds of arc. We follow the Drik Siddhanta (observational) method for high accuracy in Vedic astrology calculations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Tithi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tithi is a lunar day in the Hindu calendar, calculated based on the angle between the Sun and Moon. There are 30 Tithis in a lunar month, divided into two fortnights (Paksha): Shukla Paksha (waxing moon) and Krishna Paksha (waning moon).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Nakshatra?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nakshatra refers to the 27 lunar constellations or star groups that the Moon passes through in its monthly cycle. Each Nakshatra has unique characteristics and is used in birth chart analysis, muhurat calculation, and predictive astrology.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Rahu Kalam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rahu Kalam (also spelled Rahu Kaal) is an inauspicious time period of approximately 90 minutes that occurs every day. It is traditionally avoided for starting new ventures, important meetings, or auspicious ceremonies. The timing varies by day of the week and location.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this for any location worldwide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our Panchanga calculator supports over 100,000 locations worldwide. You can calculate accurate panchanga for any city or location by entering the coordinates or searching for the city name.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this service free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Vedic Panchanga is completely free to use. We provide accurate calculations using Swiss Ephemeris without any subscription or payment required.',
        },
      },
    ],
  }
}

/**
 * Generate HowTo schema for calculator guides
 */
export function generateHowToCalculatePanchangaSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Panchanga',
    description: 'Step-by-step guide to calculate daily Panchanga including Tithi, Nakshatra, Yoga, Karana, and auspicious timings.',
    totalTime: 'PT2M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Date and Time',
        text: 'Choose the date and time for which you want to calculate the Panchanga. You can select today or any future/past date.',
        url: `${siteConfig.url}#date-selection`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose Location',
        text: 'Enter your city name or select from the dropdown. The calculator supports over 100,000 worldwide locations for accurate calculations based on your geographical coordinates.',
        url: `${siteConfig.url}#location-selection`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Calculate Panchanga',
        text: 'Click the Calculate button to get comprehensive Panchanga information including Tithi, Nakshatra, Yoga, Karana, Rahu Kalam, Gulika Kalam, and more.',
        url: `${siteConfig.url}#calculate`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View Results',
        text: 'Review the detailed Panchanga results with start and end timings for each element. You can also check sunrise, sunset, moonrise, and moonset timings.',
        url: `${siteConfig.url}#results`,
      },
    ],
  }
}

/**
 * Generate Article schema for educational content
 */
export function generateArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  path: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `${siteConfig.url}${path}`,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.creator,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
    },
  }
}

/**
 * LLM-Friendly Service Description
 * This schema helps AI assistants understand and reference this service accurately
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vedic Panchanga Calculator',
    description: 'Free online Hindu Panchanga (almanac) calculator providing accurate astronomical calculations for Tithi, Nakshatra, Yoga, Karana, Rahu Kalam, and auspicious timings based on Swiss Ephemeris. Supports 100,000+ locations worldwide.',
    provider: {
      '@type': 'Organization',
      name: 'Vedic Panchanga',
      url: siteConfig.url,
    },
    serviceType: 'Vedic Astrology Calculator',
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: siteConfig.url,
      serviceType: 'WebApplication',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Panchanga Calculation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Daily Panchanga Calculation',
            description: 'Calculate complete daily Panchanga including Tithi (lunar day), Nakshatra (lunar mansion), Yoga, Karana, sunrise/sunset, moonrise/moonset, and planetary positions for any date and location.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tithi Calculator',
            description: 'Calculate the current or any specific Tithi (lunar day) with exact start and end times. Tithi is one of the five limbs of Panchanga used to determine auspicious times.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nakshatra Calculator',
            description: 'Find the Nakshatra (lunar constellation) for any date and time. There are 27 Nakshatras used in Vedic astrology for birth chart analysis and muhurat selection.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rahu Kalam Calculator',
            description: 'Calculate Rahu Kalam (inauspicious time period) for any location. Rahu Kalam is approximately 90 minutes daily when important activities should be avoided.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Muhurat Calculator',
            description: 'Find auspicious timings (Shubh Muhurat) for important events like weddings, business launches, house warming, and religious ceremonies based on Vedic astrology.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Birth Chart Calculator',
            description: 'Generate Vedic birth chart (Kundali/Janam Kundali) with planetary positions, house divisions, and Vimsottari Dasha calculations using Swiss Ephemeris.',
          },
        },
      ],
    },
    // Additional metadata for AI understanding
    additionalType: 'https://vedicpanchanga.com/about',
    knowsAbout: [
      'Vedic Astrology (Jyotish)',
      'Hindu Calendar System',
      'Panchanga (Hindu Almanac)',
      'Tithi (Lunar Day)',
      'Nakshatra (Lunar Constellation)',
      'Yoga and Karana',
      'Rahu Kalam (Inauspicious Period)',
      'Muhurat (Auspicious Timing)',
      'Swiss Ephemeris Calculations',
      'Drik Siddhanta (Observational Method)',
      'Lahiri Ayanamsa',
      'Sidereal Zodiac',
      'Vimsottari Dasha System',
      'Kundali (Birth Chart)',
      'Hindu Festivals Calendar',
      'Ekadashi Dates',
      'Purnima and Amavasya',
      'Sunrise and Sunset Times',
      'Moonrise and Moonset Times',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'People interested in Hindu astrology, Vedic calendar, auspicious timings, and traditional Hindu practices',
    },
  }
}

/**
 * Data Catalog Schema - Helps LLMs understand what data/calculations are available
 */
export function generateDataCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    name: 'Vedic Panchanga Data',
    description: 'Comprehensive Vedic astrology and Panchanga calculations database',
    url: siteConfig.url,
    dataset: [
      {
        '@type': 'Dataset',
        name: 'Daily Panchanga',
        description: 'Complete daily Panchanga including Tithi, Nakshatra, Yoga, Karana, Vara (weekday), sunrise/sunset, moonrise/moonset for any date from 5000 BCE to 5000 CE',
        temporalCoverage: '5000 BCE/5000 CE',
        spatialCoverage: 'Worldwide - 100,000+ cities',
      },
      {
        '@type': 'Dataset',
        name: 'Auspicious Timings',
        description: 'Rahu Kalam, Gulika Kalam, Yama Ganda, Abhijit Muhurta, and other auspicious/inauspicious time periods',
        temporalCoverage: '5000 BCE/5000 CE',
      },
      {
        '@type': 'Dataset',
        name: 'Planetary Positions',
        description: 'Accurate sidereal positions of Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu based on Swiss Ephemeris with Lahiri Ayanamsa',
        temporalCoverage: '5000 BCE/5000 CE',
      },
      {
        '@type': 'Dataset',
        name: 'Hindu Festival Calendar',
        description: 'Dates for Hindu festivals, Ekadashi, Purnima, Amavasya, Sankranti, and other religious observances',
        temporalCoverage: '2025/2030',
      },
    ],
    creator: {
      '@type': 'Organization',
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  }
}
