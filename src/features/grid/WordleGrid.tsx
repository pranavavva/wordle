import * as React from 'react';
import { MAX_GUESSES } from 'utils/constants';
import { Grid } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import CompletedRow from './CompletedRow';
import CurrentRow from './CurrentRow';
import EmptyRow from './EmptyRow';

export default function WordleGrid(): JSX.Element {
  const guesses = useAppSelector(state => state.guess.guesses);
  const currentGuess = useAppSelector(state => state.guess.currentGuess);
  const numGuesses = useAppSelector(state => state.guess.numGuesses);

  const numEmptyRows = Math.max(0, MAX_GUESSES - numGuesses - 1);

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      {guesses.map((guess, index) => (
        <CompletedRow key={index} guess={guess} />
      ))}
      {numGuesses < MAX_GUESSES && (
        <CurrentRow key={guesses.length} guess={currentGuess} />
      )}
      {numEmptyRows > 0 &&
        [...Array(numEmptyRows)].map((_, index) => (
          <EmptyRow key={guesses.length + index + 1} />
        ))}
    </Grid>
  );
}
