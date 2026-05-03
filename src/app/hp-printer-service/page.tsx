import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "HP Printer Service & Support — Phone & Remote",
  description:
    "HP printer service & support phone number. Fix HP DeskJet, OfficeJet, ENVY, LaserJet remotely. From $49. No fix = no fee. Call 347-953-1531 — 24/7.",
  alternates: { canonical: "https://trinisystem.vercel.app/hp-printer-service" },
  openGraph: {
    title: "HP Printer Service & Support — Phone & Remote | Trini System",
    description: "HP printer service & support — call 347-953-1531 for remote fix in 15 min. From $49.",
    url: "https://trinisystem.vercel.app/hp-printer-service",
    type: "website",
  },
  keywords: [
    "hp printer service",
    "hp printer support",
    "hp printer service near me",
    "hp printer support phone number",
    "hp printer customer support",
    "hp printer help",
    "hp printer technical support",
    "hp printer service center",
    "hp printer service center near me",
    "hp service center",
    "hp printer assistance",
    "hp tech support",
    "hp printer service number",
    "hp officejet support",
    "hp deskjet service",
    "hp envy support",
    "hp laserjet service",
    "where to get hp printer serviced",
  ],
};

const SERVICE_TYPES = [
  {
    title: "HP Printer Setup Service",
    icon: "🆕",
    desc: "New HP printer? We set it up correctly the first time — driver install, WiFi connection, HP Smart app, mobile printing, default printer assignment. No more setup wizard frustration.",
    duration: "15–25 min",
    price: "$49",
    examples: ["HP DeskJet 4155e first-time setup", "HP OfficeJet Pro 9015e office network setup", "HP ENVY 6055e mobile print enable", "HP LaserJet M404n driver + duplex"],
  },
  {
    title: "HP Printer Offline / Network Service",
    icon: "📶",
    desc: "HP printer showing offline? Won't connect to WiFi after a router change? We reset the network connection, rebuild the IP binding, and reinstall HP Smart from scratch.",
    duration: "8–15 min",
    price: "$49",
    examples: ["HP printer offline Windows 11", "HP DeskJet won't connect WiFi", "HP OfficeJet shows offline after router restart", "HP printer disappeared from devices"],
  },
  {
    title: "HP Error Code Service",
    icon: "🔴",
    desc: "Specific HP error codes have specific fixes. We know each one — OXc19a0035, 0x6100004a, 0xc19a0035, 0x83c0000a, ink system failure, supply problem. Most fixed remotely without parts.",
    duration: "15–25 min",
    price: "$49–$79",
    examples: ["HP error OXc19a0035 fix", "HP error 0x6100004a", "HP ink system failure", "HP carriage jam reset"],
  },
  {
    title: "HP Driver Reinstall (Windows 11)",
    icon: "💻",
    desc: "Windows 11 updates routinely break HP drivers. We do a complete driver removal (DriverCleanup), download the correct full driver from hp.com, and rebuild the connection cleanly.",
    duration: "20–35 min",
    price: "$49",
    examples: ["HP printer not working after Windows 11 update", "HP driver unavailable", "HP printer Windows 11 incompatible", "HP Smart app won't install"],
  },
  {
    title: "HP Print Queue Service",
    icon: "📋",
    desc: "Documents stuck in the print queue? Print Spooler service crashing? Same job printing in a loop? We restart the spooler, clear all queued jobs, and verify normal print flow.",
    duration: "10–15 min",
    price: "$49",
    examples: ["HP print queue stuck", "Print spooler keeps stopping", "HP printing duplicates", "HP queue won't clear"],
  },
  {
    title: "HP Cartridge & Ink Service",
    icon: "💧",
    desc: "HP cartridge not recognized? '952 ink error'? Counterfeit cartridge warning? We diagnose chip-level issues, firmware blocks, and reset cartridge memory where allowed.",
    duration: "15–20 min",
    price: "$49",
    examples: ["HP 952 cartridge error", "HP cartridge not detected", "HP 902 ink not recognized", "HP counterfeit cartridge message"],
  },
];

const HP_SUPPORT_HOURS = [
  { day: "Monday – Friday", hours: "24 hours", note: "Live answer in under 5 min" },
  { day: "Saturday", hours: "24 hours", note: "No reduced hours" },
  { day: "Sunday", hours: "24 hours", note: "Holiday support included" },
];

const COMPARE_HP_SUPPORT = [
  { feature: "Phone Wait Time", trini: "Under 5 min", official: "30–90 min hold", geek: "Store appointment" },
  { feature: "Repair Method", trini: "Remote — you watch", official: "Mail-in (10–14 days)", geek: "In-store drop-off" },
  { feature: "Cost (typical job)", trini: "$49 flat", official: "Free if in warranty / $$$ otherwise", geek: "$149+ minimum" },
  { feature: "Warranty Required", trini: "No", official: "Yes for free service", geek: "No" },
  { feature: "Driver Install", trini: "Included", official: "Self-service only", geek: "Extra fee" },
  { feature: "After-Hours Support", trini: "24/7", official: "Limited weekend", geek: "Store hours only" },
  { feature: "No Fix = No Fee", trini: "✅ Yes", official: "Diagnostic fee applies", geek: "Diagnostic $59+" },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "HP Printer Service", item: "https://trinisystem.vercel.app/hp-printer-service" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "HP Printer Service & Support",
    description: "Independent HP printer service and support — phone, remote, on-site. Fast 5-minute callback, average 15-minute fix, $49 flat rate. All HP DeskJet, OfficeJet, ENVY, and LaserJet models.",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "HP Printer Repair Service",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Flat $49 starting price for HP printer service. No fix = no fee." },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "@id": "https://trinisystem.vercel.app/hp-printer-service#contact",
    telephone: "+13479531531",
    contactType: "HP printer customer support",
    areaServed: "US",
    availableLanguage: ["English", "Spanish"],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What's the HP printer support phone number?",
        acceptedAnswer: { "@type": "Answer", text: "For independent HP printer service, call Trini System LLC at 347-953-1531. We're an independent HP printer repair provider — not affiliated with HP Inc. — but we have 8 years of experience servicing HP DeskJet, OfficeJet, ENVY, and LaserJet models. For warranty-covered service, contact HP directly at 1-800-474-6836." } },
      { "@type": "Question", name: "Is Trini System an authorized HP service center?",
        acceptedAnswer: { "@type": "Answer", text: "No — Trini System LLC is an independent HP repair provider, not an authorized HP service center. This means we can service printers regardless of warranty status (in or out of warranty), at lower prices, with faster turnaround. For warranty service on covered defects, contact HP directly." } },
      { "@type": "Question", name: "How does HP printer service work?",
        acceptedAnswer: { "@type": "Answer", text: "1) Call 347-953-1531 free. 2) We diagnose your HP issue over the phone. 3) For software/driver/network issues (93% of cases), we connect remotely and fix while you watch. 4) For hardware failures, we recommend the closest authorized parts source. You only pay if your HP printer is fixed — $49 flat for most jobs." } },
      { "@type": "Question", name: "Do you service HP printers under warranty?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — we service HP printers regardless of warranty status. However, if your issue is covered by HP's warranty (typically a hardware defect), you may want to contact HP first for free service. Software, driver, and network issues are usually NOT covered by HP warranty and are exactly what we excel at fixing fast." } },
      { "@type": "Question", name: "How much is HP printer service near me?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System remote HP service starts at $49 flat. Local repair shops typically charge $80–$200 plus drop-off. HP authorized repair (out-of-warranty) often quotes $150–$250 plus shipping. We're significantly cheaper for the same fix on software, driver, network, and most error code issues." } },
      { "@type": "Question", name: "What HP models do you service?",
        acceptedAnswer: { "@type": "Answer", text: "All current HP models: DeskJet (4155e, 2755e, 3755, 4255e), ENVY (6055e, 6455e, 7955e), OfficeJet Pro (9015e, 9025e, 8710), LaserJet (M404n, M454dw, Pro M404dn), plus older HP DeskJet, OfficeJet, ENVY, and LaserJet models. Call 347-953-1531." } },
    ],
  },
];

export default function HPPrinterServicePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 text-center text-sm font-semibold">
        🖨️ HP Printer Service — Independent · 24/7 ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">347-953-1531</a>
        {" "}· From $49
      </div>

      {/* HERO */}
      <section
        aria-label="HP Printer Service Hero"
        style={{ background: "linear-gradient(135deg, #061224 0%, #0a1f3e 40%, #0d2a5a 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,150,214,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">📞 5-Min Callback</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ No Fix = No Fee</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🇺🇸 All 50 States</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">🕐 24/7 Available</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              HP Printer Service
              <span className="block text-blue-300 mt-1">Independent · Fast · Affordable</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Stuck on hold with HP support? We&apos;re an independent HP printer service —
              <strong className="text-white"> live tech in under 5 minutes</strong>, average fix in 15.
              All HP DeskJet, OfficeJet, ENVY, and LaserJet models. From $49.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 HP Service — 347-953-1531
              </a>
              <a href="#diagnosis" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Free Diagnosis
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">Independent repair · Not affiliated with HP Inc. · 8+ years specializing in HP</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[{ n: "<5 min", label: "Phone Pickup" }, { n: "$49", label: "Flat Rate" }, { n: "94%", label: "First-Call Fix" }, { n: "10K+", label: "HPs Serviced" }].map(({ n, label }) => (
              <div key={label} className="text-center py-4 px-3 rounded-2xl bg-white/8 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-blue-300">{n}</div>
                <div className="text-xs text-blue-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section aria-label="HP Service Types" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Every Type of HP Printer Service</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Pick the service category that matches your HP issue. Or just call us — we&apos;ll figure it out together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICE_TYPES.map(({ title, icon, desc, duration, price, examples }) => (
              <div key={title} className="p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl shrink-0">{icon}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 text-lg">{title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">{duration}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">{price}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{desc}</p>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Common queries:</p>
                <ul className="space-y-1">
                  {examples.map((ex) => (
                    <li key={ex} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="text-blue-500 shrink-0">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT HOURS */}
      <section aria-label="HP Service Hours" className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">HP Service Hours — We&apos;re Always Open</h2>
            <p className="text-gray-500 text-sm">Real humans answer the phone — no automated tree, no bot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HP_SUPPORT_HOURS.map(({ day, hours, note }) => (
              <div key={day} className="p-5 rounded-2xl bg-white border border-blue-100 text-center">
                <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-2">{day}</p>
                <p className="text-2xl font-black text-gray-900 mb-1">{hours}</p>
                <p className="text-xs text-gray-500">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="tel:+13479531531" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl transition-colors">
              📞 Call HP Service — 347-953-1531
            </a>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section aria-label="HP Service Comparison" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Trini vs Official HP Support vs Geek Squad</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">An honest comparison of your three options for HP printer service.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 text-sm font-black text-left">Feature</th>
                  <th className="p-4 text-sm font-black text-center bg-blue-700">Trini System</th>
                  <th className="p-4 text-sm font-black text-center hidden md:table-cell">Official HP Support</th>
                  <th className="p-4 text-sm font-black text-center hidden md:table-cell">Geek Squad</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_HP_SUPPORT.map(({ feature, trini, official, geek }, i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-4 text-sm font-bold text-gray-900">{feature}</td>
                    <td className="p-4 text-sm text-center font-bold text-emerald-700 bg-blue-50/30">{trini}</td>
                    <td className="p-4 text-sm text-center text-gray-500 hidden md:table-cell">{official}</td>
                    <td className="p-4 text-sm text-center text-gray-500 hidden md:table-cell">{geek}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">For warranty-covered hardware defects, contact HP directly first.</p>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="diagnosis" aria-label="Free HP Diagnosis" className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Diagnose Your HP Free</h2>
            <p className="text-gray-500">Get an instant fix guide based on 10,000+ real HP repair records.</p>
          </div>
          <TechER brandFilter="HP" />
        </div>
      </section>

      {/* DISCLOSURE */}
      <section aria-label="Independent Service Disclosure" className="bg-amber-50 py-10 border-t-2 border-amber-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-black text-amber-900 uppercase tracking-widest mb-3">Important Disclosure</p>
          <p className="text-sm text-amber-900 leading-relaxed">
            Trini System LLC is an <strong>independent HP printer repair provider</strong> — we are not affiliated with,
            endorsed by, or authorized by HP Inc. For warranty-covered defects on HP printers, contact HP directly
            at <strong>1-800-474-6836</strong> or hp.com/support. We provide independent paid service for
            software, driver, network, error code, and other software-related HP issues — typically faster and at
            lower cost than authorized service for non-warranty work.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="HP Service FAQ" className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">HP Printer Service — FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What is the HP printer support phone number?", a: "For independent HP printer service: Trini System at 347-953-1531 (live answer in under 5 minutes, 24/7, $49 flat). For HP&apos;s official support (warranty-covered): 1-800-474-6836. For software/driver/network HP issues, we&apos;re typically faster and cheaper than HP&apos;s official line." },
              { q: "Is Trini System an authorized HP service center?", a: "No — we&apos;re an independent HP repair provider, not an authorized service center. This is a feature, not a bug: we service HP printers regardless of warranty status, faster, and at lower cost. For warranty-covered hardware defects, contact HP directly first." },
              { q: "Can I get HP printer service near me?", a: "Yes — we provide remote HP service to customers in all 50 US states. Because the work is done remotely, you don&apos;t need a local shop. We connect to your computer, fix the HP issue, and you watch every step. From $49." },
              { q: "How fast is HP service?", a: "Phone pickup: under 5 minutes. Average fix time once we&apos;re connected: 15 minutes for HP DeskJet/ENVY offline issues, 25 minutes for OfficeJet Pro WiFi issues, 20 minutes for LaserJet driver problems. Same-day every time." },
              { q: "What HP models do you service?", a: "Current models: DeskJet 4155e, 2755e, 3755, 4255e; ENVY 6055e, 6455e, 7955e; OfficeJet Pro 9015e, 9025e, 8710; LaserJet M404n, M454dw, Pro M404dn. Plus older HP DeskJet, OfficeJet, ENVY, and LaserJet models. Call us for any HP." },
              { q: "Will my HP warranty be voided if I use Trini System?", a: "No. We do not perform any work that voids HP warranties — we only do software, driver, network, and configuration work that the user could perform themselves. We never modify firmware in ways HP prohibits, and we never replace parts." },
              { q: "Do you fix HP error OXc19a0035 remotely?", a: "Yes. HP error OXc19a0035 is an ink system failure. We walk you through cartridge removal, contact cleaning, and the proper reseat sequence. About 80% are fixed remotely without any new parts. For genuine hardware failures, we&apos;ll diagnose and recommend HP&apos;s authorized service." },
              { q: "Do you offer Spanish-language HP service?", a: "Sí. Hablamos español. Servicio técnico de impresoras HP en español, todos los modelos. Llame al 347-953-1531." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-gray-900 hover:text-blue-700 transition-colors list-none">
                  <span>{q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section aria-label="Related HP Services" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related HP Resources</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/hp-printer-repair" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Printer Repair</Link>
            <Link href="/printer-repair-near-me" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Printer Repair Near Me</Link>
            <Link href="/printer-support" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">All Printer Support</Link>
            <Link href="/fix-printer/hp/offline" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Offline Fix</Link>
            <Link href="/fix-printer/hp/error-code" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Error Code</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="HP Service CTA" style={{ background: "linear-gradient(135deg, #061224, #0d2a5a)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🖨️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">HP Printer Service Now</h2>
          <p className="text-blue-200 text-lg mb-8">Live answer · 5-min callback · From $49 · 24/7 · No fix = no fee</p>
          <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
            📞 347-953-1531
          </a>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
