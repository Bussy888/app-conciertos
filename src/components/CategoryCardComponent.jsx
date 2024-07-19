import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryCard = ({ title, events }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.events}>{events}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  events: {
    color: '#bbb',
  },
});

export default CategoryCard;
