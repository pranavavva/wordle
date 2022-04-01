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

export function getStatuses(
  guesses: string[],
  solution: string
): { [key: string]: CellStatus } {
  const charObj: { [key: string]: CellStatus } = {};
  const splitSolution = solution.split('');

  guesses.forEach(word => {
    word.split('').forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        // make status absent
        charObj[letter] = CellStatus.ABSENT;
        return;
      }

      if (letter === splitSolution[i]) {
        // make status correct
        charObj[letter] = CellStatus.CORRECT;
        return;
      }

      if (charObj[letter] !== CellStatus.CORRECT) {
        // make status present
        charObj[letter] = CellStatus.INCORRECT;
      }
    });
  });

  return charObj;
}
