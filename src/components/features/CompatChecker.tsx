"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_HREF, PHONE, DOWNLOAD_URL } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════
   MASSIVE DEVICE DATABASE — 30+ models, SEO-optimized
   Covers trending searches from 55+ users in USA
═══════════════════════════════════════════════════════════════ */
type DeviceResult = {
  brand: string;
  model: string;
  type: "printer" | "pc" | "gps" | "laptop";
  drivers: string[];
  issues: string[];
  seniorTip: string;
  guideUrl: string;
  setupSteps: string[];
};

const DEVICE_DB: Record<string, DeviceResult> = {
  "hp deskjet 4155e": {
    brand: "HP", model: "DeskJet 4155e", type: "printer",
    drivers: ["HP Smart App (Windows & Mac)", "Full Feature Driver 40.11", "Basic Driver 40.11"],
    issues: ["Printer offline fix", "WiFi setup", "Cartridge error", "OXc19a0035 error", "Not printing after Windows update"],
    seniorTip: "💡 The HP DeskJet 4155e is one of our most-repaired printers. If it says 'Offline,' don't buy a new one — we fix it in 15 minutes.",
    guideUrl: "https://support.hp.com/us-en/product/hp-deskjet-4155e-all-in-one-printer/2101502088",
    setupSteps: ["Download HP Smart App from hp.com/go/hpsmartwin", "Open HP Smart → Add Printer", "Connect to your WiFi network", "Print test page to confirm"],
  },
  "hp deskjet 2755e": {
    brand: "HP", model: "DeskJet 2755e", type: "printer",
    drivers: ["HP Smart App", "Full Feature Driver 40.11", "Basic Driver"],
    issues: ["WiFi not connecting", "Offline error", "Paper jam", "Ink cartridge not recognized", "HP+ activation issue"],
    seniorTip: "💡 The 2755e requires HP+ activation. If your printer shows errors after setup, we'll fix it in one remote session.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Power on printer", "Press Wireless button until light blinks", "Download HP Smart App", "Follow on-screen instructions"],
  },
  "hp deskjet 3755": {
    brand: "HP", model: "DeskJet 3755", type: "printer",
    drivers: ["HP Smart App", "Full Feature Software", "Basic Driver"],
    issues: ["Offline in Windows 10/11", "WiFi drops", "Error code 0x610000f6", "Ink system failure"],
    seniorTip: "💡 The HP 3755 is compact but tricky to set up on new WiFi routers. We set it up for you in under 20 minutes.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Press and hold Wireless + Cancel buttons 3 seconds", "Download HP Smart", "Add printer via app", "Print alignment page"],
  },
  "hp envy 6055e": {
    brand: "HP", model: "ENVY 6055e", type: "printer",
    drivers: ["HP Smart App", "Full Feature Driver", "Universal Print Driver"],
    issues: ["HP+ account required error", "Scan not working", "WiFi offline", "Cartridge incompatible"],
    seniorTip: "💡 ENVY printers need an HP account for HP+. We help seniors set this up quickly over the phone.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Create free HP account at hpsmart.com", "Download HP Smart App", "Sign in and add printer", "Enable HP+"],
  },
  "hp envy 6455e": {
    brand: "HP", model: "ENVY 6455e", type: "printer",
    drivers: ["HP Smart App", "Full Feature Driver"],
    issues: ["Offline after router change", "Cannot scan to email", "HP Instant Ink error"],
    seniorTip: "💡 If your router or internet changed and your HP ENVY went offline, this is a 10-minute fix.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Open HP Smart App", "Select your printer", "Go to Settings → Wireless Setup Wizard", "Enter WiFi password"],
  },
  "hp officejet pro 9015e": {
    brand: "HP", model: "OfficeJet Pro 9015e", type: "printer",
    drivers: ["HP Smart App", "Full Feature Driver", "OJ Pro Universal Driver"],
    issues: ["Fax not working", "ADF paper jam", "Scan to computer missing", "Error 0x6100004a"],
    seniorTip: "💡 Most OfficeJet Pro errors are driver-related and fixable in one remote session with our technicians.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Run HP Print and Scan Doctor", "Update firmware via Embedded Web Server", "Reinstall driver from hp.com"],
  },
  "hp laserjet m404n": {
    brand: "HP", model: "LaserJet M404n", type: "printer",
    drivers: ["HP Universal Print Driver (UPD)", "PCL6 Driver", "PostScript Driver"],
    issues: ["Network not found", "Toner cartridge error", "Paper feed jam", "49 service error"],
    seniorTip: "💡 If you see a 49 error on your HP LaserJet, it almost always clears with a firmware update we apply remotely.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Connect via USB first to install driver", "Switch to network via Embedded Web Server", "Set static IP for reliability", "Install Universal Print Driver"],
  },
  "hp deskjet 2700": {
    brand: "HP", model: "DeskJet 2700 Series", type: "printer",
    drivers: ["HP Smart App", "Basic Driver"],
    issues: ["Printer offline", "Out of paper error", "Ink not recognized"],
    seniorTip: "💡 The HP DeskJet 2700 is popular with seniors. Offline errors are the #1 complaint and always fixable.",
    guideUrl: "https://support.hp.com",
    setupSteps: ["Download HP Smart App", "Press Wireless button on printer", "Add printer in HP Smart", "Print test page"],
  },
  "canon pixma mx922": {
    brand: "Canon", model: "PIXMA MX922", type: "printer",
    drivers: ["MP Drivers 1.05", "IJ Network Device Setup Utility", "Canon PRINT App", "XPS Printer Driver"],
    issues: ["Error B200", "WiFi disconnect", "Scan not working", "Fax issues", "Paper jam error 5B00"],
    seniorTip: "💡 The Canon MX922 B200 error scares people — but it's fixable 80% of the time without buying a new printer.",
    guideUrl: "https://www.usa.canon.com/support",
    setupSteps: ["Power off → unplug for 10 min", "Plug in and power on holding Stop button", "Install drivers from usa.canon.com/support", "Run IJ Network Setup Utility for WiFi"],
  },
  "canon pixma tr4520": {
    brand: "Canon", model: "PIXMA TR4520", type: "printer",
    drivers: ["MP Drivers v1.01", "Canon PRINT Inkjet App"],
    issues: ["Error E03", "WiFi setup", "Driver not found in Windows 11", "Print quality poor"],
    seniorTip: "💡 Windows 11 driver issues are very common on the TR4520 — we fix them daily in one phone call.",
    guideUrl: "https://www.usa.canon.com/support",
    setupSteps: ["Download Canon PRINT app on phone", "Press WiFi button on printer", "Connect via Canon PRINT app", "Install PC driver from canon.com"],
  },
  "canon pixma tr4722": {
    brand: "Canon", model: "PIXMA TR4722", type: "printer",
    drivers: ["MP Drivers", "Canon PRINT App"],
    issues: ["Error E04 (ink cartridge)", "WiFi not connecting", "Scan to PC missing"],
    seniorTip: "💡 The TR4722 is the updated TR4520. Same great printer, same easy fixes.",
    guideUrl: "https://www.usa.canon.com/support",
    setupSteps: ["Use Canon PRINT app for wireless setup", "Install drivers from usa.canon.com", "Run Auto Head Alignment after setup"],
  },
  "canon pixma mg3620": {
    brand: "Canon", model: "PIXMA MG3620", type: "printer",
    drivers: ["MP Drivers", "Canon PRINT Inkjet App"],
    issues: ["Error 5100", "Error B200", "Won't print from phone", "WiFi drops"],
    seniorTip: "💡 One of the most popular Canon printers among seniors. We handle MG3620 issues every single day.",
    guideUrl: "https://www.usa.canon.com/support",
    setupSteps: ["Press and hold WiFi button until lamp flashes", "Open Canon PRINT app", "Select 'Easy wireless connect'", "Follow on-screen steps"],
  },
  "canon imageclass mf644cdw": {
    brand: "Canon", model: "imageCLASS MF644Cdw", type: "printer",
    drivers: ["UFR II / UFRII LT Printer Driver", "Generic Plus PCL6", "Canon PRINT Business App"],
    issues: ["Toner low error", "Network scan missing", "ADF double-feed", "Windows 11 not detected"],
    seniorTip: "💡 A great color laser for home offices. Most issues are driver or network-related — easy remote fix.",
    guideUrl: "https://www.usa.canon.com/support",
    setupSteps: ["Access Settings > Preferences > Network", "Run wireless LAN setup", "Download UFR II driver from canon.com", "Add printer via IP address"],
  },
  "epson ecotank et-2720": {
    brand: "Epson", model: "EcoTank ET-2720", type: "printer",
    drivers: ["Epson Connect Printer Setup", "Epson Printer Driver 2.68", "Epson iPrint App"],
    issues: ["Ink system error (even with full tanks)", "Nozzle clog", "WiFi connection drops", "Print head needs cleaning", "Scan not found on computer"],
    seniorTip: "💡 Seniors love EcoTank — no cartridges! The ink error is almost never a real ink problem. It's a sensor we reset remotely.",
    guideUrl: "https://epson.com/support",
    setupSteps: ["Fill tanks fully before first use", "Power on and press WiFi button", "Download Epson Connect Printer Setup", "Run head cleaning after installation"],
  },
  "epson ecotank et-4760": {
    brand: "Epson", model: "EcoTank ET-4760", type: "printer",
    drivers: ["Epson Printer Driver 2.68", "Epson Connect", "Epson iPrint"],
    issues: ["WiFi setup issues", "Ink error after refill", "Scan quality poor", "Firmware update failed"],
    seniorTip: "💡 If scan disappears from your computer after a Windows update, we restore it in minutes.",
    guideUrl: "https://epson.com/support",
    setupSteps: ["Use Epson Connect Printer Setup Utility", "Select 'Wireless LAN Setup'", "Enter WiFi password carefully", "Run Epson Scan to confirm scanning works"],
  },
  "epson ecotank et-3850": {
    brand: "Epson", model: "EcoTank ET-3850", type: "printer",
    drivers: ["Epson Printer Driver", "Epson iPrint", "Epson Scan 2"],
    issues: ["Initial ink filling takes long", "WiFi not connecting", "Scan to email not working"],
    seniorTip: "💡 The ET-3850 is our top recommendation for seniors — low cost per page and no cartridge hassles.",
    guideUrl: "https://epson.com/support",
    setupSteps: ["Fill all 4 ink tanks before first use", "Press WiFi Direct button to connect", "Install driver from epson.com/support", "Test print and scan after setup"],
  },
  "epson workforce wf-7720": {
    brand: "Epson", model: "WorkForce WF-7720", type: "printer",
    drivers: ["Epson Universal Print Driver", "WorkForce WF-7720 Driver", "Epson Scan 2"],
    issues: ["Wide-format not printing full size", "ADF paper jam", "Error code 0xE8", "Fax line issues"],
    seniorTip: "💡 Great for printing full-size documents. We specialize in ADF jams and fax setup on the WF-7720.",
    guideUrl: "https://epson.com/support",
    setupSteps: ["Install WF-7720 driver from epson.com", "Set paper size to Tabloid in driver settings", "Configure fax via Setup > Fax Settings", "Run Nozzle Check before first print"],
  },
  "brother mfc-l2710dw": {
    brand: "Brother", model: "MFC-L2710DW", type: "printer",
    drivers: ["Full Driver & Software Package", "Printer Driver Only", "BR-Script3", "PC-Fax Driver"],
    issues: ["Windows 11 driver unavailable", "AirPrint not working on iPhone", "Drum error replace", "Fax not sending", "Wireless setup WPS problem"],
    seniorTip: "💡 Very popular laser printer. The Windows 11 driver issue is the top complaint — we fix it in one call.",
    guideUrl: "https://support.brother.com",
    setupSteps: ["Download Full Driver from support.brother.com", "Run Wireless Setup Wizard on printer display", "On PC: Add Printer > Add by IP address", "Test print a document from Word"],
  },
  "brother mfc-j995dw": {
    brand: "Brother", model: "MFC-J995DW", type: "printer",
    drivers: ["Full Driver & Software Package", "Brother iPrint&Scan"],
    issues: ["INKvestment cartridge not recognized", "Fax memory full", "ADF jam error", "Scan to PC not available"],
    seniorTip: "💡 If your cartridge shows error after install, we reset it remotely in minutes.",
    guideUrl: "https://support.brother.com",
    setupSteps: ["Install Full Driver from support.brother.com", "Use WPS button for quick WiFi setup", "Install Brother iPrint&Scan for mobile", "Configure fax under Menu > Initial Setup"],
  },
  "brother hl-l2350dw": {
    brand: "Brother", model: "HL-L2350DW", type: "printer",
    drivers: ["Full Driver Package", "Printer Driver Only (PCL)", "BR-Script Driver"],
    issues: ["Driver unavailable Windows 11", "Wireless setup not working", "Toner error after refill", "Print quality faded"],
    seniorTip: "💡 A fantastic black & white laser printer. We set up hundreds of these for seniors who just want reliable printing.",
    guideUrl: "https://support.brother.com",
    setupSteps: ["Download PCL driver from support.brother.com", "Press WiFi button and select WPS", "Add by IP address if WPS fails", "Adjust toner density if print is light"],
  },
  "brother hl-l3270cdw": {
    brand: "Brother", model: "HL-L3270CDW", type: "printer",
    drivers: ["Full Color Driver Package", "PCL6 Color Driver"],
    issues: ["Color not matching screen", "Toner low (all 4 colors)", "AirPrint setup for iPhone", "Duplex printing not working"],
    seniorTip: "💡 If your iPhone can't find this printer, we enable AirPrint in 5 minutes via remote session.",
    guideUrl: "https://support.brother.com",
    setupSteps: ["Press Menu > Network > WLAN > Setup Wizard", "Enter WiFi password on printer display", "Install Color Driver from support.brother.com", "Enable AirPrint in Network Settings"],
  },
  "brother dcp-l2550dw": {
    brand: "Brother", model: "DCP-L2550DW", type: "printer",
    drivers: ["Full Driver & Software", "Scanner Driver"],
    issues: ["Scan to PC not working", "WiFi drops after sleep", "Drum unit end of life", "Error E3 paper jam"],
    seniorTip: "💡 'Scan to PC not working' is the #1 call for DCP-L2550DW owners. We restore it in under 20 minutes.",
    guideUrl: "https://support.brother.com",
    setupSteps: ["Install Full Driver including scan component", "Open ControlCenter4 to set up scan destinations", "Set printer to keep WiFi on in Sleep mode", "Test scan to Documents folder"],
  },
  "garmin drivesmart 65": {
    brand: "Garmin", model: "DriveSmart 65", type: "gps",
    drivers: ["Garmin Express (Windows/Mac)"],
    issues: ["Map update stuck", "Not recognized by computer", "Garmin Express won't open", "Maps out of date", "Voice directions stopped working"],
    seniorTip: "💡 Seniors love the DriveSmart 65's big screen. Map updates confuse many people — we do them remotely while you watch.",
    guideUrl: "https://www.garmin.com/en-US/software/express/",
    setupSteps: ["Download Garmin Express from garmin.com/express", "Connect GPS to computer via USB (micro-USB)", "Sign in to Garmin account (free)", "Click 'Add Map Updates' and let it run (30-90 min)"],
  },
  "garmin drivesmart 55": {
    brand: "Garmin", model: "DriveSmart 55", type: "gps",
    drivers: ["Garmin Express"],
    issues: ["Map update error 3", "Stuck on Garmin logo", "Speed camera update", "Address not found"],
    seniorTip: "💡 If your DriveSmart 55 is frozen on the Garmin logo, don't panic — we fix it remotely.",
    guideUrl: "https://www.garmin.com/en-US/software/express/",
    setupSteps: ["Install Garmin Express on computer", "Connect GPS with USB cable", "Check for map + software updates", "Eject safely before unplugging"],
  },
  "garmin drivesmart 76": {
    brand: "Garmin", model: "DriveSmart 76", type: "gps",
    drivers: ["Garmin Express"],
    issues: ["Bluetooth phone sync not working", "Maps not updating", "WiFi map update stalls"],
    seniorTip: "💡 The DriveSmart 76 can update maps over WiFi — no computer needed! We walk you through it on the phone.",
    guideUrl: "https://www.garmin.com/en-US/software/express/",
    setupSteps: ["Connect to home WiFi under Settings > WiFi Networks", "Go to myMaps > Check for Updates", "Or use Garmin Express via USB", "Restart after update completes"],
  },
  "garmin nuvi": {
    brand: "Garmin", model: "nüvi Series", type: "gps",
    drivers: ["Garmin Express"],
    issues: ["Lifetime map update not working", "No satellite signal", "Database out of date"],
    seniorTip: "💡 Even older nüvi models can still receive map updates through Garmin Express — we help seniors do this every week.",
    guideUrl: "https://www.garmin.com/en-US/software/express/",
    setupSteps: ["Connect nüvi with USB cable", "Open Garmin Express", "Sign in to verify subscription", "Download available updates"],
  },
  "garmin rv 890": {
    brand: "Garmin", model: "RV 890", type: "gps",
    drivers: ["Garmin Express"],
    issues: ["RV routing not working", "Map update stuck at 99%", "Campground data out of date"],
    seniorTip: "💡 Many RV travelers rely on the Garmin RV 890. We update it and configure it for your RV's dimensions.",
    guideUrl: "https://www.garmin.com/en-US/software/express/",
    setupSteps: ["Install Garmin Express", "Connect via USB cable", "Update maps AND software", "After update: set your RV profile under Vehicle Profile"],
  },
  "windows 11 slow": {
    brand: "Windows", model: "Windows 11 Running Slow", type: "pc",
    drivers: ["TriniCleaner (Free)", "Windows Update"],
    issues: ["Startup takes 5+ minutes", "Programs freeze", "Fan running loud", "Browser slow", "High memory usage"],
    seniorTip: "💡 The #1 complaint from seniors with new computers. Windows 11 slow startup is almost always startup programs and junk files. TriniCleaner fixes it free.",
    guideUrl: DOWNLOAD_URL,
    setupSteps: ["Download free TriniCleaner from our site", "Run full system scan", "Disable startup programs in Task Manager > Startup", "Restart and enjoy faster computer"],
  },
  "windows 10 slow": {
    brand: "Windows", model: "Windows 10 Running Slow", type: "pc",
    drivers: ["TriniCleaner (Free)", "Windows Update"],
    issues: ["Slow boot", "Spinning circle cursor", "Programs not responding", "High disk usage 100%"],
    seniorTip: "💡 'My computer is slow' is our #1 senior support call. Download free TriniCleaner and most seniors see results in 5 minutes.",
    guideUrl: DOWNLOAD_URL,
    setupSteps: ["Download TriniCleaner (100% free, no subscription)", "Run Junk File Cleanup", "Run Startup Manager → disable unused programs", "Restart computer"],
  },
  "computer wont turn on": {
    brand: "Windows", model: "Computer Won't Turn On", type: "pc",
    drivers: ["Remote Diagnosis Available"],
    issues: ["Black screen", "Power light off", "Beeping sounds", "Restart loop", "No display"],
    seniorTip: "💡 Don't panic. Most 'won't turn on' issues are power-related and fixable without any repair shop visit. Call us first.",
    guideUrl: PHONE_HREF,
    setupSteps: ["Check power cable is firmly plugged in", "Try a different power outlet", "Hold power button 10 seconds to force restart", "If black screen but running: call us for display fix"],
  },
  "hp laptop slow": {
    brand: "HP", model: "HP Laptop Running Slow", type: "laptop",
    drivers: ["TriniCleaner", "HP Support Assistant", "Windows Update"],
    issues: ["HP laptop freezes", "HP startup slow", "HP fan loud", "HP battery drains fast"],
    seniorTip: "💡 HP laptops come with bloatware that slows them down. We remove it and speed up your HP laptop remotely.",
    guideUrl: DOWNLOAD_URL,
    setupSteps: ["Run HP Support Assistant first for driver updates", "Download TriniCleaner for junk removal", "Uninstall McAfee trial if still installed", "Set power plan to Balanced"],
  },
  "dell laptop slow": {
    brand: "Dell", model: "Dell Laptop Running Slow", type: "laptop",
    drivers: ["TriniCleaner", "Dell SupportAssist", "Windows Update"],
    issues: ["Dell laptop freezes", "SupportAssist error", "Screen black after sleep", "Keyboard not working after update"],
    seniorTip: "💡 Dell laptops are great but SupportAssist can cause problems. We clean it up and speed your Dell up fast.",
    guideUrl: DOWNLOAD_URL,
    setupSteps: ["Open Dell SupportAssist for hardware scan", "Download TriniCleaner for software cleanup", "Uninstall unused Dell apps", "Update BIOS if Dell suggests it"],
  },
};

/* ─── Fuzzy search ──────────────────────────────────────── */
function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\- ]/g, "").trim();
}
function findDevice(query: string): DeviceResult | null {
  const q = normalize(query);
  for (const [key, val] of Object.entries(DEVICE_DB)) {
    if (q.includes(normalize(key)) || normalize(key).includes(q)) return val;
  }
  const words = q.split(" ").filter(w => w.length > 2);
  let best: DeviceResult | null = null, bestScore = 0;
  for (const [key, val] of Object.entries(DEVICE_DB)) {
    const kw = normalize(key).split(" ");
    const score = words.filter(w => kw.some(k => k.includes(w) || w.includes(k))).length;
    if (score > bestScore) { bestScore = score; best = val; }
  }
  return bestScore >= 2 ? best : null;
}

/* ─── Discord webhook ───────────────────────────────────── */
async function notifyDiscord(query: string, found: boolean, deviceName?: string) {
  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Device Search Lead",
        email: "",
        phone: "",
        issue: found ? `Device Found: ${deviceName}` : "Unknown Device Searched",
        message: `Search query: ${query}`,
      }),
    });
  } catch {}
}

/* ═══════════════════════════════════════════════════════════════
   DEVICE COMPAT CHECKER COMPONENT
═══════════════════════════════════════════════════════════════ */
export function DeviceCompatChecker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DeviceResult | "not-found" | null>(null);
  const [loading, setLoading] = useState(false);

  const check = async (overrideQuery?: string) => {
    const q = overrideQuery ?? query;
    if (!q.trim()) return;
    if (overrideQuery) setQuery(overrideQuery);
    setLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 700));
    const r = findDevice(q);
    setResult(r ?? "not-found");
    await notifyDiscord(q, !!r, r?.model);
    setLoading(false);
  };

  const trending = [
    "HP DeskJet 4155e", "HP DeskJet 2755e", "Canon PIXMA TR4520",
    "Epson EcoTank ET-2720", "Brother MFC-L2710DW",
    "Garmin DriveSmart 65", "Windows 11 slow", "Computer won't turn on",
  ];

  const brandGroups = [
    { name: "HP", icon: "🖨️", models: ["HP DeskJet 4155e","HP DeskJet 2755e","HP DeskJet 3755","HP ENVY 6055e","HP ENVY 6455e","HP OfficeJet Pro 9015e","HP LaserJet M404n"] },
    { name: "Canon", icon: "🖨️", models: ["Canon PIXMA MX922","Canon PIXMA TR4520","Canon PIXMA TR4722","Canon PIXMA MG3620","Canon imageCLASS MF644Cdw"] },
    { name: "Epson", icon: "🖨️", models: ["Epson EcoTank ET-2720","Epson EcoTank ET-4760","Epson EcoTank ET-3850","Epson WorkForce WF-7720"] },
    { name: "Brother", icon: "🖨️", models: ["Brother MFC-L2710DW","Brother HL-L2350DW","Brother MFC-J995DW","Brother HL-L3270CDW","Brother DCP-L2550DW"] },
    { name: "Garmin GPS", icon: "🗺️", models: ["Garmin DriveSmart 65","Garmin DriveSmart 55","Garmin DriveSmart 76","Garmin nüvi","Garmin RV 890"] },
    { name: "PC / Laptop", icon: "💻", models: ["Windows 11 slow","Windows 10 slow","Computer won't turn on","HP laptop slow","Dell laptop slow"] },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-sky-50/60 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-teal-200">
            🔍 Compatibility Checker
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Find Drivers &amp; Fix Guides
            <span className="block text-gradient-trust">For Your Device</span>
          </h2>
          <p className="text-lg text-gray-600">
            Type your printer model, GPS device, or computer problem — get instant drivers, fix steps, and expert help.
          </p>
        </motion.div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setResult(null); }}
            onKeyDown={e => e.key === "Enter" && check()}
            placeholder="e.g. HP DeskJet 4155e, Garmin DriveSmart 65, Windows 11 slow..."
            className="flex-1 px-5 py-4 text-base md:text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
          />
          <button
            onClick={() => check()}
            disabled={loading || !query.trim()}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-brand disabled:opacity-50 active:scale-95 whitespace-nowrap"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            ) : "Check →"}
          </button>
        </div>

        {/* Trending */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">🔥 Popular right now:</p>
          <div className="flex flex-wrap gap-2">
            {trending.map(s => (
              <button key={s} onClick={() => check(s)}
                className="text-xs font-medium text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors border border-transparent hover:border-blue-200">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Brand accordion */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Browse by brand:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {brandGroups.map(group => (
              <details key={group.name} className="bg-white border border-gray-100 rounded-2xl overflow-hidden group">
                <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer font-bold text-gray-800 hover:bg-gray-50 transition-colors list-none">
                  <span>{group.icon}</span><span>{group.name}</span>
                  <svg className="ml-auto w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="px-4 pb-3 space-y-1 border-t border-gray-50">
                  {group.models.map(m => (
                    <button key={m} onClick={() => check(m)}
                      className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-1 hover:pl-1 transition-all">
                      → {m}
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div key={result === "not-found" ? "nf" : (result as DeviceResult).model}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              {result === "not-found" ? (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 text-center">
                  <div className="text-5xl mb-3">🤔</div>
                  <h3 className="font-black text-gray-900 text-xl mb-2">Device Not Found — But We Can Still Help!</h3>
                  <p className="text-gray-600 mb-2 max-w-lg mx-auto">Our technicians know every printer, GPS and computer brand sold in the USA. Just call us.</p>
                  <p className="text-gray-500 text-sm mb-6">Try typing just the brand (e.g. &quot;HP&quot; or &quot;Canon&quot;) or a symptom (e.g. &quot;printer offline&quot;).</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-brand text-lg">
                      📞 Call {PHONE} — Free Help
                    </a>
                    <button onClick={() => { setQuery(""); setResult(null); }}
                      className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-8 py-4 rounded-2xl border-2 border-gray-200">
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-soft-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 flex items-start gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                      {result.type === "gps" ? "🗺️" : result.type === "pc" || result.type === "laptop" ? "💻" : "🖨️"}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-emerald-100 uppercase tracking-widest">{result.brand}</div>
                      <h3 className="text-xl md:text-2xl font-black text-white">{result.model}</h3>
                    </div>
                    <div className="bg-white text-emerald-600 text-xs font-black px-3 py-1.5 rounded-full shrink-0">✓ Supported</div>
                  </div>

                  <div className="px-6 pt-5 pb-2">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-base text-gray-700 leading-relaxed">
                      {result.seniorTip}
                    </div>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Drivers / Software</h4>
                      <div className="space-y-2">
                        {result.drivers.map(d => (
                          <div key={d} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">↓</span>
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Common Problems We Fix</h4>
                      <div className="space-y-2">
                        {result.issues.map(issue => (
                          <div key={issue} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">!</span>
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Fix Steps</h4>
                    <ol className="space-y-2">
                      {result.setupSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
                    <a href={PHONE_HREF}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-5 rounded-2xl shadow-brand transition-all hover:from-blue-700 hover:to-blue-800 text-lg">
                      📞 Get Remote Help Now
                    </a>
                    <a href={result.guideUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-semibold py-4 px-5 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all">
                      Official Support Page ↗
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ONE-CLICK HELP MODE — Senior Mode (55+ optimized)
═══════════════════════════════════════════════════════════════ */
export function OneClickHelpMode() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState<"main" | "printer">("main");

  const notifyAndGo = async (label: string, href: string) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "One-Click Help Lead",
          email: "",
          phone: "",
          issue: label,
          message: "Via One-Click Help Mode (Senior Mode)",
        }),
      });
    } catch {}
    window.location.href = href;
  };

  if (active) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
          <button onClick={() => { setActive(false); setStep("main"); }}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-2">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {step === "main" && (
            <>
              <div className="text-center">
                <div className="text-7xl mb-4">👋</div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">How can we help you today?</h1>
                <p className="text-xl text-gray-500">Choose what you need — we&apos;ll take care of the rest.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
                {[
                  { icon: "🖨️", title: "My Printer Won't Work", sub: "HP, Canon, Epson, Brother", color: "from-blue-500 to-blue-700", action: () => setStep("printer") },
                  { icon: "🐌", title: "My Computer Is Slow", sub: "Free TriniCleaner download", color: "from-purple-500 to-purple-700", action: () => notifyAndGo("Computer Is Slow", DOWNLOAD_URL) },
                  { icon: "🦠", title: "I Think I Have a Virus", sub: "Remote removal — same day", color: "from-red-500 to-red-700", action: () => notifyAndGo("Virus Help", PHONE_HREF) },
                  { icon: "🗺️", title: "Update My GPS Maps", sub: "Garmin, all models", color: "from-teal-500 to-teal-700", action: () => notifyAndGo("GPS Map Update", PHONE_HREF) },
                  { icon: "📱", title: "Set Up My New Device", sub: "Tablet, phone, computer", color: "from-orange-500 to-orange-700", action: () => notifyAndGo("New Device Setup", PHONE_HREF) },
                  { icon: "🔒", title: "I Was Scammed Online", sub: "Urgent — call us now", color: "from-gray-700 to-gray-900", action: () => notifyAndGo("Scam Alert", PHONE_HREF) },
                ].map(item => (
                  <button key={item.title} onClick={item.action}
                    className={`flex flex-col items-center justify-center gap-3 p-8 rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-[0.98]`}>
                    <span className="text-6xl">{item.icon}</span>
                    <span className="text-2xl font-black text-center">{item.title}</span>
                    <span className="text-sm text-white/80 text-center">{item.sub}</span>
                  </button>
                ))}
              </div>
              <a href={PHONE_HREF}
                className="flex items-center gap-3 bg-gray-900 text-white text-2xl font-black px-10 py-5 rounded-3xl shadow-xl hover:bg-gray-800 transition-colors">
                📞 Just Call Us: {PHONE}
              </a>
            </>
          )}

          {step === "printer" && (
            <>
              <div className="text-center">
                <button onClick={() => setStep("main")} className="text-blue-600 text-lg mb-4 flex items-center gap-1 mx-auto">← Back</button>
                <div className="text-7xl mb-4">🖨️</div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">What brand is your printer?</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                {[
                  { name: "HP", color: "bg-blue-600" },
                  { name: "Canon", color: "bg-red-600" },
                  { name: "Epson", color: "bg-sky-600" },
                  { name: "Brother", color: "bg-indigo-600" },
                ].map(b => (
                  <button key={b.name} onClick={() => notifyAndGo(`Printer — ${b.name}`, PHONE_HREF)}
                    className={`${b.color} text-white text-3xl font-black py-8 rounded-3xl shadow-lg hover:opacity-90 transition-all`}>
                    {b.name}
                  </button>
                ))}
              </div>
              <a href={PHONE_HREF}
                className="flex items-center gap-3 bg-gray-900 text-white text-2xl font-black px-10 py-5 rounded-3xl shadow-xl hover:bg-gray-800">
                📞 Just Call: {PHONE}
              </a>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.button onClick={() => setActive(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      className="w-full flex items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-3xl p-6 hover:border-indigo-300 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-all">🙋</div>
        <div className="text-left">
          <p className="font-black text-gray-900 text-lg">One-Click Help Mode</p>
          <p className="text-gray-500 text-sm">Big buttons, simple choices — perfect for quick help</p>
        </div>
      </div>
      <div className="text-indigo-600 font-bold text-sm bg-white px-4 py-2 rounded-xl border border-indigo-200 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        Open →
      </div>
    </motion.button>
  );
}
