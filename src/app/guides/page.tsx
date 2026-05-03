import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_HREF } from "@/lib/utils";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Printer Setup & Repair Guides — Step by Step",
  description: "Free step-by-step guides for HP DeskJet 4155e setup, Canon PIXMA WiFi, Epson EcoTank ink reset, Brother driver install, and Windows PC repair.",
  alternates: { canonical: "https://trinisystem.vercel.app/guides" },
};

const GUIDES = [
  {
    category: "HP Printers",
    color: "blue",
    icon: "🖨️",
    guides: [
      { title: "HP DeskJet 4155e Complete Setup Guide", desc: "Unbox to wireless printing in 15 minutes. Covers Windows 10/11 and Mac.", time: "15 min", difficulty: "Easy", keywords: ["HP DeskJet 4155e setup", "HP 4155e wireless"] },
      { title: "HP DeskJet 2755e WiFi Setup Step by Step", desc: "Connect your HP 2755e to WiFi and install drivers on Windows.", time: "12 min", difficulty: "Easy", keywords: ["HP DeskJet 2755e setup", "HP 2755e WiFi"] },
      { title: "Fix HP Printer Showing Offline — 6 Methods", desc: "Try these fixes in order to get your HP printer back online.", time: "10 min", difficulty: "Easy", keywords: ["HP printer offline fix", "HP printer not connecting"] },
      { title: "HP Printer Error Codes 49, 50, 79, OXc19a0035 — Fix Guide", desc: "Decode and fix the most common HP printer error codes.", time: "20 min", difficulty: "Medium", keywords: ["HP error 49", "HP error OXc19a0035"] },
      { title: "HP Printer WiFi Setup Without Touching the Printer", desc: "Use HP Smart app to set up wireless printing from your phone.", time: "8 min", difficulty: "Easy", keywords: ["HP printer WiFi setup", "HP Smart app"] },
    ],
  },
  {
    category: "Canon Printers",
    color: "red",
    icon: "🖨️",
    guides: [
      { title: "Fix Canon PIXMA Error B200 — Works on MX922, MG3620", desc: "Step-by-step fix for Canon's most dreaded error. Most cases fixable.", time: "20 min", difficulty: "Medium", keywords: ["Canon B200 error fix", "Canon PIXMA B200"] },
      { title: "Canon TR4520 Wireless Setup Guide", desc: "Connect your Canon TR4520 to WiFi and print from Windows or Mac.", time: "12 min", difficulty: "Easy", keywords: ["Canon TR4520 setup", "Canon TR4520 WiFi"] },
      { title: "Canon PIXMA MX922 Driver Install — Windows 11", desc: "Download and install the correct driver for MX922 on Windows 11.", time: "10 min", difficulty: "Easy", keywords: ["Canon MX922 driver Windows 11"] },
    ],
  },
  {
    category: "Epson Printers",
    color: "teal",
    icon: "🖨️",
    guides: [
      { title: "Epson EcoTank ET-2720 Ink Error Fix", desc: "Fix ink system errors on ET-2720 when tanks are full. Sensor reset guide.", time: "15 min", difficulty: "Medium", keywords: ["Epson ET-2720 ink error", "Epson EcoTank not printing"] },
      { title: "Epson EcoTank ET-4760 WiFi Setup Guide", desc: "Complete wireless setup guide for the ET-4760 on any network.", time: "12 min", difficulty: "Easy", keywords: ["Epson ET-4760 setup", "Epson EcoTank WiFi"] },
      { title: "Epson Nozzle Check & Head Cleaning — Any Model", desc: "Run a nozzle check and head cleaning cycle to fix print quality.", time: "10 min", difficulty: "Easy", keywords: ["Epson nozzle check", "Epson head cleaning"] },
    ],
  },
  {
    category: "Brother Printers",
    color: "indigo",
    icon: "🖨️",
    guides: [
      { title: "Brother MFC-L2710DW Driver Fix — Windows 11", desc: "Fix 'Driver Unavailable' error on Brother MFC after Windows 11 update.", time: "15 min", difficulty: "Medium", keywords: ["Brother MFC-L2710DW Windows 11", "Brother driver unavailable"] },
      { title: "Brother HL-L2350DW Wireless Setup Guide", desc: "Set up your Brother laser printer on WiFi — step by step.", time: "10 min", difficulty: "Easy", keywords: ["Brother HL-L2350DW WiFi", "Brother laser printer setup"] },
      { title: "Brother Printer AirPrint & Mopria Setup", desc: "Print from iPhone or Android to your Brother printer wirelessly.", time: "8 min", difficulty: "Easy", keywords: ["Brother AirPrint", "Brother Mopria"] },
    ],
  },
  {
    category: "PC & Windows",
    color: "purple",
    icon: "💻",
    guides: [
      { title: "How to Speed Up a Slow Windows 10/11 PC — Free", desc: "Free methods to speed up your PC without buying anything. Includes TriniCleaner.", time: "20 min", difficulty: "Easy", keywords: ["speed up Windows 11", "make PC faster free"] },
      { title: "Remove Viruses & Malware from Windows — Step by Step", desc: "Safe, free method to scan and remove viruses using Malwarebytes.", time: "25 min", difficulty: "Medium", keywords: ["remove virus Windows", "malware removal free"] },
      { title: "Garmin GPS Map Update — Complete Guide 2024", desc: "Update maps on any Garmin device using Garmin Express.", time: "15 min", difficulty: "Easy", keywords: ["Garmin GPS map update", "Garmin Express guide"] },
    ],
  },
];

const colorMap: Record<string, { badge: string; btn: string; border: string }> = {
  blue:   { badge: "bg-blue-100 text-blue-700",     btn: "bg-blue-600 hover:bg-blue-700",   border: "border-blue-200" },
  red:    { badge: "bg-red-100 text-red-700",       btn: "bg-red-600 hover:bg-red-700",     border: "border-red-200" },
  teal:   { badge: "bg-teal-100 text-teal-700",     btn: "bg-teal-600 hover:bg-teal-700",   border: "border-teal-200" },
  indigo: { badge: "bg-indigo-100 text-indigo-700", btn: "bg-indigo-600 hover:bg-indigo-700",border: "border-indigo-200" },
  purple: { badge: "bg-purple-100 text-purple-700", btn: "bg-purple-600 hover:bg-purple-700",border: "border-purple-200" },
};

const difficultyColor: Record<string, string> = {
  Easy:   "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard:   "bg-red-100 text-red-700",
};

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-amber-50/60 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-amber-200">
            📖 Free Step-by-Step Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Fix It Yourself —
            <span className="block text-gradient"> We Show You How.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            Free guides for every printer brand, Windows PC fixes, and GPS updates. Written for regular people — no tech experience needed.
          </p>
          <p className="text-gray-500">
            Prefer live help?{" "}
            <a href={PHONE_HREF} className="text-blue-600 font-semibold hover:underline">Call 347-953-1531</a>{" "}
            and a real technician will walk you through it.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
          {GUIDES.map(section => {
            const c = colorMap[section.color];
            return (
              <div key={section.category}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">{section.category}</h2>
                  <div className={`ml-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${c.badge}`}>
                    {section.guides.length} guides
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.guides.map(guide => (
                    <div
                      key={guide.title}
                      className={`group bg-white rounded-3xl border-2 ${c.border} hover:shadow-soft-lg hover:-translate-y-1 transition-all p-6 flex flex-col`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${difficultyColor[guide.difficulty]}`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">⏱ {guide.time}</span>
                      </div>
                      <h3 className="font-black text-gray-900 text-base leading-tight mb-2 flex-1">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">{guide.desc}</p>
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href="/tools"
                          className={`flex-1 flex items-center justify-center text-white text-sm font-bold py-2.5 px-4 rounded-xl ${c.btn} transition-colors`}
                        >
                          Read Guide →
                        </Link>
                        <a
                          href={PHONE_HREF}
                          className="flex items-center justify-center text-gray-500 hover:text-blue-600 text-sm font-medium py-2.5 px-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-all"
                          title="Get live help"
                        >
                          📞
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Still stuck after reading the guide?
          </h2>
          <p className="text-blue-200 mb-6 text-lg">Call us and we&apos;ll fix it remotely while you watch — no extra charge beyond our normal rates.</p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-black text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all"
          >
            📞 Call 347-953-1531 — We&apos;ll Fix It Live
          </a>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
