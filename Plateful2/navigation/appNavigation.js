import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AccountScreen from '../screens/AccountScreen';
import ListDetailsScreen from '../screens/ListDetailsScreen';
import MapScreen from '../screens/MapScreen';
import plus from '../assets/images/plus.png';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false); // Modal state
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getWidth = () => {
    let width = Dimensions.get('window').width;
    return (width - 20) / 5;
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 10,
            marginHorizontal: 10,
            height: 65,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 10, height: 10 },
            paddingHorizontal: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 15 }}>
                <FontAwesome5 name="home" size={25} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 15 }}>
                <FontAwesome5 name="users" size={25} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          }}
        />
        <Tab.Screen
          name="Add"
          component={() => null} // No screen, just modal behavior
          options={{
            tabBarIcon: () => (
              <View
                style={{
                  width: 73,
                  height: 68,
                  backgroundColor: 'red',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 12,
                }}
              >
                <Image source={plus} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent default tab navigation
              setModalVisible(true); // Open the modal
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 15 }}>
                <FontAwesome5 name="comment-alt" size={25} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 15 }}>
                <FontAwesome5 name="user-circle" size={25} color={focused ? 'red' : 'gray'} />
              </View>
            ),
          }}
          listeners={{
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')} // Navigate to MapScreen
        style={{
          position: 'absolute',
          right: 20,
          bottom: 90,
          backgroundColor: 'white',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <FontAwesome5 name="map-marked-alt" size={24} color="red" />
      </TouchableOpacity>

      {/* Modal for Add Button */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>What do you want to post?</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('LendScreen');
              }}
            >
              <FontAwesome5 name="hand-holding-heart" size={24} color="#007BFF" />
              <Text style={styles.optionText}>Lend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('WantedScreen');
              }}
            >
              <FontAwesome5 name="search" size={24} color="#28A745" />
              <Text style={styles.optionText}>Wanted</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('DonateScreen');
              }}
            >
              <FontAwesome5 name="heart" size={24} color="#DC3545" />
              <Text style={styles.optionText}>Donate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddPostScreen');
              }}
            >
              <FontAwesome5 name="plus-circle" size={24} color="#FFC107" />
              <Text style={styles.optionText}>Add a Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={{
          width: getWidth() - 30,
          height: 2,
          backgroundColor: 'red',
          position: 'absolute',
          bottom: 63,
          left: 25,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ListDetails" component={ListDetailsScreen} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerTitle: 'Map View' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
