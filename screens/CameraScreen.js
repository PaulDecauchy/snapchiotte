import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Button, Image, View, Platform, SafeAreaView, Text} from 'react-native';
import { shareAsync } from 'expo-sharing';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import putInStorage from "../storage/putInStorage";

export default function Snap({ navigation, route }) {

  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [image, setImage] = useState(null);
  const[photo, setPhoto] = useState();

  const camStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#fff',
      alignSelf: 'flex-end'
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
  });

  useEffect(()=> {
    (async()=> {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if(!hasCameraPermission) {
    return (<Text>Permission for camera not granted</Text>)
  }
  
  let takePic = async ()=>{
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
        putInStorage("photo", photo.base64);
        navigation.navigate('UserList', { photo: photo.base64 });
    };
    return(
      <SafeAreaView style={camStyle.container}>
        <Image  style={camStyle.preview} source={{uri :"data:image/jpg;base64," +photo.base64}}/>
        <Button title="Take Pic" onPress={takePic} />
        <Button title="Share" onPress={sharePic} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={camStyle.container} ref={cameraRef}>
      <View style={camStyle.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}