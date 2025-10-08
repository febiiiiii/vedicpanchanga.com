#!/usr/bin/env python3

"""
Comprehensive Timezone Testing for Panchanga API
Tests both internal (localhost) and external (production) APIs
"""

import requests
import json
from datetime import datetime, timezone
# from tabulate import tabulate  # Optional, will use simple formatting if not available
try:
    from tabulate import tabulate
    HAS_TABULATE = True
except ImportError:
    HAS_TABULATE = False

# API endpoints
INTERNAL_API = "http://localhost:3121/api/v1/panchanga"
EXTERNAL_API = "https://vedicpanchanga.com/api/v1/panchanga"

# Test cities with diverse timezone characteristics
TEST_LOCATIONS = [
    {
        "name": "Tokyo",
        "latitude": 35.6762,
        "longitude": 139.6503,
        "timezone": "Asia/Tokyo",
        "country": "Japan",
        "notes": "UTC+9 (No DST)"
    },
    {
        "name": "Sydney",
        "latitude": -33.8688,
        "longitude": 151.2093,
        "timezone": "Australia/Sydney",
        "country": "Australia",
        "notes": "UTC+10/+11 (Has DST)"
    },
    {
        "name": "London",
        "latitude": 51.5074,
        "longitude": -0.1278,
        "timezone": "Europe/London",
        "country": "UK",
        "notes": "UTC+0/+1 (Has DST)"
    },
    {
        "name": "New York",
        "latitude": 40.7128,
        "longitude": -74.006,
        "timezone": "America/New_York",
        "country": "USA",
        "notes": "UTC-5/-4 (Has DST)"
    },
    {
        "name": "Dubai",
        "latitude": 25.2048,
        "longitude": 55.2708,
        "timezone": "Asia/Dubai",
        "country": "UAE",
        "notes": "UTC+4 (No DST)"
    },
    {
        "name": "Mumbai",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "timezone": "Asia/Kolkata",
        "country": "India",
        "notes": "UTC+5:30 (No DST)"
    }
]

def test_api(api_url, api_name, test_date):
    """Test a single API with all locations"""
    
    print(f"\n{'='*80}")
    print(f"Testing: {api_name}")
    print(f"API URL: {api_url}")
    print(f"Test UTC Time: {test_date}")
    print(f"{'='*80}")
    
    results = []
    
    for location in TEST_LOCATIONS:
        print(f"\nTesting: {location['name']} ({location['notes']})")
        
        # Prepare request payload
        payload = {
            "date": test_date,
            "location": {
                "latitude": location['latitude'],
                "longitude": location['longitude'],
                "timezone": location['timezone'],
                "city": location['name'],
                "country": location['country']
            }
        }
        
        try:
            # Make API request
            response = requests.post(
                api_url,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                
                # Extract key information
                result = {
                    "Location": location['name'],
                    "Sunrise": data.get('sun', {}).get('rise', 'N/A'),
                    "Sunset": data.get('sun', {}).get('set', 'N/A'),
                    "Tithi": data.get('panchanga', {}).get('tithi', {}).get('name', 'N/A')[:20],
                    "Vaara": data.get('panchanga', {}).get('vaara', {}).get('name', 'N/A'),
                    "Status": "✅"
                }
                
                results.append(result)
                print(f"  ✅ Success - Vaara: {result['Vaara']}, Sunrise: {result['Sunrise']}")
                
            else:
                print(f"  ❌ Error {response.status_code}")
                results.append({
                    "Location": location['name'],
                    "Status": f"❌ {response.status_code}"
                })
                
        except Exception as e:
            print(f"  ❌ Error: {str(e)[:50]}")
            results.append({
                "Location": location['name'],
                "Status": f"❌ Error"
            })
    
    # Display results table
    if results:
        print(f"\nSummary Table for {api_name}:")
        if HAS_TABULATE:
            print(tabulate(results, headers="keys", tablefmt="grid"))
        else:
            # Simple formatting without tabulate
            for result in results:
                print(f"  {result.get('Location', 'N/A'):15} | Sunrise: {result.get('Sunrise', 'N/A'):10} | Vaara: {result.get('Vaara', 'N/A'):15} | {result.get('Status', 'N/A')}")
    
    return results

def compare_apis(internal_results, external_results):
    """Compare results between internal and external APIs"""
    
    print(f"\n{'='*80}")
    print(f"COMPARISON: Internal vs External API")
    print(f"{'='*80}")
    
    comparison = []
    
    for i, location in enumerate(TEST_LOCATIONS):
        if i < len(internal_results) and i < len(external_results):
            int_result = internal_results[i]
            ext_result = external_results[i]
            
            # Compare key fields
            sunrise_match = "✅" if int_result.get('Sunrise') == ext_result.get('Sunrise') else "❌"
            vaara_match = "✅" if int_result.get('Vaara') == ext_result.get('Vaara') else "❌"
            
            comp = {
                "Location": location['name'],
                "Internal Sunrise": int_result.get('Sunrise', 'N/A'),
                "External Sunrise": ext_result.get('Sunrise', 'N/A'),
                "Sunrise Match": sunrise_match,
                "Vaara Match": vaara_match
            }
            
            comparison.append(comp)
    
    if comparison:
        if HAS_TABULATE:
            print(tabulate(comparison, headers="keys", tablefmt="grid"))
        else:
            # Simple formatting without tabulate
            print("\n  Location       | Int Sunrise | Ext Sunrise | Match")
            print("  " + "-"*55)
            for comp in comparison:
                print(f"  {comp.get('Location', 'N/A'):15} | {comp.get('Internal Sunrise', 'N/A'):10} | {comp.get('External Sunrise', 'N/A'):10} | {comp.get('Sunrise Match', 'N/A')}")

def main():
    """Main test function"""
    
    print("╔" + "═"*78 + "╗")
    print("║" + " "*20 + "PANCHANGA API TIMEZONE VERIFICATION" + " "*23 + "║")
    print("╚" + "═"*78 + "╝")
    
    # Test date: October 8, 2025, 22:30 UTC
    test_date = "2025-10-08T22:30:00.000Z"
    
    print(f"\nTesting with UTC timestamp: {test_date}")
    
    # Test internal API
    print(f"\nStep 1: Testing Internal API (localhost)")
    internal_results = test_api(INTERNAL_API, "Internal API", test_date)
    
    # Test external API  
    print(f"\nStep 2: Testing External API (production)")
    external_results = test_api(EXTERNAL_API, "External API", test_date)
    
    # Compare results
    print(f"\nStep 3: Comparing Results")
    compare_apis(internal_results, external_results)
    
    print("\n" + "="*80)
    print("TEST COMPLETE")
    print("="*80)

if __name__ == "__main__":
    main()
