
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreScreen from '../screens/ExploreScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TicketsScreen from '../screens/TicketsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import TicketInSaleScreen from '../screens/TicketsInSaleScreen';
import PurchaseCompletedScreen from '../screens/PurchaseCompletedScreen';
import ReembolsoScreen from '../screens/ReembolsoScreen'; 
import VerTicketsScreen from '../screens/VerTicketsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreMenu" component={ExploreScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="TicketInSale" component={TicketInSaleScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PurchaseCompleted" component={PurchaseCompletedScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const CalendarStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarMenu" component={CalendarScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="TicketInSale" component={TicketInSaleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMenu" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
const TicketStack =()=>{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TicketsMenu" component={TicketsScreen} />
      <Stack.Screen name="ReembolsoScreen" component={ReembolsoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="VerTicketsScreen" component={VerTicketsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
const MenuNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Explore') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#0087BD',
        tabBarInactiveTintColor: '#888',
        headerShown: false
      })}
    >
      <Tab.Screen name="Explore" component={ExploreStack} screenOptions={{ headerShown: false }} />
      <Tab.Screen name="Calendar" component={CalendarStack} screenOptions={{ headerShown: false }} />
      <Tab.Screen name="Tickets" component={TicketStack} screenOptions={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStack} screenOptions={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MenuNavigation;
