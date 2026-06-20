import { site } from '../config/site'

/** RFC 6350 line folding — fold long lines at 75 octets with a leading space. */
function fold(line: string): string {
  if (line.length <= 75) return line
  const out: string[] = [line.slice(0, 75)]
  let i = 75
  while (i < line.length) {
    out.push(' ' + line.slice(i, i + 74))
    i += 74
  }
  return out.join('\r\n')
}

function escape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

/** Fetch the portrait and inline it as base64 so the saved contact shows a photo. */
async function photoBase64(): Promise<{ b64: string; type: 'JPEG' | 'PNG' } | null> {
  try {
    const res = await fetch(site.photo)
    if (!res.ok) return null
    const blob = await res.blob()
    if (blob.size > 700_000) return null // keep the .vcf lean / parser-friendly
    const bytes = new Uint8Array(await blob.arrayBuffer())
    let binary = ''
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
    const type = blob.type.includes('png') ? 'PNG' : 'JPEG'
    return { b64: btoa(binary), type }
  } catch {
    return null
  }
}

export async function buildVCard(): Promise<string> {
  const photo = await photoBase64()

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escape(site.lastName)};${escape(site.firstName)};;;`,
    `FN:${escape(site.name)}`,
    `TITLE:${escape(site.role)}`,
    'ORG:Cloud & DevOps Engineering',
    `TEL;TYPE=CELL,VOICE:${site.phone}`,
    `EMAIL;TYPE=INTERNET,PREF:${site.email}`,
    `URL:${site.portfolio}`,
    `ADR;TYPE=WORK:;;;${escape(site.city)};;;${escape(site.country)}`,
    `NOTE:${escape(site.tagline)}`,
    'X-SOCIALPROFILE;TYPE=github:https://github.com/TanseerS',
    'X-SOCIALPROFILE;TYPE=x:https://x.com/KhanTanseer2',
    'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/tanseer-khan-a5905b262/',
  ]

  if (photo) lines.push(`PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.b64}`)
  lines.push('END:VCARD')

  return lines.map(fold).join('\r\n')
}

/** Generate the .vcf and trigger a download. */
export async function downloadVCard(): Promise<void> {
  const vcf = await buildVCard()
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tanseer-khan.vcf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}
