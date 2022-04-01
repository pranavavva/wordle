import * as React from 'react';

import { Container, Typography } from '@mui/material';
import WordleGrid from 'features/grid/WordleGrid';
import Keyboard from 'features/keyboard/Keyboard';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addGuess, setCurrentGuess, clearGuesses } from 'app/slices/guessSlice';
import { MAX_GUESSES, MAX_WORD_LENGTH } from 'utils/constants';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const isGameOver = useAppSelector(state => state.guess.isGameOver);
  const currentGuess = useAppSelector(state => state.guess.currentGuess);
  const numGuesses = useAppSelector(state => state.guess.numGuesses);

  React.useEffect(() => {
    dispatch(clearGuesses());
  }, [dispatch]);

  const onChar = (char: string) => {
    if (
      !isGameOver &&
      currentGuess.length < MAX_WORD_LENGTH &&
      numGuesses < MAX_GUESSES
    ) {
      dispatch(setCurrentGuess(currentGuess + char));
    }
  };

  const onDelete = () => {
    if (!isGameOver && currentGuess.length > 0 && numGuesses < MAX_GUESSES) {
      // remove the last character from the current guess
      dispatch(setCurrentGuess(currentGuess.slice(0, -1)));
    }
  };

  const onEnter = () => {
    if (
      !isGameOver &&
      currentGuess.length === MAX_WORD_LENGTH &&
      numGuesses < MAX_GUESSES
    ) {
      dispatch(addGuess());
      dispatch(setCurrentGuess(''));
    }
  };

  return (
    <Container maxWidth='md' sx={{ paddingBottom: 10, paddingTop: 5 }}>
      <Typography variant='h2' component='h1' align='center' gutterBottom>
        Hello, Wordl
      </Typography>
      <WordleGrid />
      <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} />
    </Container>
  );
}
