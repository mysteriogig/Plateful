import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WantedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Wanted Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
});
