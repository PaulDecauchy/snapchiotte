import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Button, Image, View, Platform, SafeAreaView, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import putInStorage from "../storage/putInStorage";
import * as FileSystem from 'expo-file-system';


export default function Gallery({ navigation, route }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        }); 
        if (!result.canceled) {
        console.log(result)
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
        setImage(base64);
        }
    };

    if (image){
        let sharePic = () => {
            console.log(image)
            
            putInStorage("photo", image);
            navigation.navigate('UserList', { photo: image });
        };
        return(
            <SafeAreaView>
                <Button title="Share" onPress={sharePic} />
                <Button title="Discard" onPress={() => setImage(undefined)} />
            </SafeAreaView>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick from Gallery" onPress={pickImage} color ="purple" />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}