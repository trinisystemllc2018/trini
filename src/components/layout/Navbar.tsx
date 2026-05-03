"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useAnimations";

const navLinks = [
  { href: "/",              label: "Home" },
  { href: "/printer-support", label: "Fix My Tech ⚡" },
  { href: "/services",      label: "Services" },
  { href: "/products",      label: "Free Cleaner" },
  { href: "/guides",        label: "Guides" },
  { href: "/contact",       label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const progress = useScrollProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 z-50 transition-all duration-100"
        style={{ width: `${progress * 100}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-soft border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.svg"
                alt="Trini System LLC logo"
                width={36}
                height={36}
                className="rounded-xl shadow-brand group-hover:shadow-glow transition-all duration-300"
              />
              <div>
                <span className="font-bold text-gray-900 text-base leading-tight block">
                  Trini System
                  <span className="text-blue-600"> LLC</span>
                </span>
                <span className="text-[10px] text-gray-500 leading-none block">USA & Canada Support</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="text-base">📞</span>
                <span className="hidden xl:inline">{PHONE}</span>
              </a>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl shadow-brand hover:shadow-glow transition-all duration-200 active:scale-95"
              >
                Get Help Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-soft-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 space-y-2 border-t border-gray-100">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl border-2 border-blue-200 text-blue-700 font-semibold text-base"
                  >
                    📞 Call {PHONE}
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-base shadow-brand"
                  >
                    Get Help Now →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-18" />
    </>
  );
}
