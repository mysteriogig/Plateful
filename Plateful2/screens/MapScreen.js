import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import foodListings from '../foodListing.json'; // Ensure the path to `foodListing.json` is correct.

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Optional: Reset the map region when the component mounts
  useEffect(() => {
    setRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Use `region` instead of `initialRegion`
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Keep track of region changes
      >
        {foodListings.map((listing) => (
          <Marker
            key={listing.id}
            coordinate={{
              latitude: listing.latitude,
              longitude: listing.longitude,
            }}
            pinColor={listing.category === 'wanted' ? 'red' : 'green'}
          >
            <Callout>
              <View>
                <Text style={styles.title}>{listing.type}</Text>
                <Text>Category: {listing.category === 'wanted' ? 'Wanted' : 'Available'}</Text>
                <Text>Price: {listing.price}</Text>
                <Text>Location: {listing.place}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;
