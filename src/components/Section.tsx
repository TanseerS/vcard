import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { sectionReveal } from '../lib/motion'

export default function Section({
  label,
  count,
  children,
  className = '',
  id,
  outerClassName = '',
}: {
  label: string
  count?: string
  children: ReactNode
  className?: string
  id?: string
  outerClassName?: string
}) {
  return (
    <motion.section
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      className={outerClassName}
      style={id ? { scrollMarginTop: '1.25rem' } : undefined}
    >
      <div className="mb-3 flex items-center gap-2.5 px-1">
        <span className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
        <span className="spec text-muted">{label}</span>
        <span className="h-px flex-1 bg-line" />
        {count && <span className="spec text-muted/55">{count}</span>}
      </div>
      <div className={className}>{children}</div>
    </motion.section>
  )
}
