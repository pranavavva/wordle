import * as React from 'react';

import { Container, Typography } from '@mui/material';
import WordleGrid from 'features/grid/Grid';

export default function App() {
  return (
    <Container maxWidth='sm'>
      <Typography variant='h2' component='h1' align='center' gutterBottom>
        Hello, Wordl
      </Typography>
      <WordleGrid
        guesses={['audio', 'words', 'facts', 'sounds', 'helps', 'hello']}
        currentGuess='che'
        solution='hello'
      />
    </Container>
  );
}
