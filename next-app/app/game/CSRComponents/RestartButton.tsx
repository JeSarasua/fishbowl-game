'use client';
import React from 'react';

export default function RestartButton({
  setBoard,
}: {
  setBoard: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}) {
  return (
    <div>
      <button
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        onClick={() => setBoard(Array(9).fill(null))}
      >
        Restart
      </button>
    </div>
  );
}
