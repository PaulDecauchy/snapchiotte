import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { TextInput, Button, Text, Dialog, Portal, TouchableRipple } from 'react-native-paper';
import getFromStorage from "../storage/getFromStorage";
import putInStorage from "../storage/putInStorage";
import AuthContext from "../AuthContext";
import User from "../components/User";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function UserList({ navigation, route }) {
  const photo = route.params.photo;
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [duration, setDuration] = useState(5); // Default duration value of 5 seconds


  function getUsers() {
    getFromStorage("user").then((loggedUser) => {
      fetch('https://mysnapchat.epidoc.eu/user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(loggedUser).token}`
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw response.json();
          }
        }).then((response) => {
            console.log(response.data.slice(0, 10));
          setUsers(response.data.slice(0, 100));
          setLoading(false);
        })
        .catch((err) => {
          err.then((error) => {
            setError(error.data);
            console.error(error);
          });
        });
    });
  }

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);

  const handlePress = (user, photo) => {
    getFromStorage("user").then((loggedUser) => {
        console.log(loggedUser);
      fetch('https://mysnapchat.epidoc.eu/snap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(loggedUser).token}`
        },
        body: JSON.stringify({
          to: user._id,
          image: `data:image/png;base64,${photo}`,
          duration: duration
        })
      })
        .then((response) => {
          if (response.status === 200) {
            setIsSent(true);
            return response.json();
          } else {
            throw response.json();
          }
        })
        .catch((err) => {
          err.then((error) => {
            setError(error.data);
            console.error(error);
          });
        });
    });
  }
if (!photo) {
    return (
      <View>
        <Text>Vous devez prendre une photo avant d'envoyer un snap !</Text>
        <Button onPress={() => navigation.navigate("Take from gallery")}>Choisir une  photo</Button>
      </View>
    );
  
}
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  } else if (isSent) {
    return (
      <View>
        <Text>Le snap a bien été envoyé !</Text>
      </View>
    );
  } else {
    return (
      <View>
        
        <TextInput
          label="Duration (in seconds)"
          value={duration.toString()}
          onChangeText={(text) => setDuration(parseInt(text))}
        />
        <Text>Utilisateurs</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => <User user={item} onUserClicked={() => handlePress(item, photo)}></User>}
        />
      </View>
    );
  }
}
