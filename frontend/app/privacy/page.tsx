import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { UniversalHeader } from '@/components/universal-header';
import { LegalPageHeader } from '@/components/legal-page-header';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Vedic Panchanga',
  description: 'Privacy Policy for Vedic Panchanga. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
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
          title="Privacy Policy"
          subtitle="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
          lastUpdated="October 16, 2025"
          icon={<Shield className="h-8 w-8 md:h-10 md:w-10" />}
        />

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pb-8 sm:pb-12 max-w-4xl">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Introduction</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Welcome to Vedic Panchanga. We are committed to protecting your personal information and your right to privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website
                vedicpanchanga.com and our mobile applications.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                please do not access the site or use our services.
              </p>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Information We Collect</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Information You Provide to Us</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Location data (city name or coordinates) for Panchanga calculations</li>
                    <li>Date and time preferences for calculations</li>
                    <li>Email address (only if you contact us for support)</li>
                    <li>Any feedback or correspondence you send to us</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Information Automatically Collected</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Device information (browser type, operating system, device type)</li>
                    <li>IP address and approximate geographic location</li>
                    <li>Usage data (pages visited, features used, time spent on site)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Information We Do NOT Collect</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>We do not require user registration or accounts</li>
                    <li>We do not collect personal birth chart data</li>
                    <li>We do not store sensitive personal information</li>
                    <li>We do not collect payment information (our service is free)</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">How We Use Your Information</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate Panchanga calculations for your selected location and time</li>
                <li>Remember your preferences (stored locally in your browser)</li>
                <li>Improve and optimize our website and services</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Send administrative information and service updates</li>
                <li>Detect and prevent fraud, abuse, or illegal activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Data Storage and Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Data Storage and Security</h2>

              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information
                against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Local Storage</h3>
                  <p className="text-muted-foreground">
                    Your preferences (location, time settings) are stored locally in your browser using localStorage.
                    This data never leaves your device unless you clear your browser data.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Server-Side Storage</h3>
                  <p className="text-muted-foreground">
                    We do not maintain user accounts or databases of personal information. Calculation requests are
                    processed in real-time and not stored on our servers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Security Measures</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>HTTPS encryption for all data transmission</li>
                    <li>Rate limiting to prevent abuse</li>
                    <li>Regular security updates and monitoring</li>
                    <li>No storage of sensitive personal data</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="border-t border-border/30 my-8" />

            {/* Contact Us */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                If you have questions or concerns about this privacy policy, please contact us at:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> privacy@vedicpanchanga.com</p>
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