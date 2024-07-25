import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';

const ProfileScreen = ({ navigation, route }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || 'Usuario');
  const [photoURL, setPhotoURL] = useState(user.photoURL || 'https://i.pinimg.com/originals/92/70/02/927002368dfb5a96427ae990838dd112.jpg');

  useEffect(() => {
    if (route.params?.updatedName) {
      setDisplayName(route.params.updatedName);
    }
    if (route.params?.updatedPhoto) {
      setPhotoURL(route.params.updatedPhoto);
    }
  }, [route.params?.updatedName, route.params?.updatedPhoto]);

  return (
    <View style={styles.container}>
      
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: photoURL }}
        />
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ticketsButton}>
        <Text style={styles.ticketsButtonText}>Mis Favoritos</Text>
      </TouchableOpacity>
      <Text style={styles.noTicketsText}>Aun no tiene eventos preferidos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 50,
  },
 
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#5aaab8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  ticketsButton: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  ticketsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noTicketsText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;




