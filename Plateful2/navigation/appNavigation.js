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
import GetLendDetails from '../screens/getdetails/GetLendDetails'; 
import GetDonateDetails from '../screens/getdetails/GetDonateDetails';
import GetPostDetails from '../screens/getdetails/GetPostDetails';
import GetWantedDetails from '../screens/getdetails/GetWantedDetails';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
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
          component={() => null}
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
              e.preventDefault();
              setModalVisible(true);
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
            {/* Donate Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('DonateScreen'); // Replace with actual navigation name
        }}
      >
        <FontAwesome5 name="donate" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Donate</Text>
      </TouchableOpacity>

      {/* Post Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('PostScreen'); // Replace with actual navigation name
        }}
      >
        <FontAwesome5 name="edit" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Post</Text>
      </TouchableOpacity>

      {/* Wanted Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('WantedScreen'); // Replace with actual navigation name
        }}
      >
        <FontAwesome5 name="search" size={24} color="#007BFF" />
        <Text style={styles.optionText}>Wanted</Text>
      </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  <Stack.Screen name="LendScreen" component={GetLendDetails} options={{ title: 'Lend' }} />
  <Stack.Screen name="DonateScreen" component={GetDonateDetails} options={{ title: 'Donate' }} />
  <Stack.Screen name="PostScreen" component={GetPostDetails} options={{ title: 'Post' }} />
  <Stack.Screen name="WantedScreen" component={GetWantedDetails} options={{ title: 'Wanted' }} />
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
});
