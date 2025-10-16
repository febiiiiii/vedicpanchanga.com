import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme, List, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useStore from '../../lib/store';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

interface MuhurtaItem {
  name: string;
  start: string;
  end: string;
  type: 'good' | 'bad' | 'neutral';
  description?: string;
}

export default function MuhurtaScreen() {
  const theme = useTheme();
  const { panchangaData, isCalculating } = useStore();

  if (isCalculating) {
    return <LoadingSpinner fullScreen message="Loading muhurta timings..." />;
  }

  if (!panchangaData?.panchanga) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge">
          Calculate Panchanga first to see muhurta timings
        </Text>
      </View>
    );
  }

  const getMuhurtaItems = (): MuhurtaItem[] => {
    const items: MuhurtaItem[] = [];
    const muhurta = panchangaData.panchanga.muhurta;

    if (muhurta?.abhijit) {
      items.push({
        name: 'Abhijit Muhurta',
        start: muhurta.abhijit.start,
        end: muhurta.abhijit.end,
        type: 'good',
        description: 'Most auspicious time of the day'
      });
    }

    if (muhurta?.rahuKala) {
      items.push({
        name: 'Rahu Kala',
        start: muhurta.rahuKala.start,
        end: muhurta.rahuKala.end,
        type: 'bad',
        description: 'Inauspicious time, avoid important activities'
      });
    }

    if (muhurta?.yamaGanda) {
      items.push({
        name: 'Yama Ganda',
        start: muhurta.yamaGanda.start,
        end: muhurta.yamaGanda.end,
        type: 'bad',
        description: 'Inauspicious period ruled by Yama'
      });
    }

    if (muhurta?.gulikaKala) {
      items.push({
        name: 'Gulika Kala',
        start: muhurta.gulikaKala.start,
        end: muhurta.gulikaKala.end,
        type: 'bad',
        description: 'Inauspicious time ruled by Saturn'
      });
    }

    return items;
  };

  const getMuhurtaIcon = (type: MuhurtaItem['type']) => {
    switch (type) {
      case 'good':
        return 'check-circle';
      case 'bad':
        return 'alert-circle';
      default:
        return 'information';
    }
  };

  const getMuhurtaColor = (type: MuhurtaItem['type']) => {
    switch (type) {
      case 'good':
        return '#4CAF50';
      case 'bad':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const muhurtaItems = getMuhurtaItems();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card title="Today's Muhurta Timings" style={styles.card}>
          <List.Section>
            {muhurtaItems.map((item, index) => (
              <View key={index}>
                <List.Item
                  title={item.name}
                  description={item.description}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={getMuhurtaIcon(item.type)}
                      color={getMuhurtaColor(item.type)}
                    />
                  )}
                  right={() => (
                    <View style={styles.timeContainer}>
                      <Text variant="bodyMedium" style={styles.timeText}>
                        {item.start} - {item.end}
                      </Text>
                      <Chip
                        mode="flat"
                        compact
                        style={[
                          styles.typeChip,
                          { backgroundColor: getMuhurtaColor(item.type) + '20' }
                        ]}
                        textStyle={{ color: getMuhurtaColor(item.type) }}
                      >
                        {item.type === 'good' ? 'Auspicious' : 'Inauspicious'}
                      </Chip>
                    </View>
                  )}
                />
                {index < muhurtaItems.length - 1 && <List.Section />}
              </View>
            ))}
          </List.Section>
        </Card>

        <Card title="Guidelines" style={styles.card}>
          <View style={styles.guidelineItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#4CAF50"
            />
            <Text variant="bodyMedium" style={styles.guidelineText}>
              Abhijit Muhurta is considered universally auspicious for all activities
            </Text>
          </View>

          <View style={styles.guidelineItem}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color="#F44336"
            />
            <Text variant="bodyMedium" style={styles.guidelineText}>
              Avoid starting new ventures during Rahu Kala, Yama Ganda, and Gulika Kala
            </Text>
          </View>

          <View style={styles.guidelineItem}>
            <MaterialCommunityIcons
              name="information"
              size={20}
              color="#2196F3"
            />
            <Text variant="bodyMedium" style={styles.guidelineText}>
              These timings vary based on location and change daily
            </Text>
          </View>
        </Card>
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
  timeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  timeText: {
    fontWeight: '500',
  },
  typeChip: {
    marginTop: 4,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  guidelineText: {
    flex: 1,
    lineHeight: 20,
  },
});