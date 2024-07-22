import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import EventCard from '../components/EventCardComponent';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchScreen = () => {
    
  const { top } = useSafeAreaInsets();
  const route = useRoute();
  const { query: searchQuery, filters } = route.params;
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventsList);
        filterEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents(events);
  }, [searchQuery, filters, events]);

  const filterEvents = (eventsList) => {
    let filtered = eventsList;

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters) {
      if (filters.location) {
        filtered = filtered.filter(event => event.location === filters.location);
      }
      if (filters.categories.length > 0) {
        filtered = filtered.filter(event => filters.categories.includes(event.category));
      }
      filtered = filtered.filter(event =>
        event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1]
      );
    }

    // Ordena los eventos por fecha (más reciente primero)
    filtered = filtered
      .slice() // Crea una copia para no mutar el estado original
      .sort((a, b) => {
        const dateA = new Date(a.year, a.month - 1, a.day); // Crea una fecha para a
        const dateB = new Date(b.year, b.month - 1, b.day); // Crea una fecha para b
        return dateA - dateB; // Ordena de más reciente a más antiguo
      });

    setFilteredEvents(filtered);
  };

  return (
    <View style={styles.container}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 5, marginTop: top, padding:15}}>Search Results</Text>
      <ScrollView style={{ padding: 15, backgroundColor: '#000', paddingBottom:30 }}>
        
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              month={event.month}
              day={event.day}
              imageUri={event.imageUri}
              description={event.description}
              category={event.category}
              location={event.location}
              participants={event.participants || []} 
              price={event.price}
              time={event.time}
              cardStyle={styles.EventCard}
            />
          ))
        ) : (
          <Text style={{ color: '#fff', fontSize: 16 }}>No results found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems:"center"
  },
  EventCard:{
    width:300,
    height:175,
    margin: 10
  }
});

export default SearchScreen;
