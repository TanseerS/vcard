import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import { LuCopy, LuCheck } from 'react-icons/lu'
import BottomSheet from './BottomSheet'
import { site, payApps } from '../config/site'
import { upiUrl } from '../lib/upi'

export default function PaySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const qrValue = upiUrl('upi')

  async function copyVpa() {
    try {
      await navigator.clipboard.writeText(site.upiId)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Pay Tanseer · UPI">
      <div className="flex flex-col items-center gap-5">
        <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
          <QRCodeCanvas value={qrValue} size={186} bgColor="#ffffff" fgColor="#0b0f14" level="M" marginSize={0} />
        </div>
        <p className="text-center text-[0.85rem] text-muted">Scan to pay, or pick an app</p>

        <button
          type="button"
          onClick={copyVpa}
          className="chip glass flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3"
        >
          <span className="font-mono text-[0.85rem] text-text">{site.upiId}</span>
          <span className="flex items-center gap-1.5 text-[0.78rem] font-medium text-accent">
            {copied ? (
              <>
                <LuCheck size={15} /> Copied
              </>
            ) : (
              <>
                <LuCopy size={15} /> Copy
              </>
            )}
          </span>
        </button>

        <div className="grid w-full grid-cols-3 gap-2.5">
          {payApps.map((app) => {
            const Icon = app.icon
            return (
              <motion.a
                key={app.id}
                whileTap={{ scale: 0.95 }}
                href={upiUrl(app.scheme as 'upi')}
                style={{ ['--brand' as string]: app.brand } as CSSProperties}
                className="chip group glass flex flex-col items-center gap-2 rounded-xl px-2 py-3.5 text-text"
              >
                <Icon size={23} className="transition-colors duration-200 group-hover:[color:var(--brand)]" />
                <span className="text-[0.72rem] font-medium">{app.label}</span>
              </motion.a>
            )
          })}
        </div>

        {site.upiPlaceholder && (
          <p className="text-center text-[0.7rem] leading-relaxed text-muted/75">
            Demo UPI ID — set your real ID in <span className="font-mono">src/config/site.ts</span> to go live.
          </p>
        )}
      </div>
    </BottomSheet>
  )
}
