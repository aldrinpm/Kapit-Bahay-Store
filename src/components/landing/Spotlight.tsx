import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../providers/theme';
import { cn } from '../../lib/utils';

interface SpotlightProps {
  /** Optional extra classes for the outer container. */
  className?: string;
  /** Radial glow colour, defaulting to the brand orange accent. */
  gradientColor?: string;
  /** Disable mouse tracking (e.g. for reduced-motion or static use). */
  mouseReactive?: boolean;
}

/** Diameter of the circular cursor spotlight, in px. */
const SPOTLIGHT_SIZE = 720;

/** Dot grids per theme — faint dots that contrast with the ambient glow. */
const dotGrids = {
  light: {
    backgroundImage: 'radial-gradient(rgba(54,69,79,0.16) 1px, transparent 1px)',
    backgroundSize: '22px 22px',
  },
  dark: {
    backgroundImage: 'radial-gradient(rgba(236,231,220,0.14) 1px, transparent 1px)',
    backgroundSize: '22px 22px',
  },
} as const;

/**
 * Spotlight — adapted from Aceternity UI (https://21st.dev/).
 *
 * A full-bleed, mouse-reactive landing backdrop for the hero: a faint dot grid
 * overlays the section and a soft branded glow follows the pointer, brightening
 * the dots and adding a warm radial highlight under the cursor.
 *
 * The layer is `pointer-events: none`, so it can never receive mouse events
 * directly and content above it would block it anyway — the pointer is tracked
 * at window level instead and scoped to this container's bounds.
 *
 * When the pointer is outside the hero (or tracking is disabled or the user
 * prefers reduced motion), a gentle ambient glow drifts in its place.
 */
const Spotlight: React.FC<SpotlightProps> = ({
  className,
  gradientColor,
  mouseReactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const { theme } = useTheme();
  const dotGrid = dotGrids[theme];
  // The glow is allowed to run a touch stronger on the dark page.
  const glow = gradientColor ?? (theme === 'dark' ? 'rgba(255,140,0,0.24)' : 'rgba(255,140,0,0.18)');

  useEffect(() => {
    if (!mouseReactive) return undefined;

    // Honour the reduced-motion preference: no pointer tracking at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setHovering(inside);
      if (inside) {
        setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    // Drop the cursor spotlight when the pointer leaves the window entirely.
    const handleMouseLeave = () => setHovering(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseReactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 select-none', className)}
    >
      {/* Ambient glow while the pointer is outside the hero or motion is reduced */}
      <div
        className="kb-spotlight-ambient absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 640px at 50% 42%, ${glow}, transparent 72%)`,
          opacity: hovering ? 0 : 1,
        }}
      />

      {/* Dot grid, always faintly visible */}
      <div className="absolute inset-0 opacity-30" style={dotGrid} />

      {/* Same grid, brightened in a circle around the pointer */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          ...dotGrid,
          opacity: hovering ? 1 : 0,
          maskImage: `radial-gradient(600px circle at ${coordinates.x}px ${coordinates.y}px, black, transparent 40%)`,
          WebkitMaskImage: `radial-gradient(600px circle at ${coordinates.x}px ${coordinates.y}px, black, transparent 40%)`,
        }}
      />

      {/* Colourful glow that follows the cursor */}
      <div
        className="absolute left-0 top-0 transition-opacity duration-500"
        style={{
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          background: `radial-gradient(circle, ${glow}, transparent 70%)`,
          transform: `translate(${coordinates.x - SPOTLIGHT_SIZE / 2}px, ${coordinates.y - SPOTLIGHT_SIZE / 2}px)`,
          opacity: hovering ? 1 : 0,
        }}
      />
    </div>
  );
};

export default Spotlight;
