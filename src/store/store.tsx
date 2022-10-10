import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { appReducer } from './reducers';
import thunk from 'redux-thunk';
import { RecordAction } from './reducers/records';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}


const CustomStorage: Storage = {
  getItem: async (_key: string, ..._args: Array<any>) => {
    if (typeof document !== 'undefined') {
      return localStorage.getItem(_key);
    }
    else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return await AsyncStorage.getItem(_key);
    }
  },
  setItem: async (_key: string, _value: any, ..._args: Array<any>) => {
    if (typeof document !== 'undefined') {
      return localStorage.setItem(_key, _value);
    }
    else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return await AsyncStorage.setItem(_key, _value);
    }
  },
  removeItem: async (_key: string, ..._args: Array<any>) => {
    if (typeof document !== 'undefined') {
      return localStorage.removeItem(_key);
    }
    else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return await AsyncStorage.removeItem(_key);
    }
  },
};

export const persistConfig = {
  key: 'root',
  storage: CustomStorage
};

const reducer = combineReducers({
  reducer: persistReducer(persistConfig, appReducer),
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

type AppDispatch = typeof store.dispatch<RecordAction>;
const useAppDispatch = store.dispatch;
type RootState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


const persistor = persistStore(store);

export { AppDispatch, RootState, useAppDispatch, useAppSelector, store, persistor };