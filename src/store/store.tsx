import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
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

const store = configureStore({
  reducer,
  middleware: [thunk],
});

type AppDispatch = typeof store.dispatch<RecordAction>;
const useAppDispatch = store.dispatch;
type RootState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


const persistor = persistStore(store);

export { AppDispatch, RootState, useAppDispatch, useAppSelector, store, persistor };