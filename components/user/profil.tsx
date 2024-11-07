import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'authentification-library';
import { useUser } from '@clerk/clerk-expo';
export default function UserProfileSetup() {

    const userLoadedFromFirebase = auth.currentUser;
    const { user } = useUser();  // Clerk user object
    const navigation = useNavigation();
    const [displayName, setDisplayName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [userType, setUserType] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSaveProfile = async () => {
        if (!displayName || !phone || !address || !userType) {
            setErrorMessage("Tous les champs sont obligatoires");
            return;
        }

        try {
            const token = await userLoadedFromFirebase?.getIdToken();
            const email = user?.emailAddresses[0]?.emailAddress;

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
                    email,
                    role: userType,
                }),
            });
            console.log('handlesaveProfile_step2')
            console.log('response', response)



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
            <Text>Compléter votre profil</Text>
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
