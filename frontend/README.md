# Frontend - Vedic Panchanga

Next.js 15 frontend for the Vedic Panchanga application.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Development
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
├── app/                # Next.js 15 App Router
│   ├── api/           # API proxy routes with rate limiting
│   └── page.tsx       # Main dashboard
├── components/        # React components
│   ├── panchanga-card.tsx
│   ├── city-dropdown.tsx
│   └── ui/           # Shadcn/ui components
└── lib/              # Utilities
    ├── api-client.ts # Backend communication
    ├── store.ts      # Zustand state
    └── types.ts      # TypeScript types
```

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **UI**: React 19, TypeScript, Tailwind CSS v4
- **Components**: Shadcn/ui (new-york style)
- **State**: Zustand with persistence
- **Date**: date-fns, react-day-picker

## Development Notes

- API proxy adds rate limiting (10 req/10s per IP)
- State persists to localStorage
- Tailwind v4 uses CSS-based config (no tailwind.config.js)
- Dark/light mode with next-themes

For full documentation, see main [README.md](../README.md)