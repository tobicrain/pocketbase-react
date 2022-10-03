import * as React from 'react';
import { createContext, useEffect } from 'react';
import PocketBase from 'pocketbase/dist/pocketbase.cjs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as store from '../store/store';
import { ClientProvider } from './client';
import { ContentProvider } from './content';
import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../store/reducers';
import { persistReducer } from 'redux-persist';
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

export const PocketbaseContext = createContext<PocketBase | null>(null);

export type PocketbaseProviderProps = {
  children: React.ReactNode;
  serverURL: string;
  credentials: {
    username: string;
    password: string;
  };
  initialCollections?: string[];
  storage: AsyncStorageStatic;
};

export const Pocketbase = (props: PocketbaseProviderProps) => {
  const [client, setClient] = React.useState<PocketBase | null>(null);
  useEffect(() => {
    const reducer = combineReducers({
      reducer: persistReducer({
        ...store.persistConfig,
        storage: props.storage,
      }, appReducer),
    });
    store.store.replaceReducer(reducer);

    const client = new PocketBase(props.serverURL);
    client.admins.authViaEmail(props.credentials.username, props.credentials.password).then(() => {
      setClient(client);
      console.log('Pocketbase client initialized');
    });
  }, [props.serverURL]);

  return client ? (
    <ClientProvider client={client}>
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <ContentProvider collections={props.initialCollections}>
            {props.children}
          </ContentProvider>
        </PersistGate>
      </Provider>
    </ClientProvider>
  ): null;  
};
