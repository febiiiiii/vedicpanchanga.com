import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'large',
  fullScreen = false
}) => {
  const theme = useTheme();

  const content = (
    <>
      <ActivityIndicator
        animating={true}
        size={size}
        color={theme.colors.primary}
      />
      {message && (
        <Text
          variant="bodyMedium"
          style={[styles.message, { color: theme.colors.onSurface }]}
        >
          {message}
        </Text>
      )}
    </>
  );

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: theme.colors.background }]}>
        {content}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoadingSpinner;