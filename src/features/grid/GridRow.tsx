import { CellStatus, GridRowType } from 'app/types';
import * as React from 'react';
import { MAX_WORD_LENGTH } from 'utils/constants';
import getGuessStatuses from 'utils/guess';
import Cell from './Cell';

type GridRowProps = {
  type: GridRowType;
  guess: string;
  solution: string;
};

export default function GridRow(props: GridRowProps): JSX.Element {
  const { type, guess, solution } = props;

  const cells = Array.from(Array(MAX_WORD_LENGTH));

  switch (type) {
    case GridRowType.COMPLETED: {
      const statuses = getGuessStatuses(guess, solution);
      const splitGuess = guess.split('');

      return (
        <div>
          {cells.map((_, index) => (
            <Cell
              key={index}
              letter={splitGuess[index]}
              status={statuses[index]}
            />
          ))}
        </div>
      );
    }
    case GridRowType.CURRENT: {
      const splitGuess = guess.split('');
      const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));
      return (
        <div>
          {splitGuess.map((letter, index) => (
            <Cell key={index} letter={letter} status={CellStatus.UNSUBMITTED} />
          ))}
          {emptyCells.map((_, index) => (
            <Cell key={index} letter='' status={CellStatus.UNSUBMITTED} />
          ))}
        </div>
      );
    }
    case GridRowType.EMPTY: {
      return (
        <div>
          {cells.map((_, index) => (
            <Cell key={index} letter='' status={CellStatus.UNSUBMITTED} />
          ))}
        </div>
      );
    }
  }
}
