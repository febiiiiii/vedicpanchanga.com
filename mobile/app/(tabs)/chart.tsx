import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, Dimensions, Platform } from 'react-native';
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
  const [imageError, setImageError] = useState(false);

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

  // Ensure base64 string is properly formatted
  const imageSource = panchangaData.birth_chart.startsWith('data:image/')
    ? panchangaData.birth_chart
    : `data:image/png;base64,${panchangaData.birth_chart}`;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="North Indian Birth Chart" style={styles.card}>
          <View style={styles.chartContainer}>
            {!imageError ? (
              <Image
                source={{ uri: imageSource }}
                style={[styles.chart, { width: chartSize, height: chartSize }]}
                resizeMode="contain"
                onError={(error) => {
                  console.error('Image loading error:', error);
                  setImageError(true);
                }}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <View style={[styles.errorContainer, { width: chartSize, height: chartSize }]}>
                <Text variant="bodyLarge" style={styles.errorText}>
                  Unable to display birth chart
                </Text>
                <Text variant="bodyMedium" style={styles.errorSubtext}>
                  Please try calculating again
                </Text>
              </View>
            )}
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
    borderRadius: 4, // Reduced from 8
  },
  errorContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4, // Reduced from 8
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  errorText: {
    marginBottom: 8,
  },
  errorSubtext: {
    opacity: 0.7,
  },
  dashaInfo: {
    gap: 8,
  },
  dashaDetail: {
    opacity: 0.8,
  },
});