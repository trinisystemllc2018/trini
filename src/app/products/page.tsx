import type { Metadata } from "next";
import { DOWNLOAD_URL, PHONE_HREF } from "@/lib/utils";
import { DownloadAssistant } from "@/components/features/DownloadAssistant";
import { LiveStatusDashboard } from "@/components/features/LiveStatusDashboard";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "TriniCleaner — Free Windows PC Optimizer",
  description: "Download TriniCleaner free — removes junk files, fixes registry errors, speeds up boot time. Works on Windows 7, 8, 10 and 11. No subscription ever.",
  alternates: { canonical: "https://trinisystem.vercel.app/products" },
  keywords: ["free computer cleaner", "make computer faster", "free PC optimizer", "Windows junk remover", "free registry cleaner", "TriniCleaner download"],
};

function ProductHero() {
  return (
    <section className="pt-12 pb-20 bg-gradient-to-b from-emerald-50 via-white to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-emerald-200">
              ⚡ 100% Free · No Subscription Ever
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
              Make Your PC
              <span className="block text-gradient-trust">Fast Again.</span>
              <span className="block text-gray-400 text-3xl md:text-4xl font-semibold mt-1">For Free.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              TriniCleaner by Trini System LLC removes gigabytes of junk files, fixes registry errors, and manages startup programs — all in one click. Works on Windows 7, 8, 10, and 11.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={DOWNLOAD_URL}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xl px-8 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <span className="text-2xl">⬇</span> Download Free
              </a>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold text-lg px-8 py-5 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                📞 Need Install Help?
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Windows 7","Windows 8","Windows 10","Windows 11","32-bit & 64-bit"].map(os => (
                <span key={os} className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200">
                  ✓ {os}
                </span>
              ))}
            </div>
          </div>

          {/* Features list */}
          <div className="bg-white rounded-4xl shadow-soft-xl border border-gray-100 p-8">
            <h2 className="text-lg font-black text-gray-900 mb-6">What TriniCleaner Does</h2>
            {[
              { icon: "🗑️", title: "Junk File Removal", desc: "Removes temp files, downloads cache, old Windows update files. Average 3–8 GB freed." },
              { icon: "🔧", title: "Registry Cleaner", desc: "Fixes broken registry entries that cause Windows slowdowns, crashes, and errors." },
              { icon: "🚀", title: "Startup Manager", desc: "Disables programs that slow down your boot time. See which apps launch on startup." },
              { icon: "🌐", title: "Browser Cache Clean", desc: "Clears Chrome, Edge, and Firefox cache, cookies and history in one click." },
              { icon: "🔒", title: "Privacy Cleaner", desc: "Removes recent file lists, search history, and activity logs from Windows." },
            ].map((f, i) => (
              <div key={f.title} className={`flex items-start gap-4 py-4 ${i < 4 ? "border-b border-gray-50" : ""}`}>
                <span className="text-2xl w-10 shrink-0 text-center">{f.icon}</span>
                <div>
                  <p className="font-bold text-gray-900 mb-0.5">{f.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareTable() {
  const rows = [
    { feature: "Junk File Removal",   trini: "✓ Full scan",    ccleaner: "✓",      clean: "✓",      geek: "✓" },
    { feature: "Registry Cleaner",    trini: "✓ Deep clean",   ccleaner: "✓",      clean: "✓",      geek: "✗" },
    { feature: "Startup Manager",     trini: "✓ Included",     ccleaner: "Pro only",clean: "✓",     geek: "✗" },
    { feature: "Browser Cache Clean", trini: "✓ All browsers", ccleaner: "✓",      clean: "✓",      geek: "✗" },
    { feature: "No Subscription",     trini: "✓ Forever free", ccleaner: "✗ $29/yr",clean: "✗ $40/yr",geek: "✗ $99–$299" },
    { feature: "Works Offline",       trini: "✓ Yes",          ccleaner: "✓",      clean: "✓",      geek: "✗ Needs visit" },
    { feature: "Live Tech Support",   trini: "✓ Call us",      ccleaner: "✗",      clean: "✗",      geek: "✓ Extra fee" },
    { feature: "Price",               trini: "$0 — Free",      ccleaner: "$29/year",clean: "$39/year",geek: "$99–$299" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How We Compare</h2>
          <p className="text-gray-500 text-lg">TriniCleaner gives you everything the paid apps do — for free.</p>
        </div>
        <div className="bg-white rounded-3xl shadow-soft-xl border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Feature</th>
                <th className="p-4 text-center">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    ⚡ TriniCleaner
                  </span>
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-400">CCleaner Pro</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-400">CleanMyPC</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-400">Geek Squad</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feature} className={`border-b border-gray-50 ${i % 2 === 1 ? "bg-gray-50/40" : ""}`}>
                  <td className="p-4 text-sm font-medium text-gray-700">{r.feature}</td>
                  <td className="p-4 text-center">
                    <span className={`text-sm font-bold ${r.feature === "Price" ? "text-2xl text-emerald-600" : "text-emerald-600"}`}>
                      {r.trini}
                    </span>
                  </td>
                  <td className="p-4 text-center text-sm text-gray-500">{r.ccleaner}</td>
                  <td className="p-4 text-center text-sm text-gray-500">{r.clean}</td>
                  <td className="p-4 text-center text-sm text-gray-500">{r.geek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <a
            href={DOWNLOAD_URL}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all"
          >
            ⬇ Download TriniCleaner — Free
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <>
      <ProductHero />
      <DownloadAssistant />
      <LiveStatusDashboard />
      <CompareTable />
      <StickyCTA />
    </>
  );
}
