import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 sm:mt-12 md:mt-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="text-center text-xs sm:text-sm text-muted-foreground space-y-2">
          <p>
            Vedic Panchanga - Traditional Hindu Calendar System
          </p>
          <p>
            Calculations are approximate and for general guidance only
          </p>
          <p className="flex items-center justify-center gap-1 pt-1">
            <a
              href="https://github.com/bidyashish/vedicpanchanga.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Open Source Project</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
