
import * as WebBrowser from 'expo-web-browser';
import React, { useState, useCallback } from 'react';
import { View, Button, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import {useAuthenticateWithGoogle} from 'authentification-library';


WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
    const [loading, setLoading] = useState(false);
    useWarmUpBrowser();
    const navigation = useNavigation();

    const authenticateWithGoogle = useAuthenticateWithGoogle();

    const handleGoogleSignIn = useCallback(async () => {
        setLoading(true);
        try {
            const result = await authenticateWithGoogle();
            
            if (result?.isNewUser) {
                navigation.navigate('profil/[id]', { id: result.user?.uid });
            }
        } catch (error) {
            console.error('Error signing in', error);
        } finally {
            setLoading(false);
        }
    }, [authenticateWithGoogle]);



    if ( loading) {
        return (
            <View>
                <Text>loading.</Text>
            </View>)
    }

    return (
        <View>
            {loading ? (
                <Button title="Loading..." disabled color="#fff" />
            ) : (
                <Button title='Sign in with Google' onPress={handleGoogleSignIn} color="#fff" />
            )}
        </View>
    );
}
