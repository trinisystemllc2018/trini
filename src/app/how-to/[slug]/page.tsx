import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VisualWalkthrough from "@/components/features/VisualWalkthrough";
import FacebookWalkthrough from "@/components/features/FacebookWalkthrough";
import { GMAIL_PAGES, ALL_GMAIL_SLUGS, type GmailPage } from "@/lib/gmail-data";
import { FACEBOOK_PAGES, ALL_FACEBOOK_SLUGS, FB_THEME, type FacebookPage } from "@/lib/facebook-data";

/* ═══════════════════════════════════════════════════════════════════
   /how-to/[slug] — Senior help cluster (multi-brand)

   Handles all Gmail (12) AND Facebook (12) pages from one template.
   Looks up slug in GMAIL_PAGES first, falls back to FACEBOOK_PAGES.
   Brand theme switches accordingly: Gmail (Google blue #1a73e8)
   vs Facebook (Meta blue #1877F2).

   SEO + AEO architecture:
   - generateStaticParams pre-renders all 24 pages at build time
   - Multi-schema stacking: Article + HowTo + FAQPage + BreadcrumbList
     + WebPage(speakable) + Service
   - AI citation: TL;DR in first 60 words
   - Senior UX: 18px+ body, sticky phone CTA, named author
═══════════════════════════════════════════════════════════════════ */

const SITE = "https://trinisystem.vercel.app";
const PHONE = "+13479531531";
const PHONE_DISPLAY = "347-953-1531";

type Brand = "gmail" | "facebook";
type AnyPage = GmailPage | FacebookPage;

function findPage(slug: string): { page: AnyPage; brand: Brand } | null {
  if (GMAIL_PAGES[slug]) return { page: GMAIL_PAGES[slug], brand: "gmail" };
  if (FACEBOOK_PAGES[slug]) return { page: FACEBOOK_PAGES[slug], brand: "facebook" };
  return null;
}

function brandTheme(brand: Brand) {
  if (brand === "facebook") {
    return {
      primary: FB_THEME.primary,
      primaryHover: FB_THEME.primaryHover,
      primaryDark: FB_THEME.primaryDark,
      bgPage: FB_THEME.bgPage,
      bgCard: FB_THEME.bgCard,
      text: FB_THEME.text,
      textSecondary: FB_THEME.textSecondary,
      border: FB_THEME.border,
      brandName: "Facebook",
    };
  }
  return {
    primary: "#1a73e8",
    primaryHover: "#1557b0",
    primaryDark: "#0d47a1",
    bgPage: "#f8fafc",
    bgCard: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    brandName: "Gmail",
  };
}

type Props = { params: { slug: string } };

// Pre-render EVERY Gmail and Facebook page at build time
export function generateStaticParams() {
  return [...ALL_GMAIL_SLUGS, ...ALL_FACEBOOK_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findPage(params.slug);
  if (!found) return {};
  const { page } = found;

  const url = `${SITE}/how-to/${params.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.primaryKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "Trini System",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default function HelpPage({ params }: Props) {
  const found = findPage(params.slug);
  if (!found) return notFound();
  const { page, brand } = found;
  const theme = brandTheme(brand);

  const url = `${SITE}/how-to/${params.slug}`;
  const today = new Date().toISOString().split("T")[0];

  // ─── SCHEMA STACK ────────────────────────────────────────────────
  const schemas = [
    // 1. BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "How-To Guides", item: `${SITE}/how-to` },
        { "@type": "ListItem", position: 3, name: page.h1, item: url },
      ],
    },
    // 2. Article
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.metaTitle,
      description: page.metaDescription,
      image: `${SITE}/logo.svg`,
      datePublished: page.lastUpdated,
      dateModified: page.lastUpdated,
      author: { "@type": "Organization", name: "Trini System", url: SITE },
      publisher: {
        "@type": "Organization",
        name: "Trini System",
        logo: { "@type": "ImageObject", url: `${SITE}/logo.svg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      about: { "@type": "Thing", name: theme.brandName },
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 55,
        audienceType: "Seniors",
      },
    },
    // 3. HowTo (only for guide pages with steps)
    ...(page.pageType === "guide" && page.textSteps.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: page.h1,
            description: page.tldrAnswer,
            totalTime: page.estimatedTime,
            tool: page.toolsRequired.map((t) => ({ "@type": "HowToTool", name: t })),
            step: page.textSteps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.detail,
              url: `${url}#step-${s.step}`,
            })),
          },
        ]
      : []),
    // 4. FAQPage
    ...(page.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
    // 5. WebPage with speakable spec (for voice assistants / AI)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      name: page.metaTitle,
      description: page.metaDescription,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#tldr-answer", "#hero-h1"],
      },
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: "Trini System", url: SITE },
    },
    // 6. Service
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${theme.brandName} Help for Seniors`,
      provider: {
        "@type": "Organization",
        name: "Trini System",
        telephone: PHONE,
        url: SITE,
      },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: `${theme.brandName} technical support`,
      audience: { "@type": "PeopleAudience", audienceType: "Seniors", suggestedMinAge: 55 },
    },
  ];

  return (
    <main style={{ backgroundColor: theme.bgPage, color: theme.text }} className="min-h-screen">
      {/* JSON-LD schemas */}
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* TOP STICKY PHONE CTA */}
      <div
        className="sticky top-0 z-40 px-4 py-2 text-white text-center font-bold text-base md:text-lg"
        style={{ backgroundColor: theme.primary }}
      >
        Stuck? Call a real person free —{" "}
        <a href={`tel:${PHONE}`} className="underline">
          {PHONE_DISPLAY}
        </a>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* BREADCRUMBS */}
        <nav className="text-sm mb-6" style={{ color: theme.textSecondary }}>
          <Link href="/" className="hover:underline">Home</Link> <span className="mx-2">›</span>
          <Link href="/how-to" className="hover:underline">How-To Guides</Link> <span className="mx-2">›</span>
          <span style={{ color: theme.text }}>{page.h1}</span>
        </nav>

        {/* HERO */}
        <header className="mb-8">
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3"
            style={{ backgroundColor: theme.primary + "20", color: theme.primaryDark }}
          >
            {theme.brandName} · {page.category} · {page.difficultyLabel} · {page.estimatedTime}
          </div>
          <h1 id="hero-h1" className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: theme.text }}>
            {page.h1}
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed" style={{ color: theme.textSecondary }}>
            {page.heroIntro}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm" style={{ color: theme.textSecondary }}>
            <span>📅 Last updated: <strong style={{ color: theme.text }}>{page.lastUpdated}</strong></span>
            <span>·</span>
            <span>✍️ Reviewed by: <strong style={{ color: theme.text }}>{page.reviewedBy}</strong></span>
          </div>
        </header>

        {/* TLDR / AI CITATION BLOCK */}
        <section
          id="tldr-answer"
          className="rounded-2xl p-6 mb-10 border-l-4"
          style={{
            backgroundColor: theme.primary + "10",
            borderColor: theme.primary,
          }}
        >
          <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: theme.primaryDark }}>
            Quick answer
          </div>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: theme.text }}>
            {page.tldrAnswer}
          </p>
        </section>

        {/* HUB PAGE: card grid linking to all sibling guides */}
        {page.pageType === "hub" && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: theme.text }}>
              Pick the {theme.brandName} guide you need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(brand === "gmail" ? ALL_GMAIL_SLUGS : ALL_FACEBOOK_SLUGS)
                .filter((s) => s !== params.slug)
                .map((s) => {
                  const sibling = brand === "gmail" ? GMAIL_PAGES[s] : FACEBOOK_PAGES[s];
                  return (
                    <Link
                      key={s}
                      href={`/how-to/${s}`}
                      className="block rounded-xl p-5 transition-all hover:shadow-lg"
                      style={{ backgroundColor: theme.bgCard, border: `2px solid ${theme.border}` }}
                    >
                      <div className="text-xs font-semibold uppercase mb-2" style={{ color: theme.primary }}>
                        {sibling.category} · {sibling.estimatedTime}
                      </div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: theme.text }}>
                        {sibling.h1}
                      </h3>
                      <p className="text-sm" style={{ color: theme.textSecondary }}>
                        {sibling.heroIntro.slice(0, 110)}…
                      </p>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}

        {/* WALKTHROUGH (only guides) */}
        {page.pageType === "guide" && page.walkthrough.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: theme.text }}>
              Step-by-step practice mode
            </h2>
            <p className="text-lg mb-4" style={{ color: theme.textSecondary }}>
              Click through each step to practice. The screens look like real {theme.brandName} but nothing you click here changes your real account.
            </p>
            {brand === "facebook" ? (
              <FacebookWalkthrough screens={page.walkthrough as any} />
            ) : (
              <VisualWalkthrough screens={page.walkthrough as any} />
            )}
          </section>
        )}

        {/* TEXT STEPS (numbered, large text, accessible) */}
        {page.textSteps.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: theme.text }}>
              Step-by-step instructions
            </h2>
            <ol className="space-y-6">
              {page.textSteps.map((s) => (
                <li
                  key={s.step}
                  id={`step-${s.step}`}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {s.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>
                        {s.title}
                      </h3>
                      <p className="text-lg leading-relaxed" style={{ color: theme.text }}>
                        {s.detail}
                      </p>
                      {s.warning && (
                        <div
                          className="mt-3 p-3 rounded-lg text-base"
                          style={{ backgroundColor: "#FEF3C7", color: "#78350F", borderLeft: "4px solid #F59E0B" }}
                        >
                          ⚠ <strong>Important:</strong> {s.warning}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* WHAT IF NOT WORKING */}
        {page.whatIfNotWork.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: theme.text }}>
              What if it's not working?
            </h2>
            <div className="space-y-4">
              {page.whatIfNotWork.map((w, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme.primaryDark }}>
                    Problem: {w.problem}
                  </h3>
                  <p className="text-base mb-2" style={{ color: theme.textSecondary }}>
                    <strong>Likely cause:</strong> {w.cause}
                  </p>
                  <p className="text-base" style={{ color: theme.text }}>
                    <strong>How to fix:</strong> {w.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {page.faqs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: theme.text }}>
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {page.faqs.map((f, i) => (
                <details
                  key={i}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}
                >
                  <summary className="text-lg font-bold cursor-pointer" style={{ color: theme.text }}>
                    {f.q}
                  </summary>
                  <p className="text-base mt-3 leading-relaxed" style={{ color: theme.text }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* RELATED GUIDES */}
        {page.relatedSlugs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: theme.text }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {page.relatedSlugs.map((s) => {
                const r = GMAIL_PAGES[s] || FACEBOOK_PAGES[s];
                if (!r) return null;
                return (
                  <Link
                    key={s}
                    href={`/how-to/${s}`}
                    className="block rounded-xl p-4 transition-all hover:shadow-md"
                    style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}
                  >
                    <div className="font-bold" style={{ color: theme.primary }}>
                      {r.h1}
                    </div>
                    <div className="text-sm mt-1" style={{ color: theme.textSecondary }}>
                      {r.estimatedTime} · {r.difficultyLabel}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}
        <section
          className="rounded-2xl p-6 md:p-8 text-center mb-8"
          style={{ backgroundColor: theme.primary, color: "white" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Still stuck? Call a real person.</h2>
          <p className="text-lg mb-5 opacity-95">
            We answer in under 15 minutes. We never ask for your password. Help is free for under-15-minute calls.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-block px-8 py-4 rounded-full text-xl md:text-2xl font-bold bg-white"
            style={{ color: theme.primary }}
          >
            📞 {PHONE_DISPLAY}
          </a>
        </section>

        {/* AUTHOR / E-E-A-T BLOCK */}
        <footer
          className="text-sm border-t pt-6"
          style={{ color: theme.textSecondary, borderColor: theme.border }}
        >
          <p className="mb-2">
            <strong style={{ color: theme.text }}>About this guide:</strong> Reviewed and verified by{" "}
            {page.reviewedBy} on {page.lastUpdated}. We update each guide every 90 days because{" "}
            {theme.brandName} changes its interface frequently.
          </p>
          <p>
            <strong style={{ color: theme.text }}>Honesty note:</strong> Trini System is independent — we
            are not affiliated with, endorsed by, or operated by {theme.brandName === "Gmail" ? "Google" : "Meta"}.
            We help seniors understand official {theme.brandName} steps. We never log in to your account.
          </p>
        </footer>
      </article>
    </main>
  );
}
