import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import RenderSnap from './RenderSnap';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdncGhvbml4NDQ1QGdtYWlsLmNvbSIsImlkIjoiNjQ5MDI4OThmYjgzODQwMDc4NTcyM2RiIiwiaWF0IjoxNjg3NDI3NDczLCJleHAiOjE2ODc1MTM4NzN9.Lrcy8MI4_2CaGD9YtimD4eVtkg1kQmRAcc49zRXATI0";

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [snaps, setSnaps] = useState([]);

    const getSnaps = async () => {
    try {
        const response = await fetch('https://mysnapchat.epidoc.eu/snap', {
        headers: {
            Authorization: "Bearer " + token
        }
        });
        const json = await response.json();
        console.log(json.data)
        setSnaps(json.data); 
    } catch (error) {
        console.error(error);
    }
    };

    useEffect(() => {
        getSnaps();
    }, []);

    useEffect(() => {
        // console.log(snaps);
        if (snaps.length > 0){
            setLoading(false);
        }
    }, [snaps])

    if (isLoading == false) {
        return (
            <View>
                <RenderSnap item={"64955ce6fb838400785724b8"}/>
            {/* <Text>{JSON.stringify(snaps.data)}</Text> */}
            {/* <RenderSnap /> */}
            {/* <FlatList 
                data={snaps}
                renderItem={({item}) => <RenderSnap item={item._id} />}
                keyExtractor={({_id}) => _id}
            /> */}
            </View>
        );
    }
return <View><Text>Loading</Text></View>
};

export default App;