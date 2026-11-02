import * as React from 'react';
import { Package } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Product Wheel — faithful adaptation of Crafter UI "Works Wheel"
 * (https://21st.dev/, source referenced from the registry item JSON in the
 * repository root).
 *
 * The original behaviour, kept one-to-one:
 * - The wheel is a single number `turn`: 0 is a ring of cards around the
 *   label, 1 is a vertical 3D drum with item 0 flat and full-size at the
 *   front, and every whole number after that is one more item turned past.
 * - The first notch of (mouse) scroll blows the ring open into the drum;
 *   scrolling only cancels page scroll while the wheel has somewhere left
 *   to go, so the page never gets trapped. After a burst of wheel events
 *   the wheel settles onto an item.
 * - Vertical drag turns the drum; on release it lands on an item rather
 *   than between two.
 * - ArrowUp/ArrowDown turn by one item; a clickable index list on the right
 *   jumps straight to an item.
 * - The ring label and the front-card title crossfade across the transition.
 * - One `requestAnimationFrame` pass eases `turn` toward the target and
 *   writes every transform straight to the DOM — turning is not a render.
 *
 * Adaptations for this storefront (kept deliberately small):
 * - The stage sits on the animated hero backdrop, so it is transparent.
 * - `touch-action: pan-y` keeps vertical touch swipes scrolling the page;
 *   drag deltas use the dominant axis, so horizontal swipes turn the drum.
 * - Type sizes read by proportion on a small stage get pixel floors.
 * - The index list is hidden on narrow screens to keep the ring clean.
 * - A failed image shows a branded badge instead of a broken tile.
 */

export interface WheelItem {
  /** Shown beside the front card and in the index. */
  title: string;
  /** Any src an <img> takes. */
  src: string;
  /** Alt for the cover image. */
  alt: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface ProductWheelProps {
  items: WheelItem[];
  /** Label in the middle of the ring. */
  label?: string;
  /** Hover affordance on cards that link somewhere. Omit to drop it. */
  action?: string;
  /** Optional extra classes for the outer stage. */
  className?: string;
}

/* Geometry, tuned together as in the source (see its long comment): STEP vs
   DRUM sets how hard neighbours rotate away, DRUM vs LENS decides whether
   they land inside the frame or run off it. */
const CARD_H = 0.38; // front card height, of the stage
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights
const LENS = 2.7; // perspective distance, in card heights
const RING_R = 1.14; // ring radius, in card heights
/* The drum curves away round an arc whose centre sits off to the LEFT; the
   front piece is at the arc's near point and its neighbours swing back left
   as well as up and down. */
const BOW = 1.82;
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
const CULL = 1.6; // items either side of the front still worth drawing

/* How much of a wheel notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before settling on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no easing. */
const EASE = 0.12;

const clamp = (value: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something turned `drumDeg` off the front. */
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: ring terms fall away as `m` reaches the drum;
    the drum terms are still zero while the ring is up. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

const ProductWheel: React.FC<ProductWheelProps> = ({
  items,
  label = 'Works',
  action = 'View',
  className,
}) => {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // The wheel's position and where it is heading. Only `active` is React
  // state — everything else is written to the DOM.
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  // Image fallback: brand badge instead of a broken tile.
  const [brokenSrcs, setBrokenSrcs] = React.useState<ReadonlySet<string>>(
    () => new Set<string>()
  );
  const markBroken = React.useCallback((src: string) => {
    setBrokenSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Read after mount, not during render. Reduced motion drops the easing so
  // the drum lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener('change', read);
    return () => query.removeEventListener('change', read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    // Shrink ring cards until the circle reads as a closed loop, however
    // many pieces the wheel is given.
    const ringScale = count
      ? clamp(((2 * Math.PI * ringR) / count) * 0.82 / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      // Pixel floors: proportion alone reads too small on a hero-sized stage.
      title: Math.max(cardH * TITLE, 18),
      index: Math.max(cardH * INDEX, 12),
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at
      // the far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            d * STEP,
            ringR,
            drumR,
            bow,
            m
          );
          // Culled by distance, not angle: at a full turn the far side comes
          // back round to face us, and everything past the neighbours lands
          // on the vanishing point in a heap.
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1';
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const settling = React.useRef(0);

  /** Walk toward an absolute position, clamped to the range. */
  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last]
  );

  // Native listener, because the wheel has to be cancellable — and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      // A wheel gesture arrives as a burst with no end of its own; settle
      // onto whatever item it stopped nearest.
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <section
      aria-label={label}
      className={cn(
        'relative w-full select-none overflow-hidden',
        className
      )}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`kb-product-wheel-${active}`}
        className="absolute inset-0 cursor-grab touch-pan-y outline-none active:cursor-grabbing focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-kapit-accent"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dy = drag.current.y - event.clientY;
          const dx = drag.current.x - event.clientX;
          // Dominant axis only, so a stray diagonal doesn't double-count.
          // Vertical is the drum's natural axis; on touch the page keeps
          // moving on vertical swipes (pan-y) and horizontal swipes turn.
          const delta = Math.abs(dy) >= Math.abs(dx) ? dy : dx;
          to(target.current + delta / DRAG_UNITS);
          drag.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={() => {
          // Land on an item rather than between two.
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') to(Math.round(target.current) + 1);
          else if (event.key === 'ArrowUp') to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? 'a' : 'div') as 'a';
            const isBroken = brokenSrcs.has(item.src);
            return (
              <Tag
                id={`kb-product-wheel-${i}`}
                key={item.title}
                role="option"
                aria-selected={i === active}
                href={item.href}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                className="group absolute [backface-visibility:hidden]"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <span className="relative block size-full overflow-hidden rounded-lg bg-kapit-background shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] dark:bg-kapit-panel dark:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
                  {isBroken ? (
                    <span className="flex size-full flex-col items-center justify-center gap-1 text-kapit-primary dark:text-kapit-light">
                      <Package size={22} aria-hidden />
                      <span className="truncate px-1 text-[0.7rem] font-medium">
                        {item.title}
                      </span>
                    </span>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      draggable={false}
                      onError={() => markBroken(item.src)}
                      className="size-full object-cover"
                    />
                  )}
                  {action && item.href && !isBroken ? (
                    <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-1 items-center gap-1 rounded-full bg-kapit-background/85 px-2.5 py-1 text-[0.7rem] text-kapit-primary opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 dark:bg-kapit-panel/90 dark:text-kapit-light">
                      {action}
                    </span>
                  ) : null}
                </span>
              </Tag>
            );
          })}
        </div>
      </div>

      {/* Ring label and front-card title trade places across the transition. */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center text-center font-extrabold tracking-tight text-kapit-text dark:text-kapit-light"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="pointer-events-none absolute left-[8%] top-1/2 -translate-y-1/2 font-extrabold tracking-tight text-kapit-text opacity-0 dark:text-kapit-light"
        style={{ fontSize: metrics.title }}
      >
        {items[active]?.title}
      </div>

      {/* Item index, down the right-hand side. Hidden on narrow stages. */}
      <ol className="absolute right-[2.5%] top-[7.5%] hidden text-right leading-[1.75] text-kapit-text/60 sm:block dark:text-kapit-light/50">
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                'cursor-pointer rounded transition-colors outline-none focus-visible:outline-1 focus-visible:outline-kapit-accent',
                i === active && 'font-medium text-kapit-text dark:text-kapit-light'
              )}
              style={{ fontSize: metrics.index }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProductWheel;
