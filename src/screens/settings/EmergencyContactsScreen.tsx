import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Divider, IconButton, Menu, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { EmergencyContact } from '../../types';

type EmergencyContactsScreenProps = NativeStackScreenProps<RootStackParamList, 'EmergencyContacts'>;

// Mock data for emergency contacts
const MOCK_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Mom',
    phone: '+91 98765 43210',
    relationship: 'Family',
    notificationPreference: 'sms',
  },
  {
    id: '2',
    name: 'Dad',
    phone: '+91 98765 12345',
    relationship: 'Family',
    notificationPreference: 'sms',
  },
  {
    id: '3',
    name: 'Roommate',
    phone: '+91 87654 32109',
    relationship: 'Friend',
    notificationPreference: 'sms',
  },
];

const EmergencyContactsScreen: React.FC<EmergencyContactsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [contacts, setContacts] = useState<EmergencyContact[]>(MOCK_CONTACTS);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddContact = () => {
    // In a real app, this would open a form to add a new contact
    alert('Add contact functionality coming soon!');
  };

  const handleEditContact = (contactId: string) => {
    setMenuVisible(null);
    // In a real app, this would open a form to edit the contact
    alert(`Edit contact ${contactId}`);
  };

  const handleDeleteContact = (contactId: string) => {
    setMenuVisible(null);
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const toggleMenu = (contactId: string | null) => {
    setMenuVisible(contactId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Emergency Contacts"
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
        <Text style={styles.description}>
          Emergency contacts will be notified when you trigger an alert.
        </Text>

        {contacts.map((contact, index) => (
          <React.Fragment key={contact.id}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.contactRow}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                    <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                  </View>
                  
                  <View style={styles.menuContainer}>
                    <Menu
                      visible={menuVisible === contact.id}
                      onDismiss={() => toggleMenu(null)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          size={20}
                          onPress={() => toggleMenu(contact.id)}
                        />
                      }
                    >
                      <Menu.Item 
                        leadingIcon="pencil"
                        onPress={() => handleEditContact(contact.id)} 
                        title="Edit" 
                      />
                      <Divider />
                      <Menu.Item 
                        leadingIcon="delete"
                        onPress={() => handleDeleteContact(contact.id)} 
                        title="Delete" 
                        titleStyle={{ color: theme.colors.error }}
                      />
                    </Menu>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </React.Fragment>
        ))}

        <Button
          title="Add Emergency Contact"
          onPress={handleAddContact}
          variant="primary"
          size="large"
          icon={<Ionicons name="add-circle-outline" size={20} color="#fff" />}
          style={styles.addButton}
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
  description: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  card: {
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 14,
    marginTop: 2,
  },
  contactRelationship: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  menuContainer: {
    alignItems: 'flex-end',
  },
  addButton: {
    marginTop: 16,
    marginBottom: 24,
  },
});

export default EmergencyContactsScreen;
