import { CellStatus } from 'app/types';
import { Grid, Typography } from '@mui/material';
import * as React from 'react';

type CellProps = {
  letter: string;
  status: CellStatus;
};

export default function WordleCell(props: CellProps): JSX.Element {
  const { letter, status } = props;
  return (
    <Grid item sx={{}}>
      <Typography
        sx={{
          padding: '1rem',
          color: (() => {
            switch (status) {
              case CellStatus.CORRECT:
                return 'green';
              case CellStatus.INCORRECT:
                return 'orange';
              case CellStatus.ABSENT:
                return 'dimgray';
              default:
                return 'black';
            }
          })(),
          // backgroundColor: 'black',
          fontWeight: 'bold',
          fontSize: '2rem',
          width: 90,
          height: 90,
          border: '2px solid black',
          textAlign: 'center',
        }}
      >
        {letter}
      </Typography>
    </Grid>
  );
}
