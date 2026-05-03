import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Epson Service NYC — EcoTank, WorkForce Repair",
  description:
    "Epson service NYC — fast remote repair for EcoTank, WorkForce, SureColor & plotters in Manhattan, Queens, Brooklyn, Bronx. From $49. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/epson-service-nyc" },
  openGraph: {
    title: "Epson Service NYC — EcoTank, WorkForce Repair | Trini System",
    description: "Epson printer & plotter service across NYC. Remote repair in 15 min. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/epson-service-nyc",
    type: "website",
  },
  keywords: [
    "epson service nyc",
    "epson service new york",
    "epson printer service nyc",
    "epson printer repair nyc",
    "epson printer repair manhattan",
    "epson printer repair brooklyn",
    "epson printer repair queens",
    "epson printer repair bronx",
    "epson ecotank service nyc",
    "epson workforce repair nyc",
    "epson plotter service nyc",
    "epson surecolor repair nyc",
    "epson printer technician new york",
    "epson printer near me nyc",
    "fix epson printer new york",
    "epson printer support new york",
  ],
};

const NYC_BOROUGHS = [
  { name: "Manhattan", zips: "10001 – 10282", examples: "Midtown, FiDi, UES, UWS, Harlem, Chelsea, SoHo" },
  { name: "Queens", zips: "11001 – 11697", examples: "Corona, Astoria, Flushing, LIC, Forest Hills, Jackson Heights" },
  { name: "Brooklyn", zips: "11201 – 11256", examples: "Williamsburg, Park Slope, DUMBO, Bushwick, Bay Ridge" },
  { name: "Bronx", zips: "10451 – 10475", examples: "Riverdale, Fordham, Belmont, Throgs Neck" },
  { name: "Staten Island", zips: "10301 – 10314", examples: "St. George, New Dorp, Tottenville" },
];

const EPSON_LINES = [
  { line: "EcoTank", icon: "💧", models: "ET-2720, ET-3850, ET-4760, ET-2800, ET-15000", common: "Ink system error, sensor reset, print head clean" },
  { line: "WorkForce", icon: "💼", models: "WF-7720, WF-2930, WF-3820, WF-7840, WF-7310", common: "Office network setup, scan, duplex, fax" },
  { line: "Expression", icon: "🎨", models: "XP-7100, XP-4105, XP-15000, XP-970", common: "Photo quality, CD/DVD print, ink errors" },
  { line: "SureColor", icon: "🖼️", models: "P700, P900, P5000, T3170, T5170, F570", common: "Plotter calibration, head clean, print head replace" },
  { line: "Stylus / Pro", icon: "🖨️", models: "Stylus C88+, Pro 7900, Pro 9900", common: "Legacy driver, Windows 11 install, banding fix" },
  { line: "L-Series Tank", icon: "🪣", models: "L3150, L3250, L4260, L6190, L8050", common: "Ink reset, waste ink pad, firmware update" },
];

const NYC_SCENARIOS = [
  { title: "Manhattan Office WorkForce Setup", body: "Just moved into new office space in FiDi or Midtown? We set up Epson WorkForce for your AD/network domain, configure Mac and Windows users, install scan-to-email, and verify firewall rules. Most NYC office setups done in one 45-minute session." },
  { title: "Queens Home EcoTank Ink Error", body: "Corona, Flushing, Jackson Heights — EcoTank ink system errors on full tanks are our most common Queens call. Sensor calibration is fixed remotely in 15 minutes via the Epson Adjustment Program. No printer repair shop trip needed." },
  { title: "Brooklyn Studio Plotter / SureColor", body: "Photographers and architects in DUMBO, Williamsburg, and Park Slope rely on Epson SureColor P700/P900 and P5000. We handle banding fixes, head alignment, color profile install, and Windows 11 driver issues remotely or via on-site visit (Brooklyn only)." },
  { title: "Bronx & SI Home Office Support", body: "Working from home in Riverdale, Throgs Neck, or St. George? We diagnose Epson WiFi failures, driver corruption after Windows 11 updates, and offline errors over a secure remote session. Same flat $49 rate." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "Epson Service NYC", item: "https://trinisystem.vercel.app/epson-service-nyc" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://trinisystem.vercel.app/epson-service-nyc#business",
    name: "Trini System LLC — Epson Service NYC",
    image: "https://trinisystem.vercel.app/og-image.png",
    telephone: "+13479531531",
    url: "https://trinisystem.vercel.app/epson-service-nyc",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "52-09 99th St Apt 8S",
      addressLocality: "Corona",
      addressRegion: "NY",
      postalCode: "11368",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 40.7459, longitude: -73.8618 },
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "City", name: "Manhattan" },
      { "@type": "City", name: "Queens" },
      { "@type": "City", name: "Brooklyn" },
      { "@type": "City", name: "Bronx" },
      { "@type": "City", name: "Staten Island" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epson Printer Service in New York City",
    description: "Remote and on-site Epson printer service across the five boroughs of NYC. EcoTank, WorkForce, SureColor, and plotter repair.",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: { "@type": "City", name: "New York City" },
    serviceType: "Epson Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Do you offer Epson service in Manhattan?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. We provide Epson printer service to all of Manhattan — Midtown, FiDi, Upper East Side, Upper West Side, Harlem, Chelsea, SoHo, Tribeca, and beyond. Most issues are fixed remotely in 15–25 minutes. On-site visits are available for hardware-only issues." } },
      { "@type": "Question", name: "Do you fix Epson plotters in NYC?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. We service Epson SureColor plotters (T3170, T5170, P5000, P7000, P9000, F570, F9470) for architects, photographers, and print shops across NYC. Plotter calibration, head cleaning, and color profile setup are routine for our team. Call 347-953-1531." } },
      { "@type": "Question", name: "How fast is Epson service in NYC?",
        acceptedAnswer: { "@type": "Answer", text: "Remote Epson service in NYC is typically completed in 15–25 minutes once we connect. On-site visits within Queens or Manhattan can usually be scheduled same-day or next-day. Average phone callback is under 5 minutes." } },
      { "@type": "Question", name: "How much does Epson service cost in NYC?",
        acceptedAnswer: { "@type": "Answer", text: "Remote Epson service starts at $49 — significantly less than NYC big-box repair (Geek Squad $149+) or in-shop drop-off ($120–$180). Plotter and SureColor service has higher rates ($79–$149 depending on issue). No fix = no fee." } },
      { "@type": "Question", name: "Where is your NYC office?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System LLC is headquartered at 52-09 99th St Apt 8S, Corona, Queens, NY 11368. We've operated from Queens since 2016 and serve all five NYC boroughs plus the surrounding tri-state area." } },
    ],
  },
];

export default function EpsonServiceNYCPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 text-center text-sm font-semibold">
        🗽 Epson Service NYC — All 5 Boroughs ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">Call 347-953-1531</a>
        {" "}· Same Day · From $49
      </div>

      {/* HERO */}
      <section
        aria-label="Epson Service NYC Hero"
        style={{ background: "linear-gradient(135deg, #051a30 0%, #0a2747 40%, #103a66 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,122,184,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🗽 Based in Corona, Queens</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ All 5 Boroughs</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">⭐ 4.9 / 47 Reviews</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">⚡ 15-Min Avg Fix</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Epson Service NYC
              <span className="block text-blue-300 mt-1">EcoTank · WorkForce · SureColor</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Trusted Epson service in <strong className="text-white">Manhattan, Queens, Brooklyn, Bronx, and Staten Island</strong> since
              2016. Remote repair in 15 minutes — on-site visits available for hardware issues. From $49.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call NYC Office — 347-953-1531
              </a>
              <a href="#diagnosis" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Free Diagnosis
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">Avg pickup under 5 min · 24/7 · Hablamos español</p>
          </div>
        </div>
      </section>

      {/* BOROUGHS COVERAGE */}
      <section aria-label="NYC Boroughs Served" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Epson Service Across All 5 NYC Boroughs</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Same fast remote service no matter your borough or neighborhood.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {NYC_BOROUGHS.map(({ name, zips, examples }) => (
              <div key={name} className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-100 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-2xl mb-2">🗽</div>
                <h3 className="font-black text-blue-900 text-lg mb-1">{name}</h3>
                <p className="text-xs text-blue-700 font-mono mb-2">{zips}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EPSON PRODUCT LINES */}
      <section aria-label="Epson Lines We Service" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">All Epson Product Lines Serviced</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Home printers, office workhorses, photo printers, plotters — we cover them all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EPSON_LINES.map(({ line, icon, models, common }) => (
              <div key={line} className="p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="font-black text-gray-900 text-lg">Epson {line}</h3>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-3">{models}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{common}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/epson-plotters" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
              See dedicated Epson plotter service →
            </Link>
          </div>
        </div>
      </section>

      {/* NYC SCENARIOS */}
      <section aria-label="NYC Customer Scenarios" className="bg-blue-950 text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Real NYC Epson Service Calls We Handle Daily</h2>
            <p className="text-blue-300 max-w-2xl mx-auto">Common Epson scenarios across the five boroughs — every one fixed remotely or on-site.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NYC_SCENARIOS.map(({ title, body }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="font-black text-white text-lg mb-3">{title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="diagnosis" aria-label="Free Epson Diagnosis Tool" className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis Tool</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What&apos;s Wrong With Your Epson?</h2>
            <p className="text-gray-500">Tell us your model and issue — get an instant fix guide.</p>
          </div>
          <TechER brandFilter="Epson" />
        </div>
      </section>

      {/* HOW IT WORKS — NYC FOCUSED */}
      <section aria-label="How NYC Service Works" className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How Our NYC Epson Service Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From phone call to working printer in 30 minutes.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, icon: "📞", title: "Call NYC office", detail: "Dial 347-953-1531. NYC line picks up in under 5 min, 24/7. Hablamos español." },
              { step: 2, icon: "🔍", title: "Free diagnosis", detail: "Describe your Epson issue. We confirm if remote fix works (93% of cases) or schedule on-site." },
              { step: 3, icon: "💻", title: "Remote OR on-site", detail: "Software issues — secure remote session. Hardware issues — on-site visit in Queens, Manhattan, Brooklyn, BX, SI." },
              { step: 4, icon: "✅", title: "Pay only when fixed", detail: "Remote starts at $49. On-site labor priced before work begins. No fix = no fee." },
            ].map(({ step, icon, title, detail }) => (
              <div key={step} className="p-5 rounded-2xl bg-white border-2 border-gray-100 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-xs font-black text-blue-600 mb-1">STEP {step}</div>
                <h3 className="font-black text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NYC REVIEWS */}
      <section aria-label="NYC Epson Service Reviews" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">NYC Customers on Our Epson Service</h2>
            <p className="text-gray-400">4.9 ⭐ — verified Google reviews from across the five boroughs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Daniel R.", text: "Epson EcoTank ink error in my Astoria apartment. Trini System fixed it remotely in 12 minutes. Way better than schlepping to a Manhattan repair shop.", loc: "Astoria, Queens", model: "EcoTank ET-2720" },
              { name: "Sarah L.", text: "Architecture studio in DUMBO. Our SureColor T3170 plotter stopped printing properly. Trini came on-site, recalibrated the heads, and fixed banding issues. Fast and professional.", loc: "DUMBO, Brooklyn", model: "SureColor T3170" },
              { name: "Maria V.", text: "WorkForce WF-7720 wouldn't connect to our office network in Midtown. Tech logged in, fixed firewall rules, set up scan-to-email for 8 employees. Fantastic.", loc: "Midtown, Manhattan", model: "WorkForce WF-7720" },
            ].map(({ name, text, loc, model }) => (
              <div key={name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex gap-1 mb-3">{Array(5).fill("⭐").map((s, i) => <span key={i}>{s}</span>)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div>
                  <p className="font-black text-gray-900 text-sm">— {name}</p>
                  <p className="text-xs text-gray-400">{loc} · {model}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Epson Service NYC FAQ" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Epson Service NYC — FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Where is Trini System's NYC office located?", a: "We're headquartered at 52-09 99th St, Corona, Queens NY 11368. We've operated from Queens since 2016. Most NYC service is delivered remotely, with on-site available for hardware issues across all five boroughs." },
              { q: "Do you fix Epson plotters in Manhattan?", a: "Yes. We service Epson SureColor plotters (T3170, T5170, P5000, P7000, P9000, F570) for architecture firms, photo studios, and print shops across Manhattan — Midtown, FiDi, Chelsea, SoHo, Tribeca. See our /epson-plotters page for plotter-specific service." },
              { q: "How fast is on-site Epson service in NYC?", a: "Same-day or next-day on-site service is typically available for Manhattan, Queens, and Brooklyn. Bronx and Staten Island are scheduled within 1–2 business days. Remote service is available immediately, 24/7." },
              { q: "Do you charge an NYC trip fee?", a: "Remote Epson service is flat $49 — no trip fee. On-site visits within NYC start at $79 trip fee + labor (which is quoted before any work begins). Plotter on-site service starts at $149." },
              { q: "What's the most common Epson issue in NYC?", a: "Top three calls in 2025: (1) EcoTank ink system errors on full tanks (sensor calibration), (2) WorkForce WiFi setup after building router changes, (3) SureColor plotter banding fixes for photographers and architects." },
              { q: "Can you set up a new Epson printer for our NYC office?", a: "Yes. We do new Epson printer installation, network configuration (AD/domain join, Mac and Windows users), driver deployment, scan-to-email setup, and user training. Most office setups complete in one 45–60 minute session." },
              { q: "Do you support Spanish-speaking customers?", a: "Sí. Hablamos español. Servicio técnico de impresoras Epson en español para todo NYC. Llame al 347-953-1531." },
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
      <section aria-label="NYC Service Credentials" className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Verified On</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60 mb-4">
            {["Google Business Profile", "Yelp NYC", "Facebook", "YouTube", "TikTok", "Google Sites"].map((r) => (
              <span key={r} className="text-sm font-bold text-gray-500">{r}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Trini System LLC is a registered tech support company in Corona, Queens, New York 11368. Serving NYC since 2016.
            Epson®, EcoTank®, WorkForce®, Expression®, and SureColor® are registered trademarks of Seiko Epson Corporation.
            Trini System LLC is an independent repair provider, not affiliated with or endorsed by Epson America Inc.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Get Epson Service NYC" style={{ background: "linear-gradient(135deg, #051a30, #103a66)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🗽</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">NYC Epson Service Today</h2>
          <p className="text-blue-200 text-lg mb-8">All 5 boroughs · Remote in 15 min · From $49 · No fix = no fee</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
              📞 347-953-1531
            </a>
            <Link href="/epson-printer-repair" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
              All Epson Models →
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
