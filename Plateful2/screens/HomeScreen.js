import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';

const LendingScreen = () => (
  <View style={styles.listingContainer}>
    <Text style={styles.listingTitle}>Lending Listings</Text>
    <Text style={styles.listingText}>List of items available for lending...</Text>
  </View>
);

const WantedScreen = () => (
  <View style={styles.listingContainer}>
    <Text style={styles.listingTitle}>Wanted Listings</Text>
    <Text style={styles.listingText}>List of items wanted...</Text>
  </View>
);

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabWidth, setTabWidth] = useState(Dimensions.get('window').width / 2); // Default tab width
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const pagerViewRef = useRef();

  useEffect(() => {
    const onResize = () => {
      setTabWidth(Dimensions.get('window').width / 2);
    };

    Dimensions.addEventListener('change', onResize);

    return () => {
      Dimensions.removeEventListener('change', onResize);
    };
  }, []);

  const handleTabChange = (index) => {
    setSelectedTab(index);
    Animated.spring(tabOffsetValue, {
      toValue: tabWidth * index,
      useNativeDriver: true,
    }).start();
    pagerViewRef.current.setPage(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => handleTabChange(0)} style={styles.tab}>
          <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Lending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange(1)} style={styles.tab}>
          <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Wanted</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[styles.tabIndicator, { width: tabWidth, transform: [{ translateX: tabOffsetValue }] }]}
      />

      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => handleTabChange(e.nativeEvent.position)}
      >
        <View key="1">
          <LendingScreen />
        </View>
        <View key="2">
          <WantedScreen />
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedTabText: {
    color: '#ff6347',
  },
  tabIndicator: {
    height: 2,
    backgroundColor: '#ff6347',
    position: 'absolute',
    top: 40, // Adjust to position the indicator below the tabs
    left: 0,
    borderRadius: 2,
  },
  pagerView: {
    flex: 1,
  },
  listingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  listingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listingText: {
    fontSize: 16,
    color: '#333',
  },
});
