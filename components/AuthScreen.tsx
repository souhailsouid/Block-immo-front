// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// // import { auth } from 'authentification-library';
// import { auth } from '../firebaseConfig';
// import { useNavigation } from '@react-navigation/native';


// export default function AuthScreen() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [user, setUser] = useState(null);
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

//     // Fonction pour se connecter avec email et mot de passe
//     const handleLogin = async () => {
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;

//                 // Vérifier si c'est la première connexion
//                 if (user.metadata.creationTime === user.metadata.lastSignInTime) {
//                     // Rediriger vers la page profil pour compléter les informations
//                     // navigation.navigate('profil/[id]', { id: user.uid });
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
//             {user ? (
//                 <Text>Bienvenue {user?.email}</Text>
//             ) : (
//                 <View>
//                     <Text>Bienvenue !</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Mot de passe"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Confirmer le mot de passe"
//                         value={confirmPassword}
//                         onChangeText={setConfirmPassword}
//                         secureTextEntry
//                     />
//                     <Button title="S'inscrire" onPress={handleSignUp} />
//                     <Button title="Se connecter" onPress={handleLogin} />
//                     {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
//                 </View>
//             )}
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
