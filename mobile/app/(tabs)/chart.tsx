import React from 'react';
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../../lib/store';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

const { width: screenWidth } = Dimensions.get('window');
const chartSize = screenWidth - 32; // Account for padding

export default function ChartScreen() {
  const theme = useTheme();
  const { panchangaData, isCalculating } = useStore();

  if (isCalculating) {
    return <LoadingSpinner fullScreen message="Loading birth chart..." />;
  }

  if (!panchangaData?.birth_chart) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge">
          Calculate Panchanga first to see birth chart
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="North Indian Birth Chart" style={styles.card}>
          <View style={styles.chartContainer}>
            <Image
              source={{ uri: `data:image/png;base64,${panchangaData.birth_chart}` }}
              style={[styles.chart, { width: chartSize, height: chartSize }]}
              resizeMode="contain"
            />
          </View>
        </Card>

        {panchangaData.dasha?.current_mahadasha && (
          <Card title="Current Vimsottari Dasha" style={styles.card}>
            <View style={styles.dashaInfo}>
              <Text variant="titleMedium">
                {panchangaData.dasha.current_mahadasha.planet} Mahadasha
              </Text>
              <Text variant="bodyMedium" style={styles.dashaDetail}>
                Started: {new Date(panchangaData.dasha.current_mahadasha.start_date).toLocaleDateString()}
              </Text>
              <Text variant="bodyMedium" style={styles.dashaDetail}>
                Ends: {new Date(panchangaData.dasha.current_mahadasha.end_date).toLocaleDateString()}
              </Text>
              <Text variant="bodyMedium" style={styles.dashaDetail}>
                Duration: {panchangaData.dasha.current_mahadasha.duration} years
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
  chartContainer: {
    alignItems: 'center',
    padding: 8,
  },
  chart: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dashaInfo: {
    gap: 8,
  },
  dashaDetail: {
    opacity: 0.8,
  },
});