import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Button from '../common/Button';

interface EmergencyCountdownProps {
  onCancel: () => void;
  onConfirm: () => void;
  seconds: number;
  triggerType: 'tripleTap' | 'biometric';
}

const EmergencyCountdown: React.FC<EmergencyCountdownProps> = ({
  onCancel,
  onConfirm,
  seconds,
  triggerType,
}) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(seconds);
  
  // Simple vibration pattern for emergency
  const emergencyPattern = [0, 500, 200, 500, 200, 500];

  useEffect(() => {
    // Start vibration to alert user
    Vibration.vibrate(emergencyPattern, true);
    
    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onConfirm(); // Auto-confirm when countdown reaches zero
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(timer);
      Vibration.cancel();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.overlay, { backgroundColor: theme.colors.backdrop }]} />
      <View style={[styles.contentContainer, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.error }]}>Emergency Alert</Text>
        <Text style={styles.subtitle}>
          {triggerType === 'tripleTap' ? 'Triple Tap Detected' : 'Abnormal Biometrics Detected'}
        </Text>

        <View style={styles.countdownContainer}>
          <View style={styles.countdownCircle}>
            <Text style={styles.countdownNumber}>{timeLeft}</Text>
          </View>
          <Text style={styles.countdownText}>
            Sending emergency alert in {timeLeft} seconds
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Cancel" 
            onPress={onCancel} 
            variant="outline" 
            fullWidth
          />
          <View style={styles.buttonSpacer} />
          <Button 
            title="Send Now" 
            onPress={onConfirm} 
            variant="primary" 
            fullWidth 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    width: '85%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.7,
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  countdownCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  countdownNumber: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  countdownText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  buttonSpacer: {
    width: 16,
  },
});

export default EmergencyCountdown;
