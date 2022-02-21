import * as React from 'react';
import { GridRowType } from 'app/types';
import { MAX_GUESSES } from 'utils/constants';
import GridRow from './GridRow';

type GridProps = {
  guesses: string[];
  currentGuess: string;
  solution: string;
};

export default function Grid(props: GridProps): JSX.Element {
  const { guesses, currentGuess, solution } = props;

  const numEmptyRows = Math.max(0, MAX_GUESSES - guesses.length);

  return (
    <div>
      {guesses.map((guess, index) => (
        <GridRow
          key={index}
          type={GridRowType.COMPLETED}
          guess={guess}
          solution={solution}
        />
      ))}
      {guesses.length < MAX_GUESSES && (
        <GridRow
          key={guesses.length}
          type={GridRowType.CURRENT}
          guess={currentGuess}
          solution={solution}
        />
      )}
      {numEmptyRows > 0 && (
        <GridRow
          key={guesses.length + 1}
          type={GridRowType.EMPTY}
          guess=''
          solution={solution}
        />
      )}
    </div>
  );
}
