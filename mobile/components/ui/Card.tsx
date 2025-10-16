import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Card as PaperCard, Text, useTheme } from 'react-native-paper';

interface CardProps extends ViewProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  mode?: 'elevated' | 'outlined' | 'contained';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  mode = 'elevated',
  onPress,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <PaperCard
      mode={mode}
      style={[styles.card, { borderRadius: 4 }, style]} // Reduced border radius
      onPress={onPress}
      {...props}
    >
      {(title || subtitle) && (
        <PaperCard.Title
          title={title}
          subtitle={subtitle}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
      )}
      <PaperCard.Content>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
};

interface InfoCardProps {
  label: string;
  value: string | React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  color,
  icon
}) => {
  const theme = useTheme();

  return (
    <View style={[
      styles.infoCard,
      { backgroundColor: color || theme.colors.secondaryContainer }
    ]}>
      <View style={styles.infoHeader}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text variant="labelMedium" style={styles.infoLabel}>
          {label}
        </Text>
      </View>
      {typeof value === 'string' ? (
        <Text variant="titleMedium" style={styles.infoValue}>
          {value}
        </Text>
      ) : (
        <View>{value}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
  },
  infoCard: {
    padding: 12,
    borderRadius: 3, // Reduced from 6
    marginVertical: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  infoLabel: {
    opacity: 0.7,
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontWeight: '500',
  },
});

export default Card;