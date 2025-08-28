/**
 * Win condition indices for tic tac toe game.
 */
export const TOP_ROW: [number, number, number] = [0, 1, 2];
export const MIDDLE_ROW: [number, number, number] = [3, 4, 5];
export const BOTTOM_ROW: [number, number, number] = [6, 7, 8];

export const LEFT_COL: [number, number, number] = [0, 3, 6];
export const MIDDLE_COL: [number, number, number] = [1, 4, 7];
export const RIGHT_COL: [number, number, number] = [2, 5, 8];

export const LEFT_DIAGONAL: [number, number, number] = [0, 4, 8];
export const RIGHT_DIAGONAL: [number, number, number] = [2, 4, 6];

/**
 * Using current board state, check all win conditions.
 */
export const checkWinner = (board: (string | null)[]) => {
  const LINES = [
    TOP_ROW,
    MIDDLE_ROW,
    BOTTOM_ROW,
    LEFT_COL,
    MIDDLE_COL,
    RIGHT_COL,
    LEFT_DIAGONAL,
    RIGHT_DIAGONAL,
  ];
  for (const line of LINES) {
    const [first, second, third] = line;
    if (board[first] === board[second] && board[second] === board[third]) {
      return board[first];
    }
  }
  return null;
};
