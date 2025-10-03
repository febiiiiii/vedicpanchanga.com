// Constants for Vedic Astrology calculations

export const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

export const NAKSHATRA_LORDS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',
  'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Ketu',
  'Venus', 'Sun', 'Moon', 'Mars', 'Rahu',
  'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus',
  'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter',
  'Saturn', 'Mercury'
];

export const YOGAS = [
  'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti'
];

export const KARANAS = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara',
  'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
];

export const VAARAS = [
  { name: 'Ravivar', english: 'Sunday', lord: 'Sun' },
  { name: 'Somvar', english: 'Monday', lord: 'Moon' },
  { name: 'Mangalvar', english: 'Tuesday', lord: 'Mars' },
  { name: 'Budhvar', english: 'Wednesday', lord: 'Mercury' },
  { name: 'Guruvaar', english: 'Thursday', lord: 'Jupiter' },
  { name: 'Shukravar', english: 'Friday', lord: 'Venus' },
  { name: 'Shanivar', english: 'Saturday', lord: 'Saturn' }
];

export const RASHIS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];

export const RASHI_ENGLISH = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const PLANETS = [
  { name: 'Sun', sanskrit: 'Surya', symbol: '☉' },
  { name: 'Moon', sanskrit: 'Chandra', symbol: '☽' },
  { name: 'Mars', sanskrit: 'Mangal', symbol: '♂' },
  { name: 'Mercury', sanskrit: 'Budha', symbol: '☿' },
  { name: 'Jupiter', sanskrit: 'Guru', symbol: '♃' },
  { name: 'Venus', sanskrit: 'Shukra', symbol: '♀' },
  { name: 'Saturn', sanskrit: 'Shani', symbol: '♄' },
  { name: 'Rahu', sanskrit: 'Rahu', symbol: '☊' },
  { name: 'Ketu', sanskrit: 'Ketu', symbol: '☋' }
];

export const CHOGHADIYA = {
  day: [
    { name: 'Udveg', nature: 'Bad' },
    { name: 'Char', nature: 'Good' },
    { name: 'Labh', nature: 'Good' },
    { name: 'Amrit', nature: 'Good' },
    { name: 'Kaal', nature: 'Bad' },
    { name: 'Shubh', nature: 'Good' },
    { name: 'Rog', nature: 'Bad' },
    { name: 'Udveg', nature: 'Bad' }
  ],
  night: [
    { name: 'Shubh', nature: 'Good' },
    { name: 'Rog', nature: 'Bad' },
    { name: 'Udveg', nature: 'Bad' },
    { name: 'Char', nature: 'Good' },
    { name: 'Labh', nature: 'Good' },
    { name: 'Amrit', nature: 'Good' },
    { name: 'Kaal', nature: 'Bad' },
    { name: 'Shubh', nature: 'Good' }
  ]
};

export const AYANAMSHA_SYSTEMS = [
  { value: 'lahiri', label: 'Lahiri (Chitrapaksha)' },
  { value: 'krishnamurti', label: 'Krishnamurti' },
  { value: 'raman', label: 'Raman' },
  { value: 'true_citra', label: 'True Chitra' },
  { value: 'yukteshwar', label: 'Yukteshwar' },
  { value: 'fagan_bradley', label: 'Fagan-Bradley' }
];

export const CHART_STYLES = [
  { value: 'north', label: 'North Indian' },
  { value: 'south', label: 'South Indian' },
  { value: 'east', label: 'East Indian' }
];