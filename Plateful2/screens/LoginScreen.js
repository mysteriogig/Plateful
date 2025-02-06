import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Animated, { Easing, withSpring, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export default function LoginScreen() {
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
      source={require('../assets/images/homepage_bg.jpg')}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size={20} color="black" />
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
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <Animated.View style={[styles.formContainer, animatedStyle]}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

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
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: 40,
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
    top: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: '#ccc',
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
    top: -15,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    top: -30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  signupRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    top: -40,
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
  platefulContainer: {
    alignItems: 'center',
    marginTop: 20,  // Adjust the space below the image
  },
  platefulText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff', // Choose a color that contrasts well with your background
    fontFamily: 'Cursive', // You can replace with a custom font if desired
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 24,
    justifyContent: 'center',
  },
});
