'use client';
import React from 'react';

export default function RestartButton({
  restartClickCB: restartClickCB,
}: {
  restartClickCB: () => void;
}) {
  return (
    <div>
      <button
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        onClick={() => restartClickCB()}
      >
        Restart Game
      </button>
    </div>
  );
}
