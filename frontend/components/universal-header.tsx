'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Calendar, Home, Info, Shield, FileText, Github, Menu, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UniversalHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Calculator', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/privacy', label: 'Privacy', icon: Shield },
    { href: '/terms', label: 'Terms', icon: FileText },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Vedic Panchanga
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">
                Traditional Hindu Calendar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 px-3 py-2 h-10 min-w-[90px] transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                        : 'text-foreground hover:bg-primary/10 hover:text-primary hover:shadow-sm'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive(item.href) ? '' : 'text-primary'}`} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9"
            >
              <a
                href="https://github.com/bidyashish/vedicpanchanga.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Star us on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 py-3 px-3 min-h-[48px] transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive(item.href) ? '' : 'text-primary'}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}