import { Record } from '../../interfaces/Record';
import { RecordAction } from '../reducers/records';
declare const setRecords: (key: string, payload: Record[]) => RecordAction;
declare const addRecord: (key: string, payload: Record) => RecordAction;
declare const addRecords: (key: string, payload: Record[]) => RecordAction;
declare const deleteRecord: (key: string, payload: Record) => RecordAction;
declare const deleteRecords: (key: string, payload: Record[]) => RecordAction;
declare const updateRecord: (key: string, payload: Record) => RecordAction;
export { setRecords, addRecord, addRecords, deleteRecord, deleteRecords, updateRecord, };
