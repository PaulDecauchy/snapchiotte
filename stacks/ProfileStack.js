import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoggedUser from '../screens/LoggedUser';
import UpdateProfile from '../screens/UpdateProfile';

const Tab = createMaterialTopTabNavigator();

function Profile() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Actions" component={LoggedUser} />
      <Tab.Screen name="Settings" component={UpdateProfile} />
    </Tab.Navigator>
  );
}

export default Profile;