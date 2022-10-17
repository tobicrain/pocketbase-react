import * as React from 'react';
import { createContext, useEffect } from 'react';
import PocketBase, { Admin, BaseAuthStore, LocalAuthStore, User } from '@tobicrain/pocketbase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { ClientProvider } from './client';
import { ContentProvider } from './content';
import { AuthProvider } from './auth';
import { StorageService } from '../service/Storage';
import { authAction } from '../store';

export const PocketbaseContext = createContext<PocketBase | null>(null);

export type PocketbaseProviderProps = {
  children: React.ReactNode;
  serverURL: string;
  webRedirectUrl: string;
  mobileRedirectUrl: string;
  openURL: (url: string) => Promise<void>;
  initialCollections?: string[];
};

export const Pocketbase = (props: PocketbaseProviderProps) => {
  const client = new PocketBase(props.serverURL);

  return client ? (
    <ClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider
            webRedirectUrl={props.webRedirectUrl}
            mobileRedirectUrl={props.mobileRedirectUrl}
            openURL={props.openURL}>
            <ContentProvider collections={props.initialCollections}>
              {props.children}
            </ContentProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ClientProvider>
  ) : null;
};
