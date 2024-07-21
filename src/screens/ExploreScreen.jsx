// ExploreScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBarComponent';
import EventCard from '../components/EventCardComponent';
import ClaimCard from '../components/ClaimCardComponent';
import CategoryCard from '../components/CategoryCardComponent';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore'; // Usa la API modular

const ExploreScreen = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsList);

        const categoriesSet = new Set(eventsList.map(event => event.category));
        setCategories(Array.from(categoriesSet));
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 16, backgroundColor: '#000', paddingTop: 35 }}>
        <Text style={{ color: '#fff', marginBottom: 8 }}>November 20, 9:31 PM</Text>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Explore events</Text>
        <SearchBar />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Popular</Text>
        <ScrollView horizontal>
          {events.map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              month={event.month}
              day={event.day}
              imageUri={event.imageUri}
              description={event.description}
              category = {event.category}
            />
          ))}
        </ScrollView>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>For You</Text>
        <ClaimCard />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Categories</Text>
        <ScrollView horizontal>
          {categories.map(category => (
            <CategoryCard
              key={category}
              title={category}
              events={`${events.filter(event => event.category === category).length} events`}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default ExploreScreen;
