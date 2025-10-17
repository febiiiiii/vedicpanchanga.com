'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { UniversalHeader } from '@/components/universal-header';
import { LegalPageHeader } from '@/components/legal-page-header';
import { HelpCircle, ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // General Questions
  {
    category: 'Getting Started',
    question: 'What is a Panchanga?',
    answer: 'A Panchanga is a traditional Hindu calendar that provides detailed astronomical data. It consists of five (pancha) elements (anga): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (luni-solar day), and Karana (half lunar day). It helps determine auspicious times for various activities and religious observances.'
  },
  {
    category: 'Getting Started',
    question: 'How do I use this Panchanga calculator?',
    answer: 'Simply select your location from the city dropdown or use your current location, choose the date and time you want to calculate for, and click Calculate. The calculator will display all five Panchanga elements, muhurta timings, and planetary positions for your selected location and time.'
  },
  {
    category: 'Getting Started',
    question: 'Why do I need to provide my location?',
    answer: 'Location is essential because Panchanga calculations depend on local sunrise and sunset times, which vary by geography. The visibility of celestial bodies and the timing of astronomical events change based on your latitude and longitude. This ensures accurate calculations specific to your area.'
  },

  // Accuracy & Technical
  {
    category: 'Accuracy & Technical',
    question: 'How accurate are the calculations?',
    answer: 'Our calculator uses the Swiss Ephemeris library, which provides astronomical precision within 1 arc second. We follow the Drik Siddhanta (observational method) for calculations. The accuracy is within seconds for planetary positions and minutes for event timings, matching professional astrology software.'
  },
  {
    category: 'Accuracy & Technical',
    question: 'What is Swiss Ephemeris?',
    answer: 'Swiss Ephemeris is the gold standard library for astronomical calculations, developed by Astrodienst AG. It provides precise planetary positions from 5000 BCE to 5000 CE and includes all traditional and modern celestial bodies. This ensures our calculations are as accurate as possible.'
  },
  {
    category: 'Accuracy & Technical',
    question: 'What calculation method do you use?',
    answer: 'We use the Drik Siddhanta method, which computes astronomical events based on actual observable phenomena from your specific location. This modern observational method is more accurate than older mean motion calculations and is used by most contemporary Panchanga makers.'
  },

  // Daily Usage
  {
    category: 'Daily Usage',
    question: 'How can I use Panchanga for daily planning?',
    answer: 'Check the tithi for overall day quality, note the weekday ruler\'s influence, identify good muhurtas for important tasks, avoid Rahu Kalam for new initiatives, use Abhijit Muhurta (around noon) for success, and check nakshatra suitability for specific activities. This helps align your activities with favorable cosmic timings.'
  },
  {
    category: 'Daily Usage',
    question: 'What is Rahu Kalam and should I avoid it?',
    answer: 'Rahu Kalam is a 90-minute period each day considered inauspicious for starting new ventures. Avoid it for important meetings, investments, travel beginnings, or ceremonies. However, routine work and ongoing activities can continue. The timing varies daily based on sunrise and weekday.'
  },
  {
    category: 'Daily Usage',
    question: 'What is the best time for important activities?',
    answer: 'Abhijit Muhurta (around local noon) is universally auspicious for most activities. Additionally, check for Amrita Kalam for spiritual activities, avoid Vishti Karana for new beginnings, and consider the ruling planet\'s hora. For critical events, select dates with favorable tithi-nakshatra combinations.'
  },

  // Muhurta Selection
  {
    category: 'Muhurta Selection',
    question: 'How do I find an auspicious muhurta?',
    answer: 'Select your date range, check for favorable tithis (avoid Rikta tithis), look for beneficial nakshatras for your activity, ensure good yoga periods, avoid Vishti karana and Rahu Kalam, and consider planetary hora rulers. For important events like marriage, consult a qualified astrologer for personalized selection.'
  },
  {
    category: 'Muhurta Selection',
    question: 'Which tithis are most auspicious?',
    answer: 'Pratipada (1st) for new beginnings, Dwitiya (2nd) and Tritiya (3rd) for growth, Panchami (5th) for learning, Saptami (7th) for travel, Dashami (10th) for governance, Ekadashi (11th) for spiritual practices, and Purnima (full moon) for celebrations. Avoid Chaturthi, Navami, Chaturdashi, and Amavasya for new ventures.'
  },
  {
    category: 'Muhurta Selection',
    question: 'What activities suit which nakshatras?',
    answer: 'Ashwini, Pushya, and Hasta are good for medical treatment. Rohini, Uttaraphalguni, and Uttarashadha favor marriages. Chitra and Vishakha support business. Shravana and Revati help education. Each nakshatra has specific qualities that make it suitable for particular activities.'
  },

  // Spiritual Practices
  {
    category: 'Spiritual Practices',
    question: 'What are the best times for meditation?',
    answer: 'Brahma Muhurta (1.5 hours before sunrise) is ideal for meditation and spiritual practices. Sandhya times (sunrise and sunset transitions), Abhijit Muhurta, and Pradosha Kala (1.5 hours before sunset) are also powerful. Full moon nights enhance group meditation, while Ekadashi supports deep introspection.'
  },
  {
    category: 'Spiritual Practices',
    question: 'When should I observe fasting?',
    answer: 'Ekadashi (11th lunar day) is the most important fasting day, occurring twice monthly. Purnima (full moon) and Amavasya (new moon) are also traditional fasting days. Additionally, specific weekdays are dedicated to different deities: Monday for Shiva, Tuesday for Hanuman, Thursday for Guru, and Saturday for Saturn.'
  },
  {
    category: 'Spiritual Practices',
    question: 'How do eclipses affect spiritual practices?',
    answer: 'Eclipses are considered powerful times for spiritual practices. Mantra chanting during eclipses is believed to be especially potent. Traditional practices include fasting, avoiding food preparation, and performing charity after the eclipse. Many use this time for intense meditation and prayer.'
  },

  // Festivals & Culture
  {
    category: 'Festivals & Culture',
    question: 'How are Hindu festivals determined?',
    answer: 'Most Hindu festivals follow the lunar calendar based on Panchanga. Diwali occurs on Amavasya in Kartika month, Holi on Purnima in Phalguna, and Navaratri starts on specific tithis. The exact dates vary yearly in the Gregorian calendar but maintain their astronomical significance.'
  },
  {
    category: 'Festivals & Culture',
    question: 'Why do festival dates change each year?',
    answer: 'Hindu festivals follow the lunar calendar, which is about 11 days shorter than the solar year. This causes festival dates to shift in the Gregorian calendar. Additionally, regional variations and different calendar systems (solar, lunar, or luni-solar) can affect exact dates.'
  },
  {
    category: 'Festivals & Culture',
    question: 'What is the significance of Ekadashi?',
    answer: 'Ekadashi, the 11th lunar day, occurs twice monthly and is considered highly auspicious for spiritual practices. It\'s traditionally observed with fasting, prayer, and meditation. Each Ekadashi has a specific name and associated benefits, with Nirjala Ekadashi and Vaikuntha Ekadashi being especially significant.'
  },

  // Practical Applications
  {
    category: 'Practical Applications',
    question: 'Can I use Panchanga for business decisions?',
    answer: 'Yes, Panchanga is traditionally consulted for business timing. Start ventures on growth tithis (2, 3, 5, 7, 10, 11, 13), sign contracts during stable nakshatras, avoid Rikta tithis for investments, and use Abhijit Muhurta for negotiations. Many successful businesses in India still incorporate these principles.'
  },
  {
    category: 'Practical Applications',
    question: 'How does Panchanga help in agriculture?',
    answer: 'Panchanga has deep agricultural roots. Lunar phases affect plant growth and water content, specific nakshatras favor sowing different crops, and tithis guide harvesting times. Traditional farmers use these principles, which modern biodynamic farming has also validated through observation.'
  },
  {
    category: 'Practical Applications',
    question: 'Is Panchanga relevant for modern life?',
    answer: 'Absolutely! Panchanga helps optimize timing for important decisions, understand natural rhythms, plan events for maximum success, maintain cultural connections, and integrate spiritual practices into daily life. Many people find that aligning with these cosmic rhythms enhances their overall well-being and success.'
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    const allIndices = filteredFAQs.map((faq) => faqs.indexOf(faq));
    setOpenItems(new Set(allIndices));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Smooth Radial Gradient Backgrounds */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-1/4 w-[200%] h-[150%] opacity-30">
          <div className="absolute inset-0 bg-gradient-radial-at-tl from-primary/20 via-primary/5 to-transparent" />
        </div>
        <div className="absolute -bottom-1/2 -right-1/4 w-[200%] h-[150%] opacity-40">
          <div className="absolute inset-0 bg-gradient-radial-at-br from-secondary/15 via-secondary/5 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      <main className="flex-grow relative z-10">
        <UniversalHeader />

        <LegalPageHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Vedic Panchanga and how to use our calculator effectively."
          lastUpdated="October 16, 2025"
          icon={<HelpCircle className="h-8 w-8 md:h-10 md:w-10" />}
        />

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pb-8 sm:pb-12 max-w-4xl">
          {/* Quick Help Section */}
          <section className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <h2 className="text-lg font-semibold mb-3 text-foreground">Quick Help</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to our FAQ section! Here you'll find answers to the most common questions about Vedic Panchanga,
              astronomical calculations, and how to use our calculator for your daily planning and spiritual practices.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={expandAll}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
              >
                <Plus className="h-4 w-4" />
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              >
                <Minus className="h-4 w-4" />
                Collapse All
              </button>
            </div>
          </section>

          {/* Category Filter */}
          <section className="mb-8">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-background border border-border hover:bg-secondary/50'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-2 text-xs opacity-70">
                      ({faqs.filter(f => f.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* FAQ Items */}
          <section className="space-y-3">
            {filteredFAQs.map((faq) => {
              const globalIndex = faqs.indexOf(faq);
              const isOpen = openItems.has(globalIndex);

              return (
                <div
                  key={globalIndex}
                  className="border border-border/50 rounded-lg overflow-hidden transition-all hover:border-border"
                >
                  <button
                    onClick={() => toggleItem(globalIndex)}
                    className="w-full px-5 py-4 text-left flex items-start justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex flex-col gap-2">
                        <span className="inline-block text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded w-fit">
                          {faq.category}
                        </span>
                        <h3 className="font-semibold text-base text-foreground leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform mt-1 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4">
                      <div className="border-t border-border/30 pt-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* Still Need Help Section */}
          <section className="mt-12 p-6 bg-secondary/30 rounded-lg border border-border/50">
            <h2 className="text-lg font-semibold mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              If you couldn&apos;t find the answer you were looking for, our support team is here to help.
              We&apos;re passionate about Vedic sciences and happy to assist with your Panchanga-related queries.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:support@vedicpanchanga.com"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <HelpCircle className="h-4 w-4" />
                Contact Support
              </a>
              <a
                href="https://github.com/bidyashish/vedicpanchanga.com/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Report an Issue
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}