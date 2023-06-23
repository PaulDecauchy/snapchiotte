import React from 'react';
import { View, Text, Image } from 'react-native';

function SeeSnap({navigate, route}) {
    const { snap } = route.params;
    return (
        <View>
            <Text>{snap._id}</Text>
            <Image source={{uri: snap.image}} style={{width: 200, height: 200}} />
        </View>
    )
    }

export default SeeSnap;