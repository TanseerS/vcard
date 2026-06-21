import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LuMapPin, LuDownload, LuShare2, LuCheck } from 'react-icons/lu'
import { FaAws } from 'react-icons/fa6'
import { site } from '../config/site'
import { useTheme } from '../lib/theme'
import { downloadVCard } from '../lib/vcard'
import { heroStagger, riseIn } from '../lib/motion'
import ThemeToggle from './ThemeToggle'

type SaveState = 'idle' | 'saving' | 'saved'

/** The hero is a sticky, full-bleed backdrop. The content sheet (in App)
 *  scrolls up and over it — one continuous immersive screen. */
export default function ProfileCard() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [darkErr, setDarkErr] = useState(false)
  const [lightErr, setLightErr] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [shared, setShared] = useState(false)

  async function handleSave() {
    if (saveState === 'saving') return
    setSaveState('saving')
    try {
      await downloadVCard()
    } finally {
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2400)
    }
  }

  async function handleShare() {
    const data = { title: `${site.name} — ${site.role}`, text: `${site.name} · ${site.role}`, url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(data.url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch {
      /* dismissed — no-op */
    }
  }

  return (
    <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden">
      {/* fallback while photos are missing */}
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ background: 'linear-gradient(155deg, var(--surface2), var(--surface))' }}
      >
        <span className="name-type text-[34vw] text-accent/25 sm:text-[200px]">TK</span>
      </div>

      {/* theme-aware portraits — cross-fade on theme switch */}
      {!darkErr && (
        <img
          src={site.photoDark}
          alt={`${site.name}, ${site.role}`}
          onError={() => setDarkErr(true)}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
          style={{ opacity: isDark ? 1 : 0 }}
        />
      )}
      {!lightErr && (
        <img
          src={site.photoLight}
          alt=""
          aria-hidden="true"
          onError={() => setLightErr(true)}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
          style={{ opacity: isDark ? 0 : 1 }}
        />
      )}

      {/* top scrim — keeps the floating controls legible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      {/* frosted scrim — soft, atmospheric blur over the lower region */}
      <div
        className="absolute inset-x-0 bottom-0 h-[58%]"
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          maskImage: 'linear-gradient(to top, black 52%, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black 52%, transparent)',
          background: 'linear-gradient(to top, rgba(8,10,14,0.82), rgba(8,10,14,0.3) 50%, transparent)',
        }}
      />

      {/* floating controls */}
      <div
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4"
        style={{ paddingTop: 'max(0.9rem, env(safe-area-inset-top))' }}
      >
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this card"
          className="glass grid h-11 w-11 place-items-center rounded-full text-white"
        >
          {shared ? <LuCheck size={18} className="text-accent" /> : <LuShare2 size={17} />}
        </button>
        <ThemeToggle />
      </div>

      {/* identity — bottom-anchored, above the sheet's resting edge */}
      <motion.div
        variants={reduce ? undefined : heroStagger}
        initial={reduce ? undefined : 'hidden'}
        animate={reduce ? undefined : 'show'}
        className="absolute inset-x-0 bottom-[15svh] flex flex-col gap-3 px-7 text-white"
      >
        <motion.div variants={reduce ? undefined : riseIn} className="relative w-fit">
          <h1 className="name-type text-[clamp(2rem,9vw,2.6rem)] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
            {site.name}
          </h1>
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent), color-mix(in srgb, var(--accent) 40%, white))',
                boxShadow: '0 0 12px 1px color-mix(in srgb, var(--accent) 70%, transparent)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 0.6, times: [0, 0.65, 1], ease: 'easeInOut', delay: 0.35 }}
            />
          )}
        </motion.div>

        <motion.p
          variants={reduce ? undefined : riseIn}
          className="text-[1rem] font-semibold text-accent"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
        >
          {site.role}
        </motion.p>

        <motion.div variants={reduce ? undefined : riseIn} className="mt-1 flex items-end justify-between gap-3">
          <div
            className="flex items-center gap-4 text-[0.84rem] font-medium text-white/90"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            <span className="flex items-center gap-1.5">
              <LuMapPin size={15} className="text-white/80" />
              {site.city}
            </span>
            <span className="flex items-center gap-1.5">
              <FaAws size={18} className="text-white/80" />
              Builder
            </span>
          </div>

          <motion.button
            type="button"
            onClick={handleSave}
            whileTap={{ scale: 0.96 }}
            aria-label="Save my contact"
            className="flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[0.92rem] font-semibold"
            style={{
              background: isDark ? 'var(--accent)' : '#ffffff',
              color: isDark ? 'var(--on-accent)' : '#0b0f14',
              boxShadow: '0 10px 26px -12px rgba(0,0,0,0.55)',
            }}
          >
            {saveState === 'saved' ? <LuCheck size={18} /> : <LuDownload size={17} />}
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Save'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
