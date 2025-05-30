import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import EmergencyDetailsScreen from '../screens/emergency/EmergencyDetailsScreen';
import EmergencyContactsScreen from '../screens/settings/EmergencyContactsScreen';
import ProfileSettingsScreen from '../screens/settings/ProfileSettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  EmergencyDetails: { alertId: string };
  EmergencyContacts: undefined;
  ProfileSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmergencyDetails" component={EmergencyDetailsScreen} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
