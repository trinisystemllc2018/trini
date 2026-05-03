import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Epson Printer Repair Near Me — EcoTank Fixed",
  description:
    "Epson printer repair — fix EcoTank ET-2720, ET-4760, WorkForce WF-7720 ink errors, nozzle clogs, offline issues remotely. From $49. Call 347-953-1531.",
  keywords: [
    "epson printer repair",
    "epson printer repair near me",
    "epson repair near me",
    "epson printer not printing",
    "epson ecotank not printing",
    "epson printer offline",
    "epson ink system error",
    "epson nozzle clog fix",
    "epson wifi setup",
    "epson et-2720 error",
    "epson et-4760 repair",
    "epson workforce not printing",
    "epson printer support phone number",
    "fix epson printer",
    "epson scan not working",
    "epson ecotank repair",
    "epson printer technician",
    "epson printer service center",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/epson-printer-repair" },
  openGraph: {
    title: "Epson Printer Repair Near Me — Fixed in 15 Min | Trini System",
    description: "Expert Epson repair for EcoTank, WorkForce, Expression printers. Remote service all 50 states. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/epson-printer-repair",
    type: "website",
  },
};

const EPSON_TRENDING = [
  "Epson EcoTank ink error",
  "Epson ET-2720 not printing",
  "Epson WiFi setup",
  "Epson nozzle clog fix",
  "Epson scan not working",
  "Epson WorkForce WF-7720 error",
  "Epson firmware update failed",
  "Epson printer offline Windows 11",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "Epson Printer Repair", item: "https://trinisystem.vercel.app/epson-printer-repair" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why does my Epson EcoTank show an ink error even when the tanks are full?",
        acceptedAnswer: { "@type": "Answer", text: "Epson EcoTank ink errors are almost always a sensor or firmware issue, not a real ink problem. Trini System can reset the ink sensor remotely in under 15 minutes using the Epson Adjustment Program. No need to replace the printer or any parts. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "How do I fix Epson printer showing offline?",
        acceptedAnswer: { "@type": "Answer", text: "Restart both the Epson printer and your WiFi router. On the printer, press the WiFi button and run Wireless Setup Wizard. On your computer, remove the printer and reinstall using Epson Connect Printer Setup Utility from epson.com/support. Trini System fixes Epson offline errors remotely across all 50 states. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "How much does Epson printer repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Remote Epson printer repair at Trini System starts at $49 — about half the price of Geek Squad. Most issues are resolved in one 30-minute remote session. No fix = no fee guaranteed." },
      },
      {
        "@type": "Question",
        name: "Can Epson nozzle clogs be fixed remotely?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Most Epson nozzle clogs are resolved remotely by running Epson head cleaning 2–3 cycles via the printer utility on your PC. Stubborn clogs are cleared using the Epson Adjustment Program. 90%+ of nozzle clog cases are fixed without hardware replacement. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "How do I connect my Epson printer to WiFi?",
        acceptedAnswer: { "@type": "Answer", text: "On your Epson printer, go to Settings → Wi-Fi Setup → Wi-Fi Setup Wizard. Select your network and enter your WiFi password. If setup fails, download Epson Connect Printer Setup Utility from epson.com/support. Trini System provides Epson WiFi setup help remotely — call 347-953-1531." },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epson Printer Repair Service",
    description: "Expert remote Epson printer repair for EcoTank, WorkForce, and Expression printers. Fix ink errors, offline issues, WiFi problems, and nozzle clogs. All 50 US states.",
    provider: {
      "@type": "LocalBusiness",
      name: "Trini System LLC",
      telephone: "+13479531531",
      address: { "@type": "PostalAddress", streetAddress: "52-09 99th St Apt 8S", addressLocality: "Corona", addressRegion: "NY", postalCode: "11368", addressCountry: "US" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Epson Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Starting price for remote Epson printer repair. No fix = no fee." },
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Fix Epson Printer Offline",
    description: "Step-by-step guide to reconnect an Epson printer to WiFi and fix the offline error",
    totalTime: "PT10M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Power cycle both devices", text: "Power off Epson printer. Unplug router from wall for 30 seconds. Plug router back in, wait 60 seconds, then power on Epson printer." },
      { "@type": "HowToStep", position: 2, name: "Run WiFi Setup Wizard", text: "On Epson printer: Settings → Wi-Fi Setup → Wi-Fi Setup Wizard. Enter your WiFi network name and password." },
      { "@type": "HowToStep", position: 3, name: "Clear offline flag in Windows", text: "Settings → Printers & Scanners → click Epson printer → Open print queue → Printer menu → uncheck Use Printer Offline." },
      { "@type": "HowToStep", position: 4, name: "Reinstall via Epson Connect Utility", text: "Download Epson Connect Printer Setup Utility from epson.com/support. Run the installer and select Wireless LAN to fully rebuild the connection." },
    ],
  },
];

const EPSON_MODELS = [
  { name: "EcoTank ET-2720", issue: "Ink sensor errors, clog" },
  { name: "EcoTank ET-4760", issue: "WiFi dropouts, offline" },
  { name: "EcoTank ET-3850", issue: "Slow print, ink errors" },
  { name: "EcoTank ET-2800", issue: "Setup issues, offline" },
  { name: "WorkForce WF-7720", issue: "Print head failure" },
  { name: "WorkForce WF-2930", issue: "Driver errors, WiFi" },
  { name: "Expression XP-7100", issue: "Ink cartridge errors" },
  { name: "EcoTank ET-16650", issue: "Nozzle clog, error code" },
];

const COMMON_ERRORS = [
  { code: "Ink System Error", fix: "Sensor reset via Adjustment Program — 15 min remote fix", urgent: true },
  { code: "Printer Offline", fix: "WiFi reconnect + driver reinstall — 10 min", urgent: false },
  { code: "Nozzle Clog / Faded Print", fix: "3-cycle head cleaning + nozzle check — 20 min", urgent: false },
  { code: "Error Code 0xf1", fix: "Paper path clear + carriage reset — 15 min", urgent: true },
  { code: "Firmware Update Failed", fix: "Manual firmware flash — 25 min remote", urgent: false },
  { code: "Epson Scan Not Working", fix: "Driver reinstall + port reset — 20 min", urgent: false },
];

export default function EpsonPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white py-3 text-center text-sm font-semibold">
        🖨️ Epson Printer Repair — Remote Service, All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-sky-200">Call 347-953-1531</a>
        {" "}· From $49 · No Fix = No Fee
      </div>

      {/* HERO */}
      <section
        aria-label="Epson Printer Repair Hero"
        style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0f2d4a 40%, #003d6b 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,153,204,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">⭐ 4.9 Google Rating</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ No Fix = No Fee</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🇺🇸 All 50 States</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">⚡ Avg Fix: 23 Min</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Epson Printer Repair
              <span className="block text-sky-300 mt-1">Near You — Done Remotely</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Is your Epson EcoTank showing an ink error? WorkForce gone offline? Nozzle clogged?
              Our certified technicians fix <strong className="text-white">Epson printers remotely</strong> while
              you watch — in an average of 23 minutes, from $49. Same-day service, all 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call Now — 347-953-1531
              </a>
              <a href="#diagnosis-tool" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Diagnose My Epson Free
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">No appointment needed · Avg callback under 5 min · Open 24/7</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[{ n: "23 min", label: "Average fix time" }, { n: "$49", label: "Starting price" }, { n: "92%", label: "Remote success rate" }, { n: "47+", label: "5-star reviews" }].map(({ n, label }) => (
              <div key={label} className="text-center py-4 px-3 rounded-2xl bg-white/8 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-sky-300">{n}</div>
                <div className="text-xs text-blue-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON ERRORS */}
      <section aria-label="Common Epson Errors" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Most Common Epson Printer Errors We Fix</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Top Epson issues searched daily — click any for instant guidance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMON_ERRORS.map(({ code, fix, urgent }) => (
              <a key={code} href="#diagnosis-tool" className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-sky-300 hover:shadow-lg transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${urgent ? "bg-red-100" : "bg-sky-100"}`}>{urgent ? "🔴" : "🔧"}</div>
                <div>
                  <p className="font-black text-gray-900 group-hover:text-sky-700 transition-colors">{code}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{fix}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="diagnosis-tool" aria-label="Epson Printer Diagnosis Tool" className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis Tool</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s Wrong With Your Epson?</h2>
            <p className="text-gray-500">Select your issue below — get a step-by-step fix guide instantly, powered by 10,000+ Epson repair records.</p>
          </div>
          <TechER brandFilter="Epson" pageTrending={EPSON_TRENDING} />
        </div>
      </section>

      {/* SUPPORTED MODELS */}
      <section aria-label="Supported Epson Models" className="bg-gradient-to-b from-gray-50 to-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Epson Models We Repair</h2>
            <p className="text-gray-500">Every current Epson EcoTank, WorkForce, and Expression model supported</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EPSON_MODELS.map(({ name, issue }) => (
              <div key={name} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all">
                <div className="text-2xl mb-2">🖨️</div>
                <p className="font-black text-gray-900 text-sm">{name}</p>
                <p className="text-xs text-gray-400 mt-1">{issue}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">Don&apos;t see your model? <a href="tel:+13479531531" className="text-sky-600 font-bold hover:underline">Call us — we repair all Epson models</a></p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section aria-label="Why Choose Trini System for Epson Repair" className="bg-white py-14 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Why Choose Trini System for Epson Repair?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Faster Than Any Local Shop", body: "We connect remotely within minutes. No driving, no drop-off, no waiting days. Average Epson fix time: 23 minutes. Local shops average 3–5 business days." },
              { icon: "💰", title: "Half the Price of Geek Squad", body: "Epson repair starts at $49. Geek Squad charges $100–$200+ for the same remote session. No fix = no fee — you only pay when your printer works." },
              { icon: "🔒", title: "Epson Expert Knowledge", body: "Our techs have resolved 1,000+ Epson EcoTank and WorkForce issues. We use the official Epson Adjustment Program — the same tool Epson service centers use." },
              { icon: "🇺🇸", title: "Serving All 50 States", body: "Based in Queens, NY but available remotely nationwide. We connect via secure remote desktop and fix your Epson while you watch." },
              { icon: "📞", title: "Available 24/7", body: "Printers break at the worst times. We're available every day of the year — weekends and holidays included. Call 347-953-1531 any time." },
              { icon: "🔄", title: "No Fix = No Fee Guarantee", body: "We only charge when your Epson printer is fully working. No hidden fees, no diagnostic charges. If we can't fix it, you owe us nothing." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY GUIDE */}
      <section aria-label="How to Fix Epson Printer Offline" className="bg-gray-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-sky-400 border border-sky-700 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">DIY Guide</span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Fix Epson Printer Offline — Step by Step</h2>
            <p className="text-gray-400">Try this first. If it doesn&apos;t work, call us for a remote fix in minutes.</p>
          </div>
          <ol className="space-y-4">
            {[
              { step: 1, title: "Hard reset your Epson printer", detail: "Power off your Epson printer completely. Unplug the power cable from the back of the printer (not just the wall outlet). Wait 60 full seconds to clear all cached network data." },
              { step: 2, title: "Restart your WiFi router", detail: "Unplug your router from the wall for 30 seconds. Plug it back in and wait until all indicator lights are stable — usually 60–90 seconds. Then power on the Epson printer." },
              { step: 3, title: "Run WiFi Setup Wizard on printer", detail: "On your Epson printer: Settings → Wi-Fi Setup → Wi-Fi Setup Wizard. Select your network and enter your WiFi password (case-sensitive)." },
              { step: 4, title: "Remove the offline flag on Windows", detail: "Start → Settings → Bluetooth & Devices → Printers & Scanners → click Epson → Open print queue → Printer menu → uncheck 'Use Printer Offline'." },
              { step: 5, title: "Reinstall using Epson Connect Utility", detail: "Download 'Epson Connect Printer Setup Utility' from epson.com/support. Run it and select 'Wireless LAN' to completely rebuild the printer's network connection." },
            ].map(({ step, title, detail }) => (
              <li key={step} className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-base font-black shrink-0">{step}</div>
                <div>
                  <p className="font-black text-white text-base mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 p-5 rounded-2xl bg-red-900/40 border border-red-700/40 text-center">
            <p className="text-white font-bold mb-3">Still offline after these steps?</p>
            <a href="tel:+13479531531" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-6 rounded-xl transition-colors">📞 Call Now — We Fix It in 15 Min</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Epson Printer Repair FAQ" className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Epson Printer Repair — Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Why does my Epson EcoTank show an ink error even when the tanks are full?", a: "This is the #1 Epson EcoTank complaint. The tanks are full but a sensor misreads them as empty. Trini System resets this sensor remotely using the Epson Adjustment Program in under 15 minutes — no parts replacement needed. Call 347-953-1531." },
              { q: "Can Epson nozzle clogs be fixed without buying a new printer?", a: "Yes — 90%+ of Epson nozzle clogs are fixable without replacing parts. We run Epson's head cleaning utility remotely 2–3 times. Stubborn clogs are cleared using the Adjustment Program's deep-clean cycle." },
              { q: "How much does remote Epson printer repair cost?", a: "Remote Epson repair starts at $49 — about half the cost of Geek Squad ($100–$200). Most Epson issues are resolved in a single 30-minute remote session. No fix = no fee, no exceptions." },
              { q: "What Epson models does Trini System support?", a: "We support all current Epson models: full EcoTank lineup (ET-2720, ET-4760, ET-3850, ET-2800, ET-16650), WorkForce series (WF-7720, WF-2930, WF-3820), and Expression series. Call us even if your model isn't listed." },
              { q: "How do I connect my Epson EcoTank to WiFi?", a: "On your EcoTank: press Home → Settings → Wi-Fi Setup → Wi-Fi Setup Wizard → select your network → enter WiFi password. If it fails, download Epson Connect Printer Setup Utility from epson.com/support. We also help remotely in 10 minutes." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-gray-900 hover:text-sky-700 transition-colors list-none">
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
      <section aria-label="Service Credentials" className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Verified On</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60 mb-4">
            {["Google Business Profile", "Yelp", "Facebook", "YouTube", "TikTok", "Google Sites"].map((r) => (
              <span key={r} className="text-sm font-bold text-gray-500">{r}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Trini System LLC is a registered tech support company in Corona, Queens, New York. Serving customers since 2016.
            4.9-star Google rating based on 47+ verified reviews. Epson® is a registered trademark of Seiko Epson Corporation.
            Trini System LLC is an independent repair provider, not affiliated with or endorsed by Epson.
          </p>
        </div>
      </section>

      {/* RELATED PAGES — Internal Link Sculpting */}
      <section aria-label="Related Epson Services" className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related Epson Resources</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/epson-service-nyc" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Service NYC</Link>
            <Link href="/epson-plotters" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Plotters & SureColor</Link>
            <Link href="/printer-repair-near-me" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Printer Repair Near Me</Link>
            <Link href="/fix-printer/epson/not-printing" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Not Printing Fix</Link>
            <Link href="/fix-printer/epson/error-code" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Error Code Fix</Link>
            <Link href="/printer-support" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">All Printer Support</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Get Epson Repaired Today" style={{ background: "linear-gradient(135deg, #0c1a2e, #003d6b)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🖨️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your Epson Printer Fixed Today</h2>
          <p className="text-blue-200 text-lg mb-8">Remote service · All 50 states · From $49 · No fix = no fee</p>
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
