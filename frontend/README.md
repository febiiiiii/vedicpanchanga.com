# 🕉️ Vedic Panchanga - Modern Hindu Calendar & Astrology

A modern web application for calculating traditional Hindu Panchanga (almanac) with a beautiful UI built using Next.js, TypeScript, and shadcn/ui.

## ✨ Features

### Core Panchanga Calculations
- **Tithi** (Lunar Day) - with Shukla/Krishna Paksha
- **Nakshatra** (Lunar Mansion) - with Pada and ruling deity
- **Yoga** - 27 yogas calculation
- **Karana** - Half-tithi calculations
- **Vaara** (Weekday) - with planetary lords

### Astronomical Data
- Sunrise & Sunset times
- Moonrise & Moonset times
- Planetary positions in Rashis
- Ayanamsha calculations (Lahiri)

### Muhurta Timings
- **Rahu Kala** - Inauspicious time ruled by Rahu
- **Yama Ganda** - Period ruled by Yama
- **Gulika Kala** - Inauspicious time of Gulika
- **Abhijit Muhurta** - Most auspicious time of the day

### User Features
- 📍 Location picker with popular cities
- 📅 Date and time selection
- 🌍 Current location detection
- 💾 Local storage for settings (no login required)
- 📱 Fully responsive design
- 🌙 Beautiful modern UI with shadcn/ui

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Python 3.8+ installed
- npm or yarn package manager

### Installation

This application uses a Python API backend for accurate panchanga calculations.

#### 1. Start the Python API

```bash
cd ../drik-panchanga

# Create virtual environment and install dependencies
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start the API server
python api.py
# Or use the start script: ./start.sh
```

The API will run at `http://localhost:8000`. Visit `http://localhost:8000/docs` for API documentation.

#### 2. Start the Next.js App

In a new terminal:

```bash
cd vedic-panchanga

# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run the test script to verify all endpoints:
```bash
node test-app.js
```

## 📱 Usage

1. **Select Date & Time**: Choose any date and time for calculations
2. **Choose Location**: Pick from popular cities or enter coordinates
3. **Calculate**: Click "Calculate Panchanga" to get results
4. **View Results**:
   - Panchanga tab shows tithi, nakshatra, etc.
   - Planets tab displays planetary positions
   - Muhurta tab shows auspicious/inauspicious times

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Python FastAPI with Swiss Ephemeris
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Calculations**: pyswisseph (Swiss Ephemeris)

## 📁 Project Structure

```
vedic-panchanga/
├── app/
│   ├── api/
│   │   ├── panchanga/    # Next.js API proxy to Python
│   │   └── cities/       # City search API
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main dashboard
├── components/
│   ├── panchanga-card.tsx     # Panchanga display
│   ├── location-picker.tsx    # Location selector
│   ├── date-time-picker.tsx   # Date/time selector
│   └── planetary-positions.tsx # Planets table
├── lib/
│   ├── api-client.ts     # Python API client
│   ├── constants.ts      # Vedic astrology constants
│   ├── types.ts         # TypeScript types
│   └── store.ts         # Zustand store
└── public/              # Static assets

drik-panchanga/ (Python API)
├── api.py               # FastAPI server
├── panchanga.py         # Core calculations
├── vedic.py             # Vedic calendar functions
├── vimsottari.py        # Dasha calculations
├── cities.json          # City database
├── sanskrit_names.json  # Sanskrit terminology
└── requirements.txt     # Python dependencies
```

## 🔗 API Architecture

This app uses a **two-tier architecture**:

1. **Python API (Port 8000)**: Handles all astronomical calculations using Swiss Ephemeris
   - Precise panchanga calculations
   - Swiss Ephemeris integration
   - City database with 100,000+ locations

2. **Next.js App (Port 3000)**: Frontend and API proxy
   - Modern React UI
   - API rate limiting
   - Client-side state management

The Next.js API routes act as a proxy to the Python API, adding rate limiting and handling timezone conversions.

## ⚠️ Disclaimer

This application uses the Swiss Ephemeris for astronomical calculations, which provides high-precision data. The calculations follow traditional Drik Ganita (observational) methods of Hindu astronomy. However, for important religious or personal decisions, please consult traditional panchangas or qualified astrologers.

## 🙏 Acknowledgments

- Python calculations: [drik-panchanga](https://github.com/bdsatish/drik-panchanga) by Satish Bysany
- UI Components: [shadcn/ui](https://ui.shadcn.com)
- Astronomical calculations: Swiss Ephemeris
- Vedic Astrology based on traditional Hindu astronomical texts

## 📜 License

- Frontend (Next.js): MIT License
- Python API (drik-panchanga): GNU Affero General Public License v3.0

Please respect the original licenses when using or modifying this code.