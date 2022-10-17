export const SET_RECORDS = 'SET_RECORDS';
export const ADD_RECORD = 'ADD_RECORD';
export const ADD_RECORDS = 'ADD_RECORDS';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const DELETE_RECORDS = 'DELETE_RECORDS';

export type RecordTypes =
  | typeof SET_RECORDS
  | typeof ADD_RECORD
  | typeof ADD_RECORDS
  | typeof UPDATE_RECORD
  | typeof DELETE_RECORD
  | typeof DELETE_RECORDS;

export const SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';
export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';

export type SubscriptionsTypes =
  | typeof SET_SUBSCRIPTIONS
  | typeof ADD_SUBSCRIPTION
  | typeof DELETE_SUBSCRIPTION;

export const SET_MODEL = 'SET_MODEL';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_COOKIE = 'SET_COOKIE';
export const DELETE_MODEL = 'DELETE_MODEL';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const DELETE_COOKIE = 'DELETE_COOKIE';

export type AuthTypes =
  | typeof SET_MODEL
  | typeof SET_TOKEN
  | typeof DELETE_MODEL
  | typeof DELETE_TOKEN
  | typeof SET_COOKIE
  | typeof DELETE_COOKIE;
