import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

function LoggedTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused
              ? 'settings'
              : 'settings-outline';
          } else if (route.name === 'Envoyer') {
            iconName = focused ? 'send' : 'send-outline';
          } else if (route.name === 'Mes snaps') {
            iconName = focused ? 'download' : 'download-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Mes snaps"
        component={LoginScreen}
        options={{ tabBarBadge: 8 }} />
      <Tab.Screen
        name="Envoyer"
        component={RegisterScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default LoggedTab;