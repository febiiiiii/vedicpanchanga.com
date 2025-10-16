/**
 * Share and Marketing Utilities
 */

import { Share, Platform } from 'react-native';
import { trackEvent } from '../analytics';
import { APP_INFO } from '../config/constants';

interface ShareOptions {
  title?: string;
  message: string;
  url?: string;
}

/**
 * Format Panchanga data for sharing
 */
export const formatPanchangaForSharing = (
  panchangaData: any,
  location: any,
  date: Date
): string => {
  if (!panchangaData?.panchanga) {
    return '';
  }

  const { panchanga } = panchangaData;
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatTime = (time: any): string => {
    if (!time) return '--:--';
    if (typeof time === 'string') return time;
    if (time.hours !== undefined && time.minutes !== undefined) {
      const h = String(time.hours).padStart(2, '0');
      const m = String(time.minutes).padStart(2, '0');
      return `${h}:${m}`;
    }
    return '--:--';
  };

  const message = `📅 Vedic Panchanga
${dateStr}
📍 ${location.city}, ${location.country}

🌙 Tithi: ${panchanga.tithi?.name || 'N/A'}
⭐ Nakshatra: ${panchanga.nakshatra?.name || 'N/A'}
♾️ Yoga: ${panchanga.yoga?.name || 'N/A'}
⚡ Karana: ${panchanga.karana?.name || 'N/A'}
📆 Vaara: ${panchanga.vaara?.name || 'N/A'}

☀️ Sunrise: ${formatTime(panchanga.sunrise)}
🌅 Sunset: ${formatTime(panchanga.sunset)}
🌙 Moonrise: ${formatTime(panchanga.moonrise)}
🌚 Moonset: ${formatTime(panchanga.moonset)}

✨ Abhijit Muhurta: ${formatTime(panchanga.abhijit_muhurta?.start)} - ${formatTime(
    panchanga.abhijit_muhurta?.end
  )}
⚠️ Rahu Kala: ${formatTime(panchanga.rahu_kala?.start)} - ${formatTime(
    panchanga.rahu_kala?.end
  )}

📱 Calculated using ${APP_INFO.NAME}
🌐 ${APP_INFO.WEBSITE}`;

  return message;
};

/**
 * Share Panchanga data
 */
export const sharePanchanga = async (
  panchangaData: any,
  location: any,
  date: Date
): Promise<boolean> => {
  try {
    const message = formatPanchangaForSharing(panchangaData, location, date);

    if (!message) {
      throw new Error('No data to share');
    }

    const shareOptions: ShareOptions = {
      title: `Panchanga for ${date.toLocaleDateString()}`,
      message,
      url: APP_INFO.WEBSITE,
    };

    const result = await Share.share(
      {
        message: Platform.OS === 'ios' ? message : `${message}\n\n${APP_INFO.WEBSITE}`,
        url: Platform.OS === 'ios' ? APP_INFO.WEBSITE : undefined,
        title: shareOptions.title,
      },
      {
        dialogTitle: shareOptions.title,
        subject: shareOptions.title,
      }
    );

    if (result.action === Share.sharedAction) {
      // Track successful share
      trackEvent('content_shared', {
        content_type: 'panchanga',
        share_method: result.activityType || 'unknown',
        location: location.city,
        date: date.toISOString(),
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Share failed:', error);
    trackEvent('share_failed', {
      error: error.message,
    });
    return false;
  }
};

/**
 * Share app link
 */
export const shareApp = async (): Promise<boolean> => {
  try {
    const message = `🕉️ Check out ${APP_INFO.NAME} - The most accurate Vedic Panchanga app!

Get daily panchanga, muhurta timings, planetary positions, and birth charts for any location worldwide.

✨ Features:
• Accurate Tithi & Nakshatra
• Muhurta timings
• Planetary positions
• Birth chart generation
• 100,000+ cities worldwide
• Works offline

Download now:
📱 iOS: https://apps.apple.com/app/vedic-panchanga
🤖 Android: https://play.google.com/store/apps/details?id=${APP_INFO.BUNDLE_ID_ANDROID}

🌐 ${APP_INFO.WEBSITE}`;

    const result = await Share.share(
      {
        message,
        url: Platform.OS === 'ios' ? APP_INFO.WEBSITE : undefined,
        title: `Download ${APP_INFO.NAME}`,
      },
      {
        dialogTitle: `Share ${APP_INFO.NAME}`,
        subject: `Download ${APP_INFO.NAME}`,
      }
    );

    if (result.action === Share.sharedAction) {
      trackEvent('app_shared', {
        share_method: result.activityType || 'unknown',
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('App share failed:', error);
    trackEvent('app_share_failed', {
      error: error.message,
    });
    return false;
  }
};

/**
 * Format planetary positions for sharing
 */
export const formatPlanetsForSharing = (planetsData: any[]): string => {
  if (!planetsData || planetsData.length === 0) {
    return '';
  }

  let message = '🌌 Planetary Positions\n\n';

  planetsData.forEach((planet) => {
    const name = planet.name || planet.planet;
    const sign = planet.zodiac_sign || planet.rashi?.rashi || '-';
    const nakshatra = planet.nakshatra || '-';
    const degree = planet.longitude ? `${planet.longitude.toFixed(2)}°` : '-';
    const retrograde = planet.retrograde ? ' (R)' : '';

    message += `${name}${retrograde}: ${sign} | ${nakshatra} | ${degree}\n`;
  });

  message += `\n📱 ${APP_INFO.NAME}\n🌐 ${APP_INFO.WEBSITE}`;

  return message;
};

/**
 * Create deep link for sharing specific date/location
 */
export const createDeepLink = (location: any, date: Date): string => {
  const params = new URLSearchParams({
    lat: location.latitude.toString(),
    lng: location.longitude.toString(),
    city: location.city,
    date: date.toISOString(),
  });

  return `${APP_INFO.WEBSITE}/panchanga?${params.toString()}`;
};

/**
 * Request app store review (after certain usage)
 */
export const requestReview = async () => {
  try {
    // TODO: Implement using expo-store-review
    // const { isAvailableAsync, requestReview } = StoreReview;
    // if (await isAvailableAsync()) {
    //   await requestReview();
    // }

    trackEvent('review_requested');
  } catch (error) {
    console.error('Review request failed:', error);
  }
};

/**
 * Get share message for specific muhurta
 */
export const formatMuhurtaForSharing = (
  muhurtaType: string,
  startTime: string,
  endTime: string,
  date: Date
): string => {
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const emoji = {
    abhijit: '✨',
    rahu_kala: '⚠️',
    yama_ganda: '🔥',
    gulika_kala: '⚡',
  };

  return `${emoji[muhurtaType] || '📅'} ${muhurtaType
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())}
${dateStr}
Time: ${startTime} - ${endTime}

📱 ${APP_INFO.NAME}
🌐 ${APP_INFO.WEBSITE}`;
};