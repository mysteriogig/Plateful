import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WantedScreen = () => {
  const [wantedListings, setWantedListings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFoodData = async () => {
      const response = require('../foodListing.json');
      const filteredData = response.filter(item => item.category === 'wanted');
      setWantedListings(filteredData);
    };
    fetchFoodData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ListDetails', { item })}
    >
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.itemType}>{item.type}</Text>
          <Text style={styles.itemPlace}>{item.place}</Text>
        </View>
        <Text style={styles.lineIcon}>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listingContainer}>
      <FlatList
        data={wantedListings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemType: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  itemPlace: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  lineIcon: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default WantedScreen;
