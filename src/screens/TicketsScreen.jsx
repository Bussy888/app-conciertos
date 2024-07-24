import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useCartStore from '../store/cartStore';

const TicketsScreen = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const renderCartItem = ({ item }) => (
    <SafeAreaView style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.details}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.flexButton}>
          <LinearGradient
            colors={['#6ED0E0', '#E04989']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientButton}>
            <Text style={styles.secondaryButtonText}>Ver Ticket</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexButton} onPress={() => removeFromCart(item.id)}>
          <LinearGradient
          colors={['#B5B2B2', '#FF0000' ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientButton}>
          <Text style={styles.secondaryButtonText}>Reembolso</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flexButton: {
    flex: 1,
    margin: 5,
  },
  gradientButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryButton: {
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
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TicketsScreen;