import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHONE, PHONE_HREF } from "@/lib/utils";
import { PRINTER_BRANDS, PRINTER_PROBLEMS, type BrandKey, type ProblemKey } from "@/lib/seo-data";

/* ─────────────────────────────────────────────────────────────
   DYNAMIC ROUTE: /fix-printer/[brand]/[problem]
   Examples:
     /fix-printer/hp/offline
     /fix-printer/canon/error-code
     /fix-printer/epson/not-printing
     /fix-printer/brother/wifi-setup
   Total pages: 4 brands × 4 problems = 16 high-intent pages
   Each page = fully unique, SEO-optimized, schema-rich
───────────────────────────────────────────────────────────── */

interface Props {
  params: { brand: string; problem: string };
}

export async function generateStaticParams() {
  const params = [];
  for (const brand of Object.keys(PRINTER_BRANDS)) {
    for (const problem of Object.keys(PRINTER_PROBLEMS)) {
      params.push({ brand, problem });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand   = PRINTER_BRANDS[params.brand as BrandKey];
  const problem = PRINTER_PROBLEMS[params.problem as ProblemKey];
  if (!brand || !problem) return {};

  // Keep title compact - 50ish chars before " | Trini System" (16 char) suffix
  const title = `${brand.name} ${problem.title} — Fix It Fast`;
  const description = `Fix ${brand.name} printer ${problem.title.toLowerCase()} fast. ${problem.summary.slice(0, 90)}... Call 347-953-1531 free.`;
  const url = `https://trinisystem.vercel.app/fix-printer/${params.brand}/${params.problem}`;

  return {
    title,
    description,
    keywords: [...problem.searchTerms, `${brand.name} printer repair`, `${brand.name} ${problem.slug}`, "printer repair near me"],
    alternates: { canonical: url },
    openGraph: { title: `${title} | Trini System`, description, url },
  };
}

export default function FixPrinterPage({ params }: Props) {
  const brand   = PRINTER_BRANDS[params.brand as BrandKey];
  const problem = PRINTER_PROBLEMS[params.problem as ProblemKey];
  if (!brand || !problem) notFound();

  // HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Fix ${brand.name} Printer ${problem.title}`,
    "description": problem.summary,
    "totalTime": `PT${problem.avgTime.replace(" min", "M")}`,
    "step": problem.steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.detail,
    })),
  };

  const faqSchema = problem.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": problem.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  } : null;

  const sevColor = { easy: "emerald", medium: "amber", urgent: "red" }[problem.severity];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Brand bar */}
      <div className="py-2 text-center text-sm font-semibold text-white" style={{ background: brand.color }}>
        {brand.name} Printer Support — Remote Fix, All 50 States ·{" "}
        <a href={PHONE_HREF} className="underline">Call {PHONE}</a>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-gray-600">Home</Link> /
          <span>Fix Printer</span> /
          <span style={{ color: brand.color }}>{brand.name}</span> /
          <span className="text-gray-600">{problem.title}</span>
        </nav>

        {/* Hero */}
        <div className={`bg-${sevColor}-50 border-2 border-${sevColor}-200 rounded-2xl p-6 mb-8`}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">🖨️</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                {brand.name} Printer {problem.title} — Fix It Now
              </h1>
              <p className="text-gray-600">{problem.summary}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-${sevColor}-100 text-${sevColor}-700`}>
                  {problem.successRate}% success rate
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                  Avg {problem.avgTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Answer block — optimized for LLM extraction */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Quick Answer</p>
          <p className="text-gray-800 text-sm leading-relaxed font-medium">{problem.summary} Follow the steps below or call <a href={PHONE_HREF} className="text-blue-600 font-bold">{PHONE}</a> for free remote help.</p>
        </div>

        {/* Steps */}
        <h2 className="text-xl font-black text-gray-900 mb-5">
          Step-by-step fix for {brand.name} printer {problem.title.toLowerCase()}
        </h2>
        <div className="space-y-4 mb-10">
          {problem.steps.map((step, i) => (
            <div key={i} className="flex gap-4 bg-white border-2 border-gray-100 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white text-center mb-10">
          <h3 className="font-black text-xl mb-2">Still not working?</h3>
          <p className="text-gray-300 text-sm mb-4">We fix {brand.name} printer {problem.title.toLowerCase()} remotely — usually in under 30 minutes. Free diagnosis, no fix = no fee.</p>
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-black px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg">
            📞 Call {PHONE} — Free Fix
          </a>
        </div>

        {/* FAQs */}
        {problem.faqs?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {problem.faqs.map((faq, i) => (
                <details key={i} className="bg-white border-2 border-gray-100 rounded-2xl">
                  <summary className="px-5 py-4 font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-gray-400 text-xl">↓</span>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Internal links */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="font-bold text-gray-900 mb-3 text-sm">Related {brand.name} fixes:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRINTER_PROBLEMS)
              .filter(([key]) => key !== params.problem)
              .map(([key, prob]) => (
                <Link key={key} href={`/fix-printer/${params.brand}/${key}`}
                  className="text-xs bg-white border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-xl text-gray-600 hover:text-blue-700 transition-colors">
                  {brand.name} {prob.title}
                </Link>
              ))}
            {Object.entries(PRINTER_BRANDS)
              .filter(([key]) => key !== params.brand)
              .map(([key, b]) => (
                <Link key={key} href={`/fix-printer/${key}/${params.problem}`}
                  className="text-xs bg-white border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-xl text-gray-600 hover:text-blue-700 transition-colors">
                  {b.name} {problem.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
