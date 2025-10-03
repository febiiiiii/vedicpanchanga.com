# Drik Panchanga API

REST API for Hindu lunisolar calendar (Panchanga) calculations based on Swiss ephemeris.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Run the API server:**
```bash
python api.py
```

Or using uvicorn directly:
```bash
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## Endpoints

### GET `/`
Root endpoint with API information

### POST `/panchanga`
Calculate complete panchanga for a given date and location

**Request Body:**
```json
{
  "date": {
    "year": 2024,
    "month": 10,
    "day": 3
  },
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timezone": 5.5
  }
}
```

**Response:**
```json
{
  "tithi": {
    "index": 1,
    "name": "Pratipad",
    "end_time": {
      "hours": 14,
      "minutes": 23,
      "seconds": 45
    }
  },
  "nakshatra": {
    "index": 1,
    "name": "Aśvinī",
    "end_time": {
      "hours": 18,
      "minutes": 12,
      "seconds": 30
    }
  },
  "yoga": {...},
  "karana": {...},
  "vaara": {
    "index": 4,
    "name": "Guruvāra"
  },
  "masa": {
    "index": 7,
    "name": "Āśvayuja",
    "is_leap": false
  },
  "ritu": {...},
  "samvatsara": {...},
  "sunrise": {...},
  "sunset": {...},
  "day_duration": {...},
  "ahargana": 1867850,
  "saka_year": 1946,
  "kali_year": 5125
}
```

### POST `/cities/search`
Search for cities in the database

**Request Body:**
```json
{
  "city_name": "Bangalore"
}
```

**Response:**
```json
[
  {
    "name": "Bangalore",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timezone": "Asia/Kolkata"
  }
]
```

### GET `/cities?limit=100`
List all available cities (default limit: 100)

## Integration with Next.js

The API is configured with CORS to allow requests from:
- `http://localhost:3000`
- `http://localhost:3001`

To add more origins, edit the `allow_origins` list in `api.py`.

## Core Calculation Modules

- **panchanga.py** - Main calculation functions (tithi, nakshatra, yoga, karana, etc.)
- **vedic.py** - Vedic calendar specific calculations
- **vimsottari.py** - Vimsottari dasha calculations

## Data Files

- **cities.json** - Database of cities with coordinates and timezones
- **sanskrit_names.json** - Sanskrit names for all panchanga elements
- **cities.csv** - CSV version of cities database

## License

GNU Affero General Public License v3.0 - See LICENSE file
