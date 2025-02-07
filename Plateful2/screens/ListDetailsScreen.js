import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Linking } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { CustomText } from '../components/CustomText'; // Import CustomText
import { useNavigation } from '@react-navigation/native'; // for navigation

const ListDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation(); // Use navigation here for tab navigation

  // Animation for the card
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
    alert('Message function will be added here!');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.image }} style={styles.image} />
          <Card.Content>
            <Title style={styles.title}>{item.type}</Title>
            <Paragraph style={styles.details}>
  💰 Price: {item.price === 0 ? 'Free' : `₹${item.price}`}
</Paragraph>

            <Paragraph style={styles.details}>📦 Quantity: {item.quantity}</Paragraph>
            <Paragraph style={styles.details}>👤 Listed by: {item.postedBy}</Paragraph>
            <Paragraph style={styles.details}>📞 Contact: {item.contact}</Paragraph>
            <Paragraph style={styles.details}>📅 Posted on: {new Date(item.postedAt).toLocaleDateString()}</Paragraph>
            <Paragraph style={styles.details}>⏳ Expires on: {new Date(item.expiryDate).toLocaleDateString()}</Paragraph>
          </Card.Content>

          {/* Action Buttons */}
          <Card.Actions style={styles.actions}>
            <Button mode="contained" onPress={handleContact} style={styles.button}>
              Call Seller
            </Button>
            <Button mode="contained" onPress={handleMessage} style={[styles.button, { backgroundColor: '#2196F3' }]}>
              Message Seller
            </Button>
          </Card.Actions>
        </Card>
      </Animated.View>

      {/* Back to Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backToHomeButton}>
        <CustomText variant="body" style={styles.buttonText}>Back to Home</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5, // Shadow effect
  },
  image: {
    height: 250,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  backToHomeButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListDetailsScreen;