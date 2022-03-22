import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

type GuessState = {
  currentGuess: string;
  guesses: string[];
  solution: string;
};

const initialState: GuessState = {
  currentGuess: '',
  guesses: [],
  solution: '',
};

export const guessSlice = createSlice({
  name: 'guess',
  initialState,
  reducers: {
    setCurrentGuess: (state, action: PayloadAction<string>) => {
      state.currentGuess = action.payload;
    },
    addGuess: (state, action: PayloadAction<string>) => {
      state.guesses.push(action.payload);
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
    clearGuesses: state => {
      state.guesses = [];
    },
  },
});

export const { setCurrentGuess, addGuess, setSolution, clearGuesses } =
  guessSlice.actions;

export default guessSlice.reducer;
