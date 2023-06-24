import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CameraScreen from '../screens/CameraScreen';
import GalleryScreen from '../screens/GalleryScreen';

const Tab = createMaterialTopTabNavigator();

function Profile() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Take from gallery" component={GalleryScreen}/>
      <Tab.Screen name="Take a photo" component={CameraScreen}/>
    </Tab.Navigator>
  );
}

export default Profile;