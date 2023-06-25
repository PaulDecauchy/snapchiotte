import * as React from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
import getFromStorage from "../storage/getFromStorage";
import putInStorage from "../storage/putInStorage";
import { CommonActions } from '@react-navigation/native';
import AuthContext from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoggedUser({ navigation, route }) {
  const { logout } = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getFromStorage("user").then((userData) => {
      const data = JSON.parse(userData);
      console.log(data);
      setUser(data);
    });
  }, []);

  const hideDialog = () => {
    setVisible(false);
  };

  function handlePress(e) {
    e.preventDefault();

    console.log(user);
    setLoading(true);
    fetch('https://mysnapchat.epidoc.eu/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + user.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then((json) => {
        console.log(json);
        AsyncStorage.removeItem("user").then(() => {
          logout();
        });
      })
      .catch((err) => {
        err.then((error) => {
          setError(error.data);
          console.error(error);
        });
      });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ color: "rgb(186, 26, 26)" }}>{"Etes-vous sur de vouloir supprimer votre compte ?"}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={(e) => handlePress(e)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        style={{ minWidth: "20%", marginTop: "3%" }}
        type="contained"
        icon="arrow-right"
        mode="contained"
        buttonColor="blue"
        rippleColor="gray"
        onPress={() => navigation.navigate("Settings")}>
        Modifier
      </Button>
      <Button
        style={{ minWidth: "20%", marginTop: "3%" }}
        type="contained"
        icon="logout"
        mode="contained"
        buttonColor="black"
        rippleColor="gray"
        onPress={() => logout()}>
        Logout
      </Button>
      <Button
        style={{ minWidth: "20%", marginTop: "3%" }}
        type="contained"
        icon="delete"
        mode="contained"
        buttonColor="red"
        rippleColor="gray"
        onPress={() => setVisible(true)}>
        Supprimer
      </Button>
    </View>
  );
}

export default LoggedUser;
