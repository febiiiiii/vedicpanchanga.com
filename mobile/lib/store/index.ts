import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Location,
  PanchangaResponse,
  UserProfile,
  AppSettings,
  CitySearchResult
} from '../api/types';
import apiClient from '../api/client';

// Default location (Ujjain, India - traditional reference point)
const DEFAULT_LOCATION: Location = {
  city: 'Ujjain',
  country: 'India',
  latitude: 23.1765,
  longitude: 75.7885,
  timezone: 'Asia/Kolkata'
};

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  language: 'en',
  notifications: true,
  chartStyle: 'north'
};

interface AppState {
  // Current state
  currentLocation: Location;
  selectedDate: Date;
  selectedTime: string;
  panchangaData: PanchangaResponse | null;
  isCalculating: boolean;
  error: string | null;

  // User data
  userProfile: UserProfile | null;
  savedLocations: Location[];
  recentSearches: CitySearchResult[];

  // Settings
  settings: AppSettings;

  // Actions
  setLocation: (location: Location) => void;
  setDateTime: (date: Date, time: string) => void;
  calculatePanchanga: () => Promise<void>;
  saveLocation: (location: Location) => void;
  removeLocation: (index: number) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateProfile: (profile: UserProfile) => void;
  reset: () => void;

  // Location actions
  getCurrentLocation: () => Promise<void>;
  searchCities: (query: string) => Promise<CitySearchResult[]>;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentLocation: DEFAULT_LOCATION,
      selectedDate: new Date(),
      selectedTime: new Date().toTimeString().slice(0, 5), // HH:MM format
      panchangaData: null,
      isCalculating: false,
      error: null,
      userProfile: null,
      savedLocations: [],
      recentSearches: [],
      settings: DEFAULT_SETTINGS,

      // Set location
      setLocation: (location) => {
        set({ currentLocation: location, error: null });
        apiClient.saveLastLocation(location);
      },

      // Set date and time
      setDateTime: (date, time) => {
        set({ selectedDate: date, selectedTime: time });
      },

      // Calculate panchanga
      calculatePanchanga: async () => {
        const { currentLocation, selectedDate, selectedTime } = get();

        set({ isCalculating: true, error: null });

        try {
          const data = await apiClient.calculatePanchanga(
            selectedDate,
            selectedTime,
            currentLocation
          );

          set({
            panchangaData: data,
            isCalculating: false,
            error: null
          });
        } catch (error) {
          set({
            isCalculating: false,
            error: error instanceof Error ? error.message : 'Failed to calculate Panchanga'
          });
        }
      },

      // Save a location to favorites
      saveLocation: (location) => {
        const { savedLocations } = get();
        // Avoid duplicates
        const exists = savedLocations.some(
          l => l.latitude === location.latitude && l.longitude === location.longitude
        );
        if (!exists) {
          set({ savedLocations: [...savedLocations, location] });
        }
      },

      // Remove a saved location
      removeLocation: (index) => {
        const { savedLocations } = get();
        set({ savedLocations: savedLocations.filter((_, i) => i !== index) });
      },

      // Update settings
      updateSettings: (newSettings) => {
        const { settings } = get();
        set({ settings: { ...settings, ...newSettings } });
      },

      // Update user profile
      updateProfile: (profile) => {
        set({ userProfile: profile });
      },

      // Reset to defaults
      reset: () => {
        set({
          currentLocation: DEFAULT_LOCATION,
          selectedDate: new Date(),
          selectedTime: new Date().toTimeString().slice(0, 5),
          panchangaData: null,
          isCalculating: false,
          error: null
        });
      },

      // Get current GPS location
      getCurrentLocation: async () => {
        try {
          // This will be implemented with expo-location
          // For now, we'll use a placeholder
          const location = await apiClient.getLastLocation();
          if (location) {
            set({ currentLocation: location });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to get location'
          });
        }
      },

      // Search cities
      searchCities: async (query: string) => {
        try {
          const results = await apiClient.searchCities(query);

          // Update recent searches (keep last 10)
          const { recentSearches } = get();
          const newSearches = results.slice(0, 3);
          const updated = [...newSearches, ...recentSearches]
            .filter((item, index, self) =>
              index === self.findIndex(t =>
                t.latitude === item.latitude && t.longitude === item.longitude
              )
            )
            .slice(0, 10);

          set({ recentSearches: updated });

          return results;
        } catch (error) {
          console.error('City search error:', error);
          return [];
        }
      }
    }),
    {
      name: 'vedic-panchanga-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Persist only these fields
        currentLocation: state.currentLocation,
        savedLocations: state.savedLocations,
        recentSearches: state.recentSearches,
        settings: state.settings,
        userProfile: state.userProfile
      })
    }
  )
);

export default useStore;