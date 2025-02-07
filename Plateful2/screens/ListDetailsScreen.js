// In your ListDetailsScreen.js

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated, Linking } from 'react-native';
import { CustomText } from '../components/CustomText'; // Import CustomText
import { useNavigation } from '@react-navigation/native'; // for navigation

const ListDetailsScreen = ({ route }) => {
  const { item } = route.params;

  // Animation for the image
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleContact = () => {
    Linking.openURL(`tel:${item.contact}`);
  };

  const handleMessage = () => {
    // Code to open messaging (you can replace this with a real message link if needed)
    alert('Message function will be added here!');
  };

  const navigation = useNavigation(); // Use navigation here for tab navigation

  return (
    <View style={styles.container}>
      {/* Image Section with Animation */}
      <Animated.Image
        source={{ uri: item.image }}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      
      {/* Title using CustomText */}
      <CustomText variant="body" style={styles.title}>{item.type}</CustomText>

      {/* Place using CustomText */}
      <CustomText variant="hint" style={styles.place}>Location: {item.place}</CustomText>

      {/* Description Section */}
      <View style={styles.detailsContainer}>
        <CustomText variant="body" style={styles.details}>Price: {item.price === 0 ? 'Free' : `₹${item.price}`}</CustomText>
        <CustomText variant="body" style={styles.details}>Quantity: {item.quantity}</CustomText>
        <CustomText variant="body" style={styles.details}>Listed by: {item.postedBy}</CustomText>
        <CustomText variant="body" style={styles.details}>Contact: {item.contact}</CustomText>
        <CustomText variant="body" style={styles.details}>Posted on: {new Date(item.postedAt).toLocaleDateString()}</CustomText>
        <CustomText variant="body" style={styles.details}>Expires on: {new Date(item.expiryDate).toLocaleDateString()}</CustomText>
      </View>

      {/* Actions Section */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleContact}>
          <CustomText variant="body" style={styles.buttonText}>Call Seller</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMessage}>
          <CustomText variant="body" style={styles.buttonText}>Message Seller</CustomText>
        </TouchableOpacity>
      </View>

      {/* Navigate back to TabNavigator */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')} // Goes back to TabNavigator's Home tab
        style={styles.backToHomeButton}
      >
        <CustomText variant="body" style={styles.buttonText}>Back to Home</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  place: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: '#777',
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backToHomeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ListDetailsScreen;
