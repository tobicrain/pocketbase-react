import * as store from '../store/store';
import * as React from 'react';
import { createContext, useEffect } from 'react';
import { useClientContext } from '../hooks/useClientContext';
import { Record } from '../interfaces/Record';
import { recordsAction } from '../store/actions';

type SubscribeType = (collectionName: string) => Promise<void>;
type UnsubscribeType = (collectionName?: string) => void;
type FetchType = (collectionName: string) => Promise<void>;
type CreateType = (collectionName: string, record: {}) => Promise<void>;
type UpdateType = (collectionName: string, recordId: string, record: {}) => Promise<void>;
type DeleteType = (collectionName: string, recordId: string) => Promise<void>;

interface ContentActions {
  subscribe: SubscribeType;
  unsubscribe: UnsubscribeType;
  fetch: FetchType;
  create: CreateType;
  update: UpdateType;
  delete: DeleteType;
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
      }).catch((_error) => {});
    },
    unsubscribe: (collectionName?: string) => {
      if (collectionName) {
        client?.realtime.unsubscribe(collectionName).catch((_error) => {});;
      } else {
        client?.realtime.unsubscribe().catch((_error) => {});;
      }
    },
    fetch: async (collectionName: string) => {
      const records = await client?.records.getFullList(collectionName, 200).catch((_error) => {});
      dispatch(recordsAction.setRecords(collectionName, records as Record[]));
    },
    create: async (collectionName: string, record: {}) => {
      await client?.records.create(collectionName, record).catch((_error) => {});
    },
    update: async (collectionName: string, recordId: string, record: {}) => {
      await client?.records.update(collectionName, recordId, record).catch((_error) => {});
    },
    delete: async (collectionName: string, recordId: string) => {
      await client?.records.delete(collectionName, recordId).catch((_error) => {});
    },
  };

  useEffect(() => {
    if (collections) {
      collections.forEach((collectionName) => {
        actions.fetch(collectionName);
        actions.subscribe(collectionName);
      });
    }
    return () => actions.unsubscribe();
  }, [collections]);

  return (
    <ContentContext.Provider value={actions}>{props.children}</ContentContext.Provider>
  );
};
