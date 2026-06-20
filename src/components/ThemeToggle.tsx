import { motion, AnimatePresence } from 'framer-motion'
import { LuSun, LuMoon } from 'react-icons/lu'
import { useTheme } from '../lib/theme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="glass relative grid h-11 w-11 place-items-center overflow-hidden rounded-full text-text"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          {isDark ? <LuMoon size={18} /> : <LuSun size={19} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
