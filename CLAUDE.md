# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vedic Panchanga - A full-stack web application for calculating traditional Hindu almanac (Panchanga) with high-precision astronomical calculations using Swiss Ephemeris.

**Architecture**: Two-tier application with Python FastAPI backend (port 8000) and Next.js 15 frontend (port 3000).

## Development Commands

### Backend Setup and Run
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python api.py  # Runs on http://localhost:8000
```

### Frontend Setup and Run
```bash
cd frontend
npm install
npm run dev  # Development server with Turbopack on http://localhost:3000
npm run build  # Production build
npm run start  # Production server
npm run lint  # Run ESLint
```

### Running Tests
```bash
# Backend - No test framework configured yet
# Frontend - No test framework configured yet
```

## Architecture Overview

### Backend (Python FastAPI)
- **Core Calculation Engine**: `panchanga.py` - Main Panchanga calculations using PySwisseph
- **Vedic Functions**: `vedic.py` - Vedic astrology utility functions
- **Vimsottari Dasha**: `vimsottari.py` - Planetary period calculations
- **API Server**: `api.py` - FastAPI endpoints with CORS for frontend
- **City Database**: `cities.json` - 100,000+ worldwide locations with coordinates

Key endpoints:
- `POST /panchanga` - Complete panchanga calculation
- `POST /cities/search` - City search with fuzzy matching

### Frontend (Next.js 15 with App Router)
- **API Proxy**: `app/api/v1/` - Proxies requests to Python backend with rate limiting
- **Main Dashboard**: `app/page.tsx` - Primary UI with date/location selection
- **State Management**: `lib/store.ts` - Zustand with localStorage persistence
- **Components**:
  - `panchanga-card.tsx` - Displays panchanga data with tabs
  - `city-dropdown.tsx` - Location search with debouncing
  - `date-time-picker.tsx` - Date/time selection interface
  - UI components in `components/ui/` - Shadcn/ui with Radix primitives

### Key Technical Decisions

1. **Swiss Ephemeris**: High-precision astronomical calculations (5000 BCE - 5000 CE)
2. **Drik Siddhanta**: Observational method for calculations
3. **Rate Limiting**: 10 requests per 10 seconds per IP in frontend API
4. **Tailwind CSS v4**: Using new CSS-based configuration (no tailwind.config.js)
5. **Shadcn/ui**: "new-york" style variant for consistent UI
6. **TypeScript Strict Mode**: Enforced type safety throughout frontend

## Important Files and Their Purposes

- `backend/panchanga.py`: Core calculation logic - modify for calculation changes
- `frontend/app/page.tsx`: Main UI - modify for layout/feature changes
- `frontend/lib/types.ts`: TypeScript interfaces matching backend responses
- `frontend/lib/api-client.ts`: Backend communication - handles API calls
- `frontend/components/panchanga-card.tsx`: Data display logic
- `backend/cities.json`: City database - searchable location data

## API Communication Flow

1. Frontend UI (`app/page.tsx`) →
2. API Client (`lib/api-client.ts`) →
3. Next.js API Route (`app/api/v1/panchanga/route.ts`) →
4. Python Backend (`api.py`) →
5. Calculation Engine (`panchanga.py`) →
6. Swiss Ephemeris (C library via PySwisseph)

## Environment Configuration

Frontend requires `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Common Development Tasks

### Adding New Panchanga Calculations
1. Modify `backend/panchanga.py` to add calculation logic
2. Update `backend/api.py` if new endpoint needed
3. Update `frontend/lib/types.ts` with new data types
4. Modify `frontend/components/panchanga-card.tsx` to display new data

### Modifying UI Components
1. Components use Shadcn/ui - check `components/ui/` for available primitives
2. Follow existing pattern in `components/` for new components
3. Use Zustand store (`lib/store.ts`) for shared state

### Working with City Data
- City database in `backend/cities.json` contains 100,000+ locations
- Search logic in `backend/api.py` uses fuzzy matching
- Frontend caches city searches in component state

## Performance Considerations

- Frontend uses Turbopack for faster development builds
- API responses are rate-limited to prevent abuse
- City search implements debouncing (300ms)
- Zustand store persists to localStorage for better UX

## Licensing
- Backend: AGPL-3.0 (GNU Affero General Public License)
- Frontend: MIT License