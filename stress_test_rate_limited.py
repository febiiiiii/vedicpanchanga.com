#!/usr/bin/env python3
import time
import json
import statistics
import subprocess

API_URL = "https://vedicpanchanga.com/api/v1/panchanga"
NUM_REQUESTS = 50  # Total requests
DELAY_BETWEEN_BATCHES = 1.5  # seconds between batches to avoid rate limit

PAYLOAD = {
    "date": "2025-10-09T03:56:18.787Z",
    "location": {
        "latitude": 50.01195289228083,
        "longitude": -119.400934782387,
        "timezone": "America/Vancouver",
        "city": "Kelowna",
        "country": "Canada"
    }
}

def make_request(request_id):
    """Make a single API request"""
    cmd = [
        'curl', '-s', '-w', '\\n%{http_code}\\n%{time_total}',
        '-X', 'POST',
        '-H', 'Content-Type: application/json',
        API_URL,
        '-d', json.dumps(PAYLOAD),
        '--max-time', '10'
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        lines = result.stdout.strip().split('\n')
        
        if len(lines) >= 2:
            status_code = int(lines[-2])
            latency = float(lines[-1]) * 1000  # ms
            
            # Validate response
            valid = False
            if status_code == 200:
                try:
                    response_body = '\n'.join(lines[:-2])
                    data = json.loads(response_body)
                    valid = 'panchanga' in data
                except:
                    pass
            
            return {
                'id': request_id,
                'status': status_code,
                'latency_ms': latency,
                'success': valid
            }
    except:
        pass
    
    return {
        'id': request_id,
        'status': 0,
        'latency_ms': 10000,
        'success': False
    }

print("=" * 80)
print("RATE-LIMITED STRESS TEST")
print("=" * 80)
print(f"Requests: {NUM_REQUESTS} | Delay: {DELAY_BETWEEN_BATCHES}s between batches")
print()

results = []
start_time = time.time()

for i in range(NUM_REQUESTS):
    result = make_request(i)
    results.append(result)
    
    if (i + 1) % 5 == 0:
        print(f"Progress: {i+1}/{NUM_REQUESTS} | Latest: {result['status']} {result['latency_ms']:.0f}ms")
        time.sleep(DELAY_BETWEEN_BATCHES)

total_time = time.time() - start_time

# Statistics
successful = [r for r in results if r['success']]
latencies = [r['latency_ms'] for r in successful]

print()
print("=" * 80)
print("RESULTS")
print("=" * 80)
print(f"Total:     {len(results)}")
print(f"Success:   {len(successful)} ({len(successful)/len(results)*100:.1f}%)")
print(f"Failed:    {len(results) - len(successful)}")
print(f"Time:      {total_time:.1f}s")
print(f"Rate:      {len(results)/total_time:.2f} req/s")
print()

if latencies:
    sorted_lat = sorted(latencies)
    print("LATENCY PERCENTILES:")
    print(f"  Min:  {min(latencies):.2f} ms")
    print(f"  p50:  {statistics.median(latencies):.2f} ms")
    print(f"  p95:  {sorted_lat[int(len(sorted_lat)*0.95)]:.2f} ms")
    print(f"  p99:  {sorted_lat[int(len(sorted_lat)*0.99)]:.2f} ms")
    print(f"  Max:  {max(latencies):.2f} ms")
    print(f"  Mean: {statistics.mean(latencies):.2f} ms")
print()

# Status codes
status_counts = {}
for r in results:
    status_counts[r['status']] = status_counts.get(r['status'], 0) + 1

print("STATUS CODES:")
for status in sorted(status_counts.keys()):
    print(f"  HTTP {status}: {status_counts[status]}")

