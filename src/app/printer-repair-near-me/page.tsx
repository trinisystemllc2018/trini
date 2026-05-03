import type { Metadata } from "next";
import Link from "next/link";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Printer Repair Near Me — Same Day Remote Fix",
  description:
    "Printer repair near me — fix HP, Canon, Epson & Brother printers remotely in 15 minutes. All 50 states. From $49. No fix = no fee. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/printer-repair-near-me" },
  openGraph: {
    title: "Printer Repair Near Me — Same Day Remote Fix | Trini System",
    description: "Fix HP, Canon, Epson & Brother printers remotely. Same day. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/printer-repair-near-me",
    type: "website",
  },
  keywords: [
    "printer repair near me",
    "printer repair service near me",
    "hp printer repair near me",
    "canon printer repair near me",
    "epson printer repair near me",
    "brother printer repair near me",
    "printer technician near me",
    "printer repair shop near me",
    "fix my printer near me",
    "local printer repair",
    "printer repair company",
    "same day printer repair",
    "remote printer repair service",
    "best printer repair near me",
    "printer repair queens ny",
    "printer repair manhattan",
    "printer repair brooklyn",
    "printer repair bronx",
  ],
};

const CITIES_SERVED = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "Indianapolis, IN", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "Nashville, TN", "Memphis, TN", "Portland, OR", "Las Vegas, NV",
  "Atlanta, GA", "Miami, FL", "Tampa, FL", "Orlando, FL", "Minneapolis, MN",
  "Cleveland, OH", "Detroit, MI", "Sacramento, CA", "Kansas City, MO", "Pittsburgh, PA",
  "St. Louis, MO", "Cincinnati, OH", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM",
];

const NYC_NEIGHBORHOODS = [
  "Corona", "Queens", "Manhattan", "Brooklyn", "Bronx", "Staten Island",
  "Long Island City", "Astoria", "Flushing", "Jackson Heights", "Forest Hills",
  "Williamsburg", "Park Slope", "Bushwick", "Bay Ridge", "Bensonhurst",
];

const BRANDS = [
  { name: "HP", icon: "🔵", href: "/hp-printer-repair", desc: "DeskJet, OfficeJet, ENVY, LaserJet" },
  { name: "Canon", icon: "🔴", href: "/canon-printer-repair", desc: "PIXMA, imageCLASS, MAXIFY" },
  { name: "Epson", icon: "🟦", href: "/epson-printer-repair", desc: "EcoTank, WorkForce, Expression" },
  { name: "Brother", icon: "🟪", href: "/printer-support", desc: "MFC, HL, DCP series" },
];

const COMMON_ISSUES = [
  { issue: "Printer Showing Offline", brands: "HP, Canon, Epson, Brother", time: "8 min" },
  { issue: "Printer Won't Connect to WiFi", brands: "All brands", time: "12 min" },
  { issue: "Print Queue Stuck", brands: "All brands", time: "10 min" },
  { issue: "Driver Error / Windows 11 Issue", brands: "All brands", time: "15 min" },
  { issue: "Ink / Toner Cartridge Not Recognized", brands: "HP, Canon, Epson", time: "12 min" },
  { issue: "Canon B200 / Error 5100", brands: "Canon PIXMA", time: "25 min" },
  { issue: "Epson Ink System Error", brands: "Epson EcoTank, WorkForce", time: "15 min" },
  { issue: "HP Error OXc19a0035", brands: "HP DeskJet, ENVY", time: "20 min" },
  { issue: "Scan Function Not Working", brands: "All-in-one printers", time: "15 min" },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Printer Repair Near Me", item: "https://trinisystem.vercel.app/printer-repair-near-me" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://trinisystem.vercel.app/printer-repair-near-me#business",
    name: "Trini System LLC — Printer Repair",
    image: "https://trinisystem.vercel.app/og-image.png",
    telephone: "+13479531531",
    url: "https://trinisystem.vercel.app/printer-repair-near-me",
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
    areaServed: { "@type": "Country", name: "United States" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Printer Repair Service Near Me",
    description: "Same-day remote printer repair for HP, Canon, Epson, and Brother printers. Available 24/7 across all 50 US states.",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Remote printer repair starting at $49 — no fix no fee" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Where can I find printer repair near me?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System LLC offers remote printer repair near you — wherever you live in the United States. Because the service is 100% remote, there's no need to find a local shop, drop off your printer, or wait for an appointment. Call 347-953-1531 and we'll connect to your computer in minutes." } },
      { "@type": "Question", name: "How much does printer repair cost near me?",
        acceptedAnswer: { "@type": "Answer", text: "Most local printer repair shops charge $80–$200 plus drop-off and pickup. Trini System remote printer repair starts at $49 — about half the cost. No fix = no fee guaranteed. Compare to Geek Squad's $149+ minimum." } },
      { "@type": "Question", name: "Do you offer same-day printer repair near me?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Same-day printer repair is available 24/7. Most printer issues — offline errors, WiFi problems, driver issues, error codes — are fixed remotely in 15–25 minutes from the time you call. No appointment, no waiting." } },
      { "@type": "Question", name: "Which printer brands do you repair?",
        acceptedAnswer: { "@type": "Answer", text: "We repair HP (DeskJet, OfficeJet Pro, ENVY, LaserJet), Canon (PIXMA, imageCLASS, MAXIFY), Epson (EcoTank, WorkForce, Expression), and Brother (MFC, HL, DCP). Plus Lexmark, Xerox, Samsung, and Kyocera for business clients." } },
      { "@type": "Question", name: "Can you fix my printer if I don't live in New York?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. We're based in Corona, Queens NY but provide remote service across all 50 US states. Distance doesn't matter for remote repair — we connect to your computer and fix the printer software, drivers, and network settings while you watch." } },
      { "@type": "Question", name: "How does remote printer repair work?",
        acceptedAnswer: { "@type": "Answer", text: "1) Call 347-953-1531. 2) We diagnose your issue free over the phone. 3) If it needs hands-on work, we send a one-time secure remote-access link. 4) Our tech connects to your computer (you watch the entire time). 5) Issue fixed in 15–25 min average. 6) You only pay if it's working." } },
    ],
  },
];

export default function PrinterRepairNearMePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 text-center text-sm font-semibold">
        🖨️ Printer Repair Near Me — Available Now in All 50 States ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">Call 347-953-1531</a>
        {" "}· Same Day · From $49
      </div>

      {/* HERO */}
      <section
        aria-label="Printer Repair Near Me Hero"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 40%, #0c2a5a 100%)", position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,96,214,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">⭐ 4.9 Google · 47 Reviews</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">✅ No Fix = No Fee</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">🇺🇸 All 50 States</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">⚡ Avg 15-Min Fix</span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Printer Repair Near Me
              <span className="block text-blue-300 mt-1">Remote · Same Day · 24/7</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Stop searching for a local printer shop. <strong className="text-white">We fix HP, Canon, Epson, and Brother printers remotely</strong> from
              anywhere in the USA — usually in under 15 minutes. No drop-off, no appointment, no wait.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+13479531531" className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 30px rgba(220,38,38,0.5)" }}>
                📞 Call Now — 347-953-1531
              </a>
              <a href="#diagnosis" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all">
                🔧 Free Diagnosis Tool
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">No appointment needed · Avg callback under 5 min · Open 24/7</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[{ n: "10,000+", label: "Printers Fixed" }, { n: "$49", label: "Starting Price" }, { n: "94%", label: "First-Call Fix Rate" }, { n: "All 50", label: "US States" }].map(({ n, label }) => (
              <div key={label} className="text-center py-4 px-3 rounded-2xl bg-white/8 border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-blue-300">{n}</div>
                <div className="text-xs text-blue-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY REMOTE BEATS LOCAL */}
      <section aria-label="Why Remote Beats Local Shop" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Why Trini System</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Stop Driving to a Printer Repair Shop</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">93% of printer problems are software, network, or driver issues — not hardware. We fix all of those remotely while you watch.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-100">
              <h3 className="font-black text-red-900 text-lg mb-4">❌ Local Repair Shop</h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• Pack up & transport your printer</li>
                <li>• 3–7 day turnaround</li>
                <li>• $80–$200 minimum diagnostic fee</li>
                <li>• Limited to business hours</li>
                <li>• Pay even if not fixed</li>
                <li>• Loaner printer often unavailable</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
              <h3 className="font-black text-emerald-900 text-lg mb-4">✅ Trini System Remote</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Stay home — printer stays plugged in</li>
                <li>• Average fix time: 15 minutes</li>
                <li>• Starts at $49 — no diagnostic fee</li>
                <li>• 24/7 availability — even weekends</li>
                <li>• No fix = no fee guaranteed</li>
                <li>• You watch the entire repair on screen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON ISSUES */}
      <section aria-label="Common Printer Issues We Fix Remotely" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Common Printer Problems We Fix Remotely</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">If your printer issue is on this list, we can fix it without you leaving home.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMON_ISSUES.map(({ issue, brands, time }) => (
              <div key={issue} className="p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-md transition-all">
                <p className="font-black text-gray-900 mb-2">{issue}</p>
                <p className="text-xs text-gray-500 mb-3">{brands}</p>
                <span className="inline-block text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">⏱ {time} avg fix</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS TOOL */}
      <section id="diagnosis" aria-label="Free Printer Diagnosis Tool" className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Free Diagnosis Tool</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Diagnose Your Printer Free in 60 Seconds</h2>
            <p className="text-gray-500">Tell us what brand and what's happening — get an instant fix guide. Powered by 10,000+ real repair records.</p>
          </div>
          <TechER />
        </div>
      </section>

      {/* BRANDS GRID */}
      <section aria-label="Printer Brands We Repair" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">All Major Printer Brands Supported</h2>
            <p className="text-gray-500">Click your brand to jump to a dedicated repair page</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS.map(({ name, icon, href, desc }) => (
              <Link key={name} href={href} className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{name} Printers</h3>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
                <div className="mt-3 text-xs text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-block">View {name} repair →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CITY COVERAGE */}
      <section aria-label="Cities We Serve for Printer Repair" className="bg-blue-950 text-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Printer Repair Near Me — Major Cities Served</h2>
            <p className="text-blue-300 max-w-2xl mx-auto">Remote service available in every US state. Same fast response no matter where you live.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-5xl mx-auto">
            {CITIES_SERVED.map((city) => (
              <span key={city} className="text-sm py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-blue-100 hover:bg-white/10 transition-colors">
                📍 {city}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-blue-300 mt-8">
            Don&apos;t see your city? <a href="tel:+13479531531" className="text-white font-bold underline hover:text-blue-200">Call us</a> — we serve all 50 states.
          </p>
        </div>
      </section>

      {/* NYC LOCAL */}
      <section aria-label="Printer Repair NYC" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">Local NYC Service</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Based in Corona, Queens — Serving All NYC Boroughs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trini System LLC operates from Corona, Queens, NY since 2016. NYC neighborhoods we frequently serve include:</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
            {NYC_NEIGHBORHOODS.map((n) => (
              <span key={n} className="text-xs text-center py-2 px-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 font-semibold">
                {n}
              </span>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">All NYC residents get the same remote service — no in-person visits required.</p>
            <a href="tel:+13479531531" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl transition-colors">
              📞 Call NYC Office — 347-953-1531
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-label="How Remote Printer Repair Works" className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How Remote Printer Repair Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From phone call to working printer in under 30 minutes — here&apos;s exactly what happens.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, icon: "📞", title: "Call us free", detail: "Dial 347-953-1531 or use the form. Avg pick-up time: under 5 minutes. No automated phone tree." },
              { step: 2, icon: "🔍", title: "Free phone diagnosis", detail: "Tell us your printer brand and what's happening. We confirm if it's something we can fix remotely (93% of cases)." },
              { step: 3, icon: "💻", title: "Secure remote session", detail: "We send a one-time link. You click it, we connect to your screen. You watch every step we take." },
              { step: 4, icon: "✅", title: "Pay only when fixed", detail: "Once your printer is working, we send a payment link starting at $49. No fix = no fee guaranteed." },
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

      {/* REVIEWS */}
      <section aria-label="Printer Repair Reviews" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">What Customers Say About Our Printer Repair</h2>
            <p className="text-gray-400">4.9 ⭐ average from 47+ verified Google reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Margaret T.", text: "I searched 'printer repair near me' and Trini System came up. Fixed my HP DeskJet remotely in 12 minutes. Way better than driving to a shop.", loc: "Phoenix, AZ", brand: "HP" },
              { name: "Robert M.", text: "Canon B200 — local shop wanted $180 just to look at it. Trini System fixed it remotely for $49. Saved me hundreds.", loc: "Dallas, TX", brand: "Canon" },
              { name: "Linda K.", text: "Epson EcoTank ink error driving me crazy. Tech logged in, fixed in 15 min, walked me through every step. Best printer repair service I've used.", loc: "Tampa, FL", brand: "Epson" },
            ].map(({ name, text, loc, brand }) => (
              <div key={name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex gap-1 mb-3">{Array(5).fill("⭐").map((s, i) => <span key={i}>{s}</span>)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-gray-900 text-sm">— {name}</p>
                    <p className="text-xs text-gray-400">{loc}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-bold">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Printer Repair Near Me FAQ" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Printer Repair Near Me — FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Where can I find printer repair near me?", a: "Trini System LLC offers remote printer repair to anyone in the United States. Because the service is 100% remote, you don't need to find a local shop — we connect to your computer and fix the printer from wherever you are. Call 347-953-1531." },
              { q: "How much does printer repair cost?", a: "Local shops typically charge $80–$200 plus drop-off. Trini System remote printer repair starts at $49 — about half. Geek Squad starts at $149. We have a no fix = no fee guarantee." },
              { q: "Can you really fix a printer without seeing it?", a: "Yes — about 93% of printer issues are software, driver, or network related. Things like offline errors, WiFi setup, print queue, driver corruption, error codes (Canon B200, HP OXc19a0035, Epson ink errors), and Windows compatibility issues are all software problems we fix remotely." },
              { q: "Do you offer same-day printer repair?", a: "Yes. Same-day printer repair is available 24/7 — including evenings and weekends. Most printer issues are fixed in 15–25 minutes from the time you call. No appointment needed." },
              { q: "Which printer brands do you fix near me?", a: "All major brands: HP (DeskJet, OfficeJet, ENVY, LaserJet), Canon (PIXMA, imageCLASS, MAXIFY), Epson (EcoTank, WorkForce, Expression), Brother (MFC, HL, DCP), plus Lexmark, Xerox, Samsung, and Kyocera for business clients." },
              { q: "What if my printer needs a hardware repair?", a: "If we determine your issue is genuinely hardware (broken print head, motor failure, etc.) we'll tell you immediately and you pay nothing. We'll recommend the closest authorized service center for your brand." },
              { q: "Is remote printer repair safe?", a: "Yes. We use one-time secure remote-access sessions (similar to what Microsoft and Apple use). You can see everything we do on your screen, and the connection is closed automatically when the session ends. We never install permanent software." },
              { q: "Do you serve my city?", a: "We serve all 50 US states. Whether you're in New York, Los Angeles, Chicago, Houston, or anywhere else — distance doesn't matter for remote repair. Call 347-953-1531 to confirm." },
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

      {/* FINAL CTA */}
      <section aria-label="Get Printer Fixed Now" style={{ background: "linear-gradient(135deg, #0a0f1e, #0c2a5a)" }} className="text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🖨️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Your Printer Fixed Today</h2>
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
