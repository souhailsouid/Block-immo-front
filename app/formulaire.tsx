import RentReceiptForm from '@/components/RentReceiptForm';
import { Text, View, StyleSheet } from 'react-native';

export default function Formulaire() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Generer une quittance de loyer</Text>
            <RentReceiptForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
