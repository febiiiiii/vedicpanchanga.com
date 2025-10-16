import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {
  Searchbar,
  List,
  Divider,
  Surface,
  Text,
  Button,
  IconButton,
  useTheme,
  Chip,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Location as LocationType, CitySearchResult } from '../../lib/api/types';
import useStore from '../../lib/store';
import apiClient from '../../lib/api/client';
import { debounce } from 'lodash';

interface CitySearchProps {
  location: LocationType;
  onLocationChange: (location: LocationType) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  location,
  onLocationChange,
}) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const savedLocations = useStore((state) => state.savedLocations);
  const recentSearches = useStore((state) => state.recentSearches);
  const searchCities = useStore((state) => state.searchCities);
  const saveLocation = useStore((state) => state.saveLocation);
  const setLocation = useStore((state) => state.setLocation);

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchCities(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300)
  ).current;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleLocationSelect = async (city: CitySearchResult) => {
    // Get timezone if not provided
    let timezone = city.timezone;
    if (!timezone) {
      timezone = await apiClient.getTimezone(city.latitude, city.longitude);
    }

    const newLocation: LocationType = {
      city: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone,
    };

    onLocationChange(newLocation);
    setLocation(newLocation);
    setShowModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      // Get current position
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode to get city name
      const [reverseGeocode] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Get timezone
      const timezone = await apiClient.getTimezone(latitude, longitude);

      const currentLocation: LocationType = {
        city: reverseGeocode?.city || reverseGeocode?.subregion || 'Current Location',
        country: reverseGeocode?.country || '',
        latitude,
        longitude,
        timezone,
      };

      onLocationChange(currentLocation);
      setLocation(currentLocation);
      setShowModal(false);
    } catch (error) {
      console.error('Location error:', error);
      alert('Unable to get current location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const renderSearchResult = ({ item }: { item: CitySearchResult }) => (
    <List.Item
      title={item.name}
      description={`${item.state ? item.state + ', ' : ''}${item.country}`}
      left={(props) => <List.Icon {...props} icon="map-marker" />}
      right={(props) => (
        <Text variant="labelSmall" style={styles.coords}>
          {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
        </Text>
      )}
      onPress={() => handleLocationSelect(item)}
    />
  );

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Surface style={styles.locationDisplay} elevation={1}>
          <View style={styles.locationContent}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={theme.colors.primary}
            />
            <View style={styles.locationText}>
              <Text variant="labelSmall" style={styles.label}>
                Location
              </Text>
              <Text variant="bodyLarge" style={styles.value}>
                {location.city}
              </Text>
              <Text variant="bodySmall" style={styles.subtitle}>
                {location.country} • {location.timezone}
              </Text>
            </View>
          </View>
          <IconButton
            icon="chevron-down"
            size={24}
            onPress={() => setShowModal(true)}
          />
        </Surface>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[styles.modal, { backgroundColor: theme.colors.background }]}>
          <View style={styles.header}>
            <Text variant="titleLarge">Select Location</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setShowModal(false)}
            />
          </View>

          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search for a city..."
              onChangeText={handleSearchChange}
              value={searchQuery}
              loading={isSearching}
              style={styles.searchbar}
            />
          </View>

          <Button
            mode="contained-tonal"
            onPress={handleGetCurrentLocation}
            loading={isGettingLocation}
            icon="crosshairs-gps"
            style={styles.currentLocationButton}
          >
            Use Current Location
          </Button>

          {searchQuery.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => `${item.latitude}-${item.longitude}`}
              renderItem={renderSearchResult}
              ItemSeparatorComponent={() => <Divider />}
              ListEmptyComponent={
                !isSearching ? (
                  <View style={styles.emptyContainer}>
                    <Text variant="bodyMedium">No cities found</Text>
                  </View>
                ) : null
              }
            />
          ) : (
            <ScrollView>
              {savedLocations.length > 0 && (
                <>
                  <List.Subheader>Saved Locations</List.Subheader>
                  {savedLocations.map((loc, index) => (
                    <List.Item
                      key={index}
                      title={loc.city}
                      description={loc.country}
                      left={(props) => <List.Icon {...props} icon="star" />}
                      onPress={() => {
                        onLocationChange(loc);
                        setLocation(loc);
                        setShowModal(false);
                      }}
                    />
                  ))}
                  <Divider />
                </>
              )}

              {recentSearches.length > 0 && (
                <>
                  <List.Subheader>Recent Searches</List.Subheader>
                  {recentSearches.slice(0, 5).map((city, index) => (
                    <List.Item
                      key={index}
                      title={city.name}
                      description={city.country}
                      left={(props) => <List.Icon {...props} icon="history" />}
                      onPress={() => handleLocationSelect(city)}
                    />
                  ))}
                </>
              )}

              <List.Subheader>Popular Cities</List.Subheader>
              {POPULAR_CITIES.map((city, index) => (
                <List.Item
                  key={index}
                  title={city.city}
                  description={city.country}
                  left={(props) => <List.Icon {...props} icon="city" />}
                  onPress={() => {
                    onLocationChange(city);
                    setLocation(city);
                    setShowModal(false);
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </>
  );
};

const POPULAR_CITIES: LocationType[] = [
  {
    city: 'Ujjain',
    country: 'India',
    latitude: 23.1765,
    longitude: 75.7885,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'New Delhi',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'Mumbai',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: 'Asia/Kolkata',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
  },
  {
    city: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York',
  },
];

const styles = StyleSheet.create({
  locationDisplay: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 6,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    opacity: 0.6,
    marginBottom: 2,
  },
  value: {
    fontWeight: '500',
  },
  subtitle: {
    opacity: 0.6,
    marginTop: 2,
  },
  coords: {
    opacity: 0.6,
  },
  modal: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    padding: 16,
  },
  searchbar: {
    elevation: 0,
  },
  currentLocationButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
});

export default CitySearch;