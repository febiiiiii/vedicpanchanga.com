import Link from 'next/link';
import { ChevronRight, FileText, Home } from 'lucide-react';

interface LegalPageHeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  icon?: React.ReactNode;
}

export function LegalPageHeader({
  title,
  subtitle,
  lastUpdated,
  icon = <FileText className="h-8 w-8 md:h-10 md:w-10" />
}: LegalPageHeaderProps) {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 md:mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <span className="text-foreground font-medium">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Header Content */}
          <div className="max-w-4xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 md:p-4 rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg md:text-xl text-muted-foreground">
                    {subtitle}
                  </p>
                )}
                {lastUpdated && (
                  <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 text-sm text-muted-foreground">
                    Last updated: {lastUpdated}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}