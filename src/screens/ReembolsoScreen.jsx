import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useCartStore from '../store/cartStore';

const ReembolsoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleReembolso = (accept) => {
    if (accept) {
      removeFromCart(itemId);
      Toast.show({
        type: 'success',
        text1: 'Reembolso',
        text2: 'Se realizó el reembolso con éxito',
      });
      setTimeout(() => {
        navigation.navigate('Tickets');
      }, 2000); // Espera 2 segundos antes de navegar
    } else {
      navigation.navigate('Tickets');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>¿Desea que se le haga el reembolso de los boletos?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleReembolso(true)}>
          <Text style={styles.buttonText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => handleReembolso(false)}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
  message: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  button: {
    backgroundColor: '#6ED0E0',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    
  },
  button2: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReembolsoScreen;
