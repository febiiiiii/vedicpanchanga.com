import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { UniversalHeader } from '@/components/universal-header';
import { LegalPageHeader } from '@/components/legal-page-header';
import { ScrollText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Vedic Panchanga',
  description: 'Terms of Service for Vedic Panchanga. By using our services, you agree to these terms.',
};

export default function TermsPage() {
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
          title="Terms of Service"
          subtitle="Please read these terms carefully before using Vedic Panchanga services."
          lastUpdated="October 16, 2025"
          icon={<ScrollText className="h-8 w-8 md:h-10 md:w-10" />}
        />

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pb-8 sm:pb-12 max-w-4xl">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {/* Agreement to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Agreement to Terms</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                By accessing or using Vedic Panchanga (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these
                Terms of Service (&ldquo;Terms&rdquo;). If you disagree with any part of these terms, then you may not
                access the service.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                These Terms apply to all visitors, users, and others who access or use the service. We reserve
                the right to update or change these Terms at any time without prior notice.
              </p>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Use of Service */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Use of Service</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Permitted Use</h3>
                  <p className="text-base leading-relaxed text-muted-foreground mb-4">
                    Vedic Panchanga is provided free of charge for personal, educational, and non-commercial use.
                    You may:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access and use the Panchanga calculator for personal planning</li>
                    <li>Share calculation results for educational purposes</li>
                    <li>Link to our website from your own website or social media</li>
                    <li>Use the information for personal spiritual practices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Prohibited Use</h3>
                  <p className="text-base leading-relaxed text-muted-foreground mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to reverse engineer or extract source code</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Transmit viruses or malicious code</li>
                    <li>Scrape or harvest data without permission</li>
                    <li>Use automated systems or bots excessively</li>
                    <li>Impersonate others or provide false information</li>
                    <li>Use the service for commercial astrology services without permission</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Accuracy and Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Accuracy and Disclaimer</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Calculation Accuracy</h3>
                  <p className="text-muted-foreground">
                    While we use the highly accurate Swiss Ephemeris for astronomical calculations and follow
                    traditional Vedic algorithms, we cannot guarantee 100% accuracy. Calculations may vary slightly
                    from other sources due to different computational methods or rounding differences.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Not Professional Advice</h3>
                  <p className="text-muted-foreground">
                    The information provided by Vedic Panchanga is for general informational and educational
                    purposes only. It should not be considered as professional astrological, medical, legal,
                    financial, or life advice. Always consult with appropriate professionals for important decisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Cultural Variations</h3>
                  <p className="text-muted-foreground">
                    Panchanga calculations may vary based on regional traditions, sampradayas (traditions), and
                    local conventions. Our calculations follow the Drik Siddhanta (observational) method, which
                    may differ from traditional almanacs in your region.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Intellectual Property</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Open Source Software</h3>
                  <p className="text-muted-foreground mb-4">
                    Vedic Panchanga is open source software. The source code is available under:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Backend (Python):</strong> AGPL-3.0 License</li>
                    <li><strong>Frontend (Next.js):</strong> MIT License</li>
                    <li><strong>Mobile Apps:</strong> MIT License</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Third-Party Libraries</h3>
                  <p className="text-muted-foreground">
                    We use various third-party libraries and services, including Swiss Ephemeris for astronomical
                    calculations. These libraries are subject to their own licenses and terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Content and Trademarks</h3>
                  <p className="text-muted-foreground">
                    The name &ldquo;Vedic Panchanga&rdquo; and our logo are our trademarks. The educational content,
                    descriptions, and explanations on our website are our intellectual property unless otherwise noted.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Limitation of Liability</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VEDIC PANCHANGA SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
                WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE
                LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Your use or inability to use the service</li>
                <li>Any errors or inaccuracies in calculations</li>
                <li>Any decisions made based on information provided by the service</li>
                <li>Any unauthorized access to or alteration of your data</li>
                <li>Any interruption or cessation of the service</li>
              </ul>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Service Availability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Service Availability</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">No Warranty</h3>
                  <p className="text-muted-foreground">
                    The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties of any kind,
                    either express or implied. We do not guarantee that the service will be uninterrupted,
                    secure, or error-free.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Modifications and Discontinuation</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to modify or discontinue the service at any time, with or without notice.
                    We shall not be liable to you or any third party for any modification, suspension, or
                    discontinuance of the service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Rate Limiting</h3>
                  <p className="text-muted-foreground">
                    To ensure fair usage and prevent abuse, we implement rate limiting on our API endpoints.
                    Excessive use may result in temporary or permanent suspension of access.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Governing Law</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction
                in which the service operates, without regard to its conflict of law provisions.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver
                of those rights.
              </p>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Information</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> legal@vedicpanchanga.com</p>
                <p><strong>Website:</strong> vedicpanchanga.com</p>
                <p><strong>GitHub:</strong> github.com/bidyashish/vedicpanchanga.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}