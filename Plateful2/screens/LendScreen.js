import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'; // For dropdown picker

const LendingScreen = () => {
  const [lendingListings, setLendingListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filter, setFilter] = useState(null);
  const [open, setOpen] = useState(false); // Control dropdown
  const [selectedItem, setSelectedItem] = useState(null); // Selected filter (only one at a time)
  const navigation = useNavigation();

  // Fetch mock data
  useEffect(() => {
    const fetchFoodData = async () => {
      const response = require('../foodListing.json'); // Mocked JSON file
      setLendingListings(response);
      setFilteredListings(response);
    };
    fetchFoodData();
  }, []);

  // Apply filter whenever `selectedItem` changes
  useEffect(() => {
    if (selectedItem) {
      applyFilter();
    }
  }, [selectedItem]);

  // Filter logic
  const applyFilter = () => {
    let filteredData = lendingListings;

    if (selectedItem === 'Perishable') {
      filteredData = filteredData.filter(item => item.perishable === true);
    }

    if (selectedItem === 'Non-Perishable') {
      filteredData = filteredData.filter(item => item.perishable === false);
    }

    if (selectedItem === 'Free') {
      filteredData = filteredData.filter(item => item.free === true); // Updated to use the 'free' field
    }

    if (selectedItem === 'Time') {
      filteredData = [...filteredData].sort((a, b) => new Date(a.time) - new Date(b.time));
    }

    if (selectedItem === 'Distance') {
      filteredData = [...filteredData].sort((a, b) => a.distance - b.distance);
    }

    setFilteredListings(filteredData);
  };

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
        <View style={styles.rightContainer}>
          <Text style={styles.itemPrice}>{item.free ? 'Free' : `₹${item.price}`}</Text>
          <Text style={styles.lineIcon}>{'>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listingContainer}>
      <View style={styles.filterContainer}>
        <DropDownPicker
          open={open}
          value={selectedItem}
          items={[
            { label: 'Perishable', value: 'Perishable' },
            { label: 'Non-Perishable', value: 'Non-Perishable' },
            { label: 'Free', value: 'Free' },
            { label: 'Time', value: 'Time' },
            { label: 'Distance', value: 'Distance' },
          ]}
          setOpen={setOpen}
          setValue={setSelectedItem} // Directly set selectedItem
          placeholder="Select Filter"
          containerStyle={styles.dropdownContainer}
          dropDownStyle={styles.dropdownStyle}
          multiple={false} // Disable multiple selections
        />
      </View>

      {filteredListings.length === 0 ? (
        <Text style={styles.noListingsText}>No listings available</Text>
      ) : (
        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    marginRight: 16,
  },
  dropdownContainer: {
    height: 200,
    width: '100%',
  },
  dropdownStyle: {
    backgroundColor: '#f0f0f0',
  },
  noListingsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    color: '#28A745',
    marginRight: 8,
    padding: 5,
  },
  lineIcon: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default LendingScreen;
