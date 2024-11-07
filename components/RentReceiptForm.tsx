import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, Linking } from 'react-native';
import { auth} from 'authentification-library';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RentReceiptForm() {
    const [tenantInfo, setTenantInfo] = useState({ tenantName: '', address: '', phone: '' });
    const [rent, setRent] = useState('');
    const [backRent, setBackRent] = useState('');
    const [charges, setCharges] = useState('');
    const [adminFees, setAdminFees] = useState('');
    const [total, setTotal] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const user = auth.currentUser;


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/profile/${user.uid}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${await user?.getIdToken()}`,
                    },
                });
                const data = await response.json();
                setTenantInfo({
                    tenantName: data.displayName || 'Nom non renseigné',
                    address: data.address || 'Adresse non renseignée',
                    phone: data.phoneNumber || 'Téléphone non renseigné',
                });
            } catch (error) {
                console.error('Erreur lors du chargement du profil utilisateur :', error);
            }
        };

        fetchUserProfile();
    }, [user]);

    const calculateTotal = () => {
        const rentValue = parseFloat(rent) || 0;
        const backRentValue = parseFloat(backRent) || 0;
        const chargesValue = parseFloat(charges) || 0;
        const adminFeesValue = parseFloat(adminFees) || 0;
        const totalValue = rentValue + backRentValue + chargesValue + adminFeesValue;
        setTotal(parseFloat(totalValue.toFixed(2)));
    };

    useEffect(() => {
        calculateTotal(); // Calculer à chaque changement de valeur
    }, [rent, backRent, charges, adminFees]);

    const handleGeneratePDF = async () => {
        try {
            const props = {
                tenantName: tenantInfo.tenantName,
                address: tenantInfo.address,
                phone: tenantInfo.phone,
                rent: parseFloat(rent),
                backRent: parseFloat(backRent),
                charges: parseFloat(charges),
                adminFees: parseFloat(adminFees),
                total: total,
                period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
            };

            const response = await fetch(`http://localhost:3000/pdf/generate/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await user?.getIdToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Quittance de loyer générée avec succès. Vous pouvez télécharger le PDF ici :');
                Alert.alert(
                    'PDF généré avec succès',
                    'Vous pouvez télécharger le PDF ici',
                    [
                        { text: 'Télécharger', onPress: () => Linking.openURL(result.signedUrl) },
                    ],
                );
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            setErrorMessage('Erreur lors de la génération de la quittance de loyer');
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Génération de la quittance de loyer</Text>
            <Text>Locataire : {tenantInfo.tenantName}</Text>
            <Text>Adresse : {tenantInfo.address}</Text>
            <Text>Téléphone : {tenantInfo.phone}</Text>

            <Text>Date de début de la période</Text>
            <Button title={startDate.toLocaleDateString()} onPress={() => setShowStartPicker(true)} />
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || startDate;
                        setShowStartPicker(false);
                        setStartDate(currentDate);
                    }}
                />
            )}

            <Text>Date de fin de la période</Text>
            <Button title={endDate.toLocaleDateString()} onPress={() => setShowEndPicker(true)} />
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(_event, selectedDate) => {
                        const currentDate = selectedDate || endDate;
                        setShowEndPicker(false);
                        setEndDate(currentDate);
                    }}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Loyer (€)"
                value={rent}
                onChangeText={setRent}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Rappel de loyer (€)"
                value={backRent}
                onChangeText={setBackRent}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Provisions/Charges (€)"
                value={charges}
                onChangeText={setCharges}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Frais Administratifs (€)"
                value={adminFees}
                onChangeText={setAdminFees}
                keyboardType="numeric"
            />

            <Text style={styles.total}>Total à payer : {total.toFixed(2)} €</Text>
            <Button title="Générer PDF" onPress={handleGeneratePDF} />

            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
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
