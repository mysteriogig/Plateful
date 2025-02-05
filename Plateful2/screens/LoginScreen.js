import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/homepage_bg.jpg')} // Background image
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>

        {/* Login Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/app-icon.png')}
            style={styles.loginImage}
          />
        </View>
      </SafeAreaView>

      {/* Login Form */}
      <Animated.View style={[styles.formContainer, { opacity: isVisible ? 1 : 0 }]}>
        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <Text style={styles.dividerText}>Or</Text>

        {/* Social Login */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/icons/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Signup Redirect */}
        <View style={styles.signupRedirectContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
    justifyContent: 'center', // Center the content
    paddingTop: 40, // Adjust if needed based on safe area
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
  },
  loginImage: {
    width: 220,
    height: 300,
    top: 20
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    marginTop: 24,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  loginButton: {
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderRadius: 16,
  },
  loginButtonText: {
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
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderColor: '#00000'
  },
  signupRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    color: '#7a7a7a',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
