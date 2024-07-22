import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore'; // Usa la API modular
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarScreen = () => {
  const { top } = useSafeAreaInsets();
  const [eventsByMonth, setEventsByMonth] = useState({});
  const navigation = useNavigation(); // Inicializa useNavigation

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const eventsByMonth = eventsList.reduce((acc, event) => {
          const month = event.month;
          const year = event.year;
          const key = `${month}-${year}`;
          
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(event);
          return acc;
        }, {});

        setEventsByMonth(eventsByMonth);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const renderEventCard = ({ item: event }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('EventDetails', {
        title: event.title,
        month: event.month,
        day: event.day,
        imageUri: event.imageUri,
        description: event.description,
        category: event.category,
        price: event.price,
        location: event.location,
        time: event.time,
        participants: event.participants || []
      })}
    >
      <Image source={{ uri: event.imageUri }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.location}>{event.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMonthSection = ({ item: key }) => {
    const [month, year] = key.split('-');
    const monthName = monthNames[parseInt(month, 10) - 1];
    const events = eventsByMonth[key] || [];

    return (
      <View style={styles.monthSection}>
        <Text style={styles.monthTitle}>{`${monthName} ${year}`}</Text>
        <FlatList
          data={events}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const sortedKeys = Object.keys(eventsByMonth).sort((a, b) => {
    const [monthA, yearA] = a.split('-').map(Number);
    const [monthB, yearB] = b.split('-').map(Number);

    if (yearA === yearB) {
      return monthA - monthB;
    }
    return yearA - yearB;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedKeys}
        renderItem={renderMonthSection}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingTop: top }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro para la pantalla
    padding: 16,
  },
  monthSection: {
    marginBottom: 16,
  },
  monthTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#333', // Fondo de la tarjeta
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    color: '#ccc',
    fontSize: 16,
    marginVertical: 4,
  },
  location: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default CalendarScreen;
