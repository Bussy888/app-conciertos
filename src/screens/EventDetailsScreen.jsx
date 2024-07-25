import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';


const monthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const EventDetailsScreen = ({ route, navigation }) => {
  const { title, month, day, imageUri, description, participants, location, price, time } = route.params;
  const [activeTab, setActiveTab] = useState('ABOUT');

  const renderParticipant = ({ item }) => (
    <View style={styles.participantContainer}>
      <Image source={{ uri: item.photo }} style={styles.participantImage} />
      <Text style={styles.participantName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: imageUri }} style={styles.image}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={25} color="#ffffff" />
          </TouchableOpacity>
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 1)']}
            style={styles.gradient}
          />
        </ImageBackground>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={20} color="#aaa" style={styles.calendarIcon} />
            <Text style={styles.date}>{monthNames[parseInt(month)]} {day}</Text>
          </View>
          <View style={styles.dateContainer}> 
            <Icon name="time-outline" size={20} color="#aaa" style={styles.clockIcon} />
            <Text style={styles.date}>{time}</Text> 
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('ABOUT')}>
            <Text style={[styles.tab, activeTab === 'ABOUT' && styles.activeTab]}>ABOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('PARTICIPANTS')}>
            <Text style={[styles.tab, activeTab === 'PARTICIPANTS' && styles.activeTab]}>PARTICIPANTS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('LOCATION')}>
            <Text style={[styles.tab, activeTab === 'LOCATION' && styles.activeTab]}>LOCATION</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'ABOUT' && (
          <Text style={styles.description}>{description}</Text>
        )}
        {activeTab === 'PARTICIPANTS' && (
          <FlatList
            data={participants}
            renderItem={renderParticipant}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.participantsList}
          />
        )}
        {activeTab === 'LOCATION' && (
          <Text style={styles.description}>{location}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('TicketInSale', { title, imageUri, location, date: `${monthNames[month]} ${day}`, time, price, description })}>
          <LinearGradient
            colors={['#6ED0E0', '#E04989']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.button}>
            <Text style={styles.buttonText}>Buy tickets for ${price}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    opacity: 1
  },
  backButton: {
    margin: 16,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    marginTop: 35
  },
  timeContainer: {
    width: 230,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    padding: 16
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  calendarIcon: {
    marginRight: 8
  },
  date: {
    color: '#aaa',
    fontSize: 16
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  tab: {
    color: '#aaa',
    fontSize: 16,
    marginRight: 16
  },
  activeTab: {
    color: '#fff',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 4
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  saveButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16
  },
  participantsList: {
    marginBottom: 16
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  participantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  participantName: {
    color: '#fff',
    fontSize: 16
  }
});

export default EventDetailsScreen;
