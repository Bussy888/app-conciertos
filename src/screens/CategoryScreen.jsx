import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import EventCard from '../components/EventCardComponent';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { category } = route.params;
    const [events, setEvents] = useState([]);
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        const fetchCategoryEvents = async () => {
            try {
                const eventsCollection = collection(db, 'events');
                const q = query(eventsCollection, where('category', '==', category));
                const querySnapshot = await getDocs(q);
                const eventsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Ordenar eventos por fecha
                const sortedEvents = eventsList.sort((a, b) => {
                    const dateA = new Date(a.year, a.month - 1, a.day);
                    const dateB = new Date(b.year, b.month - 1, b.day);
                    return dateA - dateB;
                });
                setEvents(sortedEvents);
            } catch (error) {
                console.error("Error fetching category events: ", error);
            }
        };

        fetchCategoryEvents();
    }, [category]);

    return (
        <View style={styles.container}>
            <View style={{...styles.header, paddingTop: top}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>Category: {category}</Text>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <EventCard
                            key={item.id}
                            title={item.title}
                            month={item.month}
                            day={item.day}
                            imageUri={item.imageUri}
                            description={item.description}
                            category={item.category}
                            location={item.location}
                            participants={item.participants || []}
                            price={item.price}
                            time={item.time}
                            cardStyle={styles.EventCard}
                        />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#222',
    },
    backButton: {
        color: '#fff',
        marginRight: 16,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 40,
    },
    list: {
        alignItems: "center",
        marginBottom: 100,
    },
    EventCard: {
        width: 300,
        height: 175,
        margin: 10,
    }
});

export default CategoryScreen;
