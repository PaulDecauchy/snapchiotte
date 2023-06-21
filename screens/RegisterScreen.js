import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function RegisterScreen({ navigation }) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);

  function handlePress(e) {
    e.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);
    if (email.length === 0) {
        setErrorEmail(true);
        return;
    }
    if (password.length === 0) {
        setErrorPassword(true);
        return;
    }

    const data = {
        email,
        password,
    };

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
                setError('Request failed with status ' + response.status);
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .then((data) => {
            console.log(data);
            data.logged = true;
            setUser(data);
            navigate(`/profile/${data.login}`);
        })
        .catch((error) => {
            console.error(error);
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
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%" }}
        label="Login"
        mode="outlined"
        activeOutlineColor="blue"
        value={login}
        onChangeText={login => setLogin(login)}
      />
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%" }}
        label="Password"
        mode="outlined"
        value={password}
        activeOutlineColor="blue"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        right={<TextInput.Icon icon="eye" />}
      />
      <Button
        style={{ minWidth: "20%", marginTop: "1%" }}
        type="contained"
        loading={false}
        icon="login"
        mode="contained"
        buttonColor="blue"
        rippleColor="gray"
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}

export default RegisterScreen;
// ... other code from the previous section