import * as React from 'react';

import { Button, Typography } from '@mui/material';
import Grid from 'features/grid/Grid';

export default function App() {
  const [showing, setShowing] = React.useState(false);

  return (
    <>
      <Button variant='contained' onClick={() => setShowing(!showing)}>
        Hello World
      </Button>

      {showing && <Typography>Hello world!</Typography>}

      <Grid
        guesses={['hello', 'world', 'words']}
        currentGuess='che'
        solution='birds'
      />
    </>
  );
}
