#!/usr/bin/env python3

"""
Detailed Timezone Verification for Panchanga API
Verifies that the day (Vaara) is correctly calculated for each timezone
"""

import requests
import json
from datetime import datetime
import sys

# API endpoints
INTERNAL_API = "http://localhost:3121/api/v1/panchanga"
EXTERNAL_API = "https://vedicpanchanga.com/api/v1/panchanga"

# Test specific times that cross day boundaries
TEST_CASES = [
    {
        "description": "Testing day boundary - UTC 22:30 Oct 8, 2025",
        "utc_time": "2025-10-08T22:30:00.000Z",
        "expected": {
            "Tokyo": {"local": "Oct 9, 07:30", "day": "Thursday", "vaara": "Guruvāra"},
            "Sydney": {"local": "Oct 9, 09:30", "day": "Thursday", "vaara": "Guruvāra"},
            "London": {"local": "Oct 8, 23:30", "day": "Wednesday", "vaara": "Budhavāra"},
            "New York": {"local": "Oct 8, 18:30", "day": "Wednesday", "vaara": "Budhavāra"},
            "Dubai": {"local": "Oct 9, 02:30", "day": "Thursday", "vaara": "Guruvāra"},
        }
    },
    {
        "description": "Testing midday - UTC 12:00 Oct 8, 2025",
        "utc_time": "2025-10-08T12:00:00.000Z",
        "expected": {
            "Tokyo": {"local": "Oct 8, 21:00", "day": "Wednesday", "vaara": "Budhavāra"},
            "Sydney": {"local": "Oct 8, 23:00", "day": "Wednesday", "vaara": "Budhavāra"},
            "London": {"local": "Oct 8, 13:00", "day": "Wednesday", "vaara": "Budhavāra"},
            "New York": {"local": "Oct 8, 08:00", "day": "Wednesday", "vaara": "Budhavāra"},
            "Dubai": {"local": "Oct 8, 16:00", "day": "Wednesday", "vaara": "Budhavāra"},
        }
    }
]

LOCATIONS = {
    "Tokyo": {"lat": 35.6762, "lon": 139.6503, "tz": "Asia/Tokyo"},
    "Sydney": {"lat": -33.8688, "lon": 151.2093, "tz": "Australia/Sydney"},
    "London": {"lat": 51.5074, "lon": -0.1278, "tz": "Europe/London"},
    "New York": {"lat": 40.7128, "lon": -74.006, "tz": "America/New_York"},
    "Dubai": {"lat": 25.2048, "lon": 55.2708, "tz": "Asia/Dubai"},
}

def test_timezone_accuracy(api_url, api_name):
    """Test timezone accuracy for day calculations"""
    
    print(f"\n{'='*80}")
    print(f"TESTING: {api_name}")
    print(f"{'='*80}")
    
    all_pass = True
    
    for test_case in TEST_CASES:
        print(f"\n{test_case['description']}")
        print(f"UTC Time: {test_case['utc_time']}")
        print("-" * 60)
        
        for city, expected in test_case['expected'].items():
            location = LOCATIONS[city]
            
            payload = {
                "date": test_case['utc_time'],
                "location": {
                    "latitude": location['lat'],
                    "longitude": location['lon'],
                    "timezone": location['tz'],
                    "city": city,
                    "country": "Test"
                }
            }
            
            try:
                response = requests.post(
                    api_url,
                    json=payload,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    actual_vaara = data.get('panchanga', {}).get('vaara', {}).get('name', 'N/A')
                    
                    # Check if the vaara matches expected
                    if expected['vaara'].lower() in actual_vaara.lower():
                        status = "✅ PASS"
                    else:
                        status = f"❌ FAIL - Expected {expected['vaara']}, got {actual_vaara}"
                        all_pass = False
                    
                    print(f"  {city:12} | Local: {expected['local']:15} | Expected: {expected['day']:10} ({expected['vaara']:10}) | Got: {actual_vaara:15} | {status}")
                else:
                    print(f"  {city:12} | ❌ API Error {response.status_code}")
                    all_pass = False
                    
            except Exception as e:
                print(f"  {city:12} | ❌ Error: {str(e)[:30]}")
                all_pass = False
    
    return all_pass

def main():
    print("╔" + "═"*78 + "╗")
    print("║" + " "*15 + "PANCHANGA API TIMEZONE ACCURACY VERIFICATION" + " "*18 + "║")
    print("╚" + "═"*78 + "╝")
    
    # Test internal API
    internal_pass = test_timezone_accuracy(INTERNAL_API, "Internal API (localhost:3121)")
    
    # Test external API
    external_pass = test_timezone_accuracy(EXTERNAL_API, "External API (vedicpanchanga.com)")
    
    # Summary
    print(f"\n{'='*80}")
    print("SUMMARY")
    print(f"{'='*80}")
    print(f"Internal API: {'✅ ALL TESTS PASSED' if internal_pass else '❌ SOME TESTS FAILED'}")
    print(f"External API: {'✅ ALL TESTS PASSED' if external_pass else '❌ SOME TESTS FAILED'}")
    
    if not (internal_pass and external_pass):
        print("\n⚠️  TIMING ISSUES DETECTED!")
        print("The Vaara (day of week) is not being calculated correctly for different timezones.")
        print("The API should return different days for locations that have crossed midnight.")
        sys.exit(1)
    else:
        print("\n✅ ALL TIMEZONE TESTS PASSED!")
        print("The API correctly calculates the local day for each timezone.")

if __name__ == "__main__":
    main()
