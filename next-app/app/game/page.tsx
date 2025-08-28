// This is a CSR page because of useState hooks
'use client';

import { useState } from 'react';
import GameBoard from './CSRComponents/GameBoard';
import { checkWinner } from './Helpers/winConditions';
import RestartButton from './CSRComponents/RestartButton';

export default function GamePage() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = checkWinner(board);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Tic Tac Toe</h1>
      <p>{winner ? `Winner: ${winner}` : `Next: ${isXNext ? 'X' : 'O'}`}</p>
      <GameBoard board={board} handleClickCB={handleClick} />
      {winner && <RestartButton setBoard={setBoard} />}
    </div>
  );
}
