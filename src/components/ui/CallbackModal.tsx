"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   CALLBACK MODAL — Replaces all Discord links
   User clicks "Request Callback" → modal asks Name + Phone
   → sends to /api/callback → Discord webhook notification
═══════════════════════════════════════════════════════════ */

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setTimeout(() => { onClose(); setStatus("idle"); setName(""); setPhone(""); }, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-5 text-white">
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/30 transition-colors">
                ✕
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">📞</div>
                <div>
                  <h3 className="font-black text-lg">Request a Callback</h3>
                  <p className="text-emerald-100 text-sm">We call you back in under 5 minutes</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                      className="text-6xl mb-4"
                    >✅</motion.div>
                    <h4 className="font-black text-xl text-gray-900 mb-2">We&apos;ll call you right back!</h4>
                    <p className="text-gray-500 text-sm">A technician will call <strong>{name}</strong> at <strong>{phone}</strong> within 5 minutes.</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Trust badges */}
                    <div className="flex items-center gap-4 mb-5 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><span className="text-green-500">●</span> Techs available now</span>
                      <span className="flex items-center gap-1">⭐ 4.9 rating</span>
                      <span className="flex items-center gap-1">🔒 No spam ever</span>
                    </div>

                    {/* Name input */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John"
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-300"
                        autoFocus
                      />
                    </div>

                    {/* Phone input */}
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(347) 953-1531"
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-300"
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!name.trim() || !phone.trim() || status === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
                        !name.trim() || !phone.trim()
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                      }`}
                    >
                      {status === "sending" ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⏳</motion.span>
                          Sending...
                        </>
                      ) : (
                        <>📞 Call Me Back — Free</>
                      )}
                    </motion.button>

                    {/* Error */}
                    {status === "error" && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-red-500 text-sm text-center mt-3 font-medium"
                      >Something went wrong. Please call us directly at 347-953-1531.</motion.p>
                    )}

                    {/* Fine print */}
                    <p className="text-xs text-gray-300 text-center mt-4">
                      No fix = no fee · Average response under 5 min · Available 24/7
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Callback Button — drop-in replacement for Discord links ── */
export function CallbackButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children || "📞 Request Callback — Free"}
      </button>
      <CallbackModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
