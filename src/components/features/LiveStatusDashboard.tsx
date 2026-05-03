"use client";
import { useState, useEffect } from "react";
import { PHONE_HREF, PHONE } from "@/lib/utils";

/* ─────────────────────────────────────────
   LIVE STATUS DASHBOARD — support availability
───────────────────────────────────────── */

const SERVICES_STATUS = [
  { name: "Printer Repair (Remote)", status: "online", label: "Available Now" },
  { name: "PC & Windows Support", status: "online", label: "Available Now" },
  { name: "Garmin GPS Updates", status: "online", label: "Available Now" },
  { name: "TriniCleaner Download", status: "online", label: "Always Available" },
  { name: "Antivirus & Malware Removal", status: "online", label: "Available Now" },
  { name: "Home Office Setup", status: "online", label: "Available Now" },
];

const STATS = [
  { label: "Avg. Response Time", value: "< 5 min" },
  { label: "Issues Resolved Today", value: "12" },
  { label: "Customer Satisfaction", value: "4.9 ★" },
  { label: "Uptime", value: "99.9%" },
];

export function LiveStatusDashboard() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-emerald-200">
            <span
              className={`w-2 h-2 rounded-full bg-emerald-500 inline-block transition-opacity duration-700 ${pulse ? "opacity-100" : "opacity-30"}`}
            />
            Live System Status
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            We&apos;re Online &amp; Ready
          </h2>
          <p className="text-gray-500 text-lg">
            All support services are currently available. Reach us now — no wait time.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map(stat => (
            <div
              key={stat.label}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center"
            >
              <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services status list */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 px-6 py-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Service</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Availability</span>
          </div>
          {SERVICES_STATUS.map((svc, i) => (
            <div
              key={svc.name}
              className={`grid grid-cols-3 items-center px-6 py-4 border-b border-gray-50 ${
                i % 2 === 1 ? "bg-gray-50/40" : ""
              }`}
            >
              <span className="text-sm font-semibold text-gray-800">{svc.name}</span>
              <span className="flex items-center justify-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full bg-emerald-500 inline-block transition-opacity duration-700 ${
                    pulse ? "opacity-100" : "opacity-50"
                  }`}
                />
                <span className="text-xs font-bold text-emerald-600">Online</span>
              </span>
              <span className="text-xs text-gray-500 text-right">{svc.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            📞 Call {PHONE} — Talk to a Technician Now
          </a>
          <p className="text-sm text-gray-400 mt-3">No hold music. No bots. A real technician picks up.</p>
        </div>
      </div>
    </section>
  );
}
