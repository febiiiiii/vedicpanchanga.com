# Vedic Panchanga Mobile App

A modern React Native mobile application for iOS and Android that provides traditional Hindu calendar (Panchanga) calculations with high-precision astronomical data.

## Features

- **Complete Panchanga Calculations**: Tithi, Nakshatra, Yoga, Karana, and Vaara
- **Sun & Moon Timings**: Sunrise, sunset, moonrise, and moonset
- **Muhurta Timings**: Abhijit, Rahu Kala, Yama Ganda, Gulika Kala
- **Planetary Positions**: Real-time positions of all planets with retrograde status
- **Birth Chart**: North Indian style birth chart visualization
- **Vimsottari Dasha**: Current planetary period calculations
- **Location Support**: GPS location and city search
- **Offline Caching**: Works without internet after initial calculation
- **Dark/Light Theme**: Automatic theme switching

## Tech Stack

- **Framework**: React Native with Expo SDK 51
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand with AsyncStorage
- **UI Components**: React Native Paper (Material Design)
- **API**: Axios for backend communication
- **Backend**: Python FastAPI (existing backend at port 8121)

## Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on physical device (optional)

## Installation

```bash
# Clone the repository
cd mobile

# Install dependencies
npm install

# For iOS (Mac only)
cd ios && pod install && cd ..
```

## Development

```bash
# Start the development server
npm start
# or
npm run dev  # Clears cache and starts

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on physical device
# Scan the QR code with Expo Go app
```

## Configuration

### Environment Variables

Create a `.env` file in the mobile directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:8121  # Development
# EXPO_PUBLIC_API_URL=https://api.vedicpanchanga.com  # Production
```

### API Configuration

The app connects to the Python backend API. For development:

- **iOS Simulator**: Uses `http://localhost:8121`
- **Android Emulator**: Uses `http://10.0.2.2:8121`
- **Physical Device**: Use your computer's IP address

## Project Structure

```
mobile/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Panchanga screen
│   │   ├── planets.tsx    # Planetary positions
│   │   ├── chart.tsx      # Birth chart
│   │   └── muhurta.tsx    # Muhurta timings
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── inputs/           # Input components
│   ├── ui/               # UI components
│   └── panchanga/        # Panchanga-specific
├── lib/                   # Core logic
│   ├── api/              # API client and types
│   ├── store/            # State management
│   └── utils/            # Utilities
└── assets/               # Images and fonts
```

## Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run in web browser

npm run dev        # Start with cache cleared
npm run type-check # TypeScript type checking
npm run lint       # Run ESLint
npm run clean      # Clean and reinstall

# Building (requires EAS CLI)
npm run build:ios        # Build for iOS
npm run build:android    # Build for Android
npm run build:preview    # Build preview for both
npm run build:production # Production build

# Deployment
npm run submit:ios       # Submit to App Store
npm run submit:android   # Submit to Play Store
npm run update          # OTA update
```

## Building for Production

### Setup EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure your project
eas build:configure
```

### Build for App Stores

```bash
# iOS App Store build
eas build --platform ios --profile production

# Android Play Store build
eas build --platform android --profile production
```

### Submit to Stores

```bash
# Submit to Apple App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
```

## Testing

### On Physical Device

1. Install Expo Go app from App Store/Play Store
2. Run `npm start` in the mobile directory
3. Scan the QR code with Expo Go

### On Simulators

```bash
# iOS (Mac only)
npm run ios

# Android
npm run android
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start -c  # Clear cache
   ```

2. **Dependency issues**
   ```bash
   npm run clean  # Clean install
   ```

3. **iOS build issues (Mac)**
   ```bash
   cd ios && pod install
   ```

4. **Android emulator connection**
   - Ensure emulator is running
   - Check API URL uses `10.0.2.2` for localhost

## Features Roadmap

- [ ] Widget support (iOS/Android)
- [ ] Push notifications for muhurtas
- [ ] Multiple language support (Hindi, Sanskrit, Tamil)
- [ ] PDF export of Panchanga
- [ ] Calendar view
- [ ] Festival calendar
- [ ] Horoscope matching
- [ ] Custom calculation methods

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This mobile app follows the same licensing as the main project:
- MIT License

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: support@vedicpanchanga.com

## Credits

- Swiss Ephemeris for astronomical calculations
- React Native and Expo teams
- React Native Paper for UI components
- All contributors and testers