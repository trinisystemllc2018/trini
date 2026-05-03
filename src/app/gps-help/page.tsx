import type { Metadata } from "next";
import PremiumServicePage from "@/components/features/PremiumServicePage";
import { StickyCTA } from "@/components/ui/Button";
import { PHONE, PHONE_HREF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "GPS Help — Garmin, TomTom, Magellan Updates",
  description:
    "Fix your GPS — Garmin map updates, satellite signal issues, Garmin Express errors, TomTom updates. Free guide + remote support. Call 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/gps-help" },
  openGraph: {
    title: "GPS Help — Garmin, TomTom, Magellan Updates | Trini System",
    description: "Fix your GPS — map updates, satellite issues, Garmin Express errors. Free guide + remote support. Call 347-953-1531.",
    url: "https://trinisystem.vercel.app/gps-help",
    type: "website",
  },
  keywords: [
    "garmin gps update","garmin map update free","garmin express not working","tomtom map update",
    "gps not finding satellites","garmin drivesmart update","garmin nuvi update","magellan gps update",
    "gps map update help","garmin express error","how to update garmin gps","garmin satellite signal fix",
    "tomtom go update","gps not working","garmin won't update","gps repair near me",
  ],
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trinisystem.vercel.app" },
      { "@type": "ListItem", position: 2, name: "GPS Help", item: "https://trinisystem.vercel.app/gps-help" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I update my Garmin GPS maps?",
        acceptedAnswer: { "@type": "Answer", text: "Download Garmin Express from garmin.com/express. Connect your Garmin GPS via USB. Sign in with a free Garmin account. Click 'Add Map Updates' and let the download run — it takes 30–90 minutes depending on internet speed. Trini System does Garmin map updates remotely if you need help — call 347-953-1531." } },
      { "@type": "Question", name: "Why is Garmin Express not working or showing errors?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin Express errors are usually caused by an outdated version of Garmin Express, USB connection issues, or Windows firewall blocking the update. Uninstall Garmin Express, download the fresh version from garmin.com/express, and try a different USB port. Trini System fixes Garmin Express errors remotely in 20 minutes." } },
      { "@type": "Question", name: "Why won't my Garmin GPS find satellites?",
        acceptedAnswer: { "@type": "Answer", text: "GPS satellite issues are usually caused by stale satellite almanac data. Hold the power button for 10 seconds to reset, then take the device outside to an open sky and leave it stationary for 10–15 minutes. Also update the satellite data in Garmin Express. Call Trini System at 347-953-1531 if the issue persists." } },
      { "@type": "Question", name: "How do I update a TomTom GPS device?",
        acceptedAnswer: { "@type": "Answer", text: "TomTom GPS devices update via MyDrive Connect on PC/Mac. Download it from tomtom.com/getstarted. Connect your TomTom via USB and sign in to your TomTom account. Any available map updates will appear automatically. Trini System assists with TomTom updates remotely — call 347-953-1531." } },
      { "@type": "Question", name: "Are Garmin map updates free?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin offers one free lifetime map update on most newer devices. Additional updates require a map subscription. Garmin Express itself is free to download. Trini System can check if your device qualifies for free updates and handle the entire process remotely." } },
    ],
  },
];

export default function GpsHelpPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <PremiumServicePage
        category="gps"
        badgeText="GPS & Navigation Support"
        heroTitle="GPS Not Working?"
        heroHighlight="Maps & Signal Fixed Fast"
        heroSub="Garmin, TomTom, Magellan — map updates, satellite signal fixes, Garmin Express errors. Remote help available 24/7."
        heroGradient="linear-gradient(135deg,#022a14 0%,#053d20 40%,#064d28 100%)"
        accentColor="emerald"
        accentHex="#10b981"
        glowColor="rgba(16,185,129,0.4)"
        stats={[
          { value: "5,000+", label: "GPS Devices Updated" },
          { value: "100%", label: "Update Success Rate" },
          { value: "30–90 min", label: "Map Download Time" },
          { value: "$49", label: "With Tech Help" },
        ]}
        trending={[
          { label: "Garmin DriveSmart update" },
          { label: "Garmin Express errors" },
          { label: "Nuvi maps outdated" },
          { label: "TomTom won't update" },
          { label: "No satellite signal" },
          { label: "GPS frozen" },
        ]}
        brandSectionTitle="What Brand Is Your GPS?"
        brandSectionSub="Select your device brand to get a tailored fix guide"
        brands={[
          { name: "Garmin", icon: "🗺️", sub: "DriveSmart · Nuvi · Drive · RV", color: "#007cc2", models: ["DriveSmart 65", "DriveSmart 55", "Nuvi 2797LMT", "Drive 52", "RV 890", "Overlander"] },
          { name: "TomTom", icon: "🧭", sub: "GO · Via · Start series", color: "#e63946", models: ["GO 520", "GO 620", "GO Discover", "Via 1525M", "Start 55"] },
          { name: "Magellan", icon: "📍", sub: "RoadMate · Maestro series", color: "#2a7f4f", models: ["RoadMate 6630", "RoadMate 9400-LM", "Maestro 4250"] },
          { name: "Other / Not Sure", icon: "🤷", sub: "Rand McNally · Cobra · Others", color: "#6b7280", models: ["Rand McNally TND", "Cobra 6500", "Other brands"] },
        ]}
        stepsSectionTitle="15-Step GPS Fix & Update Guide"
        stepsSectionSub="Complete guide for Garmin, TomTom & Magellan — works for map updates and signal issues"
        steps={[
          { icon: "🔋", title: "Charge your GPS to at least 50%", detail: "Map updates can take 30–90 minutes. If your GPS dies mid-update, it can corrupt the firmware. Plug it into a wall charger first." },
          { icon: "⬇️", title: "Download Garmin Express (or MyDrive Connect)", detail: "Garmin: garmin.com/express. TomTom: tomtom.com/getstarted. Magellan: magellanGPS.com/content-manager. Download the latest version." },
          { icon: "💻", title: "Install the update software on your computer", detail: "Run the downloaded installer. Follow all prompts. Allow it through your firewall if asked. Restart your computer if prompted." },
          { icon: "🔌", title: "Connect your GPS via USB cable", detail: "Use the micro-USB or mini-USB cable that came with your device. Connect directly to your computer — don't use a USB hub. The device should show 'USB Mode' or 'Connected'." },
          { icon: "👤", title: "Sign in or create a free account", detail: "Garmin: sign in at connect.garmin.com. TomTom: use your TomTom account. Creating an account is free and activates your device." },
          { icon: "🔍", title: "Let the software detect your device", detail: "Wait 30–60 seconds for the software to recognize your GPS. If it doesn't detect, try a different USB port. Avoid USB 3.0 (blue) ports — use USB 2.0 (black)." },
          { icon: "🗺️", title: "Check for available map updates", detail: "Click 'Updates' or 'Map Updates'. The software shows which maps are available for your device. Free lifetime maps apply to eligible devices." },
          { icon: "📥", title: "Download the map update", detail: "Click 'Install' or 'Download'. Map files are large (2–8 GB). This takes 30–90 minutes depending on your internet speed. Don't disconnect during download." },
          { icon: "⏳", title: "Wait for installation to complete", detail: "After download, the software installs maps to your GPS device. The progress bar must reach 100%. Don't unplug. This step takes 10–30 minutes." },
          { icon: "📡", title: "Update satellite data (EPO/almanac)", detail: "In Garmin Express: check for 'Satellite Data' updates. This pre-loads satellite positions so your GPS locks on faster when you drive." },
          { icon: "🔄", title: "Update device firmware", detail: "Check for firmware/software updates separately from map updates. Firmware fixes bugs and improves GPS accuracy. Install if available." },
          { icon: "⏏️", title: "Safely eject the device", detail: "Click the eject icon in Garmin Express (or safely remove hardware in Windows). Never just yank the USB cable — this can corrupt map data." },
          { icon: "🔌", title: "Disconnect and restart the GPS", detail: "Unplug USB, then power cycle the GPS (hold power 10 seconds, then turn back on). The device will process new maps on first boot — takes 5–10 min." },
          { icon: "📡", title: "Acquire satellite signal outdoors", detail: "Take the GPS outside to open sky. Place it on a flat surface. Wait 5–15 minutes for it to lock onto satellites. First lock after update takes longest." },
          { icon: "✅", title: "Test navigation — verify maps work", detail: "Enter a destination and start navigation. Verify the map looks updated (new roads, correct addresses). If maps look old, call us at 347-953-1531." },
        ]}
        reviewsTitle="4.9 Stars · 5,000+ GPS Devices Updated"
        reviews={[
          { name: "Frank D.", stars: 5, text: "My Garmin Nuvi hadn't been updated in 5 years. Trini System connected remotely and updated all the maps in one session. No more wrong turns!", loc: "Chicago, IL" },
          { name: "Patricia L.", stars: 5, text: "Garmin Express kept giving errors and I couldn't figure it out. Tech logged in, fixed the software issue, and maps downloaded perfectly.", loc: "Miami, FL" },
          { name: "James R.", stars: 5, text: "GPS couldn't find satellites. Called Trini System and they walked me through the reset process. Fixed in 20 minutes.", loc: "Atlanta, GA" },
          { name: "Susan K.", stars: 5, text: "Had my TomTom GO updated with help from Trini System. They did everything remotely — I just had to plug in the USB cable.", loc: "Denver, CO" },
        ]}
        faqTitle="GPS Help — FAQ"
        faqs={[
          { q: "How do I update my Garmin GPS maps?", a: "Download Garmin Express from garmin.com/express. Connect via USB. Sign in with a Garmin account. Click 'Add Map Updates' and let it download (30–90 min). We do Garmin map updates remotely if you need help — call 347-953-1531." },
          { q: "Why is Garmin Express not working?", a: "Usually caused by outdated version, USB issues, or firewall blocking. Uninstall completely, download fresh from garmin.com/express, try a different USB port. We fix Garmin Express errors remotely in 20 minutes." },
          { q: "Why won't my GPS find satellites?", a: "Stale satellite almanac data is the most common cause. Hold power 10 seconds to reset, go outside to open sky, wait 10–15 min. Also update satellite data in Garmin Express." },
          { q: "Are Garmin map updates free?", a: "Most newer Garmin devices include one free lifetime map update. Garmin Express itself is always free. We can check if your device qualifies and handle the entire update remotely." },
          { q: "How do I update a TomTom GPS?", a: "TomTom devices update via MyDrive Connect — download at tomtom.com/getstarted. Connect via USB, sign in to your TomTom account, and available updates appear automatically." },
        ]}
        ctaTitle="GPS still not updating?"
        ctaSub="We connect remotely and do the entire update for you while you watch."
        ctaPrimaryLabel={`Call ${PHONE}`}
        ctaPrimaryHref={PHONE_HREF}
      />

      <StickyCTA />
    </>
  );
}
