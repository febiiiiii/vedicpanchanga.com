import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export function LayoutWrapper({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Smooth radial gradient backgrounds */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient */}
        <div className="absolute top-0 -left-1/4 w-[150%] h-[120%] bg-gradient-radial from-primary/5 via-primary/2 to-transparent blur-3xl" />

        {/* Secondary gradient */}
        <div className="absolute -bottom-1/2 -right-1/4 w-[150%] h-[150%] bg-gradient-radial from-secondary/10 via-secondary/5 to-transparent blur-3xl" />

        {/* Accent gradient for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-background via-background/95 to-transparent" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {children}
    </div>
  );
}