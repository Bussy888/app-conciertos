import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const EventCard = ({ title, month,day, imageUri, description, category }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress={() => navigation.navigate('EventDetails', { title, month, day, imageUri, description })}>
    <ImageBackground source={{ uri: imageUri }} style={styles.container} imageStyle={styles.image}>
      <View style={styles.dateContainer}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{category.toUpperCase()}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    width: 200,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'cover',
  },
  dateContainer: {
    flex:1,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems:"center"
  },
  month: {
    color: '#000',
    fontWeight: '400',
  },
  day: {
    color: '#000',
    fontWeight: '900',
    fontSize:18
  },
  textContainer: {
    flex:1,
    justifyContent:'flex-end',
    padding: 8,
    paddingBottom:15
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default EventCard;
