import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  // 50 chars + " | Trini System" (16) = 66 — at Bing limit
  title: "HP Printer Repair Near Me — DeskJet, OfficeJet",
  description:
    "HP printer repair — fix HP DeskJet 4155e, 2755e, OfficeJet Pro, LaserJet, ENVY offline & error OXc19a0035 remotely. From $49. Call 347-953-1531.",
  keywords: [
    "hp printer repair",
    "hp printer repair near me",
    "hp printer repair service near me",
    "hp printer support",
    "hp printer support phone number",
    "hp printer offline fix",
    "hp printer error code",
    "hp deskjet 4155e repair",
    "hp deskjet 2755e setup",
    "hp envy not printing",
    "hp officejet pro 9015e error",
    "hp laserjet printer repair",
    "hp printer service center",
    "hp printer technician",
    "where can i get my hp printer fixed",
    "hp printer repair new york",
    "fix hp printer",
    "hp printer won't connect wifi",
  ],
  alternates: { canonical: "https://trinisystem.vercel.app/hp-printer-repair" },
  openGraph: {
    title: "HP Printer Repair Near Me — Fixed Fast | Trini System",
    description: "Expert HP printer repair for DeskJet, OfficeJet Pro, ENVY, LaserJet. Remote service all 50 states. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/hp-printer-repair",
    type: "website",
  },
};

const HP_TRENDING = [
  "HP DeskJet 4155e offline",
  "HP DeskJet 2755e setup",
  "HP ENVY not printing",
  "HP OfficeJet Pro 9015e error",
  "HP LaserJet driver Windows 11",
  "HP printer error OXc19a0035",
  "HP 952 ink cartridge error",
  "HP printer won't connect WiFi",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "HP Printer Repair", item: "https://trinisystem.vercel.app/hp-printer-repair" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I fix my HP printer showing offline?",
        acceptedAnswer: { "@type": "Answer", text: "Turn off both the HP printer and your WiFi router. Unplug both from the wall for 30 seconds. Plug the router back in first and wait 60 seconds. Power on the HP printer. On Windows, go to Settings > Printers & Scanners, click your HP printer, open the print queue, click the Printer menu and uncheck 'Use Printer Offline'. If it persists, call Trini System at 347-953-1531 — we fix HP offline errors remotely in under 15 minutes." },
      },
      {
        "@type": "Question",
        name: "What is HP printer error code OXc19a0035?",
        acceptedAnswer: { "@type": "Answer", text: "Error OXc19a0035 is an ink system failure on HP printers. Turn the printer fully off, remove all ink cartridges, wait 60 seconds, reinstall them firmly until they click, and power on. If the error returns, Trini System resolves this remotely without hardware replacement in most cases. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "How much does HP printer repair cost at Trini System?",
        acceptedAnswer: { "@type": "Answer", text: "Remote HP printer repair starts at $49 — about 50% less than Geek Squad. Most HP issues are fixed remotely in under 30 minutes. No fix = no fee guaranteed. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "Can HP LaserJet printers be repaired remotely?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. HP LaserJet driver issues, offline errors, print queue problems, and firmware errors can all be resolved remotely. Our technicians have resolved hundreds of HP LaserJet M404n, Pro M404dn, and LaserJet Pro M454dw issues remotely. Call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "Why won't my HP DeskJet connect to WiFi?",
        acceptedAnswer: { "@type": "Answer", text: "HP DeskJet WiFi issues are usually caused by a stale IP address or a router channel conflict. Restart both the printer and router. On the printer, hold the Wireless button until the light blinks, then press the WPS button on your router within 2 minutes. If that fails, download HP Smart app and run wireless setup from scratch. Trini System fixes HP WiFi remotely in 15 minutes — call 347-953-1531." },
      },
      {
        "@type": "Question",
        name: "What HP printer models do you support?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System supports all HP printer models including DeskJet (4155e, 2755e, 3755, 4255e), ENVY (6055e, 6455e, 7955e), OfficeJet Pro (9015e, 9025e, 8710), and LaserJet (M404n, M454dw, Pro M404dn). Call us for any HP model not listed." },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "HP Printer Repair Service",
    description: "Expert remote HP printer repair for DeskJet, ENVY, OfficeJet Pro, and LaserJet. Fix offline errors, error OXc19a0035, WiFi issues, and driver problems. All 50 US states.",
    provider: {
      "@type": "LocalBusiness",
      name: "Trini System LLC",
      telephone: "+13479531531",
      address: { "@type": "PostalAddress", streetAddress: "52-09 99th St Apt 8S", addressLocality: "Corona", addressRegion: "NY", postalCode: "11368", addressCountry: "US" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "HP Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Starting price for remote HP printer repair. No fix = no fee." },
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Fix HP Printer Showing Offline",
    description: "Step-by-step guide to fix an HP printer offline error on Windows 10 or Windows 11",
    totalTime: "PT8M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Full power cycle", text: "Power off your HP printer. Unplug the power cord from the wall for 30 seconds. Unplug your WiFi router too. Plug router in first, wait 60 seconds, then power on HP printer." },
      { "@type": "HowToStep", position: 2, name: "Remove the offline flag", text: "Windows: Settings → Printers & Scanners → click HP printer → Open print queue → Printer menu → uncheck Use Printer Offline." },
      { "@type": "HowToStep", position: 3, name: "Set as default printer", text: "In Printers & Scanners, click your HP printer → Set as Default → Print a test page." },
      { "@type": "HowToStep", position: 4, name: "Reinstall HP Smart", text: "Visit 123.hp.com, enter your model, download HP Smart App. Choose Wireless setup to create a fresh connection." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: "Corey Hawkins" },
    datePublished: "2024-08-15",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody: "James was incredibly patient and made everything easy. My HP DeskJet was offline for weeks and they fixed it in 20 minutes. Absolutely the best tech support experience.",
    itemReviewed: { "@type": "Service", name: "HP Printer Repair — Trini System LLC" },
  },
];

const HP_MODELS = [
  { name: "DeskJet 4155e", issue: "Offline, WiFi, cartridge" },
  { name: "DeskJet 2755e", issue: "Setup, offline, driver" },
  { name: "DeskJet 3755", issue: "Offline, print queue" },
  { name: "ENVY 6055e", issue: "Error codes, ink" },
  { name: "ENVY 6455e", issue: "WiFi, alignment" },
  { name: "OfficeJet Pro 9015e", issue: "Error OXc19a0035" },
  { name: "OfficeJet Pro 9025e", issue: "Print head errors" },
  { name: "LaserJet M404n", issue: "Driver, Windows 11" },
];

const HP_ERRORS = [
  { code: "Printer Offline", fix: "IP reset + driver reinstall — 8 min", urgent: false },
  { code: "Error OXc19a0035", fix: "Ink system reset — 20 min remote fix", urgent: true },
  { code: "Error 0x6100004a", fix: "Carriage jam + full reset — 15 min", urgent: true },
  { code: "HP DeskJet Won't Connect WiFi", fix: "WPS + HP Smart setup — 15 min", urgent: false },
  { code: "HP Print Queue Stuck", fix: "Spooler reset + queue clear — 10 min", urgent: false },
  { code: "HP LaserJet Driver Error", fix: "Driver package reinstall — 18 min", urgent: false },
];

const REVIEWS = [
  { name: "Corey H.", text: "My HP DeskJet was offline for weeks. They fixed it in 20 minutes. Absolutely the best tech support experience.", rating: 5 },
  { name: "Patricia M.", text: "Error OXc19a0035 was driving me crazy. Technician fixed it remotely in 25 minutes. Saved me from buying a new printer!", rating: 5 },
  { name: "Robert K.", text: "HP OfficeJet Pro kept going offline. Trini System sorted it same day, very professional and clear instructions.", rating: 5 },
];

export default function HPPrinterRepairPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 text-center text-sm font-semibold">
        🖨️ HP Printer Repair — Remote Service, All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">Call 347-953-1531</a>
        {" "}· From $49 · No Fix = No Fee
      </div>

      {/* HERO */}
      <section
        aria-label="HP Printer Repair Hero"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 40%, #0c2a5a 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,96,214,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">⭐ 4.9 Google Rating</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ No Fix = No Fee</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🇺🇸 All 50 States</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">⚡ Avg Fix: 20 Min</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              HP Printer Repair
              <span className="block text-blue-300 mt-1">Near You — Remote &amp; Same-Day</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              HP DeskJet offline? Error OXc19a0035? OfficeJet Pro won&apos;t print?
              Our certified technicians fix <strong className="text-white">HP printers remotely</strong> in
              an average of 20 minutes — from $49. Available 24/7 across all 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call Now — 347-953-1531
              </a>
              <a href="#hp-diagnosis" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Diagnose My HP Free
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">No appointment needed · Avg callback under 5 min · Open 24/7</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[{ n: "20 min", label: "Average fix time" }, { n: "$49", label: "Starting price" }, { n: "94%", label: "Remote success rate" }, { n: "47+", label: "5-star reviews" }].map(({ n, label }) => (
              <div key={label} className="text-center py-4 px-3 rounded-2xl bg-white/8 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-blue-300">{n}</div>
                <div className="text-xs text-blue-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON ERRORS */}
      <section aria-label="Common HP Printer Errors" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Most Common HP Printer Errors We Fix</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">These are the HP printer problems customers search for every day. All fixed remotely.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HP_ERRORS.map(({ code, fix, urgent }) => (
              <a key={code} href="#hp-diagnosis" className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${urgent ? "bg-red-100" : "bg-blue-100"}`}>{urgent ? "🔴" : "🔧"}</div>
                <div>
                  <p className="font-black text-gray-900 group-hover:text-blue-700 transition-colors">{code}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{fix}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="hp-diagnosis" aria-label="HP Printer Diagnosis Tool" className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis Tool</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s Wrong With Your HP Printer?</h2>
            <p className="text-gray-500">Select your issue — get a step-by-step fix guide instantly, powered by 10,000+ HP repair records.</p>
          </div>
          <TechER brandFilter="HP" pageTrending={HP_TRENDING} />
        </div>
      </section>

      {/* SUPPORTED MODELS */}
      <section aria-label="HP Models We Repair" className="bg-gradient-to-b from-gray-50 to-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">HP Printer Models We Repair</h2>
            <p className="text-gray-500">Every current HP DeskJet, ENVY, OfficeJet Pro, and LaserJet model supported</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HP_MODELS.map(({ name, issue }) => (
              <div key={name} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div className="text-2xl mb-2">🖨️</div>
                <p className="font-black text-gray-900 text-sm">{name}</p>
                <p className="text-xs text-gray-400 mt-1">{issue}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">Don&apos;t see your model? <a href="tel:+13479531531" className="text-blue-600 font-bold hover:underline">Call us — we repair all HP models</a></p>
        </div>
      </section>

      {/* HP PRINTER SUPPORT — Keyword Section */}
      <section aria-label="HP Printer Support Services" className="bg-blue-950 text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">HP Printer Support — What We Cover</h2>
            <p className="text-blue-300">Complete HP printer support for every model and every problem</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "HP Printer Offline Fix", body: "The most common HP support call. We reset the printer's network connection, clear the offline flag in Windows, and reinstall HP Smart — usually resolved in 8–15 minutes.", tag: "hp printer support" },
              { title: "HP Error Code Diagnosis", body: "OXc19a0035, 0x6100004a, 0xc19a0035 and more — we know every HP error code and the fastest fix for each. 88% are resolved without any hardware replacement.", tag: "hp printer error code" },
              { title: "HP WiFi & Network Setup", body: "HP DeskJet and OfficeJet Pro WiFi issues fixed remotely. We set up HP on 2.4GHz networks, troubleshoot IP conflicts, and reinstall HP Smart app drivers.", tag: "hp printer wifi" },
              { title: "HP Driver Reinstall (Windows 11)", body: "Windows 11 updates frequently break HP printer drivers. We uninstall old drivers, download the correct package from hp.com, and rebuild the connection from scratch.", tag: "hp printer driver" },
              { title: "HP Ink Cartridge Errors", body: "HP cartridge not recognized, HP 952 ink error, incompatible ink messages — we diagnose whether it's a chip issue, firmware block, or genuine cartridge fault, and fix it remotely.", tag: "hp ink cartridge" },
              { title: "HP Print Queue Stuck", body: "Documents stuck in the print queue and printer won't clear them? We restart the Windows Print Spooler service, delete the stuck jobs, and restore normal printing — 10 minutes.", tag: "hp print queue" },
            ].map(({ title, body, tag }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-black text-white text-lg">{title}</h3>
                  <span className="text-xs bg-blue-700/50 text-blue-200 px-2 py-1 rounded-lg shrink-0">{tag}</span>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY GUIDE */}
      <section aria-label="How to Fix HP Printer Offline" className="bg-gray-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-blue-400 border border-blue-700 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">DIY Guide</span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Fix HP Printer Offline — Step by Step</h2>
            <p className="text-gray-400">94% of HP offline errors are fixed with these steps. If yours persists, call us.</p>
          </div>
          <ol className="space-y-4">
            {[
              { step: 1, title: "Full power cycle — printer and router", detail: "Power off your HP printer. Unplug the power cord from the wall for 30 seconds. Unplug your WiFi router too. Plug in the router first, wait 60 seconds until all lights stabilize, then power on the HP printer." },
              { step: 2, title: "Remove the 'Use Printer Offline' flag", detail: "Windows: Start → Settings → Bluetooth & Devices → Printers & Scanners. Click your HP printer → Open print queue → Printer menu at the top → uncheck 'Use Printer Offline'." },
              { step: 3, title: "Set HP as the default printer", detail: "In Printers & Scanners, click your HP printer → Set as Default. This prevents Windows from routing jobs to another printer instead." },
              { step: 4, title: "Print a test page", detail: "Click your HP printer → Printer Properties → Print Test Page. If it prints, you're done! If not, continue to step 5." },
              { step: 5, title: "Reinstall via HP Smart app", detail: "Visit 123.hp.com. Enter your printer model number. Download HP Smart. During setup, choose 'Wireless' setup option. This creates a completely fresh network connection and reinstalls all drivers." },
            ].map(({ step, title, detail }) => (
              <li key={step} className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-base font-black shrink-0">{step}</div>
                <div>
                  <p className="font-black text-white text-base mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 p-5 rounded-2xl bg-red-900/40 border border-red-700/40 text-center">
            <p className="text-white font-bold mb-3">Still showing offline after all 5 steps?</p>
            <a href="tel:+13479531531" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-6 rounded-xl transition-colors">📞 Call Now — We Fix It in 15 Min</a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section aria-label="HP Printer Repair Reviews" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">What Customers Say About Our HP Repair</h2>
            <p className="text-gray-400">4.9 ⭐ average from 47+ verified Google reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map(({ name, text, rating }) => (
              <div key={name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex gap-1 mb-3">{Array(rating).fill("⭐").map((s, i) => <span key={i}>{s}</span>)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <p className="font-black text-gray-900 text-sm">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="HP Printer Repair FAQ" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">HP Printer Repair — Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How do I fix my HP printer showing offline?", a: "Restart both your HP printer and WiFi router. In Windows Settings → Printers & Scanners, open the print queue and uncheck 'Use Printer Offline' from the Printer menu. If still offline, reinstall via HP Smart at 123.hp.com. Trini System fixes HP offline errors remotely in 15 minutes — call 347-953-1531." },
              { q: "What is HP printer error OXc19a0035 and how do I fix it?", a: "Error OXc19a0035 is an ink system failure. Remove all ink cartridges, wait 60 seconds, reinstall firmly until they click. If the error persists, our technicians resolve this remotely in about 20 minutes without hardware replacement. Call 347-953-1531." },
              { q: "Why won't my HP DeskJet connect to WiFi?", a: "HP DeskJet WiFi failures usually stem from a stale IP address or router channel conflict. Restart both devices. On the printer, hold the Wireless button until blinking, then press your router's WPS button within 2 minutes. Alternatively, use HP Smart app to run a fresh wireless setup. We fix this remotely in 15 minutes." },
              { q: "How much does HP printer repair cost?", a: "HP printer repair starts at $49 — approximately 50% less than Geek Squad ($100–$200). Most HP issues are resolved in one 30-minute session. No fix = no fee. You only pay when your HP printer is fully working." },
              { q: "Can HP LaserJet issues be fixed remotely?", a: "Yes. HP LaserJet driver errors, offline issues, firmware problems, and print queue issues are all fixed remotely. We've resolved hundreds of HP LaserJet M404n, Pro M454dw, and M210dw issues without the customer dropping off any hardware." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-100 bg-white overflow-hidden">
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

      {/* CITATIONS */}
      <section aria-label="HP Repair Service Credentials" className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Verified On</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60 mb-4">
            {["Google Business Profile", "Yelp", "Facebook", "YouTube", "TikTok", "Google Sites"].map((r) => (
              <span key={r} className="text-sm font-bold text-gray-500">{r}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Trini System LLC is a registered tech support company in Corona, Queens, New York. Serving customers since 2016.
            4.9-star Google rating based on 47+ verified reviews. HP®, DeskJet®, OfficeJet®, ENVY®, and LaserJet® are
            registered trademarks of HP Inc. Trini System LLC is an independent repair provider, not affiliated with or endorsed by HP Inc.
          </p>
        </div>
      </section>

      {/* RELATED PAGES — Internal Link Sculpting */}
      <section aria-label="Related HP Services" className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related HP Resources</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/hp-printer-service" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Printer Service & Support</Link>
            <Link href="/printer-repair-near-me" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Printer Repair Near Me</Link>
            <Link href="/fix-printer/hp/offline" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Printer Offline Fix</Link>
            <Link href="/fix-printer/hp/error-code" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Error Code Fix</Link>
            <Link href="/fix-printer/hp/wifi-setup" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP WiFi Setup</Link>
            <Link href="/printer-support" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">All Printer Support</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Get HP Printer Fixed Today" style={{ background: "linear-gradient(135deg, #0a0f1e, #0c2a5a)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🖨️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your HP Printer Fixed Today</h2>
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
