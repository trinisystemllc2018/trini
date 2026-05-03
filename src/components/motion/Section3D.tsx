"use client";

/**
 * Section3D.tsx — "Marcelo Design X" scroll animation orchestrator
 *
 * Wrap any existing section/card with this to get:
 *   • Scroll-triggered rotateX perspective entry (−10deg → 0deg)
 *   • "Fall and Build" image/icon assembly (scale + blur + translateY snap)
 *   • Glassmorphic card shell with lit border gradient
 *   • Magnetic button behaviour (attach to any <button> via MagneticButton)
 *   • Parallax Z-shift for bg vs fg layers
 *   • Glitch-shimmer pass-over when an element finishes building
 *
 * Usage:
 *   <Section3D>          ← default: rotateX entry
 *     <YourSection />
 *   </Section3D>
 *
 *   <Section3D variant="build">   ← scale+blur+snap for images / icons
 *     <img src="…" />
 *   </Section3D>
 *
 *   <GlassCard>…</GlassCard>     ← frosted glass wrapper with lit border
 *   <MagneticButton>…</MagneticButton>  ← magnetic cursor pull
 *   <ParallaxLayer speed={0.4}>…</ParallaxLayer>  ← z-shift parallax
 */

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  type HTMLMotionProps,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Variant = "rotate" | "build" | "fade" | "slideUp";

interface Section3DProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof HTMLElementTagNameMap;
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Optional accent glow colour e.g. "rgba(79,142,247,0.25)" */
  glowColor?: string;
  /** Show corner HUD decorations */
  hud?: boolean;
  onClick?: () => void;
}

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  strength?: number;          // 0–1 magnetic pull intensity (default 0.35)
  magnetRadius?: number;      // px — distance at which magnet activates (default 120)
  className?: string;
  style?: CSSProperties;
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;             // 0 = no movement, 1 = full scroll speed (default 0.35)
  className?: string;
  style?: CSSProperties;
}

/* ─────────────────────────────────────────────────────────────
   SPRING CONFIGS
───────────────────────────────────────────────────────────── */
const SPRING_ENTRY   = { type: "spring", stiffness: 100, damping: 22, mass: 1 } as const;
const SPRING_BUILD   = { type: "spring", stiffness: 100, damping: 16, mass: 0.9 } as const;
const SPRING_MAGNET  = { type: "spring", stiffness: 280, damping: 24 } as const;
const SPRING_TILT    = { type: "spring", stiffness: 220, damping: 20 } as const;

/* ─────────────────────────────────────────────────────────────
   VARIANTS MAP
───────────────────────────────────────────────────────────── */
const VARIANTS: Record<Variant, { hidden: object; visible: object; transition: object }> = {
  rotate: {
    hidden:  { opacity: 0, rotateX: -10, y: 48, scale: 0.97 },
    visible: { opacity: 1, rotateX: 0,   y: 0,  scale: 1 },
    transition: SPRING_ENTRY,
  },
  build: {
    hidden:  { opacity: 0, scale: 0.8, y: -60, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1,   y: 0,   filter: "blur(0px)" },
    transition: SPRING_BUILD,
  },
  fade: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  slideUp: {
    hidden:  { opacity: 0, y: 56 },
    visible: { opacity: 1, y: 0 },
    transition: SPRING_ENTRY,
  },
};

/* ─────────────────────────────────────────────────────────────
   GLITCH-SHIMMER overlay (fires once after "build" completes)
───────────────────────────────────────────────────────────── */
function GlitchShimmer({ active }: { active: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ x: "-110%", opacity: 0 }}
      animate={active ? { x: "110%", opacity: [0, 0.7, 0.4, 0] } : { x: "-110%", opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.08 }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.45) 50%, rgba(147,197,253,0.25) 55%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 10,
        borderRadius: "inherit",
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   HUD CORNER decorations (sci-fi brackets)
───────────────────────────────────────────────────────────── */
function HudCorners() {
  const corner = (pos: CSSProperties): ReactNode => (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      style={{ position: "absolute", opacity: 0.35, ...pos }}
      aria-hidden
    >
      <path
        d={pos.top !== undefined && pos.left !== undefined
          ? "M0 8 L0 0 L8 0"
          : pos.top !== undefined
          ? "M10 0 L18 0 L18 8"
          : pos.left !== undefined
          ? "M0 10 L0 18 L8 18"
          : "M10 18 L18 18 L18 10"}
        stroke="rgba(147,197,253,0.8)" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
      {corner({ top: 6, left: 6 })}
      {corner({ top: 6, right: 6 })}
      {corner({ bottom: 6, left: 6 })}
      {corner({ bottom: 6, right: 6 })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 3D — main export
───────────────────────────────────────────────────────────── */
export function Section3D({
  children,
  variant = "rotate",
  delay = 0,
  className = "",
  style,
}: Section3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const [shimmerActive, setShimmerActive] = useState(false);

  const v = VARIANTS[variant];

  /* Fire shimmer once for "build" variant */
  useEffect(() => {
    if (isInView && variant === "build") {
      const t = setTimeout(() => setShimmerActive(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView, variant]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", position: "relative", ...style }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition: { ...v.transition, delay } },
      }}
    >
      {variant === "build" && <GlitchShimmer active={shimmerActive} />}
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLASS CARD
───────────────────────────────────────────────────────────── */
export function GlassCard({
  children,
  className = "",
  style,
  glowColor = "rgba(79,142,247,0.18)",
  hud = false,
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, SPRING_TILT);
  const sry = useSpring(ry, SPRING_TILT);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    rx.set(-dy * 5);
    ry.set(dx * 5);
  };

  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        /* Glassmorphism */
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px) saturate(1.35)",
        WebkitBackdropFilter: "blur(20px) saturate(1.35)",
        /* 4-layer floating shadow */
        boxShadow: `
          0 2px 4px rgba(0,0,0,0.32),
          0 8px 20px rgba(0,0,0,0.38),
          0 24px 48px rgba(0,0,0,0.28),
          0 0 80px ${glowColor},
          inset 0 0 0 1px rgba(255,255,255,0.07)
        `,
        /* Lit border — simulated light from top-left */
        borderImage: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.01) 100%) 1",
        border: "1px solid transparent",
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      className={className}
      whileHover={{
        boxShadow: `
          0 4px 8px rgba(0,0,0,0.42),
          0 16px 32px rgba(0,0,0,0.45),
          0 40px 80px rgba(0,0,0,0.35),
          0 0 100px ${glowColor.replace("0.18", "0.32")},
          inset 0 0 0 1px rgba(255,255,255,0.12)
        `,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Lit border pseudo-layer (gradient overlay on top edge) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 35%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
          opacity: 0.025,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {hud && <HudCorners />}

      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────────────────────── */
export function MagneticButton({
  children,
  strength = 0.35,
  magnetRadius = 120,
  className = "",
  style,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MAGNET);
  const sy = useSpring(y, SPRING_MAGNET);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < magnetRadius) {
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    }
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={className}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   PARALLAX LAYER — bg elements move slower than fg
───────────────────────────────────────────────────────────── */
export function ParallaxLayer({
  children,
  speed = 0.35,
  className = "",
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Map scroll 0→1 to a y shift: slower speed = smaller shift */
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100 * -1}%`]);
  const y = useSpring(rawY, { stiffness: 80, damping: 22 });

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCROLL ROTATE SECTION — wraps any <section> with a
   perspective rotateX entry driven by scroll position
   (alternative to useInView — good for tall sections)
───────────────────────────────────────────────────────────── */
export function ScrollRotateSection({
  children,
  className = "",
  style,
}: Pick<Section3DProps, "children" | "className" | "style">) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.35"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const opacity  = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);
  const scale    = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        opacity,
        scale,
        transformOrigin: "center top",
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HUD STATUS DOT — glowing status indicator for corners
───────────────────────────────────────────────────────────── */
export function HudDot({
  color = "#34d399",
  label,
}: {
  color?: string;
  label?: string;
}) {
  return (
    <motion.span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.38)",
        userSelect: "none",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex" }}>
        <motion.span
          animate={{ scale: [0.8, 2], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background: color,
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 8px ${color}`,
            display: "block",
          }}
        />
      </span>
      {label}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCAN LINE — decorative horizontal sweep for panels
───────────────────────────────────────────────────────────── */
export function ScanLine({ color = "rgba(147,197,253,0.5)" }: { color?: string }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   COORDINATES HUD — tiny tech coords in card corners
───────────────────────────────────────────────────────────── */
export function CoordLabel({
  value,
  style,
}: {
  value?: string;
  style?: CSSProperties;
}) {
  const [coord, setCoord] = useState(value ?? "");

  useEffect(() => {
    if (value) return;
    const rand = () =>
      `${(Math.random() * 90).toFixed(4)}°${Math.random() > 0.5 ? "N" : "S"} · ${(Math.random() * 180).toFixed(4)}°${Math.random() > 0.5 ? "E" : "W"}`;
    setCoord(rand());
  }, [value]);

  return (
    <span
      style={{
        fontFamily: "monospace",
        fontSize: 9,
        letterSpacing: "0.06em",
        color: "rgba(147,197,253,0.35)",
        userSelect: "none",
        pointerEvents: "none",
        ...style,
      }}
    >
      {coord}
    </span>
  );
}
