import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateProfile from '../screens/UpdateProfile';
import SnapScreen from '../screens/SnapScreen';
import SeeSnap from '../screens/SeeSnap';
import UserList from '../screens/UserList';
import * as React from 'react';

const Stack = createNativeStackNavigator();

function ReceiveStack() {
   
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={SnapScreen} />
      <Stack.Screen name="Snap" component={SeeSnap} />
      
    </Stack.Navigator>
  );
}

export default ReceiveStack;