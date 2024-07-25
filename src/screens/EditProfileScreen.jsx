import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LoginScreen from './LoginScreen';
import { getAuth, updateProfile } from 'firebase/auth';
import profileImages from '../data/profileImage';
import { FlatList } from 'react-native-gesture-handler';

const EditProfileScreen = ({ navigation, route }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState(user.displayName || '');
    const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  
    const handleSave = () => {
      updateProfile(user, { displayName, photoURL })
        .then(() => {
          alert('Perfil actualizado');
          navigation.navigate('ProfileMenu', { updatedName: displayName, updatedPhoto: photoURL });
        })
        .catch(error => {
          console.error('Error actualizando el perfil:', error);
        });
    };
  
    const renderImageItem = ({ item }) => (
      <TouchableOpacity onPress={() => setPhotoURL(item)}>
        <Image source={{ uri: item }} style={styles.imageOption} />
      </TouchableOpacity>
    );

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace(LoginScreen); 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <Image style={styles.profileImage} source={{ uri: photoURL || 'https://via.placeholder.com/150' }} />
      <FlatList
        data={profileImages}
        renderItem={renderImageItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={displayName}
        onChangeText={setDisplayName}
      />
      
      
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>cerrar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
      },
      title: {
        marginTop: 20,
        fontSize: 24,
        color: '#fff',
        marginBottom: 60,
        fontWeight: 'bold',
      },
      profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
      },
      imageOption: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
      },
      imageList: {
        marginVertical: 30,
      },
      input: {
        width: '100%',
        padding: 10,
        marginVertical: 5, 
        backgroundColor: '#fff',
        borderRadius: 5,
        
      },
      saveButton: {
        backgroundColor: '#6ED0E0',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        
        marginVertical: 50,
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      logoutButton: {
        backgroundColor: '#d9534f',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 40,
      },
      logoutButtonText: {
        color: '#fff',
        fontSize: 16,
      },
});

export default EditProfileScreen;

