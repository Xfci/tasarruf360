import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function KonumSecici() {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);

  // Mevcut konumu al
  const handleGetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Konum izni reddedildi.");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    // Konumu ayarla
    setLocation({
      latitude,
      longitude,
    });

    // Konum bilgisini almak için ters geokodlama (coordinate -> address)
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const place = reverseGeocode[0];
      const formattedName = `${place.city || "Şehir bilinmiyor"}/${place.subregion || "Bölge bilinmiyor"}`;
      setLocationName(formattedName);
    } else {
      alert("Konum bilgisi alınamadı.");
    }
  };

  // Harita üzerinde konum seçildiğinde
  const handleRegionChange = async (region) => {
    const { latitude, longitude } = region;

    // Konum bilgisini almak için ters geokodlama (coordinate -> address)
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const place = reverseGeocode[0];
      const formattedName = `${place.city || "Şehir bilinmiyor"}/${place.subregion || "Bölge bilinmiyor"}`;
      setLocationName(formattedName);
    } else {
      setLocationName("Konum bilgisi alınamadı.");
    }

    // Seçilen konumu güncelle
    setLocation({
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Mevcut Konumumu Al" onPress={handleGetCurrentLocation} />
      <Text style={styles.locationText}>
        {locationName ? `Seçilen Konum: ${locationName}` : "Konum bilgisi yok"}
      </Text>

      {location && (
        <MapView
          region={location}
        >
          <Marker coordinate={location} title="Seçilen Konum" />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "50%",
    marginTop: 20,
  },
});
