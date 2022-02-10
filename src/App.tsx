import * as React from 'react'

import { Button, Typography } from '@mui/material'

export default function App() {
  const [showing, setShowing] = React.useState(false)

  return (
    <>
      <Button variant='contained' onClick={() => setShowing(!showing)}>
        Hello World
      </Button>

      {showing && <Typography>Hello world!</Typography>}
    </>
  )
}
