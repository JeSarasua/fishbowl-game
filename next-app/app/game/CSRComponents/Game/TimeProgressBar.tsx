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
        className="absolute top-0 left-0 h-2 bg-green-500 origin-left"
        style={{ width }}
      />
    </div>
  );
}
