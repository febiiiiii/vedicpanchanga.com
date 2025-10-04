# API Documentation

## Main Endpoint

### Calculate Panchanga

`POST /api/v1/panchanga` or `GET /api/v1/panchanga`

Base URL: `http://localhost:3121`

#### Request (POST)

```json
{
  "date": "2024-10-03T12:00:00.000Z",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "city": "Bangalore",
    "timezone": "Asia/Kolkata"
  }
}
```

#### Request (GET)

```
GET /api/v1/panchanga?date=2024-10-03T12:00:00.000Z&lat=12.9716&lng=77.5946&city=Bangalore&timezone=Asia/Kolkata
```

#### Response

```json
{
  "panchanga": {
    "tithi": {
      "name": "Śukla pakṣa ekādaśī",
      "index": 11,
      "paksha": "Shukla",
      "endTime": "6:33 PM",
      "percentage": 36.2
    },
    "nakshatra": {
      "name": "Śravaṇā",
      "index": 22,
      "pada": 1,
      "endTime": "10:23 PM",
      "percentage": 68.5
    },
    "yoga": {
      "name": "Saubhāgya",
      "index": 4,
      "endTime": "3:12 PM"
    },
    "karana": {
      "name": "Vanija",
      "index": 3,
      "endTime": "5:38 AM"
    },
    "vaara": {
      "name": "Guruvāra (Thursday)",
      "lord": "Bṛhaspati (Jupiter)"
    }
  },
  "sun": {
    "sunrise": "6:12 AM",
    "sunset": "6:04 PM"
  },
  "moon": {
    "moonrise": "3:26 PM",
    "moonset": "2:16 AM"
  },
  "muhurta": {
    "rahukala": "1:30 PM - 3:00 PM",
    "yamaGanda": "6:00 AM - 7:30 AM",
    "gulika": "9:00 AM - 10:30 AM",
    "abhijit": "11:47 AM - 12:32 PM"
  },
  "planets": [
    {
      "name": "Sun",
      "sign": "Virgo",
      "signIndex": 5,
      "degrees": 16.456,
      "retrograde": false
    }
    // ... other planets
  ],
  "dasha": {
    "mahadasha": {
      "planet": "Mercury",
      "startDate": "2020-03-15",
      "endDate": "2037-03-15"
    },
    "antardasha": {
      "planet": "Venus",
      "startDate": "2023-06-20",
      "endDate": "2026-04-20"
    }
  }
}
```

### Search Cities

`POST /api/cities`

#### Request

```json
{
  "query": "delhi"
}
```

#### Response

```json
{
  "cities": [
    {
      "name": "Delhi",
      "country": "India",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "timezone": "Asia/Kolkata"
    }
  ]
}
```

## Python Backend Endpoints

Base URL: `http://localhost:8121`
Full documentation: `http://localhost:8121/docs`

### Available Endpoints

- `POST /panchanga` - Complete panchanga calculation
- `POST /planetary-positions` - Planetary positions
- `POST /vimsottari-dasha` - Dasha periods
- `POST /cities/search` - City search

## Rate Limiting

Frontend API implements rate limiting:
- 10 requests per 10 seconds per IP address
- Returns 429 status code when exceeded

## CORS Support

The `/api/v1/panchanga` endpoint supports CORS for external applications.

## Time Formats

- All times in responses are in local timezone
- Dates use ISO 8601 format
- Times are formatted as "h:mm AM/PM"

## Error Handling

### 400 Bad Request
Invalid parameters or missing required fields

### 429 Too Many Requests
Rate limit exceeded

### 500 Internal Server Error
Server error, check backend is running

## Examples

### JavaScript/Fetch

```javascript
const response = await fetch('http://localhost:3121/api/v1/panchanga', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    date: new Date().toISOString(),
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      city: "Delhi",
      timezone: "Asia/Kolkata"
    }
  })
});
const data = await response.json();
```

### cURL

```bash
curl -X POST http://localhost:3121/api/v1/panchanga \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-10-03T12:00:00.000Z",
    "location": {
      "latitude": 28.6139,
      "longitude": 77.2090,
      "city": "Delhi",
      "timezone": "Asia/Kolkata"
    }
  }'
```