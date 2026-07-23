'use client';

import { motion, useReducedMotion } from 'framer-motion';

const rawLines = [
  { w: '78%', x: 0 },
  { w: '46%', x: 22 },
  { w: '92%', x: 6 },
  { w: '34%', x: 40 },
  { w: '68%', x: 12 },
  { w: '54%', x: 28 },
  { w: '84%', x: 2 },
];

const fields = [
  { label: 'name', value: 'Abubakarr Jabbie' },
  { label: 'education', value: 'TH Aschaffenburg' },
  { label: 'skills', value: 'TypeScript · Python · Java' },
  { label: 'languages', value: 'EN native · DE C1' },
];

/**
 * The one deliberate visual moment on the page: unstructured input resolving
 * into typed fields. A direct illustration of the extraction problem the
 * flagship project solves. Stacks vertically below `sm`.
 */
export function ExtractionFigure() {
  const reduce = useReducedMotion();

  return (
    <figure
      className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6"
      aria-label="Illustration: unstructured document text being extracted into labelled fields"
    >
      {/* Unstructured side */}
      <div className="relative overflow-hidden rounded-sm border border-rule bg-slab p-5 sm:p-6">
        <span className="eyebrow mb-4 block">input.pdf</span>
        <div className="flex flex-col gap-2.5">
          {rawLines.map((line, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full bg-ash/25"
              style={{ width: line.w, marginLeft: line.x }}
              initial={reduce ? false : { opacity: 0.25 }}
              animate={reduce ? undefined : { opacity: [0.25, 0.6, 0.25] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.16,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-iris/12 to-transparent"
            initial={{ top: '-25%' }}
            animate={{ top: ['-25%', '115%'] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* Connector — horizontal on desktop, vertical on mobile */}
      <div
        className="flex flex-row items-center justify-center gap-2 sm:flex-col sm:gap-1.5"
        aria-hidden
      >
        <div className="h-px w-8 bg-rule sm:h-5 sm:w-px" />
        <span className="font-mono text-[0.625rem] uppercase tracking-wider text-iris">
          parse
        </span>
        <div className="h-px w-8 bg-rule sm:h-5 sm:w-px" />
      </div>

      {/* Structured side */}
      <div className="rounded-sm border border-rule bg-slab p-5 sm:p-6">
        <span className="eyebrow mb-4 block text-moss">structured</span>
        <dl className="flex flex-col gap-3">
          {fields.map((field, i) => (
            <motion.div
              key={field.label}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
            >
              <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-ash">
                {field.label}
              </dt>
              <dd className="truncate text-sm text-chalk">{field.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </figure>
  );
}
