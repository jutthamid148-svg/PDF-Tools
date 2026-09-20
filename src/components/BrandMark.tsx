export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-mark brand-mark-compact" : "brand-mark"} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="12" fill="url(#brand-mark-gradient)" />
        <path d="M12 9.5h10.5L29 16v14.5H12z" fill="white" fillOpacity=".98" />
        <path d="M22.5 9.5V16H29" fill="#bfdbfe" />
        <path d="M15.5 21h10M15.5 24.5h7" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m25.5 26.8 1.1 1.1 2.4-2.7" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="brand-mark-gradient" x1="5" y1="4" x2="35" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
