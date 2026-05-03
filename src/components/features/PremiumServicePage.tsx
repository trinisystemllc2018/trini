"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "@/lib/utils";
import { CallbackButton } from "@/components/ui/CallbackModal";

/* ═══════════════════════════════════════════════════════════════
   PREMIUM SERVICE PAGE — Interactive Diagnostic Wizard
   Brand selection → Real-time 15-step fix with animations
   Progress tracking, simulated scans, file transfers, live status
═══════════════════════════════════════════════════════════════ */

interface Brand {
  name: string;
  icon: string;
  sub: string;
  color: string;
  models: string[];
  href?: string;
}

interface Step {
  icon: string;
  title: string;
  detail: string;
  duration?: number;       // simulated duration in ms (default 3000)
  type?: "action" | "scan" | "download" | "verify" | "fix" | "check";
}

interface Review { name: string; stars: number; text: string; loc: string; }
interface FAQ { q: string; a: string; }
interface Stat { value: string; label: string; }
interface TrendingTag { label: string; }

export interface PremiumServicePageProps {
  category: "printer" | "gps" | "computer" | "virus";
  badgeText: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  heroGradient: string;
  accentColor: string;
  accentHex: string;
  glowColor: string;
  stats: Stat[];
  trending: TrendingTag[];
  brandSectionTitle: string;
  brandSectionSub: string;
  brands: Brand[];
  stepsSectionTitle: string;
  stepsSectionSub: string;
  steps: Step[];
  stepsCtaLabel?: string;
  stepsCtaHref?: string;
  reviewsTitle: string;
  reviews: Review[];
  faqTitle: string;
  faqs: FAQ[];
  ctaTitle: string;
  ctaSub: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  downloadLabel?: string;
  downloadHref?: string;
}

/* ── Utility sub-components ── */

function AnimCounter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    const isDecimal = target.includes(".");
    let current = 0;
    const increment = num / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { current = num; clearInterval(timer); }
      setVal(isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString());
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{val}</span>;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >{children}</motion.div>
  );
}

function Particles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full"
          style={{ background: color, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

/* ── Animated progress ring ── */
function ProgressRing({ progress, size = 120, stroke = 6, color }: { progress: number; size?: number; stroke?: number; color: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ── Simulated scan lines ── */
function ScanAnimation({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <motion.div
        className="absolute left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ── File transfer dots ── */
function TransferDots({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <div className="flex gap-1.5 items-center">
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ── Live typing text ── */
function TypeWriter({ text, speed = 25, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); onDone?.(); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

/* ── Status messages per step type ── */
function getStatusMessages(type: string, stepTitle: string): string[] {
  switch (type) {
    case "scan": return [
      "Initializing system scan...",
      `Scanning: ${stepTitle}`,
      "Analyzing configuration...",
      "Cross-referencing known fixes...",
      "Scan complete — results ready",
    ];
    case "download": return [
      "Connecting to update server...",
      "Verifying package integrity...",
      "Downloading required files...",
      "Extracting components...",
      "Installation files ready",
    ];
    case "fix": return [
      "Applying fix configuration...",
      `Executing: ${stepTitle}`,
      "Modifying system settings...",
      "Verifying changes...",
      "Fix applied successfully",
    ];
    case "verify": return [
      "Running verification checks...",
      "Testing connection...",
      "Confirming system response...",
      "All checks passed",
    ];
    case "check": return [
      "Checking system status...",
      `Evaluating: ${stepTitle}`,
      "Reading diagnostic data...",
      "Assessment complete",
    ];
    default: return [
      `Processing: ${stepTitle}`,
      "Working...",
      "Almost done...",
      "Step complete",
    ];
  }
}


/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */

export default function PremiumServicePage(props: PremiumServicePageProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [wizardActive, setWizardActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState(0);
  const [stepStatus, setStepStatus] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [wizardDone, setWizardDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [issueResolved, setIssueResolved] = useState<boolean | null>(null);

  const wizardRef = useRef<HTMLDivElement>(null);
  const totalSteps = props.steps.length;
  const overallProgress = wizardDone ? 100 : totalSteps > 0 ? Math.round(((completedSteps.length + (stepProgress / 100)) / totalSteps) * 100) : 0;

  const accent = props.accentColor;
  const accentMap: Record<string, { bg: string; text: string; border: string; bgLight: string; ring: string }> = {
    blue:    { bg: "bg-blue-600",    text: "text-blue-600",    border: "border-blue-200", bgLight: "bg-blue-50",    ring: "ring-blue-400" },
    emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-200", bgLight: "bg-emerald-50", ring: "ring-emerald-400" },
    violet:  { bg: "bg-violet-600",  text: "text-violet-600",  border: "border-violet-200", bgLight: "bg-violet-50",  ring: "ring-violet-400" },
    red:     { bg: "bg-red-600",     text: "text-red-600",     border: "border-red-200", bgLight: "bg-red-50",     ring: "ring-red-400" },
  };
  const a = accentMap[accent] || accentMap.blue;

  /* ── Run a single step with animated progress ── */
  const runStep = useCallback((stepIndex: number) => {
    if (stepIndex >= totalSteps) {
      setWizardDone(true);
      return;
    }
    const step = props.steps[stepIndex];
    const duration = step.duration || 3000 + Math.random() * 2000;
    const type = step.type || (stepIndex % 5 === 0 ? "scan" : stepIndex % 3 === 0 ? "fix" : "action");
    const messages = getStatusMessages(type, step.title);

    setCurrentStep(stepIndex);
    setStepProgress(0);
    setStepStatus(messages[0]);

    // Animate progress from 0 to 100 over duration
    const progressInterval = 50;
    const progressSteps = duration / progressInterval;
    let progress = 0;
    let msgIndex = 0;

    const timer = setInterval(() => {
      progress += 100 / progressSteps;
      if (progress >= 100) progress = 100;
      setStepProgress(Math.min(progress, 100));

      // Update status message at milestones
      const newMsgIndex = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
      if (newMsgIndex > msgIndex) {
        msgIndex = newMsgIndex;
        setStepStatus(messages[msgIndex]);
      }

      if (progress >= 100) {
        clearInterval(timer);
        setCompletedSteps(prev => [...prev, stepIndex]);
        // Brief pause before next step
        setTimeout(() => runStep(stepIndex + 1), 600);
      }
    }, progressInterval);

    // Scroll the active step into view
    setTimeout(() => {
      const el = document.getElementById(`wizard-step-${stepIndex}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  }, [totalSteps, props.steps]);

  const startWizard = () => {
    setWizardActive(true);
    setCurrentStep(-1);
    setCompletedSteps([]);
    setWizardDone(false);
    setIssueResolved(null);
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => runStep(0), 800);
    }, 300);
  };

  const resetWizard = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setWizardActive(false);
    setCurrentStep(-1);
    setStepProgress(0);
    setCompletedSteps([]);
    setWizardDone(false);
    setIssueResolved(null);
  };

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" style={{ background: props.heroGradient }}>
        <Particles color={props.glowColor} />
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 40%, ${props.glowColor}, transparent),
                       radial-gradient(ellipse 60% 60% at 80% 20%, ${props.glowColor}, transparent)`
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
        {[300, 500, 700].map((size, i) => (
          <motion.div key={size} className="absolute rounded-full border pointer-events-none"
            style={{ width: size, height: size, borderColor: `${props.accentHex}12`, left: "50%", top: "50%", marginLeft: -size/2, marginTop: -size/2 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md text-white/80 text-xs font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-8 border border-white/[0.12]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: props.accentHex }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: props.accentHex }} />
            </span>
            {props.badgeText}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="font-black text-white tracking-tight leading-[0.92] mb-6" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            {props.heroTitle}<br />
            <span className="inline-block mt-2" style={{
              background: `linear-gradient(90deg, ${props.accentHex}, ${props.accentHex}aa)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 30px ${props.glowColor})`
            }}>{props.heroHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >{props.heroSub}</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-12"
          >
            {props.stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className="text-center"
              >
                <p className="text-3xl md:text-4xl font-black text-white mb-1 tabular-nums"><AnimCounter target={s.value} /></p>
                <p className="text-[10px] text-white/35 font-bold uppercase tracking-[0.15em]">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <a href="#brands" className="group relative flex items-center justify-center gap-3 bg-white text-gray-900 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl hover:-translate-y-0.5 transition-all">
              Start Free Diagnosis →
            </a>
            <a href={PHONE_HREF} className={`flex items-center justify-center gap-2 ${a.bg} hover:opacity-90 text-white font-bold text-base px-10 py-5 rounded-2xl transition-all border border-white/10`}>
              📞 Call {PHONE}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {props.trending.map(t => (
              <span key={t.label} className="text-xs bg-white/[0.06] text-white/45 border border-white/[0.08] px-3.5 py-1.5 rounded-full font-medium backdrop-blur-sm">
                🔥 {t.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ═══════ INTERACTIVE BRAND SELECTOR + WIZARD ═══════ */}
      <section id="brands" ref={wizardRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`, backgroundSize: "40px 40px"
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

          {/* ── Overall progress bar (visible when wizard is active) ── */}
          <AnimatePresence>
            {wizardActive && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ProgressRing progress={overallProgress} size={56} stroke={4} color={props.accentHex} />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-black" style={{ color: props.accentHex }}>
                        {overallProgress}%
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm">
                        {wizardDone ? "Diagnosis Complete!" : `Step ${currentStep + 1} of ${totalSteps}`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedBrand} {selectedModel ? `· ${selectedModel}` : ""} diagnostic
                      </p>
                    </div>
                  </div>
                  <button onClick={resetWizard} className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">
                    ✕ Reset
                  </button>
                </div>
                {/* Full-width progress bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: props.accentHex }}
                    animate={{ width: `${overallProgress}%` }} transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Brand Selection (Phase 1) ── */}
          <AnimatePresence mode="wait">
            {!wizardActive && (
              <motion.div key="brand-select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                <FadeIn>
                  <div className="text-center mb-12">
                    <span className={`inline-block text-xs font-black uppercase tracking-[0.2em] ${a.text} mb-3`}>Select Your Brand</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">{props.brandSectionTitle}</h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">{props.brandSectionSub}</p>
                  </div>
                </FadeIn>

                {/* Brand cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {props.brands.map((brand, i) => (
                    <FadeIn key={brand.name} delay={i * 0.08}>
                      <motion.button
                        onClick={() => setSelectedBrand(selectedBrand === brand.name ? null : brand.name)}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full text-left p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group
                          ${selectedBrand === brand.name ? "shadow-2xl" : "border-gray-100 hover:border-gray-200 hover:shadow-xl bg-white"}`}
                        style={selectedBrand === brand.name ? { borderColor: brand.color, background: `linear-gradient(135deg, ${brand.color}08, ${brand.color}15)` } : {}}
                      >
                        <div className="relative z-10">
                          <div className="text-5xl mb-4">{brand.icon}</div>
                          <h3 className="font-black text-gray-900 text-2xl md:text-3xl mb-1 tracking-tight">{brand.name}</h3>
                          <p className="text-xs text-gray-400 font-medium mb-4">{brand.sub}</p>
                          <div className="space-y-1.5">
                            {brand.models.slice(0, 3).map(m => (
                              <div key={m} className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: brand.color }} />{m}
                              </div>
                            ))}
                            {brand.models.length > 3 && <p className="text-xs text-gray-300 font-medium">+{brand.models.length - 3} more</p>}
                          </div>
                          <div className="mt-5 flex items-center gap-2" style={{ color: brand.color }}>
                            <span className="text-sm font-bold">Fix now</span>
                            <motion.span animate={selectedBrand === brand.name ? { x: [0, 4, 0] } : {}} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                          </div>
                        </div>
                      </motion.button>
                    </FadeIn>
                  ))}
                </div>

                {/* Model picker + Start button */}
                <AnimatePresence>
                  {selectedBrand && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={`${a.bgLight} rounded-3xl p-6 md:p-8 border-2 ${a.border}`}>
                        <h3 className="font-black text-gray-900 text-xl mb-4">Select your {selectedBrand} model <span className="text-gray-400 font-normal text-sm">(optional)</span></h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {props.brands.find(b => b.name === selectedBrand)?.models.map(model => (
                            <button key={model} onClick={() => setSelectedModel(selectedModel === model ? null : model)}
                              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedModel === model
                                ? `${a.bg} text-white shadow-lg` : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}
                            >{model}</button>
                          ))}
                        </div>
                        <motion.button onClick={startWizard} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className={`w-full ${a.bg} text-white font-black text-lg py-5 rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3`}
                        >
                          <span className="text-2xl">🔍</span>
                          Start {selectedBrand} Diagnostic — Free
                          <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Interactive 15-Step Wizard (Phase 2) ── */}
          <AnimatePresence>
            {wizardActive && (
              <motion.div key="wizard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">{props.stepsSectionTitle}</h2>
                  <p className="text-gray-400">{props.stepsSectionSub}</p>
                </div>

                <div className="space-y-3">
                  {props.steps.map((step, i) => {
                    const isActive = currentStep === i;
                    const isCompleted = completedSteps.includes(i);
                    const isPending = !isActive && !isCompleted;
                    const stepType = step.type || (i % 5 === 0 ? "scan" : i % 3 === 0 ? "fix" : "action");

                    return (
                      <motion.div key={i} id={`wizard-step-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isPending && currentStep > -1 && i > currentStep + 2 ? 0.4 : 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
                          isActive ? `${a.border} shadow-xl bg-white ring-2 ${a.ring}/20` :
                          isCompleted ? "border-green-200 bg-green-50/30" :
                          "border-gray-100 bg-white"
                        }`}
                      >
                        {/* Scan line animation for active step */}
                        <ScanAnimation active={isActive && (stepType === "scan" || stepType === "check")} color={props.accentHex} />

                        <div className="p-5 md:p-6">
                          <div className="flex items-start gap-4">
                            {/* Step indicator */}
                            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-500 ${
                              isActive ? `${a.bg} text-white shadow-lg` :
                              isCompleted ? "bg-green-500 text-white" :
                              "bg-gray-100 text-gray-400"
                            }`}>
                              {isCompleted ? (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>✓</motion.span>
                              ) : (
                                String(i + 1).padStart(2, "0")
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{step.icon}</span>
                                <h3 className={`font-black text-base md:text-lg ${isCompleted ? "text-green-700" : "text-gray-900"}`}>
                                  {step.title}
                                </h3>
                              </div>

                              {/* Active step: show progress + animated content */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                    className="mt-3"
                                  >
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.detail}</p>

                                    {/* Progress bar for this step */}
                                    <div className="bg-gray-100 rounded-full h-2.5 mb-3 overflow-hidden">
                                      <motion.div className="h-full rounded-full" style={{ background: props.accentHex }}
                                        animate={{ width: `${stepProgress}%` }} transition={{ duration: 0.1 }}
                                      />
                                    </div>

                                    {/* Live status */}
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        {(stepType === "download") && <TransferDots active={true} color={props.accentHex} />}
                                        <p className={`text-xs font-medium ${a.text}`}>
                                          <TypeWriter text={stepStatus} speed={15} />
                                        </p>
                                      </div>
                                      <span className="text-xs text-gray-400 font-mono tabular-nums">{Math.round(stepProgress)}%</span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Completed step: green checkmark message */}
                              {isCompleted && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  className="text-green-600 text-xs font-bold mt-1"
                                >✓ Completed successfully</motion.p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Wizard Complete ── */}
                <AnimatePresence>
                  {wizardDone && (
                    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="mt-8"
                    >
                      {issueResolved === null ? (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-10 border-2 border-green-200 text-center">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                            className="text-6xl mb-4"
                          >🎉</motion.div>
                          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">All {totalSteps} Steps Complete!</h3>
                          <p className="text-gray-500 mb-6">Did following these steps fix your {selectedBrand} issue?</p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setIssueResolved(true)}
                              className="bg-green-600 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg"
                            >👍 Yes — It&apos;s fixed!</motion.button>
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setIssueResolved(false)}
                              className="bg-gray-900 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg"
                            >🤔 Still not working</motion.button>
                          </div>
                        </div>
                      ) : issueResolved ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-10 border-2 border-green-200 text-center"
                        >
                          <div className="text-6xl mb-4">✅</div>
                          <h3 className="text-2xl font-black text-green-800 mb-2">Awesome! Glad it&apos;s working!</h3>
                          <p className="text-gray-500 mb-4">Bookmark this page in case you need it again.</p>
                          <button onClick={resetWizard} className="text-sm text-green-600 font-bold hover:underline">Run another diagnostic →</button>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="rounded-3xl p-8 md:p-10 border-2 border-gray-200 text-center" style={{ background: props.heroGradient }}
                        >
                          <div className="text-6xl mb-4">🛠️</div>
                          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Let Our Tech Fix It For You</h3>
                          <p className="text-white/60 mb-6 max-w-lg mx-auto">
                            Some issues need hands-on expertise. Our technician will connect to your screen remotely and fix your {selectedBrand} in under 30 minutes. Free diagnosis — no fix, no fee.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a href={PHONE_HREF}
                              className="flex items-center justify-center gap-2 bg-white text-gray-900 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl"
                            >📞 Call {PHONE} — Free Fix</a>
                            <button onClick={resetWizard} className="text-white/50 text-sm font-bold hover:text-white/70 transition-colors py-3">
                              Try again →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ═══════ REVIEWS ═══════ */}
      <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }} className="text-3xl"
                  >⭐</motion.span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{props.reviewsTitle}</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {props.reviews.map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex text-amber-400 mb-3 text-sm gap-0.5">{"⭐".repeat(r.stars)}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${a.bg} flex items-center justify-center text-white text-xs font-black`}>
                      {r.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.loc}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ FAQ ═══════ */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn><h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12 tracking-tight">{props.faqTitle}</h2></FadeIn>
          <div className="space-y-3">
            {props.faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openFaq === i ? `${a.border} bg-white shadow-md` : "border-gray-100 bg-white"}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                    <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${openFaq === i ? a.bgLight : "bg-gray-50"}`}
                    >
                      <svg className={`w-4 h-4 ${openFaq === i ? a.text : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ BOTTOM CTA ═══════ */}
      <section className="relative py-20 md:py-24 text-white text-center overflow-hidden" style={{ background: props.heroGradient }}>
        <Particles color={props.glowColor} />
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${props.glowColor}, transparent)` }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{props.ctaTitle}</h2>
            <p className="text-white/50 text-lg mb-10">{props.ctaSub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href={props.ctaPrimaryHref} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-white text-gray-900 font-black text-lg px-10 py-5 rounded-2xl shadow-2xl"
              >📞 {props.ctaPrimaryLabel}</motion.a>
              <CallbackButton
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-10 py-5 rounded-2xl transition-all"
              >📞 Request Callback — Free</CallbackButton>
            </div>
            <p className="text-white/25 text-xs mt-6 tracking-wide">No fix = no fee · All 50 US states · Available 24/7</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
