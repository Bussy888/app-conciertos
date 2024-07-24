import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryCard = ({ title, events }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Category', { category: title })}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.events}>{events}</Text>
      </View>
    </TouchableOpacity>
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
