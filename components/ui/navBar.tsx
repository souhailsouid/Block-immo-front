import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

interface User {
    firstName: string;
    imageUrl: string;
}

export default function Navbar({ user }: { user: User | null }) {
    return (
        <View style={styles.navbar}>
            <View style={styles.logoSection}>
                <Text style={styles.logo}>BlockImmo</Text>
                {user && <Text style={styles.greeting}>Bonjour, {user?.firstName}</Text>}
            </View>

            {user && (
                <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    greeting: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 1,
    },
    navLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navLink: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#cc4949',
    },
    navLinkActive: {
        backgroundColor: '#f1c40f',
    },
    navButton: {
        padding: 10,
        backgroundColor: '#cc4949',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
