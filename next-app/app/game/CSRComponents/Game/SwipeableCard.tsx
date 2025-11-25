'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function SwipeableCard({
  word,
  correctGuess,
}: {
  word: string | undefined;
  correctGuess: (correct: boolean) => void;
}) {
  const controls = useAnimation();

  useEffect(() => {
    // Reset card position and opacity whenever word changes
    controls.start({ x: 0, opacity: 1 });
  }, [word]);

  return (
    <div>
      <h1>{word}</h1>
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-10 w-72 h-48 flex items-center justify-center text-3xl font-bold text-gray-800"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          if (offset > 100 || velocity > 500) {
            controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } });
            correctGuess(true);
          } else if (offset < -100 || velocity < -500) {
            controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } });
            correctGuess(false);
          } else {
            controls.start({ x: 0 });
          }
        }}
        animate={controls}
        whileTap={{ scale: 1.05 }}
      >
        {word ?? '—'}
      </motion.div>
    </div>
  );
}
