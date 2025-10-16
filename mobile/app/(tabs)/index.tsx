import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import {
  FAB,
  Surface,
  Text,
  useTheme,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useStore from '../../lib/store/index';
import { DateTimePicker } from '../../components/inputs/DateTimePicker';
import { CitySearch } from '../../components/inputs/CitySearch';
import { Card, InfoCard } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function PanchangaScreen() {
  const theme = useTheme();

  // Store state
  const {
    currentLocation,
    selectedDate,
    selectedTime,
    panchangaData,
    isCalculating,
    error,
    setLocation,
    setDateTime,
    calculatePanchanga,
  } = useStore();

  // Auto-calculate on mount if location is set
  useEffect(() => {
    if (currentLocation && !panchangaData) {
      calculatePanchanga();
    }
  }, []);

  const handleRefresh = () => {
    calculatePanchanga();
  };

  // Helper function to format TimeValue to string
  const formatTimeValue = (time: any): string => {
    if (!time) return '--:--';
    if (typeof time === 'string') return time;
    if (time.hours !== undefined && time.minutes !== undefined) {
      const h = String(time.hours).padStart(2, '0');
      const m = String(time.minutes).padStart(2, '0');
      return `${h}:${m}`;
    }
    return '--:--';
  };

  const renderPanchangaElements = () => {
    if (!panchangaData?.panchanga) return null;

    const { tithi, nakshatra, yoga, karana, vaara } = panchangaData.panchanga;

    return (
      <Card title="Panchanga Elements" style={styles.card}>
        <View style={styles.elementsGrid}>
          <InfoCard
            label="Tithi"
            value={
              <View>
                <Text variant="titleMedium">{tithi.name}</Text>
                <Text variant="bodySmall" style={styles.subtitle}>
                  Index: {tithi.index}
                </Text>
                <Text variant="bodySmall" style={styles.endTime}>
                  Until {formatTimeValue(tithi.end_time)}
                </Text>
              </View>
            }
            color={theme.colors.secondaryContainer}
            icon={
              <MaterialCommunityIcons
                name="moon-waning-crescent"
                size={20}
                color={theme.colors.onSecondaryContainer}
              />
            }
          />

          <InfoCard
            label="Nakshatra"
            value={
              <View>
                <Text variant="titleMedium">{nakshatra.name}</Text>
                <Text variant="bodySmall" style={styles.subtitle}>
                  Index: {nakshatra.index}
                </Text>
                <Text variant="bodySmall" style={styles.endTime}>
                  Until {formatTimeValue(nakshatra.end_time)}
                </Text>
              </View>
            }
            color={theme.colors.tertiaryContainer}
            icon={
              <MaterialCommunityIcons
                name="star-four-points"
                size={20}
                color={theme.colors.onTertiaryContainer}
              />
            }
          />

          <InfoCard
            label="Yoga"
            value={
              <View>
                <Text variant="titleMedium">{yoga.name}</Text>
                <Text variant="bodySmall" style={styles.endTime}>
                  Until {formatTimeValue(yoga.end_time)}
                </Text>
              </View>
            }
            color={theme.colors.primaryContainer}
            icon={
              <MaterialCommunityIcons
                name="infinity"
                size={20}
                color={theme.colors.onPrimaryContainer}
              />
            }
          />

          <InfoCard
            label="Karana"
            value={
              <View>
                <Text variant="titleMedium">{karana.name}</Text>
                <Text variant="bodySmall" style={styles.endTime}>
                  Until {formatTimeValue(karana.end_time)}
                </Text>
              </View>
            }
            color={theme.colors.errorContainer}
            icon={
              <MaterialCommunityIcons
                name="circle-half-full"
                size={20}
                color={theme.colors.onErrorContainer}
              />
            }
          />

          <InfoCard
            label="Vaara"
            value={
              <View>
                <Text variant="titleMedium">{vaara.name}</Text>
                <Text variant="bodySmall" style={styles.subtitle}>
                  Lord: {vaara.lord}
                </Text>
              </View>
            }
            color={theme.colors.surfaceVariant}
            icon={
              <MaterialCommunityIcons
                name="calendar-today"
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
            }
          />
        </View>
      </Card>
    );
  };

  const renderSunMoonTimings = () => {
    if (!panchangaData?.panchanga) return null;

    const { sunrise, sunset, moonrise, moonset } = panchangaData.panchanga;

    return (
      <Card title="Sun & Moon Timings" style={styles.card}>
        <View style={styles.timingsGrid}>
          <View style={styles.timingItem}>
            <MaterialCommunityIcons
              name="weather-sunny"
              size={24}
              color="#FFA500"
            />
            <Text variant="labelSmall" style={styles.timingLabel}>
              Sunrise
            </Text>
            <Text variant="titleMedium">{formatTimeValue(sunrise)}</Text>
          </View>

          <View style={styles.timingItem}>
            <MaterialCommunityIcons
              name="weather-sunset"
              size={24}
              color="#FF6B35"
            />
            <Text variant="labelSmall" style={styles.timingLabel}>
              Sunset
            </Text>
            <Text variant="titleMedium">{formatTimeValue(sunset)}</Text>
          </View>

          <View style={styles.timingItem}>
            <MaterialCommunityIcons
              name="moon-waxing-crescent"
              size={24}
              color="#B0C4DE"
            />
            <Text variant="labelSmall" style={styles.timingLabel}>
              Moonrise
            </Text>
            <Text variant="titleMedium">{formatTimeValue(moonrise)}</Text>
          </View>

          <View style={styles.timingItem}>
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={24}
              color="#708090"
            />
            <Text variant="labelSmall" style={styles.timingLabel}>
              Moonset
            </Text>
            <Text variant="titleMedium">{formatTimeValue(moonset)}</Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderMuhurta = () => {
    if (!panchangaData?.panchanga) return null;

    const { abhijit_muhurta, rahu_kala, yama_ganda, gulika_kala } = panchangaData.panchanga;

    return (
      <Card title="Muhurta Timings" style={styles.card}>
        {abhijit_muhurta && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#4CAF50' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Abhijit Muhurta</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {formatTimeValue(abhijit_muhurta.start)} - {formatTimeValue(abhijit_muhurta.end)}
              </Text>
            </View>
          </View>
        )}

        {rahu_kala && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#F44336' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Rahu Kala</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {formatTimeValue(rahu_kala.start)} - {formatTimeValue(rahu_kala.end)}
              </Text>
            </View>
          </View>
        )}

        {yama_ganda && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#FF9800' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Yama Ganda</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {formatTimeValue(yama_ganda.start)} - {formatTimeValue(yama_ganda.end)}
              </Text>
            </View>
          </View>
        )}

        {gulika_kala && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#9C27B0' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Gulika Kala</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {formatTimeValue(gulika_kala.start)} - {formatTimeValue(gulika_kala.end)}
              </Text>
            </View>
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isCalculating}
            onRefresh={handleRefresh}
          />
        }
      >
        {/* Date and Time Picker */}
        <DateTimePicker
          date={selectedDate}
          time={selectedTime}
          onDateChange={(date) => setDateTime(date, selectedTime)}
          onTimeChange={(time) => setDateTime(selectedDate, time)}
        />

        {/* Location Search */}
        <CitySearch
          location={currentLocation}
          onLocationChange={setLocation}
        />

        {/* Error Message */}
        {error && (
          <Surface style={styles.errorContainer} elevation={1}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color={theme.colors.error}
            />
            <Text variant="bodyMedium" style={styles.errorText}>
              {error}
            </Text>
          </Surface>
        )}

        {/* Loading State */}
        {isCalculating && <LoadingSpinner message="Calculating Panchanga..." />}

        {/* Results */}
        {panchangaData && !isCalculating && (
          <>
            {renderSunMoonTimings()}
            {renderPanchangaElements()}
            {renderMuhurta()}

            {/* Vedic Calendar */}
            {panchangaData.panchanga && (
              <Card title="Vedic Calendar" style={styles.card}>
                <View style={styles.calendarGrid}>
                  <InfoCard
                    label="Masa"
                    value={panchangaData.panchanga.masa?.name || 'N/A'}
                  />
                  <InfoCard
                    label="Ritu"
                    value={panchangaData.panchanga.ritu?.name || 'N/A'}
                  />
                  <InfoCard
                    label="Samvatsara"
                    value={panchangaData.panchanga.samvatsara?.name || 'N/A'}
                  />
                  <InfoCard
                    label="Ayanamsha"
                    value={`${panchangaData.panchanga.ayanamsha?.toFixed(4) || 0}°`}
                  />
                  <InfoCard
                    label="Saka Year"
                    value={`${panchangaData.panchanga.saka_year || 'N/A'}`}
                  />
                  <InfoCard
                    label="Kali Year"
                    value={`${panchangaData.panchanga.kali_year || 'N/A'}`}
                  />
                </View>
              </Card>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="calculator"
        onPress={calculatePanchanga}
        label="Calculate"
        loading={isCalculating}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 8,
  },
  elementsGrid: {
    gap: 8,
  },
  timingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timingItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  timingLabel: {
    marginTop: 4,
    opacity: 0.6,
  },
  muhurtaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  muhurtaIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  muhurtaContent: {
    flex: 1,
  },
  muhurtaTiming: {
    marginTop: 2,
    fontWeight: '500',
  },
  calendarGrid: {
    gap: 8,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 2,
  },
  endTime: {
    opacity: 0.6,
    marginTop: 4,
    fontSize: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    borderRadius: 4,
  },
  errorText: {
    marginLeft: 8,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});