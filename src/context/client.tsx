import * as React from 'react';
import { createContext } from 'react';
import PocketBase from '@tobicrain/pocketbase';

export const ClientContext = createContext<PocketBase | null>(null);

export type ClientProviderProps = {
  children: React.ReactNode;
  client: PocketBase;
};

export const ClientProvider = (props: ClientProviderProps) => {
  return <ClientContext.Provider value={props.client}>{props.children}</ClientContext.Provider>;
};
