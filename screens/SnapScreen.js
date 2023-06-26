import * as React from 'react';
import { View } from 'react-native';
import { List, TouchableRipple, Divider, Text, ActivityIndicator, Avatar } from 'react-native-paper';
import getFromStorage from '../storage/getFromStorage';
import NotificationContext from '../stacks/NotifCOntext';
import { useIsFocused } from '@react-navigation/native';

function SnapScreen({ navigation, route }) {
    const [isLoading, setLoading] = React.useState(true);
    const { updateNotificationCount } = React.useContext(NotificationContext);
    const [snaps, setSnaps] = React.useState([]);
    const isFocused = useIsFocused();

    const getSnaps = async () => {
        const token = await getFromStorage('user').then((user) => {
            if (user !== null) {
                return JSON.parse(user).token;
            }
        });
        console.log(token);

        try {
            const response = await fetch('https://mysnapchat.epidoc.eu/snap', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await response.json();
            console.log(json.data);
            if (json.data.length > 0) {
                const newNotificationCount = json.data.length; // Assuming snaps is an array containing all the snaps
                updateNotificationCount(newNotificationCount);
                for (const snap of json.data) {
                    const user = await userInfo(snap.from); // Use a different variable name for user
                    snap.user = user; // Assign the user to the snap object
                }
            } else {
                updateNotificationCount(0);
            }
            setSnaps(json.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const userInfo = async (userId) => {
        const token = await getFromStorage('user').then((user) => {
            if (user !== null) {
                return JSON.parse(user).token;
            }
        });

        try {
            const response = await fetch(`https://mysnapchat.epidoc.eu/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await response.json();
            console.log(json.data);
            return json.data;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getSnaps();
    }, [isFocused]);

    async function handlePress(e, snapId) {
        e.preventDefault();
        try {
            const token = await getFromStorage('user').then((user) => {
                if (user !== null) {
                    return JSON.parse(user).token;
                }
            });

            const response = await fetch(`https://mysnapchat.epidoc.eu/snap/${snapId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await response.json();
            console.log(json.data);
            navigation.navigate('Snap', { snap: json.data });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

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
                                <TouchableRipple onPress={(e) => handlePress(e, snap._id)} rippleColor="rgba(0, 0, 0, .32)">
                                    <List.Item
                                        title={snap.user.username}
                                        description={snap.date + ' secondes'}
                                        left={(props) => {
                                            return snap.user.profilePicture ? (
                                                <Avatar.Image size={100} source={{ uri: snap.user.profilePicture }} />
                                            ) : (
                                                <Avatar.Text size={100} label={`${snap.user.username.slice(0, 1).toUpperCase()}`} />
                                            );
                                        }}
                                    />
                                </TouchableRipple>
                                <Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <Text>Pas de snaps reçus</Text>
                    )}
                </>
            )}
        </View>
    );
}

export default SnapScreen;
