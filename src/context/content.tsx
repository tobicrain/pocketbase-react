import * as store from '../store/store';
import * as React from 'react';
import { createContext, useEffect } from 'react';
import { useClientContext } from '../hooks/useClientContext';
import { Record } from '../interfaces/Record';
import { recordsAction } from '../store/actions';
import { StorageService } from '../service/Storage';

type SubscribeType = (collectionName: string) => Promise<void>;
type UnsubscribeType = (collectionName?: string) => Promise<void>;
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

interface ContentContext {
  actions: ContentActions;
}

export const ContentContext = createContext<ContentContext>({} as ContentContext);

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

  const actions: ContentActions = {
    subscribe: async (collectionName: string) => {
      const subscribedCollectionsString = await StorageService.get(StorageService.Constants.SUBSCRIBED) ?? JSON.stringify([]);
      var subscribedCollections = JSON.parse(subscribedCollectionsString) as string[];

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
      })
      .then(() => {
        if (!subscribedCollections.includes(collectionName)) {
          subscribedCollections.push(collectionName);
        }
      })
      .catch((_error) => {
        subscribedCollections = subscribedCollections.filter((collection) => collection !== collectionName);
      });
      
      await StorageService.set(StorageService.Constants.SUBSCRIBED, JSON.stringify(subscribedCollections));
    },
    unsubscribe: async (collectionName?: string) => {
      const subscribedCollectionsString = await StorageService.get(StorageService.Constants.SUBSCRIBED) ?? JSON.stringify([]);
      var subscribedCollections = JSON.parse(subscribedCollectionsString) as string[];

      if (collectionName) {
        await client?.realtime.unsubscribe(collectionName)
        .then(() => {
          subscribedCollections = subscribedCollections.filter((collection) => collection !== collectionName);
        })
        .catch((_error) => {
          subscribedCollections = subscribedCollections.filter((collection) => collection !== collectionName);
        });
      } else {
        await client?.realtime.unsubscribe()
        .then(() => {
          subscribedCollections = [];
        })
        .catch((_error) => {});
      }

      await StorageService.set(StorageService.Constants.SUBSCRIBED, JSON.stringify(subscribedCollections));
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
    if (props.collections) {
      props.collections.forEach(async (collectionName) => {
        await actions.fetch(collectionName);
        await actions.subscribe(collectionName);
      });
    }
    return () => {
      (async () => {
        await actions.unsubscribe();
      })();
    };
  }, [props.collections]);

  return (
    <ContentContext.Provider value={{
      actions,
    }}>{props.children}</ContentContext.Provider>
  );
};
