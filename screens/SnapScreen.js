import * as React from 'react';
import { View } from 'react-native';
import { List, TouchableRipple, Divider, Text, ActivityIndicator} from 'react-native-paper';
import getFromStorage from '../storage/getFromStorage';

function SnapScreen({ navigation}) {
  const token = getFromStorage('user').then((user) => {
    if (user !== null) {
      return JSON.parse(user).token;
    }
  });
  console.log(token);
  const [isLoading, setLoading] = React.useState(true);
  const [snaps, setSnaps] = React.useState([]);

  const getSnaps = async () => {
    try {
      const response = await fetch('https://mysnapchat.epidoc.eu/snap', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      });
      const json = await response.json();
      console.log(json.data);
      setSnaps(json.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getSnaps();
  }, []);

  async function handlePress(e, snapId) {
    e.preventDefault();
    try {
        const response = await fetch('https://mysnapchat.epidoc.eu/snap/' + snapId, {
          headers: {
            Authorization: `Bearer ${await token}`,
          },
        });
        const json = await response.json();
        console.log(json.data);
        navigation.navigate('Snap', { snap: json.data });
        
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} color="blue" />
        </View>
      ) : (
        <>
          {snaps.length > 0 ? (
            snaps.map((snap) => (

              <React.Fragment key={snap.date}>
                <TouchableRipple
    onPress={(e) => handlePress(e, snap._id)}
    rippleColor="rgba(0, 0, 0, .32)"
  >
                <List.Item
                  title={snap.from}
                  description={snap.from}
                  left={(props) => <List.Icon {...props} icon="folder" 
                  
                    />}
                  
                />
                </TouchableRipple>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Text>Pas de snaps recus</Text>
          )}
        </>
      )}
    </View>
  );
}

export default SnapScreen;
