import { site } from '../config/site'

/**
 * Build a UPI deep-link.
 *  - 'upi'     → generic, opens the system app chooser (works everywhere)
 *  - 'tez'     → Google Pay
 *  - 'phonepe' → PhonePe
 *  - 'paytmmp' → Paytm
 * App-specific schemes only resolve on a phone with that app installed; the
 * QR + generic upi:// are the universal fallbacks.
 */
export function upiUrl(scheme: 'upi' | 'tez' | 'phonepe' | 'paytmmp' = 'upi', amount?: number): string {
  const params = [
    `pa=${encodeURIComponent(site.upiId)}`,
    `pn=${encodeURIComponent(site.upiName)}`,
    'cu=INR',
  ]
  if (amount && amount > 0) params.push(`am=${amount}`)
  const query = params.join('&')

  switch (scheme) {
    case 'tez':
      return `tez://upi/pay?${query}`
    case 'phonepe':
      return `phonepe://pay?${query}`
    case 'paytmmp':
      return `paytmmp://pay?${query}`
    default:
      return `upi://pay?${query}`
  }
}
