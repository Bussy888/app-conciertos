import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const ClaimCard = () => {
  return (
    <LinearGradient
      colors={['#6ED0E0', '#E04989']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}>
      <Text style={styles.text}>Claim 3 free tickets!</Text>
      <Text style={styles.subText}>Open a Premium account and get 3 tickets instantly.</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#fff',
    marginTop: 8,
  },
});

export default ClaimCard;
