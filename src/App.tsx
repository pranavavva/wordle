import * as React from 'react';

import { Container, Typography } from '@mui/material';
import WordleGrid from 'features/grid/WordleGrid';
import Keyboard from 'features/keyboard/Keyboard';

export default function App() {
  const solution = 'hello';
  return (
    <Container maxWidth='md'>
      <Typography variant='h2' component='h1' align='center' gutterBottom>
        Hello, Wordl
      </Typography>
      <WordleGrid
        guesses={['audio', 'words', 'facts', 'sounds', 'helps', 'hello']}
        currentGuess='che'
        solution={solution}
      />
      <Keyboard
        solution={solution}
        onChar={char => console.log(char)}
        onDelete={() => console.log('delete')}
        onEnter={() => console.log('enter')}
        guesses={['audio', 'words', 'facts', 'sounds', 'helps', 'hello']}
      />
    </Container>
  );
}
