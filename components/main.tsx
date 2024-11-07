import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'authentification-library'; 
// Components
import Login from './Login';
import HomePage from './HomePage'; 

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('unsusbscribe', user)
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
      setLoading(false); // Hide loading state
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // If user is authenticated, show home page; otherwise, show login/register
  return (
    <View>
      {user ? (
        <HomePage user={user} onLogout={() => signOut(auth)} />
      ) : (
        <Login />
      )}
    </View>
  );
}
