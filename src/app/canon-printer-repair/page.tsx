import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Canon Printer Repair Near Me — PIXMA & B200 Fix",
  description:
    "Canon printer repair — fix PIXMA MX922, TR4520, MG3620, imageCLASS B200 & 5100 errors remotely. All 50 states. From $49. Call 347-953-1531.",
  keywords: [
    "canon printer repair",
    "canon printer repair near me",
    "canon printer not printing",
    "canon printer b200 error",
    "canon pixma repair",
    "canon printer offline",
    "canon printer wifi setup",
    "canon 5100 error fix",
    "canon mx922 repair",
    "canon tr4520 driver",
    "canon mg3620 not printing",
    "canon printer support phone number",
    "fix canon printer error",
    "canon imageclass repair",
    "canon printer service center",
    "canon printer technician",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/canon-printer-repair" },
  openGraph: {
    title: "Canon Printer Repair Near Me — PIXMA & B200 Fix | Trini System",
    description: "Expert Canon printer repair for PIXMA, imageCLASS, MAXIFY. Remote service all 50 states. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/canon-printer-repair",
    type: "website",
  },
};

const CANON_TRENDING = [
  "Canon PIXMA B200 error",
  "Canon 5100 error fix",
  "Canon printer WiFi setup",
  "Canon MX922 not printing",
  "Canon TR4520 driver Windows 11",
  "Canon MG3620 error",
  "Canon scan not working",
  "Canon printer offline",
];

const CANON_MODELS = [
  { name: "PIXMA MX922", issue: "B200 error, scan, WiFi" },
  { name: "PIXMA TR4520", issue: "Driver Windows 11, offline" },
  { name: "PIXMA TR4722", issue: "WiFi setup, ink errors" },
  { name: "PIXMA MG3620", issue: "Not printing, ink levels" },
  { name: "PIXMA G620", issue: "Ink tank reset, head clean" },
  { name: "imageCLASS MF644Cdw", issue: "Toner, network setup" },
  { name: "MAXIFY MB5420", issue: "Print head, B200 reset" },
  { name: "PIXMA TR8620", issue: "WiFi, copy, scan errors" },
];

const CANON_ERRORS = [
  { code: "Error B200", fix: "Print head reset — 25 min remote fix", urgent: true },
  { code: "Error 5100", fix: "Carriage obstruction clear — 15 min", urgent: true },
  { code: "Error 5200", fix: "Ink absorber reset — 20 min", urgent: true },
  { code: "Canon Printer Offline", fix: "IP reset + driver — 10 min", urgent: false },
  { code: "Canon WiFi Won't Connect", fix: "WPS + Canon PRINT app — 12 min", urgent: false },
  { code: "Canon Scan Not Working", fix: "IJ Scan Utility reinstall — 15 min", urgent: false },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "Canon Printer Repair", item: "https://trinisystem.vercel.app/canon-printer-repair" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Canon printer error B200 and can it be fixed?",
        acceptedAnswer: { "@type": "Answer", text: "Canon B200 is a print head overheating error. About 80% of B200 errors are fixed without buying new hardware. Power off the printer, unplug for 15 minutes, slide the cartridge carrier to center, and perform the reset sequence (hold Stop/Reset while pressing Power 5 times). Trini System fixes Canon B200 remotely in under 30 minutes — call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "How do I fix Canon printer error 5100?",
        acceptedAnswer: { "@type": "Answer", text: "Canon 5100 means a carriage obstruction or paper jam. Power off, open the front cover, remove all paper scraps, check for foreign objects (rubber bands, paper clips), gently slide the cartridge carrier left and right by hand, then power on. If it persists, Trini System diagnoses and fixes 5100 remotely — call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "Can Canon PIXMA printers be repaired remotely?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Trini System provides remote Canon PIXMA repair for MX922, TR4520, TR4722, MG3620, G620, and TR8620. Software, driver, WiFi, scan, and most error code issues are fixed remotely without dropping the printer off anywhere. All 50 US states. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "Why is my Canon printer offline on Windows 11?",
        acceptedAnswer: { "@type": "Answer", text: "Canon offline errors on Windows 11 are usually IP address conflicts after a router restart, or driver corruption from Windows updates. Restart printer and router, then go to Settings → Printers → click Canon → Open queue → Printer menu → uncheck 'Use Printer Offline'. If still offline, reinstall via Canon's IJ Network Tool. We fix this remotely in 10 minutes." },
      },
      {
        "@type": "Question",
        name: "How much does Canon printer repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Remote Canon printer repair starts at $49 — about half what Geek Squad charges. Most Canon issues, including B200 and 5100 errors, are resolved in one 30-minute remote session. No fix = no fee guaranteed. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "What Canon printer models do you support?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System supports all Canon printer lines: PIXMA (MX922, TR4520, TR4722, TR8620, MG3620, G620, G7020), imageCLASS (MF644Cdw, MF445dw, LBP6230dw), MAXIFY (MB5420, MB2720, GX7020), and Pro series. Call us for any Canon model." },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Canon Printer Repair Service",
    description: "Expert remote Canon printer repair for PIXMA, imageCLASS, and MAXIFY. Fix B200 errors, 5100 errors, WiFi issues, and driver problems. All 50 US states.",
    provider: {
      "@type": "LocalBusiness",
      name: "Trini System LLC",
      telephone: "+13479531531",
      address: { "@type": "PostalAddress", streetAddress: "52-09 99th St Apt 8S", addressLocality: "Corona", addressRegion: "NY", postalCode: "11368", addressCountry: "US" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Canon Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Starting price for remote Canon printer repair. No fix = no fee." },
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Fix Canon B200 Error",
    description: "Step-by-step guide to fix Canon B200 print head error on PIXMA printers",
    totalTime: "PT25M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Power off and unplug", text: "Press the power button to turn off the Canon printer. Unplug from the wall outlet. Wait 15 full minutes — this allows the print head to cool fully." },
      { "@type": "HowToStep", position: 2, name: "Open and center the carriage", text: "Open the front cover. Gently slide the cartridge carrier to the center position by hand. Check for paper scraps or obstructions." },
      { "@type": "HowToStep", position: 3, name: "Reset sequence", text: "Plug back in. Hold the Stop/Reset button. While holding it, press the Power button. Continue holding Stop/Reset and press Power 5 times. Release both." },
      { "@type": "HowToStep", position: 4, name: "Print test page", text: "Once the printer initializes, print a test page. If B200 is gone, you're done. If it returns, call Trini System at 347-953-1531." },
    ],
  },
];

const REVIEWS = [
  { name: "Leslie P.", text: "Canon PIXMA B200 — everyone online said replace the printer. Trini System fixed it remotely in 25 minutes. Saved me $200!", rating: 5, loc: "Dallas, TX" },
  { name: "Robert M.", text: "MX922 stopped scanning after Windows 11 update. Trini had it working again in 20 minutes — super professional.", rating: 5, loc: "Phoenix, AZ" },
  { name: "Maria S.", text: "Canon 5100 error wouldn't go away. Fixed remotely, the tech walked me through every step. Very patient.", rating: 5, loc: "Miami, FL" },
];

export default function CanonPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-3 text-center text-sm font-semibold">
        🖨️ Canon Printer Repair — Remote Service, All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-red-200">Call 347-953-1531</a>
        {" "}· From $49 · No Fix = No Fee
      </div>

      {/* HERO */}
      <section
        aria-label="Canon Printer Repair Hero"
        style={{ background: "linear-gradient(135deg, #1e0606 0%, #3c0a0a 40%, #5a0e0e 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(204,0,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">⭐ 4.9 Google Rating</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ No Fix = No Fee</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🇺🇸 All 50 States</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">⚡ Avg Fix: 25 Min</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Canon Printer Repair
              <span className="block text-red-300 mt-1">PIXMA · imageCLASS · MAXIFY</span>
            </h1>
            <p className="text-lg md:text-xl text-red-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Canon B200 error? PIXMA won&apos;t print? Error 5100 stuck on screen?
              Our certified technicians fix <strong className="text-white">Canon printers remotely</strong> in
              an average of 25 minutes — from $49. Available 24/7 across all 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call Now — 347-953-1531
              </a>
              <a href="#canon-diagnosis" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Diagnose My Canon Free
              </a>
            </div>
            <p className="text-sm text-red-300 mt-4">No appointment needed · Avg callback under 5 min · Open 24/7</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[{ n: "25 min", label: "Average fix time" }, { n: "$49", label: "Starting price" }, { n: "80%", label: "B200 remote success" }, { n: "47+", label: "5-star reviews" }].map(({ n, label }) => (
              <div key={label} className="text-center py-4 px-3 rounded-2xl bg-white/8 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-red-300">{n}</div>
                <div className="text-xs text-red-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON ERRORS */}
      <section aria-label="Common Canon Printer Errors" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Most Common Canon Printer Errors We Fix</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">These are the Canon printer problems customers search for every day. All fixed remotely.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CANON_ERRORS.map(({ code, fix, urgent }) => (
              <a key={code} href="#canon-diagnosis" className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-red-300 hover:shadow-lg transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${urgent ? "bg-red-100" : "bg-blue-100"}`}>{urgent ? "🔴" : "🔧"}</div>
                <div>
                  <p className="font-black text-gray-900 group-hover:text-red-700 transition-colors">{code}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{fix}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="canon-diagnosis" aria-label="Canon Printer Diagnosis Tool" className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis Tool</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s Wrong With Your Canon Printer?</h2>
            <p className="text-gray-500">Select your issue — get a step-by-step fix guide instantly, powered by 5,000+ Canon repair records.</p>
          </div>
          <TechER brandFilter="Canon" pageTrending={CANON_TRENDING} />
        </div>
      </section>

      {/* SUPPORTED MODELS */}
      <section aria-label="Canon Models We Repair" className="bg-gradient-to-b from-gray-50 to-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Canon Printer Models We Repair</h2>
            <p className="text-gray-500">Every Canon PIXMA, imageCLASS, MAXIFY, and Pro series model supported</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CANON_MODELS.map(({ name, issue }) => (
              <div key={name} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
                <div className="text-2xl mb-2">🖨️</div>
                <p className="font-black text-gray-900 text-sm">{name}</p>
                <p className="text-xs text-gray-400 mt-1">{issue}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">Don&apos;t see your model? <a href="tel:+13479531531" className="text-red-600 font-bold hover:underline">Call us — we repair all Canon models</a></p>
        </div>
      </section>

      {/* DIY GUIDE — Canon B200 */}
      <section aria-label="How to Fix Canon B200 Error" className="bg-gray-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-red-400 border border-red-700 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">DIY Guide</span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Fix Canon B200 — Step by Step</h2>
            <p className="text-gray-400">80% of Canon B200 errors are fixed with these steps. If yours persists, call us.</p>
          </div>
          <ol className="space-y-4">
            {[
              { step: 1, title: "Power off and unplug for 15 minutes", detail: "Press the power button. Unplug from the wall. Wait a full 15 minutes — the print head needs time to cool. Many B200 errors fix themselves after this single step." },
              { step: 2, title: "Open and center the cartridge carrier", detail: "Open the front cover. Gently slide the cartridge carrier to the middle by hand. Check for paper scraps, ink drips, or foreign objects in the print path." },
              { step: 3, title: "Clean cartridge contacts", detail: "Remove all ink cartridges. With a dry, lint-free cloth, gently wipe the gold contacts on each cartridge AND inside the printer. Reseat firmly until they click." },
              { step: 4, title: "Perform reset sequence", detail: "Plug printer back in but DO NOT turn on. Hold the Stop/Reset button. While holding, press the Power button. Keep holding Stop/Reset, press Power 5 times. Release both buttons together." },
              { step: 5, title: "Print test page", detail: "Once the printer initializes (may take 1–2 minutes), try printing a test page. If B200 is gone, you&apos;re done. If it returns, the print head may have failed — call Trini System and we&apos;ll diagnose remotely before any hardware decisions." },
            ].map(({ step, title, detail }) => (
              <li key={step} className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-base font-black shrink-0">{step}</div>
                <div>
                  <p className="font-black text-white text-base mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 p-5 rounded-2xl bg-red-900/40 border border-red-700/40 text-center">
            <p className="text-white font-bold mb-3">Still showing B200 after all 5 steps?</p>
            <a href="tel:+13479531531" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-6 rounded-xl transition-colors">📞 Call Now — We Fix It in 25 Min</a>
          </div>
        </div>
      </section>

      {/* CANON PRINTER SUPPORT — Keyword Section */}
      <section aria-label="Canon Printer Support Services" className="bg-red-950 text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Canon Printer Support — What We Cover</h2>
            <p className="text-red-300">Complete Canon printer support for every PIXMA, imageCLASS, and MAXIFY model</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Canon B200 Error Fix", body: "The most feared Canon error. About 80% of B200 errors are overheating, not broken hardware. Our technicians know the exact reset sequence and resolve B200 remotely in 25 minutes — without needing a new print head.", tag: "canon b200 error" },
              { title: "Canon 5100 Error Diagnosis", body: "Error 5100 means a carriage obstruction — usually a paper scrap, rubber band, or foreign object. We walk you through opening the printer safely, removing obstructions, and resetting the carriage. 90% fixed remotely.", tag: "canon 5100 error" },
              { title: "Canon WiFi & Network Setup", body: "Canon PIXMA WiFi connection issues fixed remotely. We set up Canon printers on 2.4GHz networks, troubleshoot IP conflicts, and reinstall the Canon PRINT app for iOS and Android.", tag: "canon wifi setup" },
              { title: "Canon Driver Reinstall (Windows 11)", body: "Windows 11 updates frequently break Canon drivers. We uninstall the old IJ driver, download the correct Master Setup from canon.com, and rebuild the connection from scratch.", tag: "canon driver" },
              { title: "Canon IJ Scan Utility Fix", body: "Canon scan not working after Windows update? We reinstall IJ Scan Utility, fix the WIA driver, and restore both copy and scan functions on PIXMA all-in-ones.", tag: "canon scan not working" },
              { title: "Canon imageCLASS Network Setup", body: "Canon imageCLASS MF series troubleshooting — toner errors, network setup, duplex print issues. Our technicians have resolved hundreds of MF644Cdw and MF445dw issues remotely.", tag: "canon imageclass repair" },
            ].map(({ title, body, tag }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-black text-white text-lg">{title}</h3>
                  <span className="text-xs bg-red-700/50 text-red-200 px-2 py-1 rounded-lg shrink-0">{tag}</span>
                </div>
                <p className="text-red-200 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section aria-label="Canon Printer Repair Reviews" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">What Customers Say About Our Canon Repair</h2>
            <p className="text-gray-400">4.9 ⭐ average from 47+ verified Google reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map(({ name, text, rating, loc }) => (
              <div key={name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex gap-1 mb-3">{Array(rating).fill("⭐").map((s, i) => <span key={i}>{s}</span>)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <p className="font-black text-gray-900 text-sm">— {name}</p>
                <p className="text-xs text-gray-400">{loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Canon Printer Repair FAQ" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Canon Printer Repair — Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What is Canon B200 error and can it be fixed remotely?", a: "Canon B200 is a print head overheating error. About 80% are fixed without buying a new printer. Power off, unplug for 15 min, center the carriage, and run the Stop/Reset + Power 5x reset sequence. Our technicians fix B200 remotely in 25 minutes — call 347-953-1531." },
              { q: "How do I fix Canon error 5100?", a: "Error 5100 means a carriage obstruction. Open the front cover, remove all paper scraps and foreign objects, gently slide the cartridge carrier left and right by hand. If it persists, we diagnose and fix 5100 remotely in 15 minutes." },
              { q: "Why won't my Canon PIXMA print after Windows 11 update?", a: "Windows 11 updates frequently break Canon drivers. We uninstall the corrupted driver, download the latest Master Setup from canon.com, and rebuild the connection. 95% fixed remotely in 20 minutes." },
              { q: "How much does Canon printer repair cost?", a: "Canon printer repair starts at $49 — about half of Geek Squad ($100–$200). Most issues including B200 and 5100 are resolved in one 30-minute remote session. No fix = no fee." },
              { q: "Can Canon imageCLASS issues be fixed remotely?", a: "Yes. Canon imageCLASS MF644Cdw, MF445dw, and LBP6230dw issues — driver errors, network setup, toner errors, scan problems — are all fixed remotely. We've resolved hundreds without customers leaving home." },
              { q: "Do you support Canon MAXIFY printers?", a: "Yes. We support Canon MAXIFY MB5420, MB2720, GX7020, and all current MAXIFY models. WiFi setup, B200 errors, ink system errors, and driver issues are all in scope." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-100 bg-white overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-gray-900 hover:text-red-700 transition-colors list-none">
                  <span>{q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CITATIONS */}
      <section aria-label="Canon Repair Service Credentials" className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Verified On</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60 mb-4">
            {["Google Business Profile", "Yelp", "Facebook", "YouTube", "TikTok", "Google Sites"].map((r) => (
              <span key={r} className="text-sm font-bold text-gray-500">{r}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Trini System LLC is a registered tech support company in Corona, Queens, New York. Serving customers since 2016.
            4.9-star Google rating based on 47+ verified reviews. Canon®, PIXMA®, imageCLASS®, and MAXIFY® are
            registered trademarks of Canon Inc. Trini System LLC is an independent repair provider, not affiliated with or endorsed by Canon Inc.
          </p>
        </div>
      </section>

      {/* RELATED PAGES — Internal Link Sculpting */}
      <section aria-label="Related Canon Services" className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related Canon Resources</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/printer-repair-near-me" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">Printer Repair Near Me</Link>
            <Link href="/fix-printer/canon/error-code" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">Canon Error Code Fix</Link>
            <Link href="/fix-printer/canon/not-printing" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">Canon Not Printing Fix</Link>
            <Link href="/fix-printer/canon/wifi-setup" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">Canon WiFi Setup</Link>
            <Link href="/hp-printer-repair" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">HP Printer Repair</Link>
            <Link href="/epson-printer-repair" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">Epson Printer Repair</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Get Canon Printer Fixed Today" style={{ background: "linear-gradient(135deg, #1e0606, #5a0e0e)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🖨️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your Canon Printer Fixed Today</h2>
          <p className="text-red-200 text-lg mb-8">Remote service · All 50 states · From $49 · No fix = no fee</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
              📞 Call 347-953-1531
            </a>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
