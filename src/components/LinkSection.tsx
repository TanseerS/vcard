import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LuChevronDown } from 'react-icons/lu'
import Section from './Section'
import LinkChip from './LinkChip'
import type { LinkItem } from '../config/site'

/** A section that shows `limit` chips, then smoothly expands the rest. */
export default function LinkSection({
  id,
  label,
  items,
  variant,
  limit,
  gridClass,
}: {
  id?: string
  label: string
  items: LinkItem[]
  variant: 'tile' | 'row'
  limit: number
  gridClass: string
}) {
  const reduce = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const first = items.slice(0, limit)
  const extra = items.slice(limit)
  const hasExtra = extra.length > 0

  return (
    <Section id={id} label={label} count={String(items.length).padStart(2, '0')}>
      <div className={gridClass}>
        {first.map((item) => (
          <LinkChip key={item.id} item={item} variant={variant} />
        ))}
      </div>

      {/* the rest — one smooth height animation, no per-chip jank */}
      <AnimatePresence initial={false}>
        {expanded && hasExtra && (
          <motion.div
            key="extra"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduce ? 0 : 0.44, ease: [0.33, 1, 0.68, 1] },
              opacity: { duration: reduce ? 0 : 0.28, ease: 'easeOut' },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className={`${gridClass} pt-2.5`}>
              {extra.map((item) => (
                <LinkChip key={item.id} item={item} variant={variant} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasExtra && (
        <div className="mt-3 flex justify-center">
          <motion.button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            whileTap={{ scale: 0.96 }}
            aria-expanded={expanded}
            className="chip glass spec flex items-center gap-1.5 rounded-full px-4 py-2 text-muted"
          >
            {expanded ? 'Show less' : `Show ${extra.length} more`}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              className="grid place-items-center text-accent"
            >
              <LuChevronDown size={14} />
            </motion.span>
          </motion.button>
        </div>
      )}
    </Section>
  )
}
