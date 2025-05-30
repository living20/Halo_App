import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { Text, Card, Divider, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { UserProfile } from '../../types';

type ProfileSettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileSettings'>;

// Mock profile data
const MOCK_PROFILE: UserProfile = {
  id: 'user123',
  firstName: 'Raj',
  lastName: 'Patel',
  phone: '+91 98765 43210',
  email: 'raj.patel@example.com',
  medicalInfo: {
    bloodType: 'O+',
    allergies: ['Peanuts', 'Penicillin'],
    medications: ['Blood pressure medication'],
    conditions: ['Asthma'],
    notes: 'Carry inhaler at all times',
  },
  emergencyContacts: [],
};

const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [shareMedicalInfo, setShareMedicalInfo] = useState(true);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSaveChanges = () => {
    if (isEditing) {
      // In a real app, save the profile changes
      alert('Profile saved successfully!');
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleToggleLocation = () => {
    setShareLocation(!shareLocation);
  };

  const handleToggleMedicalInfo = () => {
    setShareMedicalInfo(!shareMedicalInfo);
  };

  const handleEditField = (field: keyof UserProfile, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile Settings"
        leftComponent={
          <Button
            title="Back"
            onPress={handleBackPress}
            variant="text"
            size="small"
            icon={<Ionicons name="arrow-back" size={20} color={theme.colors.primary} />}
          />
        }
        rightComponent={
          <Button
            title={isEditing ? "Save" : "Edit"}
            onPress={handleSaveChanges}
            variant="text"
            size="small"
          />
        }
      />

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.inputRow}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                value={profile.firstName}
                onChangeText={(value) => handleEditField('firstName', value)}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                value={profile.lastName}
                onChangeText={(value) => handleEditField('lastName', value)}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                value={profile.phone}
                onChangeText={(value) => handleEditField('phone', value)}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={profile.email || ''}
                onChangeText={(value) => handleEditField('email', value)}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Medical Information</Text>
            
            <View style={styles.inputRow}>
              <Text style={styles.label}>Blood Type</Text>
              <TextInput
                value={profile.medicalInfo?.bloodType || ''}
                onChangeText={(value) => {
                  setProfile({
                    ...profile,
                    medicalInfo: {
                      ...profile.medicalInfo,
                      bloodType: value,
                    },
                  });
                }}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Allergies</Text>
              <TextInput
                value={profile.medicalInfo?.allergies?.join(', ') || ''}
                onChangeText={(value) => {
                  setProfile({
                    ...profile,
                    medicalInfo: {
                      ...profile.medicalInfo,
                      allergies: value.split(', '),
                    },
                  });
                }}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
                placeholder="Separate with commas"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Medications</Text>
              <TextInput
                value={profile.medicalInfo?.medications?.join(', ') || ''}
                onChangeText={(value) => {
                  setProfile({
                    ...profile,
                    medicalInfo: {
                      ...profile.medicalInfo,
                      medications: value.split(', '),
                    },
                  });
                }}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
                placeholder="Separate with commas"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Medical Conditions</Text>
              <TextInput
                value={profile.medicalInfo?.conditions?.join(', ') || ''}
                onChangeText={(value) => {
                  setProfile({
                    ...profile,
                    medicalInfo: {
                      ...profile.medicalInfo,
                      conditions: value.split(', '),
                    },
                  });
                }}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
                placeholder="Separate with commas"
              />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Medical Notes</Text>
              <TextInput
                value={profile.medicalInfo?.notes || ''}
                onChangeText={(value) => {
                  setProfile({
                    ...profile,
                    medicalInfo: {
                      ...profile.medicalInfo,
                      notes: value,
                    },
                  });
                }}
                disabled={!isEditing}
                style={styles.input}
                mode="outlined"
                multiline
                numberOfLines={3}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Privacy Settings</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Share Location</Text>
                <Text style={styles.settingDescription}>
                  Send your exact location during emergencies
                </Text>
              </View>
              <Switch
                value={shareLocation}
                onValueChange={handleToggleLocation}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
              />
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Share Medical Info</Text>
                <Text style={styles.settingDescription}>
                  Include medical information in emergency alerts
                </Text>
              </View>
              <Switch
                value={shareMedicalInfo}
                onValueChange={handleToggleMedicalInfo}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
              />
            </View>
          </Card.Content>
        </Card>

        <Button
          title="Manage Emergency Contacts"
          onPress={() => navigation.navigate('EmergencyContacts')}
          variant="outline"
          size="large"
          icon={<Ionicons name="people-outline" size={20} color={theme.colors.primary} />}
          style={styles.contactsButton}
        />

        <Button
          title="Sign Out"
          onPress={() => alert('Sign out functionality coming soon!')}
          variant="text"
          size="medium"
          style={styles.signOutButton}
        />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.7,
  },
  input: {
    backgroundColor: 'transparent',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  divider: {
    marginVertical: 8,
  },
  contactsButton: {
    marginBottom: 12,
  },
  signOutButton: {
    alignSelf: 'center',
    marginBottom: 32,
  },
});

export default ProfileSettingsScreen;
