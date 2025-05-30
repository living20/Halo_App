import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          color: '#ffffff',
        };
      case 'outline':
      case 'text':
        return {
          color: disabled ? theme.colors.disabled : theme.colors.primary,
        };
      default:
        return {
          color: '#ffffff',
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
        };
      case 'medium':
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
        };
      case 'large':
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
        };
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 14;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
      ]}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, getTextStyle(), { fontSize: getTextSize() }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button;
