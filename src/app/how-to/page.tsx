import type { Metadata } from "next";
import Link from "next/link";
import { GMAIL_PAGES, ALL_GMAIL_SLUGS } from "@/lib/gmail-data";
import { FACEBOOK_PAGES, ALL_FACEBOOK_SLUGS, FB_THEME } from "@/lib/facebook-data";

const SITE = "https://trinisystem.vercel.app";
const PHONE = "+13479531531";
const PHONE_DISPLAY = "347-953-1531";

export const metadata: Metadata = {
  title: "How-To Guides for Seniors — Gmail & Facebook Help (Trini System)",
  description:
    "Free senior-friendly guides for Gmail and Facebook. Login problems, password recovery, hacked accounts, scams, and privacy. Call 347-953-1531.",
  alternates: { canonical: `${SITE}/how-to` },
};

const GMAIL_BLUE = "#1a73e8";
const FB_BLUE = FB_THEME.primary;

export default function HowToHub() {
  const gmailSlugs = ALL_GMAIL_SLUGS;
  const facebookSlugs = ALL_FACEBOOK_SLUGS;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* sticky phone */}
      <div className="sticky top-0 z-40 bg-gray-900 px-4 py-2 text-white text-center font-bold text-base md:text-lg">
        Need a real person? Call free —{" "}
        <a href={`tel:${PHONE}`} className="underline">
          {PHONE_DISPLAY}
        </a>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            How-to guides for seniors
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Plain English. Large text. Free practice mode. Pick your topic below — every guide has
            step-by-step screens you can click through before doing it for real.
          </p>
        </header>

        {/* GMAIL CLUSTER */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: GMAIL_BLUE }}
            >
              ✉
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Gmail Help</h2>
              <p className="text-base text-gray-600">12 senior-friendly Gmail guides</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gmailSlugs.map((slug) => {
              const p = GMAIL_PAGES[slug];
              return (
                <Link
                  key={slug}
                  href={`/how-to/${slug}`}
                  className="block bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wide mb-2"
                    style={{ color: GMAIL_BLUE }}
                  >
                    {p.category} · {p.estimatedTime}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{p.h1}</h3>
                  <p className="text-sm text-gray-600">{p.heroIntro.slice(0, 110)}…</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FACEBOOK CLUSTER */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: FB_BLUE }}
            >
              f
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Facebook Help</h2>
              <p className="text-base text-gray-600">12 senior-friendly Facebook guides</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facebookSlugs.map((slug) => {
              const p = FACEBOOK_PAGES[slug];
              return (
                <Link
                  key={slug}
                  href={`/how-to/${slug}`}
                  className="block bg-white rounded-xl p-5 border-2 border-gray-100 hover:shadow-lg transition-all"
                  style={{ borderColor: "transparent" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = FB_BLUE)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "")}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-wide mb-2"
                    style={{ color: FB_BLUE }}
                  >
                    {p.category} · {p.estimatedTime}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{p.h1}</h3>
                  <p className="text-sm text-gray-600">{p.heroIntro.slice(0, 110)}…</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-6 md:p-10 text-center" style={{ backgroundColor: "#1f2937", color: "white" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Don't see your problem?</h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Call a real person. We answer in under 15 minutes. No password ever needed.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-block px-8 py-4 rounded-full text-xl md:text-2xl font-bold bg-white text-gray-900"
          >
            📞 {PHONE_DISPLAY}
          </a>
        </section>
      </div>
    </main>
  );
}
