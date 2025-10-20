import React, { useState } from 'react';
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
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const LocationPopup = () => {
  const [visible, setVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

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

      console.log(url);
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'zestfrontend-app' },
      });
      const address = response.data.address;
      const cityName =
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        'Unknown location';
      setCity(cityName);
    } catch (error) {
      console.log('Reverse geocoding error:', error);
      Alert.alert('Error', 'Could not get city name');
    }
  };

  const handleShareLocation = async () => {
    const hasPermission = await requestLocationPermission();
    console.log(hasPermission);
    if (!hasPermission) return;

    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
         console.log("inside getcurrentPosition")
        const { latitude, longitude } = position.coords;
        console.log(position.coords);
        setLocation({ latitude, longitude });
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
});

export default LocationPopup;
