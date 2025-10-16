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

import useStore from '../../lib/store';
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
                  {tithi.paksha} Paksha • {tithi.percentage.toFixed(1)}%
                </Text>
                <Text variant="bodySmall" style={styles.endTime}>
                  Until {tithi.endTime}
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
                  Pada {nakshatra.pada} • Lord: {nakshatra.lord}
                </Text>
                <Text variant="bodySmall" style={styles.endTime}>
                  Until {nakshatra.endTime}
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
                  Until {yoga.endTime}
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
                  Until {karana.endTime}
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
            <Text variant="titleMedium">{sunrise}</Text>
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
            <Text variant="titleMedium">{sunset}</Text>
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
            <Text variant="titleMedium">{moonrise}</Text>
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
            <Text variant="titleMedium">{moonset}</Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderMuhurta = () => {
    if (!panchangaData?.panchanga?.muhurta) return null;

    const { abhijit, rahuKala, yamaGanda, gulikaKala } = panchangaData.panchanga.muhurta;

    return (
      <Card title="Muhurta Timings" style={styles.card}>
        {abhijit && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#4CAF50' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Abhijit Muhurta</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {abhijit.start} - {abhijit.end}
              </Text>
            </View>
          </View>
        )}

        {rahuKala && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#F44336' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Rahu Kala</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {rahuKala.start} - {rahuKala.end}
              </Text>
            </View>
          </View>
        )}

        {yamaGanda && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#FF9800' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Yama Ganda</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {yamaGanda.start} - {yamaGanda.end}
              </Text>
            </View>
          </View>
        )}

        {gulikaKala && (
          <View style={styles.muhurtaItem}>
            <View style={[styles.muhurtaIndicator, { backgroundColor: '#9C27B0' }]} />
            <View style={styles.muhurtaContent}>
              <Text variant="titleSmall">Gulika Kala</Text>
              <Text variant="bodyMedium" style={styles.muhurtaTiming}>
                {gulikaKala.start} - {gulikaKala.end}
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
            {panchangaData.panchanga.calendar && (
              <Card title="Vedic Calendar" style={styles.card}>
                <View style={styles.calendarGrid}>
                  <InfoCard
                    label="Masa"
                    value={
                      typeof panchangaData.panchanga.calendar.masa === 'object'
                        ? panchangaData.panchanga.calendar.masa.name
                        : panchangaData.panchanga.calendar.masa
                    }
                  />
                  <InfoCard
                    label="Ritu"
                    value={
                      typeof panchangaData.panchanga.calendar.ritu === 'object'
                        ? panchangaData.panchanga.calendar.ritu.name
                        : panchangaData.panchanga.calendar.ritu
                    }
                  />
                  <InfoCard
                    label="Samvatsara"
                    value={
                      typeof panchangaData.panchanga.calendar.samvatsara === 'object'
                        ? panchangaData.panchanga.calendar.samvatsara.name
                        : panchangaData.panchanga.calendar.samvatsara
                    }
                  />
                  <InfoCard
                    label="Ayanamsha"
                    value={`${panchangaData.panchanga.ayanamsha.toFixed(4)}°`}
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
    borderRadius: 8,
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