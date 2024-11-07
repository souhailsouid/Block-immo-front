// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// // import { auth } from 'authentification-library';
// import { auth } from '../../firebaseConfig';
// import { useNavigation } from '@react-navigation/native';



// export default function Register() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigation = useNavigation();

//     // Fonction pour créer un compte
//     const handleSignUp = async () => {
//         if (password !== confirmPassword) {
//             setErrorMessage('Les mots de passe ne correspondent pas');
//             return;
//         }

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log('Utilisateur créé : ', user.email);

//                 // Redirection vers la page profil après la première connexion
//                 navigation.navigate('profil/[id]', { id: user.uid });
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 console.log('Erreur lors de la création du compte : ', error);
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
//             <TextInput
//                 style={styles.input}
//                 placeholder="Confirmer le mot de passe"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry
//             />
//             <Button title="S'inscrire" onPress={handleSignUp} />
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
