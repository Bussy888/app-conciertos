import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const monthMap = {
  1: 'JAN',
  2: 'FEB',
  3: 'MAR',
  4: 'APR',
  5: 'MAY',
  6: 'JUN',
  7: 'JUL',
  8: 'AUG',
  9: 'SEP',
  10: 'OCT',
  11: 'NOV',
  12: 'DEC',
};

const EventCard = ({ title, month, day, imageUri, description, category, location, participants, price, time, cardStyle }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { title, month, day, imageUri, description, category, price, location, time, participants: participants || [] })}>
      <ImageBackground source={{ uri: imageUri }} style={{...styles.container, ...cardStyle }} imageStyle={styles.image}>
        <View style={styles.dateContainer}>
          <Text style={styles.month}>{monthMap[parseInt(month)] || month}</Text>
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
    width: 220,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'cover',
  },
  dateContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems: 'center',
  },
  month: {
    color: '#000',
    fontWeight: '400',
  },
  day: {
    color: '#000',
    fontWeight: '900',
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
    paddingBottom: 15,
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
