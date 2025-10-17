import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Globe, Heart, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { UniversalHeader } from '@/components/universal-header';

export const metadata: Metadata = {
  title: 'About Vedic Panchanga - Our Mission and Vision',
  description: 'Learn about Vedic Panchanga - our mission to preserve and share ancient Vedic astronomical knowledge through modern technology. Discover our commitment to accuracy, authenticity, and accessibility.',
  keywords: 'about vedic panchanga, hindu calendar, panchanga calculator, vedic astrology, jyotish, mission, vision',
};

export default function AboutPage() {
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

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            About Vedic Panchanga
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging ancient wisdom with modern technology to make Vedic astronomical
            calculations accessible to everyone, everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed mb-4">
              Vedic Panchanga is dedicated to preserving and sharing the rich tradition of
              Hindu astronomical calculations with the global community. Our mission is to
              provide accurate, authentic, and accessible Panchanga calculations that help
              people connect with their cultural heritage and make informed decisions based
              on time-tested Vedic principles.
            </p>
            <p className="text-base leading-relaxed">
              We believe that this ancient knowledge, developed over millennia by Indian
              astronomers and mathematicians, deserves to be preserved and made available
              through modern technology. By combining the precision of Swiss Ephemeris with
              the wisdom of Vedic astrology, we create a bridge between tradition and innovation.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Accuracy & Authenticity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We use Swiss Ephemeris, the gold standard for astronomical calculations,
                ensuring accuracy from 5000 BCE to 5000 CE. Our calculations follow the
                Drik Siddhanta (observational method) for the most precise results.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our database includes over 100,000 cities worldwide with precise coordinates
                and timezone information. Calculate Panchanga for any location on Earth with
                confidence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Open Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We believe in transparency and community collaboration. Our source code is
                available on GitHub, allowing developers to contribute, verify, and learn
                from our implementation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-lg">Complete Panchanga Calculations</h3>
                <p className="text-muted-foreground mb-3">
                  All five essential elements (Tithi, Vara, Nakshatra, Yoga, Karana) calculated
                  with high precision for any date and location. Our system accounts for local
                  sunrise/sunset times and geographical variations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Tithi Timings</Badge>
                  <Badge variant="secondary">Nakshatra Details</Badge>
                  <Badge variant="secondary">Yoga Periods</Badge>
                  <Badge variant="secondary">Karana Information</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Muhurta and Timing Analysis</h3>
                <p className="text-muted-foreground mb-3">
                  Detailed muhurta calculations including Rahu Kalam, Gulika Kalam, Yamaganda,
                  and other important time periods. Perfect for selecting auspicious times for
                  various activities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Rahu Kalam</Badge>
                  <Badge variant="secondary">Gulika Kalam</Badge>
                  <Badge variant="secondary">Abhijit Muhurta</Badge>
                  <Badge variant="secondary">Brahma Muhurta</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Planetary Positions</h3>
                <p className="text-muted-foreground mb-3">
                  Real-time calculation of all nine planetary positions (Navagraha) in both
                  tropical and sidereal zodiacs. Includes retrograde status, zodiac signs,
                  and nakshatra placements.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Graha Positions</Badge>
                  <Badge variant="secondary">Retrograde Status</Badge>
                  <Badge variant="secondary">Zodiac Signs</Badge>
                  <Badge variant="secondary">Nakshatra Placement</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Educational Resources</h3>
                <p className="text-muted-foreground mb-3">
                  Comprehensive explanations of Panchanga concepts, their significance, and
                  practical applications. Learn about the astronomical and cultural basis of
                  these calculations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Detailed Guides</Badge>
                  <Badge variant="secondary">FAQ Section</Badge>
                  <Badge variant="secondary">Cultural Context</Badge>
                  <Badge variant="secondary">Usage Examples</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Calculation Engine</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Our backend is powered by Python with PySwissEph, providing direct access to
                  Swiss Ephemeris calculations. This ensures astronomical precision matching
                  professional astrology software.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Modern Web Interface</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Built with Next.js 15 and React, our frontend provides a fast, responsive
                  experience across all devices. The interface adapts seamlessly from mobile
                  phones to desktop computers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">API Architecture</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  RESTful API built with FastAPI allows for high-performance calculations and
                  easy integration with other applications. Rate limiting ensures fair usage
                  and system stability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Mobile Applications</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Native iOS and Android apps built with React Native provide offline capabilities
                  and platform-specific features like GPS location and native date pickers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team and Community */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-primary" />
              Community & Collaboration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed mb-4">
              Vedic Panchanga is an open-source project maintained by a community of developers,
              astrologers, and enthusiasts passionate about preserving Vedic knowledge. We welcome
              contributions from anyone interested in improving the accuracy, features, or
              accessibility of our platform.
            </p>
            <p className="text-base leading-relaxed mb-4">
              Our project is hosted on GitHub where you can:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Report issues or suggest improvements</li>
              <li>Contribute code, documentation, or translations</li>
              <li>Verify our calculations and algorithms</li>
              <li>Fork the project for your own customizations</li>
            </ul>
            <div className="flex gap-4">
              <a
                href="https://github.com/bidyashish/vedicpanchanga.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Code className="h-4 w-4" />
                View on GitHub
              </a>
              <a
                href="mailto:support@vedicpanchanga.com"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Users className="h-4 w-4" />
                Contact Support
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Values and Principles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Preservation of Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  We are committed to preserving the ancient astronomical and mathematical
                  knowledge embedded in the Panchanga system for future generations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Everyone should have free access to accurate Panchanga calculations,
                  regardless of their location, device, or financial situation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-sm text-muted-foreground">
                  We strive to educate users about the scientific and cultural significance
                  of Panchanga calculations, not just provide raw data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Our calculations, methods, and source code are open for inspection,
                  ensuring trust through transparency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Looking Ahead</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed mb-4">
              As we continue to grow, our vision includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Adding more regional Panchanga variations and calendar systems</li>
              <li>Developing advanced muhurta selection tools for specific activities</li>
              <li>Creating educational courses on Vedic astronomy and timekeeping</li>
              <li>Building API integrations for temple websites and cultural organizations</li>
              <li>Expanding language support to reach more communities worldwide</li>
            </ul>
            <p className="text-base leading-relaxed">
              We invite you to join us on this journey of preserving and sharing the timeless
              wisdom of Vedic astronomical sciences. Whether you&apos;re a developer, astrologer,
              researcher, or simply someone interested in this ancient knowledge, there&apos;s a
              place for you in our community.
            </p>
          </CardContent>
        </Card>

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg"
          >
            ← Back to Panchanga Calculator
          </Link>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}