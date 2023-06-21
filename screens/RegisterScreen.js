import * as React from 'react';
import { Button, View, Text } from 'react-native';

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register</Text>
      <Button 
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default RegisterScreen;
// ... other code from the previous section