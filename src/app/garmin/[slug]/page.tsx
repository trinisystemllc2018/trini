import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StickyCTA } from "@/components/ui/Button";
import {
  GARMIN_SERIES,
  GARMIN_PROBLEMS,
  ALL_GARMIN_SLUGS,
  type GarminSeries,
  type GarminProblemPage,
} from "@/lib/garmin-data";

type Props = { params: { slug: string } };

// Pre-render all known Garmin pages at build time for max SEO speed
export function generateStaticParams() {
  return ALL_GARMIN_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = GARMIN_SERIES[params.slug];
  const problem = GARMIN_PROBLEMS[params.slug];
  const item = series ?? problem;
  if (!item) return {};

  const url = `https://trinisystem.vercel.app/garmin/${params.slug}`;
  return {
    title: item.metaTitle,
    description: item.metaDescription,
    keywords: item.primaryKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.metaTitle} | Trini System`,
      description: item.metaDescription,
      url,
      type: "website",
    },
  };
}

// Type guard: is this a Series page or a Problem page?
function isSeries(item: GarminSeries | GarminProblemPage): item is GarminSeries {
  return (item as GarminSeries).models !== undefined;
}

export default function GarminDynamicPage({ params }: Props) {
  const series = GARMIN_SERIES[params.slug];
  const problem = GARMIN_PROBLEMS[params.slug];
  const item = series ?? problem;
  if (!item) return notFound();

  if (isSeries(item)) {
    return <SeriesPage data={item} slug={params.slug} />;
  }
  return <ProblemPage data={item} slug={params.slug} />;
}

// ═══════════════════════════════════════════════════════════════════
// SERIES PAGE — renders DriveSmart, Drive, Nuvi, eTrex, Zumo, etc.
// ═══════════════════════════════════════════════════════════════════
function SeriesPage({ data, slug }: { data: GarminSeries; slug: string }) {
  const url = `https://trinisystem.vercel.app/garmin/${slug}`;

  // Build all schemas (multi-schema stacking for AEO)
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
        { "@type": "ListItem", position: 2, name: "Garmin GPS Help", item: "https://trinisystem.vercel.app/garmin-gps-help" },
        { "@type": "ListItem", position: 3, name: data.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${data.name} Update Service`,
      description: data.tagline,
      provider: {
        "@type": "LocalBusiness",
        name: "Trini System LLC",
        telephone: "+13479531531",
      },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: `${data.name} Map & Firmware Update`,
      offers: {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
        description: data.estimatedFixCost,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to update ${data.name}`,
      description: `Step-by-step guide to update ${data.name} maps and firmware`,
      totalTime: "PT75M",
      tool: [{ "@type": "HowToTool", name: "Garmin Express" }, { "@type": "HowToTool", name: data.cableType }],
      step: data.updateSteps.map((s) => ({
        "@type": "HowToStep",
        position: s.step,
        name: s.title,
        text: s.detail,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: data.metaTitle,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".speakable-summary"],
      },
    },
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 text-center text-sm font-semibold">
        🗺️ {data.name} Update Service ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:text-blue-200">
          347-953-1531
        </a>{" "}
        · From $49 · No Fix = No Fee
      </div>

      {/* HERO */}
      <section
        aria-label={`${data.name} Hero`}
        style={{ background: data.bgGradient, position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,150,214,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
              ⭐ 4.9 Rating
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
              {data.name} Update
              <span className="block text-blue-300 mt-1 text-2xl md:text-3xl">
                {data.tagline}
              </span>
            </h1>
            <p className="speakable-summary text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
              {data.metaDescription}
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
                📞 Call Now — 347-953-1531
              </a>
              <a
                href="#update-steps"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all"
              >
                🔧 DIY Update Guide
              </a>
            </div>
            <p className="text-sm text-blue-300 mt-4">
              No appointment needed · Avg callback under 5 min · Open 24/7
            </p>
          </div>
        </div>
      </section>

      {/* MODELS COVERED */}
      <section aria-label={`${data.name} Models`} className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {data.name} Models We Update
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every {data.name} model — current and legacy — supported. Don&apos;t see yours?{" "}
              <a href="tel:+13479531531" className="text-blue-700 font-bold">Call us.</a>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.models.map(({ name, year, market }) => (
              <div
                key={name}
                className="p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-black text-gray-900 text-lg">{name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold whitespace-nowrap">
                    {year}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{market}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON PROBLEMS */}
      <section aria-label={`Common ${data.name} Problems`} className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Common {data.name} Problems We Fix
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Real problems from real customer calls — with our actual fix times and remote success rates.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden text-left">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className="p-4 text-sm font-black">Problem</th>
                  <th className="p-4 text-sm font-black hidden md:table-cell">Root Cause</th>
                  <th className="p-4 text-sm font-black">Fix Time</th>
                  <th className="p-4 text-sm font-black">Remote Success</th>
                </tr>
              </thead>
              <tbody>
                {data.commonProblems.map(({ problem, cause, fixTime, remoteSuccess }, i) => (
                  <tr key={problem} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-4 text-sm font-bold text-gray-900">{problem}</td>
                    <td className="p-4 text-xs text-gray-600 hidden md:table-cell">{cause}</td>
                    <td className="p-4 text-xs text-gray-600 whitespace-nowrap">⏱ {fixTime}</td>
                    <td className="p-4 text-sm font-black text-emerald-700 whitespace-nowrap">
                      {remoteSuccess}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ERROR CODES */}
      <section aria-label={`${data.name} Error Codes`} className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Error Codes Decoded
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {data.name} Error Codes — What They Mean
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.uniqueErrorCodes.map(({ code, meaning, fix }) => (
              <div key={code} className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="font-black text-blue-900 text-lg font-mono">{code}</h3>
                </div>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Meaning</p>
                <p className="text-sm text-gray-700 mb-3">{meaning}</p>
                <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Our Fix</p>
                <p className="text-sm text-gray-700">{fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATE STEPS */}
      <section
        id="update-steps"
        aria-label={`How to Update ${data.name}`}
        className="bg-gray-900 text-white py-14"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-blue-400 border border-blue-700 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Step-by-Step Guide
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              How to Update {data.name} — 8 Steps
            </h2>
            <p className="text-gray-400">
              Cable: {data.cableType}. Garmin Express:{" "}
              {data.expressCompatible ? "Required" : "Not supported — see model docs"}
            </p>
          </div>
          <ol className="space-y-4">
            {data.updateSteps.map(({ step, title, detail, warnings }) => (
              <li
                key={step}
                className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-base font-black shrink-0">
                  {step}
                </div>
                <div>
                  <p className="font-black text-white text-base mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
                  {warnings && (
                    <p className="mt-2 text-xs text-amber-300 bg-amber-900/30 border-l-2 border-amber-500 pl-3 py-1">
                      ⚠️ <strong>Warning:</strong> {warnings}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 p-5 rounded-2xl bg-blue-900/40 border border-blue-700/40 text-center">
            <p className="text-white font-bold mb-3">Stuck on any step?</p>
            <a
              href="tel:+13479531531"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl transition-colors"
            >
              📞 Call — We Update It for You · $49
            </a>
          </div>
        </div>
      </section>

      {/* REAL-TIME ISSUES */}
      <section aria-label="Recent Real-Time Issues" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Recent Real-Time Issues — {data.name}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Things that broke in 2025–2026 because of OS updates, app changes, or Garmin firmware
              regressions — and exactly how we fixed them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.realTimeIssues.map(({ trigger, symptom, ourFix }) => (
              <div
                key={trigger}
                className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-100"
              >
                <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">
                  Trigger
                </p>
                <p className="text-sm font-bold text-gray-900 mb-3">{trigger}</p>
                <p className="text-xs font-black text-red-700 uppercase tracking-widest mb-1">
                  Symptom
                </p>
                <p className="text-sm text-gray-700 mb-3">{symptom}</p>
                <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">
                  Our Fix
                </p>
                <p className="text-sm text-gray-700">{ourFix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label={`${data.name} FAQ`} className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {data.name} — Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map(({ q, a }, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden"
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

      {/* RELATED LINKS */}
      <section
        aria-label="Related Garmin Resources"
        className="bg-gray-50 py-12 border-t border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related Garmin Resources</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/garmin-gps-help"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Garmin GPS Help Hub
            </Link>
            <Link
              href="/garmin/express-not-working"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Garmin Express Not Working
            </Link>
            <Link
              href="/garmin/wont-acquire-satellites"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Won&apos;t Acquire Satellites
            </Link>
            <Link
              href="/garmin/map-update-failed"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Map Update Failed
            </Link>
            <Link
              href="/gps-help"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              All GPS Help
            </Link>
          </div>
        </div>
      </section>

      {/* CITATIONS */}
      <section
        aria-label={`${data.name} Service Credentials`}
        className="bg-gray-50 py-10 border-t border-gray-200"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">
            Verified On
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60 mb-4">
            {["Google Business Profile", "Yelp", "Facebook", "YouTube", "TikTok"].map((r) => (
              <span key={r} className="text-sm font-bold text-gray-500">
                {r}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Trini System LLC is an independent technology service provider in Corona, Queens, New York.
            Garmin®, DriveSmart®, Drive®, Nuvi®, eTrex®, Forerunner®, Fenix®, and all related marks are
            registered trademarks of Garmin Ltd. or its subsidiaries. Trini System LLC is not affiliated with,
            endorsed by, or authorized by Garmin Ltd. For warranty service, contact Garmin directly.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        aria-label={`Get ${data.name} Updated`}
        style={{ background: data.bgGradient }}
        className="text-white py-16 text-center"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🗺️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Get Your {data.name} Updated Today
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            {data.estimatedFixCost}
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

      <StickyCTA />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROBLEM PAGE — renders Express not working, satellite, map update failed
// ═══════════════════════════════════════════════════════════════════
function ProblemPage({ data, slug }: { data: GarminProblemPage; slug: string }) {
  const url = `https://trinisystem.vercel.app/garmin/${slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
        { "@type": "ListItem", position: 2, name: "Garmin GPS Help", item: "https://trinisystem.vercel.app/garmin-gps-help" },
        { "@type": "ListItem", position: 3, name: data.problemTitle, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to fix ${data.problemTitle}`,
      description: data.problemSummary,
      totalTime: "PT25M",
      step: data.fixSequence.map((s) => ({
        "@type": "HowToStep",
        position: s.step,
        name: s.title,
        text: s.detail,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: data.problemTitle,
      description: data.problemSummary,
      author: { "@type": "Organization", name: "Trini System LLC" },
      publisher: { "@type": "Organization", name: "Trini System LLC" },
      datePublished: "2026-04-26",
      dateModified: "2026-04-26",
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: data.metaTitle,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".speakable-summary"],
      },
    },
  ];

  const accentBg =
    data.accentColor === "red"
      ? "bg-red-700"
      : data.accentColor === "amber"
      ? "bg-amber-700"
      : "bg-blue-700";

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className={`${accentBg} text-white py-3 text-center text-sm font-semibold`}>
        🛠️ {data.problemTitle} — Fix Available ·{" "}
        <a href="tel:+13479531531" className="underline font-bold hover:opacity-80">
          347-953-1531
        </a>{" "}
        · From $49
      </div>

      {/* HERO */}
      <section
        aria-label={`${data.problemTitle} Hero`}
        style={{ background: data.bgGradient, position: "relative", overflow: "hidden" }}
        className="text-white"
      >
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-xs font-bold mb-6">
              ⚠️ TROUBLESHOOTING GUIDE
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              {data.problemTitle}
            </h1>
            <p className="speakable-summary text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
              {data.problemSummary}
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
                📞 Talk to a Tech — 347-953-1531
              </a>
              <a
                href="#fix-sequence"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold py-5 px-8 rounded-2xl text-lg hover:bg-white/20 transition-all"
              >
                🔧 Try the Fix First
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AFFECTED MODELS */}
      <section aria-label="Affected Garmin Models" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Affected Garmin Models
            </h2>
            <p className="text-gray-500">This issue affects the following Garmin product lines:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.affectedModels.map((m) => (
              <div
                key={m}
                className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <span className="text-emerald-600 mt-0.5 shrink-0">✓</span>
                <p className="text-sm text-gray-700">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section aria-label="Symptoms" className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Symptoms — Does This Match Your Issue?
            </h2>
            <p className="text-gray-500">If you&apos;re seeing any of these, this guide is for you.</p>
          </div>
          <ul className="space-y-3">
            {data.symptoms.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100"
              >
                <span className="text-red-500 text-xl shrink-0">●</span>
                <p className="text-sm text-gray-700">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CAUSES */}
      <section aria-label="Root Causes" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {data.causes.length} Root Causes — Ranked by Frequency
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From real customer call data — most common first.
            </p>
          </div>
          <div className="space-y-4">
            {data.causes.map(({ cause, likelihood, description }, i) => (
              <div
                key={cause}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 text-lg">{cause}</h3>
                    <p className="text-xs font-bold text-blue-700 mt-0.5">{likelihood}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-14">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC STEPS */}
      <section aria-label="Diagnostic Steps" className="bg-blue-950 text-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-blue-300 border border-blue-700 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Diagnose First
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              5-Step Diagnostic — Find Your Cause
            </h2>
            <p className="text-blue-300">Run these checks in order before trying any fix.</p>
          </div>
          <ol className="space-y-4">
            {data.diagnosticSteps.map(({ step, title, detail, ifFails }) => (
              <li key={step} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-base font-black shrink-0">
                    {step}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-white text-base mb-2">{title}</p>
                    <p className="text-blue-200 text-sm leading-relaxed mb-3">{detail}</p>
                    <p className="text-xs text-amber-300 bg-amber-900/30 border-l-2 border-amber-500 pl-3 py-1">
                      If this fails: {ifFails}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FIX SEQUENCE */}
      <section
        id="fix-sequence"
        aria-label="Fix Sequence"
        className="bg-white py-14"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Step-by-Step Fix
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              The Fix — {data.fixSequence.length} Steps
            </h2>
          </div>
          <ol className="space-y-4">
            {data.fixSequence.map(({ step, title, detail, estimatedTime }) => (
              <li
                key={step}
                className="flex items-start gap-5 p-5 rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base font-black shrink-0">
                  {step}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-black text-gray-900 text-base">{title}</p>
                    <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded whitespace-nowrap">
                      ⏱ {estimatedTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHEN TO CALL US */}
      <section aria-label="When to Call Us" className="bg-amber-50 py-14 border-y-2 border-amber-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">📞</div>
          <h2 className="text-2xl md:text-3xl font-black text-amber-900 mb-4">
            When to Call Us Instead
          </h2>
          <p className="text-base text-amber-900 leading-relaxed mb-6">{data.whenToCallUs}</p>
          <a
            href="tel:+13479531531"
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-black py-3 px-6 rounded-xl transition-colors"
          >
            📞 Call 347-953-1531 — From $49
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section aria-label={`${data.problemTitle} FAQ`} className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {data.problemTitle} — Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map(({ q, a }, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden"
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

      {/* RELATED LINKS */}
      <section
        aria-label="Related Garmin Resources"
        className="bg-gray-50 py-12 border-t border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Related Garmin Help</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/garmin-gps-help"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Garmin GPS Help Hub
            </Link>
            <Link
              href="/garmin/drivesmart-update"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              DriveSmart Update
            </Link>
            <Link
              href="/garmin/express-not-working"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Express Not Working
            </Link>
            <Link
              href="/garmin/wont-acquire-satellites"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Won&apos;t Acquire Satellites
            </Link>
            <Link
              href="/garmin/map-update-failed"
              className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Map Update Failed
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        aria-label="Final CTA"
        style={{ background: data.bgGradient }}
        className="text-white py-16 text-center"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-5">🛠️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">Need Hands-On Help?</h2>
          <p className="text-white/80 text-lg mb-8">
            Remote service · From $49 · No fix = no fee
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

      <StickyCTA />
    </>
  );
}
