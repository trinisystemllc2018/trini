"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_HREF } from "@/lib/utils";

type SimStep = {
  id: number;
  title: string;
  instruction: string;
  tip: string;
  visual: React.ReactNode;
};

function PrinterVisual({ state }: { state: "box" | "unbox" | "power" | "wifi" | "install" | "test" | "done" }) {
  return (
    <div className="relative w-full flex items-center justify-center h-48">
      {/* Printer body */}
      <div className="relative">
        <div className={`w-52 h-28 rounded-2xl border-2 transition-all duration-700 ${
          state === "box" ? "bg-amber-50 border-amber-200" :
          state === "done" ? "bg-blue-50 border-blue-300 shadow-glow" :
          "bg-gray-100 border-gray-300"
        } flex flex-col items-center justify-center shadow-soft`}>
          {state === "box" && <span className="text-4xl">📦</span>}
          {state !== "box" && (
            <>
              <div className={`w-40 h-4 rounded-full mx-auto mt-2 mb-3 transition-colors duration-500 ${
                state === "power" || state === "wifi" || state === "install" || state === "test" || state === "done"
                  ? "bg-blue-200" : "bg-gray-200"
              }`} />
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  state === "power" ? "bg-amber-400 animate-pulse" :
                  state === "wifi" || state === "install" || state === "test" || state === "done" ? "bg-blue-400" :
                  "bg-gray-300"
                }`} />
                <span className="text-2xl">🖨️</span>
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  state === "wifi" ? "bg-emerald-400 animate-pulse" :
                  state === "install" || state === "test" || state === "done" ? "bg-emerald-400" : "bg-gray-300"
                }`} />
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-3" />
            </>
          )}
        </div>

        {/* WiFi signals */}
        {(state === "wifi" || state === "install" || state === "test" || state === "done") && (
          <div className="absolute -top-8 -right-4 flex flex-col items-center gap-0.5">
            {[12, 18, 24].map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                style={{ width: s, height: s }}
                className="border-t-2 border-r-2 border-blue-400 rounded-tr-full"
              />
            ))}
          </div>
        )}

        {/* Print coming out */}
        {(state === "test" || state === "done") && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 h-8 bg-white border border-gray-200 rounded-b-lg shadow-sm flex items-center justify-center"
          >
            <div className="text-xs text-gray-400 font-mono">▐▌▐▌ Test Page</div>
          </motion.div>
        )}

        {/* Done checkmark */}
        {state === "done" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
          </motion.div>
        )}
      </div>

      {/* PC / laptop connection */}
      {(state === "install" || state === "test" || state === "done") && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <span className="text-4xl">💻</span>
          <motion.div
            animate={{ x: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 -left-8 -translate-y-1/2 text-blue-400 text-sm font-bold"
          >
            ···
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

const SIM_STEPS: SimStep[] = [
  {
    id: 0,
    title: "Unbox Your Printer",
    instruction: "Remove the printer from the box. Take out all orange tape and protective foam — check inside the paper tray too. Remove the plastic from ink cartridges.",
    tip: "📦 Keep the box for 30 days in case you need to return it.",
    visual: <PrinterVisual state="unbox" />,
  },
  {
    id: 1,
    title: "Power On",
    instruction: "Connect the power cord to the printer and plug into the wall. Press the Power button and wait for the printer to fully boot up (about 30 seconds).",
    tip: "⚡ The power light will blink orange, then turn blue when ready.",
    visual: <PrinterVisual state="power" />,
  },
  {
    id: 2,
    title: "Connect to WiFi",
    instruction: "On the printer's touchscreen, tap Wireless Setup Wizard. Select your home WiFi network from the list and type your WiFi password carefully.",
    tip: "📶 Make sure you're using your WiFi password — not your internet account password.",
    visual: <PrinterVisual state="wifi" />,
  },
  {
    id: 3,
    title: "Install Drivers on PC",
    instruction: "On your Windows computer, go to 123.hp.com (for HP) or your brand's website. Download and run the full software package. Follow the on-screen prompts.",
    tip: "💡 If you can't find the right driver, call us — we'll install it remotely in 10 minutes.",
    visual: <PrinterVisual state="install" />,
  },
  {
    id: 4,
    title: "Print a Test Page",
    instruction: "Open Notepad on your PC, type a few words, then click File → Print. Select your printer from the list and click Print.",
    tip: "✅ If it prints, you're all done! If not, call us — we'll fix it right now.",
    visual: <PrinterVisual state="test" />,
  },
  {
    id: 5,
    title: "🎉 Setup Complete!",
    instruction: "Your printer is installed and connected. You can now print wirelessly from any device on your home network — including phones and tablets.",
    tip: "📱 To print from your phone, download the HP Smart, Canon PRINT, or Epson iPrint app.",
    visual: <PrinterVisual state="done" />,
  },
];

export function PrinterSimulator() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    if (step >= SIM_STEPS.length - 1) { setAutoPlay(false); return; }
    const t = setTimeout(() => setStep(s => s + 1), 3500);
    return () => clearTimeout(t);
  }, [autoPlay, step]);

  const current = SIM_STEPS[step];
  const isLast = step === SIM_STEPS.length - 1;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-purple-200">
            🖨️ Interactive Simulator
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Printer Setup
            <span className="text-gradient"> Step by Step</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            See exactly how printer setup works before you start. Works for HP, Canon, Epson and Brother.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Step list */}
          <div className="lg:col-span-2 space-y-2">
            {SIM_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setStep(i); setAutoPlay(false); }}
                className={`w-full text-left flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
                  i === step
                    ? "border-blue-400 bg-blue-50 shadow-soft"
                    : i < step
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                  i < step ? "bg-emerald-500 text-white" :
                  i === step ? "bg-blue-600 text-white" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-semibold ${i === step ? "text-blue-700" : i < step ? "text-emerald-700" : "text-gray-600"}`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Main panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-soft-lg overflow-hidden h-full">
              {/* Progress */}
              <div className="h-1.5 bg-gray-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                  animate={{ width: `${((step) / (SIM_STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Visual */}
                    <div className="mb-6 bg-gray-50 rounded-2xl p-4">
                      {current.visual}
                    </div>

                    {/* Text */}
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Step {step + 1}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-3">{current.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-base">{current.instruction}</p>

                    {/* Tip */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 mb-6">
                      {current.tip}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                      {step > 0 && (
                        <button
                          onClick={() => { setStep(s => s - 1); setAutoPlay(false); }}
                          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-semibold text-sm transition-colors px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300"
                        >
                          ← Previous
                        </button>
                      )}

                      {!isLast ? (
                        <button
                          onClick={() => { setStep(s => s + 1); setAutoPlay(false); }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-brand"
                        >
                          Next Step →
                        </button>
                      ) : (
                        <a
                          href={PHONE_HREF}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
                        >
                          📞 Need Help? Call Us Now
                        </a>
                      )}

                      {!isLast && (
                        <button
                          onClick={() => setAutoPlay(a => !a)}
                          className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                            autoPlay ? "border-blue-300 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {autoPlay ? "⏸ Pause" : "▶ Auto"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
