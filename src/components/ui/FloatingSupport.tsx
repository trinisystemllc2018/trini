"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_HREF, PHONE } from "@/lib/utils";
import { CallbackButton } from "@/components/ui/CallbackModal";

export function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 p-5 w-72"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                  TS
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Trini System Support</p>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Online — responding fast
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              👋 Hi! Need help with your printer, PC, or want to download TriniCleaner?
            </p>

            <div className="space-y-2">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors group"
              >
                <span className="text-xl">📞</span>
                <div>
                  <p className="text-sm font-semibold text-blue-700">Call Now</p>
                  <p className="text-xs text-blue-500">{PHONE} — 24/7</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>

              <CallbackButton
                className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group w-full text-left"
              >
                <span className="text-xl">📞</span>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Request Callback</p>
                  <p className="text-xs text-gray-500">We call you in under 5 min</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </CallbackButton>

              <a
                href="/products"
                className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors group"
              >
                <span className="text-xl">⚡</span>
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Free PC Cleaner</p>
                  <p className="text-xs text-emerald-500">Download TriniCleaner free</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-soft-xl flex items-center justify-center border-4 border-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Open support chat"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />

        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></motion.svg>
          ) : (
            <motion.span key="chat" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }} className="text-2xl">💬</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
