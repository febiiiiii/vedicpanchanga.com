# 🚀 Quick Deploy - Vedic Panchanga Mobile App

## First Time Setup (One-time only)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Configure EAS Build
eas build:configure
```

## 🎯 Deploy to Both Stores (Production)

```bash
# Step 1: Update version
npm version patch  # or minor/major

# Step 2: Build for both platforms
npm run build:all

# Step 3: Submit to stores (after builds complete)
npm run submit:all

# That's it! 🎉
```

## 📱 Platform-Specific Deployment

### Android Play Store Only
```bash
npm run build:android      # Build AAB
npm run submit:android     # Submit to Play Store
```

### Apple App Store Only
```bash
npm run build:ios          # Build IPA
npm run submit:ios         # Submit to App Store
```

## 🧪 Testing Builds

### Build Test APK
```bash
npm run build:preview:android
# Download APK and share with testers
```

### Build for TestFlight
```bash
npm run build:preview:ios
# Upload to TestFlight for beta testing
```

## 📊 Check Build Status

```bash
# List all builds
eas build:list

# Download completed build
eas build:download
```

## ⚡ Emergency Commands

### Cancel Stuck Build
```bash
eas build:cancel [build-id]
```

### Rollback Release
```bash
# Android: Halt rollout in Play Console
# iOS: Remove from sale in App Store Connect
```

## 📝 Pre-flight Checklist

Before running deployment:
- [ ] Backend API is live at `https://api.vedicpanchanga.com`
- [ ] All features tested locally
- [ ] Version number updated
- [ ] Screenshots ready
- [ ] Release notes written

## 🎉 Success Indicators

✅ Build successful message
✅ "Submission successful" confirmation
✅ Email from Google/Apple
✅ App visible in store console

## 🔗 Important Links

- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [EAS Build Dashboard](https://expo.dev/accounts/[your-username]/projects/vedic-panchanga/builds)

---

**Total deployment time: ~45 minutes**
**Review time: 2-24 hours (Google), 24-48 hours (Apple)**

Ready to deploy? Run `npm run build:all` 🚀