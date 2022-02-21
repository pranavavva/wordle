import { CellStatus } from 'app/types';

export default function getGuessStatuses(
  guess: string,
  solution: string
): CellStatus[] {
  const splitGuess = guess.split('');
  const splitSolution = solution.split('');

  const statuses = Array.from<CellStatus>(Array(splitGuess.length));
  const solutionCharsTaken = Array.from<boolean>(Array(splitSolution.length));

  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = CellStatus.CORRECT;
      solutionCharsTaken[i] = true;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      statuses[i] = CellStatus.ABSENT;
      return;
    }

    const currIndex = splitSolution.findIndex(
      (solutionLetter, j) => solutionLetter === letter && !solutionCharsTaken[j]
    );

    if (currIndex > -1) {
      statuses[i] = CellStatus.INCORRECT;
      solutionCharsTaken[currIndex] = true;
    } else {
      statuses[i] = CellStatus.ABSENT;
    }
  });

  return statuses;
}
