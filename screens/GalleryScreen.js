import React, { useState, useEffect, useRef} from 'react';
import {Button, Image, View, SafeAreaView, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';



export default function  Gallery() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        }); 
        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick from Gallery" onPress={pickImage} color ="purple" />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}