import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthTab from './stacks/AuthTab';


function App() {
  return (
    <NavigationContainer>
      <AuthTab />
    </NavigationContainer>
  )
}

export default App;
