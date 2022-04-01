import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { MAX_GUESSES } from 'utils/constants';

type GuessState = {
  currentGuess: string; // what the user has entered so far
  guesses: string[]; // all guesses made so far
  solution: string; // the solution to the game
  isGameOver: boolean; // whether or not the game is over
  numGuesses: number; // how many guesses the user has made
};

const initialState: GuessState = {
  currentGuess: '',
  guesses: [],
  solution: 'HELLO', // TODO: this should be determined by the date
  isGameOver: false,
  numGuesses: 0,
};

export const guessSlice = createSlice({
  name: 'guess',
  initialState,
  reducers: {
    // statefully updates the current guess (called on keystroke/button press)
    setCurrentGuess: (state, action: PayloadAction<string>) => {
      state.currentGuess = action.payload;
    },
    // submits a guess
    addGuess: state => {
      state.guesses.push(state.currentGuess);
      state.numGuesses += 1;

      // end the game if the user has guessed the solution or run out of guesses
      if (
        state.numGuesses >= MAX_GUESSES ||
        state.currentGuess === state.solution
      ) {
        state.isGameOver = true;

        if (state.currentGuess === state.solution) {
          alert("You've won!");
        } else {
          alert("You've lost!");
        }
      }

      // if the game isn't over, the current guess should be cleared
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
