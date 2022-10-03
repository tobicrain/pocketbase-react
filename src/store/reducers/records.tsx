import Record from '../../interfaces/Record';
import * as ReduxType from '../types';

export interface ReduxRecord {
  [key: string]: Record[];
}

export type RecordAction = {
  type: ReduxType.Types;
  key: string;
  payload: null | Record | Record[];
};

function appendRecord(record: Record, records: Record[]): Record[] {
  return [...records, record];
}

function appendRecords(recordsToAppend: Record[], records: Record[]): Record[] {
  return [...records, ...recordsToAppend];
}

function updateRecord(record: Record, records: Record[]): Record[] {
  return records.map((r) => {
    if (r.id === record.id) {
      return record;
    }
    return r;
  });
}

function deleteRecord(record: Record, records: Record[]): Record[] {
  return records.filter((r) => r.id !== record.id);
}

function deleteRecords(recordsToDelete: Record[], records: Record[]): Record[] {
  return records.filter((r) => !recordsToDelete.includes(r));
}

export default (state: ReduxRecord = {}, action: RecordAction) => {
  const list = state[action.key] ?? [];

  switch (action.type) {
    case ReduxType.SET_RECORDS:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          [action.key]: action.payload,
        };
      }
    case ReduxType.ADD_RECORD:
      return {
        ...state,
        [action.key]: appendRecord(action.payload as Record, list),
      };
    case ReduxType.ADD_RECORDS:
      return {
        ...state,
        [action.key]: appendRecords(action.payload as Record[], list),
      };
    case ReduxType.DELETE_RECORD:
      return {
        ...state,
        [action.key]: deleteRecord(action.payload as Record, list),
      };
    case ReduxType.DELETE_RECORDS:
      return {
        ...state,
        [action.key]: deleteRecords(action.payload as Record[], list),
      };
    case ReduxType.UPDATE_RECORD:
      return {
        ...state,
        [action.key]: updateRecord(action.payload as Record, list),
      };
    default:
      return state;
  }
};
