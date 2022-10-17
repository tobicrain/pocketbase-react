import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  static Constants = {
    SUBSCRIBED: 'subscribed',
    COOKIE: 'cookie',
  };

  static async get(key: string): Promise<string | null> {
    return typeof document !== 'undefined'
      ? localStorage.getItem(key)
      : await AsyncStorage.getItem(key);
  }

  static async set(key: string, value: string): Promise<void> {
    if (typeof document !== 'undefined') {
      return localStorage.setItem(key, value);
    } else {
      return await AsyncStorage.setItem(key, value);
    }
  }

  static async remove(key: string): Promise<void> {
    if (typeof document !== 'undefined') {
      return localStorage.removeItem(key);
    } else {
      return await AsyncStorage.removeItem(key);
    }
  }
}
