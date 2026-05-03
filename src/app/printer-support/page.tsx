import type { Metadata } from "next";
import Link from "next/link";
import PremiumServicePage from "@/components/features/PremiumServicePage";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fix Printer Online — HP, Canon, Epson, Brother",
  description:
    "Fix your printer fast — HP offline, Canon B200, Epson ink error, Brother driver. Free step-by-step guide. Remote tech from $49. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/printer-support" },
  openGraph: {
    title: "Fix Printer Online — HP, Canon, Epson, Brother | Trini System",
    description: "Fix your printer in minutes. Free diagnosis. Remote tech from $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/printer-support",
    type: "website",
  },
  keywords: [
    "fix printer online","hp printer offline fix","canon printer error b200","epson printer not printing",
    "brother printer driver windows 11","printer repair near me","remote printer repair","hp deskjet offline",
    "epson ecotank ink error","canon pixma not printing","printer won't connect wifi","printer repair service",
    "fix hp printer","printer offline windows 11","hp printer 0x6100004a error","free printer diagnosis",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Printer Support", item: "https://trinisystem.vercel.app/printer-support" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I fix my HP printer showing offline?",
        acceptedAnswer: { "@type": "Answer", text: "Restart your printer and WiFi router. On Windows: Settings → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'. If still offline after that, visit 123.hp.com to reinstall the driver. Trini System fixes HP offline errors remotely in 15 minutes — call 347-953-1531." } },
      { "@type": "Question", name: "What is Canon B200 error and how do I fix it?",
        acceptedAnswer: { "@type": "Answer", text: "The Canon B200 error indicates a print head issue, but 80% of B200 errors are caused by overheating — not broken hardware. The fix: power off and unplug for 15 minutes, manually center the cartridge carrier, hold Stop/Reset while pressing Power. Trini System resolves B200 errors remotely — call 347-953-1531." } },
      { "@type": "Question", name: "Why does my Epson EcoTank show an ink error when tanks are full?",
        acceptedAnswer: { "@type": "Answer", text: "Epson EcoTank ink errors on full tanks are almost always a sensor calibration issue, not actual ink problems. Run Epson Print and Scan Doctor from epson.com/support, then run Head Cleaning from Epson Utility. Trini System resets Epson ink sensors remotely in 15 minutes — call 347-953-1531." } },
      { "@type": "Question", name: "My Brother printer driver is unavailable after Windows 11 update — what do I do?",
        acceptedAnswer: { "@type": "Answer", text: "Remove the existing driver from Settings → Printers. Download the Full Driver & Software Package directly from support.brother.com (do not use Windows Update drivers). Install via USB first, then switch to wireless. Trini System fixes Brother Windows 11 driver issues remotely — call 347-953-1531." } },
      { "@type": "Question", name: "How much does remote printer repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System remote printer repair starts at $49 — about one-third the cost of Geek Squad. We offer a free diagnosis: if we can't fix your printer, you don't pay. Most printer issues are resolved in under 30 minutes. Call 347-953-1531." } },
      { "@type": "Question", name: "Can you fix my printer without me bringing it anywhere?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — Trini System fixes printers 100% remotely. We connect to your computer via secure remote session and fix the printer software, drivers, and network settings while you watch. We serve all 50 US states. No travel required, no drop-off needed." } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Remote Printer Repair Service",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: "United States",
    serviceType: "Printer Repair",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Remote printer repair — no fix no fee" },
  },
];

export default function FixPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PremiumServicePage
        category="printer"
        badgeText="Interactive Printer Diagnostic"
        heroTitle="Fix Your Printer"
        heroHighlight="Free Step-by-Step Guide"
        heroSub="HP, Canon, Epson, Brother — select your brand and get an instant fix. Remote technician available 24/7."
        heroGradient="linear-gradient(135deg,#0a0f2e 0%,#0e1a4a 40%,#0f2860 100%)"
        accentColor="blue"
        accentHex="#3b82f6"
        glowColor="rgba(59,130,246,0.4)"
        stats={[
          { value: "10,000+", label: "Printers Fixed" },
          { value: "94%", label: "First-Call Fix Rate" },
          { value: "15 min", label: "Avg Fix Time" },
          { value: "$49", label: "Starting Price" },
        ]}
        trending={[
          { label: "HP Offline" },
          { label: "Canon B200" },
          { label: "Epson Ink Error" },
          { label: "0x6100004a" },
          { label: "Brother Driver" },
          { label: "WiFi not printing" },
        ]}
        brandSectionTitle="What Brand Is Your Printer?"
        brandSectionSub="Select your printer brand to get a tailored fix guide"
        brands={[
          { name: "HP", icon: "🔵", sub: "DeskJet · Envy · OfficeJet · LaserJet", color: "#0096d6", models: ["DeskJet 4155e", "Envy 6055", "OfficeJet Pro 9015e", "LaserJet M404n"], href: "/hp-printer-repair" },
          { name: "Canon", icon: "🔴", sub: "PIXMA · imageCLASS · MAXIFY · Pro", color: "#cc0000", models: ["PIXMA MX922", "imageCLASS MF644Cdw", "MAXIFY MB5420", "PIXMA TR8620"], href: "/canon-printer-repair" },
          { name: "Epson", icon: "🟦", sub: "EcoTank · WorkForce · Expression · ET", color: "#0078a8", models: ["EcoTank ET-2720", "WorkForce WF-3820", "Expression Home XP-4105"], href: "/epson-printer-repair" },
          { name: "Brother", icon: "🟪", sub: "MFC · HL · DCP · ADS series", color: "#3b3b8f", models: ["MFC-L2710DW", "HL-L2350DW", "DCP-L2550DW", "MFC-J4535DW"] },
        ]}
        stepsSectionTitle="15-Step Printer Fix Guide"
        stepsSectionSub="Follow every step — most printers are fixed before step 10"
        steps={[
          { icon: "🔌", title: "Power off the printer completely", detail: "Don't just press sleep. Press and hold the power button until the printer fully shuts down. Wait for all lights to go off." },
          { icon: "⏳", title: "Unplug from wall for 60 seconds", detail: "Unplug the power cord from the wall outlet (not from the printer). This drains residual power and resets internal memory." },
          { icon: "📶", title: "Restart your WiFi router", detail: "Unplug your WiFi router for 30 seconds, then plug it back in. Wait until all lights are stable (about 90 seconds)." },
          { icon: "🔌", title: "Plug in and power on the printer", detail: "Plug the printer back in and power it on. Wait for it to fully initialize — the display should show 'Ready' or the WiFi icon should appear." },
          { icon: "🖥️", title: "Check printer status in Windows/Mac", detail: "Windows: Settings → Bluetooth & Devices → Printers & Scanners. Mac: System Preferences → Printers & Scanners. Look for your printer." },
          { icon: "❌", title: "Remove 'Use Printer Offline' flag", detail: "Click your printer → Open print queue → Printer menu → uncheck 'Use Printer Offline'. Also clear any stuck print jobs." },
          { icon: "🗑️", title: "Clear the print queue completely", detail: "Delete all pending jobs in the print queue. Right-click each job → Cancel. Stuck jobs block everything behind them." },
          { icon: "⭐", title: "Set as default printer", detail: "Right-click your printer → Set as Default. Windows sometimes switches the default to 'Microsoft Print to PDF' after updates." },
          { icon: "🖨️", title: "Print a test page", detail: "Right-click your printer → Printer Properties → Print Test Page. If it prints, you're done! If not, continue below." },
          { icon: "🔄", title: "Remove and re-add the printer", detail: "Remove the printer from Printers & Scanners. Click 'Add a printer' and let Windows discover it again — fresh connection." },
          { icon: "⬇️", title: "Download the latest driver", detail: "HP: 123.hp.com · Canon: usa.canon.com/support · Epson: epson.com/support · Brother: support.brother.com. Get the Full Driver." },
          { icon: "💻", title: "Install driver and follow setup wizard", detail: "Run the downloaded installer. Choose 'Wireless Setup' if WiFi. Follow all prompts — don't skip any steps." },
          { icon: "🔒", title: "Check firewall and antivirus", detail: "Some antivirus blocks printer communication. Temporarily disable firewall, test print, then re-enable with printer exceptions." },
          { icon: "📋", title: "Update printer firmware", detail: "Open the manufacturer's app (HP Smart, Canon My Printer, Epson Utility). Check for firmware updates — #1 cause of persistent errors." },
          { icon: "✅", title: "Final test print", detail: "Print a test page AND a real document. If both work, you're done. If not, call us at 347-953-1531 — we fix it remotely in 15 min." },
        ]}
        reviewsTitle="4.9 Stars · 10,000+ Printers Fixed"
        reviews={[
          { name: "Margaret T.", stars: 5, text: "HP printer was showing offline for 3 days. Called Trini System and they fixed it in literally 12 minutes while I watched. Amazing service.", loc: "Phoenix, AZ" },
          { name: "Robert M.", stars: 5, text: "Canon B200 error — everyone online said replace the printer. Trini System fixed it remotely in 30 minutes. Saved me $400.", loc: "Dallas, TX" },
          { name: "Linda K.", stars: 5, text: "My Epson EcoTank kept showing ink errors even with full tanks. Fixed remotely, explained everything, very patient with me.", loc: "Tampa, FL" },
          { name: "David W.", stars: 5, text: "Brother printer stopped working after Windows 11 update. Trini had it printing again in 20 minutes. Super professional.", loc: "Seattle, WA" },
        ]}
        faqTitle="Printer Fix — FAQ"
        faqs={[
          { q: "How do I fix my HP printer showing offline?", a: "Restart your printer and WiFi router. On Windows: Settings → Printers & Scanners → click HP → Open print queue → Printer menu → uncheck 'Use Printer Offline'. If still offline, visit 123.hp.com to reinstall the driver. We fix HP offline errors remotely in under 15 minutes." },
          { q: "What is Canon B200 error?", a: "Print head issue, but 80% are overheating — not broken hardware. Power off, unplug for 15 min, hold Stop/Reset while pressing Power. We resolve Canon B200 errors remotely — call 347-953-1531." },
          { q: "Why does my Epson EcoTank show ink error with full tanks?", a: "Sensor calibration issue. Run Epson Print and Scan Doctor (free at epson.com/support), then Head Cleaning from Epson Utility. We reset Epson ink sensors remotely in 15 minutes." },
          { q: "How much does printer repair cost?", a: "Remote printer repair starts at $49 — about one-third the cost of Geek Squad ($149+). Free diagnosis included. If we can't fix it, you don't pay." },
          { q: "Do I need to bring my printer somewhere?", a: "No — 100% remote. We connect to your computer via secure remote session and fix your printer's software, drivers, and network settings while you watch from home." },
        ]}
        ctaTitle="Still not printing?"
        ctaSub="Average printer fix takes 15 minutes. No fix, no fee."
        ctaPrimaryLabel={`Call ${PHONE}`}
        ctaPrimaryHref={PHONE_HREF}
      />

      {/* RELATED PAGES — Internal Link Sculpting */}
      <section aria-label="Related Printer Services" className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-xl font-black text-gray-900 mb-6">Browse by Brand & Service</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/hp-printer-repair" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Printer Repair</Link>
            <Link href="/canon-printer-repair" className="text-sm bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50 transition-colors">Canon Printer Repair</Link>
            <Link href="/epson-printer-repair" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Printer Repair</Link>
            <Link href="/printer-repair-near-me" className="text-sm bg-white border border-emerald-200 text-emerald-700 font-bold px-5 py-3 rounded-xl hover:bg-emerald-50 transition-colors">Printer Repair Near Me</Link>
            <Link href="/hp-printer-service" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">HP Printer Service</Link>
            <Link href="/epson-service-nyc" className="text-sm bg-white border border-blue-200 text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">Epson Service NYC</Link>
            <Link href="/epson-plotters" className="text-sm bg-white border border-cyan-200 text-cyan-700 font-bold px-5 py-3 rounded-xl hover:bg-cyan-50 transition-colors">Epson Plotters</Link>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
