# Tanseer Khan — Digital Visiting Card

A mobile‑first **digital business card**: one link that lets anyone you meet connect
on any channel, **save your contact**, or **pay you** — in a single tap.

> Design system **“Voltline”** — a near‑monochrome engineer's control panel with one
> electric‑mint accent, mono "spec‑label" headings, liquid‑glass chips, and a single
> "power‑on" motion moment. The hero profile card is modelled on
> [Tran Mau Tri Tam's "Profile Card"](https://dribbble.com/shots/26033069-Profile-Card).

## ✨ Features

- **Mobile‑first**, scales gracefully to tablet & laptop (single centred column).
- **Auto dark / light theme** — follows the OS by default, with a manual toggle (remembered).
- **Immersive hero** — full‑bleed portrait + name + title, with **separate photos that cross‑fade per theme** and a scroll cue down to the links.
- **Liquid‑glass / transparent** surfaces throughout & a draggable **bottom sheet** for payments.
- **Save contact** → generates a `.vcf` vCard (with your photo embedded) and downloads it.
- **WhatsApp** opens a chat with `Hi` already typed.
- **Pay me (UPI)** → scannable QR + PhonePe / Google Pay / Paytm deep‑links + tap‑to‑copy VPA.
- Custom **favicon**, **app icons**, **web manifest**, and **Open Graph** image.
- Respects `prefers-reduced-motion`; keyboard‑accessible.

## 🧱 Tech stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · react‑icons · qrcode.react

## 🚀 Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build
```

## 🛠️ Make it yours

Almost everything lives in **`src/config/site.ts`** — edit that one file.

| What | Where |
| --- | --- |
| **Your photos** | Replace `public/assets/profile-dark.jpg` and `public/assets/profile-light.jpg` with portraits (~3:4). Use a moodier shot for dark and a brighter one for light — they cross‑fade with the theme. |
| **UPI ID (to receive money)** | `site.upiId` → set your real VPA, then set `site.upiPlaceholder: false`. |
| **Name / role / location / phone / email** | the `site` object in `src/config/site.ts`. |
| **Links (which appear & where)** | `connectLinks`, `workLinks`, `reachLinks` arrays. |
| **Theme colours** | the palette variables in `src/index.css` (`[data-theme]` blocks). |
| **Favicon / icons / OG image** | files in `public/` (`favicon.svg`, `apple-touch-icon.png`, `og-image.png`). |

### Add a link you don't have yet (e.g. Instagram)

```ts
// src/config/site.ts
import { FaInstagram } from 'react-icons/fa6'

export const connectLinks: LinkItem[] = [
  // ...existing
  { id: 'instagram', label: 'Instagram', icon: FaInstagram,
    href: 'https://instagram.com/your_handle', brand: '#E4405F' },
]
```

Browse icon names at [react-icons.github.io/react-icons](https://react-icons.github.io/react-icons/).

## ☁️ Deploy (static)

`npm run build` outputs a fully static site in `dist/`. Drop it on any static host:

- **Vercel / Netlify / Cloudflare Pages** — framework preset **Vite**, build `npm run build`, output `dir dist`.
- **GitHub Pages** — push `dist/` (set `base` in `vite.config.ts` if not served from the root).

## 📝 Notes

- UPI **app deep‑links** only open the app on a phone that has it installed; the **QR code**
  and the generic `upi://` link are the universal fallbacks.
- The vCard embeds the portrait, so keep `public/profile.jpg` reasonably small (< ~700 KB).
