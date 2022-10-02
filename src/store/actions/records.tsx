import Record from '../../interfaces/Record';
import { RecordAction } from '../reducers/records';
import * as ReduxType from '../types';

const setRecords = (key: string, payload: Record[]) =>
  ({
    type: ReduxType.SET_RECORDS,
    key,
    payload,
  } as RecordAction);

const addRecord = (key: string, payload: Record) =>
  ({
    type: ReduxType.ADD_RECORD,
    key,
    payload,
  } as RecordAction);

const addRecords = (key: string, payload: Record[]) =>
  ({
    type: ReduxType.ADD_RECORDS,
    key,
    payload,
  } as RecordAction);

const deleteRecord = (key: string, payload: Record) =>
  ({
    type: ReduxType.DELETE_RECORD,
    key,
    payload,
  } as RecordAction);

const deleteRecords = (key: string, payload: Record[]) =>
  ({
    type: ReduxType.DELETE_RECORDS,
    key,
    payload,
  } as RecordAction);

const updateRecord = (key: string, payload: Record) =>
  ({
    type: ReduxType.UPDATE_RECORD,
    key,
    payload,
  } as RecordAction);

export default {
  setRecords,
  addRecord,
  addRecords,
  deleteRecord,
  deleteRecords,
  updateRecord,
};
