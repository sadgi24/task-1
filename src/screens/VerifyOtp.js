import {  MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

const OtpScreen = ({route,navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const phone = route.params.phone

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
const handleChange = (text, index) => {
  if (/^\d$/.test(text)) {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all fields are filled after last digit input
    if (index === 3) {
      const finalOtp = [...newOtp];
      if (finalOtp.every(d => d !== '')) {
        Alert.alert('OTP Entered', `You entered: ${finalOtp.join('')}`);
      }
    }
  } else if (text === '') {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
  }
};

  const handleBackspace = (index) => {
    if (otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendOtp = () => {
    if (timer === 0) {
      // Trigger resend OTP logic here
      console.log('Resending OTP...');
      setTimer(30);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name='arrow-back-ios' size={18} color={'#D10E15'}/>
      </TouchableOpacity>

      <Text style={styles.title}>Verify your mobile number with OTP...</Text>
      <Text style={styles.phone}>{phone}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpBox}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={resendOtp}
        disabled={timer > 0}
      >
        <Text style={[styles.resendText, { color: timer > 0 ? 'gray' : 'blue' }]}>
          {timer > 0 ? `Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 5,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#333',
    textAlign: 'center',
    fontSize: 22,
    borderRadius: 8,
  },
  resendText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default OtpScreen;
