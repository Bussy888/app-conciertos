import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const TicketInSaleScreen = ({ route, navigation }) => {
  const { title, imageUri, location, date, time, price } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleDecrease = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const handlePurchase = () => {
    navigation.navigate('PurchaseCompleted', { quantity, price: price * quantity, title });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name='arrow-back' size={25} color="#ffffff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.detail}>Location: {location}</Text>
        <Text style={styles.detail}>Date: {date}</Text>
        <Text style={styles.detail}>Time: {time}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButtonMinus}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButtonPlus}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handlePurchase}>
          <LinearGradient
            colors={['#6ED0E0', '#E04989']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}>
            <Text style={styles.buttonText}>Complete Purchase for ${price * quantity}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16
  },
  backButton: {
    margin: 16,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    marginTop: 35
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center'
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8
  },
  detail: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 10,
    textAlign:'center',
    marginHorizontal:50,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:30,
  },
  quantityButtonMinus: {
    backgroundColor: 'red',
    width:50,
    height:50,
    borderRadius: 30,
    marginHorizontal: 8,
    alignItems:'center',
    justifyContent:'center',
  },
  quantityButtonPlus: {
    backgroundColor: 'green',
    width:50,
    height:50,
    borderRadius: 30,
    marginHorizontal: 8,
    alignItems:'center',
    justifyContent:'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight:'700'
  },
  quantity: {
    color: '#fff',
    fontSize: 25,
    marginHorizontal: 16,
    fontWeight:'800'
  },
  button: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    
    marginTop:50
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default TicketInSaleScreen;
