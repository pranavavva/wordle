import { Grid } from '@mui/material';
import * as React from 'react';
import getGuessStatuses from 'utils/guess';
import { useAppSelector } from 'app/hooks';
import WordleCell from './WordleCell';

export type CompletedRowProps = {
  guess: string;
};

export default function CompletedRow(props: CompletedRowProps): JSX.Element {
  const { guess } = props;

  const solution = useAppSelector(state => state.guess.solution);
  const statuses = getGuessStatuses(guess, solution);

  return (
    <Grid item>
      <Grid container spacing={2}>
        {guess.split('').map((letter, index) => (
          <WordleCell key={index} letter={letter} status={statuses[index]} />
        ))}
      </Grid>
    </Grid>
  );
}
