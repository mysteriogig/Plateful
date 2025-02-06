import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Animated, { Easing, withSpring, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  // Shared value for animating the form container
  const offsetY = useSharedValue(1000); // start position is below the screen

  useEffect(() => {
    // Start animating the form when the component mounts
    setIsVisible(true);
    offsetY.value = withSpring(0, { damping: 10, stiffness: 100 }); // move up to the desired position
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetY.value }],
      opacity: withTiming(isVisible ? 1 : 0, { duration: 500 }),
    };
  });

  return (
    <ImageBackground
      source={require('../assets/images/homepage_bg.jpg')} // Background image
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Signup Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/app-icon.png')}
            style={styles.signupImage}
          />
        </View>

        {/* Signup Form */}
        <Animated.View style={[styles.formContainer, animatedStyle]}>
          <View style={styles.form}>
            <Text style={styles.label}>Enter Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#aaaaaa"
            />
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaaaaa"
            />
            <Text style={styles.label}>Enter Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#aaaaaa"
            />
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <Text style={styles.dividerText}>Or</Text>

          {/* Social Signup */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/icons/google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.loginRedirectContainer}>
            <Text style={styles.redirectText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.redirectLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginTop: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupImage: {
    width: 220,
    height: 300,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    marginTop: 25,
    position: 'relative',
    paddingBottom: 50, // Added bottom padding to prevent content from going off-screen
  },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 8,
    marginLeft: 8,
  },
  input: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 16,
    fontSize: 16,
    color: '#4a4a4a',
  },
  signUpButton: {
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderRadius: 16,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  dividerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    textAlign: 'center',
    marginVertical: 24,
    top:-30
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top:-40
  },
  socialButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
    top:-50 // Added bottom margin to give it space from the bottom
  },
  redirectText: {
    fontSize: 14,
    color: '#7a7a7a',
  },
  redirectLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
