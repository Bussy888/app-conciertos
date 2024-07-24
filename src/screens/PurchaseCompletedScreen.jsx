import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PurchaseCompletedScreen = ({ route }) => {
  const { quantity, price, title } = route.params;
  const navigation = useNavigation();

  const handleReturnToMenu = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Explore' }],
    });
  };

  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle" size={100} color="#4caf50" style={styles.checkIcon} />
      <Text style={styles.congratulations}>Congratulations!</Text>
      <Text style={styles.message}>Purchase completed for {quantity} tickets for {title} at ${price}</Text>
      <TouchableOpacity onPress={handleReturnToMenu}>
        <LinearGradient
          colors={['#6ED0E0', '#E04989']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.button}>
          <Text style={styles.buttonText}>Return to Menu</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  checkIcon: {
    marginBottom: 16
  },
  congratulations: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  message: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16
  },
  button: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default PurchaseCompletedScreen;
