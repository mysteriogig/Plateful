import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/homepage_bg.jpg')}  // Background image
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>

        {/* Signup Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/app-icon.png')}
            style={styles.signupImage}
          />
        </View>
      </SafeAreaView>

      {/* Signup Form */}
      <Animated.View style={[styles.formContainer, { opacity: isVisible ? 1 : 0 }]}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
            />
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter Password"
            />
            <TouchableOpacity style={styles.signUpButton}>
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

          {/* Login Redirect */}
          <View style={styles.loginRedirectContainer}>
            <Text style={styles.redirectText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.redirectLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
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
      top: 20
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',  // Transparent white background for the form
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    marginTop: 20, // Adjusted to move content up
  },
  scrollViewContent: {
    paddingBottom: 40, // Added padding to keep content visible at the bottom
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
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
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
    bottom:27
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    bottom: 40
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
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
