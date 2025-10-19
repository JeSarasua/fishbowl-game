'use client';
import React from 'react';

export default function StartButton({ startClickCB }: { startClickCB: () => void }) {
  return (
    <div>
      <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }} onClick={() => startClickCB()}>
        Start Game
      </button>
    </div>
  );
}
