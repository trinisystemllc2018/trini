"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { REVIEWS, STATS } from "@/lib/utils";

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < stars ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % REVIEWS.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-amber-200">
            ⭐ Real Customer Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            Real People. Real Results.
          </h2>
          <p className="text-gray-500 text-lg">Over 5,000 satisfied customers across all 50 states</p>
        </motion.div>

        {/* Featured Review */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-4xl bg-white shadow-soft-xl border border-gray-100 p-8 md:p-12 min-h-[280px] mb-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-black shadow-brand">
                      {REVIEWS[active].name.split(" ").map(n => n[0]).join("")}
                    </div>
                  </div>
                  <div className="flex-1">
                    <StarRating stars={REVIEWS[active].stars} />
                    <blockquote className="text-xl md:text-2xl font-semibold text-gray-800 mt-3 mb-5 leading-relaxed">
                      &ldquo;{REVIEWS[active].text}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-bold text-gray-900">{REVIEWS[active].name}</p>
                        <p className="text-sm text-gray-500">{REVIEWS[active].location}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">
                          📱 {REVIEWS[active].device}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true); }}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-8 h-2.5 bg-blue-600" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 cursor-default"
            >
              <StarRating stars={r.stars} />
              <p className="text-sm text-gray-600 mt-3 mb-4 leading-relaxed line-clamp-3">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-black">
                  {r.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Animated Stats ─── */
function AnimatedStat({ value, suffix, label, icon, isDecimal }: {
  value: number; suffix: string; label: string; icon: string; isDecimal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const inc = value / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, value);
      setDisplay(isDecimal ? Math.round(cur * 10) / 10 : Math.floor(cur));
      if (cur >= value) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [inView, value, isDecimal]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 text-center transition-shadow hover:shadow-soft-lg"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-1">
        {isDecimal ? display.toFixed(1) : display.toLocaleString()}
        <span className="text-blue-600">{suffix}</span>
      </div>
      <p className="text-gray-500 font-medium">{label}</p>
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
      {/* BG pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Why 5,000+ Americans Trust Us
          </h2>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Faster than Best Buy. Cheaper than Geek Squad. More personal than automated chatbots.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((s, i) => (
            <AnimatedStat key={s.label} {...s} icon={["🔧","⏰","🌎","⭐"][i]} />
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🛡️", title: "No Fix, No Fee", desc: "If we can't fix it, you don't pay. Simple as that." },
            { icon: "⚡", title: "Under 15 Min Response", desc: "A real technician picks up — not an automated bot." },
            { icon: "🔒", title: "Secure Remote Access", desc: "You watch everything we do on your screen in real time." },
          ].map(t => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center"
            >
              <div className="text-4xl mb-3">{t.icon}</div>
              <h3 className="font-bold text-white text-lg mb-2">{t.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
