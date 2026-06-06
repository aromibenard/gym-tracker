'use client';

import { motion, AnimatePresence } from 'framer-motion';

type RollingDigitProps = {
  digit: string;
};

export function RollingDigit({ digit }: RollingDigitProps) {
  return (
    <div className="relative h-[1.2em] w-[0.7em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}