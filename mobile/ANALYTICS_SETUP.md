# 📊 Free & Open-Source Analytics Setup

This app uses **PostHog** (open source) and **Google Analytics** (free tier) for analytics. Both are completely free for most use cases.

## 🚀 Quick Setup

### Step 1: Install Required Packages

```bash
# PostHog - Open Source Product Analytics
npm install posthog-react-native

# For React Native
npm install react-native-device-info
npx pod-install # iOS only
```

### Step 2: Set Up PostHog (Open Source)

#### Option A: Use PostHog Cloud (Free Tier)
1. Sign up at [PostHog Cloud](https://app.posthog.com/signup) (free up to 1M events/month)
2. Create a new project
3. Get your Project API Key from Settings → Project Settings
4. Add to `.env.local`:
```env
POSTHOG_API_KEY=phc_YOUR_PROJECT_API_KEY
POSTHOG_HOST=https://app.posthog.com
```

#### Option B: Self-Host PostHog (100% Free)
```bash
# Using Docker
docker run -d \
  --name posthog \
  -p 8000:8000 \
  -v posthog-data:/var/lib/posthog \
  posthog/posthog:latest

# Or using Docker Compose
curl -o docker-compose.yml https://posthog.com/docker-compose.yml
docker-compose up -d
```

Then update `.env.local`:
```env
POSTHOG_API_KEY=your_self_hosted_key
POSTHOG_HOST=http://localhost:8000
```

### Step 3: Set Up Google Analytics (Free)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property (it's free!)
3. Select "Mobile app" as platform
4. Get your Measurement ID (starts with G-)
5. Add to `.env.local`:
```env
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📱 Implementation in App

### Initialize Analytics (Already Done!)

In `App.tsx` or your root component:
```typescript
import { initializeAnalytics } from './lib/analytics';

// Initialize on app start
useEffect(() => {
  initializeAnalytics();
}, []);
```

### Track Events (Examples)

```typescript
import { trackEvent, trackScreen, trackError } from './lib/analytics';

// Track screen views
trackScreen('Panchanga');

// Track user actions
trackEvent('panchanga_calculated', {
  city: location.city,
  date: date.toISOString()
});

// Track errors
trackError('API failed', { endpoint: '/panchanga' });
```

## 📈 PostHog Features (All Free/Open Source)

PostHog provides these features for free:
- **Product Analytics** - Track events and user behavior
- **Session Recording** - See how users interact with your app
- **Feature Flags** - Roll out features gradually
- **A/B Testing** - Test different variations
- **Heatmaps** - See where users click
- **User Paths** - Understand user journeys
- **Retention Analysis** - Track user retention
- **Cohort Analysis** - Group users by behavior

## 📊 Google Analytics Features (Free Tier)

Google Analytics provides:
- **Real-time Analytics** - See users in real-time
- **User Demographics** - Age, gender, interests
- **Geographic Data** - User locations
- **Technology Reports** - Devices, OS, screen sizes
- **Acquisition Reports** - How users find your app
- **Behavior Flow** - User navigation patterns
- **Custom Events** - Track anything you want
- **Conversion Tracking** - Track goals

## 🔒 Privacy & GDPR Compliance

### PostHog Privacy
- Can be self-hosted for complete data control
- GDPR compliant
- No data sharing with third parties (if self-hosted)
- User opt-out supported

### Google Analytics Privacy
- Implement consent management
- Use IP anonymization
- Provide opt-out mechanism
- Include in privacy policy

### Privacy Policy Template
```
Our app uses analytics to improve user experience:

- PostHog: [Open source analytics - can be self-hosted]
- Google Analytics: [Anonymous usage statistics]

You can opt-out of analytics in Settings.
Your data is never sold to third parties.
```

## 🎯 Events to Track

The app is configured to track these events automatically:

### App Lifecycle
- `app_open` - App launched
- `app_background` - App backgrounded
- `app_foreground` - App resumed

### User Actions
- `panchanga_calculated` - Main feature usage
- `location_changed` - Location selection
- `date_changed` - Date selection
- `tab_changed` - Navigation
- `feature_used` - Feature engagement

### Performance
- `api_response_time` - API performance
- `calculation_time` - Processing speed
- `error_rate` - Error frequency

## 🚨 Debugging Analytics

### View Events in Development
```typescript
// Analytics are logged to console in dev mode
// Check your terminal/console for:
// "Analytics Event: {name: 'event_name', properties: {...}}"
```

### PostHog Debug Mode
```typescript
// In lib/analytics/index.ts
enable: true, // Enable in dev for testing
```

### Google Analytics Debug
Use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension

## 💰 Cost Comparison

| Service | Free Tier | Paid Starts At | Self-Host |
|---------|-----------|----------------|-----------|
| **PostHog** | 1M events/month | $0 (open source) | ✅ Free forever |
| **Google Analytics** | Unlimited* | $0 (GA4 is free) | ❌ |
| **Amplitude** | 10M events/month | $61/month | ❌ |
| **Mixpanel** | 100K events/month | $28/month | ❌ |

*Google Analytics 4 is free for most use cases

## 🛠️ Troubleshooting

### PostHog Not Working?
1. Check API key is correct
2. Verify host URL (no trailing slash)
3. Check network requests in dev tools
4. Enable debug mode

### Google Analytics Not Receiving Events?
1. Events can take 24-48 hours to appear initially
2. Use Realtime view to see immediate events
3. Check Measurement ID format (G-XXXXXXXXXX)
4. Verify network requests are being sent

## 📚 Documentation

- **PostHog Docs**: https://posthog.com/docs
- **Google Analytics**: https://support.google.com/analytics

## 🎉 You're All Set!

Your app now has professional analytics that are:
- ✅ Completely free (or self-hosted)
- ✅ Privacy-focused
- ✅ GDPR compliant
- ✅ No vendor lock-in
- ✅ Powerful insights

Start tracking and improving your app! 🚀