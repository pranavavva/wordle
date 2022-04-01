import { CellStatus } from 'app/types';

// for each guess, determine the statuses of the letters in that guess
// for example, if the solution is HELLO and the guess is HOTEL,
// the statuses would be:
// [ CORRECT, INCORRECT, ABSENT, INCORRECT, INCORRECT ]
// this function is used to color each row in the grid
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

// creates a status dictionary for every letter submitted across all guesses
// for example, if the guesses AUDIO and LIGHT are submitted, and the solution is HELLO,
// the status dictionary would be:
// {
//   A: ABSENT
//   U: ABSENT
//   D: ABSENT
//   I: ABSENT
//   O: CORRECT (a guess had O in the correct spot)
//   L: INCORRECT (L was in a guess, but never in the correct spot)
//   G: ABSENT
//   H: INCORRECT (same reasoning as L)
//   T: ABSET
// }
// this function is used to color the keyboard keys
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
