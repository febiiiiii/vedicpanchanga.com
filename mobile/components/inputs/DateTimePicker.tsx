import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DateTimePickerModule, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Button, Text, useTheme, IconButton, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

interface DateTimePickerProps {
  date: Date;
  time: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  time,
  onDateChange,
  onTimeChange,
}) => {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  // Parse time string to Date object
  const getTimeDate = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const timeDate = new Date();
    timeDate.setHours(hours || 0);
    timeDate.setMinutes(minutes || 0);
    return timeDate;
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      onTimeChange(`${hours}:${minutes}`);
    }
  };

  const handleSetToNow = () => {
    const now = new Date();
    onDateChange(now);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    onTimeChange(`${hours}:${minutes}`);
  };

  const openIOSPicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setShowIOSPicker(true);
  };

  const renderIOSPicker = () => (
    <Modal
      visible={showIOSPicker}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowIOSPicker(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.modalHeader}>
            <Button onPress={() => setShowIOSPicker(false)}>Cancel</Button>
            <Text variant="titleMedium">
              {pickerMode === 'date' ? 'Select Date' : 'Select Time'}
            </Text>
            <Button onPress={() => setShowIOSPicker(false)}>Done</Button>
          </View>
          <DateTimePickerModule
            value={pickerMode === 'date' ? date : getTimeDate()}
            mode={pickerMode}
            display="spinner"
            onChange={pickerMode === 'date' ? handleDateChange : handleTimeChange}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.surface} elevation={1}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => {
              if (Platform.OS === 'ios') {
                openIOSPicker('date');
              } else {
                setShowDatePicker(true);
              }
            }}
          >
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={theme.colors.primary}
              />
              <View style={styles.textContainer}>
                <Text variant="labelSmall" style={styles.label}>
                  Date
                </Text>
                <Text variant="bodyLarge" style={styles.value}>
                  {format(date, 'MMM dd, yyyy')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.timeContainer}
            onPress={() => {
              if (Platform.OS === 'ios') {
                openIOSPicker('time');
              } else {
                setShowTimePicker(true);
              }
            }}
          >
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={theme.colors.primary}
              />
              <View style={styles.textContainer}>
                <Text variant="labelSmall" style={styles.label}>
                  Time
                </Text>
                <Text variant="bodyLarge" style={styles.value}>
                  {time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Button
          mode="text"
          onPress={handleSetToNow}
          icon="clock-fast"
          style={styles.nowButton}
        >
          Set to Now
        </Button>
      </Surface>

      {/* Android Date Picker */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePickerModule
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Android Time Picker */}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePickerModule
          value={getTimeDate()}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={handleTimeChange}
        />
      )}

      {/* iOS Modal Picker */}
      {Platform.OS === 'ios' && renderIOSPicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  surface: {
    borderRadius: 6,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  textContainer: {
    marginLeft: 12,
  },
  label: {
    opacity: 0.6,
    marginBottom: 2,
  },
  value: {
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  nowButton: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default DateTimePicker;