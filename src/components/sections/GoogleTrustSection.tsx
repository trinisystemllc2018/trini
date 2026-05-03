"use client";
import { motion } from "framer-motion";
import { PHONE_HREF, PHONE } from "@/lib/utils";

const GOOGLE_LISTING_URL = "https://share.google/1mtrJVk8Ya0PkjG76";

const REVIEWS = [
  {
    name: "Corey Hawkins",
    location: "New York, NY",
    stars: 5,
    time: "2 weeks ago",
    text: "James was incredibly patient and made everything easy. My HP DeskJet was offline for weeks and they fixed it in 20 minutes. Absolutely the best tech support experience I've ever had.",
    device: "HP DeskJet 4155e",
    avatar: "CH",
    color: "bg-blue-500",
  },
  {
    name: "Leslie Park",
    location: "Dallas, TX",
    stars: 5,
    time: "1 month ago",
    text: "Very helpful in finding and resolving my Canon PIXMA B200 error. Quick, simple, and effective. I was ready to buy a new printer — they saved me $200!",
    device: "Canon PIXMA MX922",
    avatar: "LP",
    color: "bg-purple-500",
  },
  {
    name: "Mary Steil",
    location: "Chicago, IL",
    stars: 5,
    time: "1 month ago",
    text: "Things got complicated with my Epson EcoTank but James was outstanding throughout. Fixed the ink error and even helped me reconnect to my new router. Truly above and beyond!",
    device: "Epson EcoTank ET-2720",
    avatar: "MS",
    color: "bg-emerald-500",
  },
  {
    name: "Mark Starrett",
    location: "Phoenix, AZ",
    stars: 5,
    time: "2 months ago",
    text: "They went above and beyond to get my Garmin GPS updated correctly. Professional, reliable, and MUCH cheaper than Best Buy. Will use them every time.",
    device: "Garmin DriveSmart 65",
    avatar: "MS",
    color: "bg-orange-500",
  },
  {
    name: "Patricia Walsh",
    location: "Miami, FL",
    stars: 5,
    time: "3 months ago",
    text: "TriniCleaner made my old laptop run like new again. I was about to buy a new computer but it's completely fast now. So grateful for this free tool!",
    device: "Windows 11 Laptop",
    avatar: "PW",
    color: "bg-pink-500",
  },
  {
    name: "Robert Chen",
    location: "Seattle, WA",
    stars: 5,
    time: "3 months ago",
    text: "Brother printer stopped printing after Windows 11 update. Trini System fixed the driver issue in under 30 minutes while I watched. Amazing remote support!",
    device: "Brother MFC-L2710DW",
    avatar: "RC",
    color: "bg-indigo-500",
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

/* ── 8-Year Trust Banner ── */
export function EightYearTrustBanner() {
  const badges = [
    { icon: "🏆", value: "8 Years", label: "In Business Since 2016" },
    { icon: "⭐", value: "4.9★", label: "Google Rating" },
    { icon: "✅", value: "5,000+", label: "Devices Fixed" },
    { icon: "🗺️", value: "All 50", label: "States Served" },
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            📍 Based in Corona, Queens, NY
          </span>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            🇺🇸 Serving All 50 States Remotely
          </span>
          <a
            href={GOOGLE_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 transition-colors"
          >
            🔍 View Our Google Business Listing ↗
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-1">{b.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-white">{b.value}</div>
              <div className="text-blue-100 text-sm font-medium mt-1">{b.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Google Reviews Section ── */
export function GoogleReviewsSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50" id="reviews">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-yellow-200">
            ⭐ Real Google Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            8 Years of 5-Star Service
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Every review is from a real customer on our verified Google Business Profile — serving Corona, Queens and all 50 states since 2016.
          </p>

          {/* Google rating summary */}
          <a
            href={GOOGLE_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-6 bg-white border-2 border-gray-100 hover:border-yellow-300 rounded-2xl px-6 py-3 shadow-soft transition-all group"
          >
            {/* Google G */}
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-black text-gray-900 text-lg">4.9</span>
                <StarRating />
                <span className="text-gray-500 text-sm">(47 reviews)</span>
              </div>
              <div className="text-xs text-gray-500">Verified Google Business Profile · Est. 2016</div>
            </div>
            <span className="ml-2 text-blue-600 text-sm font-semibold group-hover:underline">See all reviews ↗</span>
          </a>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 flex flex-col gap-4 hover:shadow-soft-lg transition-shadow"
            >
              {/* Top: avatar + name + Google icon */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white text-sm font-black shrink-0`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.location}</p>
                  </div>
                </div>
                {/* Google G */}
                <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>

              {/* Stars + time */}
              <div className="flex items-center gap-2">
                <StarRating count={review.stars} />
                <span className="text-xs text-gray-400">{review.time}</span>
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Device tag */}
              <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl font-semibold w-fit border border-blue-100">
                🖨️ {review.device}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={GOOGLE_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border-2 border-gray-200 hover:border-yellow-400 text-gray-800 font-bold px-8 py-4 rounded-2xl shadow-soft transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Read All 47 Google Reviews ↗
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-brand hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            📞 Call {PHONE} — Join Our Happy Customers
          </a>
        </div>
      </div>
    </section>
  );
}
