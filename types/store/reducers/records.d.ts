import { Record } from '../../interfaces/Record';
import * as ReduxType from '../types';
export interface ReduxRecord {
    [key: string]: Record[];
}
export declare type RecordAction = {
    type: ReduxType.Types;
    key: string;
    payload: null | Record | Record[];
};
export declare const records: (state: ReduxRecord | undefined, action: RecordAction) => ReduxRecord;
