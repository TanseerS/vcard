import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LuIndianRupee, LuChevronUp, LuChevronDown } from 'react-icons/lu'
import { ThemeProvider } from './lib/theme'
import ProfileCard from './components/ProfileCard'
import LinkSection from './components/LinkSection'
import PaySheet from './components/PaySheet'
import { site, connectLinks, workLinks, reachLinks } from './config/site'
import { sectionReveal } from './lib/motion'

function Card() {
  const reduce = useReducedMotion()
  const [payOpen, setPayOpen] = useState(false)

  function scrollToLinks() {
    document.getElementById('links')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <>
      <main className="relative mx-auto w-full max-w-[480px]">
        <div className="relative">
          {/* sticky full-bleed hero backdrop */}
          <ProfileCard />

          {/* content sheet — scrolls up and over the hero */}
          <div
            className="relative z-10 -mt-[12svh] rounded-t-[34px]"
            style={{
              background: 'var(--ground)',
              borderTop: '1px solid color-mix(in srgb, var(--text) 9%, transparent)',
              boxShadow: '0 -24px 48px -26px rgba(0,0,0,0.55)',
            }}
          >
            {/* sheet atmosphere — keeps the liquid-glass glow behind the chips */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[34px]">
              <div
                className="absolute inset-0 opacity-[0.55]"
                style={{
                  backgroundImage:
                    'radial-gradient(color-mix(in srgb, var(--muted) 22%, transparent) 1px, transparent 1px)',
                  backgroundSize: '26px 26px',
                  maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 20%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 20%, transparent 70%)',
                }}
              />
              <div
                className="absolute -top-[12%] left-1/2 h-[42vh] w-[120%] -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--accent) 24%, transparent), transparent)' }}
              />
              <div
                className="absolute bottom-[8%] left-[-12%] h-[40vh] w-[70%] rounded-full opacity-70 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, color-mix(in srgb, var(--accent2) 22%, transparent), transparent)' }}
              />
            </div>

            {/* scroll cue — straddles the seam between hero and sheet */}
            <motion.button
              type="button"
              onClick={scrollToLinks}
              aria-label="Scroll to links"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileTap={{ scale: 0.9 }}
              className="glass absolute left-1/2 top-0 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-text"
              style={{ boxShadow: '0 10px 30px -12px rgba(0,0,0,0.6)' }}
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="grid place-items-center text-accent"
              >
                <LuChevronDown size={20} />
              </motion.span>
            </motion.button>

            {/* links */}
            <div className="relative flex flex-col gap-7 px-4 pb-12 pt-10">
              <LinkSection
                id="links"
                label="CONNECT"
                items={connectLinks}
                variant="tile"
                limit={3}
                gridClass="grid grid-cols-3 gap-2.5"
              />

              <LinkSection
                label="WORK / TECH"
                items={workLinks}
                variant="tile"
                limit={2}
                gridClass="grid grid-cols-2 gap-2.5"
              />

              <LinkSection
                label="REACH"
                items={reachLinks}
                variant="row"
                limit={2}
                gridClass="grid grid-cols-1 gap-2.5"
              />

              {/* Payments */}
              <motion.section
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-8% 0px' }}
              >
                <div className="mb-3 flex items-center gap-2.5 px-1">
                  <span className="h-1.5 w-1.5 rounded-[2px] bg-accent" />
                  <span className="spec text-muted">PAYMENTS</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <motion.button
                  type="button"
                  onClick={() => setPayOpen(true)}
                  whileTap={{ scale: 0.98 }}
                  className="chip group glass flex w-full items-center gap-3.5 rounded-2xl px-4 py-4 text-left text-text"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl text-on-accent" style={{ background: 'var(--accent)' }}>
                    <LuIndianRupee size={20} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.98rem] font-semibold leading-tight">Pay me</span>
                    <span className="text-[0.74rem] text-muted">UPI · PhonePe · GPay · Paytm</span>
                  </span>
                  <LuChevronUp size={20} className="ml-auto text-muted/60 transition-transform group-hover:-translate-y-0.5" />
                </motion.button>
              </motion.section>

              {/* footer */}
              <footer className="mt-2 flex flex-col items-center gap-1.5 pt-2 text-center">
                <span className="spec text-muted/70" style={{ fontSize: '0.66rem' }}>
                  BUILT BY TANSEER · {site.city.toUpperCase()}
                </span>
                <span className="text-[0.72rem] text-muted/55">Let's build something resilient.</span>
              </footer>
            </div>
          </div>
        </div>
      </main>

      <PaySheet open={payOpen} onClose={() => setPayOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Card />
    </ThemeProvider>
  )
}
