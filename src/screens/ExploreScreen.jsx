import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBarComponent';
import EventCard from '../components/EventCardComponent';
import ClaimCard from '../components/ClaimCardComponent';
import CategoryCard from '../components/CategoryCardComponent';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
    <ScrollView style={{ padding: 16, backgroundColor: '#000' , paddingTop:35}}>
      <Text style={{ color: '#fff', marginBottom: 8 }}>November 20, 9:31 PM</Text>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Explore events</Text>
      <SearchBar />
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Popular</Text>
      <ScrollView horizontal>
        <EventCard title="The Weeknd" month="Nov" day="21" imageUri='https://d.newsweek.com/en/full/1617060/weeknd.jpg'description="This week, Abel comes back to California to perform his newest studio album, as well as some newest hits. Check him out!"/>
        <EventCard title="Ariana Grande" month="Nov" day="22" imageUri="https://arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/IZYNZACAVYI6PI7W3BZZV22WQQ.jpg" description="Ariana Grande is back on stage with her latest hits. Don't miss out on her incredible performance!"  />
      </ScrollView>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>For You</Text>
      <ClaimCard />
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Categories</Text>
      <ScrollView horizontal>
        <CategoryCard title="Concerts" events="17 events" />
        <CategoryCard title="Movies" events="21 events" />
      </ScrollView>
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#0000'
  },
}
)

export default ExploreScreen;
