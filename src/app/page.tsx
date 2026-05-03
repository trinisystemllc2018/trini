"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { SmartProblemFinder } from "@/components/features/SmartProblemFinder";
import { ReviewsCarousel, TrustSection } from "@/components/sections/ReviewsSection";
import { StickyCTA } from "@/components/ui/Button";
import {
  EightYearTrustBanner,
  GoogleReviewsSection,
} from "@/components/sections/GoogleTrustSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { BRANDS, SERVICES, DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */
interface Cat {
  id: string;
  label: string;
  sub: string;
  href: string;
  from: string;
  to: string;
  glow: string;
  border: string;
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const CATS: Cat[] = [
  {
    id: "printer",
    label: "Printer",
    sub: "HP · Canon · Epson · Brother",
    href: "/printer-support",
    from: "#3b82f6",
    to: "#1d4ed8",
    glow: "59,130,246",
    border: "rgba(147,197,253,0.4)",
  },
  {
    id: "gps",
    label: "GPS",
    sub: "Garmin · TomTom · Magellan",
    href: "/gps-help",
    from: "#2dd4bf",
    to: "#059669",
    glow: "20,184,166",
    border: "rgba(110,231,183,0.4)",
  },
  {
    id: "computer",
    label: "Computer",
    sub: "Dell · HP · Lenovo · Gateway",
    href: "/computer-help",
    from: "#8b5cf6",
    to: "#6d28d9",
    glow: "167,139,250",
    border: "rgba(196,181,253,0.4)",
  },
  {
    id: "virus",
    label: "Virus Removal",
    sub: "Norton · McAfee · Avast · AVG",
    href: "/virus-removal",
    from: "#f43f5e",
    to: "#b91c1c",
    glow: "251,113,133",
    border: "rgba(252,165,165,0.4)",
  },
];

const HINTS = [
  "HP DeskJet 4155e offline...",
  "Garmin map won't update...",
  "Dell laptop running slow...",
  "I think I have a virus...",
  "Canon printer error B200...",
  "Epson EcoTank ink error...",
  "TomTom GPS not turning on...",
  "McAfee keeps popping up...",
  "Brother printer not found...",
  "Windows 11 running slow...",
];

const KW: Record<string, string> = {
  printer:
    "hp canon epson brother offline ink paper cartridge not printing error printer deskjet envy",
  gps: "gps garmin tomtom magellan maps navigation update signal satellite nuvi drivesmart",
  computer:
    "computer pc laptop windows slow dell lenovo gateway freeze crash boot desktop",
  virus:
    "virus malware norton mcafee avast avg malwarebytes ccleaner security scam hacked ransomware popup",
};

// SMART ROUTING — specific queries jump straight to the matching SEO page.
// Each entry: keywords (array of trigger words/phrases) + target href
// Order matters — most specific matches first.
const SMART_ROUTES: { keywords: string[]; href: string }[] = [
  // Garmin model-specific (most specific first)
  { keywords: ["nuvi 2597", "nuvi 2598", "nuvi 2599", "nuvi 1450", "nuvi"], href: "/garmin/nuvi-2597-update" },
  { keywords: ["drive 50", "drive 51", "drive 52", "drive 60", "drive 61"], href: "/garmin/drive-50-update" },
  { keywords: ["drivesmart 55", "drivesmart 65", "drivesmart 76", "drivesmart 86", "drivesmart"], href: "/garmin/drivesmart-update" },
  { keywords: ["forerunner 245", "forerunner 255", "forerunner 265", "forerunner 955", "forerunner 965", "forerunner"], href: "/garmin/forerunner-update" },
  { keywords: ["fenix 5", "fenix 6", "fenix 7", "fenix 8", "fenix", "epix"], href: "/garmin/fenix-update" },
  { keywords: ["venu 2", "venu 3", "venu sq", "venu"], href: "/garmin/venu-update" },
  { keywords: ["zumo xt", "zumo 595", "zumo 396", "zumo", "motorcycle gps"], href: "/garmin/zumo-update" },
  { keywords: ["dezl otr", "dezl 580", "dezl 780", "dezl", "truck gps", "trucker gps"], href: "/garmin/dezl-update" },
  { keywords: ["etrex 10", "etrex 20", "etrex 22", "etrex 30", "etrex 32", "etrex se", "etrex solar", "etrex"], href: "/garmin/etrex-update" },
  { keywords: ["oregon 700", "oregon 750", "oregon 750t", "oregon"], href: "/garmin/oregon-update" },
  { keywords: ["gpsmap 64", "gpsmap 65", "gpsmap 66", "gpsmap 67", "gpsmap"], href: "/garmin/gpsmap-update" },
  { keywords: ["honda garmin", "honda navigation", "honda nav", "civic garmin", "crv garmin", "pilot garmin", "accord garmin"], href: "/garmin/honda-navigation-update" },
  { keywords: ["jeep rhb", "rhb 430n", "wrangler garmin", "wrangler nav", "jeep nav", "jeep cherokee garmin"], href: "/garmin/jeep-rhb-430n-update" },
  // Garmin problems (specific first)
  { keywords: ["garmin express not", "express won't", "express not working", "express crashing", "garmin express"], href: "/garmin/express-not-working" },
  { keywords: ["acquire satellite", "satellite signal", "won't find satellite", "no gps signal", "gps not working"], href: "/garmin/wont-acquire-satellites" },
  { keywords: ["map update failed", "garmin update failed", "stuck at 39", "map cannot be read", "garmin bricked", "garmin recovery"], href: "/garmin/map-update-failed" },
  { keywords: ["wifi sync", "wifi not working", "wifi won't connect", "garmin wifi"], href: "/garmin/wifi-sync-not-working" },
  { keywords: ["connect app", "garmin connect not", "connect won't sync", "connect crashing", "connect app crash"], href: "/garmin/connect-app-not-working" },
  { keywords: ["bluetooth pairing", "won't pair", "bluetooth not working", "bluetooth disconnect", "garmin bluetooth"], href: "/garmin/bluetooth-pairing-failed" },
  { keywords: ["battery drain", "battery dying", "battery life", "battery fast", "battery problem"], href: "/garmin/battery-drain-fast" },
  // Garmin general (catch-all for Garmin queries)
  { keywords: ["garmin", "gps map update"], href: "/garmin-gps-help" },
  // Printer brand-specific
  { keywords: ["hp printer service", "hp support", "hp printer phone"], href: "/hp-printer-service" },
  { keywords: ["hp printer repair", "hp deskjet", "hp envy", "hp officejet", "hp laserjet"], href: "/hp-printer-repair" },
  { keywords: ["epson plotter", "epson surecolor", "epson wide format", "wide format printer", "plotter"], href: "/epson-plotters" },
  { keywords: ["epson nyc", "epson new york", "epson manhattan", "epson queens", "epson brooklyn"], href: "/epson-service-nyc" },
  { keywords: ["epson", "ecotank", "workforce"], href: "/epson-printer-repair" },
  { keywords: ["canon", "pixma", "imageclass", "b200"], href: "/canon-printer-repair" },
  { keywords: ["printer near me", "printer repair near", "local printer"], href: "/printer-repair-near-me" },
];

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════════════════════ */
function Particles() {
  const pts = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 14 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.2 + 0.04,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -50, 0], opacity: [p.opacity, p.opacity * 3, p.opacity] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOUSE GLOW
═══════════════════════════════════════════════════════════════ */
function MouseGlow() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        width: 700,
        height: 700,
        x: useTransform(smx, (v) => v - 350),
        y: useTransform(smy, (v) => v - 350),
        background:
          "radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)",
        filter: "blur(50px)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   3-D TILT CARD
═══════════════════════════════════════════════════════════════ */
function TiltCard({
  children,
  style,
  onClick,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const rotX = useTransform(srx, (v) => `${v}deg`);
  const rotY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    rx.set(-dy * 10);
    ry.set(dx * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    onMouseLeave?.();
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onMouseEnter}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", ...style }}
      className={className}
      whileHover={{ scale: 1.07, z: 40 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD MICRO-ANIMATIONS
═══════════════════════════════════════════════════════════════ */
function PrinterAnim() {
  return (
    <div className="flex flex-col items-center mb-3 h-20 justify-center" style={{ transform: "translateZ(20px)" }}>
      <div className="relative">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="w-18 h-12 rounded-xl flex flex-col items-center justify-between py-1.5 px-2"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.3)",
            width: 72,
          }}
        >
          <div className="w-10 h-1 rounded-full bg-white/40" />
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0], y: [0, 0, 8, 8] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-3 left-3 h-3 rounded-sm"
          style={{ originX: 0, width: 48, background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        />
      </div>
    </div>
  );
}

function GpsAnim() {
  return (
    <div className="flex items-center justify-center mb-3 h-20" style={{ transform: "translateZ(20px)" }}>
      <div className="relative">
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.3)",
            width: 52,
            height: 68,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-4 rounded-full"
            style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 0 12px rgba(255,255,255,0.8)" }}
          />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/50"
            style={{ inset: -i * 12, borderRadius: "50%" }}
            animate={{ opacity: [0.6, 0], scale: [0.4, 1.8] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55, ease: "easeOut" }}
          />
        ))}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "10px solid rgba(255,255,255,0.85)",
          }}
        />
      </div>
    </div>
  );
}

function ComputerAnim() {
  return (
    <div className="flex flex-col items-center mb-3 h-20 justify-center" style={{ transform: "translateZ(20px)" }}>
      <div
        className="rounded-lg overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.25)",
          width: 80,
          height: 52,
        }}
      >
        <div className="absolute inset-2 flex flex-col gap-1 justify-center">
          {[100, 75, 88].map((w, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              style={{ width: `${w}%`, background: "rgba(255,255,255,0.35)" }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </div>
        <motion.div
          className="absolute left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="w-20 h-1 mt-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
      <div className="w-12 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
    </div>
  );
}

function VirusAnim() {
  return (
    <div className="flex items-center justify-center mb-3 h-20" style={{ transform: "translateZ(20px)" }}>
      <div className="relative flex items-center justify-center">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/20"
            style={{ width: 64 + i * 28, height: 64 + i * 28 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
            transition={{ duration: 4 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-12 h-12 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" className="w-10 h-10">
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-3 h-3 rounded-full bg-white/60" style={{ filter: "blur(2px)" }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const ANIMS: Record<string, () => React.ReactElement> = {
  printer: PrinterAnim,
  gps: GpsAnim,
  computer: ComputerAnim,
  virus: VirusAnim,
};

/* ═══════════════════════════════════════════════════════════════
   HOME HERO — Full viewport, ultra-premium
═══════════════════════════════════════════════════════════════ */
function HomeHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState(0);
  const [focused, setFocused] = useState(false);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [cardHover, setCardHover] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setHint((h) => (h + 1) % HINTS.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setMatchId(null); return; }
    const q = query.toLowerCase();
    const found = CATS.find((c) =>
      KW[c.id].split(" ").some((k) => q.includes(k))
    );
    setMatchId(found?.id ?? null);
  }, [query]);

  const go = (href: string) => router.push(href);
  const matched = CATS.find((c) => c.id === matchId) ?? null;

  const handleSearch = () => {
    // SMART ROUTING: check specific page matches first
    if (query.trim()) {
      const q = query.toLowerCase();
      const smartMatch = SMART_ROUTES.find((route) =>
        route.keywords.some((kw) => q.includes(kw))
      );
      if (smartMatch) { go(smartMatch.href); return; }
    }
    // Fall back to category match
    if (matched) { go(matched.href); return; }
    if (query.trim()) { go(`/printer-support?q=${encodeURIComponent(query)}`); return; }
    go("/printer-support");
  };

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        minHeight: "100svh",
        background:
          "linear-gradient(135deg,#080c1a 0%,#0f0a2e 30%,#150f3a 55%,#0a1628 80%,#060b18 100%)",
      }}
    >
      {/* ── Grid mesh ── */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(129,140,248,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%,transparent 0%,rgba(6,9,24,0.65) 100%)",
        }}
      />

      {/* ── Ambient blobs ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 800,
          top: "0%",
          left: "-15%",
          background: "radial-gradient(circle,rgba(59,130,246,0.13),transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 700,
          bottom: "0%",
          right: "-10%",
          background: "radial-gradient(circle,rgba(139,92,246,0.11),transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 13, repeat: Infinity, delay: 3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 400,
          top: "40%",
          left: "20%",
          background: "radial-gradient(ellipse,rgba(6,182,212,0.07),transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, delay: 6, ease: "easeInOut" }}
      />

      <Particles />
      <MouseGlow />

      {/* ══════════════ CONTENT ══════════════ */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center"
        style={{ paddingTop: "max(56px,7vh)", paddingBottom: "max(40px,6vh)" }}
      >
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-9 cursor-default select-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"
              style={{ boxShadow: "0 0 10px rgba(52,211,153,0.9)" }}
            />
          </span>
          <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
            Technician Available Now &nbsp;·&nbsp; {PHONE}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-white tracking-[-0.03em] leading-[0.93] mb-3"
          style={{
            fontSize: "clamp(3.2rem,8.5vw,7rem)",
            textShadow: "0 0 100px rgba(99,102,241,0.3)",
          }}
        >
          Tech Problem?
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-black tracking-[-0.03em] leading-[0.93] mb-9"
          style={{
            fontSize: "clamp(3.2rem,8.5vw,7rem)",
            background: "linear-gradient(90deg,#93c5fd 0%,#6ee7b7 28%,#c4b5fd 58%,#93c5fd 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmerText 5s linear infinite",
            filter: "drop-shadow(0 0 40px rgba(147,197,253,0.35))",
          }}
        >
          Search Solution Below
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="text-white/38 text-lg md:text-xl mb-10 max-w-lg mx-auto font-light tracking-wide"
        >
          Type your problem or tap a category — get an instant fix guide
        </motion.p>

        {/* ── SEARCH BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.48, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mb-6"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow: focused
                ? "0 0 0 3px rgba(99,102,241,0.5),0 0 0 7px rgba(99,102,241,0.12),0 36px 90px rgba(0,0,0,0.55),0 8px 28px rgba(99,102,241,0.22)"
                : "0 36px 90px rgba(0,0,0,0.5),0 8px 28px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.9)",
              transition: "box-shadow 0.35s ease",
            }}
          >
            <div className="flex items-center">
              {/* Search icon */}
              <div className="pl-5 pr-3 shrink-0">
                <motion.div
                  animate={{ scale: focused ? 1.18 : 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                    <defs>
                      <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <circle cx="11" cy="11" r="8" stroke="url(#sg)" />
                    <path d="m21 21-4.35-4.35" stroke="url(#sg)" />
                  </svg>
                </motion.div>
              </div>

              {/* Input + placeholder */}
              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full py-5 pr-2 text-lg text-gray-900 font-semibold bg-transparent outline-none"
                  style={{ caretColor: "#4f46e5" }}
                  placeholder=" "
                  autoComplete="off"
                />
                {!query && !focused && (
                  <div className="absolute inset-0 flex items-center pr-2 pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={hint}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-gray-400 text-base font-medium truncate"
                      >
                        {HINTS[hint]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Match badge */}
              <AnimatePresence>
                {matched && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="flex items-center gap-1.5 mx-2 px-3 py-1.5 rounded-xl text-white text-xs font-black whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg,${matched.from},${matched.to})`,
                      boxShadow: `0 2px 14px rgba(${matched.glow},0.55)`,
                    }}
                  >
                    {matched.id === "printer"
                      ? "🖨️"
                      : matched.id === "gps"
                      ? "🗺️"
                      : matched.id === "computer"
                      ? "💻"
                      : "🛡️"}{" "}
                    {matched.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Fix It button */}
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="m-2 text-white font-black px-6 py-3.5 rounded-xl text-base shrink-0"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                  backgroundSize: "200% 200%",
                  boxShadow: "0 4px 22px rgba(79,70,229,0.65)",
                  animation: "shimmerBtn 3s linear infinite",
                }}
              >
                Fix It →
              </motion.button>
            </div>

            {/* Bottom glow line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(99,102,241,0.7),rgba(139,92,246,0.7),transparent)",
              }}
              animate={{ opacity: focused ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Quick chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-2 justify-center mt-4"
          >
            {[
              "Printer offline",
              "GPS map update",
              "Slow computer",
              "Virus removal",
              "HP error code",
              "Canon B200 error",
              "Garmin not updating",
              "Windows 11 slow",
            ].map((chip, i) => (
              <motion.button
                key={chip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                onClick={() => { setQuery(chip); inputRef.current?.focus(); }}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full transition-all"
                style={{
                  color: "rgba(255,255,255,0.48)",
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {chip}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── 4 CATEGORY CARDS ── */}
        <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {CATS.map((cat, i) => {
            const Anim = ANIMS[cat.id];
            const isHovered = cardHover === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 36, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.72 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  onClick={() => go(cat.href)}
                  onMouseEnter={() => setCardHover(cat.id)}
                  onMouseLeave={() => setCardHover(null)}
                  className="relative w-full text-left flex flex-col rounded-3xl p-5 overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(145deg,${cat.from}ee,${cat.to})`,
                    border: `1.5px solid ${cat.border}`,
                    boxShadow: `0 ${isHovered ? 24 : 8}px ${isHovered ? 70 : 36}px rgba(${cat.glow},${isHovered ? 0.7 : 0.42}),0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.22)`,
                    minHeight: 224,
                    transition: "box-shadow 0.35s ease",
                  }}
                >
                  {/* Glass shine */}
                  <div
                    className="absolute inset-x-0 top-0 h-1/3 pointer-events-none rounded-t-3xl"
                    style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 100%)" }}
                  />
                  {/* Noise texture */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: `url("${NOISE_SVG}")`, backgroundSize: "200px" }}
                  />
                  {/* Corner highlight */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle,white,transparent)" }}
                  />
                  {/* Bottom glow */}
                  <motion.div
                    className="absolute -bottom-4 inset-x-4 h-8 rounded-full pointer-events-none"
                    style={{ background: `rgba(${cat.glow},0.45)`, filter: "blur(14px)" }}
                    animate={{ opacity: isHovered ? 1 : 0.4, scaleX: isHovered ? 1.15 : 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Mini animation */}
                  <div className="flex justify-center">
                    <Anim />
                  </div>

                  {/* Label */}
                  <p
                    className="font-black text-white text-xl md:text-2xl leading-tight mt-1"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.28)", transform: "translateZ(10px)" }}
                  >
                    {cat.label}
                  </p>
                  <p className="text-white/52 text-xs mt-1.5 leading-snug font-medium">{cat.sub}</p>

                  {/* CTA row */}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-white/70 text-sm font-bold">Fix now</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.18)",
                        border: "1px solid rgba(255,255,255,0.32)",
                      }}
                    >
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25 }}
          className="flex flex-wrap justify-center gap-x-7 gap-y-2 mt-11 select-none"
        >
          {[
            { icon: "⚡", text: "Avg response < 15 min" },
            { icon: "🛡️", text: "No fix = no fee" },
            { icon: "🌎", text: "All 50 US states" },
            { icon: "⭐", text: "4.9 Google rating" },
            { icon: "📞", text: PHONE },
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: "rgba(255,255,255,0.24)" }}
            >
              <span className="opacity-60">{icon}</span>
              <span className="font-medium">{text}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer select-none"
        style={{ color: "rgba(255,255,255,0.14)" }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">scroll</span>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.2, repeat: Infinity }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes shimmerText {
          0%   { background-position: 0% center }
          100% { background-position: 200% center }
        }
        @keyframes shimmerBtn {
          0%   { background-position: 0% 50% }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   REST OF HOME PAGE (unchanged)
═══════════════════════════════════════════════════════════════ */

function BrandsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          All Major Printer Brands — Supported &amp; Repaired
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BRANDS.map((b) => (
            <Link
              key={b.name}
              href={b.href}
              className="group flex flex-col gap-4 p-6 rounded-3xl border-2 border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/40 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black"
                style={{ background: b.bgColor, color: b.color }}
              >
                {b.name[0]}
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-blue-700 transition-colors">
                  {b.name}
                </h3>
                <div className="space-y-1">
                  {b.models.slice(0, 3).map((m) => (
                    <p key={m} className="text-xs text-gray-500 font-mono">{m}</p>
                  ))}
                </div>
              </div>
              <div className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                View support →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    green: "bg-emerald-50 border-emerald-100 text-emerald-600",
    purple: "bg-purple-50 border-purple-100 text-purple-600",
    orange: "bg-orange-50 border-orange-100 text-orange-600",
    red: "bg-red-50 border-red-100 text-red-600",
    teal: "bg-teal-50 border-teal-100 text-teal-600",
  };
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
              <span className="w-5 h-px bg-blue-400 inline-block" />Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Every tech problem.<br />One trusted team.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0"
          >
            View all services →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative bg-white rounded-3xl p-7 border-2 border-gray-100 hover:border-blue-200 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
            >
              {s.popular && (
                <div className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl mb-5 ${colorMap[s.color]}`}>
                {s.icon}
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                Learn more <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { label: "Average Cost", trini: "From $49", geek: "$149+" },
    { label: "Wait Time", trini: "< 30 minutes", geek: "3–7 days" },
    { label: "Leave Home Required", trini: "Never", geek: "Yes" },
    { label: "Available Hours", trini: "24/7", geek: "Store hours" },
    { label: "Free Tools", trini: "Yes — TriniCleaner", geek: "None" },
    { label: "Personal Technician", trini: "Yes — always", geek: "Varies" },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-red-200">
            📊 Comparison
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Trini System vs. Geek Squad
          </h2>
          <p className="text-lg text-gray-600">
            Same-day service at half the price — without leaving your home.
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Feature</div>
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                TS Trini System
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-sm font-semibold text-gray-400">Geek Squad</div>
            </div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
            >
              <div className="p-4 text-sm font-medium text-gray-700 flex items-center">{r.label}</div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                  ✓ {r.trini}
                </span>
              </div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-sm text-gray-400">{r.geek}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            📞 Call {PHONE} — Available Now
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all"
          >
            Book Online →
          </Link>
        </div>
      </div>
    </section>
  );
}

function DownloadCTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Is Your PC Running Slow?</h2>
        <p className="text-emerald-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Download TriniCleaner free — removes gigabytes of junk in 60 seconds. No subscription, no
          upsells, no nonsense.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={DOWNLOAD_URL}
            className="flex items-center gap-3 bg-white text-emerald-700 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            <span className="text-2xl">⬇</span>Download TriniCleaner — Free
          </a>
          <div className="text-emerald-200 text-sm">
            Works on Windows 7, 8, 10 &amp; 11<br />No sign-up. Instant download.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <EightYearTrustBanner />
      <BrandsSection />
      <SmartProblemFinder />
      <ServicesGrid />
      <TrustSection />
      <GoogleReviewsSection />
      <SocialProofSection />
      <ComparisonSection />
      <DownloadCTASection />
      <StickyCTA />
    </>
  );
}
