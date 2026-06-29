import { cn } from '@/lib/utils/cn';

export function Weldline({ className = '' }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 opacity-70', className)} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="kcWeld" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#c21b1c" stopOpacity="0" />
            <stop offset="0.18" stopColor="#c21b1c" stopOpacity="0.55" />
            <stop offset="0.52" stopColor="#c21b1c" stopOpacity="0.9" />
            <stop offset="0.86" stopColor="#c21b1c" stopOpacity="0.55" />
            <stop offset="1" stopColor="#c21b1c" stopOpacity="0" />
          </linearGradient>
          <filter id="kcGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 0.2 0 0 0  0 0 0.2 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
        <path
          d="M-50 380 C 180 320, 320 420, 520 360 S 860 320, 1250 290"
          fill="none"
          stroke="url(#kcWeld)"
          strokeWidth="3"
        />
        <path
          d="M-50 380 C 180 320, 320 420, 520 360 S 860 320, 1250 290"
          fill="none"
          stroke="#ff7a1a"
          strokeOpacity="0.10"
          strokeWidth="10"
          filter="url(#kcGlow)"
        />
      </svg>
    </div>
  );
}
