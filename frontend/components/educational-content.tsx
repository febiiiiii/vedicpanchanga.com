import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, Globe, Moon, Star, Sun, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export function EducationalContent() {
  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            What is Vedic Panchanga?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">
            Vedic Panchanga, also known as the Hindu Calendar or Panchangam, is an ancient
            astronomical almanac that has been used for thousands of years in India. The word
            &ldquo;Panchanga&rdquo; comes from Sanskrit, where &ldquo;Pancha&rdquo; means five and &ldquo;Anga&rdquo; means limb
            or component, referring to its five essential elements.
          </p>
          <p className="text-base leading-relaxed">
            This sophisticated timekeeping system goes beyond a simple calendar by incorporating
            precise astronomical calculations to determine auspicious times for various activities,
            religious observances, and important life events. It combines solar and lunar calendars
            with planetary positions to create a comprehensive guide for daily living according to
            Vedic traditions.
          </p>
          <p className="text-base leading-relaxed">
            Our calculator uses the highly accurate Swiss Ephemeris astronomical library to compute
            these elements with precision for any date between 5000 BCE and 5000 CE, making it a
            valuable tool for both historical research and contemporary practice.
          </p>
        </CardContent>
      </Card>

      {/* Five Elements Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>The Five Essential Elements (Pancha Angas)</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tithi" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="tithi">Tithi</TabsTrigger>
              <TabsTrigger value="vara">Vara</TabsTrigger>
              <TabsTrigger value="nakshatra">Nakshatra</TabsTrigger>
              <TabsTrigger value="yoga">Yoga</TabsTrigger>
              <TabsTrigger value="karana">Karana</TabsTrigger>
            </TabsList>

            <TabsContent value="tithi" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Moon className="h-5 w-5" />
                Tithi (Lunar Day)
              </div>
              <p className="text-base leading-relaxed">
                A Tithi represents the lunar day and is calculated based on the angular distance
                between the Sun and Moon. Each Tithi spans 12 degrees of separation and there are
                30 Tithis in a complete lunar month - 15 in the waxing phase (Shukla Paksha) and
                15 in the waning phase (Krishna Paksha).
              </p>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Important Tithis:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Pratipada:</strong> First day, new beginnings</li>
                  <li>• <strong>Panchami:</strong> Fifth day, learning and education</li>
                  <li>• <strong>Ashtami:</strong> Eighth day, Durga worship</li>
                  <li>• <strong>Ekadashi:</strong> Eleventh day, fasting and spiritual practices</li>
                  <li>• <strong>Purnima:</strong> Full moon, completion and fulfillment</li>
                  <li>• <strong>Amavasya:</strong> New moon, ancestor worship</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="vara" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Sun className="h-5 w-5" />
                Vara (Weekday)
              </div>
              <p className="text-base leading-relaxed">
                Vara represents the solar weekday, with each day governed by a specific planet.
                The seven-day week system has been used in Vedic astrology for millennia, with
                each day having unique characteristics and ruling deities.
              </p>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Days and Their Rulers:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Ravivara (Sunday):</strong> Sun - Leadership, authority, health</li>
                  <li>• <strong>Somavara (Monday):</strong> Moon - Emotions, mind, mother</li>
                  <li>• <strong>Mangalavara (Tuesday):</strong> Mars - Energy, courage, siblings</li>
                  <li>• <strong>Budhavara (Wednesday):</strong> Mercury - Communication, intellect</li>
                  <li>• <strong>Guruvara (Thursday):</strong> Jupiter - Wisdom, spirituality, teachers</li>
                  <li>• <strong>Shukravara (Friday):</strong> Venus - Love, arts, luxury</li>
                  <li>• <strong>Shanivara (Saturday):</strong> Saturn - Discipline, karma, service</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="nakshatra" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Star className="h-5 w-5" />
                Nakshatra (Lunar Mansion)
              </div>
              <p className="text-base leading-relaxed">
                Nakshatras are 27 lunar mansions through which the Moon travels in its monthly
                cycle. Each Nakshatra spans 13°20&prime; of the zodiac and has unique qualities,
                ruling deities, and influences on human life and activities.
              </p>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Nakshatra Categories:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Fixed (Dhruva):</strong> Foundation laying, permanent works</li>
                  <li>• <strong>Movable (Chara):</strong> Travel, vehicles, changes</li>
                  <li>• <strong>Fierce (Ugra):</strong> Competitive activities, surgery</li>
                  <li>• <strong>Mixed (Mishra):</strong> Routine activities</li>
                  <li>• <strong>Quick (Kshipra):</strong> Sports, decoration, medicine</li>
                  <li>• <strong>Gentle (Mridu):</strong> Fine arts, marriage, friendship</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="yoga" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Globe className="h-5 w-5" />
                Yoga (Luni-Solar Day)
              </div>
              <p className="text-base leading-relaxed">
                Yoga is calculated from the sum of the longitudes of the Sun and Moon. There are
                27 Yogas in total, each spanning 13°20&prime; of combined movement. Each Yoga has
                specific qualities that influence the success of activities undertaken during
                that period.
              </p>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Beneficial Yogas:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Siddha Yoga:</strong> Accomplishment and success</li>
                  <li>• <strong>Amrita Yoga:</strong> Nectar, extremely auspicious</li>
                  <li>• <strong>Sarvartha Siddhi:</strong> Success in all endeavors</li>
                  <li>• <strong>Shubha Yoga:</strong> Auspicious for new beginnings</li>
                  <li>• <strong>Brahma Yoga:</strong> Creative and spiritual activities</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="karana" className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Calendar className="h-5 w-5" />
                Karana (Half Lunar Day)
              </div>
              <p className="text-base leading-relaxed">
                A Karana is half of a Tithi, with each Tithi containing two Karanas. There are
                11 different Karanas in total - 4 fixed and 7 movable. They repeat in a specific
                sequence throughout the lunar month and are used for fine-tuning the selection
                of auspicious times.
              </p>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Karana Types:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Movable Karanas (7):</strong> Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti</li>
                  <li>• <strong>Fixed Karanas (4):</strong> Shakuni, Chatushpada, Naga, Kimstughna</li>
                  <li>• <strong>Vishti (Bhadra):</strong> Avoided for auspicious activities</li>
                  <li>• <strong>Bava & Balava:</strong> Good for stable, long-term activities</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Muhurta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base leading-relaxed">
              Muhurta is the practice of selecting auspicious times for important activities.
              Each day is divided into 30 Muhurtas of approximately 48 minutes each, with
              specific Muhurtas being favorable for different activities.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Key Muhurta Periods:</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Brahma Muhurta:</strong> 1.5 hours before sunrise - spiritual practices</li>
                <li>• <strong>Abhijit Muhurta:</strong> Midday period - victory and success</li>
                <li>• <strong>Godhuli Muhurta:</strong> Twilight - auspicious for marriages</li>
                <li>• <strong>Rahu Kalam:</strong> Inauspicious period to be avoided</li>
                <li>• <strong>Gulika Kalam:</strong> Period ruled by Saturn&apos;s son</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planetary Positions (Graha)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base leading-relaxed">
              The nine planetary bodies (Navagraha) play a crucial role in Vedic astrology.
              Their positions in the zodiac signs and nakshatras influence daily panchanga
              calculations and personal horoscopes.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">The Nine Planets:</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Sun (Surya):</strong> Soul, authority, father</li>
                <li>• <strong>Moon (Chandra):</strong> Mind, emotions, mother</li>
                <li>• <strong>Mars (Mangala):</strong> Energy, courage, siblings</li>
                <li>• <strong>Mercury (Budha):</strong> Intelligence, communication</li>
                <li>• <strong>Jupiter (Guru):</strong> Wisdom, spirituality, fortune</li>
                <li>• <strong>Venus (Shukra):</strong> Love, luxury, arts</li>
                <li>• <strong>Saturn (Shani):</strong> Discipline, karma, delays</li>
                <li>• <strong>Rahu:</strong> Ambition, foreign elements</li>
                <li>• <strong>Ketu:</strong> Spirituality, liberation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Guide */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Panchanga Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Step-by-Step Guide:</h4>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <div>
                  <strong>Select Date & Time:</strong> Choose the specific date and time for which
                  you want to calculate the panchanga. The calculator defaults to your current time.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">2.</span>
                <div>
                  <strong>Choose Location:</strong> Enter your city or use the GPS location feature
                  to automatically detect your coordinates. Accurate location is crucial for precise
                  sunrise/sunset calculations.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <div>
                  <strong>View Results:</strong> The calculator displays all five panchanga elements,
                  muhurta timings, planetary positions, and auspicious/inauspicious periods for your
                  selected date and location.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">4.</span>
                <div>
                  <strong>Interpret the Data:</strong> Use the information to plan important activities,
                  religious observances, or understand the astrological influences of the day.
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-900">
            <p className="text-sm">
              <strong>Note:</strong> While our calculator uses highly accurate astronomical algorithms,
              results should be used for general guidance. For critical decisions, consult with a
              qualified Vedic astrologer who can consider your complete birth chart and specific circumstances.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Historical Context */}
      <Card>
        <CardHeader>
          <CardTitle>Historical and Cultural Significance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">
            The Vedic Panchanga system has been an integral part of Indian culture for over 5,000 years,
            with its roots in the Vedanga Jyotisha, one of the six auxiliary disciplines of Vedic study.
            This ancient system demonstrates remarkable astronomical knowledge, including accurate
            calculations of planetary movements, eclipses, and seasonal changes.
          </p>
          <p className="text-base leading-relaxed">
            Throughout history, the Panchanga has served multiple purposes: agricultural planning based
            on seasonal and lunar cycles, timing of religious festivals and rituals, selection of
            auspicious times for important life events, and as a comprehensive astronomical almanac
            for scholarly study.
          </p>
          <p className="text-base leading-relaxed">
            Today, millions of people worldwide continue to consult the Panchanga for various purposes,
            from determining festival dates to planning weddings, business ventures, and spiritual
            practices. Its enduring relevance speaks to the sophisticated understanding of cosmic
            cycles embedded in ancient Indian knowledge systems.
          </p>
        </CardContent>
      </Card>

      {/* FAQ Call-to-Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <HelpCircle className="h-10 w-10 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Have More Questions?</h3>
              <p className="text-muted-foreground mb-3">
                Explore our comprehensive FAQ section for detailed answers about Panchanga calculations,
                muhurta selection, spiritual practices, and more.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View Frequently Asked Questions
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}