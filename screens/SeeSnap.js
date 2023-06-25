import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getFromStorage from '../storage/getFromStorage';

function SeeSnap({ route }) {
  const token = getFromStorage('user').then((user) => {
    if (user !== null) {
      return JSON.parse(user).token;
    }
  });
  const navigation = useNavigation();
  const { snap } = route.params;
  const [timer, setTimer] = React.useState(snap.duration);

  const isSeen = async () => {
    try {
      await fetch(`https://mysnapchat.epidoc.eu/snap/seen/${snap._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const TimerInt = timer > 0 && setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    if (timer === 0) {
      navigation.goBack();
    }

    return () => {
      clearInterval(TimerInt);
    };
  }, [timer]);

  useEffect(() => {
    isSeen();
  }, [snap]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: snap.image }}
        style={{ flex: 1, height: '100%' }}
        resizeMode="contain"
      >
        <Text
          style={{
            color: 'white',
            width: 25,
            height: 25,
            alignItems: 'center',
            textAlign: 'center',
            position: 'absolute',
            right: 15,
            top: 10,
            backgroundColor: '#57524e8c',
            borderRadius: 25,
          }}
        >
          {timer}
        </Text>
      </ImageBackground>
    </View>
  );
}

export default SeeSnap;
