"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   HOME HERO — Search-first, bright animated category cards
   Heading: "Tech Problem? Search Solution Below"
───────────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    id: "printer",
    label: "Printer",
    sub: "HP · Canon · Epson · Brother",
    href: "/printer-support",
    bg: "from-blue-500 to-blue-700",
    glow: "rgba(59,130,246,0.6)",
    icon: "🖨️",
    keywords: ["printer","hp","canon","epson","brother","offline","ink","paper","cartridge","not printing","error"],
    anim: "printer",
  },
  {
    id: "gps",
    label: "GPS",
    sub: "Garmin · TomTom · Magellan",
    href: "/gps-help",
    bg: "from-teal-500 to-emerald-600",
    glow: "rgba(20,184,166,0.6)",
    icon: "🗺️",
    keywords: ["gps","garmin","tomtom","magellan","maps","navigation","update","signal","satellite"],
    anim: "gps",
  },
  {
    id: "computer",
    label: "Computer",
    sub: "Dell · HP · Lenovo · Gateway",
    href: "/computer-help",
    bg: "from-violet-500 to-purple-700",
    glow: "rgba(139,92,246,0.6)",
    icon: "💻",
    keywords: ["computer","pc","laptop","windows","slow","dell","lenovo","gateway","freeze","crash","boot"],
    anim: "computer",
  },
  {
    id: "virus",
    label: "Virus Removal",
    sub: "Norton · McAfee · Avast · AVG",
    href: "/virus-removal",
    bg: "from-rose-500 to-red-700",
    glow: "rgba(239,68,68,0.6)",
    icon: "🛡️",
    keywords: ["virus","malware","norton","mcafee","avast","avg","malwarebytes","ccleaner","security","scam","hacked","pop"],
    anim: "virus",
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

/* ── Printer animation ── */
function PrinterAnim() {
  return (
    <div className="flex flex-col items-center gap-1 mt-3 mb-1">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-10 bg-white/20 rounded-lg border-2 border-white/40 flex items-end justify-center pb-1 shadow-lg"
      >
        <div className="w-10 h-1.5 bg-white/60 rounded" />
      </motion.div>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
        style={{ originX: 0 }}
        className="w-10 h-2 bg-white/80 rounded shadow-sm"
      />
    </div>
  );
}

/* ── GPS animation ── */
function GpsAnim() {
  return (
    <div className="flex items-center justify-center mt-3 mb-1">
      <div className="relative">
        <div className="w-10 h-14 bg-white/20 rounded-xl border-2 border-white/40 flex items-center justify-center shadow-lg">
          <span className="text-lg">📍</span>
        </div>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl border-2 border-white/60"
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.52, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Computer animation ── */
function ComputerAnim() {
  return (
    <div className="flex flex-col items-center gap-0.5 mt-3 mb-1">
      <div className="w-16 h-10 bg-white/20 rounded-lg border-2 border-white/40 flex items-center justify-center overflow-hidden shadow-lg">
        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="w-6 h-1 bg-white/80 rounded-full blur-[1px]"
        />
      </div>
      <div className="w-18 h-1 bg-white/30 rounded-full w-16" />
      <div className="w-10 h-1.5 bg-white/20 rounded-full" />
    </div>
  );
}

/* ── Shield / Virus animation ── */
function VirusAnim() {
  return (
    <div className="flex items-center justify-center mt-3 mb-1">
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl select-none"
        >
          🛡️
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 scale-150"
        />
      </div>
    </div>
  );
}

const ANIMS: Record<string, React.FC> = {
  printer:  PrinterAnim,
  gps:      GpsAnim,
  computer: ComputerAnim,
  virus:    VirusAnim,
};

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery]   = useState("");
  const [hint, setHint]     = useState(0);
  const [focused, setFocused] = useState(false);
  const [matched, setMatched] = useState<typeof CATEGORIES[0] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* rotate placeholder hints */
  useEffect(() => {
    const t = setInterval(() => setHint(h => (h + 1) % HINTS.length), 2600);
    return () => clearInterval(t);
  }, []);

  /* live keyword match */
  useEffect(() => {
    if (!query.trim()) { setMatched(null); return; }
    const q = query.toLowerCase();
    setMatched(CATEGORIES.find(c => c.keywords.some(k => q.includes(k))) ?? null);
  }, [query]);

  const go = (href: string) => router.push(href);

  const handleSearch = () => {
    if (matched) { go(matched.href); return; }
    if (query.trim()) { go(`/printer-support?q=${encodeURIComponent(query)}`); return; }
    go("/printer-support");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16" style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 40%,#0f172a 100%)" }}>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#818cf8 1px,transparent 1px),linear-gradient(90deg,#818cf8 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

      {/* Breathing glow orbs */}
      <motion.div animate={{ scale: [1,1.3,1], opacity: [0.15,0.35,0.15] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,#3b82f6 0%,transparent 70%)", filter: "blur(60px)" }} />
      <motion.div animate={{ scale: [1,1.2,1], opacity: [0.1,0.25,0.1] }} transition={{ duration: 9, repeat: Infinity, delay: 3 }} className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,#8b5cf6 0%,transparent 70%)", filter: "blur(60px)" }} />
      <motion.div animate={{ scale: [1,1.4,1], opacity: [0.08,0.2,0.08] }} transition={{ duration: 11, repeat: Infinity, delay: 5 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,#06b6d4 0%,transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

        {/* Live indicator */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} className="inline-flex items-center gap-2 bg-white/8 border border-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">Technician Available Now · {PHONE}</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.1, ease:[0.16,1,0.3,1] }}
          className="font-black text-white leading-[1.0] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Tech Problem?
          <span className="block" style={{ background: "linear-gradient(90deg,#60a5fa,#34d399,#a78bfa,#60a5fa)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmerText 4s linear infinite" }}>
            Search Solution Below
          </span>
        </motion.h1>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }} className="text-white/45 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Type your problem or tap a category — we'll walk you through the fix
        </motion.p>

        {/* ── SEARCH BAR ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }} className="mb-10">
          <div
            className="flex items-center bg-white rounded-2xl shadow-2xl transition-all duration-300"
            style={{ boxShadow: focused ? "0 0 0 4px rgba(99,102,241,0.35), 0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.35)" }}
          >
            <span className="pl-5 text-2xl shrink-0 select-none">🔍</span>
            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-5 text-base md:text-lg text-gray-900 font-semibold bg-transparent outline-none"
                style={{ caretColor: "#2563eb" }}
                placeholder=" "
                autoComplete="off"
              />
              {/* Animated placeholder */}
              {!query && !focused && (
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={hint}
                      initial={{ opacity:0, y:5 }}
                      animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:-5 }}
                      transition={{ duration:0.35 }}
                      className="text-gray-400 text-base font-medium truncate"
                    >
                      {HINTS[hint]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>
            {/* Live match badge */}
            <AnimatePresence>
              {matched && (
                <motion.div
                  initial={{ opacity:0, scale:0.7, x:10 }}
                  animate={{ opacity:1, scale:1, x:0 }}
                  exit={{ opacity:0, scale:0.7 }}
                  className="flex items-center gap-1.5 mx-2 px-3 py-1.5 rounded-xl text-white text-xs font-black whitespace-nowrap"
                  style={{ background: matched.bg.includes("blue") ? "#2563eb" : matched.bg.includes("teal") ? "#0d9488" : matched.bg.includes("violet") ? "#7c3aed" : "#dc2626" }}
                >
                  {matched.icon} {matched.label}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleSearch}
              className="m-2 text-white font-black px-5 md:px-7 py-3 md:py-3.5 rounded-xl transition-all active:scale-95 text-sm md:text-base shrink-0"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 15px rgba(79,70,229,0.5)" }}
            >
              Fix It →
            </button>
          </div>
          {/* Search hint chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["Printer offline","GPS map update","Slow computer","Virus removal","HP error code","Garmin not working"].map(chip => (
              <button
                key={chip}
                onClick={() => { setQuery(chip); inputRef.current?.focus(); }}
                className="text-xs text-white/50 hover:text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-full transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── 4 BRIGHT CATEGORY CARDS ── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.6, duration:0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat, i) => {
            const AnimComp = ANIMS[cat.anim];
            return (
              <motion.button
                key={cat.id}
                onClick={() => go(cat.href)}
                initial={{ opacity:0, y:24 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                whileHover={{ y:-6, scale:1.04 }}
                whileTap={{ scale:0.96 }}
                className="group relative overflow-hidden rounded-3xl p-5 text-left flex flex-col"
                style={{
                  background: `linear-gradient(135deg,${cat.bg.includes("blue") ? "#2563eb,#1d4ed8" : cat.bg.includes("teal") ? "#0d9488,#059669" : cat.bg.includes("violet") ? "#7c3aed,#6d28d9" : "#dc2626,#b91c1c"})`,
                  boxShadow: `0 8px 32px ${cat.glow}, 0 2px 8px rgba(0,0,0,0.3)`,
                  minHeight: "180px",
                }}
              >
                {/* Shimmer overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0) 100%)" }}
                />
                {/* Corner glow */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: "radial-gradient(circle,white,transparent)" }} />

                {/* Category animation */}
                <div className="flex justify-center">
                  <AnimComp />
                </div>

                {/* Label */}
                <p className="font-black text-white text-xl md:text-2xl mt-2 leading-tight">{cat.label}</p>
                <p className="text-white/60 text-xs mt-1 leading-snug">{cat.sub}</p>

                {/* Arrow */}
                <div className="mt-auto pt-3 flex items-center gap-1 text-white/70 group-hover:text-white text-sm font-semibold transition-colors">
                  <span>Fix it now</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Trust strip */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-white/25 text-sm">
          {["⚡ Avg response < 15 min","🛡️ No fix = no fee","🌎 All 50 US states","⭐ 4.9 Google rating",`📞 ${PHONE}`].map(b => (
            <span key={b} className="font-medium">{b}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2.2, repeat:Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20">
        <span className="text-xs font-medium uppercase tracking-widest">scroll down</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M19 9l-7 7-7-7"/></svg>
      </motion.div>

      {/* shimmer text keyframe */}
      <style>{`@keyframes shimmerText{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
    </section>
  );
}
