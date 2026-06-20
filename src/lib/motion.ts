import type { Variants } from 'framer-motion'

/** Hero "power-on": staggered children snap in after a delay. */
export const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.35 },
  },
}

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 240, damping: 26 },
  },
}

/** Section reveal on scroll. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 28, staggerChildren: 0.05 },
  },
}

export const chipIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 26 } },
}
