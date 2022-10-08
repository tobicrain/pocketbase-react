export declare const appReducer: import("redux").Reducer<import("redux").CombinedState<{
    records: import("./records").ReduxRecord;
}>, import("./records").RecordAction>;
interface AppReducer {
    records: ReturnType<typeof appReducer>;
}
export declare type State = AppReducer;
export {};
