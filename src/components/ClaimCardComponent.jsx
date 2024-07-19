import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClaimCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Claim 3 free tickets!</Text>
      <Text style={styles.subText}>Open a Premium account and get 3 tickets instantly.</Text>
    </View>
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
