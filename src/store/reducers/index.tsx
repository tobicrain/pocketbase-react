import { combineReducers } from 'redux';
import { records } from './records';
import { subscriptions } from './subscriptions';
import { auth } from './auth';

export const appReducer = combineReducers({
  records: records,
  subscriptions: subscriptions,
  auth: auth,
});

interface AppReducer {
  records: ReturnType<typeof appReducer>;
}

export type State = AppReducer;
