import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';
import LoginScreen from './LoginScreen';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import ExploreScreen from './ExploreScreen';

const ProfileScreen = ({ navigation, route }) => {
  
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || 'Usuario');
  const [photoURL, setPhotoURL] = useState(user.photoURL || 'https://i.pinimg.com/originals/92/70/02/927002368dfb5a96427ae990838dd112.jpg');
  
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace(LoginScreen); 
    });
  };

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
      <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
        <Text style={styles.goExplore}>No te pierdas de nada, ve a explorar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>cerrar sesión</Text>
      </TouchableOpacity>
      
      
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
  goExplore: {
    color: '#5ABAEA',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    textDecorationLine: 'underline',

  },
 
  profileContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 80,
    marginBottom: 60,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
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
    marginBottom: 100,
    position: 'absolute',
    bottom: 40,
    width: '30%',
    alignItems: 'center',
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
  logoutButton: {
    backgroundColor: '#d9534f',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
    width: '30%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;




