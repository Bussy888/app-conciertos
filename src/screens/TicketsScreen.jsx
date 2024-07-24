import React from 'react';
import { View,SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const sampleCartItems = [
  {
    id: '1',
    title: 'Concierto The Weekend',
    date: 'July 30, 2024',
    image: 'https://i.pinimg.com/originals/c9/21/a1/c921a14461d300ce80f11e171a46c251.jpg',
    quantity: 1,
  },
  {
    id: '2',
    title: 'Concierto Emilia',
    date: 'August 4, 2024',
    image: 'https://i.pinimg.com/originals/c3/a5/0c/c3a50c845e61660747f1ed56e3574de5.jpg',
    quantity: 4,
  },
  {
    id: '3',
    title: 'Concierto Coldplay',
    date: 'August 28, 2024',
    image: 'https://i.pinimg.com/originals/58/5e/4a/585e4a6f79ddab9d21e1ad8cb3660201.jpg',
    quantity: 2,
  },
];

const TicketsScreen = () => {
  const renderCartItem = ({ item }) => (
    <SafeAreaView style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
      <TouchableOpacity style={styles.button}>
      <LinearGradient
      colors={['#6ED0E0', '#E04989']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}>
      
          <Text style={styles.buttonText}>Comprar</Text>
        
    </LinearGradient>
    </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
        
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleCartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    padding: 30,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  details: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6ED0E0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
   removeButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketsScreen;

