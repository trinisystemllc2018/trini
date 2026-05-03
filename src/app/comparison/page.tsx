import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Trini System vs Geek Squad — Compare 2026",
  description: "Compare Trini System vs Geek Squad: price, wait time, remote vs in-store. Remote tech support from $49 — no appointment needed. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/comparison" },
  keywords: [
    "trini system vs geek squad","geek squad alternative","cheap tech support","geek squad price comparison",
    "remote tech support vs geek squad","best tech support company","geek squad review alternative",
    "computer repair alternatives to geek squad","printer repair near me cheap",
  ],
};

const PHONE_HREF = "tel:+13479531531";
const PHONE = "347-953-1531";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Comparison", "item": "https://trinisystem.vercel.app/comparison" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Trini System cheaper than Geek Squad?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trini System's remote tech support starts at $49 vs. Geek Squad's $149+ for in-store service. For printer repair, Geek Squad often charges $149–$299 and may not even fix the issue. Trini System fixes most printer problems remotely for $49–$99 with a no fix = no fee guarantee." }
      },
      {
        "@type": "Question",
        "name": "How is Trini System different from Geek Squad?",
        "acceptedAnswer": { "@type": "Answer", "text": "Trini System is remote-first — you never leave your home. A dedicated technician (not a rotating store employee) fixes your issue while you watch via screen share. Available 24/7. No appointment needed. Response in under 15 minutes. Geek Squad requires you to visit a store, charges more, and has 3–7 day wait times for most services." }
      },
    ],
  },
];

const COMPARISON_ROWS = [
  { feature: "Starting Price", trini: "From $49", geek: "$149+", triniWins: true },
  { feature: "Wait Time", trini: "Under 15 minutes", geek: "3–7 days", triniWins: true },
  { feature: "Leave Your Home", trini: "Never — 100% remote", geek: "Yes, required", triniWins: true },
  { feature: "Available Hours", trini: "24/7 including weekends", geek: "Store hours only", triniWins: true },
  { feature: "Dedicated Technician", trini: "Yes — same tech every time", geek: "Whoever is on shift", triniWins: true },
  { feature: "Free Tools Included", trini: "Yes — TriniCleaner free", geek: "None", triniWins: true },
  { feature: "Printer Repair", trini: "HP, Canon, Epson, Brother", geek: "Limited brands", triniWins: true },
  { feature: "No Fix = No Fee", trini: "Always guaranteed", geek: "Not offered", triniWins: true },
  { feature: "Spanish Support", trini: "Yes — native speaker", geek: "No", triniWins: true },
  { feature: "Senior-Friendly", trini: "Specialty — extra patience", geek: "Standard service", triniWins: true },
  { feature: "GPS Updates", trini: "Yes — Garmin all models", geek: "Limited", triniWins: true },
  { feature: "Physical Repair Shop", trini: "Remote only", geek: "Yes (stores)", triniWins: false },
];

const SERVICES_COMPARE = [
  {
    service: "HP Printer Offline Fix",
    triniPrice: "$49", triniTime: "15 min",
    geekPrice: "$149", geekTime: "Drop off + 3 days",
  },
  {
    service: "Virus & Malware Removal",
    triniPrice: "$59–$89", triniTime: "45–90 min",
    geekPrice: "$199", geekTime: "In-store, 1–3 days",
  },
  {
    service: "PC Speed Optimization",
    triniPrice: "FREE (TriniCleaner)", triniTime: "5 min self-service",
    geekPrice: "$99–$149", geekTime: "In-store",
  },
  {
    service: "Garmin GPS Map Update",
    triniPrice: "$49", triniTime: "30–60 min",
    geekPrice: "Not offered", geekTime: "N/A",
  },
  {
    service: "Canon B200 Error Fix",
    triniPrice: "$49–$79", triniTime: "30 min",
    geekPrice: "$149+ or 'buy a new one'", geekTime: "3–7 days",
  },
  {
    service: "Windows 11 Driver Fix",
    triniPrice: "$49", triniTime: "20 min",
    geekPrice: "$149", geekTime: "In-store",
  },
];

export default function ComparisonPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="bg-blue-700 text-white py-3 text-center text-sm font-semibold">
        💰 50% Less Than Geek Squad · No Appointment · 24/7 Remote ·{" "}
        <a href={PHONE_HREF} className="underline font-bold">Call {PHONE}</a>
      </div>

      {/* Hero */}
      <section className="pt-14 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
            📊 Honest Comparison
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Trini System LLC
            <span className="block text-blue-600">vs. Geek Squad</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Same-day remote service at half the price — without leaving your home. Here&apos;s exactly how we compare.
          </p>
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all">
            📞 {PHONE} — Try Us Free First
          </a>
        </div>
      </section>

      {/* Main comparison table */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Feature-by-Feature Comparison</h2>
          <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
              <div className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Feature</div>
              <div className="p-5 text-center">
                <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                  TS Trini System
                </div>
              </div>
              <div className="p-5 text-center">
                <span className="text-sm font-semibold text-gray-400">Geek Squad</span>
              </div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={row.feature}
                className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                <div className="p-4 text-sm font-semibold text-gray-700 flex items-center">{row.feature}</div>
                <div className="p-4 flex items-center justify-center">
                  <span className={`text-sm font-bold px-3 py-1.5 rounded-xl border text-center ${row.triniWins ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-gray-600 bg-gray-50 border-gray-100"}`}>
                    {row.triniWins ? "✓ " : ""}{row.trini}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-center">
                  <span className="text-sm text-gray-400 text-center">{row.geek}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price comparison by service */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Price Comparison by Service</h2>
            <p className="text-gray-500 text-lg">Real prices. Real wait times. No upsells.</p>
          </div>
          <div className="space-y-3">
            {SERVICES_COMPARE.map(s => (
              <div key={s.service} className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-5 flex items-center">
                    <p className="font-black text-gray-900">{s.service}</p>
                  </div>
                  <div className="p-5 bg-blue-50/50">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Trini System</p>
                    <p className="font-black text-emerald-700 text-lg">{s.triniPrice}</p>
                    <p className="text-xs text-gray-500">⏱ {s.triniTime}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Geek Squad</p>
                    <p className="font-bold text-gray-500 text-lg">{s.geekPrice}</p>
                    <p className="text-xs text-gray-400">⏱ {s.geekTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all">
              📞 Call {PHONE} — Get the Better Deal
            </a>
            <p className="text-gray-500 text-sm mt-4">No fix = no fee · Remote · All 50 states · Est. 2016</p>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
