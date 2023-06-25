// import { createMaterialTopStackNavigator } from '@react-navigation/material-top-Stacks';
import CameraScreen from '../screens/CameraScreen';
import GalleryScreen from '../screens/GalleryScreen';
import UserList from '../screens/UserList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Take from gallery" component={GalleryScreen}/>
      <Stack.Screen name="Take a photo" component={CameraScreen}/>
      <Stack.Screen name="UserList" component={UserList}/>
    </Stack.Navigator>
  );
}

export default Profile;