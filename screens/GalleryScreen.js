import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, Image, View, Platform, SafeAreaView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import putInStorage from '../storage/putInStorage';
import * as FileSystem from 'expo-file-system';

export default function Gallery({ navigation, route }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    requestGalleryPermission();
  }, []);

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
      setImage(base64);
    }
  };

  // In Gallery component
const sharePic = () => {
    if (image) {
      console.log(image);
      navigation.navigate('UserList', { photo: image });
    }
  };
  

  const discardPic = () => {
    setImage(null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick from Gallery" onPress={pickImage} color="purple" />
      <Button title="Take from Camera" onPress={() => navigation.navigate("Take a photo")} color="purple" />
      {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: 200, height: 200 }} />}
      {image && (
        <SafeAreaView>
          <Button title="Share" onPress={sharePic} />
          <Button title="Discard" onPress={discardPic} />
        </SafeAreaView>
      )}
    </View>
  );
}
