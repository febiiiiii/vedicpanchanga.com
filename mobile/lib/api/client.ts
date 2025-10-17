import axios, { AxiosInstance, AxiosError } from 'axios';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanchangaResponse, CitySearchResult, Location } from './types';

// Get API URL from environment or use default
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.vedicpanchanga.com' // Replace with your production URL
    : Platform.select({
        ios: 'http://localhost:8121',
        android: 'http://10.0.2.2:8121', // Android emulator - replace with your machine's IP for physical device
        default: 'http://localhost:8121'
      }));

// Cache keys
const CACHE_KEYS = {
  PANCHANGA: 'panchanga_cache_',
  CITIES: 'cities_cache_',
  LAST_LOCATION: 'last_location'
};

// Cache duration (in milliseconds)
const CACHE_DURATION = {
  PANCHANGA: 24 * 60 * 60 * 1000, // 24 hours
  CITIES: 7 * 24 * 60 * 60 * 1000, // 7 days
};

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any auth headers here if needed
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} from ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError) {
    let message = 'An error occurred';

    if (error.response) {
      // Server responded with error
      message = `Server Error: ${error.response.status}`;
      if (error.response.data && typeof error.response.data === 'object' && 'detail' in error.response.data) {
        message = (error.response.data as any).detail;
      }
    } else if (error.request) {
      // Request made but no response
      message = 'Network error. Please check your connection.';
    } else {
      // Error in request setup
      message = error.message;
    }

    console.error('API Error:', message);

    // Show user-friendly error
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Alert.alert('Error', message);
    }
  }

  // Generate cache key for panchanga
  private getPanchangaCacheKey(date: Date, location: Location): string {
    const dateStr = date.toISOString().split('T')[0];
    return `${CACHE_KEYS.PANCHANGA}${dateStr}_${location.latitude}_${location.longitude}`;
  }

  // Get cached data
  private async getCache<T>(key: string, maxAge: number): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < maxAge) {
          console.log(`Cache hit for ${key}`);
          return data;
        }
      }
    } catch (error) {
      console.error('Cache read error:', error);
    }
    return null;
  }

  // Set cache data
  private async setCache(key: string, data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      console.log(`Cache set for ${key}`);
    } catch (error) {
      console.error('Cache write error:', error);
    }
  }

  // Calculate Panchanga
  async calculatePanchanga(
    date: Date,
    time: string,
    location: Location
  ): Promise<PanchangaResponse> {
    // Check cache first
    const cacheKey = this.getPanchangaCacheKey(date, location);
    const cached = await this.getCache<PanchangaResponse>(cacheKey, CACHE_DURATION.PANCHANGA);
    if (cached) {
      return cached;
    }

    // Parse time
    const [hours, minutes] = time.split(':').map(Number);

    // Prepare request data matching backend API structure
    const requestData = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript months are 0-indexed
        day: date.getDate(),
        hour: hours || 0,
        minute: minutes || 0,
        second: 0
      },
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
        city: location.city,
        country: location.country
      }
    };

    try {
      // Make parallel requests for better performance
      const [panchangaRes, planetaryRes, dashaRes] = await Promise.all([
        this.client.post('/panchanga', requestData),
        this.client.post('/planetary-positions', requestData),
        this.client.post('/vimsottari-dasha', requestData)
      ]);

      const response: PanchangaResponse = {
        panchanga: panchangaRes.data,
        planetary_positions: planetaryRes.data,
        birth_chart: panchangaRes.data.birth_chart,
        dasha: dashaRes.data
      };

      // Cache the response
      await this.setCache(cacheKey, response);

      return response;
    } catch (error) {
      console.error('Panchanga calculation error:', error);
      throw error;
    }
  }

  // Search cities
  async searchCities(query: string): Promise<CitySearchResult[]> {
    if (query.length < 2) {
      return [];
    }

    // Check cache
    const cacheKey = `${CACHE_KEYS.CITIES}${query.toLowerCase()}`;
    const cached = await this.getCache<CitySearchResult[]>(cacheKey, CACHE_DURATION.CITIES);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.client.post('/cities/search', { city_name: query });
      const results = response.data;

      // Cache the results
      await this.setCache(cacheKey, results);

      return results;
    } catch (error) {
      console.error('City search error:', error);
      return [];
    }
  }

  // Get timezone for location using external API
  async getTimezone(lat: number, lon: number): Promise<string> {
    try {
      const response = await axios.get(
        `https://timeapi.io/api/timezone/coordinate?latitude=${lat}&longitude=${lon}`
      );
      return response.data.timeZone || 'UTC';
    } catch (error) {
      console.error('Timezone fetch error:', error);
      // Fallback to UTC if timezone API fails
      return 'UTC';
    }
  }

  // Save last used location
  async saveLastLocation(location: Location): Promise<void> {
    try {
      await AsyncStorage.setItem(CACHE_KEYS.LAST_LOCATION, JSON.stringify(location));
    } catch (error) {
      console.error('Error saving location:', error);
    }
  }

  // Get last used location
  async getLastLocation(): Promise<Location | null> {
    try {
      const saved = await AsyncStorage.getItem(CACHE_KEYS.LAST_LOCATION);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error getting last location:', error);
      return null;
    }
  }

  // Clear all cache
  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key =>
        key.startsWith(CACHE_KEYS.PANCHANGA) ||
        key.startsWith(CACHE_KEYS.CITIES)
      );
      await AsyncStorage.multiRemove(cacheKeys);
      console.log('Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

// Export singleton instance
export default new ApiClient();