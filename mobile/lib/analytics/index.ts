/**
 * Analytics Integration Module
 * Handles all analytics tracking for the app
 */

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

class Analytics {
  private initialized = false;
  private userId?: string;
  private sessionId: string;
  private eventQueue: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  /**
   * Initialize analytics SDKs
   */
  async initialize(apiKey?: string) {
    if (this.initialized) return;

    try {
      // TODO: Initialize Amplitude
      // await Amplitude.initializeAsync(apiKey);

      // TODO: Initialize Firebase Analytics
      // await Analytics.initializeAsync();

      this.initialized = true;
      this.flushEventQueue();
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }

  /**
   * Set user ID for tracking
   */
  setUserId(userId: string) {
    this.userId = userId;
    // TODO: Set user ID in analytics SDKs
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Partial<UserProperties>) {
    // TODO: Set user properties in analytics SDKs
    console.log('Setting user properties:', properties);
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
    // TODO: Send to analytics SDKs
    console.log('Analytics Event:', event);

    // Send to backend
    this.sendToBackend(event);
  }

  private async sendToBackend(event: AnalyticsEvent) {
    try {
      // TODO: Implement backend analytics endpoint
      // await apiClient.logAnalytics(event);
    } catch (error) {
      console.error('Failed to send analytics to backend:', error);
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

export const initializeAnalytics = (apiKey?: string) =>
  analytics.initialize(apiKey);