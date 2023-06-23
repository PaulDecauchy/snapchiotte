import * as React from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
import getFromStorage from "../storage/getFromStorage";
import putInStorage from "../storage/putInStorage";
import { CommonActions } from '@react-navigation/native';
import AuthContext from "../AuthContext";
// import "../styles.css";

function LoggedUser({ navigation, route }) {
    const { logout } = React.useContext(AuthContext);
    const [visible, setVisible] = React.useState(false);


    const hideDialog = () => {
        setVisible(false);
    };
    
    function handlePress(e) {

        e.preventDefault();
       

        console.log(data);
        setLoading(true);
        fetch('https://mysnapchat.epidoc.eu/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    // setVisible(true);
                    setLoading(false);
                    throw response.json();
                }
            })
            .then((json) => {
                console.log(json);
                getFromStorage("user").then((user) => {
                    if (!user) {
                        putInStorage("user", JSON.stringify(json.data));
                        setLoading(false);
                        setLogged(true);
                    }
                });
            })
            .catch((err) => {
                err.then((error) => {
                    setError(error.data);
                    setVisible(true);
                    console.error(error);
                });
            });
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {/* <Login /> */}
            
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={{ color: "rgb(186, 26, 26)" }}>{"lol"}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                        <Button onPress={() => console.log('Ok')}>Ok</Button>
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