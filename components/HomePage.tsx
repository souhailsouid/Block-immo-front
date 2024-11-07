import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Navbar from '@/components/ui/navBar';
import SignInWithOAuth from '@/components/SignUpWithGoogle';

interface User {
  firstName: string;
  imageUrl: string;
}

export default function HomePage() {

  const { signOut: clerkSignOut } = useAuth();
  const { user, isSignedIn } = useUser();

  const handleLogout = async () => {
    try {
      if (isSignedIn && user) {
        // If using Clerk, sign out with Clerk
        await clerkSignOut();
        console.log('Logged out from Clerk');
      } 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  

  return (
    <View style={styles.container}>
      <Navbar user={user as User ?? null} />

      <ScrollView contentContainerStyle={styles.mainContent}>
        <Text style={styles.header}>Bienvenue sur BlockImmo!</Text>

        {isSignedIn && user ? (
          <>
            <Text style={styles.subHeader}>Explorez les fonctionnalités ci-dessous:</Text>

            <TouchableOpacity style={styles.button}>
              <Link href="/formulaire" style={styles.buttonText}>
                Accéder au formulaire
              </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Link href="/mes-documents" style={styles.buttonText}>
                Mes documents
              </Link>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Link href="/mon-profil-utlisateur" style={styles.buttonText}>
                Mon profil utilisateur
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subHeader}>Veuillez vous authentifier pour explorer les fonctionnalités</Text>

            {/* <TouchableOpacity style={styles.button}>
              <Link href="/login" style={styles.buttonText}>
                Se connecter
              </Link>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.button}>
              <Link href="/register" style={styles.buttonText}>
                S'inscrire
              </Link>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button}>
              <SignInWithOAuth />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#cc4949',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
