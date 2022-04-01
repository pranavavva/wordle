import * as React from 'react';
import { CellStatus } from 'app/types';
import { Grid } from '@mui/material';
import { MAX_WORD_LENGTH } from 'utils/constants';
import WordleCell from './WordleCell';

export default function EmptyRow(): JSX.Element {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH));

  return (
    <Grid item>
      <Grid container spacing={2}>
        {emptyCells.map((_, index) => (
          <WordleCell key={index} letter='' status={CellStatus.UNSUBMITTED} />
        ))}
      </Grid>
    </Grid>
  );
}
