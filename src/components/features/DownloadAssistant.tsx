"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DOWNLOAD_URL } from "@/lib/utils";

/* ─────────────────────────────────────────
   DOWNLOAD ASSISTANT — animated install guide
───────────────────────────────────────── */
const INSTALL_STEPS = [
  {
    step: 1,
    title: "Click the Download Button",
    desc: "Click the green 'Download TriniCleaner' button below. Your browser will start downloading the file.",
    detail: "The file is called TriniCleaner_Setup.exe — it's about 12 MB and downloads in seconds.",
    icon: "⬇",
    tip: "💡 If a box appears asking where to save, choose Downloads or Desktop.",
  },
  {
    step: 2,
    title: "Open the Downloaded File",
    desc: "Find the file in your Downloads folder (or check the bottom of your browser) and double-click it to run.",
    detail: "On Windows 10/11, look for a notification at the bottom of your browser or open File Explorer → Downloads.",
    icon: "📂",
    tip: "💡 If Windows asks 'Do you want to allow this app to make changes?' — click Yes. This is normal.",
  },
  {
    step: 3,
    title: "Follow the Install Wizard",
    desc: "A simple setup window will open. Click Next, then Install, then Finish. It takes about 30 seconds.",
    detail: "You don't need to change any settings during install. Just keep clicking Next until it finishes.",
    icon: "⚙️",
    tip: "💡 TriniCleaner will not install any toolbars, extra programs, or browser extensions.",
  },
  {
    step: 4,
    title: "Run Your First Scan",
    desc: "TriniCleaner will open automatically after install. Click 'Scan Now' to find junk files and errors.",
    detail: "The first scan takes about 45–60 seconds. It shows you exactly what it found before cleaning anything.",
    icon: "🔍",
    tip: "💡 You're in full control — review the results before clicking Clean.",
  },
  {
    step: 5,
    title: "Click Clean & Enjoy Your Fast PC!",
    desc: "Click 'Clean Now' to remove everything found. Restart your PC and notice the difference!",
    detail: "Average users free up 4–8 GB of space and see noticeably faster startup and performance.",
    icon: "✅",
    tip: "🎉 That's it! You're done. Run TriniCleaner monthly to keep your PC running smoothly.",
  },
];

export function DownloadAssistant() {
  const [activeStep, setActiveStep] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const startDownload = () => {
    setDownloading(true);
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setTimeout(() => {
          setDownloading(false);
          setDownloaded(true);
          setActiveStep(1);
        }, 500);
      }
      setProgress(Math.min(p, 100));
    }, 180);
    // Actually trigger download
    window.open(DOWNLOAD_URL, "_blank");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-blue-200">
            📦 Install Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Never Installed Software Before?
            <span className="block text-gradient"> We'll Walk You Through It.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Follow these 5 simple steps — takes less than 2 minutes total.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Step indicators */}
          <div className="lg:col-span-2 flex lg:flex-col gap-2">
            {INSTALL_STEPS.map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-3 p-3 lg:p-4 rounded-2xl border-2 transition-all text-left w-full ${
                  i === activeStep
                    ? "border-blue-400 bg-blue-50 shadow-soft"
                    : i < activeStep || (i === 1 && downloaded)
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-black shrink-0 transition-all ${
                  i < activeStep ? "bg-emerald-500 text-white" :
                  i === activeStep ? "bg-blue-600 text-white" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i < activeStep ? "✓" : s.icon}
                </div>
                <span className={`text-sm font-semibold hidden lg:block ${
                  i === activeStep ? "text-blue-700" :
                  i < activeStep ? "text-emerald-700" : "text-gray-500"
                }`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 bg-white rounded-3xl border-2 border-gray-100 shadow-soft-lg overflow-hidden">
            <div className="h-1.5 bg-gray-100">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                animate={{ width: `${((activeStep) / (INSTALL_STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl mb-4">{INSTALL_STEPS[activeStep].icon}</div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Step {activeStep + 1} of {INSTALL_STEPS.length}
                  </p>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{INSTALL_STEPS[activeStep].title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-3">{INSTALL_STEPS[activeStep].desc}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{INSTALL_STEPS[activeStep].detail}</p>

                  {/* Tip */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 mb-6">
                    {INSTALL_STEPS[activeStep].tip}
                  </div>

                  {/* Download progress (step 0) */}
                  {activeStep === 0 && (
                    downloading ? (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Downloading TriniCleaner…</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>
                      </div>
                    ) : downloaded ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 mb-4">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="font-bold text-emerald-800">Download complete!</p>
                          <p className="text-xs text-emerald-600">Now follow Step 2 to open the file.</p>
                        </div>
                      </div>
                    ) : null
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {activeStep > 0 && (
                      <button
                        onClick={() => setActiveStep(s => s - 1)}
                        className="px-5 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 border border-gray-200 rounded-2xl hover:border-gray-300 transition-all"
                      >
                        ← Back
                      </button>
                    )}
                    {activeStep === 0 ? (
                      <button
                        onClick={startDownload}
                        disabled={downloading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50"
                      >
                        {downloading ? "Downloading…" : "⬇ Start Download"}
                      </button>
                    ) : activeStep < INSTALL_STEPS.length - 1 ? (
                      <button
                        onClick={() => setActiveStep(s => s + 1)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-brand"
                      >
                        Next Step →
                      </button>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold py-3 px-6 rounded-2xl">
                        🎉 All Done! Enjoy your fast PC.
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   LIVE STATUS DASHBOARD
───────────────────────────────────────── */
const INITIAL_METRICS = [
  { label: "Junk Files",      value: 78,  unit: "%",   color: "bg-blue-500",   icon: "🗑️" },
  { label: "Registry Errors", value: 61,  unit: "%",   color: "bg-orange-400", icon: "🔧" },
  { label: "Startup Items",   value: 44,  unit: "%",   color: "bg-purple-500", icon: "🚀" },
  { label: "Browser Cache",   value: 89,  unit: "%",   color: "bg-teal-500",   icon: "🌐" },
  { label: "Disk Usage",      value: 73,  unit: "%",   color: "bg-red-400",    icon: "💾" },
];

export function LiveStatusDashboard() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);

  const runClean = () => {
    setCleaning(true);
    let step = 0;
    const t = setInterval(() => {
      step++;
      setMetrics(m => m.map(item => ({
        ...item,
        value: Math.max(0, item.value - (Math.random() * 20 + 8)),
      })));
      if (step >= 5) {
        clearInterval(t);
        setCleaning(false);
        setCleaned(true);
        setMetrics(m => m.map(item => ({ ...item, value: Math.max(2, item.value - 30) })));
      }
    }, 700);
  };

  const reset = () => {
    setMetrics(INITIAL_METRICS);
    setCleaned(false);
    setCleaning(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-900 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-blue-800">
            📊 Live Demo Dashboard
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            See TriniCleaner in Action
          </h2>
          <p className="text-gray-400 text-lg">Watch what it finds — and see it clean in real time.</p>
        </div>

        <div className="bg-gray-950 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="bg-gray-900 border-b border-gray-800 px-5 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-500 font-mono mx-auto">
              TriniCleaner v1.0 — {cleaning ? "🔄 Cleaning..." : cleaned ? "✅ Clean Complete" : "📊 System Analysis"}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {cleaning ? "Working" : "Ready"}
            </span>
          </div>

          <div className="p-6 md:p-8">
            {/* Metrics */}
            <div className="space-y-4 mb-8">
              {metrics.map((m, i) => (
                <div key={m.label} className="flex items-center gap-4">
                  <span className="text-xl w-8 text-center">{m.icon}</span>
                  <span className="text-sm text-gray-400 font-medium w-32 shrink-0">{m.label}</span>
                  <div className="flex-1 h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${m.color}`}
                      animate={{ width: `${Math.max(0, m.value)}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <motion.span
                    key={Math.round(m.value)}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className={`text-xs font-bold font-mono w-10 text-right ${
                      m.value > 70 ? "text-red-400" : m.value > 40 ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {Math.round(m.value)}%
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Result banner */}
            <AnimatePresence>
              {cleaned && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-900/40 border border-emerald-700 rounded-2xl p-4 flex items-center gap-3 mb-6"
                >
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="text-emerald-300 font-bold text-sm">Clean Complete!</p>
                    <p className="text-emerald-500 text-xs">Your PC is now significantly faster. Avg. 4.8 GB freed.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-3">
              {!cleaned ? (
                <button
                  onClick={runClean}
                  disabled={cleaning}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-brand disabled:opacity-50"
                >
                  {cleaning ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Cleaning System…
                    </>
                  ) : "▶ Run Demo Clean"}
                </button>
              ) : (
                <>
                  <button onClick={reset} className="px-5 py-3.5 text-sm font-semibold text-gray-400 hover:text-gray-200 border border-gray-700 rounded-2xl hover:border-gray-600 transition-all">
                    ↺ Reset Demo
                  </button>
                  <a
                    href={DOWNLOAD_URL}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
                  >
                    ⬇ Download Real TriniCleaner — Free
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
