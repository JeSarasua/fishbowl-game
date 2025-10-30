'use client';

import { motion, useAnimation } from 'framer-motion';

export default function SwipeableCard({ word }: { word: string | undefined }) {
  const controls = useAnimation();

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') alert('✅ Correct!');
    else alert('❌ Incorrect!');
  };
  return (
    <div>
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-10 w-72 h-48 flex items-center justify-center text-3xl font-bold text-gray-800"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          if (offset > 100 || velocity > 500) {
            controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } });
            handleSwipe('right');
          } else if (offset < -100 || velocity < -500) {
            controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } });
            handleSwipe('left');
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
