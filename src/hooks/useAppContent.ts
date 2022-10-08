import { useContext, useEffect } from 'react';
import * as store from '../store';
import { ContentContext } from '../context';
import { Record } from '../interfaces/Record';

export function useAppContent<T extends Record>(
  collectionName: string,
  initialFetch: boolean = false
) {
  const records = (store.useAppSelector((state) => state.reducer.records[collectionName]) ?? []) as T[];
  const context = useContext(ContentContext);

  useEffect(() => {
    if (initialFetch) {
      context?.fetch(collectionName);
    }
  }, [collectionName, initialFetch]);

  const actions = {
    subscribe: async () => await context?.subscribe(collectionName),
    unsubscribe: () => context?.unsubscribe(collectionName),
    refetch: async () => await context?.fetch(collectionName),
    create: async (record: {}) => await context?.create(collectionName, record),
    update: async (id: string, record: {}) => await context?.update(collectionName, id, record),
    delete: async (id: string) => await context?.delete(collectionName, id),
  };
  return { records, actions };
}
