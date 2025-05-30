import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Vibration, 
  Animated 
} from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import EmergencyCountdown from '../../components/emergency/EmergencyCountdown';
import { RootStackParamList } from '../../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [showEmergency, setShowEmergency] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [hasNotification, setHasNotification] = useState(true);

  // Create a pulsing animation for the SOS button
  useEffect(() => {
    const pulsing = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulsing.start();
    
    return () => {
      pulsing.stop();
    };
  }, [pulseAnim]);

  const handleEmergencyPress = () => {
    Vibration.vibrate(200);
    setShowEmergency(true);
  };

  const handleEmergencyCancel = () => {
    setShowEmergency(false);
    // In a real implementation, we would call to a service to cancel the emergency
  };
  
  const handleEmergencyConfirm = () => {
    setShowEmergency(false);
    // In a real implementation, we would call to a service to send the emergency alert
    // Mock alert ID for demo purposes
    const alertId = 'alert-' + Date.now().toString();
    navigation.navigate('EmergencyDetails', { alertId });
  };

  // Mock data for previous alerts
  const recentAlerts = [
    {
      id: 'alert-001',
      type: 'tripleTap',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: 'sent',
    },
    {
      id: 'alert-002',
      type: 'biometric',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: 'sent',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Hal0 Safety"
        rightComponent={
          <View style={styles.settingsIconContainer}>
            <IconButton
              icon="cog"
              size={24}
              onPress={() => navigation.navigate('ProfileSettings')}
            />
            {hasNotification && <View style={styles.notificationBadge} />}
          </View>
        }
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to Hal0</Text>
        <Text style={styles.subtitleText}>Your personal safety companion</Text>
        
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <View style={[styles.statusIndicator, { backgroundColor: theme.colors.secondary }]} />
            <Text style={[styles.statusText, { color: theme.colors.secondary }]}>
              Connected to Hal0 Ring
            </Text>
          </View>
          <Text style={styles.lastSyncText}>Last sync: Just now</Text>
        </View>
        
        <View style={styles.emergencyButtonContainer}>
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
          >
            <TouchableOpacity
              style={[styles.emergencyButton, { backgroundColor: theme.colors.error }]}
              onPress={handleEmergencyPress}
              activeOpacity={0.6}
            >
              <Text style={styles.emergencyButtonText}>SOS</Text>
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.emergencyText}>Press for Emergency</Text>
        </View>
        
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <Button 
            title="Test Ring Connection" 
            onPress={() => {
              // Simulate testing connection with vibration feedback
              Vibration.vibrate([0, 100, 100, 100]);
              setTimeout(() => {
                alert('Ring connection is good!');
              }, 500);
            }}
            variant="outline"
            fullWidth
            icon={<Ionicons name="bluetooth" size={18} color={theme.colors.primary} />}
          />
          
          <View style={styles.spacer} />
          
          <Button 
            title="Update Emergency Contacts" 
            onPress={() => navigation.navigate('EmergencyContacts')}
            variant="outline"
            fullWidth
            icon={<Ionicons name="people" size={18} color={theme.colors.primary} />}
          />
        </View>

        <View style={styles.spacer} />
        
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity 
              onPress={() => alert('View all alerts')}
              style={styles.viewAllButton}
            >
              <Text style={{ color: theme.colors.primary }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentAlerts.length > 0 ? (
            recentAlerts.map((alert) => (
              <TouchableOpacity
                key={alert.id}
                style={styles.alertItem}
                onPress={() => navigation.navigate('EmergencyDetails', { alertId: alert.id })}
              >
                <View style={styles.alertIconContainer}>
                  <Ionicons
                    name={alert.type === 'tripleTap' ? 'finger-print' : 'pulse'}
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>
                    {alert.type === 'tripleTap' ? 'Triple Tap Alert' : 'Biometric Alert'}
                  </Text>
                  <Text style={styles.alertTimestamp}>{formatDate(alert.timestamp)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyState}>No recent alerts</Text>
          )}
        </View>
      </ScrollView>
      
      {showEmergency && (
        <EmergencyCountdown
          seconds={5}
          triggerType="tripleTap"
          onCancel={handleEmergencyCancel}
          onConfirm={handleEmergencyConfirm}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
  },
  statusContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  lastSyncText: {
    fontSize: 14,
    opacity: 0.6,
    marginLeft: 18, // To align with text after indicator
  },
  emergencyButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emergencyButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    // Shadow for Android
    elevation: 12,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  emergencyText: {
    fontSize: 16,
    opacity: 0.7,
  },
  quickActionsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  spacer: {
    height: 16,
  },
  historyContainer: {
    marginTop: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    padding: 4,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertTimestamp: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  emptyState: {
    textAlign: 'center',
    padding: 16,
    opacity: 0.6,
  },
  settingsIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9500',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});

export default HomeScreen;