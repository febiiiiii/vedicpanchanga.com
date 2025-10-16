import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import useStore from '../lib/store/index';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync();

// Custom theme colors matching the web app
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#ff6b35',
    secondary: '#ff9558',
    tertiary: '#ffe5d9',
    surface: '#ffffff',
    background: '#fafafa',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ff6b35',
    secondary: '#ff9558',
    tertiary: '#2c2416',
    surface: '#1a1a1a',
    background: '#0a0a0a',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const settings = useStore((state) => state.settings);

  // Determine theme based on settings
  const theme = settings.theme === 'auto'
    ? (colorScheme === 'dark' ? darkTheme : lightTheme)
    : settings.theme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    // Hide splash screen once app is ready
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style={settings.theme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="settings/index"
            options={{
              title: 'Settings',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="settings/locations"
            options={{
              title: 'Saved Locations',
            }}
          />
          <Stack.Screen
            name="settings/preferences"
            options={{
              title: 'Preferences',
            }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}