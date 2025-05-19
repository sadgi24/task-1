import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bricx from '../assets/bricx.svg'; // SVG component

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (phone.trim().length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    navigation.navigate('OTP',{phone});
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.heading}>One Bricx at a Time</Text>
      <Text style={styles.subheading}>Invest . Pay . Loans</Text>

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoContainer}>
          <Bricx  />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TextInput
            label="Enter Mobile Number"
            mode="outlined"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            maxLength={10}
            placeholderTextColor={'#ddd'}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button mode="contained" onPress={handleSendOTP} style={styles.button}>
            Send OTP
          </Button>

          <Text style={styles.disclaimer}>
            By proceeding, I accept I bricx T&C. Privacy Policy, Tariff Rates, FATCA Declaration & CIBIL T&C
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontWeight: '600',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  subheading: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: '#A7A4A4',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
    flex:1,
    justifyContent:'center'
  },
  input: {
    marginBottom: 10,
    borderRadius: 8,
  
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 5,
  },
  disclaimer: {
    fontWeight: '500',
    marginTop: 40,
    fontSize: 14,
    color: '#A7A4A4',
    textAlign: 'center',
  },
});