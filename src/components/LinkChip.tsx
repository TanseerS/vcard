import { motion } from 'framer-motion'
import { LuArrowUpRight } from 'react-icons/lu'
import type { CSSProperties } from 'react'
import type { LinkItem } from '../config/site'
import { chipIn } from '../lib/motion'

type Props = { item: LinkItem; variant?: 'tile' | 'row' }

export default function LinkChip({ item, variant = 'tile' }: Props) {
  const Icon = item.icon
  const brandStyle = { '--brand': item.brand ?? 'var(--accent)' } as CSSProperties

  if (variant === 'row') {
    return (
      <motion.a
        variants={chipIn}
        whileTap={{ scale: 0.97 }}
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        style={brandStyle}
        className="chip group glass flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-text"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--text)_7%,transparent)] text-text transition-colors duration-200 group-hover:[color:var(--brand)]">
          <Icon size={21} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-[0.95rem] font-semibold leading-tight">{item.label}</span>
          {item.sub && <span className="truncate text-[0.74rem] text-muted">{item.sub}</span>}
        </span>
        <LuArrowUpRight
          size={16}
          className="ml-auto shrink-0 text-muted/55 transition-colors duration-200 group-hover:text-accent"
        />
      </motion.a>
    )
  }

  return (
    <motion.a
      variants={chipIn}
      whileTap={{ scale: 0.96 }}
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      style={brandStyle}
      className="chip group glass relative flex flex-col items-center justify-center gap-2.5 rounded-2xl px-2 py-4 text-text"
    >
      <LuArrowUpRight
        size={13}
        className="absolute right-2.5 top-2.5 text-muted/0 transition-colors duration-200 group-hover:text-muted/70"
      />
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--text)_7%,transparent)] text-text transition-colors duration-200 group-hover:[color:var(--brand)]">
        <Icon size={21} />
      </span>
      <span className="text-[0.82rem] font-semibold leading-none">{item.label}</span>
      {item.sub && <span className="text-[0.65rem] leading-none text-muted">{item.sub}</span>}
    </motion.a>
  )
}
