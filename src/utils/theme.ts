import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Custom colors for our app
const colors = {
  primary: '#FF3B30', // Emergency red
  secondary: '#34C759', // Success green
  accent: '#007AFF', // Information blue
  background: '#F2F2F7', // Light background
  surface: '#FFFFFF',
  error: '#FF3B30',
  text: '#000000',
  disabled: '#C7C7CC',
  placeholder: '#8E8E93',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  notification: '#FF9500',
};

// Dark mode colors
const darkColors = {
  primary: '#FF453A', // Slightly brighter red for dark mode
  secondary: '#30D158', 
  accent: '#0A84FF',
  background: '#1C1C1E',
  surface: '#2C2C2E',
  error: '#FF453A',
  text: '#FFFFFF',
  disabled: '#636366',
  placeholder: '#8E8E93',
  backdrop: 'rgba(0, 0, 0, 0.8)',
  notification: '#FF9F0A',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
};

export default lightTheme;
