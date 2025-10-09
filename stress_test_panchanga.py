#!/usr/bin/env python3
import time
import json
import statistics
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
import subprocess

# Test configuration
API_URL = "https://vedicpanchanga.com/api/v1/panchanga"
NUM_REQUESTS = 100  # Total requests
CONCURRENCY = 10    # Concurrent requests

# Test payload
PAYLOAD = {
    "date": "2025-10-09T03:56:18.787Z",
    "location": {
        "latitude": 50.01195289228083,
        "longitude": -119.400934782387,
        "timezone": "America/Vancouver",
        "city": "East Central Okanagan Electoral Area",
        "country": "Canada"
    }
}

def make_request(request_id):
    """Make a single API request and measure latency"""
    start_time = time.time()
    try:
        cmd = [
            'curl', '-s', '-w', '\\n%{http_code}\\n%{time_total}',
            '-X', 'POST',
            '-H', 'Content-Type: application/json',
            '-H', 'Accept: */*',
            API_URL,
            '-d', json.dumps(PAYLOAD),
            '--max-time', '30'
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=35)
        lines = result.stdout.strip().split('\n')
        
        if len(lines) >= 2:
            status_code = lines[-2]
            curl_time = float(lines[-1])
            
            # Validate response
            try:
                response_body = '\n'.join(lines[:-2])
                data = json.loads(response_body)
                has_panchanga = 'panchanga' in data
            except:
                has_panchanga = False
            
            return {
                'id': request_id,
                'status_code': int(status_code),
                'latency_ms': curl_time * 1000,
                'success': int(status_code) == 200 and has_panchanga,
                'error': None
            }
        else:
            return {
                'id': request_id,
                'status_code': 0,
                'latency_ms': (time.time() - start_time) * 1000,
                'success': False,
                'error': 'Invalid response format'
            }
            
    except subprocess.TimeoutExpired:
        return {
            'id': request_id,
            'status_code': 0,
            'latency_ms': 30000,
            'success': False,
            'error': 'Timeout'
        }
    except Exception as e:
        return {
            'id': request_id,
            'status_code': 0,
            'latency_ms': (time.time() - start_time) * 1000,
            'success': False,
            'error': str(e)
        }

def run_stress_test():
    """Run the stress test with concurrent requests"""
    print("=" * 100)
    print("PANCHANGA API STRESS TEST")
    print("=" * 100)
    print()
    print(f"Target:       {API_URL}")
    print(f"Requests:     {NUM_REQUESTS}")
    print(f"Concurrency:  {CONCURRENCY}")
    print()
    print("Starting test...")
    print()
    
    results = []
    start_time = time.time()
    
    # Run concurrent requests
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
        futures = [executor.submit(make_request, i) for i in range(NUM_REQUESTS)]
        
        completed = 0
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
            completed += 1
            
            # Progress indicator
            if completed % 10 == 0:
                print(f"Completed: {completed}/{NUM_REQUESTS} requests", end='\r')
    
    total_time = time.time() - start_time
    print(f"Completed: {NUM_REQUESTS}/{NUM_REQUESTS} requests")
    print()
    
    # Calculate statistics
    successful = [r for r in results if r['success']]
    failed = [r for r in results if not r['success']]
    latencies = [r['latency_ms'] for r in successful]
    
    print("=" * 100)
    print("TEST RESULTS")
    print("=" * 100)
    print()
    
    print(f"Total Requests:    {NUM_REQUESTS}")
    print(f"Successful:        {len(successful)} ({len(successful)/NUM_REQUESTS*100:.1f}%)")
    print(f"Failed:            {len(failed)} ({len(failed)/NUM_REQUESTS*100:.1f}%)")
    print(f"Total Time:        {total_time:.2f}s")
    print(f"Requests/sec:      {NUM_REQUESTS/total_time:.2f}")
    print()
    
    if latencies:
        sorted_latencies = sorted(latencies)
        
        print("=" * 100)
        print("LATENCY PERCENTILES (ms)")
        print("=" * 100)
        print()
        
        percentiles = {
            'Min': min(latencies),
            'p50 (Median)': statistics.median(latencies),
            'p75': sorted_latencies[int(len(sorted_latencies) * 0.75)],
            'p90': sorted_latencies[int(len(sorted_latencies) * 0.90)],
            'p95': sorted_latencies[int(len(sorted_latencies) * 0.95)],
            'p99': sorted_latencies[int(len(sorted_latencies) * 0.99)],
            'Max': max(latencies),
            'Mean': statistics.mean(latencies),
            'StdDev': statistics.stdev(latencies) if len(latencies) > 1 else 0
        }
        
        for label, value in percentiles.items():
            print(f"{label:<15} {value:>10.2f} ms")
    
    print()
    
    if failed:
        print("=" * 100)
        print("ERRORS")
        print("=" * 100)
        print()
        error_counts = {}
        for r in failed:
            error = r['error'] or f"HTTP {r['status_code']}"
            error_counts[error] = error_counts.get(error, 0) + 1
        
        for error, count in error_counts.items():
            print(f"{error}: {count} occurrences")
        print()
    
    # Status codes
    status_counts = {}
    for r in results:
        status_counts[r['status_code']] = status_counts.get(r['status_code'], 0) + 1
    
    print("=" * 100)
    print("HTTP STATUS CODES")
    print("=" * 100)
    print()
    for status, count in sorted(status_counts.items()):
        status_text = "Success" if status == 200 else "Error"
        print(f"HTTP {status} ({status_text}): {count} requests")
    print()

if __name__ == "__main__":
    run_stress_test()
