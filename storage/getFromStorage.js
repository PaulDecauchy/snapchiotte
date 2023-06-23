import AsyncStorage from '@react-native-async-storage/async-storage';

async function getFromStorage(key) {
    try {
        return await AsyncStorage.getItem(key);
      } catch (e) {
        console.error(e);
      }
}

export default getFromStorage;