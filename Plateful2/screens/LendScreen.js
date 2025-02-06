import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LendScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Lend Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});
