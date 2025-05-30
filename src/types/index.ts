// Common types for the application

export interface AlertType {
  id?: string;
  triggerType: 'tripleTap' | 'biometric';
  timestamp: string;
  status: 'countdown' | 'confirmed' | 'cancelled' | 'sent' | 'pending' | 'failed';
  countdownSeconds?: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
  notificationPreference: 'sms' | 'email' | 'both';
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
    notes?: string;
  };
  emergencyContacts: EmergencyContact[];
}
