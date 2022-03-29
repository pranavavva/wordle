import { CellStatus, GridRowType } from 'app/types';
import * as React from 'react';
import { MAX_WORD_LENGTH } from 'utils/constants';
import getGuessStatuses from 'utils/guess';
import { Grid } from '@mui/material';
import WordleCell from 'features/grid/WordleCell';
import { useAppSelector } from 'app/hooks';

type GridRowProps = {
  type: GridRowType;
  guess: string;
};

export default function WordleGridRow(props: GridRowProps): JSX.Element {
  const { type, guess } = props;

  const solution = useAppSelector(state => state.guess.solution);
  const cells = Array.from(Array(MAX_WORD_LENGTH));

  let row: JSX.Element[];

  switch (type) {
    case GridRowType.COMPLETED: {
      const statuses = getGuessStatuses(guess, solution);
      const splitGuess = guess.split('');
      row = cells.map((_, index) => (
        <WordleCell
          key={index}
          letter={splitGuess[index]}
          status={statuses[index]}
        />
      ));

      break;
    }
    case GridRowType.CURRENT: {
      const splitGuess = guess.split('');
      const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));
      row = splitGuess.map((letter, index) => (
        <WordleCell
          key={index}
          letter={letter}
          status={CellStatus.UNSUBMITTED}
        />
      ));

      row = row.concat(
        emptyCells.map((_, index) => (
          <WordleCell key={index} letter='' status={CellStatus.UNSUBMITTED} />
        ))
      );
      break;
    }
    case GridRowType.EMPTY: {
      row = cells.map((_, index) => (
        <WordleCell key={index} letter='' status={CellStatus.UNSUBMITTED} />
      ));
      break;
    }
  }

  return (
    <Grid item>
      <Grid container spacing={2}>
        {row}
      </Grid>
    </Grid>
  );
}
