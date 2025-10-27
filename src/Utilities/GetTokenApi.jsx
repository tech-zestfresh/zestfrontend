import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadSession = async () => {
  const session = await AsyncStorage.getItem('userSession');
  if (session) {
    const { token, phone } = JSON.parse(session);
    return { token, phone };
  }
  return null;
};