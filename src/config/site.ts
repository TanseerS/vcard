import type { IconType } from 'react-icons'
import { FaWhatsapp, FaXTwitter, FaLinkedinIn, FaGithub, FaAws } from 'react-icons/fa6'
import { SiHashnode, SiPhonepe, SiGooglepay, SiPaytm } from 'react-icons/si'
import { LuGlobe, LuMail, LuPhone } from 'react-icons/lu'

/* ============================================================================
   EDIT ME — this file is the single source of truth for the card.
   Replace placeholders (marked TODO) with real values and everything updates.
   ========================================================================== */

export const site = {
  name: 'Tanseer Khan',
  firstName: 'Tanseer',
  lastName: 'Khan',
  role: 'Cloud & DevOps Engineer',
  roleLabel: 'CLOUD · DEVOPS · AWS',
  tagline: 'Architecting secure, scalable, cost-optimised cloud infrastructure.',
  bio: 'Secure, scalable, cost-optimised cloud infrastructure.',
  city: 'Nashik',
  country: 'India',
  location: 'Nashik, India',

  phone: '+918793314013', // E.164, used for tel: and WhatsApp
  phoneDisplay: '+91 87933 14013',
  email: 'ktanseer2@gmail.com',
  portfolio: 'https://tanseer.qd.je',
  whatsappPrefill: 'Hi', // pre-typed into WhatsApp's input box

  /** Drop your portraits in /public/assets/ (portrait orientation, ~3:4).
   *  Use two shots tuned for each theme — a brighter/airier one for light,
   *  a moodier one for dark. They cross-fade when the theme switches. */
  photoDark: '/assets/vogue-potrait-dark.jpg',
  photoLight: '/assets/vogue-potrait.jpg',
  /** Photo embedded in the downloaded vCard. */
  photo: '/assets/vogue-potrait.jpg',

  /** AWS Community Builder profile — also powers the verified badge. */
  awsBuilder: 'https://builder.aws.com/community/@tanseer?tab=badges',

  /** TODO: replace with your real UPI ID, e.g. tanseer@okhdfcbank */
  upiId: 'tanseer@upi',
  upiName: 'Tanseer Khan',
  upiPlaceholder: true, // set false once upiId is real — gates the live QR note
} as const

export type LinkItem = {
  id: string
  label: string
  icon: IconType
  href: string
  hint?: string
  sub?: string
  /** brand tint used for the icon glyph on hover/active */
  brand?: string
}

const wa = `https://wa.me/${site.phone.replace('+', '')}?text=${encodeURIComponent(site.whatsappPrefill)}`

export const connectLinks: LinkItem[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp, href: wa, hint: 'Say hi', brand: '#25D366' },
  { id: 'x', label: 'X', icon: FaXTwitter, href: 'https://x.com/KhanTanseer2', brand: '#e7e9ea' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/in/tanseer-khan-a5905b262/',
    brand: '#0A66C2',
  },
]

export const workLinks: LinkItem[] = [
  { id: 'github', label: 'GitHub', icon: FaGithub, href: 'https://github.com/TanseerS', sub: '@TanseerS', brand: '#e7e9ea' },
  { id: 'portfolio', label: 'Portfolio', icon: LuGlobe, href: site.portfolio, sub: 'tanseer.qd.je', brand: '#22c55e' },
  { id: 'aws', label: 'AWS Builder', icon: FaAws, href: site.awsBuilder, sub: 'Community', brand: '#FF9900' },
  {
    id: 'hashnode',
    label: 'Hashnode',
    icon: SiHashnode,
    href: 'https://devops-aws-cloud.hashnode.dev/',
    sub: 'Blog',
    brand: '#2962FF',
  },
]

export const reachLinks: LinkItem[] = [
  { id: 'email', label: 'Email', icon: LuMail, href: `mailto:${site.email}`, sub: site.email, brand: '#EA4335' },
  { id: 'call', label: 'Call', icon: LuPhone, href: `tel:${site.phone}`, sub: site.phoneDisplay, brand: '#34d399' },
]

/** Payment apps for the bottom sheet. scheme drives the deep-link builder. */
export const payApps: { id: string; label: string; icon: IconType; scheme: string; brand: string }[] = [
  { id: 'phonepe', label: 'PhonePe', icon: SiPhonepe, scheme: 'phonepe', brand: '#5f259f' },
  { id: 'gpay', label: 'Google Pay', icon: SiGooglepay, scheme: 'tez', brand: '#e7e9ea' },
  { id: 'paytm', label: 'Paytm', icon: SiPaytm, scheme: 'paytmmp', brand: '#00BAF2' },
]
