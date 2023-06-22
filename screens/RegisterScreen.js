import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
import putInStorage from '../storage/putInStorage';

function RegisterScreen({ navigation }) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const hideDialog = () => setVisible(false);

  function handlePress(e) {
    e.preventDefault();
    setErrorEmail(false);
    setErrorLogin(false);
    setErrorPassword(false);
    setEmail("");
    setLoading(false);
    if (email.length === 0) {
      setErrorEmail(true);
      return;
    }
    if (password.length === 0) {
      setErrorPassword(true);
      return;
    }

    if (login.length === 0) {
      setErrorLogin(true);
      return;
    }

    const data = {
      email,
      username: login,
      password,
    };
    setLoading(true);
    fetch('https://mysnapchat.epidoc.eu/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then((json) => {
        setLoading(false);
        console.log(json);
        navigation.jumpTo('Login', {userInfo : data});
      })
      .catch((err) => {
        err.then((error) => {

          setLoading(false);
          setError(error.data);
          setVisible(true);
          console.error(error.data);
        });
      });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Login /> */}
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%" }}
        label="Email"
        mode="outlined"
        activeOutlineColor="blue"
        value={email}
        error={errorEmail}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%", marginTop: "2%" }}
        label="Login"
        mode="outlined"
        activeOutlineColor="blue"
        value={login}
        error={errorLogin ? true : false}
        onChangeText={login => setLogin(login)}
      />
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%", marginTop: "2%" }}
        label="Password"
        mode="outlined"
        value={password}
        error={errorPassword ? true : false}
        activeOutlineColor="blue"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        right={<TextInput.Icon icon="eye" />}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ color: "rgb(186, 26, 26)" }}>{error}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Button
        style={{ minWidth: "20%", marginTop: "3%" }}
        type="contained"
        loading={false}
        icon="file-sign"
        mode="contained"
        buttonColor="blue"
        rippleColor="gray"
        onPress={(e) => handlePress(e)}>
        Register
      </Button>
    </View>
  );
}

export default RegisterScreen;
// ... other code from the previous section