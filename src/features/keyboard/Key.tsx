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

  return <Button onClick={() => onClick(value)}>{value}</Button>;
}

// set default props
Key.defaultProps = {
  children: null,
  width: 40,
  status: CellStatus.UNSUBMITTED,
};
