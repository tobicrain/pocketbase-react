import { combineReducers } from 'redux';
import { records } from './records';

export const appReducer = combineReducers({
  records: records,
});

interface AppReducer {
  records: ReturnType<typeof appReducer>;
}

export type State = AppReducer;