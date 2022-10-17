import { useContext, useEffect, useState } from 'react';
import * as store from '../store';
import { ContentContext } from '../context';
import { Record } from '../interfaces/Record';
import { StorageService } from '../service/Storage';

export type SubscribeType = () => Promise<void | undefined>
export type UnsubscribeType = () => void | undefined;
export type FetchType = () => Promise<void | undefined>
export type CreateType = (record: {}) => Promise<void | undefined>
export type UpdateType = (id: string, record: {}) => Promise<void | undefined>
export type DeleteType = (id: string) => Promise<void | undefined>

export interface Actions {
  subscribe: SubscribeType;
  unsubscribe: UnsubscribeType;
  fetch: FetchType;
  create: CreateType;
  update: UpdateType;
  delete: DeleteType;
}

export function useAppContent<T extends Record>(
  collectionName: string,
  initialFetch: boolean = false
): {records: T[], actions: Actions, isSubscribed: boolean} {
  const records = (store.useAppSelector((state) => state.reducer.records[collectionName]) ?? []) as T[];
  const context = useContext(ContentContext);

  useEffect(() => {
    if (initialFetch) {
      context.actions.fetch(collectionName);
    }
  }, [collectionName, initialFetch]);

  const [isSubscribed, setIsSubscribed] = useState(false);
  
  async function refetchSubscribeState() {
    const isSubscribed = JSON.parse(await StorageService.get("subscribed") ?? JSON.stringify([])) as string[];
    setIsSubscribed(isSubscribed.includes(collectionName));
  }

  useEffect(() => {
    (async () => {
      await refetchSubscribeState();
    })();
  }, [])
  

  const actions: Actions = {
    subscribe: async () => {
      await context.actions.subscribe(collectionName)
      await refetchSubscribeState()
    },
    unsubscribe: () => {
      context.actions.unsubscribe(collectionName)
      refetchSubscribeState()
    },
    fetch: async () => await context.actions.fetch(collectionName),
    create: async (record: {}) => await context.actions.create(collectionName, record),
    update: async (id: string, record: {}) => await context.actions.update(collectionName, id, record),
    delete: async (id: string) => await context.actions.delete(collectionName, id),
  };
  return { records, actions, isSubscribed };
}
