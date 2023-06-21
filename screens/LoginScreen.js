import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';
// import "../styles.css";

function LoginScreen({ navigation }) {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {/* <Login /> */}
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
            rippleColor= "gray"
            onPress={() => console.log('Pressed')}>
                Press me
            </Button>
        </View>
    );
}

export default LoginScreen;