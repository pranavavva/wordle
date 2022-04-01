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
  solution: 'HELLO',
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
    addGuess: state => {
      state.guesses.push(state.currentGuess);
      state.numGuesses += 1;
      if (
        state.numGuesses >= MAX_GUESSES ||
        state.currentGuess === state.solution
      ) {
        state.isGameOver = true;
      }
      state.currentGuess = '';
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

export const { setCurrentGuess, addGuess, clearGuesses, setGameOver } =
  guessSlice.actions;

export default guessSlice.reducer;
