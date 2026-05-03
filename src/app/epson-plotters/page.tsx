import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Epson Plotters Service & Repair — SureColor Pro",
  description:
    "Epson plotter service for SureColor T3170, T5170, P5000, P7000, P9000 & F570. Banding, head clean, calibration, color profiles. From $79. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/epson-plotters" },
  openGraph: {
    title: "Epson Plotters Service & Repair — SureColor Pro | Trini System",
    description: "Epson plotter & SureColor repair. Banding, head clean, color setup. From $79. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/epson-plotters",
    type: "website",
  },
  keywords: [
    "epson plotters",
    "epson plotter service",
    "epson plotter repair",
    "epson surecolor repair",
    "epson surecolor t3170 repair",
    "epson surecolor t5170 service",
    "epson p5000 repair",
    "epson p7000 banding fix",
    "epson p9000 head clean",
    "epson f570 service",
    "epson plotter setup",
    "epson plotter calibration",
    "wide format printer repair",
    "epson plotter driver windows 11",
    "architect plotter service",
    "photo plotter repair",
    "epson plotter color profile",
    "epson surecolor banding fix",
  ],
};

const PLOTTER_MODELS = [
  { model: "SureColor T3170", category: "24\" CAD/Architecture", market: "Architects, engineers, builders", common: "Banding, head clean, AutoCAD driver, color profile" },
  { model: "SureColor T5170", category: "36\" CAD/Architecture", market: "Architecture firms, AEC industry", common: "Roll feed jam, head alignment, network setup" },
  { model: "SureColor P5000", category: "17\" Photo / Fine Art", market: "Photographers, fine art studios", common: "Print head clog, ICC profile install, color drift" },
  { model: "SureColor P700 / P900", category: "13\" / 17\" Photo", market: "Pro photographers, makers", common: "Head clean, ink starvation, paper feed errors" },
  { model: "SureColor P7000 / P9000", category: "24\" / 44\" Pro Photo", market: "Print labs, gallery shops", common: "Banding, color calibration, firmware update" },
  { model: "SureColor F570 / F6470", category: "24\" / 44\" Dye-Sub", market: "Apparel, sublimation shops", common: "Head clean, transfer paper feed, RIP setup" },
  { model: "SureColor F9470 / F11070", category: "64\" / 76\" Production", market: "Large-format production shops", common: "Head replacement, ink line purge, network/RIP" },
  { model: "Stylus Pro 7900 / 9900", category: "Legacy 24\" / 44\"", market: "Long-tail pro studios", common: "Discontinued driver Windows 11, banding, head" },
];

const PLOTTER_ISSUES = [
  { issue: "Banding (lines across prints)", cause: "Clogged head, mis-calibrated alignment, low ink in one channel", time: "30–60 min", price: "$79–$149" },
  { issue: "Print head clog / no ink flow", cause: "Heavy/light power-clean cycles, head-soak procedure, ink line check", time: "45–90 min", price: "$99–$179" },
  { issue: "Color drift / mismatched output", cause: "ICC profile install, paper preset reload, print-driver color mode", time: "30–45 min", price: "$79–$129" },
  { issue: "Plotter driver / Windows 11 fail", cause: "Reinstall full driver from epson.com, set static IP, network port reset", time: "30–60 min", price: "$79–$129" },
  { issue: "Roll-feed paper jam / skew", cause: "Roll holder check, sensor cleaning, paper preset match", time: "20–45 min", price: "$79" },
  { issue: "Ink replacement / waste-ink full", cause: "Replace cartridge, reset waste-ink pad counter (firmware-level)", time: "30–60 min", price: "$99–$199" },
  { issue: "Network / RIP printer offline", cause: "Static IP assignment, AD share fix, firewall port 9100, RIP queue", time: "30–60 min", price: "$99–$149" },
  { issue: "Firmware update failed", cause: "USB recovery via Epson Service Tool, recovery firmware re-flash", time: "60–120 min", price: "$129–$249" },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "Epson Plotters", item: "https://trinisystem.vercel.app/epson-plotters" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Epson Plotter & SureColor Service",
    description: "Professional repair, calibration, and setup of Epson plotters and SureColor wide-format printers — for architecture firms, photographers, print labs, and apparel shops.",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Wide-Format Plotter Repair",
    offers: { "@type": "Offer", price: "79", priceCurrency: "USD", description: "Starting price for Epson plotter remote service" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What Epson plotter models do you service?",
        acceptedAnswer: { "@type": "Answer", text: "We service the full Epson SureColor line: T-Series CAD plotters (T3170, T5170, T7270), P-Series photo printers (P700, P900, P5000, P7000, P9000), F-Series dye-sublimation (F570, F6470, F9470, F11070), and legacy Stylus Pro models (7900, 9900). Call 347-953-1531." } },
      { "@type": "Question", name: "Can you fix banding on my Epson plotter remotely?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. About 75% of Epson plotter banding is fixed remotely by guided power-clean cycles, head alignment, and paper preset reload. We remote into your control PC and walk through the procedure step-by-step. If the head needs physical service, we recommend the closest Epson-authorized partner." } },
      { "@type": "Question", name: "How much does Epson plotter repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Remote plotter service starts at $79 (vs $200+ for in-person plotter techs). Complex jobs like waste-ink reset, firmware recovery, or RIP setup range $129–$249. We quote before any work begins. No fix = no fee." } },
      { "@type": "Question", name: "Do you support architecture firms with Epson T-series CAD plotters?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Architecture firms, civil engineers, and AEC professionals are our core plotter clients. We handle T3170 and T5170 setup, AutoCAD/Revit driver install, network share configuration, and ongoing maintenance contracts." } },
      { "@type": "Question", name: "Can you install ICC profiles for my SureColor P-series?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. ICC profile install is a routine remote job for P700, P900, P5000, P7000, and P9000 photo plotters. We handle paper-specific profiles from Hahnemühle, Canson, Epson Signature Worthy, and custom-built profiles from spectrophotometer measurements you provide." } },
      { "@type": "Question", name: "Do you fix discontinued/legacy Epson plotters like Stylus Pro 7900?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — and we&apos;re one of the few remote services that still does. We have working Windows 11 drivers archived for Stylus Pro 7900, 9900, and earlier models, plus the Epson Service Tool for waste-ink resets. Hardware-only failures may require parts sourcing." } },
    ],
  },
];

export default function EpsonPlottersPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-cyan-700 to-blue-700 text-white py-3 text-center text-sm font-semibold">
        🖼️ Epson Plotters & SureColor Service ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">Call 347-953-1531</a>
        {" "}· From $79
      </div>

      {/* HERO */}
      <section
        aria-label="Epson Plotters Hero"
        style={{ background: "linear-gradient(135deg, #061a2b 0%, #0a2d4a 40%, #0e3f66 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">📐 T-Series CAD</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">📷 P-Series Photo</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">👕 F-Series Dye-Sub</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">⏳ Legacy Pro Series</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Epson Plotters Service
              <span className="block text-cyan-300 mt-1">SureColor · Stylus Pro · CAD · Photo</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Banding? Driver fail on Windows 11? ICC profile setup? Print head clog?
              We service <strong className="text-white">every Epson SureColor and Stylus Pro plotter</strong> remotely or on-site.
              Trusted by architecture firms, photo studios, and print labs nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call Plotter Tech — 347-953-1531
              </a>
              <a href="#diagnosis" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Diagnose My Plotter
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">From $79 · 75% remote-fix rate · Same-day response</p>
          </div>
        </div>
      </section>

      {/* MODELS GRID */}
      <section aria-label="Epson Plotter Models" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Every Epson Plotter Model — Serviced</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From entry-level T3170 to production F11070 — and discontinued Stylus Pro models that other repair shops won&apos;t touch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLOTTER_MODELS.map(({ model, category, market, common }) => (
              <div key={model} className="p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-cyan-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg">Epson {model}</h3>
                    <p className="text-xs text-cyan-700 font-bold mt-0.5">{category}</p>
                  </div>
                  <span className="text-2xl">🖨️</span>
                </div>
                <p className="text-xs text-gray-500 mb-2"><strong>Used by:</strong> {market}</p>
                <p className="text-xs text-gray-600 leading-relaxed"><strong>Common issues:</strong> {common}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON PLOTTER ISSUES */}
      <section aria-label="Common Plotter Issues" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Plotter Problems We Solve Daily</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Real Epson plotter issues with real fix times and prices — no hidden fees.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden text-left">
              <thead className="bg-cyan-950 text-white">
                <tr>
                  <th className="p-4 text-sm font-black">Issue</th>
                  <th className="p-4 text-sm font-black hidden md:table-cell">What We Do</th>
                  <th className="p-4 text-sm font-black">Fix Time</th>
                  <th className="p-4 text-sm font-black">Price</th>
                </tr>
              </thead>
              <tbody>
                {PLOTTER_ISSUES.map(({ issue, cause, time, price }, i) => (
                  <tr key={issue} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-4 text-sm font-bold text-gray-900">{issue}</td>
                    <td className="p-4 text-xs text-gray-600 hidden md:table-cell">{cause}</td>
                    <td className="p-4 text-xs text-gray-600 whitespace-nowrap">⏱ {time}</td>
                    <td className="p-4 text-sm font-black text-emerald-700 whitespace-nowrap">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">No fix = no fee. Quote provided before any work begins.</p>
        </div>
      </section>

      {/* WHY US */}
      <section aria-label="Why Trini System for Plotters" className="bg-cyan-950 text-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Why Architecture Firms & Studios Trust Us</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">Plotters are too critical to leave with a generic printer shop. We specialize.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🎯", title: "Plotter-Specialist Tech", body: "Our team has serviced Epson SureColor, Stylus Pro, and HP DesignJet daily for 8+ years. We know the quirks of each model — power-clean limits, head-pause durations, firmware bugs." },
              { icon: "💼", title: "Built for Pro Workflows", body: "We support AutoCAD, Revit, ArchiCAD, Photoshop, Lightroom, Capture One, and major RIP software (Onyx, Caldera, Wasatch). We don't just install drivers — we make them work in your pipeline." },
              { icon: "📦", title: "Maintenance Contracts", body: "Architecture firms and print shops can purchase quarterly maintenance contracts — head cleaning, alignment, firmware updates — at a fixed annual rate. Prevents 80% of emergency calls." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{title}</h3>
                <p className="text-cyan-200 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="diagnosis" aria-label="Plotter Diagnosis" className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-cyan-700 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Tell Us About Your Plotter</h2>
            <p className="text-gray-500">Select Epson, then tell us your model and problem — we&apos;ll give you a diagnosis and quote.</p>
          </div>
          <TechER brandFilter="Epson" />
        </div>
      </section>

      {/* CASE STUDIES */}
      <section aria-label="Plotter Case Studies" className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Recent Plotter Service Wins</h2>
            <p className="text-gray-500">Real examples of plotter problems we&apos;ve solved this year.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { firm: "NYC Architecture Firm", model: "SureColor T5170", problem: "T5170 was producing visible banding on construction documents. Site couldn't print bids on time.", fix: "Remote session: ran 3 medium head-clean cycles, head alignment, and reset paper preset for bond paper. Banding eliminated. 40 min total. $99 flat fee.", outcome: "Firm now on quarterly maintenance contract." },
              { firm: "Portland Photo Studio", model: "SureColor P9000", problem: "Color drift on fine-art prints — gallery rejected 3 batches before client called.", fix: "Reinstalled custom ICC profiles for Hahnemühle Photo Rag and Canson Baryta. Updated firmware. Verified output against reference targets.", outcome: "Studio passes color match on first print every time now." },
              { firm: "Apparel Shop, Texas", model: "SureColor F570", problem: "F570 dye-sub plotter wouldn't push transfer paper without skewing.", fix: "Cleaned paper-feed sensors, reset roll holder pressure, updated RIP queue settings.", outcome: "Throughput increased 30%; shop avoided $1,200 service call." },
            ].map(({ firm, model, problem, fix, outcome }) => (
              <div key={firm} className="p-6 rounded-2xl bg-white border-2 border-gray-100">
                <p className="text-xs font-black text-cyan-700 uppercase tracking-widest mb-1">{firm}</p>
                <p className="text-sm font-mono text-gray-500 mb-4">{model}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-black text-red-700">PROBLEM</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-blue-700">FIX</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{fix}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-700">OUTCOME</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Epson Plotters FAQ" className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Epson Plotters — FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What Epson plotter models do you service?", a: "Full SureColor line: T3170, T5170, T7270 (CAD); P700, P900, P5000, P7000, P9000 (photo); F570, F6470, F9470, F11070 (dye-sub). Plus discontinued Stylus Pro 7900, 9900, 9890. Call 347-953-1531." },
              { q: "Can banding really be fixed remotely?", a: "Yes — 75% of plotter banding is software/calibration, not hardware. Head-clean cycles, head alignment, paper preset reload, and ICC profile fixes are all remote-friendly. Only physical head failures require on-site service." },
              { q: "Do you support architecture/AEC workflows?", a: "Yes. AutoCAD, Revit, ArchiCAD, Bluebeam — we install plotter drivers correctly for each. We also handle network share configs for multi-architect offices and color-matched output between multiple T-series plotters." },
              { q: "Do you install ICC profiles for photo plotters?", a: "Yes. ICC profile install is routine. We work with Hahnemühle, Canson, Epson Signature Worthy, Red River, and custom-built profiles. We can also help you create profiles if you have an X-Rite i1 or similar spectrophotometer." },
              { q: "How fast is plotter service?", a: "Remote plotter sessions usually 30–60 minutes. On-site service in NYC tri-state is same-day or next-day for hardware-only issues. Phone callback typically under 5 minutes." },
              { q: "How much does plotter repair cost?", a: "Remote: starts at $79 (driver, calibration, banding). Complex jobs $129–$249 (firmware recovery, waste-ink reset, RIP integration). On-site service starts at $149 trip + labor. We quote before any work begins." },
              { q: "Do you handle waste-ink pad resets?", a: "Yes. Waste-ink pad full errors on plotters are reset using the Epson Adjustment Program at firmware level. We&apos;ve done hundreds. Note: if your plotter is past 80,000 page count, we&apos;ll recommend physical pad replacement." },
              { q: "Do you offer maintenance contracts?", a: "Yes. Quarterly maintenance contracts for architecture firms and print shops include head cleaning, alignment verification, firmware updates, and priority callback. Pricing scales with plotter count. Email or call for quote." },
            ].map(({ q, a }, i) => (
              <details key={i} className="group rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-gray-900 hover:text-cyan-700 transition-colors list-none">
                  <span>{q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4">▼</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-label="Plotter Service CTA" style={{ background: "linear-gradient(135deg, #061a2b, #0e3f66)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🖼️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your Epson Plotter Working</h2>
          <p className="text-cyan-200 text-lg mb-8">SureColor · Stylus Pro · CAD · Photo · Dye-Sub · Production</p>
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
