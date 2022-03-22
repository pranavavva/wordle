import * as React from 'react';

import { Container, Typography } from '@mui/material';
import WordleGrid from 'features/grid/WordleGrid';
import Keyboard from 'features/keyboard/Keyboard';
import { useAppDispatch } from 'app/hooks';
import {
  addGuess,
  setCurrentGuess,
  setSolution,
  clearGuesses,
} from 'app/slices/guessSlice';

export default function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(clearGuesses());
    dispatch(setSolution('hello'));

    for (const word of [
      'audio',
      'words',
      'facts',
      'sounds',
      'helps',
      'hello',
    ]) {
      dispatch(addGuess(word));
    }

    dispatch(setCurrentGuess('hell'));
  }, [dispatch]);

  return (
    <Container maxWidth='md'>
      <Typography variant='h2' component='h1' align='center' gutterBottom>
        Hello, Wordl
      </Typography>
      <WordleGrid />
      <Keyboard
        onChar={char => console.log(char)}
        onDelete={() => console.log('delete')}
        onEnter={() => console.log('enter')}
      />
    </Container>
  );
}
