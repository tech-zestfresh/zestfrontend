import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = email.includes('@') && email.includes('.');

  const handleSignup = () => {
    if (!username || !email || !password) {
      Alert.alert('Missing Info', 'Please fill all fields');
      return;
    }
    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    console.log('Signup info:', { username, email, password });
    // Send to backend here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <View style={styles.emailRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="email@address.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {isEmailValid && <Text style={styles.check}>✅</Text>}
      </View>

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.terms}>
        By continuing you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signinLink}   onPress={()=>navigation.navigate('Emaillogin')}     >Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 20,
    color: '#000',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  check: { fontSize: 18, marginLeft: 10 },
  terms: {
    fontSize: 13,
    color: '#666',
    marginBottom: 30,
  },
  link: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  signupButton: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signinText: { color: '#666', fontSize: 14 },
  signinLink: { color: 'green', fontSize: 14 },
});

export default SignupScreen;