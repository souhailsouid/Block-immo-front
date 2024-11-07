import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'authentification-library';


export default function ProfileScreen() {
    const [displayName, setDisplayName] = useState('');
    const navigation = useNavigation(); 
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
          if (!user) return;
    
          try {
            const token = await user.getIdToken();
            const response = await fetch(`http://localhost:3000/user/profile/${user.uid}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
    
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des fichiers');
            }
    
            const data = await response.json();
            setDisplayName(data.displayName || '');
            setPhone(data.phoneNumber || '');
            setAddress(data.address || '');
            setUserType(data.customClaims?.role || '');
          } catch (error) {
            console.error('Error fetching user files:', error);
            setErrorMessage('Erreur lors du chargement des fichiers.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, [user]);
    
      if (loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

  
    const handleSaveProfile = async () => {
        if (!displayName || !phone || !address || !userType) {
            setErrorMessage("Tous les champs sont obligatoires");
            return;
        }

        try {
            const token = await user?.getIdToken();

            const response = await fetch(`http://localhost:3000/user/profile-with-role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName,
                    phone,
                    address,
                    role: userType,
                }),
            });


            if (!response.ok) {
                throw new Error('Failed to update profile and role');
            }
            setSuccessMessage('Profil et rôle mis à jour avec succès');
            setErrorMessage('');

            setTimeout(() => {
                navigation.navigate('index');
            }, 1000);
        } catch (error) {
            setErrorMessage("Erreur lors de la mise à jour du profil");
            console.error('Error saving profile: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Profil utilisateur</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom complet"
                value={displayName}
                onChangeText={setDisplayName}
            />
            <TextInput
                style={styles.input}
                placeholder="Numéro de téléphone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Adresse"
                value={address}
                onChangeText={setAddress}
            />
            <Picker
                selectedValue={userType}
                style={styles.input}
                onValueChange={(itemValue) => setUserType(itemValue)}
            >
                <Picker.Item label="Choisir un type" value="" />
                <Picker.Item label="Locataire" value="locataire" />
                <Picker.Item label="Propriétaire" value="proprietaire" />
            </Picker>

            <Button title="Sauvegarder" onPress={handleSaveProfile} />
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
    },
    success: {
        color: 'green',
        marginTop: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
