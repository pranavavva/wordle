import { CellStatus } from 'app/types';
import { Grid, Typography } from '@mui/material';
import * as React from 'react';

type CellProps = {
  letter: string;
  status: CellStatus;
};

export default function WordleCell(props: CellProps): JSX.Element {
  const { letter, status } = props;

  let backgroundColor: string = '';

  switch (status) {
    case CellStatus.CORRECT:
      backgroundColor = 'green';
      break;
    case CellStatus.INCORRECT:
      backgroundColor = 'darkorange';
      break;
    case CellStatus.ABSENT:
      backgroundColor = '#3b3b3b';
      break;
    default:
      backgroundColor = 'dimgray';
  }

  return (
    <Grid item>
      <Typography
        sx={{
          padding: '1rem',
          backgroundColor,
          color: 'white',
          fontWeight: 'bold',
          fontSize: '2rem',
          width: 90,
          height: 90,
          border: '2px solid black',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        {letter}
      </Typography>
    </Grid>
  );
}
