import * as React from 'react';
import PocketBase from 'pocketbase';
export declare const ClientContext: React.Context<PocketBase | null>;
export declare type ClientProviderProps = {
    children: React.ReactNode;
    client: PocketBase;
};
export declare const ClientProvider: (props: ClientProviderProps) => JSX.Element;
