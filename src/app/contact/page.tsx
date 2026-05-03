"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF, MAPS_URL, OFFICIAL_SITE, DOWNLOAD_URL } from "@/lib/utils";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", issue: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Contact form error:", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-12 pb-24 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
              📞 24/7 — Real Humans Only
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Let&apos;s Fix It
              <span className="block text-gradient"> Right Now.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              A real technician picks up — not a bot. Average response time: under 5 minutes.
            </p>
          </div>

          {/* Live status */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3 bg-white border border-emerald-200 rounded-2xl px-5 py-3 shadow-soft">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Technicians online now</span>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-500">Avg. response &lt; 5 min</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-gray-900 mb-4">How to Reach Us</h2>

              {[
                {
                  icon: "📞", title: "Call or Text", sub: "Fastest — speak to a tech in seconds",
                  action: { label: PHONE, href: PHONE_HREF }, badge: "24/7", color: "blue",
                },
                {
                  icon: "📞", title: "Request a Callback", sub: "Enter your name and number — we call you back",
                  action: { label: "Request Callback", href: "/contact#form" }, badge: "< 5 min", color: "purple",
                },
                {
                  icon: "🗺️", title: "Service Area Map", sub: "See if we cover on-site visits in your area",
                  action: { label: "View Coverage Map", href: MAPS_URL }, badge: "All 50 States", color: "teal",
                },
                {
                  icon: "🌐", title: "Official Trini System Site", sub: "Visit our main website and info pages",
                  action: { label: "Visit Official Site", href: OFFICIAL_SITE }, badge: "USA & Canada", color: "gray",
                },
              ].map(item => (
                <a
                  key={item.title}
                  href={item.action.href}
                  target={item.action.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-soft transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{item.badge}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-1">{item.action.label} →</p>
                  </div>
                </a>
              ))}

              {/* TriniCleaner CTA */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 p-5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">PC running slow? Try TriniCleaner first</p>
                    <p className="text-sm text-gray-600 mb-3">Our free Windows optimizer might solve your problem without any support needed.</p>
                    <a href={DOWNLOAD_URL}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
                      ⬇ Download Free
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-soft-lg p-7">
              <h2 className="text-xl font-black text-gray-900 mb-1">Send a Message</h2>
              <p className="text-sm text-gray-500 mb-6">We reply within 30 minutes during business hours, within 2 hours overnight.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="text-6xl mb-4"
                    >
                      ✅
                    </motion.div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">We&apos;ll be in touch shortly. For urgent help, call <a href={PHONE_HREF} className="text-blue-600 font-semibold">{PHONE}</a></p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", issue: "", message: "" }); }}
                      className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Name *</label>
                        <input type="text" required value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="John Smith"
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Phone</label>
                        <input type="tel" value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Email *</label>
                      <input type="email" required value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="john@email.com"
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">What do you need help with? *</label>
                      <select required value={form.issue}
                        onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base transition-all bg-white">
                        <option value="">Select an issue…</option>
                        <optgroup label="HP Printers">
                          <option>HP Printer — Offline / Not Connecting to WiFi</option>
                          <option>HP DeskJet 4155e Setup</option>
                          <option>HP DeskJet 2755e Setup</option>
                          <option>HP Printer Error Code</option>
                        </optgroup>
                        <optgroup label="Canon Printers">
                          <option>Canon Printer — Error B200</option>
                          <option>Canon Printer — WiFi / Driver Issue</option>
                          <option>Canon PIXMA Setup</option>
                        </optgroup>
                        <optgroup label="Epson Printers">
                          <option>Epson EcoTank — Ink Error / Won&apos;t Print</option>
                          <option>Epson WorkForce — Network Setup</option>
                        </optgroup>
                        <optgroup label="Brother Printers">
                          <option>Brother Printer — Driver / Windows 11 Issue</option>
                          <option>Brother AirPrint / Mopria Setup</option>
                        </optgroup>
                        <optgroup label="PC & Software">
                          <option>PC Running Slow / Windows Repair</option>
                          <option>Virus or Malware Removal</option>
                          <option>TriniCleaner Help / Installation</option>
                          <option>Windows 11 Issue</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option>Garmin GPS Map Update</option>
                          <option>Antivirus Setup</option>
                          <option>Home Office Setup</option>
                          <option>Something Else</option>
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Describe the Problem</label>
                      <textarea rows={4} value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="e.g. My HP DeskJet 4155e shows as offline on Windows 11 after I changed my WiFi password..."
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-base transition-all resize-none" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-lg py-4 px-6 rounded-2xl shadow-brand transition-all disabled:opacity-70 active:scale-[0.98]">
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Sending…
                        </>
                      ) : "Send Message — We'll Reply Fast →"}
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      Or call directly: <a href={PHONE_HREF} className="text-blue-600 font-semibold hover:underline">{PHONE}</a> · Available 24/7
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
