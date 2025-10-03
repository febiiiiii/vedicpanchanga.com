# Vedic Panchanga API Documentation

## Available API Endpoints

### 1. Panchanga API (v1)

`POST /api/v1/panchanga`
`GET /api/v1/panchanga`

Main API endpoint providing streamlined panchanga data with CORS support for both internal and external applications. Includes all essential panchanga calculations, sun/moon timings, muhurta periods, planetary positions, and vimsottari dasha.

### 2. Cities Search API

`POST /api/cities`

Search for cities in the database to get location coordinates for panchanga calculations.

Base URL: `http://localhost:3000` (development) or your production URL

### POST Request

#### Request Body

```json
{
  "date": "2024-10-03T12:00:00.000Z",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "city": "Bangalore",
    "timezone": "Asia/Kolkata",
    "country": "India"
  }
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `date` | ISO String | Yes | Date and time for calculations |
| `location.latitude` | Number | Yes | Latitude in decimal degrees (-90 to 90) |
| `location.longitude` | Number | Yes | Longitude in decimal degrees (-180 to 180) |
| `location.city` | String | No | City name for reference |
| `location.timezone` | String | No | IANA timezone (default: Asia/Kolkata) |
| `location.country` | String | No | Country name for reference |

### GET Request

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `date` | ISO String | Current date | Date for calculations |
| `lat` | Number | 12.9716 | Latitude |
| `lng` | Number | 77.5946 | Longitude |
| `city` | String | Bangalore | City name |
| `timezone` | String | Asia/Kolkata | IANA timezone |

#### Example

```
GET /api/complete?date=2024-10-03T12:00:00.000Z&lat=12.9716&lng=77.5946&city=Bangalore&timezone=Asia/Kolkata
```

### Response Structure

```json
{
  "request": {
    "date": "2024-10-03T12:00:00.000Z",
    "location": {
      "latitude": 12.9716,
      "longitude": 77.5946,
      "timezone": "Asia/Kolkata",
      "city": "Bangalore",
      "country": "India"
    }
  },

  "panchanga": {
    "sun": {
      "sunrise": "6:12 AM",
      "sunset": "6:04 PM"
    },
    "moon": {
      "moonrise": "3:26 PM",
      "moonset": "2:16 AM"
    },
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
      "endTime": "9:34 AM",
      "lord": "Moon",
      "percentage": 6.9
    },
    "yoga": {
      "name": "Dhṛti",
      "index": 8,
      "endTime": "9:45 PM"
    },
    "karana": {
      "name": "Viṣṭi",
      "index": 8,
      "endTime": "6:33 PM"
    },
    "vaara": {
      "name": "Śukravāra",
      "index": 5,
      "lord": "Śukra"
    },
    "masa": {
      "name": "Āśvina",
      "index": 7,
      "is_leap": false
    },
    "ritu": {
      "name": "Śarad",
      "index": 3
    },
    "samvatsara": {
      "name": "Khara",
      "index": 25
    }
  },

  "muhurta": {
    "auspicious": {
      "abhijit": {
        "start": "11:44 AM",
        "end": "12:32 PM",
        "description": "Most auspicious time for all activities"
      }
    },
    "inauspicious": {
      "rahuKala": {
        "start": "10:39 AM",
        "end": "12:08 PM",
        "description": "Avoid important activities"
      },
      "yamaGanda": {
        "start": "3:06 PM",
        "end": "4:35 PM",
        "description": "Not suitable for new beginnings"
      },
      "gulikaKala": {
        "start": "7:41 AM",
        "end": "9:10 AM",
        "description": "Avoid auspicious activities"
      }
    }
  },

  "astronomical": {
    "ayanamsha": {
      "value": 25.100069,
      "system": "Lahiri"
    },
    "dayDuration": "11:52 AM",
    "ahargana": 1876234,
    "sakaYear": 1946,
    "kaliYear": 5125
  },

  "planets": {
    "positions": [
      {
        "name": "sūrya",
        "zodiacSign": "kanyā",
        "zodiacIndex": 5,
        "longitude": 165.234567,
        "nakshatra": "Hasta",
        "nakshatraIndex": 13,
        "pada": 2
      }
      // ... other planets
    ],
    "ascendant": {
      "zodiacSign": "vṛścika",
      "zodiacIndex": 7,
      "longitude": 217.456789,
      "nakshatra": "Jyeṣṭhā",
      "nakshatraIndex": 18,
      "pada": 1
    }
  },

  "dasha": {
    "currentMahadasha": {
      "planet": "Guru",
      "startDate": "2020-05-15",
      "endDate": "2036-05-15",
      "duration": 16
    },
    "allMahadashas": [
      // ... list of all mahadashas
    ]
  },

  "metadata": {
    "version": "1.0.0",
    "timestamp": "2024-10-03T12:00:00.000Z",
    "source": "Vedic Panchanga API",
    "calculation_method": "Drik Siddhanta (Swiss Ephemeris)"
  }
}
```

### Rate Limiting

- **Limit**: 10 requests per 10 seconds per IP
- **Headers returned**:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Date and location are required"
}
```

#### 429 Too Many Requests
```json
{
  "error": "Too many requests. Please try again later.",
  "limit": 10,
  "remaining": 0,
  "reset": 1696339200000
}
```

#### 500 Internal Server Error
```json
{
  "error": "Failed to fetch complete panchanga data"
}
```

### Usage Examples

#### JavaScript/TypeScript

```javascript
// Using fetch
const response = await fetch('http://localhost:3000/api/complete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    date: new Date().toISOString(),
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      city: 'Bangalore',
      timezone: 'Asia/Kolkata'
    }
  })
});

const data = await response.json();
console.log(data.panchanga.tithi.name); // Current tithi
```

#### Python

```python
import requests
from datetime import datetime

url = "http://localhost:3000/api/complete"
payload = {
    "date": datetime.now().isoformat(),
    "location": {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bangalore",
        "timezone": "Asia/Kolkata"
    }
}

response = requests.post(url, json=payload)
data = response.json()
print(data['panchanga']['tithi']['name'])
```

#### cURL

```bash
curl -X POST http://localhost:3000/api/complete \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-10-03T12:00:00.000Z",
    "location": {
      "latitude": 12.9716,
      "longitude": 77.5946,
      "city": "Bangalore",
      "timezone": "Asia/Kolkata"
    }
  }'
```

### CORS Configuration

The API supports CORS for browser-based applications. To use from a different domain, ensure your domain is whitelisted or use appropriate CORS headers.

### Supported Timezones

Common supported timezones include:
- Asia/Kolkata (IST)
- America/New_York (EST/EDT)
- America/Los_Angeles (PST/PDT)
- America/Chicago (CST/CDT)
- Europe/London (GMT/BST)
- Europe/Paris (CET/CEST)
- Asia/Dubai (GST)
- Asia/Singapore (SGT)
- Asia/Tokyo (JST)
- Australia/Sydney (AEST/AEDT)

### Notes

1. All times are returned in 12-hour format with AM/PM
2. Dates before 1582 should be entered in proleptic Gregorian calendar
3. Accuracy is best for dates between 2500 BCE - 2500 CE
4. The API uses Lahiri Ayanamsha for calculations
5. Rate limiting is implemented using Redis (if configured)

### Support

For issues or questions, please refer to the GitHub repository or create an issue.