import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, leftComponent, rightComponent }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>{leftComponent}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} variant="titleMedium">
            {title}
          </Text>
        </View>
        <View style={styles.rightContainer}>{rightComponent}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Header;
