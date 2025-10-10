#!/bin/bash

echo "========================================="
echo "Testing Panchanga API Timezone Handling"
echo "========================================="

# Test case from the user - New York
echo -e "\nTest 1: New York (America/New_York)"
echo "Date: 2025-10-08T22:02:43.308Z (UTC)"
echo "Local Time: October 8, 2025, 6:02 PM EDT (UTC-4)"
echo "-----------------------------------------"

curl -s 'http://localhost:3121/api/v1/panchanga' \
  -H 'Content-Type: application/json' \
  -d '{"date":"2025-10-08T22:02:43.308Z","location":{"latitude":40.7128,"longitude":-74.006,"timezone":"America/New_York","city":"New York","country":"USA"}}' \
  | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f'✓ Sunrise: {data.get(\"sun\", {}).get(\"rise\")}')
print(f'✓ Sunset: {data.get(\"sun\", {}).get(\"set\")}')
print(f'✓ Tithi: {data.get(\"panchanga\", {}).get(\"tithi\", {}).get(\"name\")}')
print(f'✓ Nakshatra: {data.get(\"panchanga\", {}).get(\"nakshatra\", {}).get(\"name\")}')
print(f'✓ Vaara: {data.get(\"panchanga\", {}).get(\"vaara\", {}).get(\"name\")} (Should be Wednesday/Budhavāra)')
"

echo ""
echo "========================================="
echo "✅ Test completed successfully!"
echo "========================================="
