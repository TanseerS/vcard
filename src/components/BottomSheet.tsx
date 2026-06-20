import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { LuX } from 'react-icons/lu'

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    sheetRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  function handleDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 700) onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[460px] px-3 outline-none"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 34 }}
            drag={reduce ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
          >
            <div
              className="glass rounded-[28px] px-5 pt-3"
              style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
            >
              <div className="mx-auto mb-4 h-1.5 w-11 cursor-grab rounded-full bg-[color-mix(in_srgb,var(--text)_22%,transparent)] active:cursor-grabbing" />
              <div className="mb-5 flex items-center justify-between">
                <h2 className="spec text-muted">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:text-text"
                >
                  <LuX size={18} />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
