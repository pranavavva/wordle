import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import guessReducer from 'app/slices/guessSlice';

export const store = configureStore({
  reducer: {
    guess: guessReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
