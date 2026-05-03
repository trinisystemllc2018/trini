import Link from "next/link";
import { PHONE, PHONE_HREF, DOWNLOAD_URL, MAPS_URL, OFFICIAL_SITE, SOCIAL } from "@/lib/utils";

const footerSections = [
  {
    title: "Brand Repair",
    links: [
      { label: "HP Printer Repair",          href: "/hp-printer-repair" },
      { label: "Canon Printer Repair",       href: "/canon-printer-repair" },
      { label: "Epson Printer Repair",       href: "/epson-printer-repair" },
      { label: "Printer Repair Near Me",     href: "/printer-repair-near-me" },
      { label: "HP Printer Service",         href: "/hp-printer-service" },
      { label: "Epson Service NYC",          href: "/epson-service-nyc" },
      { label: "Epson Plotters & SureColor", href: "/epson-plotters" },
    ],
  },
  {
    title: "Garmin GPS Help",
    links: [
      { label: "Garmin GPS Help Hub",          href: "/garmin-gps-help" },
      { label: "DriveSmart Update",            href: "/garmin/drivesmart-update" },
      { label: "Forerunner Update",            href: "/garmin/forerunner-update" },
      { label: "Fenix Update",                 href: "/garmin/fenix-update" },
      { label: "Zumo Motorcycle Update",       href: "/garmin/zumo-update" },
      { label: "eTrex Update",                 href: "/garmin/etrex-update" },
      { label: "Garmin Express Not Working",   href: "/garmin/express-not-working" },
      { label: "Won't Acquire Satellites",     href: "/garmin/wont-acquire-satellites" },
      { label: "Map Update Failed",            href: "/garmin/map-update-failed" },
      { label: "WiFi Sync Not Working",        href: "/garmin/wifi-sync-not-working" },
    ],
  },
  {
    title: "Common Fixes",
    links: [
      { label: "HP Printer Offline Fix",       href: "/fix-printer/hp/offline" },
      { label: "HP Printer Not Printing",      href: "/fix-printer/hp/not-printing" },
      { label: "Canon B200 Error Fix",         href: "/fix-printer/canon/error-code" },
      { label: "Epson Ink Error Fix",          href: "/fix-printer/epson/error-code" },
      { label: "Brother WiFi Setup",           href: "/fix-printer/brother/wifi-setup" },
      { label: "Garmin DriveSmart 65 Update",  href: "/garmin-update/drivesmart-65" },
    ],
  },
  {
    title: "Tech Services",
    links: [
      { label: "Printer Support",            href: "/printer-support" },
      { label: "Virus & Malware Removal",  href: "/virus-removal" },
      { label: "Slow Computer Help",       href: "/computer-help" },
      { label: "GPS Help & Updates",       href: "/gps-help" },
      { label: "TriniCleaner Free Download", href: "/products" },
      { label: "Reparación en Español",    href: "/reparacion-impresoras" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact & Book", href: "/contact" },
      { label: "Step-by-Step Guides", href: "/guides" },
      { label: "vs. Geek Squad", href: "/comparison" },
      { label: "Official Google Site", href: OFFICIAL_SITE, external: true },
      { label: "Service Area Map", href: MAPS_URL, external: true },
      { label: "Google Business Reviews", href: "https://share.google/1mtrJVk8Ya0PkjG76", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Printer broken? PC slow? We fix it today.
            </h2>
            <p className="text-blue-200">24/7 remote support · All brands · No fix, no fee</p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap justify-center">
            <a
              href={PHONE_HREF}
              className="bg-white text-blue-700 font-bold px-6 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              📞 {PHONE}
            </a>
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors"
            >
              Book Online →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm">
                TS
              </div>
              <span className="font-bold text-lg">Trini System <span className="text-blue-400">LLC</span></span>
            </div>
            {/* 8-year badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-900 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-700">
                🏆 Est. 2016 — 8 Years in Business
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Expert remote tech support since 2016. Based in Corona, Queens, NY — serving all 50 states.
            </p>
            {/* NAP — critical for local SEO, must match Google Business exactly */}
            <address className="not-italic mb-4 space-y-1">
              <a href={PHONE_HREF} className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                📞 {PHONE}
              </a>
              <p className="text-xs text-gray-500">52-09 99th St Apt 8S, Corona, NY 11368</p>
              <p className="text-xs text-gray-500">Available 24/7 · Remote & On-Site</p>
            </address>
            {/* Google rating link */}
            <a
              href="https://share.google/1mtrJVk8Ya0PkjG76"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-3 text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors"
            >
              ⭐⭐⭐⭐⭐ 4.9 Google Rating ↗
            </a>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center gap-2 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              ⬇ Download TriniCleaner — Free
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              <p className="text-xs text-gray-600 font-semibold">Follow us:</p>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-gray-900 hover:bg-gray-700 flex items-center justify-center transition-colors" aria-label="TikTok">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.03-.09z"/></svg>
              </a>
              <a href={SOCIAL.google} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center transition-colors" aria-label="Google Reviews">
                <span className="text-white text-xs font-black">G★</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2016–2025 Trini System LLC · Corona, Queens, NY · Independent tech support — not affiliated with HP, Canon, Epson, Brother or Best Buy.
          </p>
          <div className="flex items-center gap-3">
            {["24/7 Available", "Est. 2016", "All 50 States", "4.9★ Google"].map(b => (
              <span key={b} className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
