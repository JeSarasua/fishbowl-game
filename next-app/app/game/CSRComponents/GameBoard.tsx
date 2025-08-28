'use client';
import React from 'react';

export default function GameBoard({
  board,
  handleClickCB,
}: {
  board: (string | null)[];
  handleClickCB: (index: number) => void;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gap: '5px',
        justifyContent: 'center',
      }}
    >
      {board.map((cell, index) => (
        <div
          key={index}
          onClick={() => handleClickCB(index)}
          style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #333',
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: cell ? 'default' : 'pointer',
            backgroundColor: cell ? '#f0f0f0' : '#fff',
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
