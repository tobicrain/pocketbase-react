import { Admin, User } from '@tobicrain/pocketbase';
import { AuthAction } from '../reducers/auth';
import * as ReduxType from '../types';

const setToken = (payload: string) =>
  ({
    type: ReduxType.SET_TOKEN,
    payload,
  } as AuthAction);

const setModel = (payload: User | Admin | null | string) =>
  ({
    type: ReduxType.SET_MODEL,
    payload,
  } as AuthAction);

const setCookie = (payload: string) =>
  ({
    type: ReduxType.SET_COOKIE,
    payload,
  } as AuthAction);

const deleteToken = () =>
  ({
    type: ReduxType.DELETE_TOKEN,
    payload: '',
  } as AuthAction);

const deleteModel = () =>
  ({
    type: ReduxType.DELETE_MODEL,
    payload: '',
  } as AuthAction);

const deleteCookie = () =>
  ({
    type: ReduxType.DELETE_COOKIE,
    payload: '',
  } as AuthAction);

export { setToken, setModel, setCookie, deleteToken, deleteModel, deleteCookie };
