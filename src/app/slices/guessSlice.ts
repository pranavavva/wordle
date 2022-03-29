import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { MAX_GUESSES } from 'utils/constants';

type GuessState = {
  currentGuess: string;
  guesses: string[];
  solution: string;
  isGameOver: boolean;
  numGuesses: number;
};

const initialState: GuessState = {
  currentGuess: '',
  guesses: [],
  solution: '',
  isGameOver: false,
  numGuesses: 0,
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
      state.numGuesses += 1;
      if (
        state.numGuesses >= MAX_GUESSES ||
        action.payload === state.solution
      ) {
        state.isGameOver = true;
      }
    },
    setSolution: (state, action: PayloadAction<string>) => {
      state.solution = action.payload;
    },
    clearGuesses: state => {
      state.guesses = [];
      state.numGuesses = 0;
    },
    setGameOver: state => {
      state.isGameOver = true;
    },
  },
});

export const {
  setCurrentGuess,
  addGuess,
  setSolution,
  clearGuesses,
  setGameOver,
} = guessSlice.actions;

export default guessSlice.reducer;
