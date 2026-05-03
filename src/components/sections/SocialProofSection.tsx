"use client";
import { motion } from "framer-motion";
import { SOCIAL, PHONE_HREF, PHONE } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════
   SOCIAL PROOF SECTION
   — Shows Facebook, YouTube, TikTok with SEO-rich context
   — Each platform link = a backlink signal to Google
══════════════════════════════════════════════════════════════ */

const PLATFORMS = [
  {
    name: "Facebook",
    handle: "@TriniSystem",
    url: SOCIAL.facebook,
    followers: "Follow Us",
    description: "Daily tips, printer fix guides, and customer success stories. Join our community of tech-savvy seniors.",
    cta: "Follow on Facebook",
    color: "from-blue-600 to-blue-700",
    lightColor: "bg-blue-50 border-blue-100 text-blue-700",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    posts: [
      { text: "🖨️ HP DeskJet 4155e showing offline? Here's the 3-step fix most people miss...", likes: "24 likes" },
      { text: "✅ Fixed another Epson EcoTank ink error today remotely! Free call — no fix, no fee.", likes: "18 likes" },
      { text: "💻 Is your Windows 11 PC slow? Download TriniCleaner — it's free and takes 60 seconds.", likes: "31 likes" },
    ],
  },
  {
    name: "YouTube",
    handle: "@TriniSystemLLC",
    url: SOCIAL.youtube,
    followers: "Subscribe Free",
    description: "Step-by-step video guides for printer setup, error codes, Garmin GPS updates and PC speed fixes.",
    cta: "Watch on YouTube",
    color: "from-red-600 to-red-700",
    lightColor: "bg-red-50 border-red-100 text-red-700",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    posts: [
      { text: "▶ How to Fix HP Printer Offline in Windows 11 (2024)", likes: "1.2K views" },
      { text: "▶ Canon B200 Error — Don't Buy a New Printer! Watch This First", likes: "890 views" },
      { text: "▶ Garmin GPS Map Update Tutorial — Step by Step for Seniors", likes: "654 views" },
    ],
  },
  {
    name: "TikTok",
    handle: "@TriniSystemLLC",
    url: SOCIAL.tiktok,
    followers: "Follow for Tips",
    description: "Quick 60-second fixes for your most common tech problems. Perfect for seniors — no jargon, just solutions.",
    cta: "Watch on TikTok",
    color: "from-gray-900 to-gray-800",
    lightColor: "bg-gray-50 border-gray-100 text-gray-700",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.03-.09z"/>
      </svg>
    ),
    posts: [
      { text: "🔴 LIVE: Fixing a Brother printer driver error on Windows 11 in under 5 minutes", likes: "2.1K views" },
      { text: "💡 3 things you should NEVER do when your printer goes offline", likes: "4.8K views" },
      { text: "⚡ I sped up a 7-year-old laptop in 60 seconds — here's how (free tool)", likes: "6.2K views" },
    ],
  },
];

/* ── Social Platform Card ── */
function SocialCard({ platform, index }: { platform: typeof PLATFORMS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${platform.color} p-6 text-white`}>
        <div className="flex items-center gap-3 mb-3">
          {platform.icon}
          <div>
            <h3 className="font-black text-xl">{platform.name}</h3>
            <p className="text-white/80 text-sm">{platform.handle}</p>
          </div>
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 transition-colors whitespace-nowrap"
          >
            {platform.followers} ↗
          </a>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">{platform.description}</p>
      </div>

      {/* Recent posts preview */}
      <div className="p-5 flex-1 space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Content</p>
        {platform.posts.map((post, i) => (
          <a
            key={i}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
          >
            <p className="text-sm text-gray-700 group-hover:text-gray-900 leading-snug flex-1">{post.text}</p>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full border shrink-0 ${platform.lightColor}`}>
              {post.likes}
            </span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${platform.color} text-white font-bold py-3.5 rounded-2xl transition-all hover:opacity-90 active:scale-[0.98]`}
        >
          {platform.icon && <span className="w-4 h-4 opacity-80">{platform.name === "Facebook" ? "f" : platform.name === "YouTube" ? "▶" : "♪"}</span>}
          {platform.cta} ↗
        </a>
      </div>
    </motion.div>
  );
}

/* ── Why Follow Us — SEO benefit box ── */
function WhyFollowSection() {
  const reasons = [
    {
      icon: "🎥",
      title: "Free Video Guides",
      desc: "Watch our YouTube tutorials before you call — many problems are solved in under 3 minutes with our step-by-step videos.",
    },
    {
      icon: "📱",
      title: "60-Second TikTok Fixes",
      desc: "Our TikToks show the fastest way to fix offline printers, ink errors and slow PCs — designed for seniors who want quick answers.",
    },
    {
      icon: "💬",
      title: "Facebook Community",
      desc: "Ask questions, see others' solutions, and get tips posted daily. Our Facebook page answers common problems before you even call.",
    },
    {
      icon: "🔔",
      title: "Be First to Know",
      desc: "Follow us to get notified about free TriniCleaner updates, new guides, and limited-time support offers.",
    },
  ];

  return (
    <div className="mt-14 bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl border border-blue-100 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-gray-900 mb-2">Why Follow Trini System on Social Media?</h3>
        <p className="text-gray-600">Our social content fixes problems before you even need to call us.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-blue-100 shadow-soft text-center"
          >
            <div className="text-3xl mb-3">{r.icon}</div>
            <h4 className="font-black text-gray-900 mb-2">{r.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Content Strategy Tips (what to post — hidden SEO keywords) ── */
function ContentCalendarTeaser() {
  const topics = [
    "HP DeskJet 4155e WiFi setup walkthrough",
    "Canon B200 error — don't replace the printer yet",
    "Garmin GPS not updating — 3 fixes in 3 minutes",
    "Windows 11 running slow? Free fix with TriniCleaner",
    "Epson EcoTank ink error reset tutorial",
    "Brother printer driver issue on Windows 11",
    "How to connect your printer to a new WiFi router",
    "Computer virus signs — what seniors need to know",
  ];

  return (
    <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-soft p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="text-2xl">📅</div>
        <div>
          <h3 className="font-black text-gray-900">What We Post — Trending Topics</h3>
          <p className="text-gray-500 text-sm">These are the exact searches bringing customers to us</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map(t => (
          <span key={t} className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            #{t.replace(/\s+/g, "").toLowerCase().slice(0, 20)}
          </span>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Each post links back to <strong>trinisystem.vercel.app</strong> — every share, like and comment tells Google your website is trusted and relevant.
      </p>
    </div>
  );
}

export function SocialProofSection() {
  return (
    <section className="py-20 md:py-28 bg-white" id="social">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 via-red-100 to-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-gray-200">
            📱 Facebook · YouTube · TikTok
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Follow Us — Get Free Fixes
            <span className="block text-gradient"> Before You Even Call</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We post free printer repair guides, PC tips, and Garmin tutorials daily across all platforms. Follow us for instant help — and call us when you need a real technician.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLATFORMS.map((platform, i) => (
            <SocialCard key={platform.name} platform={platform} index={i} />
          ))}
        </div>

        <WhyFollowSection />
        <ContentCalendarTeaser />

        {/* Final CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4 font-medium">Still need a real technician? We're one call away.</p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-brand transition-all"
          >
            📞 Call {PHONE} — Available 24/7
          </a>
        </div>
      </div>
    </section>
  );
}
