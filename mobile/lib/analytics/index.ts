/**
 * Analytics Integration Module
 * Uses PostHog (open source) and Google Analytics (free)
 */

import { Platform } from 'react-native';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

interface UserProperties {
  appVersion: string;
  platform: 'ios' | 'android';
  theme: 'light' | 'dark';
  language: string;
  city?: string;
  country?: string;
}

// Configuration for free/open-source analytics
// Uses EXPO_PUBLIC_ prefix for environment variables
const ANALYTICS_CONFIG = {
  // PostHog - Open Source Product Analytics (self-hosted or free tier)
  POSTHOG: {
    API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY || 'phc_YOUR_PROJECT_API_KEY',
    HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com', // Or your self-hosted URL
    ENABLED: !!process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
  },
  // Google Analytics - Free tier
  GOOGLE_ANALYTICS: {
    MEASUREMENT_ID: process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    ENABLED: !!process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID,
  },
};

class Analytics {
  private initialized = false;
  private userId?: string;
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];
  private posthog: any = null;
  private gtag: any = null;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  /**
   * Initialize analytics SDKs (PostHog & Google Analytics)
   */
  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize PostHog (open source)
      if (ANALYTICS_CONFIG.POSTHOG.ENABLED) {
        await this.initializePostHog();
      }

      // Initialize Google Analytics (free)
      if (ANALYTICS_CONFIG.GOOGLE_ANALYTICS.ENABLED) {
        await this.initializeGoogleAnalytics();
      }

      this.initialized = true;
      this.flushEventQueue();
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }

  /**
   * Initialize PostHog - Open Source Product Analytics
   * PostHog can be self-hosted for free or use their generous free tier
   */
  private async initializePostHog() {
    try {
      // Dynamic import to reduce bundle size if not used
      const PostHog = await import('posthog-react-native').then(m => m.default);

      this.posthog = new PostHog(
        ANALYTICS_CONFIG.POSTHOG.API_KEY,
        {
          host: ANALYTICS_CONFIG.POSTHOG.HOST,
          // Enable only on production
          enable: __DEV__ ? false : true,
          // Capture app lifecycle events automatically
          captureApplicationLifecycleEvents: true,
          // Capture screen views automatically
          captureScreens: true,
          // Disable in development
          flushInterval: 30,
          flushAt: 20,
        }
      );

      console.log('PostHog initialized successfully');
    } catch (error) {
      console.error('PostHog initialization failed:', error);
    }
  }

  /**
   * Initialize Google Analytics - Free Tier
   */
  private async initializeGoogleAnalytics() {
    try {
      // For React Native, we'll use the Measurement Protocol directly
      // This is completely free and doesn't require Firebase
      this.gtag = {
        endpoint: `https://www.google-analytics.com/mp/collect`,
        measurementId: ANALYTICS_CONFIG.GOOGLE_ANALYTICS.MEASUREMENT_ID,
        apiSecret: process.env.GA_API_SECRET || '', // Optional for enhanced measurement
      };

      console.log('Google Analytics initialized successfully');
    } catch (error) {
      console.error('Google Analytics initialization failed:', error);
    }
  }


  /**
   * Set user ID for tracking
   */
  setUserId(userId: string) {
    this.userId = userId;

    // PostHog
    if (this.posthog) {
      this.posthog.identify(userId);
    }

    // Google Analytics
    if (this.gtag) {
      this.sendToGoogleAnalytics('user_id_set', { user_id: userId });
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Partial<UserProperties>) {
    // PostHog
    if (this.posthog) {
      this.posthog.capture('$set', properties);
    }

    // Google Analytics
    if (this.gtag) {
      this.sendToGoogleAnalytics('user_properties', properties);
    }
  }

  /**
   * Track an event
   */
  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        platform: Platform.OS,
      },
    };

    if (!this.initialized) {
      this.eventQueue.push(event);
      return;
    }

    this.sendEvent(event);
  }

  /**
   * Track screen view
   */
  trackScreen(screenName: string, properties?: Record<string, any>) {
    this.track('screen_view', {
      screen_name: screenName,
      ...properties,
    });
  }

  /**
   * Track app lifecycle events
   */
  trackAppOpen() {
    this.track('app_open', {
      session_id: this.sessionId,
    });
  }

  trackAppBackground() {
    this.track('app_background');
  }

  trackAppForeground() {
    this.sessionId = this.generateSessionId();
    this.track('app_foreground', {
      new_session_id: this.sessionId,
    });
  }

  /**
   * Track Panchanga specific events
   */
  trackPanchangaCalculation(location: any, date: Date) {
    this.track('panchanga_calculated', {
      city: location.city,
      country: location.country,
      date: date.toISOString(),
      day_of_week: date.getDay(),
    });
  }

  trackLocationChange(location: any, method: 'search' | 'current' | 'saved') {
    this.track('location_changed', {
      city: location.city,
      country: location.country,
      method,
    });
  }

  trackFeatureUsed(feature: string) {
    this.track('feature_used', {
      feature_name: feature,
    });
  }

  trackError(error: string, context?: Record<string, any>) {
    this.track('error_occurred', {
      error_message: error,
      ...context,
    });
  }

  trackShare(content: string, method: string) {
    this.track('content_shared', {
      content_type: content,
      share_method: method,
    });
  }

  trackTabChange(tabName: string) {
    this.track('tab_changed', {
      tab_name: tabName,
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number) {
    this.track('performance_metric', {
      metric_name: metric,
      value,
    });
  }

  /**
   * Private methods
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sendEvent(event: AnalyticsEvent) {
    // Send to PostHog (open source)
    if (this.posthog) {
      this.posthog.capture(event.name, event.properties);
    }

    // Send to Google Analytics (free)
    if (this.gtag) {
      this.sendToGoogleAnalytics(event.name, event.properties);
    }

    // Log in development
    if (__DEV__) {
      console.log('Analytics Event:', event);
    }
  }

  /**
   * Send event to Google Analytics using Measurement Protocol
   * This is completely free and doesn't require any paid services
   */
  private async sendToGoogleAnalytics(eventName: string, properties?: Record<string, any>) {
    if (!this.gtag) return;

    try {
      const payload = {
        client_id: this.userId || this.sessionId,
        events: [{
          name: eventName,
          params: {
            session_id: this.sessionId,
            engagement_time_msec: 100,
            ...properties,
          },
        }],
      };

      // Use fetch to send to GA Measurement Protocol (free)
      fetch(`${this.gtag.endpoint}?measurement_id=${this.gtag.measurementId}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(error => {
        console.error('GA tracking failed:', error);
      });
    } catch (error) {
      console.error('Failed to send to Google Analytics:', error);
    }
  }


  private flushEventQueue() {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        this.sendEvent(event);
      }
    }
  }
}

// Export singleton instance
const analytics = new Analytics();
export default analytics;

// Export convenience functions
export const trackEvent = (name: string, properties?: Record<string, any>) =>
  analytics.track(name, properties);

export const trackScreen = (name: string, properties?: Record<string, any>) =>
  analytics.trackScreen(name, properties);

export const trackError = (error: string, context?: Record<string, any>) =>
  analytics.trackError(error, context);

export const initializeAnalytics = () =>
  analytics.initialize();

// Export analytics configuration for easy setup
export const ANALYTICS_SETUP = ANALYTICS_CONFIG;