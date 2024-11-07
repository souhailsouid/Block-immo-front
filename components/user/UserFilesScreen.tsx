import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { auth} from 'authentification-library';

export default function UserFilesScreen() {
  interface File {
    id: string;
    fileName: string;
    fileUrl: string;
  }

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserFiles = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        
        const response = await fetch(`http://localhost:3000/storage/user-files`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des fichiers');
        }

        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error('Error fetching user files:', error);
        setErrorMessage('Erreur lors du chargement des fichiers.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserFiles();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Documents</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <FlatList
        data={files}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text>{item.fileName}</Text>
            <Button title="Télécharger" onPress={() => Linking.openURL(item.fileUrl)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  error: { color: 'red' },
  fileItem: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#ccc' },
});
