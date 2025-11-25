'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { useGameStateContext } from '../../contexts/GameStateContext';
import Instructions from './Instructions';
import SwipeableCard from './SwipeableCard';
import { WordTally } from '../../models/payload';

export default function Game({
  tallyWordCB: tallyWordCB,
}: {
  tallyWordCB: (tally: WordTally) => void;
}) {
  const gameState = useGameStateContext();
  const [timeLeft, setTimeLeft] = useState(0);

  // Motion value for continuous animation
  const progress = useMotionValue(1);
  const width = useTransform(progress, (p) => `${p * 100}%`);

  const [correctGuess, setCorrectGuess] = useState<boolean | null>(null);

  useEffect(() => {
    if (correctGuess === null) return; // skip null

    if (gameState && gameState.word && gameState.turn) {
      tallyWordCB({
        name: gameState.word,
        team: gameState.turn,
        correct: correctGuess,
      });
    }
  }, [correctGuess]);

  // Countdown timer logic
  useEffect(() => {
    if (!gameState?.roundEndsAt) return;

    // Start smooth animation of the progress bar
    progress.set(1);
    const totalMs = gameState.roundEndsAt - Date.now();
    const animation = animate(progress, 0, { duration: totalMs / 1000, ease: 'linear' });

    // Interval for numerical countdown
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((gameState.roundEndsAt - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        animation.stop();
      }
    }, 250);

    return () => {
      clearInterval(interval);
      animation.stop();
    };
  }, [gameState?.roundEndsAt]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 select-none relative overflow-hidden">
      {/* Smooth shrinking progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-green-500 origin-left"
        style={{ width }}
      />

      {/* Timer */}
      <div className="text-2xl font-semibold text-gray-700 mb-4 mt-6">⏱️ {timeLeft}s</div>

      <SwipeableCard word={gameState.word} correctGuess={setCorrectGuess} />
      <Instructions />
    </div>
  );
}
