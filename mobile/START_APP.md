# Running the Vedic Panchanga Mobile App

## Prerequisites

1. **Backend API must be running**
   ```bash
   cd backend
   python api.py
   # Should be running on http://localhost:8121
   ```

2. **Install dependencies (if not already done)**
   ```bash
   cd mobile
   npm install
   ```

## Running the App

### For Android Emulator

1. Start the Android emulator first
2. Run the app:
   ```bash
   npx expo start
   # Then press 'a' to open in Android
   ```

### For Android Physical Device

1. Find your computer's IP address:
   ```bash
   # On Mac:
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # On Windows:
   ipconfig
   ```

2. Update the API URL in `lib/api/client.ts`:
   - Change `http://10.0.2.2:8121` to `http://YOUR_COMPUTER_IP:8121`

3. Make sure your phone and computer are on the same WiFi network

4. Run the app:
   ```bash
   npx expo start
   # Scan the QR code with Expo Go app
   ```

### For iOS Simulator

```bash
npx expo start
# Then press 'i' to open in iOS
```

### For iOS Physical Device

1. Install Expo Go from the App Store
2. Make sure your phone and computer are on the same WiFi network
3. Run:
   ```bash
   npx expo start
   # Scan the QR code with Expo Go app
   ```

## Troubleshooting

### Network Error on Android
- Make sure backend is running on port 8121
- For emulator: API should use `http://10.0.2.2:8121`
- For physical device: Use your computer's IP address

### App Not Loading
1. Clear cache:
   ```bash
   npx expo start --clear
   ```

2. Reset Metro bundler:
   ```bash
   watchman watch-del-all
   rm -rf node_modules
   npm install
   npx expo start --clear
   ```

### API Connection Issues
- Check if backend is running: `curl http://localhost:8121`
- Check CORS settings in backend `api.py`
- Add your IP to CORS allowed origins if needed

## Features

- **Panchanga Calculation**: Get complete panchanga for any date/location
- **City Search**: Search from 100,000+ cities worldwide
- **Offline Caching**: Previously calculated data is cached
- **Dark/Light Theme**: Automatic theme switching
- **Muhurta Timings**: View auspicious and inauspicious times

## Production Build

### Android APK
```bash
npx expo build:android
```

### iOS IPA
```bash
npx expo build:ios
```

For more details, see [Expo documentation](https://docs.expo.dev/build/introduction/)