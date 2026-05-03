import type { Metadata } from "next";
import { DOWNLOAD_URL, PHONE_HREF } from "@/lib/utils";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Free Downloads — TriniCleaner PC Optimizer",
  description: "Download TriniCleaner free — Windows PC optimizer that removes junk files, fixes registry errors, and speeds up your computer. No subscription ever.",
  alternates: { canonical: "https://trinisystem.vercel.app/downloads" },
};

export default function DownloadsPage() {
  return (
    <>
      <section className="pt-12 pb-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-emerald-200">
              ⬇ Free Downloads — No Subscription
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Free Software
              <span className="block text-gradient-trust"> by Trini System LLC</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              We build free tools that solve real problems for everyday people across USA & Canada.
            </p>
          </div>

          {/* Main download card */}
          <div className="bg-white rounded-4xl shadow-soft-xl border border-gray-100 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 md:p-10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl shadow-lg">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl md:text-3xl font-black text-white">TriniCleaner</h2>
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">v1.0.0</span>
                    <span className="bg-white text-emerald-700 text-xs font-black px-3 py-1 rounded-full">FREE</span>
                  </div>
                  <p className="text-emerald-100 text-lg mb-1">Windows PC Optimizer & Junk Cleaner</p>
                  <div className="flex items-center gap-4 text-emerald-200 text-sm">
                    <span>📦 ~12 MB</span>
                    <span>🪟 Windows 7–11</span>
                    <span>✓ 32-bit & 64-bit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-black text-gray-900 mb-4">What It Does</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "🗑️", text: "Removes junk files & temp data (avg. 3–8 GB freed)" },
                      { icon: "🔧", text: "Fixes registry errors that cause slowdowns & crashes" },
                      { icon: "🚀", text: "Manages startup programs for faster boot time" },
                      { icon: "🌐", text: "Clears browser cache (Chrome, Edge, Firefox)" },
                      { icon: "🔒", text: "Privacy cleaner — removes activity traces" },
                    ].map(f => (
                      <div key={f.icon} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="text-xl">{f.icon}</span>
                        {f.text}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-4">System Requirements</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    {[
                      ["OS", "Windows 7, 8, 8.1, 10, or 11"],
                      ["Architecture", "32-bit or 64-bit"],
                      ["RAM", "512 MB minimum (1 GB recommended)"],
                      ["Disk Space", "50 MB free space"],
                      ["Internet", "Not required after install"],
                      ["Price", "Completely FREE — always"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                        <span className="font-semibold text-gray-500 w-28 shrink-0">{k}</span>
                        <span className="text-gray-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={DOWNLOAD_URL}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xl py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  <span className="text-2xl">⬇</span> Download TriniCleaner.exe
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold text-base py-5 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all"
                >
                  📞 Need Install Help?
                </a>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                No account, no sign-up, no credit card. Just download and run.
              </p>
            </div>
          </div>

          {/* Coming soon */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🔄", title: "TriniDriver", desc: "Auto-update all Windows drivers. Coming 2025.", status: "Coming Soon" },
              { icon: "🔍", title: "TriniScan", desc: "Deep virus scan with one click. Coming 2025.", status: "Coming Soon" },
              { icon: "📶", title: "TriniNet", desc: "Home network optimizer & speed tester.", status: "Coming Soon" },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 p-6 text-center opacity-60">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-black text-gray-700 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{item.desc}</p>
                <span className="text-xs bg-gray-200 text-gray-500 px-3 py-1.5 rounded-full font-bold">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <StickyCTA />
    </>
  );
}
