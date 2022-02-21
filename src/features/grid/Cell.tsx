import { CellStatus } from 'app/types';
import * as React from 'react';

type CellProps = {
  letter: string;
  status: CellStatus;
};

export default function Cell(props: CellProps): JSX.Element {
  const { letter, status } = props;
  return <div>{letter}</div>;
}
