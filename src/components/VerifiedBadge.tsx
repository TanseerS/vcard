/** Scalloped verified seal (per the reference): white fill, dark checkmark.
 *  Reads cleanly over any photo in both themes; links to AWS Community Builder. */
export default function VerifiedBadge({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}
    >
      <path
        d="M12 1.6l2.36 1.7 2.9-.18 1.02 2.72 2.44 1.58-.9 2.77.9 2.77-2.44 1.58-1.02 2.72-2.9-.18L12 22.4l-2.36-1.7-2.9.18-1.02-2.72L3.28 16.6l.9-2.77-.9-2.77 2.44-1.58 1.02-2.72 2.9.18L12 1.6z"
        fill="#ffffff"
      />
      <path
        d="M8.2 12.2l2.6 2.6 5-5.2"
        stroke="#0b0f14"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
