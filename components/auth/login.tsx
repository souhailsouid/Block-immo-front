// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { auth } from 'authentification-library';
// import { auth } from '../../firebaseConfig';
// import { useNavigation } from '@react-navigation/native';

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigation = useNavigation();


//     // Fonction pour se connecter avec email et mot de passe
//     const handleLogin = async () => {
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;

//                 // Vérifier si c'est la première connexion
//                 if (user.metadata.creationTime === user.metadata.lastSignInTime) {
//                     // Rediriger vers la page profil pour compléter les informations
//                     navigation.navigate('profil/[id]', { id: user.uid });
//                 } else {
//                     // Rediriger vers la page principale ou autre page si l'utilisateur n'est pas nouveau
//                     navigation.navigate('index');
//                 }
//             })
//             .catch((error) => {
//                 console.log('Erreur lors de la connexion : ', error);
//                 setErrorMessage(error.message);
//             });
//     };

//     return (
//         <View style={styles.container}>
//             <Text>Bienvenue !</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Mot de passe"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//             />

//             <Button title="Se connecter" onPress={handleLogin} />
//             {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginVertical: 5,
//     },
//     error: {
//         color: 'red',
//         marginTop: 10,
//     },
// });
