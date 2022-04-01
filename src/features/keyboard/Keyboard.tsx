import * as React from 'react';
import { Grid } from '@mui/material';
import { getStatuses } from 'utils/guess';
import Key from 'features/keyboard/Key';
import { useAppSelector } from 'app/hooks';
import { CellStatus } from 'app/types';

type KeyboardProps = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
};

export default function Keyboard(props: KeyboardProps): JSX.Element {
  const guesses = useAppSelector(state => state.guess.guesses);
  const solution = useAppSelector(state => state.guess.solution);

  const { onChar, onDelete, onEnter } = props;

  const statuses = getStatuses(guesses, solution);

  // given value of Key, call a handler
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

    // add event listener
    window.addEventListener('keyup', listener);

    // remove event listener on cleanup
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onChar, onDelete, onEnter]);

  // Keyboard layout
  // DELETE occurs before the first element of Row 3
  // ENTER occurs after the last element of Row 3
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  return (
    <Grid container spacing={2} direction='column' alignItems='center'>
      {/* Row 1 */}
      <Grid item>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {row1.map(char => (
            <Grid item key={char}>
              <Key
                value={char}
                onClick={onClick}
                status={statuses[char.toUpperCase() ?? CellStatus.UNSUBMITTED]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Row 2 */}
      <Grid item>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {row2.map(char => (
            <Grid item key={char}>
              <Key
                value={char}
                onClick={onClick}
                status={statuses[char.toUpperCase() ?? CellStatus.UNSUBMITTED]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Row 3 */}
      <Grid item>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          <Grid item key='delete'>
            <Key width={65} value='delete' onClick={onClick}>
              DELETE
            </Key>
          </Grid>
          {row3.map(char => (
            <Grid item key={char}>
              <Key
                value={char}
                onClick={onClick}
                status={statuses[char.toUpperCase() ?? CellStatus.UNSUBMITTED]}
              />
            </Grid>
          ))}
          <Grid item key='enter'>
            <Key width={65} value='enter' onClick={onClick}>
              ENTER
            </Key>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
