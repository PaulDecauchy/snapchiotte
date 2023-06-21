import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthTab from './stacks/AuthTab';
import { PaperProvider } from 'react-native-paper';


function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthTab />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App;
