"use client";

/**
 * MonitorHero.tsx — "Enter the Screen" cinematic scroll effect
 *
 * Phase 1 (scroll 0–40%):  User sees a photorealistic dark monitor floating in 3D space.
 *                           The screen glows with a preview of the UI inside.
 * Phase 2 (scroll 40–100%): Camera "flies" into the monitor — scale, perspective
 *                            zoom, the bezel disappears, the inner content takes over.
 * Phase 3 (pinned end):     Normal hero content is revealed full-bleed.
 *
 * Drop-in usage in page.tsx:
 *   <MonitorHero>{<your existing hero section JSX>}</MonitorHero>
 */

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   HOOK HELPERS
───────────────────────────────────────────────────────────── */
function useSmoothTransform(
  value: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
  stiffness = 90,
  damping = 22
) {
  const raw = useTransform(value, inputRange, outputRange);
  return useSpring(raw, { stiffness, damping, mass: 0.8 });
}

/* ─────────────────────────────────────────────────────────────
   MONITOR SHELL (photorealistic dark aluminium frame)
───────────────────────────────────────────────────────────── */
function MonitorShell({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  // As scroll progresses: monitor scales up + camera zooms IN
  const scale        = useSmoothTransform(progress, [0, 0.5, 1], [0.62, 0.85, 2.6]);
  const bezelOpacity = useSmoothTransform(progress, [0, 0.45, 0.72], [1, 1, 0]);
  const screenGlow   = useSmoothTransform(progress, [0, 0.4], [0.55, 1]);
  const translateY   = useSmoothTransform(progress, [0, 0.5, 1], [0, -20, -260]);
  const perspective  = useSmoothTransform(progress, [0, 0.5, 1], [1200, 1000, 400]);

  return (
    <motion.div
      style={{
        scale,
        y: translateY,
        perspective,
        transformStyle: "preserve-3d",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── MONITOR OUTER BEZEL ── */}
      <motion.div
        style={{
          opacity: bezelOpacity,
          position: "absolute",
          inset: -28,
          borderRadius: 28,
          background: "linear-gradient(160deg,#2a2a2e 0%,#1a1a1d 40%,#0f0f11 100%)",
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.06),
            0 40px 120px rgba(0,0,0,0.95),
            0 8px 32px rgba(0,0,0,0.8),
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(0,0,0,0.6)
          `,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        {/* Top camera bar */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#1a1a1d",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
            }}
          />
        </div>

        {/* Corner lit accents — simulate light source top-left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            borderRadius: "28px 28px 0 0",
            background:
              "linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom stand notch */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: "35%",
            height: 4,
            borderRadius: "0 0 4px 4px",
            background: "linear-gradient(90deg,#1a1a1d,#252528,#1a1a1d)",
          }}
        />

        {/* Edge rim highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 28,
            border: "1.5px solid rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ── SCREEN GLASS ── */}
      <motion.div
        style={{
          opacity: bezelOpacity,
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background:
            "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0) 50%)",
          zIndex: 22,
          pointerEvents: "none",
        }}
      />

      {/* ── SCREEN GLOW HALO ── */}
      <motion.div
        style={{
          opacity: screenGlow,
          position: "absolute",
          inset: -60,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%,rgba(99,102,241,0.28) 0%,rgba(79,70,229,0.12) 40%,transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── INNER SCREEN CONTENT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          borderRadius: 14,
          overflow: "hidden",
          width: "min(88vw, 1080px)",
          aspectRatio: "16/10",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESK / ENVIRONMENT
───────────────────────────────────────────────────────────── */
function DeskEnvironment({ progress }: { progress: MotionValue<number> }) {
  const opacity = useSmoothTransform(progress, [0, 0.35, 0.65], [1, 0.6, 0]);
  const y       = useSmoothTransform(progress, [0, 0.5], [0, 60]);

  return (
    <motion.div
      aria-hidden
      style={{
        opacity,
        y,
        position: "absolute",
        bottom: "0%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* Monitor stand */}
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Neck */}
        <div
          style={{
            width: 44,
            height: 48,
            background:
              "linear-gradient(180deg,#252528 0%,#1a1a1d 50%,#222224 100%)",
            boxShadow: "inset 2px 0 4px rgba(0,0,0,0.5),inset -2px 0 4px rgba(255,255,255,0.03)",
          }}
        />
        {/* Base */}
        <div
          style={{
            width: 260,
            height: 14,
            borderRadius: "0 0 24px 24px",
            background:
              "linear-gradient(180deg,#1e1e21 0%,#141416 100%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.8),0 2px 8px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        />
        {/* Desk surface reflection */}
        <div
          style={{
            width: "100vw",
            height: 120,
            background:
              "linear-gradient(180deg,rgba(20,20,24,0.95) 0%,rgba(10,10,14,0.98) 100%)",
            marginTop: 0,
          }}
        />
      </div>

      {/* Side ambient lights on desk */}
      {[-1, 1].map((side) => (
        <div
          key={side}
          style={{
            position: "absolute",
            bottom: 80,
            [side === -1 ? "left" : "right"]: "10%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              side === -1
                ? "radial-gradient(circle,rgba(59,130,246,0.08),transparent 70%)"
                : "radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%)",
            filter: "blur(32px)",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOM / SPACE ENVIRONMENT (dark cinematic room)
───────────────────────────────────────────────────────────── */
function RoomBackground({ progress }: { progress: MotionValue<number> }) {
  const opacity = useSmoothTransform(progress, [0, 0.5, 0.8], [1, 0.6, 0]);
  const scale   = useSmoothTransform(progress, [0, 1], [1, 1.18]);

  return (
    <motion.div
      aria-hidden
      style={{
        opacity,
        scale,
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Dark room base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%,#0d0d12 0%,#07070b 60%,#040406 100%)",
        }}
      />

      {/* Subtle floor perspective lines */}
      <svg
        viewBox="0 0 1200 700"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "55%",
          opacity: 0.04,
        }}
        preserveAspectRatio="none"
      >
        {Array.from({ length: 10 }, (_, i) => {
          const t = i / 9;
          const x0 = 600;
          const y0 = 0;
          const x1 = t * 1200;
          const y1 = 700;
          return (
            <line
              key={i}
              x1={x0} y1={y0} x2={x1} y2={y1}
              stroke="rgba(147,197,253,0.9)"
              strokeWidth="0.8"
            />
          );
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const frac = Math.pow((i + 1) / 9, 1.8);
          const y = frac * 700;
          const lerpT = frac;
          const x0 = 600 + (0 - 600) * lerpT;
          const x1 = 600 + (1200 - 600) * lerpT;
          return (
            <line
              key={`h${i}`}
              x1={x0} y1={y} x2={x1} y2={y}
              stroke="rgba(147,197,253,0.9)"
              strokeWidth={0.5 + frac * 0.5}
              opacity={frac * 0.9}
            />
          );
        })}
      </svg>

      {/* Ceiling glow lines (like Wonderland) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 2,
          background:
            "linear-gradient(90deg,transparent,rgba(147,197,253,0.15),rgba(99,102,241,0.2),rgba(147,197,253,0.15),transparent)",
          filter: "blur(1px)",
          boxShadow: "0 0 40px 8px rgba(99,102,241,0.08)",
        }}
      />

      {/* Corner vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 45%,transparent 30%,rgba(4,4,6,0.92) 100%)",
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOATING TEXT — "scroll to enter" cue
───────────────────────────────────────────────────────────── */
function ScrollCue({ progress }: { progress: MotionValue<number> }) {
  const opacity = useSmoothTransform(progress, [0, 0.15], [1, 0]);

  return (
    <motion.div
      style={{
        opacity,
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
          }}
        >
          scroll to enter
        </span>
        {/* Mouse icon */}
        <div
          style={{
            width: 22,
            height: 34,
            borderRadius: 11,
            border: "1.5px solid rgba(255,255,255,0.18)",
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 10] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn" }}
            style={{
              width: 3,
              height: 6,
              borderRadius: 2,
              background: "rgba(255,255,255,0.4)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MINI SCREEN PREVIEW (shown inside monitor before zoom)
   Shows a tiny faithful preview of the hero content
───────────────────────────────────────────────────────────── */
function MiniScreenPreview() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg,#080c1a 0%,#0f0a2e 30%,#150f3a 55%,#0a1628 80%,#060b18 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(129,140,248,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,0.6) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.04,
        }}
      />

      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: -60, left: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.22),transparent 65%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: -40, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.18),transparent 65%)", filter: "blur(40px)" }} />

      {/* Live badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "4px 12px", marginBottom: 16 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Technician Available Now</span>
      </div>

      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.4rem,4vw,2.6rem)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4 }}>Tech Problem?</div>
        <div style={{
          fontWeight: 900, fontSize: "clamp(1.4rem,4vw,2.6rem)", lineHeight: 1, letterSpacing: "-0.03em",
          background: "linear-gradient(90deg,#93c5fd,#6ee7b7,#c4b5fd)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>Search Solution Below</div>
      </div>

      {/* Search bar */}
      <div style={{ width: "70%", maxWidth: 420, background: "rgba(255,255,255,0.95)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.5)", marginBottom: 14 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <div style={{ flex: 1, height: 12, borderRadius: 6, background: "rgba(0,0,0,0.06)" }} />
        <div style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 8, padding: "5px 12px" }}>
          <div style={{ width: 28, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.8)" }} />
        </div>
      </div>

      {/* 4 category cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, width: "72%", maxWidth: 500 }}>
        {[
          { label: "Printer", from: "#3b82f6", to: "#1d4ed8" },
          { label: "GPS", from: "#2dd4bf", to: "#059669" },
          { label: "Computer", from: "#8b5cf6", to: "#6d28d9" },
          { label: "Virus", from: "#f43f5e", to: "#b91c1c" },
        ].map((c) => (
          <div
            key={c.label}
            style={{
              background: `linear-gradient(145deg,${c.from}dd,${c.to})`,
              borderRadius: 10,
              padding: "10px 8px",
              textAlign: "center",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 9, fontWeight: 800, marginTop: 4 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Screen scan line */}
      <motion.div
        style={{
          position: "absolute",
          left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg,transparent,rgba(147,197,253,0.35),transparent)",
          pointerEvents: "none",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULL CONTENT REVEAL — shown after zoom completes
───────────────────────────────────────────────────────────── */
function ContentReveal({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const opacity = useSmoothTransform(progress, [0.6, 0.82], [0, 1]);
  const scale   = useSmoothTransform(progress, [0.6, 0.85], [0.97, 1]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        position: "absolute",
        inset: 0,
        zIndex: 40,
        pointerEvents: progress as unknown as undefined, // workaround for pointer blocking
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export function MonitorHero({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.7,
  });

  // Pointer events: disable real content until zoom is ~complete
  const contentPointerEvents = useTransform(smoothProgress, (v) =>
    v > 0.75 ? "auto" : "none"
  ) as MotionValue<"auto" | "none">;

  return (
    // Tall scroll container — scroll distance = the "zoom travel"
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "280vh", // scroll budget for the effect
      }}
    >
      {/* STICKY VIEWPORT — everything sticks while scrolling */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          background: "#040406",
        }}
      >
        {/* 1. Room environment */}
        <RoomBackground progress={smoothProgress} />

        {/* 2. Desk */}
        <DeskEnvironment progress={smoothProgress} />

        {/* 3. Monitor + screen preview */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <MonitorShell progress={smoothProgress}>
            <MiniScreenPreview />
          </MonitorShell>
        </div>

        {/* 4. Full content revealed after zoom */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            opacity: useTransform(smoothProgress, [0.62, 0.84], [0, 1]),
            scale: useTransform(smoothProgress, [0.62, 0.86], [0.97, 1]),
            pointerEvents: contentPointerEvents,
          }}
        >
          {children}
        </motion.div>

        {/* 5. Scroll cue */}
        <ScrollCue progress={smoothProgress} />

        {/* 6. Edge vignette that fades as we zoom in */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 85% 65% at 50% 50%,transparent 0%,rgba(4,4,6,0.88) 100%)",
            opacity: useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.7, 0]),
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      </div>
    </div>
  );
}
