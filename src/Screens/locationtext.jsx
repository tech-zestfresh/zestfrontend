import React, { useEffect, useState ,View} from "react";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform } from "react-native";

const locationtext = () => {
  const [locationText, setLocationText] = useState("Fetching location...");

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const geoResponse = await Geocoder.from(latitude, longitude);
            const address = geoResponse.results[0].address_components;
            const locality = address.find((c) => c.types.includes("locality"))?.long_name;
            const state = address.find((c) => c.types.includes("administrative_area_level_1"))?.short_name;
            setLocationText(`${locality || "Your area"}, ${state || ""}`);
          } catch (error) {
            console.warn("Geocoding error:", error);
            setLocationText("Location unavailable");
          }
        },
        (error) => {
          console.warn("Location error:", error);
          setLocationText("Location unavailable");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View>
      <Text>Location2</Text>
      <Text>{locationText}</Text>
    </View>
  )
}

export default locationtext