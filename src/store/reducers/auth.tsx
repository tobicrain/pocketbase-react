import { Admin, User } from '@tobicrain/pocketbase';
import * as ReduxType from '../types';

export interface ReduxAuth {
  token: string;
  model: User | Admin | null;
  cookie: string | null;
}

export type AuthAction = {
  type: ReduxType.AuthTypes;
  payload: User | Admin | null | string;
};

export const auth = (
  state: ReduxAuth = {
    model: null,
    token: '',
    cookie: null,
  },
  action: AuthAction
) => {
  switch (action.type) {
    case ReduxType.SET_TOKEN:
      return {
        ...state,
        token: action.payload as string,
      };
    case ReduxType.SET_MODEL:
      return {
        ...state,
        model: action.payload as User | Admin | null,
      };
    case ReduxType.SET_COOKIE:
      return {
        ...state,
        cookie: action.payload as string,
      };
    case ReduxType.DELETE_TOKEN:
      return {
        ...state,
        token: '',
      };
    case ReduxType.DELETE_MODEL:
      return {
        ...state,
        model: null,
      };
    case ReduxType.DELETE_COOKIE:
      return {
        ...state,
        cookie: null,
      };
    default:
      return state;
  }
};
