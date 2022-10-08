import * as React from 'react';
import PocketBase from 'pocketbase';
export declare const PocketbaseContext: React.Context<PocketBase | null>;
export declare type PocketbaseProviderProps = {
    children: React.ReactNode;
    serverURL: string;
    credentials: {
        username: string;
        password: string;
    };
    initialCollections?: string[];
};
export declare const Pocketbase: (props: PocketbaseProviderProps) => JSX.Element | null;
