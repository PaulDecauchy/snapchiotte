import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthTab from './stacks/AuthTab';
import LoggedTab from './stacks/LoggedTab';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';
import getFromStorage from './storage/getFromStorage';
import AuthContext from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

function App() {
  const [logged, setLogged] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getFromStorage('user').then((user) => {
      if (user !== null) {
        setLogged(true);
      }
      setLoading(false);
    });
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('user');
    setLogged(false);
  }

  return (
    <PaperProvider>
      <AuthContext.Provider value={{ logged, setLogged, logout }}>
        <NavigationContainer>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator animating={true} color="blue" />
            </View>
          ) : logged ? (
            <LoggedTab />
          ) : (
            <AuthTab />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
