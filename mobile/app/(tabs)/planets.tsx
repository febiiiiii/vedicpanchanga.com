import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, DataTable, useTheme, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../../lib/store';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function PlanetsScreen() {
  const theme = useTheme();
  const { panchangaData, isCalculating } = useStore();

  if (isCalculating) {
    return <LoadingSpinner fullScreen message="Loading planetary positions..." />;
  }

  // Check if we have planetary positions data
  if (!panchangaData || !panchangaData.planetary_positions) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge">
          Calculate Panchanga first to see planetary positions
        </Text>
      </View>
    );
  }

  // Handle both possible response structures:
  // 1. planetary_positions.positions (nested)
  // 2. planetary_positions as direct array
  const planets = Array.isArray(panchangaData.planetary_positions)
    ? panchangaData.planetary_positions
    : (panchangaData.planetary_positions?.positions || []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="Planetary Positions" style={styles.card}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Planet</DataTable.Title>
              <DataTable.Title>Sign</DataTable.Title>
              <DataTable.Title>Nakshatra</DataTable.Title>
              <DataTable.Title numeric>Degree</DataTable.Title>
            </DataTable.Header>

            {planets.map((planet, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>
                  <View style={styles.planetCell}>
                    <Text>{planet.name || planet.planet}</Text>
                    {planet.retrograde && (
                      <Chip compact mode="flat" style={styles.retrogradeChip}>
                        R
                      </Chip>
                    )}
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  {planet.zodiac_sign || planet.rashi?.rashi || '-'}
                </DataTable.Cell>
                <DataTable.Cell>
                  {planet.nakshatra} {planet.pada ? `(${planet.pada})` : ''}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {planet.longitude ? `${planet.longitude.toFixed(2)}°` : '-'}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card>

        {panchangaData.planetary_positions?.ascendant && (
          <Card title="Ascendant (Lagna)" style={styles.card}>
            <View style={styles.ascendantInfo}>
              <Text variant="bodyLarge">
                Sign: {panchangaData.planetary_positions.ascendant.zodiac_sign}
              </Text>
              <Text variant="bodyMedium">
                Nakshatra: {panchangaData.planetary_positions.ascendant.nakshatra}
                (Pada {panchangaData.planetary_positions.ascendant.pada})
              </Text>
              <Text variant="bodyMedium">
                Degree: {panchangaData.planetary_positions.ascendant.longitude.toFixed(2)}°
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  planetCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  retrogradeChip: {
    height: 20,
    backgroundColor: '#ff6b35',
  },
  ascendantInfo: {
    gap: 8,
  },
});