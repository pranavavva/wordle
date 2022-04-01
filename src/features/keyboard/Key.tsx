import * as React from 'react';
import { CellStatus } from 'app/types';
import { Button } from '@mui/material';

type KeyProps = {
  children?: React.ReactNode;
  value: string;
  width?: number;
  status?: CellStatus;
  onClick: (value: string) => void;
};

export default function Key(props: KeyProps): JSX.Element {
  const { children, value, width, status, onClick } = props;

  let backgroundColor: string = '';
  let hoverBackgroundColor: string = '';

  switch (status) {
    case CellStatus.CORRECT:
      backgroundColor = 'green';
      hoverBackgroundColor = 'mediumseagreen';
      break;
    case CellStatus.INCORRECT:
      backgroundColor = 'darkorange';
      hoverBackgroundColor = 'orange';
      break;
    case CellStatus.ABSENT:
      backgroundColor = '#3b3b3b';
      hoverBackgroundColor = '#6b6b6b';
      break;
    case CellStatus.UNSUBMITTED:
    default:
      backgroundColor = 'dimgray';
      hoverBackgroundColor = 'gray';
  }

  return (
    <Button
      onClick={() => onClick(value)}
      sx={{
        width,
        height: '56px',
        backgroundColor,
        color: 'white',
        fontWeight: 'bold',
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: hoverBackgroundColor,
        },
      }}
    >
      {value}
    </Button>
  );
}

// set default props
Key.defaultProps = {
  children: null,
  width: 40,
  status: CellStatus.UNSUBMITTED,
};
