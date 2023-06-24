import * as React from "react";
import { View, Image, Text, Button } from "react-native";

export default function User({ user, onUserClicked }){
    return(
    <View>
        <Text>
            {user.profilePicture && <Image source={{ uri: user.profilePicture }} style={{ width: 50, height: 50 }} />}
            {user.username}
            <Button title="Send" onPress={() => { onUserClicked(user) }} color ="purple" />
        </Text>
    </View>
    );
}