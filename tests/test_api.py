#!/usr/bin/env python3

import requests
import json
from datetime import datetime

# Test data
test_cases = [
    {
        "name": "Vancouver (PDT, UTC-7 in October)",
        "data": {
            "date": "2025-10-08T21:53:03.544Z",
            "location": {
                "latitude": 50.011767470790886,
                "longitude": -119.40103978611879,
                "timezone": "America/Vancouver",
                "city": "East Central Okanagan Electoral Area",
                "country": "Canada"
            }
        }
    },
    {
        "name": "Dubai (GST, UTC+4, no DST)",
        "data": {
            "date": "2025-10-08T21:53:03.544Z",
            "location": {
                "latitude": 25.2048,
                "longitude": 55.2708,
                "timezone": "Asia/Dubai",
                "city": "Dubai",
                "country": "UAE"
            }
        }
    }
]

def test_backend_api():
    """Test the backend API directly"""
    print("Testing Backend API (http://localhost:8121)")
    print("=" * 60)

    for test in test_cases:
        print(f"\nTest: {test['name']}")
        print("-" * 40)

        # Convert UTC date to local time for display
        utc_date = datetime.fromisoformat(test['data']['date'].replace('Z', '+00:00'))
        print(f"UTC Time: {utc_date}")

        try:
            response = requests.post(
                "http://localhost:8121/panchanga",
                json=test['data'],
                headers={"Content-Type": "application/json"}
            )

            if response.status_code == 200:
                data = response.json()
                print(f"Success! Response preview:")
                print(f"  Sunrise: {data.get('sunrise')}")
                print(f"  Sunset: {data.get('sunset')}")
                print(f"  Tithi: {data.get('tithi', {}).get('name')}")
                print(f"  Nakshatra: {data.get('nakshatra', {}).get('name')}")
                print(f"  Vaara: {data.get('vaara', {}).get('name')}")
            else:
                print(f"Error {response.status_code}: {response.text[:200]}")

        except Exception as e:
            print(f"Error: {e}")

def test_frontend_api():
    """Test the frontend API proxy"""
    print("\n\nTesting Frontend API (http://localhost:3121)")
    print("=" * 60)

    for test in test_cases:
        print(f"\nTest: {test['name']}")
        print("-" * 40)

        try:
            response = requests.post(
                "http://localhost:3121/api/v1/panchanga",
                json=test['data'],
                headers={"Content-Type": "application/json"}
            )

            if response.status_code == 200:
                data = response.json()
                print(f"Success! Response preview:")
                print(f"  Date: {data.get('date')}")
                print(f"  Location: {data.get('location', {}).get('city')}")
                print(f"  Sunrise: {data.get('sun', {}).get('rise')}")
                print(f"  Sunset: {data.get('sun', {}).get('set')}")
                print(f"  Tithi: {data.get('panchanga', {}).get('tithi', {}).get('name')}")
                print(f"  Nakshatra: {data.get('panchanga', {}).get('nakshatra', {}).get('name')}")
            else:
                print(f"Error {response.status_code}: {response.text[:200]}")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    test_backend_api()
    test_frontend_api()