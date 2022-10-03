import * as store from '../store/store';
import * as React from 'react';
import { createContext, useEffect } from 'react';
import useClientContext from '../hooks/useClientContext';
import Record from '../interfaces/Record';
import { recordsAction } from '../store/actions';

interface ContentActions {
  subscribe: (collectionName: string) => Promise<void>;
  unsubscribe: (collectionName?: string) => void;
  fetch: (collectionName: string) => Promise<void>;
  create: (collectionName: string, record: {}) => Promise<void>;
  update: (collectionName: string, recordId: string, record: {}) => Promise<void>;
  delete: (collectionName: string, recordId: string) => Promise<void>;
}

export const ContentContext = createContext<ContentActions | null>(null);

export type ContentProviderProps = {
  children: React.ReactNode;
  collections?: string[];
};

interface MessageData {
    action: string;
    record: Record;
}

export const ContentProvider = (props: ContentProviderProps) => {
  const client = useClientContext();
  const dispatch = store.useAppDispatch;
  const [collections, _] = React.useState<string[]>(props.collections || []);

  const actions: ContentActions = {
    subscribe: async (collectionName: string) => {
      // save local that collectionName should be subscribed
      await client?.realtime.subscribe(collectionName, (event: MessageData) => {
        switch (event.action) {
          case 'create':
            dispatch(recordsAction.addRecord(collectionName, event.record));
            break;
          case 'update':
            dispatch(recordsAction.updateRecord(collectionName, event.record));
            break;
          case 'delete':
            dispatch(recordsAction.deleteRecord(collectionName, event.record));
            break;
          default:
            break;
        }
      });
    },
    unsubscribe: (collectionName?: string) => {
      if (collectionName) {
        client?.realtime.unsubscribe(collectionName);
      } else {
        client?.realtime.unsubscribe();
      }
    },
    fetch: async (collectionName: string) => {
      const records = await client?.records.getFullList(collectionName, 200);
      dispatch(recordsAction.setRecords(collectionName, records as Record[]));
    },
    create: async (collectionName: string, record: {}) => {
      await client?.records.create(collectionName, record);
    },
    update: async (collectionName: string, recordId: string, record: {}) => {
      await client?.records.update(collectionName, recordId, record);
    },
    delete: async (collectionName: string, recordId: string) => {
      await client?.records.delete(collectionName, recordId);
    },
  };

  useEffect(() => {
    if (collections) {
      collections.forEach((collectionName) => {
        actions.fetch(collectionName);
      });
    }
    return () => actions.unsubscribe();
  }, [collections]);

  return (
    <ContentContext.Provider value={actions}>{props.children}</ContentContext.Provider>
  );
};
