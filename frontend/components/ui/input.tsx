import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles with improved accessibility
        "h-10 w-full min-w-0 rounded-md border px-3 py-2 text-base",
        "bg-background dark:bg-input/20",
        "border-input dark:border-border/40",

        // Enhanced placeholder and selection for better visibility
        "placeholder:text-muted-foreground placeholder:opacity-70 dark:placeholder:opacity-60",
        "selection:bg-primary selection:text-primary-foreground",

        // Improved shadow and transitions
        "shadow-sm transition-all duration-200 ease-in-out",
        "hover:shadow-md hover:border-border dark:hover:border-border/60",

        // Better focus states for accessibility
        "outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
        "focus:border-primary dark:focus:border-primary",
        "focus:shadow-md dark:focus:shadow-[0_2px_8px_rgba(0,0,0,0.3)]",

        // Disabled state with better visibility
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        "disabled:opacity-50 disabled:bg-muted/20",

        // Error states with clear visual feedback
        "aria-invalid:border-destructive aria-invalid:text-destructive-foreground",
        "aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "dark:aria-invalid:ring-destructive/30",

        // File input specific styles
        "file:inline-flex file:h-8 file:items-center file:justify-center",
        "file:rounded-l-md file:border-0 file:bg-secondary",
        "file:px-3 file:text-sm file:font-medium",
        "file:text-secondary-foreground file:transition-colors",
        "file:hover:bg-secondary/80",

        // Responsive text sizing
        "md:text-sm lg:text-base",

        className
      )}
      {...props}
    />
  )
}

export { Input }
