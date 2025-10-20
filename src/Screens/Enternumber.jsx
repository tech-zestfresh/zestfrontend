import { View, Text, StatusBar, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myColors } from '../Utils/Mycolors';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Enternumber = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const isValid = mobile.length === 10 && /^\d{10}$/.test(mobile);

  const sendOtp = async () => {
    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.104:8080/auth/otp/send', {
        "mobileNumber": mobile,
        "countryCode": "+91"
      });
      console.log(response.data);
      if (response.data.message === "OTP sent successfully") {
        const now = new Date().toISOString();
        await AsyncStorage.setItem('userLogin', JSON.stringify({ phone: `+91${mobile}`, timestamp: now }));

        navigation.navigate('Enterotp', { phone: mobile });
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
      <StatusBar barStyle="dark-content" backgroundColor={myColors.secondary} />
      <ScrollView style={{ flex: 1, paddingTop: 30 }}>
        <Image
          style={{ alignSelf: "center", height: 140, width: 200 }}
          source={require("../assets/zestfresh.png")}
        />

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
            Enter Mobile Number
          </Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: "#ccc",
            borderWidth: 2,
            borderRadius: 5,
          }}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
                if (text.length === 10) setError('');
              }}
              maxLength={10}
              placeholder="Mobile Number"
              placeholderTextColor="grey"
              keyboardType="number-pad"
              style={{
                flex: 1,
                color: "black",
                fontSize: 16,
                marginTop: 2,
                paddingBottom: 13
              }}
            />
          </View>

          {error ? (
            <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.button, !isValid && { backgroundColor: '#ccc' }]}
            accessible
            accessibilityLabel="Send OTP button"
            accessibilityRole="button"
            accessibilityHint="Sends a one-time password to your mobile number"
            onPress={sendOtp}
            disabled={!isValid}
          >
            <Text style={[styles.buttonText, !isValid && { color: '#666' }]}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  prefix: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
    paddingLeft: 15
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
    width: 120
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Enternumber;
