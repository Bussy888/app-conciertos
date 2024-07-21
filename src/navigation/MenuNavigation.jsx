
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreScreen from '../screens/ExploreScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TicketsScreen from '../screens/TicketsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMenu" component={ExploreScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};
const MenuNavigation = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Explore') {
              iconName = focused? 'globe':'globe-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused? 'calendar': 'calendar-outline';
            } else if (route.name === 'Tickets') {
              iconName = focused? 'ticket': 'ticket-outline';
            } else if (route.name === 'Settings') {
              iconName = focused? 'settings': 'settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: '#000' },
          tabBarActiveTintColor: '#0087BD',
          tabBarInactiveTintColor: '#888',
          headerShown: false 
        })}
      >
        <Tab.Screen name="Explore" component={ExploreStack} screenOptions={{ headerShown: false }}/>
        <Tab.Screen name="Calendar" component={CalendarScreen} screenOptions={{ headerShown: false }}/>
        <Tab.Screen name="Tickets" component={TicketsScreen} screenOptions={{ headerShown: false }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} screenOptions={{ headerShown: false }}/>
      </Tab.Navigator>
  );
};

export default MenuNavigation;
