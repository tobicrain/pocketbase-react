import { Record } from '../interfaces/Record';
export declare function useAppContent<T extends Record>(collectionName: string, initialFetch?: boolean): {
    records: T[];
    actions: {
        subscribe: () => Promise<void | undefined>;
        unsubscribe: () => void | undefined;
        refetch: () => Promise<void | undefined>;
        create: (record: {}) => Promise<void | undefined>;
        update: (id: string, record: {}) => Promise<void | undefined>;
        delete: (id: string) => Promise<void | undefined>;
    };
};
