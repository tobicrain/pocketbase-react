import { combineReducers } from 'redux';
import { records } from './records';
import { subscriptions } from './subscriptions';

export const appReducer = combineReducers({
  records: records,
  subscriptions: subscriptions,
});

interface AppReducer {
  records: ReturnType<typeof appReducer>;
}

export type State = AppReducer;
