import * as React from 'react';
import { createContext } from 'react';
import { getPocketbase } from '../utils/Pocketbase';

const PocketBase = getPocketbase();

export const ClientContext = createContext<typeof PocketBase | null>(null);

export type ClientProviderProps = {
  children: React.ReactNode;
  client: typeof PocketBase;
};

export const ClientProvider = (props: ClientProviderProps) => {
  return <ClientContext.Provider value={props.client}>{props.children}</ClientContext.Provider>;
};
