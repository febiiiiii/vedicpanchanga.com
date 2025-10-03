# Backend - Vedic Panchanga API

Python FastAPI backend for Hindu lunisolar calendar calculations using Swiss Ephemeris (Drik-ganita method).

## Quick Start

```bash
# Setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run
python api.py
```

API documentation available at http://localhost:8000/docs

## Features

**Core Panchanga**: Tithi, Nakshatra, Yoga, Karana, Vaara with end times
**Astronomical**: Sunrise/Sunset, Moonrise/Moonset, Planetary positions
**Muhurta**: Rahu Kala, Yama Ganda, Gulika, Abhijit, Durmuhurtams
**Dasha**: Vimsottari Dasha-Bhukti calculations
**Database**: 100,000+ cities with coordinates and timezones

## Project Structure

```
├── api.py                 # FastAPI server
├── panchanga.py          # Core calculation engine
├── vedic.py              # Vedic calendar utilities
├── vimsottari.py         # Dasha calculations
├── cities.json           # City database
├── sanskrit_names.json   # Sanskrit terminology
└── requirements.txt      # Python dependencies
```

## API Endpoints

- `POST /panchanga` - Complete panchanga calculation
- `POST /planetary-positions` - Planetary zodiac positions
- `POST /vimsottari-dasha` - Dasha periods
- `POST /cities/search` - City lookup

## Accuracy

Uses Swiss Ephemeris for high precision:
- Accurate for 5000 BCE to 5000 CE
- Best accuracy: 2500 BCE - 2500 CE
- Based on Drik (observational) method, not Surya Siddhanta

## License

GNU Affero GPL v3.0 - Based on original work by Satish BD

For full documentation, see main [README.md](../README.md)