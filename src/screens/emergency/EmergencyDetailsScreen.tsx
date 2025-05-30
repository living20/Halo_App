import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { RootStackParamList } from '../../navigation/AppNavigator';

type EmergencyDetailsProps = NativeStackScreenProps<RootStackParamList, 'EmergencyDetails'>;

// Mock data - In a real app, this would come from a state manager or API
const MOCK_EMERGENCY = {
  id: '123456',
  type: 'tripleTap',
  timestamp: new Date().toISOString(),
  location: {
    latitude: 13.0827,
    longitude: 80.2707,
    accuracy: 15,
  },
  status: 'sent',
  sentTo: [
    { name: 'Tamil Nadu Police', method: 'API', status: 'delivered' },
    { name: 'Mom', method: 'SMS', status: 'delivered' },
    { name: 'Dad', method: 'SMS', status: 'sent' },
    { name: 'Nearby Hal0 User (1)', method: 'App', status: 'delivered' },
  ],
};

const EmergencyDetailsScreen: React.FC<EmergencyDetailsProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const { alertId } = route.params;
  
  // Normally we'd fetch the specific alert details using the alertId
  const emergencyData = MOCK_EMERGENCY;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return theme.colors.secondary;
      case 'sent':
        return theme.colors.primary;
      default:
        return theme.colors.disabled;
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // For simplicity, this button just shows an alert
  // In a real app, this would contact emergency responders
  const handleCallEmergencyServices = () => {
    alert('Calling emergency services...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Alert Details" 
        leftComponent={
          <Button 
            title="Back" 
            onPress={handleBackPress} 
            variant="text" 
            size="small"
            icon={<Ionicons name="arrow-back" size={20} color={theme.colors.primary} />} 
          />
        } 
      />
      
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Ionicons name="warning" size={24} color={theme.colors.error} />
              <Text style={styles.emergencyTitle}>Emergency Alert</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Alert ID:</Text>
              <Text style={styles.value}>{emergencyData.id}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Type:</Text>
              <Text style={styles.value}>
                {emergencyData.type === 'tripleTap' ? 'Triple Tap Trigger' : 'Biometric Anomaly'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{formatDate(emergencyData.timestamp)}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={[styles.value, { color: theme.colors.secondary }]}>
                {emergencyData.status.toUpperCase()}
              </Text>
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Location</Text>
            
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>Map View Placeholder</Text>
              <Text style={styles.mapCoordinates}>
                Lat: {emergencyData.location.latitude}, 
                Long: {emergencyData.location.longitude}
              </Text>
            </View>
            
            <Text style={styles.locationAccuracy}>
              Accuracy: within {emergencyData.location.accuracy} meters
            </Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Alert Recipients</Text>
            
            {emergencyData.sentTo.map((recipient, index) => (
              <React.Fragment key={index}>
                <View style={styles.recipientRow}>
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>{recipient.name}</Text>
                    <Text style={styles.recipientMethod}>via {recipient.method}</Text>
                  </View>
                  <Text style={{ color: getStatusColor(recipient.status) }}>
                    {recipient.status.toUpperCase()}
                  </Text>
                </View>
                {index < emergencyData.sentTo.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Call Emergency Services"
            onPress={handleCallEmergencyServices}
            variant="primary"
            size="large"
            fullWidth
            icon={<Ionicons name="call" size={20} color="#fff" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.7,
  },
  mapCoordinates: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 8,
  },
  locationAccuracy: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  recipientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
  },
  recipientMethod: {
    fontSize: 14,
    opacity: 0.6,
  },
  buttonContainer: {
    marginVertical: 24,
  },
});

export default EmergencyDetailsScreen;
