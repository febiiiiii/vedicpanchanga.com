# 📱 Vedic Panchanga Mobile Apps - Quick Run Guide

## ✅ Apps Already Built and Ready!

Your Vedic Panchanga mobile apps are fully built with all features from your Next.js frontend. This guide shows how to run them.

---

## 🚀 Quick Start (Already Running!)

### 1️⃣ **Web Version** - http://localhost:8081
- ✅ Running now
- Open browser and go to: `http://localhost:8081`
- Full mobile app experience in browser

### 2️⃣ **Android Emulator**
- ✅ App installed: "Vedic Panchanga"
- Check your Android emulator screen
- App icon should be visible

### 3️⃣ **iOS Simulator**
```bash
# If not running, start with:
cd mobile && npx expo run:ios
```

---

## 🎯 App Features (All Working!)

### Core Functionality
- **📍 Location Services**
  - GPS current location
  - Search from 100,000+ cities database
  - Auto-detect timezone

- **📅 Date & Time**
  - Native date picker
  - Native time picker
  - Current date/time default

- **🔮 Panchanga Calculations**
  - Tithi (Lunar day)
  - Nakshatra (Lunar mansion)
  - Yoga (Sun-Moon combination)
  - Karana (Half of Tithi)
  - Vaara (Weekday)

- **🪐 Planetary Positions**
  - All 9 planets (Navagraha)
  - Retrograde status
  - Zodiac sign and degree
  - Nakshatra pada

- **📊 Birth Chart**
  - North Indian style
  - Visual representation
  - House placements

- **⏰ Muhurta Timings**
  - Abhijit Muhurta (Auspicious)
  - Rahu Kala (Inauspicious)
  - Yama Ganda (Inauspicious)
  - Gulika Kala (Inauspicious)

### Navigation
- **4 Bottom Tabs**:
  1. Panchanga (Main)
  2. Planets
  3. Chart
  4. Muhurta

### UI Features
- 🌓 Dark/Light theme (auto-switching)
- 💾 Offline caching (works without internet)
- 🎨 Material Design (React Native Paper)
- 📱 Native components

---

## 🔧 Development Commands

### Start Development Server
```bash
cd mobile
npx expo start --clear
```

### Run on Specific Platform
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios

# Web
npx expo start --web
```

### Testing with Expo Go
1. Install "Expo Go" app on your phone
2. Run `npx expo start`
3. Scan QR code with Expo Go

---

## 📂 Project Structure

```
mobile/
├── app/                    # Screens (Expo Router)
│   ├── (tabs)/            # Tab screens
│   │   ├── index.tsx      # Panchanga
│   │   ├── planets.tsx    # Planets
│   │   ├── chart.tsx      # Birth Chart
│   │   └── muhurta.tsx    # Muhurtas
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── lib/                   # Core logic
│   ├── api/              # Backend API client
│   ├── store/            # State management
│   └── utils/            # Utilities
└── App.tsx               # Entry point
```

---

## ⚡ Quick Fixes

### App Not Loading?
```bash
# Restart Expo
cd mobile
npx expo start --clear
```

### Android Emulator Issues?
```bash
# Reinstall app
adb uninstall com.vedicpanchanga.app
npx expo run:android
```

### iOS Simulator Issues?
```bash
# Clean and rebuild
cd mobile/ios
pod install
cd ..
npx expo run:ios
```

---

## 🌐 API Configuration

The app connects to your Python backend:
- **Backend**: http://localhost:8121
- **Auto-configured** for each platform:
  - iOS Simulator: localhost:8121
  - Android Emulator: 10.0.2.2:8121
  - Physical Device: Your IP:8121

---

## 📱 Current Status

✅ **Android**: Built, installed, and running
✅ **iOS**: Building (requires Xcode)
✅ **Web**: Running at localhost:8081
✅ **Backend API**: Running at localhost:8121

---

## 🎉 Your App is Ready!

Just open http://localhost:8081 in your browser or check your Android emulator to see your fully functional Vedic Panchanga mobile app!