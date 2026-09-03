export default function VerifiedTick({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-sans text-body-sm font-medium text-lime ${className}`}>
      <svg
        viewBox="0 0 24 24"
        width={14}
        height={14}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verified
    </span>
  );
}
