import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListDetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.type}</Text>
      <Text style={styles.details}>Location: {item.place}</Text>
      <Text style={styles.details}>Price: {item.price === 0 ? 'Free' : `₹${item.price}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  details: {
    fontSize: 18,
    color: '#555',
    marginVertical: 4,
  },
});

export default ListDetailsScreen;
