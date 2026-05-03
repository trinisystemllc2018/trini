import type { Metadata } from "next";
import PremiumServicePage from "@/components/features/PremiumServicePage";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";

export const metadata: Metadata = {
  // 47 chars + " | Trini System" suffix (16) = 63 chars — fits Bing limit
  title: "Slow Computer Fix — Free PC Cleaner & Repair",
  // 154 chars — within Bing 70-160 limit
  description:
    "Fix slow PC, blue screen & Windows 11 errors fast. Free TriniCleaner + remote tech support for Dell, HP, Lenovo. From $49. Call 347-953-1531 today.",
  alternates: { canonical: "https://trinisystem.vercel.app/computer-help" },
  openGraph: {
    title: "Slow Computer Fix — Free PC Cleaner & Repair | Trini System",
    description: "Fix slow PC, blue screen & Windows 11 errors. Free TriniCleaner + remote support. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/computer-help",
    type: "website",
  },
  keywords: [
    "computer running slow fix","slow pc fix free","windows 11 slow","blue screen fix",
    "computer won't start","laptop running slow","dell computer slow","hp laptop slow",
    "lenovo laptop problems","windows update stuck","computer repair near me","remote computer fix",
    "fix slow windows 10","computer boot loop","startup programs","free computer cleaner",
    "pc optimization","windows 11 problems","computer freezing fix","make pc faster free",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Computer Help", item: "https://trinisystem.vercel.app/computer-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Why is my computer running so slow?",
        acceptedAnswer: { "@type": "Answer", text: "A slow Windows PC is almost always caused by junk files (avg 4–8 GB), too many startup programs, registry errors, or a nearly full hard drive. Download TriniCleaner free from Trini System to remove junk and disable unnecessary startup programs in one click. Call 347-953-1531 if it's still slow." } },
      { "@type": "Question", name: "How do I fix a blue screen of death (BSOD) on Windows?",
        acceptedAnswer: { "@type": "Answer", text: "Note the STOP code shown on the blue screen. Boot into Safe Mode (F8 or Shift+Restart → Troubleshoot → Advanced). Update all drivers, especially display and network adapters. Run Windows Memory Diagnostic (mdsched.exe) to check RAM. Trini System fixes BSOD errors remotely — call 347-953-1531." } },
      { "@type": "Question", name: "How do I make Windows 11 faster?",
        acceptedAnswer: { "@type": "Answer", text: "Download TriniCleaner (free) to remove junk files and disable startup programs. In Windows 11: Settings → System → Power & Sleep → Power mode → set to 'Best Performance'. Also disable visual effects: search 'Adjust the appearance and performance of Windows' → select 'Adjust for best performance'." } },
      { "@type": "Question", name: "How do I fix Windows 11 update stuck at 100%?",
        acceptedAnswer: { "@type": "Answer", text: "Wait at least 2 hours — large updates genuinely take a long time. If still stuck, restart your PC (it's usually safe). If it loops: boot to Safe Mode, run Windows Update Troubleshooter (Settings → System → Troubleshoot). Trini System fixes stuck Windows updates remotely — call 347-953-1531." } },
      { "@type": "Question", name: "How much does remote PC repair cost?",
        acceptedAnswer: { "@type": "Answer", text: "Most slow PC issues are fixed free with TriniCleaner download. For complex issues — blue screens, viruses, Windows problems — Trini System remote repair starts at $49. No fix = no fee guaranteed. Compare to Geek Squad's $149+ fee." } },
    ],
  },
];

export default function ComputerHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PremiumServicePage
        category="computer"
        badgeText="Computer Repair & Optimization"
        heroTitle="Computer Running Slow?"
        heroHighlight="Fix It Free in 5 Minutes"
        heroSub="Slow PC, blue screen, Windows errors — free TriniCleaner tool + remote technician support for complex fixes."
        heroGradient="linear-gradient(135deg,#1a0545 0%,#2e0e72 40%,#3b1299 100%)"
        accentColor="violet"
        accentHex="#8b5cf6"
        glowColor="rgba(139,92,246,0.4)"
        stats={[
          { value: "Free", label: "TriniCleaner Tool" },
          { value: "98%", label: "Fix Rate for Slow PCs" },
          { value: "5 min", label: "Average Clean Time" },
          { value: "$49", label: "Complex Fixes" },
        ]}
        trending={[
          { label: "Windows 11 slow" },
          { label: "Blue screen BSOD" },
          { label: "Laptop won't start" },
          { label: "Dell Inspiron slow" },
          { label: "HP boot loop" },
          { label: "Windows update stuck" },
        ]}
        downloadLabel="Download TriniCleaner — Free"
        downloadHref={DOWNLOAD_URL}
        brandSectionTitle="What Brand Is Your Computer?"
        brandSectionSub="Select your computer brand for a tailored fix guide"
        brands={[
          { name: "Dell", icon: "💻", sub: "Inspiron · Latitude · XPS · Vostro", color: "#007db8", models: ["Inspiron 15", "Latitude 5520", "XPS 13", "Vostro 15"] },
          { name: "HP", icon: "🖥️", sub: "Pavilion · Envy · EliteBook · ProBook", color: "#0096d6", models: ["Pavilion 15", "Envy x360", "EliteBook 840", "ProBook 450"] },
          { name: "Lenovo", icon: "⬛", sub: "ThinkPad · IdeaPad · Yoga · Legion", color: "#e10000", models: ["ThinkPad X1 Carbon", "IdeaPad 5", "Yoga 9i", "Legion 5"] },
          { name: "Other / Custom", icon: "🔧", sub: "Acer · ASUS · Gateway · Custom", color: "#6b7280", models: ["Acer Aspire", "ASUS VivoBook", "Gateway NE Series", "Custom PC"] },
        ]}
        stepsSectionTitle="15-Step Slow PC Fix Guide"
        stepsSectionSub="Follow every step — most slow PCs are fixed by step 8"
        steps={[
          { icon: "🔄", title: "Restart your computer (properly)", detail: "Click Start → Power → Restart (not Shut Down). Windows 10/11 uses 'Fast Startup' which doesn't fully restart. A proper restart clears memory and resets processes." },
          { icon: "⬇️", title: "Download TriniCleaner (free)", detail: "Visit trinisystem.vercel.app/products and download TriniCleaner for Windows. It's 100% free — no subscription, no credit card. Works on Windows 7, 8, 10, and 11." },
          { icon: "🗑️", title: "Run junk file cleaner", detail: "Open TriniCleaner → click 'Clean Junk Files'. Average user has 4–8 GB of temp files, browser cache, Windows update logs, and recycle bin items slowing them down." },
          { icon: "🚀", title: "Disable unnecessary startup programs", detail: "TriniCleaner → 'Startup Manager'. Disable programs you don't need at startup (Teams, Spotify, Adobe, OneDrive). Most PCs have 20–40 unnecessary startup items." },
          { icon: "📋", title: "Fix registry errors", detail: "TriniCleaner → 'Registry Fix'. Orphaned registry entries from uninstalled programs force Windows to search through junk every time it starts." },
          { icon: "💾", title: "Check disk space", detail: "Open File Explorer → right-click C: drive → Properties. If it's over 85% full, performance drops sharply. Delete large files or move them to external storage." },
          { icon: "⚡", title: "Set power mode to Best Performance", detail: "Settings → System → Power & Battery → Power mode → 'Best Performance'. Many laptops default to 'Balanced' which throttles CPU speed." },
          { icon: "🎨", title: "Disable visual effects", detail: "Search 'Adjust the appearance and performance of Windows'. Select 'Adjust for best performance'. This removes animations and transparency effects." },
          { icon: "🔄", title: "Check for Windows updates", detail: "Settings → Windows Update → Check for Updates. Install all pending updates. Outdated Windows causes compatibility issues that degrade performance." },
          { icon: "💻", title: "Update all device drivers", detail: "Device Manager → right-click each device → Update Driver. Focus on display adapter, network adapter, and chipset drivers. Outdated drivers cause crashes and slowdowns." },
          { icon: "🛡️", title: "Run a full antivirus scan", detail: "Windows Security → Virus & Threat Protection → Full Scan. Hidden malware and cryptominers use your CPU in the background. This scan takes 30–60 minutes." },
          { icon: "🔍", title: "Check for memory (RAM) issues", detail: "Search 'Windows Memory Diagnostic' (mdsched.exe) → Restart and check. This tests your RAM for errors. Faulty RAM causes freezing, blue screens, and slowdowns." },
          { icon: "💿", title: "Check hard drive health", detail: "Open Command Prompt as admin → type 'chkdsk /f C:' → restart when prompted. This checks for and fixes disk errors. Failing drives cause extreme slowdowns." },
          { icon: "🔧", title: "Run System File Checker", detail: "Open Command Prompt as admin → type 'sfc /scannow'. This checks all Windows system files and repairs any corrupted ones. Takes about 15 minutes." },
          { icon: "✅", title: "Final restart and test", detail: "Restart your computer. Time how long it takes to reach the desktop. Should be under 60 seconds on an SSD. If still slow, call us at 347-953-1531 — we fix it remotely." },
        ]}
        reviewsTitle="4.9 Stars · 3,000+ PC Repairs"
        reviews={[
          { name: "Dorothy M.", stars: 5, text: "My Dell was taking 20 minutes to start. Downloaded TriniCleaner and found 9 GB of junk. After cleaning it starts in 45 seconds. Incredible!", loc: "Columbus, OH" },
          { name: "Thomas H.", stars: 5, text: "Blue screen every day for a week. Trini System connected remotely and fixed the driver issue in 35 minutes. Haven't had a BSOD since.", loc: "Portland, OR" },
          { name: "Barbara N.", stars: 5, text: "Windows 11 was unusably slow on my HP laptop. The tech fixed startup programs and cleaned junk remotely. Feels like a new computer.", loc: "Nashville, TN" },
          { name: "Richard K.", stars: 5, text: "Computer stuck on Windows update for 3 days. Trini System fixed it remotely and explained exactly what they were doing. Very trustworthy.", loc: "Sacramento, CA" },
        ]}
        faqTitle="Computer Help — FAQ"
        faqs={[
          { q: "Why is my computer running so slow?", a: "Usually junk files (4–8 GB), too many startup programs, registry errors, or a nearly full hard drive. Download TriniCleaner free to fix all of these in one click. If still slow, call us at 347-953-1531." },
          { q: "How do I fix a blue screen of death (BSOD)?", a: "Note the STOP code. Boot into Safe Mode (F8 or Shift+Restart → Troubleshoot). Update all drivers, especially display and network. Run Windows Memory Diagnostic. We fix BSOD errors remotely." },
          { q: "How do I make Windows 11 faster?", a: "Download TriniCleaner (free) to remove junk and disable startup programs. Set Power mode to 'Best Performance'. Disable visual effects via 'Adjust the appearance and performance of Windows'." },
          { q: "My Windows update has been stuck for hours — what do I do?", a: "Wait at least 2 hours. If truly stuck: restart your PC. If it loops, boot to Safe Mode and run the Windows Update Troubleshooter. We fix stuck updates remotely." },
          { q: "How much does remote PC repair cost?", a: "Most slow PC issues are fixed free with TriniCleaner. For complex issues — BSOD, viruses, Windows corruption — remote repair starts at $49. No fix = no fee." },
        ]}
        ctaTitle="Still having PC problems?"
        ctaSub="Our techs connect remotely and fix complex Windows issues while you watch — from $49."
        ctaPrimaryLabel={`Call ${PHONE}`}
        ctaPrimaryHref={PHONE_HREF}
      />

      <StickyCTA />
    </>
  );
}
