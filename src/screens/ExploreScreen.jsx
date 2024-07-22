import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBarComponent';
import EventCard from '../components/EventCardComponent';
import ClaimCard from '../components/ClaimCardComponent';
import CategoryCard from '../components/CategoryCardComponent';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const ExploreScreen = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

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
        setFilteredEvents(eventsList); // Inicialmente, mostrar todos los eventos

        const categoriesSet = new Set(eventsList.map(event => event.category));
        setCategories(Array.from(categoriesSet));

        const locationsSet = new Set(eventsList.map(event => event.location));
        setLocations(Array.from(locationsSet));
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const formatDateTime = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  const handleFilter = (filters) => {
    const filtered = events.filter(event => {
      const matchesLocation = filters.location ? event.location === filters.location : true;
      const matchesCategory = filters.categories.length > 0 ? filters.categories.includes(event.category) : true;
      const matchesPrice = event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1];
      return matchesLocation && matchesCategory && matchesPrice;
    });
    setFilteredEvents(filtered);
  };

  // Ordena los eventos por fecha completa y selecciona los 3 más recientes
  const getPopularEvents = () => {
    return filteredEvents
      .slice() // Crea una copia para no mutar el estado
      .sort((a, b) => {
        const dateA = new Date(a.year, a.month - 1, a.day); // Crea una fecha para a
        const dateB = new Date(b.year, b.month - 1, b.day); // Crea una fecha para b
        return dateA - dateB; // Ordena de más reciente a más antiguo
      })
      .slice(0, 5); // Selecciona los 3 eventos más recientes
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 16, backgroundColor: '#000', paddingTop: 40 }}>
        <Text style={{ color: '#fff', marginBottom: 8 }}>{formatDateTime(currentTime)}</Text>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Explore events</Text>
        <SearchBar onSearch={() => {}} onFilter={handleFilter} locations={locations} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Popular</Text>
        <ScrollView horizontal>
          {getPopularEvents().map(event => (
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
              events={`${filteredEvents.filter(event => event.category === category).length} events`}
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
