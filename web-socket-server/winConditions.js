/**
 * Win condition indices for tic tac toe game.
 */
const TOP_ROW = [0, 1, 2];
const MIDDLE_ROW = [3, 4, 5];
const BOTTOM_ROW = [6, 7, 8];

const LEFT_COL = [0, 3, 6];
const MIDDLE_COL = [1, 4, 7];
const RIGHT_COL = [2, 5, 8];

const LEFT_DIAGONAL = [0, 4, 8];
const RIGHT_DIAGONAL = [2, 4, 6];

export const LINES = [
  TOP_ROW,
  MIDDLE_ROW,
  BOTTOM_ROW,
  LEFT_COL,
  MIDDLE_COL,
  RIGHT_COL,
  LEFT_DIAGONAL,
  RIGHT_DIAGONAL,
];
