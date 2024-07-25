import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const VerTicketsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params;

  const handleScan = () => {
    navigation.navigate('EventDetails', { 
      id: event.id, 
      title: event.title, 
      month: event.month, 
      day: event.day, 
      imageUri: event.imageUri, 
      description: event.description, 
      participants: event.participants, 
      location: event.location, 
      price: event.price, 
      time: event.time 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Image source={{ uri: event.imageUri }} style={styles.image} />
      <Text style={styles.detail}>Fecha: {event.date}</Text>
      <Text style={styles.detail}>Hora: {event.time}</Text>
      <Text style={styles.detail}>Ubicación: {event.location}</Text>
      <Text style={styles.detail}>About: {event.description}</Text>
      <View style={styles.qrContainer}>
        <QRCode value={event.id} size={200} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>Escanear Código QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detail: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  qrContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6ED0E0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerTicketsScreen;
