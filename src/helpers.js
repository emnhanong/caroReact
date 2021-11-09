export const listWinnerLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const calculateWinner = (squares) => {
  for (let index = 0; index < listWinnerLines.length; index++) {
    const [a, b, c] = listWinnerLines[index];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
};

export const getCoordinates = (array, char) => {
  for (let i = 0; i < array.length; i++) {
    const i2 = array[i].indexOf(char);
    if (i2 !== -1) return [i + 1, i2 + 1];
  }
  return undefined;
};
