import * as React from 'react';
import { Platform, View } from 'react-native';
import { TextInput, Button, Text, Dialog, Portal, TouchableRipple, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import putInStorage from '../storage/putInStorage';
import getFromStorage from '../storage/getFromStorage';
import * as FileSystem from 'expo-file-system';

function UpdateProfile({ navigation }) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [dialog, setDialog] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorLogin, setErrorLogin] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user1 = await getFromStorage('user');
        const json = await JSON.parse(user1);
        setUser(json);
        setLogin(json.username);
        setEmail(json.email);
        if (json.profilePicture !== "") {
          setImage(json.profilePicture);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    console.log(user);
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    // console.log(result);
    console.log(result.assets[0].uri);

    if (!result.canceled) {
      
      let uri = result.assets[0].uri;

      console.log(uri);
      setImage(uri);
    }
  };

  const hideDialog = () => setVisible(false);

  async function handlePress(e) {
    e.preventDefault();
    setErrorEmail(false);
    setErrorLogin(false);
    setErrorPassword(false);
    if (email.length === 0) {
      setErrorEmail(true);
      return;
    }
    if (password.length === 0) {
      setErrorPassword(true);
      return;
    }

    if (login.length === 0) {
      setErrorLogin(true);
      return;
    }
    

    let base64Image = '';
  if (Platform.OS === 'web') {
    base64Image = image;
  } else {
    try {
      const imageBase64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });
      base64Image = `data:image/jpeg;base64,${imageBase64}`;
    } catch (error) {
      console.error('Error reading image file:', error);
      return;
    }
  }

  const data = {
    email,
    username: login,
    password,
    profilePicture: base64Image,
  };
    console.log(data);
    fetch("https://mysnapchat.epidoc.eu/user", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then((json) => {
        putInStorage('user', data);
        setVisible(true);
        setDialog("Votre profil a bien été modifié");
      })
      .catch((error) => {
        error.then((err) => {
          console.error(err.data);
          setDialog(err.data);
          setVisible(true);
        }
        );
      });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableRipple onPress={selectImage} rippleColor="rgba(0, 0, 0, .32)">
        {image ? <Avatar.Image size={100} source={{ uri: image }} /> : <Avatar.Text size={100} label={`${login.slice(0, 1).toUpperCase()}`} />}
      </TouchableRipple>
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%" }}
        label="Email"
        mode="outlined"
        activeOutlineColor="blue"
        value={email}
        error={errorEmail}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%", marginTop: "2%" }}
        label="Login"
        mode="outlined"
        activeOutlineColor="blue"
        value={login}
        error={errorLogin ? true : false}
        onChangeText={login => setLogin(login)}
      />
      <TextInput
        style={{ minWidth: "50%", maxWidth: "80%", marginTop: "2%" }}
        label="Password"
        mode="outlined"
        value={password}
        error={errorPassword ? true : false}
        activeOutlineColor="blue"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        right={<TextInput.Icon icon="eye" />}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ color: "rgb(186, 26, 26)" }}>{dialog}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Button
        style={{ minWidth: "20%", marginTop: "3%" }}
        type="contained"
        loading={false}
        icon="cloud-upload-outline"
        mode="contained"
        buttonColor="blue"
        rippleColor="gray"
        onPress={(e) => handlePress(e)}>
        Modifier
      </Button>
    </View>
  );
}

export default UpdateProfile;
