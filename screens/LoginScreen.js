import * as React from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper';
// import "../styles.css";

function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const hideDialog = () => setVisible(false);

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
                    setVisible(true);
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
                        <Text variant="bodyMedium" style={{color: "rgb(186, 26, 26)"}}>test</Text>
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
                Press me
            </Button>
        </View>
    );
}

export default LoginScreen;