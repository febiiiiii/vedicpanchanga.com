# 📱 Vedic Panchanga Mobile App - Deployment Guide

## 🚀 Complete Guide for Google Play Store & Apple App Store Deployment

### Table of Contents
- [Prerequisites](#prerequisites)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Production Configuration](#production-configuration)
- [Testing Procedures](#testing-procedures)
- [Android Play Store Deployment](#android-play-store-deployment)
- [Apple App Store Deployment](#apple-app-store-deployment)
- [Post-Deployment](#post-deployment)

---

## Prerequisites

### Required Accounts
- [ ] Google Play Developer Account ($25 one-time fee)
- [ ] Apple Developer Account ($99/year)
- [ ] Expo Account (free for EAS Build)

### Required Tools
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project for EAS Build
eas build:configure
```

---

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] All features working correctly
- [ ] No console errors or warnings
- [ ] API endpoints pointing to production
- [ ] Remove all debug/development code
- [ ] Code review completed

### 2. App Information
- [ ] App name finalized: "Vedic Panchanga"
- [ ] App description (short & long)
- [ ] Keywords for ASO (App Store Optimization)
- [ ] Privacy Policy URL
- [ ] Terms of Service URL
- [ ] Support email/website

### 3. Assets Required
- [ ] App Icon (1024x1024 PNG)
- [ ] Feature Graphic (1024x500 PNG) - Android only
- [ ] Screenshots (minimum 2, maximum 8):
  - iPhone 6.5" (1284x2778)
  - iPhone 5.5" (1242x2208)
  - iPad 12.9" (2048x2732)
  - Android Phone (1080x1920)
  - Android Tablet (2048x2732)
- [ ] App Preview Video (optional, 15-30 seconds)

### 4. Legal Requirements
- [ ] Privacy Policy covering:
  - Location data usage
  - Data storage practices
  - Third-party services (if any)
- [ ] Terms of Service
- [ ] Copyright attributions for Swiss Ephemeris
- [ ] GDPR compliance (if serving EU users)

---

## Production Configuration

### 1. Update API Configuration

Edit `lib/api/client.ts`:
```typescript
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.vedicpanchanga.com' // Your production API URL
    : Platform.select({
        ios: 'http://localhost:8121',
        android: 'http://10.0.2.2:8121',
        default: 'http://localhost:8121'
      }));
```

### 2. Environment Variables

Create `.env.production`:
```env
API_URL=https://api.vedicpanchanga.com
SENTRY_DSN=your_sentry_dsn_for_error_tracking
ANALYTICS_ID=your_analytics_id
```

### 3. Update app.json

```json
{
  "expo": {
    "name": "Vedic Panchanga",
    "slug": "vedic-panchanga",
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1",
      "bundleIdentifier": "com.vedicpanchanga.app"
    },
    "android": {
      "versionCode": 1,
      "package": "com.vedicpanchanga.app"
    }
  }
}
```

### 4. EAS Build Configuration

Create `eas.json`:
```json
{
  "cli": {
    "version": ">= 5.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "ios": {
        "image": "latest"
      },
      "android": {
        "image": "latest"
      },
      "env": {
        "NODE_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      },
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "YOUR_TEAM_ID"
      }
    }
  }
}
```

---

## Testing Procedures

### 1. Local Testing

```bash
# Test on iOS Simulator
npx expo run:ios --configuration Release

# Test on Android Emulator
npx expo run:android --variant release

# Test on physical devices
npx expo start --no-dev --minify
```

### 2. Build for Testing

```bash
# Build APK for Android testing
eas build --platform android --profile preview

# Build for iOS Simulator
eas build --platform ios --profile preview

# Build for internal testing (both platforms)
eas build --platform all --profile preview
```

### 3. Test Cases

#### Core Functionality
- [ ] Panchanga calculation for current date/time
- [ ] Date/time picker functionality
- [ ] City search (test with 10+ cities)
- [ ] Location permission handling
- [ ] GPS location detection
- [ ] Offline mode (airplane mode test)
- [ ] Data persistence after app restart

#### UI/UX Testing
- [ ] All tabs load correctly
- [ ] Dark/light theme switching
- [ ] Pull to refresh functionality
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

#### Performance Testing
- [ ] App launch time < 3 seconds
- [ ] Smooth scrolling (60 FPS)
- [ ] Memory usage < 200MB
- [ ] No memory leaks
- [ ] API response handling

#### Device Testing
- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] iPad (tablet)
- [ ] Android phone (various sizes)
- [ ] Android tablet
- [ ] iOS 14+ compatibility
- [ ] Android 6+ compatibility

---

## Android Play Store Deployment

### 1. Generate Upload Key

```bash
# Generate keystore (do this once, keep it safe!)
keytool -genkeypair -v -storetype PKCS12 -keystore vedic-panchanga.keystore -alias vedic-panchanga -keyalg RSA -keysize 2048 -validity 10000

# Configure in eas.json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle",
        "credentialsSource": "local"
      }
    }
  }
}
```

### 2. Build Production AAB

```bash
# Build Android App Bundle
eas build --platform android --profile production

# Download the .aab file when complete
```

### 3. Google Play Console Setup

1. **Create App**
   - Go to [Google Play Console](https://play.google.com/console)
   - Click "Create app"
   - Fill in app details

2. **Store Listing**
   - App name: Vedic Panchanga
   - Short description (80 chars)
   - Full description (4000 chars)
   - App category: Lifestyle or Books & Reference
   - Upload screenshots
   - Upload feature graphic
   - Upload app icon

3. **Content Rating**
   - Complete questionnaire
   - Get IARC rating

4. **App Content**
   - Privacy Policy URL
   - Ads: No
   - Access: All ages
   - Target audience: 13+

5. **Release Management**
   - Upload .aab file to Internal testing first
   - Add testers (minimum 20 for closed testing)
   - Test for 14 days
   - Promote to Production

### 4. Submit for Review

```bash
# Using EAS Submit
eas submit --platform android --profile production

# Or manually upload .aab in Play Console
```

---

## Apple App Store Deployment

### 1. iOS Certificates & Provisioning

```bash
# EAS will handle certificates automatically
eas credentials
```

### 2. Build Production IPA

```bash
# Build iOS app
eas build --platform ios --profile production

# Download the .ipa file when complete
```

### 3. App Store Connect Setup

1. **Create App**
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Click "+" → "New App"
   - Bundle ID: com.vedicpanchanga.app
   - SKU: vedic-panchanga-001

2. **App Information**
   - Primary language: English
   - App name: Vedic Panchanga
   - Subtitle: Hindu Calendar & Muhurta
   - Privacy Policy URL
   - Category: Lifestyle or Reference

3. **Version Information**
   - What's New (version notes)
   - Keywords (100 chars max)
   - Support URL
   - Marketing URL (optional)
   - Screenshots for all device sizes
   - App Preview video (optional)

4. **App Review Information**
   - Demo account (if needed)
   - Notes for reviewer
   - Contact information

### 4. Submit for Review

```bash
# Using EAS Submit
eas submit --platform ios --profile production

# Or use Transporter app to upload .ipa manually
```

### 5. TestFlight Setup

1. Upload build to TestFlight
2. Add internal testers (up to 100)
3. Add external testers (up to 10,000)
4. Test for minimum 7 days
5. Collect feedback and crash reports

---

## Production Build Commands

### Complete Build & Deploy Process

```bash
# 1. Update version numbers
npm version patch  # or minor/major

# 2. Build for both platforms
eas build --platform all --profile production

# 3. Submit to stores
eas submit --platform android --profile production
eas submit --platform ios --profile production

# 4. Monitor build status
eas build:list

# 5. Download artifacts
eas build:download --platform android
eas build:download --platform ios
```

---

## Post-Deployment

### 1. Monitoring Setup

- [ ] Sentry for crash reporting
- [ ] Analytics (Firebase/Amplitude)
- [ ] Performance monitoring
- [ ] User feedback system

### 2. App Store Optimization (ASO)

**Keywords to target:**
- panchanga
- hindu calendar
- muhurta
- vedic astrology
- tithi nakshatra
- sunrise sunset
- indian calendar
- panchangam
- almanac
- jyotish

### 3. Marketing Materials

- [ ] App landing page
- [ ] Social media announcements
- [ ] Press kit
- [ ] Demo video
- [ ] Blog post announcement

### 4. Update Strategy

- **Patch releases** (1.0.x): Bug fixes - every 2 weeks
- **Minor releases** (1.x.0): New features - monthly
- **Major releases** (x.0.0): Major updates - quarterly

### 5. User Support

- [ ] FAQ documentation
- [ ] In-app help system
- [ ] Email support system
- [ ] User feedback collection
- [ ] Crash report monitoring

---

## Important URLs

### Development
- Backend API: http://localhost:8121
- Expo Dev: http://localhost:8081

### Production
- Backend API: https://api.vedicpanchanga.com
- Website: https://vedicpanchanga.com
- Privacy Policy: https://vedicpanchanga.com/privacy
- Terms of Service: https://vedicpanchanga.com/terms

### Store Links (after deployment)
- Google Play: https://play.google.com/store/apps/details?id=com.vedicpanchanga.app
- App Store: https://apps.apple.com/app/vedic-panchanga/idXXXXXXXXX

---

## Emergency Rollback

If critical issues are found after deployment:

### Android
1. Go to Play Console → Release Management
2. Halt rollout
3. Upload previous APK/AAB
4. Resume rollout with old version

### iOS
1. Go to App Store Connect
2. Remove from sale (immediate)
3. Fix issues
4. Submit new build for expedited review

---

## Support Contact

For deployment support:
- Email: support@vedicpanchanga.com
- Documentation: https://docs.expo.dev/build/introduction/
- EAS Build Issues: https://github.com/expo/eas-cli/issues

---

## Version History

| Version | Date | Changes | Platform |
|---------|------|---------|----------|
| 1.0.0 | TBD | Initial release | iOS/Android |

---

**Last Updated**: October 2024
**Next Review**: January 2025