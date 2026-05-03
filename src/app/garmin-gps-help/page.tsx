import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Garmin GPS Help — Update, Fix, Troubleshoot",
  description:
    "Garmin GPS help for DriveSmart, Nuvi, eTrex, Forerunner, Fenix & more. Fix Express errors, satellite issues, map updates. Free guide. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/garmin-gps-help" },
  openGraph: {
    title: "Garmin GPS Help — Update, Fix, Troubleshoot | Trini System",
    description:
      "Free Garmin GPS help center. Update guides for every model + real-time issue fixes. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/garmin-gps-help",
    type: "website",
  },
  keywords: [
    "garmin gps help",
    "garmin gps update help",
    "garmin map update help",
    "garmin support",
    "garmin gps troubleshooting",
    "garmin express help",
    "garmin gps not working",
    "fix garmin gps",
    "garmin gps map update free",
    "garmin gps customer support",
    "garmin update guide 2026",
    "garmin firmware update help",
    "garmin watch gps help",
    "garmin nuvi help",
    "garmin drivesmart help",
    "garmin etrex help",
  ],
};

const CATEGORIES = [
  {
    title: "Auto / Car GPS",
    icon: "🚗",
    color: "blue",
    description:
      "DriveSmart, Drive, Nuvi, DriveAssist, DriveLuxe, RV / Camper. Most cars in the US still use Garmin auto units — we update and repair every model.",
    pages: [
      { label: "Garmin DriveSmart Update (55, 65, 76, 86)", href: "/garmin/drivesmart-update", popular: true },
      { label: "Garmin Drive 50 Update", href: "/garmin/drive-50-update" },
      { label: "Garmin Nuvi 2597 Update", href: "/garmin/nuvi-2597-update" },
      { label: "Garmin RV 770 / 780 / 890", href: "/garmin-update/rv-890" },
    ],
  },
  {
    title: "Outdoor & Handheld",
    icon: "🥾",
    color: "emerald",
    description:
      "eTrex, GPSMAP, Oregon, Montana series — used by hikers, hunters, geocachers, and SAR teams. Topographic map updates require special handling.",
    pages: [
      { label: "Garmin eTrex Update (10/20/22x/30/32x/SE/Solar)", href: "/garmin/etrex-update", popular: true },
      { label: "Garmin GPSMAP 64/65/66/67 Update", href: "/garmin/gpsmap-update", popular: true },
      { label: "Garmin Oregon 700/750 Update", href: "/garmin/oregon-update" },
    ],
  },
  {
    title: "Sport Watches",
    icon: "⌚",
    color: "purple",
    description:
      "Forerunner, Fenix, Venu, Vivoactive, Epix — daily-use fitness watches with GPS. Pairing, sync, and GPS issues are the most common service calls.",
    pages: [
      { label: "Garmin Forerunner Update (245/255/955/965)", href: "/garmin/forerunner-update", popular: true },
      { label: "Garmin Fenix Update (5/6/7/8)", href: "/garmin/fenix-update", popular: true },
      { label: "Garmin Watch WiFi Sync Not Working", href: "/garmin/wifi-sync-not-working", popular: true },
      { label: "Garmin Venu Update (2/3/3S)", href: "/garmin/venu-update", popular: true },
      { label: "Garmin Connect App Not Working", href: "/garmin/connect-app-not-working", popular: true },
    ],
  },
  {
    title: "Motorcycle & Truck",
    icon: "🏍️",
    color: "amber",
    description:
      "Zumo motorcycle GPS and Dezl truck navigators — specialized for routing and ELD integration. Underserved market with high commercial intent.",
    pages: [
      { label: "Garmin Zumo Update (XT/XT2/595/396)", href: "/garmin/zumo-update", popular: true },
      { label: "Garmin Dezl Truck Update (OTR700/800/1000)", href: "/garmin/dezl-update", popular: true },
    ],
  },
  {
    title: "Vehicle-Integrated",
    icon: "🚙",
    color: "red",
    description:
      "Garmin nav systems built into Honda, Toyota, Lexus, Aston Martin, Jeep, Harley-Davidson Boom Box. Updates require dealer-equivalent process.",
    pages: [
      { label: "Honda Garmin Navigation Update", href: "/garmin/honda-navigation-update" },
      { label: "Jeep Wrangler RHB 430N Update", href: "/garmin/jeep-rhb-430n-update" },
      { label: "Garmin Bluetooth Pairing Failed", href: "/garmin/bluetooth-pairing-failed" },
      { label: "Garmin Battery Drain Fast", href: "/garmin/battery-drain-fast" },
    ],
  },
  {
    title: "Common Problems",
    icon: "🛠️",
    color: "red",
    description:
      "Real-world issues we fix daily. These pages explain causes, diagnostic steps, and the actual fix sequence — not generic advice.",
    pages: [
      { label: "Garmin Express Not Working", href: "/garmin/express-not-working", popular: true },
      { label: "Garmin Won't Acquire Satellites", href: "/garmin/wont-acquire-satellites", popular: true },
      { label: "Garmin Map Update Failed", href: "/garmin/map-update-failed", popular: true },
    ],
  },
];

const QUICK_LINKS = [
  { q: "How do I update my Garmin maps for free?", a: "Most Garmin units sold after 2014 include 'Lifetime Maps' (LM suffix in model name). Free updates forever — connect via Garmin Express, click 'Update'. Models without lifetime maps require purchase." },
  { q: "Why won't my Garmin connect to Garmin Express?", a: "70% of Express connection issues are: (1) outdated Express version, (2) antivirus blocking, or (3) charging-only USB cable. Full diagnostic on our Express not working page." },
  { q: "Can my Garmin GPS be updated remotely?", a: "Yes. We connect to your computer via secure remote session, you connect Garmin via USB, and we run the entire update process while you watch. From $49." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Garmin GPS Help", item: "https://trinisystem.vercel.app/garmin-gps-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Garmin GPS Service & Help",
    description:
      "Independent Garmin GPS service — map updates, firmware updates, troubleshooting, and recovery for DriveSmart, Drive, Nuvi, eTrex, GPSMAP, Forerunner, Fenix, Venu, Zumo, Dezl, RV, and vehicle-integrated Garmin systems.",
    provider: {
      "@type": "LocalBusiness",
      name: "Trini System LLC",
      telephone: "+13479531531",
      address: {
        "@type": "PostalAddress",
        streetAddress: "52-09 99th St Apt 8S",
        addressLocality: "Corona",
        addressRegion: "NY",
        postalCode: "11368",
        addressCountry: "US",
      },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "47", bestRating: "5" },
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Garmin GPS Repair & Update",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUICK_LINKS.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://trinisystem.vercel.app/garmin-gps-help#webpage",
    url: "https://trinisystem.vercel.app/garmin-gps-help",
    name: "Garmin GPS Help — Update, Fix, Troubleshoot",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable-summary"],
    },
  },
];

const colorMap: Record<string, string> = {
  blue: "border-blue-200 hover:border-blue-400 bg-blue-50",
  emerald: "border-emerald-200 hover:border-emerald-400 bg-emerald-50",
  purple: "border-purple-200 hover:border-purple-400 bg-purple-50",
  amber: "border-amber-200 hover:border-amber-400 bg-amber-50",
  red: "border-red-200 hover:border-red-400 bg-red-50",
};

const accentMap: Record<string, string> = {
  blue: "text-blue-700",
  emerald: "text-emerald-700",
  purple: "text-purple-700",
  amber: "text-amber-700",
  red: "text-red-700",
};

export default function GarminGPSHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Urgency Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 text-center text-sm font-semibold">
        🗺️ Garmin GPS Help — All Models · 24/7 ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">
          347-953-1531
        </a>{" "}
        · From $49
      </div>

      {/* HERO */}
      <section
        aria-label="Garmin GPS Help Hero"
        style={{
          background: "linear-gradient(135deg, #051124 0%, #0a2247 40%, #0d3266 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        className="text-white"
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,150,214,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
              ⭐ 4.9 Google · 47 Reviews
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full">
              ✅ No Fix = No Fee
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
              🇺🇸 All 50 States
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 rounded-full">
              ⚡ Avg 75-Min Update
            </span>
          </div>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              Garmin GPS Help
              <span className="block text-blue-300 mt-1 text-2xl md:text-3xl">
                Updates · Fixes · Troubleshooting · 24/7 Support
              </span>
            </h1>
            <p className="speakable-summary text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Independent Garmin GPS service for <strong className="text-white">every model</strong> —
              auto, outdoor, watch, motorcycle, truck, RV, and vehicle-integrated systems.
              Map updates, firmware fixes, satellite issues, Express errors, recovery from failed updates.
              From $49 · Remote in 75 min · 24/7 callback under 5 min.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+13479531531"
                className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#dc2626,#b91c1c)",
                  boxShadow: "0 4px 30px rgba(220,38,38,0.5)",
                }}
              >
                📞 Talk to a Garmin Tech — 347-953-1531
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all"
              >
                📚 Browse Help Library
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">
              Independent service · Not affiliated with Garmin Ltd. · 8+ years specializing in Garmin
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" aria-label="Garmin Help Categories" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Garmin Help Library — By Category
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Pick your Garmin product line or jump straight to a problem fix. New pages added weekly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(({ title, icon, color, description, pages }) => (
              <div
                key={title}
                className={`p-6 rounded-2xl border-2 transition-all hover:shadow-md ${colorMap[color]}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="font-black text-gray-900 text-lg">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
                <ul className="space-y-2">
                  {pages.map(({ label, href, popular }) => {
                    const isExternal = href === "#coming-soon";
                    if (isExternal) {
                      return (
                        <li key={label} className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">○</span>
                          <span className="text-sm text-gray-400 italic">{label} (coming soon)</span>
                        </li>
                      );
                    }
                    return (
                      <li key={label} className="flex items-center gap-2">
                        <span className={`text-xs ${accentMap[color]}`}>→</span>
                        <Link
                          href={href}
                          className={`text-sm font-bold ${accentMap[color]} hover:underline`}
                        >
                          {label}
                        </Link>
                        {popular && (
                          <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">
                            HOT
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOST COMMON ISSUES */}
      <section
        aria-label="Most Common Garmin Issues"
        className="bg-gradient-to-b from-gray-50 to-white py-14"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Top 3 Garmin Issues This Year
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Based on our customer call volume Jan–Apr 2026. Click for full diagnostic + fix.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              href="/garmin/express-not-working"
              className="group p-6 rounded-2xl bg-white border-2 border-red-100 hover:border-red-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">🚫</div>
              <p className="text-xs font-black text-red-700 uppercase tracking-widest mb-1">
                #1 Most Common
              </p>
              <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-red-700 transition-colors">
                Garmin Express Not Working
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Won&apos;t open, won&apos;t detect device, freezes during update. 8 root causes
                explained, 7-step fix sequence.
              </p>
              <div className="mt-4 text-sm font-black text-red-700 group-hover:translate-x-1 transition-transform inline-block">
                See full guide →
              </div>
            </Link>
            <Link
              href="/garmin/wont-acquire-satellites"
              className="group p-6 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">🛰️</div>
              <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-1">
                #2 Most Common
              </p>
              <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                Won&apos;t Acquire Satellites
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stuck on &quot;Acquiring satellites&quot; or shows 0 signal. 6 causes, 5-step
                diagnostic, full fix sequence.
              </p>
              <div className="mt-4 text-sm font-black text-blue-700 group-hover:translate-x-1 transition-transform inline-block">
                See full guide →
              </div>
            </Link>
            <Link
              href="/garmin/map-update-failed"
              className="group p-6 rounded-2xl bg-white border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">⚠️</div>
              <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">
                #3 Most Common
              </p>
              <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-amber-700 transition-colors">
                Map Update Failed
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Update failed at 39%, 50%, or 99%. Recovery for bricked units. 7 root causes,
                7-step recovery procedure.
              </p>
              <div className="mt-4 text-sm font-black text-amber-700 group-hover:translate-x-1 transition-transform inline-block">
                See full guide →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section aria-label="Why Trini System for Garmin" className="bg-blue-950 text-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Why Choose Trini System for Garmin</h2>
            <p className="text-blue-300 max-w-2xl mx-auto">
              We&apos;ve serviced over 5,000 Garmin units across 8 years. We know things Garmin&apos;s
              support center hasn&apos;t even documented yet.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: "🎯",
                title: "Garmin Specialist",
                body: "Most computer-repair shops avoid Garmin because each model is different. We service Garmin daily — DriveSmart, Nuvi, eTrex, Forerunner, Fenix, Venu, Zumo, Dezl, RV, and vehicle-integrated. Specialist depth.",
              },
              {
                icon: "💻",
                title: "Remote-First",
                body: "100% remote service for software/firmware/map updates. No mailing your GPS in. We connect via secure session, you connect Garmin to your PC, we run Express while you watch. Done in 75 min.",
              },
              {
                icon: "💰",
                title: "Flat $49",
                body: "Garmin's authorized service partners often charge $99+ for the same map update. We're $49 flat. No fix = no fee. No surprise add-ons. We tell you upfront if it's hardware (we won't charge).",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-black text-white text-lg mb-2">{title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section
        aria-label="Independent Service Disclosure"
        className="bg-amber-50 py-10 border-t-2 border-amber-200"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-black text-amber-900 uppercase tracking-widest mb-3">
            Important Disclosure
          </p>
          <p className="text-sm text-amber-900 leading-relaxed">
            Trini System LLC is an <strong>independent Garmin service provider</strong> — we are not
            affiliated with, endorsed by, or authorized by Garmin Ltd. or its subsidiaries.
            Garmin®, DriveSmart®, Nuvi®, eTrex®, Forerunner®, Fenix®, Venu®, and related marks are
            registered trademarks of Garmin Ltd. For warranty-covered defects, contact Garmin
            directly at <strong>1-800-800-1020</strong> or garmin.com/support. We provide independent
            paid service for software, firmware, map, and configuration issues — typically faster
            and at lower cost than authorized service for non-warranty work.
          </p>
        </div>
      </section>

      {/* QUICK FAQ */}
      <section aria-label="Quick FAQ" className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Quick Answers — Top Garmin Questions
            </h2>
          </div>
          <div className="space-y-4">
            {QUICK_LINKS.map(({ q, a }, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-black text-gray-900 hover:text-blue-700 transition-colors list-none">
                  <span>{q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        aria-label="Final CTA"
        style={{ background: "linear-gradient(135deg, #051124, #0d3266)" }}
        className="text-white py-16 text-center"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🗺️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Get Garmin Help Right Now</h2>
          <p className="text-blue-200 text-lg mb-8">
            Phone pickup under 5 min · From $49 · No fix = no fee · 24/7
          </p>
          <a
            href="tel:+13479531531"
            className="inline-flex items-center justify-center gap-2 text-white font-black py-5 px-8 rounded-2xl text-lg transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#dc2626,#b91c1c)",
              boxShadow: "0 4px 30px rgba(220,38,38,0.5)",
            }}
          >
            📞 347-953-1531
          </a>
        </div>
      </section>
    </>
  );
}
