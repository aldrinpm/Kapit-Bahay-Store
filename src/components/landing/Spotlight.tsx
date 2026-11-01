import React, { useRef, useState, useCallback } from 'react';
import { cn } from '../../lib/utils';

interface SpotlightProps {
  /** Optional extra classes for the outer container. */
  className?: string;
  /** Radial glow colour, defaulting to the brand orange accent. */
  gradientColor?: string;
  /** Disable mouse tracking (e.g. for reduced-motion or static use). */
  mouseReactive?: boolean;
}

/**
 * Spotlight — adapted from Aceternity UI (https://21st.dev/).
 *
 * A full-bleed, mouse-reactive landing backdrop: a faint dot grid sits over the
 * container and a soft branded glow follows the pointer, revealing the grid and
 * a warm radial highlight where the cursor moves. Falls back to a gentle ambient
 * glow when mouse tracking is disabled or motion is reduced.
 */
const Spotlight: React.FC<SpotlightProps> = ({
  className,
  gradientColor = 'rgba(255,140,0,0.18)',
  mouseReactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={mouseReactive ? handleMouseMove : undefined}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 select-none', className)}
    >
      {/* Dot grid, brightest near the pointer */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovering ? 1 : 0.35,
          backgroundImage:
            'radial-gradient(rgba(54,69,79,0.16) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: `radial-gradient(600px circle at ${coordinates.x}px ${coordinates.y}px, black, transparent 40%)`,
          WebkitMaskImage: `radial-gradient(600px circle at ${coordinates.x}px ${coordinates.y}px, black, transparent 40%)`,
        }}
      />

      {/* Colourful glow that follows the cursor */}
      <div
        className="kb-spotlight-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          width: 720,
          height: 720,
          background: `radial-gradient(circle, ${gradientColor}, transparent 70%)`,
          transform: `translate(${coordinates.x - 360}px, ${coordinates.y - 360}px)`,
          opacity: hovering ? 1 : 0,
        }}
      />
    </div>
  );
};

export default Spotlight;
