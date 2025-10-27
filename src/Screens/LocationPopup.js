import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
  AppState,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_KEY = 'cached_location';
const CITY_KEY = 'cached_city';
const TIMESTAMP_KEY = 'cached_location_timestamp';

const LocationPopup = () => {
  const [visible, setVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const loadCachedLocation = async () => {
      try {
        const loc = await AsyncStorage.getItem(LOCATION_KEY);
        const cityName = await AsyncStorage.getItem(CITY_KEY);
        const timestamp = await AsyncStorage.getItem(TIMESTAMP_KEY);
        if (loc) setLocation(JSON.parse(loc));
        if (cityName) setCity(cityName);
        if (timestamp) setLastUpdated(new Date(parseInt(timestamp)));
      } catch (err) {
        console.log('Failed to load cached location:', err);
      }
    };
    loadCachedLocation();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        handleShareLocation(); // Auto-refresh
      }
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, [appState]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access',
          message: 'We need your location to help you find our best available products.',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Please enable location from settings');
        return false;
      }
    }
    return true;
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'zestfrontend-app' },
      });
      const address = response.data.address;
      const cityName =
        address.city || address.town || address.village || address.suburb || 'Unknown location';
      setCity(cityName);
      await AsyncStorage.setItem(CITY_KEY, cityName);
    } catch (error) {
      console.log('Reverse geocoding error:', error);
      Alert.alert('Error', 'Could not get city name');
    }
  };

  const handleShareLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const locObj = { latitude, longitude };
        const timestamp = Date.now();

        setLocation(locObj);
        setLastUpdated(new Date(timestamp));

        await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(locObj));
        await AsyncStorage.setItem(TIMESTAMP_KEY, timestamp.toString());

        await reverseGeocode(latitude, longitude);
        setLoading(false);
        setVisible(false);
      },
      error => {
        console.log(error);
        setLoading(false);
        Alert.alert('Error', 'Unable to fetch location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }}
              style={styles.icon}
            />
            <Text style={styles.title}>Share your location</Text>
            <Text style={styles.subtitle}>
              We need your location to help you find our best available products.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleShareLocation}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Allow Location Access</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.skipText}>Maybe later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {location && (
        <View style={styles.locationInfo}>
          <Text style={styles.locText}>
            📍 {city
              ? `You are in ${city}`
              : `Lat: ${location.latitude.toFixed(4)}, Lon: ${location.longitude.toFixed(4)}`}
          </Text>
          {lastUpdated && (
            <Text style={styles.timestamp}>
              Last updated: {lastUpdated.toLocaleString()}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#555', marginTop: 12 }]}
            onPress={handleShareLocation}
          >
            <Text style={styles.buttonText}>Refresh Location</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e23744',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    color: '#e23744',
    fontSize: 14,
    marginTop: 4,
  },
  locationInfo: {
    alignItems: 'center',
    marginTop: 40,
  },
  locText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default LocationPopup;