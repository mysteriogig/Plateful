import React, { useRef } from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import AddScreen from '../screens/AddScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AccountScreen from '../screens/AccountScreen';
import plus from '../assets/images/plus.png';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getWidth = () => {
    let width = Dimensions.get('window').width;
    return (width - 20) / 5; // Adjust for 5 tabs
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          showLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 40,
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
          name="HomeTab" // Renamed from "Home" to "HomeTab"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 20 }}>
                <FontAwesome5 name="home" size={20} color={focused ? 'red' : 'gray'} />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, position: 'absolute', bottom: 10 }}>
                Home
              </Text>
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
              <View style={{ position: 'absolute', top: 20 }}>
                <FontAwesome5 name="users" size={20} color={focused ? 'red' : 'gray'} />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, position: 'absolute', bottom: 10 }}>
                Community
              </Text>
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
          component={AddScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: 'red',
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: Platform.OS === 'android' ? 50 : 30,
                }}
              >
                <Image source={plus} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
            ),
            tabBarLabel: '', // Use an empty string instead of null
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); // Prevent the default behavior
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2, // Adjust the offset for the "Add" tab
                useNativeDriver: true,
              }).start();
              navigation.navigate('Add'); // Navigate to the "Add" screen
            },
          })}
        />

        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'absolute', top: 20 }}>
                <FontAwesome5 name="comment-alt" size={20} color={focused ? 'red' : 'gray'} />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, position: 'absolute', bottom: 9 }}>
                Messages
              </Text>
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
              <View style={{ position: 'absolute', top: 20 }}>
                <FontAwesome5 name="user-circle" size={20} color={focused ? 'red' : 'gray'} />
              </View>
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 11, position: 'absolute', bottom: 9 }}>
                Account
              </Text>
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

      <Animated.View
        style={{
          width: getWidth() - 30,
          height: 2,
          backgroundColor: 'red',
          position: 'absolute',
          bottom: 98,
          left: 25,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </>
  );
}

// Main Navigation
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
