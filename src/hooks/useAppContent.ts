import { useContext, useEffect } from 'react';
import { ContentContext } from '../context/content';
import { useAppSelector } from '../store';
import Record from '../interfaces/Record';

export function useAppContent<T extends Record>(
  collectionName: string,
  initialFetch: boolean = false
) {
  const records = (useAppSelector((state) => state.reducer.records[collectionName]) ?? []) as T[];
  const context = useContext(ContentContext);

  useEffect(() => {
    if (initialFetch) {
      context?.fetch(collectionName);
    }
  }, [collectionName, initialFetch, context]);

  const actions = {
    subscribe: async () => context?.subscribe(collectionName),
    unsubscribe: () => context?.unsubscribe(collectionName),
    refetch: async () => context?.fetch(collectionName),
    create: async (record: {}) => context?.create(collectionName, record),
    update: async (id: string, record: {}) => context?.update(collectionName, id, record),
    delete: async (id: string) => context?.delete(collectionName, id),
  };
  return { records, actions };
}
