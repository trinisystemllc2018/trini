import type { Metadata } from "next";
import PremiumServicePage from "@/components/features/PremiumServicePage";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Virus & Malware Removal — Same Day Remote Fix",
  description:
    "Pro virus, malware, ransomware & spyware removal. Remote service — we clean your PC while you watch. No data loss. From $49. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/virus-removal" },
  openGraph: {
    title: "Virus & Malware Removal — Same Day Remote Fix | Trini System",
    description: "Pro virus, malware & ransomware removal. Remote service. No data loss. From $49. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/virus-removal",
    type: "website",
  },
  keywords: [
    "virus removal near me","malware removal service","computer virus removal","remove virus from pc",
    "ransomware removal","spyware removal","virus removal cost","online virus removal",
    "remote virus removal","computer virus fix","tech support scam","fake virus popup",
    "browser hijacked fix","antivirus not working","malwarebytes help","norton virus removal",
    "mcafee not working","computer hacked help","tech support scam recovery","pc security fix",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", position: 3, name: "Virus Removal", item: "https://trinisystem.vercel.app/virus-removal" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I know if my computer has a virus?",
        acceptedAnswer: { "@type": "Answer", text: "Signs your PC has a virus: sudden extreme slowdown, pop-up ads appearing even without a browser open, browser homepage or search engine changed without permission, antivirus keeps alerting or was turned off, strange emails being sent from your account, or a scary pop-up saying 'Call Microsoft'. If you notice any of these, call Trini System at 347-953-1531 immediately." } },
      { "@type": "Question", name: "How much does virus removal cost?",
        acceptedAnswer: { "@type": "Answer", text: "Trini System remote virus removal starts at $49 — significantly less than Geek Squad's $149+. We remove all viruses, malware, spyware, and ransomware remotely while you watch. No fix = no fee. We've never charged a customer for a failed removal." } },
      { "@type": "Question", name: "Will virus removal delete my files?",
        acceptedAnswer: { "@type": "Answer", text: "No. Trini System's remote virus removal is designed to preserve all your personal files, photos, and documents. We target and remove only malicious files and programs. In 8+ years and 5,000+ sessions, we have never caused data loss during a virus removal." } },
      { "@type": "Question", name: "That scary pop-up says to call Microsoft — is it real?",
        acceptedAnswer: { "@type": "Answer", text: "No — it is 100% a scam. Microsoft never shows pop-ups with phone numbers or calls you about viruses. Do NOT call the number. Close your browser (Ctrl+Alt+Delete → Task Manager → End Task on browser). Run Malwarebytes free scan. Call Trini System at 347-953-1531 if it comes back." } },
      { "@type": "Question", name: "What if I was scammed and gave someone remote access?",
        acceptedAnswer: { "@type": "Answer", text: "Call Trini System at 347-953-1531 immediately. We will connect remotely, check all programs installed by the scammer, remove their remote access software, check for keyloggers, and secure your accounts. Change your email and banking passwords from a different device as soon as possible." } },
      { "@type": "Question", name: "What is ransomware and can it be removed?",
        acceptedAnswer: { "@type": "Answer", text: "Ransomware encrypts your files and demands payment. Do NOT pay. Disconnect from the internet immediately. Call Trini System at 347-953-1531 — we assess ransomware recovery options, remove the ransomware, and help restore files from shadow copies or backups when possible." } },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Virus & Malware Removal Service",
    provider: { "@type": "LocalBusiness", name: "Trini System LLC", telephone: "+13479531531" },
    areaServed: "United States",
    serviceType: "Virus Removal",
    offers: { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Remote virus removal — no fix no fee" },
  },
];

export default function VirusRemovalPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PremiumServicePage
        category="virus"
        badgeText="Virus Removal — Same Day Service"
        heroTitle="Computer Infected?"
        heroHighlight="We Remove It Completely"
        heroSub="Virus, malware, ransomware, tech support scams — remote removal while you watch. No files lost. No fix = no fee."
        heroGradient="linear-gradient(135deg,#1a0000 0%,#3b0000 40%,#500000 100%)"
        accentColor="red"
        accentHex="#ef4444"
        glowColor="rgba(239,68,68,0.4)"
        stats={[
          { value: "5,000+", label: "PCs Secured" },
          { value: "99%", label: "Removal Success Rate" },
          { value: "$49", label: "Starting Price" },
          { value: "8+ yrs", label: "Zero Data Loss" },
        ]}
        trending={[
          { label: "Fake Microsoft pop-up" },
          { label: "Malwarebytes found threats" },
          { label: "Browser homepage changed" },
          { label: "Was scammed online" },
          { label: "Ransomware locked files" },
          { label: "PC hacked" },
        ]}
        brandSectionTitle="What Antivirus Do You Use?"
        brandSectionSub="Select your current security software for a tailored action plan"
        brands={[
          { name: "Norton", icon: "🟡", sub: "Norton 360 · AntiVirus Plus · Lifelock", color: "#ffc900", models: ["Norton 360 Deluxe", "Norton AntiVirus Plus", "Norton 360 with Lifelock"] },
          { name: "McAfee", icon: "🔴", sub: "Total Protection · LiveSafe · WebAdvisor", color: "#c8102e", models: ["McAfee Total Protection", "McAfee LiveSafe", "McAfee WebAdvisor"] },
          { name: "Malwarebytes", icon: "🔵", sub: "Free · Premium · Browser Guard", color: "#0d47a1", models: ["Malwarebytes Free", "Malwarebytes Premium", "Browser Guard"] },
          { name: "None / Not Sure", icon: "⚠️", sub: "Windows Defender · Avast · AVG", color: "#dc2626", models: ["Windows Defender only", "Avast Free", "AVG Free", "No antivirus"] },
        ]}
        stepsSectionTitle="15-Step Virus Removal Guide"
        stepsSectionSub="Emergency steps — follow in order. If you suspect active infection, start at step 1 now."
        steps={[
          { icon: "🌐", title: "Disconnect from the internet immediately", detail: "Unplug ethernet cable or turn off WiFi. This prevents the malware from sending your data to attackers or downloading more malicious files." },
          { icon: "💾", title: "Don't panic — your files are probably safe", detail: "Most malware doesn't delete files. Viruses, adware, and spyware steal data or show ads — your documents and photos are almost always still intact." },
          { icon: "📸", title: "Take a photo of any error messages", detail: "If you see a pop-up, error code, or ransom message — photograph it with your phone. This helps us identify the exact threat and apply the correct removal." },
          { icon: "⛔", title: "Do NOT call numbers shown in pop-ups", detail: "Microsoft, Apple, and Norton NEVER show pop-ups with phone numbers. These are 100% scams. If you already called, skip to step 15 immediately." },
          { icon: "❌", title: "Force-close the browser", detail: "Press Ctrl+Alt+Delete → Task Manager → find your browser (Chrome, Edge, Firefox) → End Task. Don't click anything inside the pop-up." },
          { icon: "🔄", title: "Restart in Safe Mode", detail: "Hold Shift + click Restart → Troubleshoot → Advanced → Startup Settings → Restart → press 4 for Safe Mode. This starts Windows with minimal programs." },
          { icon: "⬇️", title: "Download Malwarebytes Free", detail: "In Safe Mode, connect to WiFi and download Malwarebytes from malwarebytes.com. This is the industry-standard malware scanner — free and trusted." },
          { icon: "🔍", title: "Run a full Malwarebytes scan", detail: "Open Malwarebytes → Scan → Full Scan. This checks every file on your computer. Takes 30–60 minutes. Don't use the computer during the scan." },
          { icon: "🧹", title: "Quarantine all detected threats", detail: "After the scan, click 'Quarantine' to isolate all threats. This moves malicious files to a secure location where they can't run." },
          { icon: "🛡️", title: "Run Windows Defender full scan", detail: "Windows Security → Virus & Threat Protection → Scan Options → Full Scan. Run this as a second opinion after Malwarebytes. Two scanners catch more threats." },
          { icon: "🔎", title: "Check installed programs for suspicious software", detail: "Settings → Apps → Installed Apps. Look for programs you don't recognize. Sort by install date — malware installs itself without asking." },
          { icon: "🌐", title: "Reset browser settings", detail: "Chrome: Settings → Reset Settings → Restore to defaults. Edge: same path. Firefox: Help → Troubleshooting → Refresh Firefox. This removes hijacked homepages and extensions." },
          { icon: "🔑", title: "Change all important passwords", detail: "From a DIFFERENT device (phone or another computer), change passwords for email, banking, and social media. If a keylogger was installed, your current passwords may be compromised." },
          { icon: "🔒", title: "Enable Windows Defender real-time protection", detail: "Windows Security → Virus & Threat Protection → Manage Settings → turn ON Real-time protection, Cloud protection, and Automatic sample submission." },
          { icon: "✅", title: "Final scan and verification", detail: "Restart normally (not Safe Mode). Run one more Malwarebytes scan. If clean, you're secure. If threats persist, call us at 347-953-1531 — we'll remove everything remotely." },
        ]}
        reviewsTitle="4.9 Stars · 5,000+ Viruses Removed"
        reviews={[
          { name: "Helen F.", stars: 5, text: "Got one of those scary Microsoft pop-ups. Called Trini System in a panic — they were so calm and professional. Fixed it in 25 minutes.", loc: "Phoenix, AZ" },
          { name: "George P.", stars: 5, text: "Ransomware locked all my photos. Trini System removed it and recovered 90% of my files from shadow copies. I thought they were all gone forever.", loc: "Houston, TX" },
          { name: "Nancy B.", stars: 5, text: "I accidentally called a scam support number and gave them access. Trini System found and removed everything they installed. Very thorough.", loc: "Boston, MA" },
          { name: "Michael T.", stars: 5, text: "McAfee was alerting constantly but couldn't remove the threat. Trini System ran Malwarebytes alongside it and found 14 pieces of malware. All gone now.", loc: "Las Vegas, NV" },
        ]}
        faqTitle="Virus Removal — FAQ"
        faqs={[
          { q: "How do I know if my computer has a virus?", a: "Signs include: sudden extreme slowdown, pop-up ads everywhere, browser homepage changed, antivirus turned off, strange emails sent from your account, or a scary pop-up with a phone number. Act immediately if you notice any of these." },
          { q: "That pop-up says to call Microsoft — is it real?", a: "No — 100% a scam. Microsoft never shows pop-ups with phone numbers. Force-close your browser (Ctrl+Alt+Delete → Task Manager). Run Malwarebytes scan. Call us at 347-953-1531 if it returns." },
          { q: "I already called the scam number and gave them access — what now?", a: "Call us immediately at 347-953-1531. We'll find and remove all software they installed, check for keyloggers, and secure your PC. Change passwords from a different device right now." },
          { q: "Will virus removal delete my photos and documents?", a: "No. In 8+ years and 5,000+ sessions, we have never caused data loss during virus removal. We target only malicious files. Your personal files are completely safe." },
          { q: "How much does virus removal cost?", a: "Remote virus removal starts at $49. No fix = no fee guaranteed. Compare to Geek Squad's $149+. We've never charged for a failed removal." },
        ]}
        ctaTitle="Don't let viruses steal your data"
        ctaSub="Every minute matters. Call now — we answer immediately, 24/7."
        ctaPrimaryLabel={`Call ${PHONE} — We Answer 24/7`}
        ctaPrimaryHref={PHONE_HREF}
      />

      <StickyCTA />
    </>
  );
}
