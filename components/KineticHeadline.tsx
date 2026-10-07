'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Word = {
  text: string;
  /** 'fill' = solid, 'outline' = stroke only, 'accent' = accent color */
  style?: 'fill' | 'outline' | 'accent';
};

type KineticHeadlineProps = {
  words: Word[];
  className?: string;
};

/**
 * Editorial headline that reveals word by word with a rise-and-fade.
 * Each word can be filled, outlined, or accent-colored for the
 * fill/outline mix the reference leans on. Respects reduced motion.
 */
export function KineticHeadline({ words, className = '' }: KineticHeadlineProps) {
  const reduce = useReducedMotion();

  const styleClass = (s?: Word['style']) =>
    s === 'outline' ? 'text-outline' : s === 'accent' ? 'text-accent' : '';

  if (reduce) {
    return (
      <h1 className={`editorial editorial-xl ${className}`}>
        {words.map((w, i) => (
          <span key={i} className={styleClass(w.style)}>
            {w.text}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={`editorial editorial-xl ${className}`} aria-label={words.map((w) => w.text).join(' ')}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${styleClass(w.style)}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w.text}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h1>
  );
}
