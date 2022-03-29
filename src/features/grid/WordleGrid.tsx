import * as React from 'react';
import { GridRowType } from 'app/types';
import { MAX_GUESSES } from 'utils/constants';
import { Grid } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import WordleGridRow from './WordleGridRow';

export default function WordleGrid(): JSX.Element {
  const guesses = useAppSelector(state => state.guess.guesses);
  const currentGuess = useAppSelector(state => state.guess.currentGuess);
  const numGuesses = useAppSelector(state => state.guess.numGuesses);

  const numEmptyRows = Math.max(0, MAX_GUESSES - numGuesses);

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      {guesses.map((guess, index) => (
        <WordleGridRow key={index} type={GridRowType.COMPLETED} guess={guess} />
      ))}
      {numGuesses < MAX_GUESSES && (
        <WordleGridRow
          key={guesses.length}
          type={GridRowType.CURRENT}
          guess={currentGuess}
        />
      )}
      {numEmptyRows > 0 &&
        [...Array(numEmptyRows)].map((_, index) => (
          <WordleGridRow key={index} type={GridRowType.EMPTY} guess='' />
        ))}
    </Grid>
  );
}
