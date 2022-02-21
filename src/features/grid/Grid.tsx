import * as React from 'react';
import { GridRowType } from 'app/types';
import { MAX_GUESSES } from 'utils/constants';
import { Grid } from '@mui/material';
import WordleGridRow from './GridRow';

type GridProps = {
  guesses: string[];
  currentGuess: string;
  solution: string;
};

export default function WordleGrid(props: GridProps): JSX.Element {
  const { guesses, currentGuess, solution } = props;

  const numEmptyRows = Math.max(0, MAX_GUESSES - guesses.length);

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      {guesses.map((guess, index) => (
        <WordleGridRow
          key={index}
          type={GridRowType.COMPLETED}
          guess={guess}
          solution={solution}
        />
      ))}
      {guesses.length < MAX_GUESSES && (
        <WordleGridRow
          key={guesses.length}
          type={GridRowType.CURRENT}
          guess={currentGuess}
          solution={solution}
        />
      )}
      {numEmptyRows > 0 && (
        <WordleGridRow
          key={guesses.length + 1}
          type={GridRowType.EMPTY}
          guess=''
          solution={solution}
        />
      )}
    </Grid>
  );
}
