"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_HREF, PHONE, DOWNLOAD_URL } from "@/lib/utils";

type Step = { id: string; question: string; options: Option[] };
type Option = { label: string; icon: string; next?: string; result?: Result };
type Result = {
  title: string;
  description: string;
  steps: string[];
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  severity: "low" | "medium" | "high";
};

const RESULTS: Record<string, Result> = {
  printer_offline: {
    title: "Printer Showing Offline — WiFi Fix",
    description: "Your printer is connected but Windows can't communicate with it. This is the #1 most common printer issue and is almost always fixable in under 20 minutes.",
    steps: [
      "Restart your printer and WiFi router",
      "On Windows: Settings → Bluetooth & Devices → Printers",
      "Right-click your printer → See what's printing → Printer menu → Uncheck 'Use Printer Offline'",
      "If still offline, remove the printer and reinstall using 123.hp.com",
    ],
    cta: { label: "📞 Call Us — We Fix This in 15 Min", href: PHONE_HREF },
    ctaSecondary: { label: "Try It Yourself →", href: "/guides" },
    severity: "medium",
  },
  printer_error_code: {
    title: "Printer Error Code Detected",
    description: "Error codes on HP, Canon, Epson and Brother printers are often fixable without replacing any hardware. Our techs specialize in resolving these remotely.",
    steps: [
      "Note down the exact error code shown on your printer display",
      "Turn the printer fully off (not just sleep) and unplug for 60 seconds",
      "Plug back in and power on — many errors clear this way",
      "If the error returns, call us with the exact code for a targeted fix",
    ],
    cta: { label: "📞 Call — Error Code Expert", href: PHONE_HREF },
    severity: "high",
  },
  pc_slow: {
    title: "Slow PC — Free Fix with TriniCleaner",
    description: "A slow Windows PC is almost always caused by junk files, registry errors, or too many startup programs. TriniCleaner removes all of this in one click — completely free.",
    steps: [
      "Download TriniCleaner (free, no subscription ever)",
      "Run a full system scan — takes about 45 seconds",
      "Review the results — average users find 4–8 GB of junk",
      "Click 'Clean Now' and restart your PC",
    ],
    cta: { label: "⬇ Download TriniCleaner Free", href: DOWNLOAD_URL },
    ctaSecondary: { label: "Still slow? Call us →", href: PHONE_HREF },
    severity: "low",
  },
  pc_virus: {
    title: "Virus or Malware Detected",
    description: "Don't panic. Most viruses and malware can be fully removed remotely. Our techs will scan your entire system and eliminate threats without you losing any files.",
    steps: [
      "Do NOT enter any passwords or credit card info on the affected computer",
      "Disconnect from the internet if possible",
      "Call us immediately — virus removal starts same day",
      "We'll run Malwarebytes + a full system scan and remove all threats",
    ],
    cta: { label: "📞 Call Now — Urgent Virus Help", href: PHONE_HREF },
    severity: "high",
  },
  gps_update: {
    title: "Garmin GPS Needs Map Update",
    description: "Garmin map updates can be confusing but we do this every day. We'll update your device remotely or walk you through it step by step.",
    steps: [
      "Connect your Garmin device to your computer via USB",
      "Open Garmin Express (or let us install it for you)",
      "Sign in and check for available map updates",
      "Or call us — we'll update it remotely while you watch",
    ],
    cta: { label: "📞 Get GPS Update Help", href: PHONE_HREF },
    ctaSecondary: { label: "View GPS Guide →", href: "/guides" },
    severity: "low",
  },
  canon_b200: {
    title: "Canon B200 Error — Specialist Help",
    description: "Canon's B200 error appears on PIXMA printers like the MX922 and MG3620. While it signals a print head issue, a large percentage of B200 errors are caused by overheating and ARE fixable without hardware replacement.",
    steps: [
      "Power off the printer completely and unplug it",
      "Wait 15 minutes — allow the print head to cool",
      "Open the printer lid, slide the cartridge to the center, close lid",
      "Plug in and power on while holding the Stop/Reset button",
    ],
    cta: { label: "📞 Canon B200 Specialist", href: PHONE_HREF },
    severity: "high",
  },
  epson_ink: {
    title: "Epson Ink System Error",
    description: "Epson EcoTank printers often show ink errors even with full tanks. This is almost always a sensor calibration issue — not an actual ink problem — and is fixable remotely.",
    steps: [
      "Open Epson printer utility software on your computer",
      "Run 'Head Cleaning' followed by a 'Nozzle Check'",
      "If error persists, we'll run the Epson Adjustment Program remotely",
      "Average fix time: 25 minutes via remote session",
    ],
    cta: { label: "📞 Epson Ink Error Fix", href: PHONE_HREF },
    severity: "medium",
  },
};

const STEPS: Step[] = [
  {
    id: "device",
    question: "What device are you having trouble with?",
    options: [
      { label: "HP Printer",     icon: "🖨️", next: "hp_issue" },
      { label: "Canon Printer",  icon: "🖨️", next: "canon_issue" },
      { label: "Epson Printer",  icon: "🖨️", next: "epson_issue" },
      { label: "Brother Printer",icon: "🖨️", next: "brother_issue" },
      { label: "PC / Laptop",    icon: "💻", next: "pc_issue" },
      { label: "Garmin GPS",     icon: "🗺️", result: RESULTS.gps_update },
    ],
  },
  {
    id: "hp_issue",
    question: "What's the issue with your HP Printer?",
    options: [
      { label: "Printer shows Offline",          icon: "📵", result: RESULTS.printer_offline },
      { label: "Error code on screen",           icon: "❌", result: RESULTS.printer_error_code },
      { label: "Not printing / queue stuck",     icon: "🔄", result: RESULTS.printer_offline },
      { label: "Won't connect to WiFi",          icon: "📶", result: RESULTS.printer_offline },
    ],
  },
  {
    id: "canon_issue",
    question: "What's the issue with your Canon Printer?",
    options: [
      { label: "Error B200",            icon: "🔴", result: RESULTS.canon_b200 },
      { label: "Error E03 / E04",       icon: "❌", result: RESULTS.printer_error_code },
      { label: "Not printing at all",   icon: "🔇", result: RESULTS.printer_offline },
      { label: "WiFi / wireless issue", icon: "📶", result: RESULTS.printer_offline },
    ],
  },
  {
    id: "epson_issue",
    question: "What's the issue with your Epson Printer?",
    options: [
      { label: "Ink error (tanks are full)", icon: "💧", result: RESULTS.epson_ink },
      { label: "Won't print at all",         icon: "🔇", result: RESULTS.printer_offline },
      { label: "WiFi / network problem",     icon: "📶", result: RESULTS.printer_offline },
      { label: "Error code showing",         icon: "❌", result: RESULTS.printer_error_code },
    ],
  },
  {
    id: "brother_issue",
    question: "What's the issue with your Brother Printer?",
    options: [
      { label: "Driver unavailable (Win 11)", icon: "⚠️", result: RESULTS.printer_error_code },
      { label: "AirPrint not working",        icon: "📱", result: RESULTS.printer_offline },
      { label: "Toner / drum error",          icon: "🖤", result: RESULTS.printer_error_code },
      { label: "Won't connect to WiFi",       icon: "📶", result: RESULTS.printer_offline },
    ],
  },
  {
    id: "pc_issue",
    question: "What's happening with your PC or Laptop?",
    options: [
      { label: "Running very slow",     icon: "🐌", result: RESULTS.pc_slow },
      { label: "Virus / malware",       icon: "🦠", result: RESULTS.pc_virus },
      { label: "Windows 11 problems",   icon: "🪟", result: RESULTS.pc_slow },
      { label: "Won't start up",        icon: "⚡", result: RESULTS.pc_virus },
    ],
  },
];

const stepMap = Object.fromEntries(STEPS.map(s => [s.id, s]));

const severityColors = {
  low:    { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  medium: { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-700" },
  high:   { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700",     badge: "bg-red-100 text-red-700" },
};

export function SmartProblemFinder() {
  const [currentStepId, setCurrentStepId] = useState("device");
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const currentStep = stepMap[currentStepId];

  const choose = (opt: Option) => {
    if (opt.result) {
      setResult(opt.result);
    } else if (opt.next) {
      setHistory(h => [...h, currentStepId]);
      setCurrentStepId(opt.next);
    }
  };

  const back = () => {
    if (result) { setResult(null); return; }
    const prev = history[history.length - 1];
    if (prev) {
      setHistory(h => h.slice(0, -1));
      setCurrentStepId(prev);
    }
  };

  const reset = () => {
    setCurrentStepId("device");
    setResult(null);
    setHistory([]);
  };

  const colors = result ? severityColors[result.severity] : null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-sky-50/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-blue-200">
            🧠 Smart Diagnosis Tool
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            What&apos;s the Problem?
            <span className="block text-gradient">We&apos;ll Find the Fix.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Answer 2 quick questions and get an instant solution guide — or connect directly to a technician.
          </p>
        </motion.div>

        {/* Wizard Card */}
        <div className="bg-white rounded-4xl shadow-soft-xl border border-gray-100 overflow-hidden">
          {/* Progress */}
          <div className="h-1.5 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
              animate={{ width: result ? "100%" : `${(history.length / 2) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key={currentStepId}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                >
                  {/* Question */}
                  <div className="text-center mb-8">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">
                      Step {history.length + 1}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      {currentStep?.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep?.options.map(opt => (
                      <motion.button
                        key={opt.label}
                        onClick={() => choose(opt)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left group"
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-base">
                          {opt.label}
                        </span>
                        <svg className="ml-auto w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      </motion.button>
                    ))}
                  </div>

                  {/* Back / Reset */}
                  {history.length > 0 && (
                    <div className="mt-6 flex justify-center">
                      <button onClick={back} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                        Back
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Result */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Severity badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${colors!.badge}`}>
                      {result.severity === "high" ? "🔴 Urgent" : result.severity === "medium" ? "🟡 Moderate" : "🟢 Easy Fix"}
                    </span>
                    <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      Start over
                    </button>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">{result.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{result.description}</p>

                  {/* Steps */}
                  <div className={`rounded-2xl p-5 ${colors!.bg} border ${colors!.border} mb-6`}>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Try These Steps First</p>
                    <ol className="space-y-3">
                      {result.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${colors!.badge}`}>
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={result.cta.href}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-brand"
                    >
                      {result.cta.label}
                    </a>
                    {result.ctaSecondary && (
                      <a
                        href={result.ctaSecondary.href}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all"
                      >
                        {result.ctaSecondary.label}
                      </a>
                    )}
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    Or call us directly: <a href={PHONE_HREF} className="text-blue-600 font-semibold hover:underline">{PHONE}</a> — available 24/7
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
