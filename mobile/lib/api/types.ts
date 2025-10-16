// Types for Vedic Panchanga Mobile Application
// Ported from frontend/lib/types.ts

export interface Location {
  latitude: number;
  longitude: number;
  timezone: string;
  city: string;
  country?: string;
}

export interface DateTime {
  date: Date;
  time: string;
}

export interface Tithi {
  name: string;
  index: number;
  paksha: 'Shukla' | 'Krishna'; // Bright or Dark fortnight
  endTime: string;
  percentage: number;
}

export interface Nakshatra {
  name: string;
  index: number;
  pada: number; // Quarter (1-4)
  endTime: string;
  lord: string; // Ruling planet
  percentage: number;
}

export interface Yoga {
  name: string;
  index: number;
  endTime: string;
}

export interface Karana {
  name: string;
  index: number;
  endTime: string;
}

export interface Vaara {
  name: string;
  index: number; // 0-6 for Sunday to Saturday
  lord: string;
}

export interface RashiPosition {
  rashi: string; // Zodiac sign
  degree: number;
  minute: number;
  second: number;
  nakshatra: string;
  pada: number;
}

export interface PlanetPosition {
  name: string;
  planet?: string; // Alternative property name
  longitude: number;
  latitude: number;
  speed: number;
  retrograde: boolean;
  rashi?: RashiPosition;
  zodiac_sign?: string; // Alternative to rashi
  house?: number;
  nakshatra: string;
  pada?: number;
  navashaRashi?: string;
}

export interface Masa {
  index: number;
  name: string;
  is_leap: boolean;
}

export interface Ritu {
  index: number;
  name: string;
}

export interface Samvatsara {
  index?: number;
  name: string;
}

export interface Ascendant {
  zodiac_sign: string;
  zodiac_index: number;
  longitude: number;
  nakshatra: string;
  nakshatra_index: number;
  pada: number;
}

export interface CurrentDasha {
  planet: string;
  planet_index: number;
  start_date: string;
  end_date: string;
  duration: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface Panchanga {
  date: Date;
  location: Location;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: Tithi;
  nakshatra: Nakshatra;
  yoga: Yoga;
  karana: Karana;
  vaara: Vaara;
  ayanamsha: number;
  rahuKala?: TimeRange;
  yamaGanda?: TimeRange;
  gulikaKala?: TimeRange;
  abhijitMuhurta?: TimeRange;
  durmuhurta?: TimeRange[];
  muhurta?: {
    abhijit?: TimeRange;
    rahuKala?: TimeRange;
    yamaGanda?: TimeRange;
    gulikaKala?: TimeRange;
  };
  calendar?: {
    masa?: Masa | string;
    ritu?: Ritu | string;
    samvatsara?: Samvatsara | string;
    ayanamsha?: number;
    sakaYear?: number;
    kaliYear?: number;
  };
  ascendant?: Ascendant;
  dasha?: CurrentDasha;
  api?: {
    version: string;
    timestamp: string;
  };
}

export interface Chart {
  ascendant: RashiPosition;
  planets: PlanetPosition[];
  houses: House[];
}

export interface House {
  number: number;
  sign: string;
  degree: number;
  planets: string[];
}

export interface DashaSystem {
  name: string;
  currentDasha: Dasha;
  dashaList: Dasha[];
}

export interface Dasha {
  planet: string;
  startDate: Date;
  endDate: Date;
  level: 'Maha' | 'Antar' | 'Pratyantar';
  subDashas?: Dasha[];
}

export interface UserProfile {
  name: string;
  birthDate: Date;
  birthTime: string;
  birthPlace: Location;
  currentLocation?: Location;
  chartType?: 'North' | 'South' | 'East';
  ayanamsha?: string;
}

export interface ChoghadiyaTime {
  name: string;
  ruling: string;
  nature: 'Good' | 'Bad' | 'Average';
  startTime: string;
  endTime: string;
}

// API Response Types matching backend
export interface TimeValue {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeRangeResponse {
  start: TimeValue;
  end: TimeValue;
}

export interface TithiResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface NakshatraResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface YogaResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface KaranaResponse {
  index: number;
  name: string;
  end_time: TimeValue;
}

export interface MasaResponse {
  index: number;
  name: string;
  is_leap: boolean;
}

export interface PanchangaData {
  tithi: TithiResponse;
  nakshatra: NakshatraResponse;
  yoga: YogaResponse;
  karana: KaranaResponse;
  vaara: { index: number; name: string; lord: string };
  masa: MasaResponse;
  ritu: { index: number; name: string };
  samvatsara: { index: number; name: string };
  sunrise: TimeValue;
  sunset: TimeValue;
  moonrise: TimeValue;
  moonset: TimeValue;
  day_duration: TimeValue;
  rahu_kala: TimeRangeResponse;
  yama_ganda: TimeRangeResponse;
  gulika_kala: TimeRangeResponse;
  abhijit_muhurta: TimeRangeResponse;
  ayanamsha: number;
  ahargana: number;
  saka_year: number;
  kali_year: number;
  birth_chart?: string;
}

export interface PlanetaryPositionsResponse {
  positions: PlanetPosition[];
  ascendant: Ascendant;
}

export interface VimsottariDashaResponse {
  mahadashas: CurrentDasha[];
  current_mahadasha: CurrentDasha;
  current_bhukti?: CurrentDasha;
}

export interface PanchangaResponse {
  panchanga: PanchangaData;
  planetary_positions?: PlanetaryPositionsResponse;
  birth_chart?: string; // Base64 encoded image
  dasha?: VimsottariDashaResponse;
}

export interface CitySearchResult {
  name: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

// App State Types
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'sa' | 'hi' | 'ta';
  notifications: boolean;
  defaultLocation?: Location;
  chartStyle: 'north' | 'south' | 'east';
}