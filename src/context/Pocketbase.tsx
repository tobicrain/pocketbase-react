import * as React from 'react';
import { createContext } from 'react';
import PocketBase from 'pocketbase/dist/pocketbase.cjs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as store from '../store/store';
import { ClientProvider } from './Client';
import { ContentProvider } from './Content';

export const PocketbaseContext = createContext<PocketBase | null>(null);

export type PocketbaseProviderProps = {
  children: React.ReactNode;
  client: PocketBase;
};

export const Pocketbase = (props: PocketbaseProviderProps) => {
  React.useEffect(() => {
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
