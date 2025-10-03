# Vedic Panchanga - Hindu Calendar System

A comprehensive Hindu lunisolar calendar application with accurate astronomical calculations based on the Swiss Ephemeris.

## 🌟 Features

- **Complete Panchanga Calculations**
  - Tithi (Lunar day)
  - Nakshatra (Lunar mansion)
  - Yoga (Sun-Moon combination)
  - Karana (Half-tithi)
  - Vaara (Weekday with planetary lord)

- **Muhurta Timings**
  - Rahu Kala
  - Yama Ganda
  - Gulika Kala
  - Abhijit Muhurta

- **Astronomical Data**
  - Sunrise, Sunset, Moonrise, Moonset
  - Planetary positions in zodiac signs
  - Ayanamsha (Lahiri)
  - Vimsottari Dasha periods

- **Modern Web Interface**
  - Responsive design
  - Dark/Light mode
  - Location-based calculations
  - Date/Time picker

## 🏗️ Project Structure

```
vedic-panchanga/
├── backend/                    # Python FastAPI backend
│   ├── api.py                 # REST API server
│   ├── panchanga.py           # Core calculations
│   ├── vimsottari.py          # Dasha calculations
│   ├── vedic.py               # Vedic astrology functions
│   ├── cities.json            # Cities database
│   ├── sanskrit_names.json   # Sanskrit terminology
│   └── requirements.txt      # Python dependencies
│
├── frontend/                   # Next.js 15 frontend
│   ├── app/                   # App router pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities and types
│   ├── public/                # Static assets
│   └── package.json          # Node dependencies
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Setup Commands

```bash
# Backend Setup - Install Python dependencies
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt

# Frontend Setup - Install Node dependencies
cd frontend && npm install

# Create frontend environment file
cd frontend && echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### Development Commands

Run these commands from the project root directory:

```bash
# Run both backend and frontend together (requires 'concurrently' package)
# npm install -g concurrently
concurrently "cd backend && source venv/bin/activate && python api.py" "cd frontend && npm run dev"

# Or run them separately in different terminals:

# Backend only
cd backend && source venv/bin/activate && python api.py

# Frontend only
cd frontend && npm run dev
```

### Build & Production

```bash
# Build frontend for production
cd frontend && npm run build

# Start frontend production server
cd frontend && npm run start
```

### Utility Commands

```bash
# Clean all generated files and dependencies
rm -rf frontend/node_modules frontend/.next backend/__pycache__ backend/venv

# Reinstall everything
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
cd frontend && npm install
```

The backend API will be available at `http://localhost:8000`
The frontend will be available at `http://localhost:3000`

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Swiss Ephemeris** - High-precision astronomical calculations
- **Pydantic** - Data validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Modern UI components
- **date-fns** - Date formatting utilities

## 📚 API Documentation

### Next.js API Endpoints

#### `POST /api/v1/panchanga` or `GET /api/v1/panchanga`
**Streamlined API with CORS support** - Perfect for external applications!

Returns essential panchanga data including:
- Complete panchanga (tithi, nakshatra, yoga, karana, vaara)
- Sun/Moon timings (sunrise, sunset, moonrise, moonset)
- Muhurta timings (Rahu Kala, Yama Ganda, Gulika Kala, Abhijit)
- Planetary positions in zodiac signs
- Vimsottari Dasha periods
- Calendar information (masa, ritu, samvatsara)

#### `POST /api/cities`
Search for cities in the database to get location coordinates.

See [API.md](frontend/API.md) for complete documentation and examples.

### Individual Endpoints (Python Backend)

#### `POST /panchanga`
Calculate complete panchanga for a given date and location.

#### `POST /planetary-positions`
Get positions of all planets in zodiac signs.

#### `POST /vimsottari-dasha`
Calculate Vimsottari Dasha periods.

#### `POST /cities/search`
Search for cities in the database.

Backend API documentation is available at `http://localhost:8000/docs` when the server is running.

## 📄 License

This project contains multiple licenses:

### Backend (Python Code)
The backend code is based on the original Drik Panchanga project and is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See [backend/LICENSE](backend/LICENSE) for details.

### Swiss Ephemeris
The astronomical calculations use the Swiss Ephemeris, which has its own licensing terms. For commercial use, please refer to [Swiss Ephemeris License](http://www.astro.com/swisseph/swephinfo_e.htm).

### Frontend (Next.js Code)
The frontend code is licensed under the **MIT License**. See [frontend/LICENSE](frontend/LICENSE) for details.

## 🙏 Acknowledgments

- Original Drik Panchanga by Satish Bysany
- Swiss Ephemeris by Astrodienst AG
- Hindu calendar algorithms from various traditional sources

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please use the GitHub Issues page.

## 🌍 Usage Note

This application provides traditional Hindu calendar calculations for educational and personal use. For critical muhurta or astrological decisions, please consult with qualified practitioners.

---

**Note**: Calculations are based on traditional algorithms and may vary slightly from other panchanga sources due to different calculation methods or ayanamsha systems.