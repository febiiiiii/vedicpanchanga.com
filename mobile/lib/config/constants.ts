/**
 * Application Constants and Configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8121',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 300000, // 5 minutes
};

// App Information
export const APP_INFO = {
  NAME: 'Vedic Panchanga',
  VERSION: '1.0.0',
  BUNDLE_ID_IOS: 'com.vedicpanchanga.app',
  BUNDLE_ID_ANDROID: 'com.vedicpanchanga.app',
  SUPPORT_EMAIL: 'support@vedicpanchanga.com',
  WEBSITE: 'https://vedicpanchanga.com',
  PRIVACY_POLICY: 'https://vedicpanchanga.com/privacy',
  TERMS_OF_SERVICE: 'https://vedicpanchanga.com/terms',
};

// Theme Colors
export const COLORS = {
  primary: '#ff6b35',
  secondary: '#4ecdc4',
  tertiary: '#6a4c93',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',

  // Muhurta colors
  abhijit: '#4caf50',
  rahuKala: '#f44336',
  yamaGanda: '#ff9800',
  gulikaKala: '#9c27b0',

  // Sun/Moon colors
  sunrise: '#ffa500',
  sunset: '#ff6b35',
  moonrise: '#b0c4de',
  moonset: '#708090',
};

// Storage Keys
export const STORAGE_KEYS = {
  LOCATION: '@vedicpanchanga/location',
  SAVED_LOCATIONS: '@vedicpanchanga/saved_locations',
  RECENT_SEARCHES: '@vedicpanchanga/recent_searches',
  THEME: '@vedicpanchanga/theme',
  LANGUAGE: '@vedicpanchanga/language',
  PREFERENCES: '@vedicpanchanga/preferences',
  LAST_CALCULATION: '@vedicpanchanga/last_calculation',
};

// Animation Durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Debounce Delays
export const DEBOUNCE = {
  SEARCH: 300,
  INPUT: 500,
  SCROLL: 100,
};

// Cache Durations (in milliseconds)
export const CACHE = {
  CITY_SEARCH: 1800000, // 30 minutes
  PANCHANGA: 300000, // 5 minutes
  TIMEZONE: 86400000, // 24 hours
};

// Popular Cities for Quick Selection
export const POPULAR_CITIES = [
  {
    city: 'Ujjain',
    country: 'India',
    latitude: 23.1765,
    longitude: 75.7885,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'New Delhi',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.209,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'Mumbai',
    country: 'India',
    latitude: 19.076,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'Bengaluru',
    country: 'India',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'Chennai',
    country: 'India',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
  },
  {
    city: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
  },
  {
    city: 'Los Angeles',
    country: 'United States',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: 'America/Los_Angeles',
  },
];

// Tab Names for Analytics
export const TAB_NAMES = {
  PANCHANGA: 'panchanga',
  PLANETS: 'planets',
  CHART: 'chart',
  MUHURTA: 'muhurta',
};

// Feature Names for Analytics
export const FEATURES = {
  CALCULATE_PANCHANGA: 'calculate_panchanga',
  VIEW_PLANETS: 'view_planets',
  VIEW_CHART: 'view_chart',
  VIEW_MUHURTA: 'view_muhurta',
  SEARCH_CITY: 'search_city',
  USE_CURRENT_LOCATION: 'use_current_location',
  SAVE_LOCATION: 'save_location',
  CHANGE_DATE: 'change_date',
  CHANGE_TIME: 'change_time',
  SET_TO_NOW: 'set_to_now',
  SHARE_PANCHANGA: 'share_panchanga',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error. Please try again later.',
  LOCATION_PERMISSION: 'Location permission denied.',
  LOCATION_UNAVAILABLE: 'Unable to get current location.',
  CALCULATION_FAILED: 'Failed to calculate Panchanga.',
  INVALID_DATE: 'Please select a valid date.',
  INVALID_LOCATION: 'Please select a valid location.',
  GENERIC: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOCATION_SAVED: 'Location saved successfully.',
  CALCULATION_COMPLETE: 'Panchanga calculated successfully.',
  SHARED: 'Shared successfully.',
};

// Limits and Constraints
export const LIMITS = {
  MAX_SAVED_LOCATIONS: 10,
  MAX_RECENT_SEARCHES: 20,
  MIN_SEARCH_LENGTH: 2,
  MAX_CACHE_SIZE: 50, // MB
};

// Date Constraints
export const DATE_CONSTRAINTS = {
  MIN_YEAR: 1900,
  MAX_YEAR: 2100,
  DEFAULT_TIME: '06:00',
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  // App Lifecycle
  APP_OPEN: 'app_open',
  APP_BACKGROUND: 'app_background',
  APP_FOREGROUND: 'app_foreground',

  // User Actions
  PANCHANGA_CALCULATED: 'panchanga_calculated',
  LOCATION_CHANGED: 'location_changed',
  DATE_CHANGED: 'date_changed',
  TIME_CHANGED: 'time_changed',
  TAB_CHANGED: 'tab_changed',
  FEATURE_USED: 'feature_used',

  // Errors
  ERROR_OCCURRED: 'error_occurred',
  CALCULATION_FAILED: 'calculation_failed',

  // Sharing
  CONTENT_SHARED: 'content_shared',
};

// Platform specific
export const PLATFORM = {
  IS_IOS: process.platform === 'ios',
  IS_ANDROID: process.platform === 'android',
  IS_WEB: process.platform === 'web',
};