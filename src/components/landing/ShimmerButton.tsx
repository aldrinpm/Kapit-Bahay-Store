import React from 'react';
import { cn } from '../../lib/utils';

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional leading icon/element rendered before the label. */
  children: React.ReactNode;
  /** Gradient used for the sweeping shimmer and optional ring. */
  shimmerColor?: string;
}

/**
 * Shimmer Button — adapted from shadcn/ui (https://21st.dev/).
 *
 * An animated button whose highlight sweeps across the surface on hover. Pure
 * CSS/Tailwind (no animation library required); it honours prefers-reduced-motion
 * via the global keyframe guard in index.css.
 */
const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  className,
  shimmerColor = 'rgba(255,255,255,0.5)',
  ...props
}) => {
  return (
    <button
      className={cn(
        'group relative inline-flex cursor-pointer items-center justify-center',
        'overflow-hidden rounded-lg px-8 py-3 font-semibold text-white',
        'bg-kapit-primary shadow-lg shadow-kapit-primary/20',
        'transition-transform duration-300 ease-out hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapit-accent focus-visible:ring-offset-2 focus-visible:ring-offset-kapit-background',
        'disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0',
        'kb-btn-shimmer',
        className
      )}
      {...props}
    >
      {/* Sweeping shimmer sweep on hover */}
      <span
        aria-hidden
        className="kb-shimmer-sweep pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-full"
        style={
          {
            '--shimmer-color': shimmerColor,
          } as React.CSSProperties
        }
      />
      {/* Soft glowing border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/25"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default ShimmerButton;
