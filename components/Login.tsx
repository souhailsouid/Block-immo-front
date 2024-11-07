import React, { useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from 'authentification-library'; // Firebase auth
import { auth } from '../firebaseConfig'; // Firebase auth
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  // Handle sign-in
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle sign-up
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{isRegistering ? 'Register' : 'Login'}</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button
        title={isRegistering ? 'Register' : 'Login'}
        onPress={isRegistering ? handleSignUp : handleSignIn}
      />

      <Button
        title={isRegistering ? 'Have an account? Login' : 'Don’t have an account? Register'}
        onPress={() => setIsRegistering(!isRegistering)}
      />
    </View>
  );
}
