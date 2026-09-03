export default function Star({ className = "h-4 w-4 text-lime" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5l2.95 6.28 6.93.86-5.1 4.78 1.4 6.86L12 17.9l-6.18 3.38 1.4-6.86-5.1-4.78 6.93-.86L12 2.5z" />
    </svg>
  );
}
