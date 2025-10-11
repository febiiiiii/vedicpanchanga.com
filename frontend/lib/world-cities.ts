// Major world cities with coordinates and timezone information
export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  region?: string;
}

export const POPULAR_CITIES: City[] = [
  // India - Major Cities
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Delhi", country: "India", latitude: 28.7041, longitude: 77.1025, timezone: "Asia/Kolkata" },
  { name: "Bangalore", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata" },
  { name: "Kolkata", country: "India", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata" },
  { name: "Chennai", country: "India", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata" },
  { name: "Hyderabad", country: "India", latitude: 17.3850, longitude: 78.4867, timezone: "Asia/Kolkata" },
  { name: "Pune", country: "India", latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad", country: "India", latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata" },
  { name: "Varanasi", country: "India", latitude: 25.3176, longitude: 82.9739, timezone: "Asia/Kolkata" },
  { name: "Ujjain", country: "India", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata" },

  // USA - Major Cities
  { name: "New York", country: "USA", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York" },
  { name: "Los Angeles", country: "USA", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles" },
  { name: "Chicago", country: "USA", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago" },
  { name: "Houston", country: "USA", latitude: 29.7604, longitude: -95.3698, timezone: "America/Chicago" },
  { name: "Phoenix", country: "USA", latitude: 33.4484, longitude: -112.0740, timezone: "America/Phoenix" },
  { name: "San Francisco", country: "USA", latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles" },
  { name: "Seattle", country: "USA", latitude: 47.6062, longitude: -122.3321, timezone: "America/Los_Angeles" },
  { name: "Boston", country: "USA", latitude: 42.3601, longitude: -71.0589, timezone: "America/New_York" },
  { name: "Miami", country: "USA", latitude: 25.7617, longitude: -80.1918, timezone: "America/New_York" },
  { name: "Atlanta", country: "USA", latitude: 33.7490, longitude: -84.3880, timezone: "America/New_York" },

  // Canada
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto" },
  { name: "Vancouver", country: "Canada", latitude: 49.2827, longitude: -123.1207, timezone: "America/Vancouver" },
  { name: "Montreal", country: "Canada", latitude: 45.5017, longitude: -73.5673, timezone: "America/Montreal" },
  { name: "Calgary", country: "Canada", latitude: 51.0447, longitude: -114.0719, timezone: "America/Edmonton" },
  { name: "Edmonton", country: "Canada", latitude: 53.5461, longitude: -113.4938, timezone: "America/Edmonton" },

  // UK
  { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London" },
  { name: "Manchester", country: "UK", latitude: 53.4808, longitude: -2.2426, timezone: "Europe/London" },
  { name: "Birmingham", country: "UK", latitude: 52.4862, longitude: -1.8904, timezone: "Europe/London" },
  { name: "Edinburgh", country: "UK", latitude: 55.9533, longitude: -3.1883, timezone: "Europe/London" },

  // Europe
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris" },
  { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050, timezone: "Europe/Berlin" },
  { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome" },
  { name: "Madrid", country: "Spain", latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid" },
  { name: "Amsterdam", country: "Netherlands", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam" },
  { name: "Vienna", country: "Austria", latitude: 48.2082, longitude: 16.3738, timezone: "Europe/Vienna" },
  { name: "Prague", country: "Czech Republic", latitude: 50.0755, longitude: 14.4378, timezone: "Europe/Prague" },
  { name: "Zurich", country: "Switzerland", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich" },
  { name: "Helsinki", country: "Finland", latitude: 60.1699, longitude: 24.9384, timezone: "Europe/Helsinki" },
  { name: "Espoo", country: "Finland", latitude: 60.2055, longitude: 24.6559, timezone: "Europe/Helsinki" },
  { name: "Tampere", country: "Finland", latitude: 61.4978, longitude: 23.7610, timezone: "Europe/Helsinki" },
  { name: "Vantaa", country: "Finland", latitude: 60.2934, longitude: 25.0378, timezone: "Europe/Helsinki" },
  { name: "Oulu", country: "Finland", latitude: 65.0121, longitude: 25.4651, timezone: "Europe/Helsinki" },
  { name: "Turku", country: "Finland", latitude: 60.4518, longitude: 22.2666, timezone: "Europe/Helsinki" },
  { name: "Moscow", country: "Russia", latitude: 55.7558, longitude: 37.6173, timezone: "Europe/Moscow" },
  { name: "Saint Petersburg", country: "Russia", latitude: 59.9343, longitude: 30.3351, timezone: "Europe/Moscow" },
  { name: "Novosibirsk", country: "Russia", latitude: 55.0084, longitude: 82.9357, timezone: "Asia/Novosibirsk" },
  { name: "Yekaterinburg", country: "Russia", latitude: 56.8389, longitude: 60.6057, timezone: "Asia/Yekaterinburg" },
  { name: "Kazan", country: "Russia", latitude: 55.8304, longitude: 49.0661, timezone: "Europe/Moscow" },
  { name: "Nizhny Novgorod", country: "Russia", latitude: 56.2965, longitude: 43.9361, timezone: "Europe/Moscow" },

  // Middle East
  { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai" },
  { name: "Tel Aviv", country: "Israel", latitude: 32.0853, longitude: 34.7818, timezone: "Asia/Jerusalem" },
  { name: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784, timezone: "Europe/Istanbul" },
  { name: "Riyadh", country: "Saudi Arabia", latitude: 24.7136, longitude: 46.6753, timezone: "Asia/Riyadh" },

  // Asia Pacific
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore" },
  { name: "Hong Kong", country: "China", latitude: 22.3193, longitude: 114.1694, timezone: "Asia/Hong_Kong" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", latitude: -37.8136, longitude: 144.9631, timezone: "Australia/Melbourne" },
  { name: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018, timezone: "Asia/Bangkok" },
  { name: "Kuala Lumpur", country: "Malaysia", latitude: 3.1390, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur" },
  { name: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta" },

  // Nepal & Sri Lanka
  { name: "Kathmandu", country: "Nepal", latitude: 27.7172, longitude: 85.3240, timezone: "Asia/Kathmandu" },
  { name: "Colombo", country: "Sri Lanka", latitude: 6.9271, longitude: 79.8612, timezone: "Asia/Colombo" },

  // South America
  { name: "São Paulo", country: "Brazil", latitude: -23.5505, longitude: -46.6333, timezone: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
  { name: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City" },

  // Africa
  { name: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo" },
  { name: "Lagos", country: "Nigeria", latitude: 6.5244, longitude: 3.3792, timezone: "Africa/Lagos" },
  { name: "Johannesburg", country: "South Africa", latitude: -26.2041, longitude: 28.0473, timezone: "Africa/Johannesburg" },
];

// Search cities locally
export function searchCities(query: string): City[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  // Search for matches in POPULAR_CITIES
  return POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(normalizedQuery) ||
    city.country.toLowerCase().includes(normalizedQuery)
  ).slice(0, 10);
}

// Get popular cities for quick selection
export function getPopularCities(): City[] {
  return [
    POPULAR_CITIES.find(c => c.name === "Delhi")!,
    POPULAR_CITIES.find(c => c.name === "New York")!,
    POPULAR_CITIES.find(c => c.name === "London")!,
    POPULAR_CITIES.find(c => c.name === "Tokyo")!,
    POPULAR_CITIES.find(c => c.name === "Dubai")!,
    POPULAR_CITIES.find(c => c.name === "Singapore")!,
  ].filter(Boolean);
}