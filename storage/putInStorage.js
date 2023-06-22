import AsyncStorage from '@react-native-async-storage/async-storage';

async function putInStorage(key, value) {
    try {
        return await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.error(e);
      }
}

export default putInStorage;