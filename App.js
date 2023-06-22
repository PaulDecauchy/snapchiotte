import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthTab from './stacks/AuthTab';
import LoggedTab from './stacks/LoggedTab';
import { PaperProvider } from 'react-native-paper';
import getFromStorage from './storage/getFromStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './AuthContext';


function App() {

  const [logged, setLogged] = React.useState(false);
  console.log(logged);

  React.useEffect(() => {
    getFromStorage('user').then((user) => {
      if (user !== null) {
        setLogged(true);
      }
    });
  }, []);


  return (
    <PaperProvider>
      <AuthContext.Provider value={{ logged, setLogged }}>
      <NavigationContainer>
        {
          logged ? <LoggedTab/> : <AuthTab/>
        }
      </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  )
}

export default App;
