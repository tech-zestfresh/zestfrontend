import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text, 
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerificationScreen = ({ navigation, route }) => {
  const mobile = route.params?.phone;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    if (text === '') {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    } else if (/^\d$/.test(text)) {
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputs.current[index + 1].focus();
      } else {
        verifyOTP(newOtp.join('')); // ✅ Auto-submit
      }
    }
  };

  const verifyOTP = async (code) => {
    setVerifying(true);
    try {
      console.log(mobile, code);
      const response = await axios.post('http://192.168.0.104:8080/auth/otp/verify', {
         "mobileNumber": mobile,
        "otp": code
      });

      console.log(response.data);
      if (response.data.accessToken) {
        const now = new Date().toISOString();
        await AsyncStorage.setItem('userSession', JSON.stringify({ phone: `+91${mobile}`, timestamp: now }));
        navigation.navigate('Homescreen');
      } else {
        Alert.alert('Verification Failed', 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;

    console.log('Resend OTP triggered');
    setTimer(30);
    setCanResend(false);

    axios.post('http://192.168.0.104:8080/auth/otp/resend', {
      identifier: mobile,
    }).then(res => {
      console.log('Resend response:', res.data);
    }).catch(err => {
      console.error('Resend error:', err);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your 6-digit code</Text>
      <Text style={styles.label}>Code</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            editable={!verifying}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleResend} disabled={!canResend}>
        <Text style={[styles.resend, { color: canResend ? 'green' : 'gray' }]}>
          {canResend ? 'Resend Code' : `Resend in ${timer}s`}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={() => verifyOTP(otp.join(''))} disabled={verifying}>
        {verifying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.arrow}>→</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 16, color: '#666', marginBottom: 10 },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    borderBottomWidth: 2,
    borderColor: '#ccc',
    width: 50,
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  resend: {
    fontSize: 16,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  arrow: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default OTPVerificationScreen;