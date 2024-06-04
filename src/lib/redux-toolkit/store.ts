import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userInformationReducer from '@/lib/redux-toolkit/user-information/userInformation';
import noteReducer from '@/lib/redux-toolkit/note/noteSlice';

const rootReducer = combineReducers({
  noteListGlobalState: noteReducer,
  userInformation: persistReducer(
    {
      key: 'notify-user-information',
      storage,
    },
    userInformationReducer,
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
