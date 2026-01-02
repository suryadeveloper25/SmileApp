import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_KEY = 'PENDING_NOTIFICATION';

export const saveNotification = async (data: any) => {
  await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(data));
};

export const getNotification = async () => {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
};
