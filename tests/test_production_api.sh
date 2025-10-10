#!/bin/bash

# Comprehensive Production API Testing for Panchanga
# Tests https://vedicpanchanga.com/ with multiple timezones

API_URL="https://vedicpanchanga.com/api/v1/panchanga"
OUTPUT_FILE="/tmp/panchanga_production_test_$(date +%Y%m%d_%H%M%S).log"

echo "======================================================================" | tee -a "$OUTPUT_FILE"
echo "PRODUCTION API TESTING - vedicpanchanga.com" | tee -a "$OUTPUT_FILE"
echo "======================================================================" | tee -a "$OUTPUT_FILE"
echo "Test Started: $(date)" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

test_location() {
    local name="$1"
    local lat="$2"
    local lon="$3"
    local tz_name="$4"
    local year="$5"
    local month="$6"
    local day="$7"
    local hour="$8"
    local minute="$9"

    echo "" | tee -a "$OUTPUT_FILE"
    echo "======================================================================" | tee -a "$OUTPUT_FILE"
    echo "Testing: $name" | tee -a "$OUTPUT_FILE"
    echo "======================================================================" | tee -a "$OUTPUT_FILE"
    echo "Location: $lat°, $lon°" | tee -a "$OUTPUT_FILE"
    echo "Timezone: $tz_name" | tee -a "$OUTPUT_FILE"
    echo "DateTime: $year-$month-$day $hour:$minute" | tee -a "$OUTPUT_FILE"
    echo "" | tee -a "$OUTPUT_FILE"

    # Create JSON payload - we need to calculate timezone offset and convert to local time
    # For now, using a simplified approach with the ISO date string
    local iso_date="${year}-$(printf '%02d' $month)-$(printf '%02d' $day)T$(printf '%02d' $hour):$(printf '%02d' $minute):00.000Z"

    payload=$(cat <<EOF
{
  "date": "$iso_date",
  "location": {
    "latitude": $lat,
    "longitude": $lon,
    "timezone": "$tz_name",
    "city": "$name"
  }
}
EOF
)

    echo "Request Payload:" | tee -a "$OUTPUT_FILE"
    echo "$payload" | tee -a "$OUTPUT_FILE"
    echo "" | tee -a "$OUTPUT_FILE"

    # Make API call
    response=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$payload" \
        --max-time 30)

    if [ $? -eq 0 ]; then
        echo "Response:" | tee -a "$OUTPUT_FILE"
        echo "$response" | jq '.' 2>/dev/null | tee -a "$OUTPUT_FILE" || echo "$response" | tee -a "$OUTPUT_FILE"
        echo "" | tee -a "$OUTPUT_FILE"

        # Extract key information
        echo "──────────────────────────────────────────────────────────────────" | tee -a "$OUTPUT_FILE"
        echo "SUMMARY:" | tee -a "$OUTPUT_FILE"
        echo "──────────────────────────────────────────────────────────────────" | tee -a "$OUTPUT_FILE"

        # Parse with jq if available
        if command -v jq &> /dev/null; then
            echo "Tithi: $(echo "$response" | jq -r '.panchanga.tithi.name // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Nakshatra: $(echo "$response" | jq -r '.panchanga.nakshatra.name // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Yoga: $(echo "$response" | jq -r '.panchanga.yoga.name // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Karana: $(echo "$response" | jq -r '.panchanga.karana.name // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Vaara: $(echo "$response" | jq -r '.panchanga.vaara.name // "N/A"') (Lord: $(echo "$response" | jq -r '.panchanga.vaara.lord // "N/A"'))" | tee -a "$OUTPUT_FILE"
            echo "" | tee -a "$OUTPUT_FILE"
            echo "Sunrise: $(echo "$response" | jq -r '.sun.rise // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Sunset: $(echo "$response" | jq -r '.sun.set // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Moonrise: $(echo "$response" | jq -r '.moon.rise // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Moonset: $(echo "$response" | jq -r '.moon.set // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "" | tee -a "$OUTPUT_FILE"
            echo "Rahu Kala: $(echo "$response" | jq -r '.muhurta.rahuKala.start // "N/A"') - $(echo "$response" | jq -r '.muhurta.rahuKala.end // "N/A"')" | tee -a "$OUTPUT_FILE"
            echo "Abhijit Muhurta: $(echo "$response" | jq -r '.muhurta.abhijit.start // "N/A"') - $(echo "$response" | jq -r '.muhurta.abhijit.end // "N/A"')" | tee -a "$OUTPUT_FILE"
        fi
    else
        echo "ERROR: API request failed" | tee -a "$OUTPUT_FILE"
    fi

    echo "" | tee -a "$OUTPUT_FILE"
}

# Test current date/time (October 8, 2025, 14:26 local time in each timezone)
YEAR=2025
MONTH=10
DAY=8
HOUR=14
MINUTE=26

echo "Testing with date: October 8, 2025, 2:26 PM (local time)" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

# Test each location
test_location "Tokyo, Japan" 35.6762 139.6503 "Asia/Tokyo" $YEAR $MONTH $DAY $HOUR $MINUTE
test_location "Kolkata, India" 22.5726 88.3639 "Asia/Kolkata" $YEAR $MONTH $DAY $HOUR $MINUTE
test_location "Kathmandu, Nepal" 27.7172 85.3240 "Asia/Kathmandu" $YEAR $MONTH $DAY $HOUR $MINUTE
test_location "Dubai, UAE" 25.2048 55.2708 "Asia/Dubai" $YEAR $MONTH $DAY $HOUR $MINUTE
test_location "Vancouver, Canada" 49.2827 -123.1207 "America/Vancouver" $YEAR $MONTH $DAY $HOUR $MINUTE

echo "" | tee -a "$OUTPUT_FILE"
echo "======================================================================" | tee -a "$OUTPUT_FILE"

# Quick test with the exact request from the user
echo "Quick Test: New York with UTC timestamp" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------------------------------------" | tee -a "$OUTPUT_FILE"
curl -s 'https://vedicpanchanga.com/api/v1/panchanga' \
  -H 'Content-Type: application/json' \
  -d '{"date":"2025-10-08T22:02:43.308Z","location":{"latitude":40.7128,"longitude":-74.006,"timezone":"America/New_York","city":"New York","country":"USA"}}' \
  | jq -r '"Sunrise: \(.sun.rise), Sunset: \(.sun.set), Tithi: \(.panchanga.tithi.name), Vaara: \(.panchanga.vaara.name)"' | tee -a "$OUTPUT_FILE"

echo "" | tee -a "$OUTPUT_FILE"
echo "======================================================================" | tee -a "$OUTPUT_FILE"
echo "TEST COMPLETE" | tee -a "$OUTPUT_FILE"
echo "======================================================================" | tee -a "$OUTPUT_FILE"
echo "Test Completed: $(date)" | tee -a "$OUTPUT_FILE"
echo "Results saved to: $OUTPUT_FILE" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"
