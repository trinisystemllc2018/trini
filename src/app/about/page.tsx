import type { Metadata } from "next";
import Link from "next/link";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us — Trini System LLC, Corona NY",
  description: "Trini System LLC — remote tech support since 2016 from Corona, Queens NY. Serving all 50 states. HP, Canon, Epson, Brother repair. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/about" },
  keywords: [
    "trini system llc","tech support company new york","printer repair queens ny",
    "remote tech support company","about trini system","corona ny tech support",
    "senior tech support company","printer repair company usa",
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
      { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://trinisystem.vercel.app/about" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Trini System LLC",
    "url": "https://trinisystem.vercel.app/about",
    "description": "Trini System LLC is a remote tech support company based in Corona, Queens, NY. Founded in 2016, specializing in printer repair, PC optimization, virus removal, and GPS updates for home users across all 50 US states.",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Trini System LLC",
      "foundingDate": "2016",
      "telephone": "+13479531531",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "52-09 99th St Apt 8S",
        "addressLocality": "Corona",
        "addressRegion": "NY",
        "postalCode": "11368",
        "addressCountry": "US",
      },
    },
  },
];

const MILESTONES = [
  { year: "2016", title: "Founded in Corona, NY", desc: "Started as a one-person operation helping neighbors with printer and PC problems in Queens, New York." },
  { year: "2018", title: "Went Fully Remote", desc: "Expanded remote support to all 50 states, allowing customers to get help without leaving their homes." },
  { year: "2020", title: "Launched TriniCleaner", desc: "Released our free PC optimizer tool — downloaded by thousands of users across the USA." },
  { year: "2022", title: "5,000 Devices Fixed", desc: "Hit the milestone of 5,000 successful remote repair sessions across printers, PCs, and GPS devices." },
  { year: "2024", title: "4.9★ Google Rating", desc: "Achieved and maintained a 4.9-star Google Business rating with 47+ verified reviews." },
  { year: "2025", title: "8 Years & Going Strong", desc: "Continuing to serve all 50 states with the same personal, patient, and affordable tech support." },
];

const VALUES = [
  { icon: "🤝", title: "Honest Pricing", desc: "No surprise fees. You know the cost before we start. No fix = no fee, always." },
  { icon: "⏱️", title: "Respect Your Time", desc: "We respond in under 15 minutes and fix most issues in a single session." },
  { icon: "👴", title: "Senior-Focused", desc: "Extra patience, plain language, no jargon. We're known for helping seniors who other companies turn away." },
  { icon: "🔒", title: "Your Security First", desc: "You watch everything we do on your screen. We never access anything you haven't shown us." },
  { icon: "🌎", title: "Truly Nationwide", desc: "Remote service means we're available anywhere in the US — rural areas, suburbs, and cities alike." },
  { icon: "💯", title: "No Fix = No Fee", desc: "If we can't solve your problem, you don't pay. No exceptions. No fine print." },
];

export default function AboutPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="pt-14 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
                🏆 Est. 2016 — 8 Years of Service
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
                Real People.
                <span className="block text-blue-600">Real Tech Help.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Trini System LLC has been fixing printers, PCs, and tech problems for everyday Americans since 2016 — from our home base in Corona, Queens, NY to all 50 states.
              </p>
              {/* NAP */}
              <address className="not-italic bg-white rounded-2xl border border-gray-100 shadow-soft p-5 space-y-2 mb-6">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Our Location</p>
                <p className="text-gray-700 font-semibold">📍 52-09 99th St Apt 8S, Corona, NY 11368</p>
                <a href={PHONE_HREF} className="block text-blue-600 font-black text-lg hover:text-blue-800 transition-colors">
                  📞 {PHONE}
                </a>
                <a href="mailto:trinisystemllc@gmail.com" className="block text-gray-500 text-sm hover:text-blue-600 transition-colors">
                  ✉️ trinisystemllc@gmail.com
                </a>
                <p className="text-xs text-gray-400">Available 24/7 · Remote service all 50 states</p>
              </address>
              <div className="flex gap-3">
                <a href={PHONE_HREF}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition-all">
                  📞 Call Now
                </a>
                <Link href="/comparison"
                  className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                  vs. Geek Squad →
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🔧", value: "5,000+", label: "Devices Fixed" },
                { icon: "⭐", value: "4.9★", label: "Google Rating" },
                { icon: "🌎", value: "All 50", label: "States Served" },
                { icon: "🏆", value: "8 Years", label: "In Business" },
                { icon: "🛡️", value: "100%", label: "No Fix = No Fee" },
                { icon: "⚡", value: "< 15m", label: "Response Time" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-black text-gray-900 text-xl">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our story / milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Our Story</h2>
            <p className="text-gray-500 text-lg">From a one-person operation in Queens to serving all 50 states.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100 hidden md:block" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-brand z-10">
                    {m.year}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="font-black text-gray-900 text-lg mb-1">{m.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What We Stand For</h2>
            <p className="text-gray-500 text-lg">The values that drive every support session we do.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            See Why Customers Choose Us Over Geek Squad
          </h2>
          <p className="text-gray-500 mb-6">Same-day service. Half the price. You never leave home.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/comparison"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all">
              📊 See Full Comparison →
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all">
              📞 {PHONE}
            </a>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
