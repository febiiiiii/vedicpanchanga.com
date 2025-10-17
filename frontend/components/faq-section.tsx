'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // General Questions
  {
    category: 'General',
    question: 'What is a Panchanga and why is it important?',
    answer: 'A Panchanga is a traditional Hindu calendar and almanac that provides detailed astronomical data and astrological calculations. It consists of five (pancha) elements (anga): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (luni-solar day), and Karana (half lunar day). It\'s important because it helps determine auspicious times for various activities, religious observances, and life events according to Vedic traditions.'
  },
  {
    category: 'General',
    question: 'How accurate is this Panchanga calculator?',
    answer: 'Our calculator uses the Swiss Ephemeris, which is one of the most accurate astronomical calculation libraries available, with precision extending from 5000 BCE to 5000 CE. It follows the Drik Siddhanta (observational method) for calculations. The accuracy is within a few seconds for planetary positions and minutes for event timings. However, for critical decisions, we recommend consulting with a qualified Vedic astrologer.'
  },
  {
    category: 'General',
    question: 'What is the difference between Vedic and Western astrology?',
    answer: 'Vedic astrology (Jyotish) uses the sidereal zodiac based on fixed star constellations, while Western astrology uses the tropical zodiac based on seasons. This creates approximately a 24-degree difference. Vedic astrology emphasizes karma and dharma, uses different house systems, includes unique concepts like nakshatras and dashas, and has different interpretive techniques. Both systems have their own validity and applications.'
  },

  // Technical Questions
  {
    category: 'Technical',
    question: 'What is Swiss Ephemeris and why do you use it?',
    answer: 'Swiss Ephemeris is a highly accurate astronomical calculation library developed by Astrodienst AG. We use it because it provides precise planetary positions with accuracy better than 1 arc second, covers a vast time range (5000 BCE to 5000 CE), includes all traditional and modern celestial bodies, and is the gold standard for astrological calculations worldwide. It ensures our Panchanga calculations are as accurate as possible.'
  },
  {
    category: 'Technical',
    question: 'What is Drik Siddhanta?',
    answer: 'Drik Siddhanta is the observational method of Panchanga calculation that computes astronomical events based on actual observable phenomena from a specific location. Unlike older methods that use mean motions, Drik Siddhanta accounts for the true positions of celestial bodies, making it more accurate for determining sunrise, sunset, moonrise, and other observable events. This is the method used by most modern Panchanga makers.'
  },
  {
    category: 'Technical',
    question: 'Why does the Panchanga vary by location?',
    answer: 'Panchanga calculations are location-specific because sunrise and sunset times vary by geography, affecting the start and end of tithis and other time periods. The visibility of celestial bodies depends on your latitude and longitude. Local horizon effects influence astronomical observations. Time zones affect the calendar date transitions. This is why accurate location input is crucial for precise calculations.'
  },

  // Usage Questions
  {
    category: 'Usage',
    question: 'How do I find the best muhurta for my activity?',
    answer: 'To find an auspicious muhurta: 1) Select the date range you\'re considering, 2) Check for favorable tithis (avoid Rikta tithis for new beginnings), 3) Look for beneficial nakshatras suited to your activity type, 4) Ensure good yoga periods, 5) Avoid Vishti karana and Rahu Kalam, 6) Consider planetary hora rulers, 7) Check for any eclipses or special considerations. For important events, consult a qualified astrologer for personalized muhurta selection.'
  },
  {
    category: 'Usage',
    question: 'What activities should be avoided during Rahu Kalam?',
    answer: 'Rahu Kalam is considered inauspicious for starting new ventures, important meetings, investments, medical procedures, travel (especially first journeys), religious ceremonies, and marriage-related activities. However, routine activities, ongoing work, and spiritual practices for appeasing Rahu can be performed. The timing varies daily based on sunrise and weekday, lasting approximately 90 minutes.'
  },
  {
    category: 'Usage',
    question: 'How do I use Panchanga for daily planning?',
    answer: 'For daily planning: Check the tithi for overall day quality, note vara (weekday) for planetary influences, identify good muhurtas for important tasks, avoid Rahu Kalam for new initiatives, use Abhijit Muhurta (around noon) for success-oriented activities, check nakshatra for specific activity suitability, and be aware of any special yogas or festivals. Regular consultation helps you align with cosmic rhythms.'
  },

  // Astronomical Questions
  {
    category: 'Astronomical',
    question: 'What are planetary retrograde periods?',
    answer: 'Retrograde motion is when a planet appears to move backward in the zodiac from Earth\'s perspective. It\'s an optical illusion caused by relative orbital speeds. In Vedic astrology, retrograde planets are considered stronger and more internalized in their effects. Mercury retrograde affects communication, Venus retrograde influences relationships, and Mars retrograde impacts energy and actions. These periods are important for timing decisions.'
  },
  {
    category: 'Astronomical',
    question: 'How are eclipses calculated in Panchanga?',
    answer: 'Eclipses occur when the Sun, Moon, and Earth align. Solar eclipses happen during Amavasya (new moon) when the Moon passes between Earth and Sun. Lunar eclipses occur during Purnima (full moon) when Earth shadows the Moon. Our calculator identifies these using precise astronomical algorithms. Eclipses are considered significant in Vedic tradition, with specific rituals and precautions recommended during these periods.'
  },
  {
    category: 'Astronomical',
    question: 'What is Ayanamsa and how does it affect calculations?',
    answer: 'Ayanamsa is the angular difference between the tropical and sidereal zodiacs, currently about 24 degrees. It accounts for the precession of equinoxes - Earth\'s slow wobble over 26,000 years. Different Ayanamsa values (Lahiri, Raman, Krishnamurti) can create slight variations in calculations. We use the Lahiri Ayanamsa, which is most widely accepted and used by the Indian government for official calendars.'
  },

  // Cultural Questions
  {
    category: 'Cultural',
    question: 'Why are certain tithis considered more auspicious?',
    answer: 'Tithis have traditional associations based on their numerical and astronomical significance. Pratipada (1st) represents new beginnings, Panchami (5th) is good for learning, Ekadashi (11th) is spiritually powerful for fasting and meditation, while Purnima (full moon) represents completion and abundance. Amavasya (new moon) is for ancestor worship. These associations come from ancient observations of natural and human cycles correlated with lunar phases.'
  },
  {
    category: 'Cultural',
    question: 'What is the significance of Nakshatras in daily life?',
    answer: 'Nakshatras influence various aspects of life: Birth nakshatra determines personality and life path, daily nakshatra affects activity success, they guide muhurta selection for events, influence compatibility in relationships, determine favorable directions for travel, and affect business and financial decisions. Each nakshatra has specific qualities, deities, and purposes that have been observed and documented over millennia of Vedic tradition.'
  },
  {
    category: 'Cultural',
    question: 'How do festivals relate to Panchanga?',
    answer: 'Most Hindu festivals are determined by Panchanga calculations: Diwali occurs on Amavasya in Kartika month, Holi on Purnima in Phalguna, Navaratri starts on specific tithis, and Ekadashi fasting follows lunar calculations. Regional variations exist based on solar months, local traditions, and different calendar systems (lunar, solar, luni-solar). The Panchanga ensures festivals align with their original astronomical and seasonal significance.'
  },

  // Practical Questions
  {
    category: 'Practical',
    question: 'Can I use Panchanga for business decisions?',
    answer: 'Yes, Panchanga is traditionally used for business timing: Starting new ventures on growth-oriented tithis (2, 3, 5, 7, 10, 11, 13), signing contracts during stable nakshatras, avoiding Rikta tithis for investments, using Abhijit Muhurta for important negotiations, and checking planetary horas for financial activities. Many successful businesses in India still consult Panchanga for major decisions, combining it with modern business analysis.'
  },
  {
    category: 'Practical',
    question: 'How does Panchanga help in agriculture?',
    answer: 'Panchanga has deep agricultural roots: Lunar phases affect plant growth and water content, specific nakshatras are favorable for sowing different crops, tithis guide harvesting times for maximum yield, rainfall patterns correlate with certain astronomical events, and seasonal changes are precisely tracked. Traditional farmers still use these principles, which modern biodynamic farming has also validated through scientific observation.'
  },
  {
    category: 'Practical',
    question: 'What is the best time for spiritual practices?',
    answer: 'Optimal times for spiritual practices include: Brahma Muhurta (1.5 hours before sunrise) for meditation, Ekadashi tithi for fasting and prayer, Pradosha Kala (1.5 hours before sunset) for Shiva worship, full moon for group meditations, new moon for introspection and ancestor prayers, and during eclipses for mantra chanting. Specific nakshatras like Pushya, Rohini, and Shravana are considered especially spiritual.'
  }
];

export function FAQSection() {
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

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const globalIndex = faqs.indexOf(faq);
            const isOpen = openItems.has(globalIndex);

            return (
              <div
                key={globalIndex}
                className="border rounded-lg overflow-hidden transition-colors hover:border-primary/50"
              >
                <button
                  onClick={() => toggleItem(globalIndex)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-base">{faq.question}</h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Feel free to{' '}
            <a
              href="mailto:support@vedicpanchanga.com"
              className="text-primary hover:underline"
            >
              contact our support team
            </a>{' '}
            for personalized assistance with your Panchanga-related questions.
          </p>
        </div>
      </div>
    </Card>
  );
}