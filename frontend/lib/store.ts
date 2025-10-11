import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location, UserProfile, Panchanga } from './types';

interface AppState {
  // User data
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;

  // Current location
  currentLocation: Location | null;
  setCurrentLocation: (location: Location) => void;

  // Selected date
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;

  // Panchanga data
  panchangaData: Panchanga | null;
  setPanchangaData: (data: Panchanga) => void;

  // UI preferences
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  chartStyle: 'north' | 'south' | 'east';
  setChartStyle: (style: 'north' | 'south' | 'east') => void;

  language: 'en' | 'sa' | 'hi';
  setLanguage: (lang: 'en' | 'sa' | 'hi') => void;

  // Saved profiles
  savedProfiles: UserProfile[];
  addSavedProfile: (profile: UserProfile) => void;
  removeSavedProfile: (name: string) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User data
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),

      // Current location - Default to Ujjain (spiritual city of India)
      currentLocation: {
        latitude: 23.1765,
        longitude: 75.7885,
        timezone: 'Asia/Kolkata',
        city: 'Ujjain',
        country: 'India'
      },
      setCurrentLocation: (location) => set({ currentLocation: location }),

      // Selected date
      selectedDate: new Date(),
      setSelectedDate: (date) => set({ selectedDate: date }),

      // Panchanga data
      panchangaData: null,
      setPanchangaData: (data) => set({ panchangaData: data }),

      // UI preferences
      theme: 'light',
      setTheme: (theme) => set({ theme }),

      chartStyle: 'north',
      setChartStyle: (style) => set({ chartStyle: style }),

      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Saved profiles
      savedProfiles: [],
      addSavedProfile: (profile) =>
        set((state) => ({
          savedProfiles: [...state.savedProfiles, profile]
        })),
      removeSavedProfile: (name) =>
        set((state) => ({
          savedProfiles: state.savedProfiles.filter(p => p.name !== name)
        }))
    }),
    {
      name: 'vedic-panchanga-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        currentLocation: state.currentLocation,
        theme: state.theme,
        chartStyle: state.chartStyle,
        language: state.language,
        savedProfiles: state.savedProfiles
      })
    }
  )
);

export default useAppStore;