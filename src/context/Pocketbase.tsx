import * as React from 'react';
import { createContext } from 'react';
import PocketBase from 'pocketbase/dist/pocketbase.cjs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as store from '../store/store';
import { ClientProvider } from './Client';
import { ContentProvider } from './Content';
import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../store/reducers';
import { persistReducer } from 'redux-persist';
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage';


export const PocketbaseContext = createContext<PocketBase | null>(null);

export type PocketbaseProviderProps = {
  children: React.ReactNode;
  client: PocketBase;
  storage: AsyncStorageStatic;
};

export const Pocketbase = (props: PocketbaseProviderProps) => {
  React.useEffect(() => {
    const reducer = combineReducers({
      reducer: persistReducer({
        ...store.persistConfig,
        storage: props.storage,
      }, appReducer),
    });
    store.store.replaceReducer(reducer);
    console.log('Pocketbase client initialized');
  }, [props.client]);

  return (
    <ClientProvider client={props.client}>
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <ContentProvider collections={['inventur', 'storage_location']}>
            {props.children}
          </ContentProvider>
        </PersistGate>
      </Provider>
    </ClientProvider>
  )     
};
