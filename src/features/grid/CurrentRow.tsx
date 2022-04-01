import * as React from 'react';
import { Grid } from '@mui/material';
import { CellStatus } from 'app/types';
import { MAX_WORD_LENGTH } from 'utils/constants';
import WordleCell from './WordleCell';

export type CurrentRowProps = {
  guess: string;
};

export default function CurrentRow(props: CurrentRowProps): JSX.Element {
  const { guess } = props;

  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - guess.length));

  return (
    <Grid item>
      <Grid container spacing={2}>
        {guess.split('').map((letter, index) => (
          <WordleCell
            key={index}
            letter={letter}
            status={CellStatus.UNSUBMITTED}
          />
        ))}
        {emptyCells.map((_, index) => (
          <WordleCell key={index} letter='' status={CellStatus.UNSUBMITTED} />
        ))}
      </Grid>
    </Grid>
  );
}
