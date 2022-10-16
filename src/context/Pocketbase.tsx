import * as React from 'react';
import { createContext, useEffect } from 'react';
import PocketBase from '@tobicrain/pocketbase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as store from '../store/store';
import { ClientProvider } from './client';
import { ContentProvider } from './content';
import { AuthProvider } from './auth';

export const PocketbaseContext = createContext<PocketBase | null>(null);

export type PocketbaseProviderProps = {
  children: React.ReactNode;
  serverURL: string;
  redirectURL: string;
  openURL: (url: string) => Promise<void>;
  initialCollections?: string[];
};

export const Pocketbase = (props: PocketbaseProviderProps) => {
  const client = new PocketBase(props.serverURL);

  return client ? (
    <ClientProvider client={client}>
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <AuthProvider redirectUrl={props.redirectURL} openURL={props.openURL} >
            <ContentProvider collections={props.initialCollections}>
              {props.children}
            </ContentProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ClientProvider>
  ): null;  
};
