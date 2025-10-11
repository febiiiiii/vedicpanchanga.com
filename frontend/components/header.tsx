'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sparkles, RefreshCw, Github } from 'lucide-react';

interface HeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

export function Header({ loading, onRefresh }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg sm:rounded-xl">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Vedic Panchanga
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                Traditional Hindu Calendar & Astrology
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 gap-1 px-2 sm:px-3 text-xs"
            >
              <a
                href="https://github.com/bidyashish/vedicpanchanga.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Star us on GitHub"
              >
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Star</span>
              </a>
            </Button>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={loading}
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
              title="Refresh calculations"
            >
              <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
