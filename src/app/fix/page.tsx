import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fix My Printer — Free Diagnostic Tool",
  description: "Free interactive printer diagnostic — HP, Canon, Epson, Brother. Get an instant fix or call 347-953-1531 for remote tech support from $49.",
  alternates: { canonical: "https://trinisystem.vercel.app/fix" },
  keywords: [
    "fix printer online","hp printer offline fix","canon printer error b200","epson printer not printing",
    "brother printer driver windows 11","printer repair near me","remote printer repair","hp deskjet offline",
    "epson ecotank ink error","canon pixma not printing","printer won't connect wifi","printer repair service",
    "fix hp printer","printer offline windows 11","hp printer 0x6100004a error","free printer diagnosis",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Fix My Printer", item: "https://trinisystem.vercel.app/fix" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I fix my HP printer showing offline?",
        acceptedAnswer: { "@type": "Answer", text: "Restart your printer and WiFi router. On Windows: Settings → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'. If still offline after that, visit 123.hp.com to reinstall the driver. Trini System fixes HP offline errors remotely in 15 minutes — call 347-953-1531." } },
      { "@type": "Question", name: "What is Canon B200 error and how do I fix it?",
        acceptedAnswer: { "@type": "Answer", text: "The Canon B200 error indicates a print head issue, but 80% of B200 errors are caused by overheating — not broken hardware. The fix: power off and unplug for 15 minutes, manually center the cartridge carrier, hold Stop/Reset while pressing Power. Trini System resolves B200 errors remotely — call 347-953-1531." } },
      { "@type": "Question", name: "Why does my Epson EcoTank show an ink error when tanks are full?",
        acceptedAnswer: { "@type": "Answer", text: "Epson EcoTank ink errors on full tanks are almost always a sensor calibration issue, not actual ink problems. Run Epson Print and Scan Doctor from epson.com/support, then run Head Cleaning from Epson Utility. Trini System resets Epson ink sensors remotely in 15 minutes — call 347-953-1531." } },
      { "@type": "Question", name: "My Brother printer driver is unavailable after Windows 11 update — what do I do?",
        acceptedAnswer: { "@type": "Answer", text: "Remove the existing driver from Settings → Printers. Download the Full Driver & Software Package directly from support.brother.com (do not use Windows Update drivers). Install via USB first, then switch to wireless. Trini System fixes Brother Windows 11 driver issues remotely — call 347-953-1531." } },
      { "@type": "Question", name: "How much does remote printer repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System remote printer repair starts at $49 — about one-third the cost of Geek Squad. We offer a free diagnosis: if we can't fix your printer, you don't pay. Most printer issues are resolved in under 30 minutes. Call 347-953-1531." } },
      { "@type": "Question", name: "Can you fix my printer without me bringing it anywhere?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — Trini System fixes printers 100% remotely. We connect to your computer via secure remote session and fix the printer software, drivers, and network settings while you watch. We serve all 50 US states. No travel required, no drop-off needed." } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Remote Printer Repair Service",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: "United States",
    serviceType: "Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Remote printer repair — no fix no fee" },
  },
];

const BRANDS = [
  { name: "HP", sub: "DeskJet · Envy · OfficeJet · LaserJet · PIXMA", color: "#0096d6", href: "/hp-printer-repair", models: ["DeskJet 4155e", "Envy 6055", "OfficeJet Pro 9015e", "LaserJet M404n"] },
  { name: "Canon", sub: "PIXMA · imageCLASS · MAXIFY · Pro", color: "#cc0000", href: "/canon-printer-repair", models: ["PIXMA MX922", "imageCLASS MF644Cdw", "MAXIFY MB5420", "PIXMA TR8620"] },
  { name: "Epson", sub: "EcoTank · WorkForce · Expression · ET", color: "#0078a8", href: "/epson-printer-repair", models: ["EcoTank ET-2720", "WorkForce WF-3820", "Expression Home XP-4105"] },
  { name: "Brother", sub: "MFC · HL · DCP · ADS series", color: "#3b3b8f", href: "/fix?cat=printer", models: ["MFC-L2710DW", "HL-L2350DW", "DCP-L2550DW", "MFC-J4535DW"] },
];

const TRENDING_ERRORS = [
  { code: "HP Offline", freq: "Most common today" },
  { code: "Canon B200", freq: "Very common" },
  { code: "Epson Ink Error", freq: "EcoTank issue" },
  { code: "0x6100004a", freq: "HP error" },
  { code: "Brother Driver", freq: "Win 11 issue" },
  { code: "E03 Error", freq: "Canon jam" },
];

const REVIEWS = [
  { name: "Margaret T.", stars: 5, text: "HP printer was showing offline for 3 days. Called Trini System and they fixed it in literally 12 minutes while I watched. Amazing service.", loc: "Phoenix, AZ" },
  { name: "Robert M.", stars: 5, text: "Canon B200 error — everyone online said replace the printer. Trini System fixed it remotely in 30 minutes. Saved me $400.", loc: "Dallas, TX" },
  { name: "Linda K.", stars: 5, text: "My Epson EcoTank kept showing ink errors even with full tanks. Fixed remotely, explained everything, very patient with me.", loc: "Tampa, FL" },
  { name: "David W.", stars: 5, text: "Brother printer stopped working after Windows 11 update. Trini had it printing again in 20 minutes. Super professional.", loc: "Seattle, WA" },
];

export default function FixPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a0f2e 0%,#0e1a4a 40%,#0f2860 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(147,197,253,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(147,197,253,0.8) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Interactive Diagnostic Tool
            </div>
            <h1 className="font-black text-white tracking-tight leading-[0.95] mb-5" style={{ fontSize: "clamp(2.6rem,6vw,5rem)" }}>
              Fix Your Printer<br />
              <span style={{ background: "linear-gradient(90deg,#93c5fd,#6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Free Step-by-Step Guide
              </span>
            </h1>
            <p className="text-white/55 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              HP, Canon, Epson, Brother — select your brand and get an instant fix. Remote technician available 24/7.
            </p>

            {/* Trust stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[["10,000+","Printers Fixed"],["94%","First-Call Fix Rate"],["< 15 min","Avg Fix Time"],["$49","Starting Price"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-black text-white">{n}</p>
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">{l}</p>
                </div>
              ))}
            </div>

            {/* Trending errors */}
            <div className="flex flex-wrap gap-2 justify-center">
              {TRENDING_ERRORS.map((e) => (
                <span key={e.code} className="inline-flex items-center gap-1.5 text-xs bg-white/8 text-white/60 border border-white/12 px-3 py-1.5 rounded-full font-medium">
                  <span className="text-amber-400">🔥</span> {e.code}
                  <span className="text-white/30">·</span>
                  <span className="text-white/35">{e.freq}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC TOOL ── */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <TechER pageTrending={["HP DeskJet 4155e offline","Canon B200 error","Epson EcoTank ink error","Brother Win 11 driver"]} />
        </div>
      </section>

      {/* ── BRAND TILES ── */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">All Major Brands</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">We Fix Every Brand</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS.map((b) => (
              <Link key={b.name} href={b.href}
                className="group p-6 rounded-3xl border-2 border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50/30 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-black mb-4"
                  style={{ background: b.color }}>
                  {b.name[0]}
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-1 group-hover:text-blue-700 transition-colors">{b.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{b.sub}</p>
                <div className="space-y-1 mb-4">
                  {b.models.map((m) => (
                    <p key={m} className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">{m}</p>
                  ))}
                </div>
                <p className="text-xs text-blue-600 font-bold group-hover:translate-x-1 transition-transform">View repair guide →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Remote Repair Process</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How We Fix Your Printer Remotely</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "01", icon: "📞", title: "Call or Use Tool", desc: "Use the free diagnostic above or call us at 347-953-1531. We identify your exact issue in 2 minutes." },
              { n: "02", icon: "🔗", title: "Secure Remote Connect", desc: "We send a simple link. You click it and we can see your screen — you watch everything we do, live." },
              { n: "03", icon: "🔧", title: "We Fix the Driver", desc: "We reinstall the printer driver, fix network settings, clear error codes, and verify the connection." },
              { n: "04", icon: "✅", title: "Test Print & Done", desc: "We run a test page before disconnecting. If it doesn't print, you don't pay. Simple." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-1">Step {s.n}</p>
                <h3 className="font-black text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMON ERRORS PROGRAMMATIC SEO ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">Common Printer Error Codes — Quick Reference</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Click any error code to get the exact fix guide</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { code: "HP Offline", brand: "HP", fix: "WiFi / driver reset" },
              { code: "0x6100004a", brand: "HP", fix: "Carriage error" },
              { code: "OXc19a0035", brand: "HP", fix: "Ink system error" },
              { code: "Canon B200", brand: "Canon", fix: "Print head overheating" },
              { code: "Canon E03", brand: "Canon", fix: "Paper jam / feed error" },
              { code: "Canon 5100", brand: "Canon", fix: "Carriage jam error" },
              { code: "Epson Ink Error", brand: "Epson", fix: "Sensor calibration" },
              { code: "Epson Red Light", brand: "Epson", fix: "Waste pad full" },
              { code: "Brother TS-07", brand: "Brother", fix: "Drum unit error" },
              { code: "Brother Drum", brand: "Brother", fix: "Replace drum unit" },
              { code: "HP 0x83c0000a", brand: "HP", fix: "Print service crash" },
              { code: "Canon P02", brand: "Canon", fix: "Print head error" },
            ].map((e) => (
              <div key={e.code} className="group p-4 rounded-2xl border border-gray-100 hover:border-blue-200 bg-gray-50 hover:bg-blue-50 cursor-pointer transition-all">
                <p className="font-black text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{e.code}</p>
                <p className="text-xs text-gray-400 mt-0.5">{e.brand} · {e.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">{"⭐".repeat(5)}</div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">4.9 Stars · 500+ Printer Repairs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex text-amber-400 mb-3 text-sm">{"⭐".repeat(r.stars)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I fix my HP printer showing offline?", a: "Restart your printer and WiFi router. On Windows: Settings → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'. If still offline, visit 123.hp.com to reinstall the driver fresh. Trini System fixes HP offline errors remotely in under 15 minutes." },
              { q: "What is Canon B200 error?", a: "The Canon B200 error indicates a print head issue, but 80% of B200 errors are overheating — not broken hardware. Power off, unplug for 15 minutes to let it cool, then hold Stop/Reset while pressing Power. Trini System resolves Canon B200 errors remotely — call 347-953-1531." },
              { q: "Why does my Epson EcoTank show ink error with full tanks?", a: "Epson EcoTank ink errors on full tanks are a sensor calibration issue, not actual ink problems. Run Epson Print and Scan Doctor (free at epson.com/support), then Head Cleaning from Epson Utility. We reset Epson ink sensors remotely in 15 minutes." },
              { q: "How much does printer repair cost?", a: "Our remote printer repair starts at $49 — about one-third the cost of Geek Squad ($149+). Free diagnosis included. If we can't fix it, you don't pay." },
              { q: "Do I need to bring my printer somewhere?", a: "No — 100% remote. We connect to your computer via secure remote session and fix your printer's software, drivers, and network settings while you watch from home." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-gray-900 list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-14 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Still not printing?</h2>
          <p className="text-blue-200 text-lg mb-8">Call us now — average printer fix takes 15 minutes. No fix, no fee.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-white text-blue-700 font-black text-lg px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl">
              📞 Call {PHONE}
            </a>
            <a href="https://discord.gg/trinisystem" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all">
              💬 Join Discord — Free Help
            </a>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
