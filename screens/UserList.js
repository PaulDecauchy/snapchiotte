import React, {useEffect, useState} from "react";
import { View, FlatList } from "react-native";
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
import getFromStorage from "../storage/getFromStorage";
import putInStorage from "../storage/putInStorage";
import AuthContext from "../AuthContext";
import User from "../components/User"

export default function UserList({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [isSent, setIsSent] = useState(false);
    
    function getUsers() {
        getFromStorage("user").then((loggedUser) => {
            console.log(loggedUser);
            fetch('https://mysnapchat.epidoc.eu/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${JSON.parse(loggedUser).token}`
                },
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.json();
                } 
            }).then((response) => {
                console.log(response.data.slice(0, 5));
                setUsers(response.data.slice(0, 5));
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

    const handlePress = (user) => {
        console.log('CLICKED', user);
        // e.preventDefault();
       

        // console.log(data);
        // setLoading(true);
        getFromStorage("user").then((loggedUser) => {
            console.log('PHOTO= ', route.params.photo.substring(0, 50));
            fetch('https://mysnapchat.epidoc.eu/snap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${JSON.parse(loggedUser).token}`
                },
                body: JSON.stringify({
                    to: user._id,
                    image: `data:image/png;base64,${route.params.photo}`,
                    duration: 5
                })
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setIsSent(true);
                    return response.json();
                } else {
                    // setLoading(false);
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
    
        // if (isLoading == false) {
    // return <View><Text>Loading</Text></View>
    

    if (error) {
        <View>
            <Text>{error}</Text>
        </View>
    }
    else if (isSent) {
        <View>
            <Text>Le snap a bien été envoyé !</Text>
        </View>
    } else {
        return(
            <View>
                <Text>{JSON.stringify(users[0]?.username)}</Text>
                <FlatList 
                    data={users}
                    renderItem={({item}) => <User user={item} onUserClicked={handlePress}></User>}
                /> 
            </View>
        );
    }
}