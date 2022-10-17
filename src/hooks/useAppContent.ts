import { useContext, useEffect, useState } from 'react';
import * as store from '../store';
import { ContentContext } from '../context';
import { Record } from '../interfaces/Record';
import { StorageService } from '../service/Storage';

export type SubscribeType = () => Promise<void | undefined>;
export type UnsubscribeType = () => Promise<void | undefined>;
export type FetchType = () => Promise<void | undefined>;
export type CreateType = (record: {}) => Promise<void | undefined>;
export type UpdateType = (id: string, record: {}) => Promise<void | undefined>;
export type DeleteType = (id: string) => Promise<void | undefined>;

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
): { records: T[]; actions: Actions; isSubscribed: boolean } {
  const records = (store.useAppSelector((state) => state.reducer.records[collectionName]) ??
    []) as T[];
  const subscriptions = store.useAppSelector((state) => state.reducer.subscriptions).subscriptions;
  const context = useContext(ContentContext);

  useEffect(() => {
    if (initialFetch) {
      context.fetch(collectionName);
    }
  }, [collectionName, initialFetch]);

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsSubscribed(subscriptions.includes(collectionName));
  }, [subscriptions]);

  const actions: Actions = {
    subscribe: async () => await context.subscribe(collectionName),
    unsubscribe: async () => await context.unsubscribe(collectionName),
    fetch: async () => await context.fetch(collectionName),
    create: async (record: {}) => await context.create(collectionName, record),
    update: async (id: string, record: {}) => await context.update(collectionName, id, record),
    delete: async (id: string) => await context.delete(collectionName, id),
  };

  return { records, actions, isSubscribed };
}
