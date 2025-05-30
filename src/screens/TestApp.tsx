import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// This is a minimal test component to verify our setup works
const TestApp: React.FC = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Hello Hal0!</Text>
        <Text style={styles.subText}>Testing the basic app setup</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
});

export default TestApp;
