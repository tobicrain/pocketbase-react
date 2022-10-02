import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer from './reducers';
import thunk from 'redux-thunk';
import { RecordAction } from './reducers/records';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  reducer: persistReducer(persistConfig, appReducer),
});

export const store = configureStore({
  reducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch<RecordAction>;
export const useAppDispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const persistor = persistStore(store);
