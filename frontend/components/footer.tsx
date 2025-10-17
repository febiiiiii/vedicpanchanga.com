import { Github, Mail, FileText, Shield, Info } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-8 sm:mt-12 md:mt-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">About</h3>
            <div className="text-xs sm:text-sm text-muted-foreground space-y-2">
              <p>
                Vedic Panchanga provides accurate Hindu calendar calculations using Swiss Ephemeris
                for any date and location worldwide.
              </p>
              <p className="text-xs">
                Calculations are for general guidance only. Consult experts for critical decisions.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Info className="h-3 w-3" />
                <span>About Us</span>
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Shield className="h-3 w-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileText className="h-3 w-3" />
                <span>Terms of Service</span>
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Connect</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="https://github.com/bidyashish/vedicpanchanga.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3 w-3" />
                <span>Open Source on GitHub</span>
              </a>
              <a
                href="mailto:support@vedicpanchanga.com"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>support@vedicpanchanga.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vedic Panchanga. Traditional knowledge preserved with modern technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
