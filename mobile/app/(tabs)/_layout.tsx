import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.surfaceVariant,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Panchanga',
          tabBarLabel: 'Panchanga',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-star" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="planets"
        options={{
          title: 'Planets',
          tabBarLabel: 'Planets',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="orbit" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: 'Chart',
          tabBarLabel: 'Chart',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-box-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="muhurta"
        options={{
          title: 'Muhurta',
          tabBarLabel: 'Muhurta',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock-star-four-points" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}