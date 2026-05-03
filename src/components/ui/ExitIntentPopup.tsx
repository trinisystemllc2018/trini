"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DOWNLOAD_URL, PHONE_HREF, PHONE } from "@/lib/utils";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => {
      const handleLeave = (e: MouseEvent) => {
        if (e.clientY <= 5 && !dismissed) {
          setShow(true);
          document.removeEventListener("mouseleave", handleLeave);
        }
      };
      document.addEventListener("mouseleave", handleLeave);
      return () => document.removeEventListener("mouseleave", handleLeave);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center z-[61] p-4"
          >
            <div className="bg-white rounded-4xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Top bar */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center relative">
                <button
                  onClick={dismiss}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <div className="text-4xl mb-3">🎁</div>
                <h2 className="text-2xl font-bold text-white mb-1">Wait — Before You Go!</h2>
                <p className="text-blue-100 text-sm">We have something free for you</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-bold text-gray-900">Download TriniCleaner — Free</p>
                      <p className="text-sm text-gray-600">Speed up your PC in 60 seconds. No subscription, ever.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🖨️</span>
                    <div>
                      <p className="font-bold text-gray-900">Printer Broken? Call Us Free</p>
                      <p className="text-sm text-gray-600">First 5 minutes of diagnosis — completely free.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={DOWNLOAD_URL}
                    onClick={dismiss}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
                  >
                    ⬇ Download TriniCleaner — Free
                  </a>
                  <a
                    href={PHONE_HREF}
                    onClick={dismiss}
                    className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold py-3.5 px-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all"
                  >
                    📞 Call {PHONE}
                  </a>
                  <button
                    onClick={dismiss}
                    className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
                  >
                    No thanks, I'll figure it out myself
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
