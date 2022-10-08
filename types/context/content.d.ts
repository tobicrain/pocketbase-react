import * as React from 'react';
interface ContentActions {
    subscribe: (collectionName: string) => Promise<void>;
    unsubscribe: (collectionName?: string) => void;
    fetch: (collectionName: string) => Promise<void>;
    create: (collectionName: string, record: {}) => Promise<void>;
    update: (collectionName: string, recordId: string, record: {}) => Promise<void>;
    delete: (collectionName: string, recordId: string) => Promise<void>;
}
export declare const ContentContext: React.Context<ContentActions | null>;
export declare type ContentProviderProps = {
    children: React.ReactNode;
    collections?: string[];
};
export declare const ContentProvider: (props: ContentProviderProps) => JSX.Element;
export {};
