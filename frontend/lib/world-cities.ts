// Major world cities with coordinates and timezone information
export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population?: number;
  region?: string;
}

export const POPULAR_CITIES: City[] = [
  // India - Major Cities
  { name: "Mumbai", country: "India", latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata", population: 20400000 },
  { name: "Delhi", country: "India", latitude: 28.7041, longitude: 77.1025, timezone: "Asia/Kolkata", population: 32900000 },
  { name: "Bangalore", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", population: 13600000 },
  { name: "Kolkata", country: "India", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata", population: 15100000 },
  { name: "Chennai", country: "India", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata", population: 11500000 },
  { name: "Hyderabad", country: "India", latitude: 17.3850, longitude: 78.4867, timezone: "Asia/Kolkata", population: 10500000 },
  { name: "Pune", country: "India", latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata", population: 6800000 },
  { name: "Ahmedabad", country: "India", latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata", population: 8400000 },
  { name: "Varanasi", country: "India", latitude: 25.3176, longitude: 82.9739, timezone: "Asia/Kolkata", population: 1400000 },
  { name: "Ujjain", country: "India", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata", population: 600000 },

  // USA - Major Cities
  { name: "New York", country: "USA", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York", population: 8300000 },
  { name: "Los Angeles", country: "USA", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles", population: 3900000 },
  { name: "Chicago", country: "USA", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago", population: 2700000 },
  { name: "Houston", country: "USA", latitude: 29.7604, longitude: -95.3698, timezone: "America/Chicago", population: 2300000 },
  { name: "Phoenix", country: "USA", latitude: 33.4484, longitude: -112.0740, timezone: "America/Phoenix", population: 1700000 },
  { name: "San Francisco", country: "USA", latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles", population: 870000 },
  { name: "Seattle", country: "USA", latitude: 47.6062, longitude: -122.3321, timezone: "America/Los_Angeles", population: 750000 },
  { name: "Boston", country: "USA", latitude: 42.3601, longitude: -71.0589, timezone: "America/New_York", population: 690000 },
  { name: "Miami", country: "USA", latitude: 25.7617, longitude: -80.1918, timezone: "America/New_York", population: 470000 },
  { name: "Atlanta", country: "USA", latitude: 33.7490, longitude: -84.3880, timezone: "America/New_York", population: 500000 },

  // Canada
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", population: 2900000 },
  { name: "Vancouver", country: "Canada", latitude: 49.2827, longitude: -123.1207, timezone: "America/Vancouver", population: 670000 },
  { name: "Montreal", country: "Canada", latitude: 45.5017, longitude: -73.5673, timezone: "America/Montreal", population: 1800000 },
  { name: "Calgary", country: "Canada", latitude: 51.0447, longitude: -114.0719, timezone: "America/Edmonton", population: 1400000 },
  { name: "Edmonton", country: "Canada", latitude: 53.5461, longitude: -113.4938, timezone: "America/Edmonton", population: 1000000 },

  // UK
  { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", population: 9000000 },
  { name: "Manchester", country: "UK", latitude: 53.4808, longitude: -2.2426, timezone: "Europe/London", population: 550000 },
  { name: "Birmingham", country: "UK", latitude: 52.4862, longitude: -1.8904, timezone: "Europe/London", population: 1100000 },
  { name: "Edinburgh", country: "UK", latitude: 55.9533, longitude: -3.1883, timezone: "Europe/London", population: 540000 },

  // Europe
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", population: 2200000 },
  { name: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050, timezone: "Europe/Berlin", population: 3700000 },
  { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome", population: 2900000 },
  { name: "Madrid", country: "Spain", latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid", population: 3300000 },
  { name: "Amsterdam", country: "Netherlands", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam", population: 870000 },
  { name: "Vienna", country: "Austria", latitude: 48.2082, longitude: 16.3738, timezone: "Europe/Vienna", population: 1900000 },
  { name: "Prague", country: "Czech Republic", latitude: 50.0755, longitude: 14.4378, timezone: "Europe/Prague", population: 1300000 },
  { name: "Zurich", country: "Switzerland", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich", population: 430000 },

  // Middle East
  { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", population: 3400000 },
  { name: "Tel Aviv", country: "Israel", latitude: 32.0853, longitude: 34.7818, timezone: "Asia/Jerusalem", population: 460000 },
  { name: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784, timezone: "Europe/Istanbul", population: 15600000 },
  { name: "Riyadh", country: "Saudi Arabia", latitude: 24.7136, longitude: 46.6753, timezone: "Asia/Riyadh", population: 7600000 },

  // Asia Pacific
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", population: 5700000 },
  { name: "Hong Kong", country: "China", latitude: 22.3193, longitude: 114.1694, timezone: "Asia/Hong_Kong", population: 7500000 },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", population: 14000000 },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", population: 5400000 },
  { name: "Melbourne", country: "Australia", latitude: -37.8136, longitude: 144.9631, timezone: "Australia/Melbourne", population: 5100000 },
  { name: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018, timezone: "Asia/Bangkok", population: 10700000 },
  { name: "Kuala Lumpur", country: "Malaysia", latitude: 3.1390, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur", population: 1900000 },
  { name: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", population: 10700000 },

  // Nepal & Sri Lanka
  { name: "Kathmandu", country: "Nepal", latitude: 27.7172, longitude: 85.3240, timezone: "Asia/Kathmandu", population: 1400000 },
  { name: "Colombo", country: "Sri Lanka", latitude: 6.9271, longitude: 79.8612, timezone: "Asia/Colombo", population: 750000 },

  // South America
  { name: "São Paulo", country: "Brazil", latitude: -23.5505, longitude: -46.6333, timezone: "America/Sao_Paulo", population: 12300000 },
  { name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires", population: 3100000 },
  { name: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City", population: 9200000 },

  // Africa
  { name: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo", population: 10000000 },
  { name: "Lagos", country: "Nigeria", latitude: 6.5244, longitude: 3.3792, timezone: "Africa/Lagos", population: 14900000 },
  { name: "Johannesburg", country: "South Africa", latitude: -26.2041, longitude: 28.0473, timezone: "Africa/Johannesburg", population: 5700000 },
];

// Group cities by country for easy selection
export const CITIES_BY_COUNTRY = POPULAR_CITIES.reduce((acc, city) => {
  if (!acc[city.country]) {
    acc[city.country] = [];
  }
  acc[city.country].push(city);
  return acc;
}, {} as Record<string, City[]>);

// Search function for cities
export function searchCities(query: string): City[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  // First, try exact matches
  const exactMatches = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase() === normalizedQuery
  );

  if (exactMatches.length > 0) return exactMatches;

  // Then, try prefix matches
  const prefixMatches = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().startsWith(normalizedQuery)
  );

  if (prefixMatches.length > 0) {
    return prefixMatches.sort((a, b) => (b.population || 0) - (a.population || 0));
  }

  // Finally, try contains matches
  const containsMatches = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(normalizedQuery) ||
    city.country.toLowerCase().includes(normalizedQuery)
  );

  return containsMatches.sort((a, b) => (b.population || 0) - (a.population || 0)).slice(0, 10);
}

// Get popular cities for quick selection
export function getPopularCities(): City[] {
  return [
    POPULAR_CITIES.find(c => c.name === "Delhi")!,
    POPULAR_CITIES.find(c => c.name === "Mumbai")!,
    POPULAR_CITIES.find(c => c.name === "Bangalore")!,
    POPULAR_CITIES.find(c => c.name === "New York")!,
    POPULAR_CITIES.find(c => c.name === "London")!,
    POPULAR_CITIES.find(c => c.name === "Tokyo")!,
    POPULAR_CITIES.find(c => c.name === "Dubai")!,
    POPULAR_CITIES.find(c => c.name === "Singapore")!,
  ].filter(Boolean);
}