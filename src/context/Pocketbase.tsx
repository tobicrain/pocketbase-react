import * as React from 'react';
import { createContext, useEffect } from 'react';
import { getPocketbase }  from '../utils/Pocketbase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as store from '../store/store';
import { ClientProvider } from './client';
import { ContentProvider } from './content';

const PocketBase = getPocketbase();

export const PocketbaseContext = createContext<typeof PocketBase | null>(null);

export type PocketbaseProviderProps = {
  children: React.ReactNode;
  serverURL: string;
  credentials: {
    username: string;
    password: string;
  };
  initialCollections?: string[];
};

export const Pocketbase = (props: PocketbaseProviderProps) => {
  const [client, setClient] = React.useState<typeof PocketBase | null>(null);
  useEffect(() => {
    const client = new PocketBase(props.serverURL);
    client.admins.authViaEmail(props.credentials.username, props.credentials.password).then(() => {
      setClient(client);
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
