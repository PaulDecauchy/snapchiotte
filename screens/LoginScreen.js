import * as React from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
import getFromStorage from "../storage/getFromStorage";
import putInStorage from "../storage/putInStorage";
import { CommonActions } from '@react-navigation/native';
import AuthContext from "../AuthContext";
// import "../styles.css";

function LoginScreen({ navigation, route}) {
    const { setLogged } = React.useContext(AuthContext);
    const userInfo = route.params?.userInfo || { email: "", password: "" };
    const [email, setEmail] = React.useState(userInfo.email);
    const [password, setPassword] = React.useState(userInfo.password);
    const [error, setError] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        if (userInfo.email.length != 0) {
        setEmail(userInfo.email);
        setPassword(userInfo.password);
        }
    }, [userInfo]);

    const hideDialog = () => {
        setVisible(false);
        setLoading(false);
    };
   
    function handlePress(e) {
        
        e.preventDefault();
        setLoading(false);
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
            <TextInput
                id="email"
                style={{ minWidth: "50%", maxWidth: "80%" }}
                label="Email"
                mode="outlined"
                activeOutlineColor="blue"
                value={email}
                error={errorEmail ? true : false}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                id="password"
                style={{ minWidth: "50%", maxWidth: "80%", marginTop: "2%" }}
                label="Password"
                mode="outlined"
                value={password}
                activeOutlineColor="blue"
                secureTextEntry={true}
                error={errorPassword ? true : false}
                onChangeText={password => setPassword(password)}
                right={<TextInput.Icon icon="eye" />}
            />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={{color: "rgb(186, 26, 26)"}}>{error}</Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            <Button
                style={{ minWidth: "20%", marginTop: "3%" }}
                type="contained"
                loading={loading}
                icon="login"
                mode="contained"
                buttonColor="blue"
                rippleColor="gray"
                onPress={(e) => handlePress(e)}>
                Login
            </Button>
        </View>
    );
}

export default LoginScreen;