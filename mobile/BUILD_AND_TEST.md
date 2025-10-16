# 🚀 Quick Build & Test Guide

## 📱 Development Testing

### Start Development Server
```bash
# Start with cache clear
npx expo start --clear

# For specific platform
npx expo start --ios
npx expo start --android
npx expo start --web
```

### Test on Devices

#### iOS Simulator
```bash
# Press 'i' in Expo terminal
# Or run directly:
npx expo run:ios
```

#### Android Emulator
```bash
# Press 'a' in Expo terminal
# Or run directly:
npx expo run:android
```

#### Physical Device
1. Install **Expo Go** app
2. Scan QR code from terminal
3. Make sure on same WiFi network

---

## 🧪 Testing Builds

### 1. Preview Build (For Testing)

```bash
# Install EAS CLI (first time only)
npm install -g eas-cli
eas login

# Build APK for Android testing
eas build --platform android --profile preview

# Build for iOS Simulator
eas build --platform ios --profile preview

# Build both platforms
eas build --platform all --profile preview
```

### 2. Download & Install Test Builds

```bash
# List recent builds
eas build:list

# Download specific build
eas build:download --platform android
eas build:download --platform ios
```

**Install on Android:**
```bash
# Install APK on emulator/device
adb install build-xxxxx.apk
```

**Install on iOS Simulator:**
```bash
# Drag .app file to simulator
# Or use command:
xcrun simctl install booted build-xxxxx.app
```

---

## 🏗️ Production Builds

### Prerequisites
```bash
# Configure EAS (first time)
eas build:configure

# Check credentials
eas credentials
```

### Build for Stores

```bash
# Android (AAB for Play Store)
eas build --platform android --profile production

# iOS (IPA for App Store)
eas build --platform ios --profile production

# Both platforms
eas build --platform all --profile production
```

---

## 📤 Submit to Stores

### Automatic Submission
```bash
# Submit to Google Play Store
eas submit --platform android --profile production

# Submit to Apple App Store
eas submit --platform ios --profile production

# Submit both
eas submit --platform all --profile production
```

### Manual Submission

**Android:**
1. Download AAB file: `eas build:download --platform android`
2. Upload to [Google Play Console](https://play.google.com/console)

**iOS:**
1. Download IPA file: `eas build:download --platform ios`
2. Use Transporter app or Xcode to upload

---

## ✅ Testing Checklist

### Before Every Build
- [ ] Update version in `app.json`
- [ ] Test all features locally
- [ ] Check API endpoints (production vs development)
- [ ] Clear cache and test fresh install
- [ ] Test offline mode

### Device Testing
- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro (standard)
- [ ] iPad (tablet)
- [ ] Android Phone
- [ ] Android Tablet

### Core Features
- [ ] Panchanga calculation
- [ ] Date/time selection
- [ ] City search
- [ ] Location permissions
- [ ] All 4 tabs working
- [ ] Pull to refresh
- [ ] Dark/light theme

### Performance
- [ ] App launches < 3 seconds
- [ ] Smooth scrolling
- [ ] No crashes
- [ ] API responses handled

---

## 🔧 Troubleshooting

### Build Failures

```bash
# Clear all caches
rm -rf node_modules
rm -rf .expo
npm install
npx expo doctor
```

### iOS Specific
```bash
# Clear iOS build cache
cd ios && pod deintegrate && pod install
```

### Android Specific
```bash
# Clear Android build cache
cd android && ./gradlew clean
```

### EAS Build Issues
```bash
# Check build status
eas build:list --status=errored

# View build logs
eas build:view [build-id]

# Cancel stuck build
eas build:cancel [build-id]
```

---

## 📊 Build Status Commands

```bash
# List all builds
eas build:list

# Filter by platform
eas build:list --platform=android
eas build:list --platform=ios

# Filter by status
eas build:list --status=finished
eas build:list --status=errored

# View specific build details
eas build:view [build-id]

# Monitor build in real-time
eas build --platform android --wait
```

---

## 🚢 Version Management

### Update Version
```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

### Version in app.json
```json
{
  "expo": {
    "version": "1.0.0",      // User-facing version
    "ios": {
      "buildNumber": "1"     // Auto-incremented by EAS
    },
    "android": {
      "versionCode": 1       // Auto-incremented by EAS
    }
  }
}
```

---

## 🎯 Quick Commands

```bash
# Development
npm start                    # Start Expo
npm run ios                 # Run on iOS
npm run android             # Run on Android

# Testing
eas build -p android --profile preview    # Test APK
eas build -p ios --profile preview        # Test iOS

# Production
eas build -p all --profile production     # Build for stores
eas submit -p all --profile production    # Submit to stores

# Utilities
eas build:list              # List builds
eas build:download          # Download build
eas credentials             # Manage certificates
npx expo doctor            # Check for issues
```

---

## 📝 Notes

- **First build** takes 20-40 minutes
- **Subsequent builds** take 10-20 minutes
- **iOS builds** require Apple Developer account
- **Android builds** can be done without Play Console account
- **Free tier** includes 30 builds/month

---

## 🆘 Help & Support

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build](https://docs.expo.dev/build/introduction)
- [EAS Submit](https://docs.expo.dev/submit/introduction)
- [Troubleshooting](https://docs.expo.dev/build/troubleshooting)

---

**Last Updated**: October 2024