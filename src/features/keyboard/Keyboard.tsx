import * as React from 'react';
import { Grid } from '@mui/material';
import getGuessStatuses from 'utils/guess';
import Key from './Key';

type KeyboardProps = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  solution: string;
};

export default function Keyboard(props: KeyboardProps): JSX.Element {
  const { onChar, onDelete, onEnter, guesses, solution } = props;

  const charStatuses = guesses.flatMap(guess =>
    getGuessStatuses(guess, solution)
  );

  const onClick = (value: string) => {
    if (value === 'enter') {
      onEnter();
    } else if (value === 'delete') {
      onDelete();
    } else {
      onChar(value);
    }
  };

  // set up event listeners so users can use their physical keyboard
  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter();
      } else if (event.key === 'Backspace') {
        onDelete();
      } else {
        const key = event.key.toUpperCase();
        if (key.length === 1 && key.match(/[A-Z]/)) {
          onChar(key);
        }
      }
    };

    window.addEventListener('keyup', listener);

    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onChar, onDelete, onEnter]);

  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      <Grid item>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {row1.map(char => (
            <Grid item key={char}>
              <Key value={char} onClick={onClick} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {row2.map(char => (
            <Grid item key={char}>
              <Key value={char} onClick={onClick} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {row3.map(char => (
            <Grid item key={char}>
              <Key value={char} onClick={onClick} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
