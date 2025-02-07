import React, { useRef } from 'react';
import { Animated, Dimensions, Image, TouchableOpacity, View } from 'react-native';
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
import ListDetailsScreen from '../screens/ListDetailsScreen';
import MapScreen from '../screens/MapScreen'
import plus from '../assets/images/plus.png';
import { FontAwesome5 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const getWidth = () => {
    let width = Dimensions.get('window').width;
    return (width - 20) / 5;
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
        })}
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
          component={AddScreen}
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
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
              navigation.navigate('Add');
            },
          })}
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
        onPress={() => navigation.navigate('Map')}
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
        <Stack.Screen 
          name="ListDetails" 
          component={ListDetailsScreen} 
          options={{ headerTitle: 'Food Item Details' }} 
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ headerTitle: 'Map View' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
