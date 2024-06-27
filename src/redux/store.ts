// src/redux/store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jokeReducer from './jokeSlice';

const store = configureStore({
  reducer: {
    joke: jokeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
