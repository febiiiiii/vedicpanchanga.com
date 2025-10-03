// Types for Vedic Panchanga application

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
  longitude: number;
  latitude: number;
  speed: number;
  retrograde: boolean;
  rashi: RashiPosition;
  house?: number;
  nakshatra: string;
  navashaRashi?: string;
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
  rahuKala: TimeRange;
  yamaGanda: TimeRange;
  gulikaKala: TimeRange;
  abhijitMuhurta: TimeRange;
  durmuhurta: TimeRange[];
}

export interface TimeRange {
  start: string;
  end: string;
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