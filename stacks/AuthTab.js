import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraScreen from '../screens/CameraScreen';
import GalleryScreen from '../screens/GalleryScreen';

const Tab = createBottomTabNavigator();

function AuthTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = focused
              ? 'log-in'
              : 'log-in-outline';
          } else if (route.name === 'Register') {
            iconName = focused ? 'create' : 'create-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ tabBarBadge: 0 }} />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
      />
       <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
      />
    </Tab.Navigator>
  );
};

export default AuthTab;