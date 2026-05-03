"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE, PHONE_HREF, DOWNLOAD_URL } from "@/lib/utils";
import { CallbackButton } from "@/components/ui/CallbackModal";

export type BrandFilter =
  | "HP" | "Canon" | "Epson" | "Brother"
  | "Garmin" | "TomTom" | "Magellan"
  | "Dell" | "Lenovo" | "Gateway"
  | "Malwarebytes" | "McAfee" | "Norton" | "Avast" | "AVG"
  | undefined;

interface TechERProps {
  brandFilter?: BrandFilter;
  pageTrending?: string[];
  category?: "printer" | "gps" | "computer" | "virus";
}

type Severity = "easy" | "medium" | "urgent";

interface Fix {
  title: string;
  summary: string;
  severity: Severity;
  successRate: number;
  avgTime: string;
  steps: { icon: string; title: string; detail: string }[];
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

/* ── SEO-Rich Fix Knowledge Base ────────────────────────────── */
const FIXES: Record<string, Fix> = {
  hp_offline: {
    title: "HP Printer Showing Offline — Full Fix Guide",
    summary: "Your PC lost contact with the printer — usually a stale IP address or driver glitch after a Windows update. Fixes itself 94% of the time without hardware replacement.",
    severity: "easy", successRate: 94, avgTime: "8 min",
    steps: [
      { icon: "🔌", title: "Hard reset both devices", detail: "Power off your HP printer completely. Unplug the power cord from the wall for 30 seconds. Do the same with your WiFi router. This clears all cached network connections." },
      { icon: "📶", title: "Restart in the correct order", detail: "Plug in the router first. Wait a full 60 seconds until all lights are stable. Then plug in and power on the HP printer." },
      { icon: "🖥️", title: "Remove the offline flag in Windows", detail: "Go to Start → Settings → Bluetooth & Devices → Printers & Scanners. Click your HP printer → Open print queue → click 'Printer' menu → uncheck 'Use Printer Offline'." },
      { icon: "🖨️", title: "Set as default and test print", detail: "In Printers & Scanners, click your HP printer → Set as Default → Print a test page. If it prints, you're done." },
      { icon: "⚙️", title: "Still offline? Reinstall the driver", detail: "Visit 123.hp.com, enter your model number, download HP Smart App. Choose Wireless setup. This creates a completely fresh connection." },
    ],
    cta: { label: "📞 Call Us — We Fix This in 15 Min", href: PHONE_HREF },
    ctaSecondary: { label: "View HP Repair Page →", href: "/hp-printer-repair" },
  },
  hp_error: {
    title: "HP Printer Error Code Fix",
    summary: "HP error codes like OXc19a0035 or 0x6100004a look scary but are almost always fixable remotely — no hardware replacement needed in 90% of cases.",
    severity: "medium", successRate: 88, avgTime: "20 min",
    steps: [
      { icon: "📋", title: "Note the exact error code", detail: "Write down or photograph the error code shown on your printer display or HP Smart app. This helps us target the exact fix." },
      { icon: "🔌", title: "Full power cycle", detail: "Turn the printer fully off (not just sleep mode). Unplug from the wall for 60 seconds — this clears all memory and resets the system." },
      { icon: "🖨️", title: "Remove and reseat ink cartridges", detail: "Open the cartridge door. Remove all cartridges. Wait 30 seconds. Reinstall them firmly until they click into place." },
      { icon: "💻", title: "Update printer firmware", detail: "Open HP Smart app → select your printer → Printer Settings → Printer Updates → Check for Updates. Outdated firmware causes most persistent error codes." },
    ],
    cta: { label: "📞 Call — HP Error Code Expert", href: PHONE_HREF },
    ctaSecondary: { label: "HP Repair Page →", href: "/hp-printer-repair" },
  },
  canon_b200: {
    title: "Canon B200 Error — Don't Replace It Yet",
    summary: "The Canon B200 error signals a print head issue, but 80% of B200 errors are caused by overheating and ARE fixable without buying a new printer.",
    severity: "urgent", successRate: 80, avgTime: "30 min",
    steps: [
      { icon: "🔌", title: "Full power off + unplug for 15 min", detail: "Power off the printer completely and unplug it from the wall. Wait 15 full minutes — the print head needs to cool down completely." },
      { icon: "🖨️", title: "Cartridge reset position", detail: "Open the printer lid. Manually slide the cartridge carrier to the center of the printer. Close the lid slowly." },
      { icon: "🔄", title: "Power on with Stop held", detail: "Plug in the printer. Hold the Stop/Reset button while pressing Power. Release both when the printer starts up. This triggers a maintenance reset." },
      { icon: "💻", title: "Run Canon My Printer tool", detail: "Download 'Canon My Printer' from usa.canon.com/support. Run Maintenance → Head Cleaning → Nozzle Check." },
    ],
    cta: { label: "📞 Canon B200 Specialist — Call Now", href: PHONE_HREF },
    ctaSecondary: { label: "Canon Repair Page →", href: "/canon-printer-repair" },
  },
  canon_wifi: {
    title: "Canon Printer WiFi / Offline Fix",
    summary: "Canon PIXMA and imageCLASS printers lose WiFi connection most often after a router change or Windows update. Completely fixable in one session.",
    severity: "easy", successRate: 95, avgTime: "12 min",
    steps: [
      { icon: "🔄", title: "Restart printer and router", detail: "Power off both the Canon printer and your WiFi router. Wait 30 seconds. Plug in the router first, wait 60 seconds, then power on the printer." },
      { icon: "📱", title: "Use Canon PRINT app", detail: "Download Canon PRINT Inkjet/SELPHY app on your phone. Tap '+' to add a printer. The app uses Bluetooth to reconnect your printer to WiFi automatically." },
      { icon: "🖥️", title: "Reinstall driver on PC", detail: "Go to usa.canon.com/support, search your model, download the MP Drivers. Run the installer and select 'Wireless LAN connection' when prompted." },
    ],
    cta: { label: "📞 Call — Canon WiFi Fix", href: PHONE_HREF },
    ctaSecondary: { label: "Canon Repair Page →", href: "/canon-printer-repair" },
  },
  epson_ink: {
    title: "Epson Ink System Error — Even With Full Tanks",
    summary: "Epson EcoTank ink errors are almost always a sensor calibration issue, not a real ink problem. We reset this remotely in under 15 minutes.",
    severity: "medium", successRate: 92, avgTime: "15 min",
    steps: [
      { icon: "🔌", title: "Power cycle the printer", detail: "Turn off the Epson printer. Unplug the power cable from the back of the printer (not just the wall outlet). Wait 60 seconds. Plug back in and power on." },
      { icon: "💻", title: "Run Epson Print and Scan Doctor", detail: "Download 'Epson Print and Scan Doctor' from epson.com/support. Run it — it automatically detects and fixes the most common ink sensor errors." },
      { icon: "🧹", title: "Run Head Cleaning utility", detail: "Open Epson Printer Utility on your PC → Maintenance → Head Cleaning → Run up to 3 cycles → Print Nozzle Check after each cycle." },
      { icon: "🔧", title: "If error persists — Adjustment Program", detail: "We use the Epson Adjustment Program remotely to reset the ink counter. This is a 10-minute fix that clears all ink system errors permanently." },
    ],
    cta: { label: "📞 Epson Ink Error Specialist", href: PHONE_HREF },
    ctaSecondary: { label: "Epson Repair Page →", href: "/epson-printer-repair" },
  },
  epson_wifi: {
    title: "Epson Printer WiFi / Offline Fix",
    summary: "Epson WorkForce and EcoTank printers lose WiFi connection most often after a router change or Windows update. Back online in minutes.",
    severity: "easy", successRate: 96, avgTime: "10 min",
    steps: [
      { icon: "🔄", title: "Restart printer and router", detail: "Turn off both devices. Restart the router first, wait 60 seconds, then power on the Epson printer." },
      { icon: "📶", title: "Run Wireless Setup on printer", detail: "On the printer's control panel: Settings → Wi-Fi Setup → Wi-Fi Setup Wizard. Enter your WiFi password carefully (they're case-sensitive)." },
      { icon: "💻", title: "Reinstall using Epson Connect Setup", detail: "Download 'Epson Connect Printer Setup' from epson.com. Run it and choose 'Wireless LAN' connection. It completely rebuilds the WiFi connection." },
    ],
    cta: { label: "📞 Call — Epson WiFi Fix", href: PHONE_HREF },
    ctaSecondary: { label: "Epson Repair Page →", href: "/epson-printer-repair" },
  },
  brother_driver: {
    title: "Brother Printer Driver Issue (Windows 11)",
    summary: "Brother printer driver unavailable is the #1 complaint after Windows 11 updates. The fix involves downloading the correct full driver package directly from Brother.",
    severity: "medium", successRate: 97, avgTime: "18 min",
    steps: [
      { icon: "🗑️", title: "Remove the old driver completely", detail: "Go to Settings → Bluetooth & Devices → Printers. Right-click your Brother printer → Remove device. Then go to Device Manager and remove any Brother entries under Print queues." },
      { icon: "⬇", title: "Download Full Driver from Brother", detail: "Go to support.brother.com. Search your model. Download the 'Full Driver & Software Package'. Do NOT use Windows Update drivers — always use the official Brother package." },
      { icon: "🔌", title: "Install via USB first, then switch to WiFi", detail: "Connect your Brother printer to your PC via USB cable. Run the installer. After installation is complete, switch to wireless in the Brother Wireless Setup Wizard." },
    ],
    cta: { label: "📞 Call — Brother Driver Specialist", href: PHONE_HREF },
    ctaSecondary: { label: "View All Services →", href: "/services" },
  },
  pc_slow: {
    title: "Slow PC — Free Fix with TriniCleaner",
    summary: "A slow Windows PC is almost always caused by junk files, registry errors, or too many startup programs. TriniCleaner fixes this in one click — completely free.",
    severity: "easy", successRate: 98, avgTime: "5 min",
    steps: [
      { icon: "⬇", title: "Download TriniCleaner for free", detail: "Download TriniCleaner from our website — no subscription, no sign-up, no credit card ever required." },
      { icon: "🔍", title: "Run a full system scan", detail: "Open TriniCleaner and click 'Full Scan'. It takes about 45 seconds. Average users find 4–8 GB of junk files." },
      { icon: "🧹", title: "Clean and restart", detail: "Review the scan results, click 'Clean Now'. Restart your PC when prompted. Most users notice immediate improvement on startup." },
      { icon: "🚀", title: "Disable startup programs", detail: "In TriniCleaner, go to Startup Manager. Disable programs you don't need at startup (common: Teams, Spotify, OneDrive, Adobe). This alone can cut boot time in half." },
    ],
    cta: { label: "⬇ Download TriniCleaner — Free", href: DOWNLOAD_URL },
    ctaSecondary: { label: "Still slow? Call us →", href: PHONE_HREF },
  },
  pc_crash: {
    title: "PC Blue Screen / Crashing Fix",
    summary: "Blue screen (BSOD) errors are usually caused by outdated drivers, bad Windows updates, or RAM issues. We diagnose the exact stop code and fix it remotely.",
    severity: "urgent", successRate: 89, avgTime: "35 min",
    steps: [
      { icon: "📋", title: "Note the stop code", detail: "When the blue screen appears, note the STOP code (e.g., SYSTEM_SERVICE_EXCEPTION). Take a photo with your phone if needed." },
      { icon: "🔄", title: "Boot into Safe Mode", detail: "Restart your PC. Press F8 or hold Shift while clicking Restart → Troubleshoot → Advanced Options → Startup Settings → Restart → press 4 for Safe Mode." },
      { icon: "🔧", title: "Update all drivers", detail: "In Safe Mode, open Device Manager. Look for any yellow warning icons. Right-click → Update driver. Pay special attention to display adapter and network drivers." },
      { icon: "💻", title: "Run Windows Memory Diagnostic", detail: "Press Win+R → type mdsched.exe → Restart now and check for problems. RAM errors cause most random BSODs." },
    ],
    cta: { label: "📞 Call — BSOD Specialist", href: PHONE_HREF },
    ctaSecondary: { label: "Computer Help Page →", href: "/computer-help" },
  },
  pc_virus: {
    title: "Virus or Malware — Urgent Help Needed",
    summary: "Don't panic. Most viruses and malware can be fully removed remotely. Our techs will scan your entire system and eliminate all threats without losing any files.",
    severity: "urgent", successRate: 99, avgTime: "45 min",
    steps: [
      { icon: "🚫", title: "Stop what you're doing immediately", detail: "Do NOT enter any passwords, credit card numbers, or banking information on the affected computer until it's been cleaned." },
      { icon: "📵", title: "Disconnect from the internet if possible", detail: "Unplug your ethernet cable or turn off WiFi. This prevents malware from sending data or downloading more malicious files." },
      { icon: "📞", title: "Call us — virus removal starts same day", detail: "Our technicians connect remotely, run Malwarebytes + Windows Defender full scans, and remove all threats while you watch." },
      { icon: "🔒", title: "Change passwords after cleaning", detail: "Once the computer is clean, change your email, banking, and important passwords from a clean device first." },
    ],
    cta: { label: "📞 Call Now — Urgent Virus Help", href: PHONE_HREF },
    ctaSecondary: { label: "Learn About Virus Removal →", href: "/virus-removal" },
  },
  virus_popup: {
    title: "Fake Virus Pop-Up / Tech Support Scam",
    summary: "That scary pop-up saying 'Your computer is infected, call Microsoft at...' is a SCAM. Microsoft never calls you or shows pop-ups with phone numbers. Here's what to do.",
    severity: "urgent", successRate: 100, avgTime: "20 min",
    steps: [
      { icon: "❌", title: "Do NOT call the number shown", detail: "The pop-up phone number is a scam. Calling it gives criminals access to your PC and may result in charges of hundreds of dollars." },
      { icon: "💪", title: "Force-close your browser", detail: "Press Ctrl+Alt+Delete → Task Manager → find your browser → End Task. If the pop-up won't close, hold the Power button for 5 seconds to force shutdown." },
      { icon: "🔍", title: "Run Malwarebytes free scan", detail: "Download Malwarebytes from malwarebytes.com (free version). Run a full scan. It will identify and remove any adware that triggered the pop-up." },
      { icon: "📞", title: "Already called? Contact us immediately", detail: "If you already called the scam number and gave them access, contact Trini System immediately at 347-953-1531. We will secure your PC and undo any changes they made." },
    ],
    cta: { label: "📞 Already Scammed? Call Us Now", href: PHONE_HREF },
    ctaSecondary: { label: "Virus Removal Page →", href: "/virus-removal" },
  },
  gps_update: {
    title: "Garmin GPS Map Update — Step by Step",
    summary: "Garmin map updates can be confusing. We do this every single day — remotely while you watch, or we walk you through it step by step over the phone.",
    severity: "easy", successRate: 100, avgTime: "30–90 min",
    steps: [
      { icon: "⬇", title: "Download Garmin Express", detail: "Visit garmin.com/express on your computer. Download and install Garmin Express (it's free). This is the official tool for all Garmin updates." },
      { icon: "🔌", title: "Connect GPS via USB", detail: "Connect your Garmin GPS to your computer using the micro-USB cable that came with it. Garmin Express will detect it automatically." },
      { icon: "👤", title: "Sign in to your Garmin account", detail: "Sign in or create a free Garmin account. This activates your map subscriptions and shows all available updates." },
      { icon: "🗺️", title: "Download map updates", detail: "Click 'Add Map Updates' and let it run. Map updates take 30–90 minutes depending on your internet speed. Keep the GPS plugged in throughout." },
    ],
    cta: { label: "📞 Get GPS Update Help — We Do It For You", href: PHONE_HREF },
    ctaSecondary: { label: "View Step-by-Step Guides →", href: "/guides" },
  },
  gps_signal: {
    title: "GPS Not Finding Satellites / Signal Fix",
    summary: "When your GPS can't find satellites, it's usually a software or settings issue — not a hardware failure. Here's how to fix it in minutes.",
    severity: "medium", successRate: 85, avgTime: "15 min",
    steps: [
      { icon: "📍", title: "Full reset of GPS device", detail: "Hold the power button for 10 seconds. Some Garmin models: hold Volume Down + Power together for 5 seconds. This clears the cached satellite data." },
      { icon: "🌤️", title: "Force a new satellite lock outdoors", detail: "Take the GPS outside to a clear, open sky location. Leave it stationary for 10–15 minutes. This lets it download a fresh almanac from satellites." },
      { icon: "💻", title: "Update GPS software + satellite data", detail: "Connect to Garmin Express and update both the device software AND the satellite prediction data (Garmin calls this 'Express Update')." },
      { icon: "📞", title: "Still no signal? Hardware check needed", detail: "If the GPS still can't find satellites after all these steps, the antenna may be damaged. We can diagnose this remotely in minutes." },
    ],
    cta: { label: "📞 Call — GPS Signal Specialist", href: PHONE_HREF },
    ctaSecondary: { label: "GPS Help Page →", href: "/gps-help" },
  },
};

/* ── Brand Questions ────────────────────────────────────────── */
type BrandOption = { label: string; sub: string; icon: string; brand?: BrandFilter; fixKey?: string };
type BrandQuestionSet = { question: string; options: BrandOption[] };

const PRINTER_BRANDS: BrandQuestionSet = {
  question: "What brand is your printer?",
  options: [
    { label: "HP", sub: "DeskJet · Envy · OfficeJet · LaserJet", icon: "🖨️", brand: "HP" },
    { label: "Canon", sub: "PIXMA · imageCLASS · MAXIFY", icon: "🖨️", brand: "Canon" },
    { label: "Epson", sub: "EcoTank · WorkForce · Expression", icon: "🖨️", brand: "Epson" },
    { label: "Brother", sub: "MFC · HL · DCP series", icon: "🖨️", brand: "Brother" },
    { label: "Other / Not Sure", sub: "Lexmark, Samsung, Xerox...", icon: "🤷", fixKey: "hp_offline" },
  ],
};

const GPS_BRANDS: BrandQuestionSet = {
  question: "What brand is your GPS device?",
  options: [
    { label: "Garmin", sub: "DriveSmart · Nuvi · Drive · RV", icon: "🗺️", brand: "Garmin" },
    { label: "TomTom", sub: "GO · Via · Start series", icon: "🗺️", brand: "TomTom" },
    { label: "Magellan", sub: "RoadMate · Maestro series", icon: "🗺️", brand: "Magellan" },
    { label: "Other / Not Sure", sub: "Rand McNally, Cobra...", icon: "🤷", fixKey: "gps_update" },
  ],
};

const COMPUTER_BRANDS: BrandQuestionSet = {
  question: "What brand is your computer?",
  options: [
    { label: "Dell", sub: "Inspiron · XPS · Vostro · Latitude", icon: "💻", brand: "Dell" },
    { label: "HP", sub: "Pavilion · Spectre · Envy · ProBook", icon: "💻", brand: "HP" },
    { label: "Lenovo", sub: "IdeaPad · ThinkPad · Yoga", icon: "💻", brand: "Lenovo" },
    { label: "Gateway", sub: "GWTN · NE series", icon: "💻", brand: "Gateway" },
    { label: "Other / Not Sure", sub: "Acer, Asus, Toshiba, Microsoft...", icon: "🤷", fixKey: "pc_slow" },
  ],
};

const VIRUS_BRANDS: BrandQuestionSet = {
  question: "Which security software do you have?",
  options: [
    { label: "Malwarebytes", sub: "Free Scan version", icon: "🛡️", brand: "Malwarebytes" },
    { label: "McAfee", sub: "Total Protection / LiveSafe", icon: "🛡️", brand: "McAfee" },
    { label: "Norton", sub: "360 Deluxe / AntiVirus Plus", icon: "🛡️", brand: "Norton" },
    { label: "Avast", sub: "Free Antivirus / Premium", icon: "🛡️", brand: "Avast" },
    { label: "AVG", sub: "AntiVirus Free / Internet Security", icon: "🛡️", brand: "AVG" },
    { label: "None / Other", sub: "Windows Defender only", icon: "🤷", fixKey: "pc_virus" },
  ],
};

const BRAND_ISSUE_QUESTIONS: Record<string, BrandQuestionSet> = {
  HP: {
    question: "What's happening with your HP Printer?",
    options: [
      { label: "Printer shows Offline", sub: "Won't print, shows offline in Windows", icon: "📵", fixKey: "hp_offline" },
      { label: "Error code on screen", sub: "OXc19a, 0x6100, or other code", icon: "❌", fixKey: "hp_error" },
      { label: "Not printing / queue stuck", sub: "Jobs queued but nothing prints", icon: "🔄", fixKey: "hp_offline" },
      { label: "Won't connect to WiFi", sub: "Can't find printer on network", icon: "📶", fixKey: "hp_offline" },
    ],
  },
  Canon: {
    question: "What's happening with your Canon Printer?",
    options: [
      { label: "Error B200", sub: "Print head / overheating error", icon: "🔴", fixKey: "canon_b200" },
      { label: "Error E03 / 5100 / other", sub: "Error code on display", icon: "❌", fixKey: "canon_wifi" },
      { label: "Not printing at all", sub: "No response, power issue", icon: "🔇", fixKey: "canon_wifi" },
      { label: "WiFi / wireless issue", sub: "Can't connect to network", icon: "📶", fixKey: "canon_wifi" },
    ],
  },
  Epson: {
    question: "What's happening with your Epson Printer?",
    options: [
      { label: "Ink error (tanks are full)", sub: "False ink error on EcoTank", icon: "💧", fixKey: "epson_ink" },
      { label: "Won't print at all", sub: "No output, silent, ignores jobs", icon: "🔇", fixKey: "epson_wifi" },
      { label: "WiFi / network problem", sub: "Printer not found on network", icon: "📶", fixKey: "epson_wifi" },
      { label: "Error code showing", sub: "Blinking lights or error code", icon: "❌", fixKey: "epson_ink" },
    ],
  },
  Brother: {
    question: "What's happening with your Brother Printer?",
    options: [
      { label: "Driver unavailable (Win 11)", sub: "#1 issue after Windows 11 update", icon: "⚠️", fixKey: "brother_driver" },
      { label: "AirPrint / mobile not working", sub: "iPhone or iPad can't find printer", icon: "📱", fixKey: "brother_driver" },
      { label: "Toner / drum error", sub: "Replace toner or drum message", icon: "🖤", fixKey: "brother_driver" },
      { label: "Won't connect to WiFi", sub: "Network connection lost", icon: "📶", fixKey: "brother_driver" },
    ],
  },
  Garmin: {
    question: "What's happening with your Garmin GPS?",
    options: [
      { label: "Maps out of date", sub: "Old routes, wrong turns, missing roads", icon: "🗺️", fixKey: "gps_update" },
      { label: "Not finding satellites", sub: "Searching... never locks position", icon: "📡", fixKey: "gps_signal" },
      { label: "Garmin Express errors", sub: "Can't update, software errors", icon: "💻", fixKey: "gps_update" },
      { label: "Device won't turn on", sub: "Dead screen, no response", icon: "🔋", fixKey: "gps_signal" },
    ],
  },
  TomTom: {
    question: "What's happening with your TomTom GPS?",
    options: [
      { label: "Maps need updating", sub: "Old maps, missing addresses", icon: "🗺️", fixKey: "gps_update" },
      { label: "Not getting satellite signal", sub: "Can't find location", icon: "📡", fixKey: "gps_signal" },
      { label: "Won't connect to computer", sub: "Not recognized via USB", icon: "💻", fixKey: "gps_update" },
      { label: "Other issue", sub: "Frozen, won't start, other", icon: "❓", fixKey: "gps_signal" },
    ],
  },
  Magellan: {
    question: "What's happening with your Magellan GPS?",
    options: [
      { label: "Maps out of date", sub: "Old routes and addresses", icon: "🗺️", fixKey: "gps_update" },
      { label: "No satellite signal", sub: "Can't determine location", icon: "📡", fixKey: "gps_signal" },
      { label: "Content Manager errors", sub: "Software update issues", icon: "💻", fixKey: "gps_update" },
      { label: "Device issues", sub: "Frozen, won't respond", icon: "⚠️", fixKey: "gps_signal" },
    ],
  },
  Dell: {
    question: "What's happening with your Dell Computer?",
    options: [
      { label: "Running very slowly", sub: "Takes ages to start, laggy", icon: "🐌", fixKey: "pc_slow" },
      { label: "Blue screen / crashing", sub: "BSOD, random shutdowns", icon: "💙", fixKey: "pc_crash" },
      { label: "Virus / pop-ups", sub: "Strange pop-ups, browser hijacked", icon: "🦠", fixKey: "pc_virus" },
      { label: "Windows update stuck", sub: "Update won't complete, loops", icon: "🔄", fixKey: "pc_crash" },
    ],
  },
  HP_PC: {
    question: "What's happening with your HP Computer?",
    options: [
      { label: "Running very slowly", sub: "Takes ages to start, laggy", icon: "🐌", fixKey: "pc_slow" },
      { label: "Blue screen / crashing", sub: "BSOD, random shutdowns", icon: "💙", fixKey: "pc_crash" },
      { label: "Virus / pop-ups", sub: "Strange pop-ups, browser hijacked", icon: "🦠", fixKey: "pc_virus" },
      { label: "Windows stuck / won't boot", sub: "Stuck on loading screen", icon: "🔄", fixKey: "pc_crash" },
    ],
  },
  Lenovo: {
    question: "What's happening with your Lenovo Computer?",
    options: [
      { label: "Running very slowly", sub: "Takes ages to start, laggy", icon: "🐌", fixKey: "pc_slow" },
      { label: "Blue screen / crashing", sub: "BSOD, random shutdowns", icon: "💙", fixKey: "pc_crash" },
      { label: "Virus / pop-ups", sub: "Strange pop-ups, browser hijacked", icon: "🦠", fixKey: "pc_virus" },
      { label: "Fan very loud / overheating", sub: "Fan running at max speed", icon: "🌀", fixKey: "pc_crash" },
    ],
  },
  Gateway: {
    question: "What's happening with your Gateway Computer?",
    options: [
      { label: "Running very slowly", sub: "Takes ages to start, laggy", icon: "🐌", fixKey: "pc_slow" },
      { label: "Blue screen / crashing", sub: "BSOD, random shutdowns", icon: "💙", fixKey: "pc_crash" },
      { label: "Virus / pop-ups", sub: "Strange pop-ups, browser hijacked", icon: "🦠", fixKey: "pc_virus" },
      { label: "Windows won't start", sub: "Boot loop or black screen", icon: "🔄", fixKey: "pc_crash" },
    ],
  },
  Malwarebytes: { question: "What's your security situation?", options: [
    { label: "Malwarebytes found threats", sub: "Scan detected viruses/malware", icon: "🔴", fixKey: "pc_virus" },
    { label: "Pop-ups won't stop", sub: "Ads even without browser open", icon: "💥", fixKey: "virus_popup" },
    { label: "PC running slower than ever", sub: "Virus may be using resources", icon: "🐌", fixKey: "pc_virus" },
    { label: "Was scammed / gave access", sub: "Called fake support number", icon: "⚠️", fixKey: "virus_popup" },
  ]},
  McAfee: { question: "What's your security situation?", options: [
    { label: "McAfee keeps alerting", sub: "Constant threat notifications", icon: "🔴", fixKey: "pc_virus" },
    { label: "Pop-ups everywhere", sub: "Fake alerts, ads on desktop", icon: "💥", fixKey: "virus_popup" },
    { label: "McAfee won't update/open", sub: "Software not responding", icon: "⚠️", fixKey: "pc_virus" },
    { label: "Was scammed / gave access", sub: "Called fake support number", icon: "🚨", fixKey: "virus_popup" },
  ]},
  Norton: { question: "What's your security situation?", options: [
    { label: "Norton found threats", sub: "Quarantined files, active threats", icon: "🔴", fixKey: "pc_virus" },
    { label: "Pop-ups / browser hijacked", sub: "Homepage changed, ads everywhere", icon: "💥", fixKey: "virus_popup" },
    { label: "Ransomware / files locked", sub: "Files encrypted, ransom demand", icon: "🔒", fixKey: "pc_virus" },
    { label: "Was scammed online", sub: "Gave credit card or remote access", icon: "⚠️", fixKey: "virus_popup" },
  ]},
  Avast: { question: "What's your security situation?", options: [
    { label: "Avast detected virus", sub: "Active threat notifications", icon: "🔴", fixKey: "pc_virus" },
    { label: "Pop-ups / ads everywhere", sub: "Adware, fake virus warnings", icon: "💥", fixKey: "virus_popup" },
    { label: "Browser settings changed", sub: "Search engine or homepage changed", icon: "🌐", fixKey: "virus_popup" },
    { label: "PC extremely slow", sub: "Malware may be using CPU/RAM", icon: "🐌", fixKey: "pc_virus" },
  ]},
  AVG: { question: "What's your security situation?", options: [
    { label: "AVG found threats", sub: "Scan results show malware", icon: "🔴", fixKey: "pc_virus" },
    { label: "Pop-ups everywhere", sub: "Ads, fake virus warnings", icon: "💥", fixKey: "virus_popup" },
    { label: "Email account hacked", sub: "Sending spam, password changed", icon: "📧", fixKey: "pc_virus" },
    { label: "Was scammed — need help", sub: "Gave access or paid scammer", icon: "⚠️", fixKey: "virus_popup" },
  ]},
};

const SEV_STYLES = {
  easy:   { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "#22c55e", label: "🟢 Easy Fix", bg: "from-emerald-50 to-white", border: "border-emerald-200" },
  medium: { pill: "bg-amber-100 text-amber-700 border-amber-200",     bar: "#f59e0b", label: "🟡 Moderate",  bg: "from-amber-50 to-white",   border: "border-amber-200" },
  urgent: { pill: "bg-red-100 text-red-700 border-red-200",           bar: "#ef4444", label: "🔴 Urgent",    bg: "from-red-50 to-white",     border: "border-red-200" },
};

/* ── Scanning Animation ─────────────────────────────────────── */
function ScanningStep({ onDone }: { onDone: () => void }) {
  const lines = [
    "Checking device database...",
    "Matching error patterns...",
    "Loading fix protocol...",
    "Success rate: calculated",
    "Solution ready ✓",
  ];
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setActive(i);
      setPct(Math.round((i / lines.length) * 100));
      if (i >= lines.length) {
        clearInterval(t);
        setTimeout(onDone, 600);
      }
    }, 420);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 px-6"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 mx-auto mb-4"
          />
          <p className="text-lg font-bold text-gray-800">Analyzing your problem...</p>
          <p className="text-sm text-gray-500 mt-1">Cross-referencing 10,000+ fix records</p>
        </div>

        <div className="bg-gray-950 rounded-2xl p-5 font-mono text-sm mb-6 space-y-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i <= active ? 1 : 0.25, x: 0 }}
              transition={{ delay: i * 0.42 }}
              className={`flex items-center gap-2 ${i < active ? "text-green-400" : i === active ? "text-white" : "text-gray-600"}`}
            >
              <span className="text-xs">
                {i < active ? "✓" : i === active ? "▶" : "○"}
              </span>
              {line}
              {i === active && <span className="animate-pulse">_</span>}
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Diagnosis progress</span>
            <span className="font-bold text-blue-600">{pct}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Lead Capture (after scan, before result) ───────────────── */
function LeadCapture({ fix, onSkip }: { fix: Fix; onSkip: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
    setTimeout(onSkip, 800);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="py-12 text-center"
      >
        <div className="text-5xl mb-4">✅</div>
        <p className="text-xl font-black text-gray-900 mb-2">Got it, {name.split(" ")[0]}!</p>
        <p className="text-gray-500 text-sm">Loading your personalised fix report...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 py-8"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-green-200">
            ✓ Fix Found — 94% Success Rate
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">
            We found the fix for your {fix.title.split("—")[0].trim()}
          </h3>
          <p className="text-sm text-gray-500">
            Enter your details to get the full step-by-step guide + have a technician stand by if needed.
          </p>
        </div>

        <div className="space-y-3 mb-5">
          <input
            type="text"
            placeholder="Your first name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-blue-400 outline-none text-gray-900 text-base font-medium transition-colors"
          />
          <input
            type="email"
            placeholder="Email address (for fix report)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-blue-400 outline-none text-gray-900 text-base transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone — for technician callback (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-blue-400 outline-none text-gray-900 text-base transition-colors"
          />
        </div>

        <motion.button
          onClick={submit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!name.trim()}
          className="w-full py-4 rounded-xl font-black text-white text-base mb-3 disabled:opacity-40 transition-all"
          style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", boxShadow: "0 4px 20px rgba(79,70,229,0.4)" }}
        >
          Show Me the Fix →
        </motion.button>

        <button onClick={onSkip} className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2">
          Skip — show fix anyway
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">🔒 We never share your info. No spam, ever.</p>
      </div>
    </motion.div>
  );
}

/* ── Brand/Category Option Card ─────────────────────────────── */
function OptionCard({ opt, onClick }: { opt: BrandOption; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 bg-white hover:bg-blue-50/50 transition-all text-center group cursor-pointer"
    >
      <span className="text-4xl">{opt.icon}</span>
      <span className="font-black text-gray-900 text-base group-hover:text-blue-700 transition-colors leading-tight">
        {opt.label}
      </span>
      <span className="text-xs text-gray-400 leading-snug">{opt.sub}</span>
    </motion.button>
  );
}

/* ── Main TechER Component ──────────────────────────────────── */
export function TechER({ brandFilter, pageTrending, category }: TechERProps) {
  type Stage = "brand" | "issue" | "scanning" | "lead" | "result";

  const getBrandSet = (): BrandQuestionSet => {
    if (category === "gps") return GPS_BRANDS;
    if (category === "computer") return COMPUTER_BRANDS;
    if (category === "virus") return VIRUS_BRANDS;
    return PRINTER_BRANDS;
  };

  const getInitialStage = (): Stage => {
    if (brandFilter) return "issue";
    return "brand";
  };

  const [stage, setStage] = useState<Stage>(getInitialStage());
  const [selectedBrand, setSelectedBrand] = useState<BrandFilter>(brandFilter);
  const [fix, setFix] = useState<Fix | null>(null);
  const [progressPct, setProgressPct] = useState(brandFilter ? 25 : 0);

  const brandSet = getBrandSet();

  const reset = () => {
    setStage(getInitialStage());
    setSelectedBrand(brandFilter);
    setFix(null);
    setProgressPct(brandFilter ? 25 : 0);
  };

  const chooseBrand = (opt: BrandOption) => {
    if (opt.fixKey) {
      setFix(FIXES[opt.fixKey]);
      setStage("scanning");
      setProgressPct(50);
      return;
    }
    setSelectedBrand(opt.brand);
    setStage("issue");
    setProgressPct(40);
  };

  const chooseIssue = (fixKey: string) => {
    setFix(FIXES[fixKey]);
    setStage("scanning");
    setProgressPct(65);
  };

  const afterScan = () => {
    setStage("lead");
    setProgressPct(80);
  };

  const showResult = () => {
    setStage("result");
    setProgressPct(100);
  };

  // Get the right issue question set
  const issueKey = selectedBrand as string;
  const issueQ = BRAND_ISSUE_QUESTIONS[issueKey] || null;

  const sev = fix ? SEV_STYLES[fix.severity] : null;

  const stepLabel = {
    brand: "Step 1 — Select Brand",
    issue: "Step 2 — Select Problem",
    scanning: "Analyzing...",
    lead: "Almost There",
    result: "Fix Found ✓",
  }[stage];

  return (
    <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">

      {/* ── Tool Header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stepLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-blue-600">{progressPct}% complete</span>
          {stage !== getInitialStage() && (
            <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-700 font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="h-1.5 bg-gray-100">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6)" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* ── Trending pills ── */}
      {pageTrending && pageTrending.length > 0 && stage !== "result" && stage !== "scanning" && stage !== "lead" && (
        <div className="px-6 py-3 flex flex-wrap gap-2 border-b border-gray-50 bg-blue-50/30">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider self-center">🔥 Trending:</span>
          {pageTrending.map((t) => (
            <span key={t} className="text-xs font-medium text-blue-700 bg-white border border-blue-100 px-3 py-1 rounded-full shadow-sm">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* ── Stage Content ── */}
      <AnimatePresence mode="wait">

        {/* BRAND SELECTION */}
        {stage === "brand" && (
          <motion.div key="brand" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2">{brandSet.question}</h3>
            <p className="text-gray-500 text-center text-sm mb-7">Select your device brand to get a tailored fix guide</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {brandSet.options.map((opt) => (
                <OptionCard key={opt.label} opt={opt} onClick={() => chooseBrand(opt)} />
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mt-6">
              Rather talk to a human? <a href={PHONE_HREF} className="text-blue-600 font-bold hover:underline">{PHONE}</a> — available 24/7
            </p>
          </motion.div>
        )}

        {/* ISSUE SELECTION */}
        {stage === "issue" && issueQ && (
          <motion.div key="issue" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-2">{issueQ.question}</h3>
            <p className="text-gray-500 text-center text-sm mb-7">Pick the issue closest to what you're experiencing</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {issueQ.options.map((opt) => (
                <motion.button
                  key={opt.label}
                  onClick={() => chooseIssue(opt.fixKey!)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 bg-white hover:bg-blue-50/50 transition-all text-left group"
                >
                  <span className="text-3xl shrink-0 mt-0.5">{opt.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-base">{opt.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            {!brandFilter && (
              <button onClick={() => { setStage("brand"); setProgressPct(0); }} className="mt-5 text-sm text-gray-400 hover:text-gray-700 flex items-center gap-1 mx-auto transition-colors">
                ← Back
              </button>
            )}
          </motion.div>
        )}

        {/* SCANNING */}
        {stage === "scanning" && fix && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScanningStep onDone={afterScan} />
          </motion.div>
        )}

        {/* LEAD CAPTURE */}
        {stage === "lead" && fix && (
          <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LeadCapture fix={fix} onSkip={showResult} />
          </motion.div>
        )}

        {/* RESULT */}
        {stage === "result" && fix && sev && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="p-6 md:p-8">

            {/* Result header */}
            <div className="flex flex-wrap items-start gap-3 mb-5">
              <span className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${sev.pill}`}>
                {sev.label}
              </span>
              <span className="text-xs text-gray-400 font-semibold self-center">
                {fix.successRate}% success rate · ~{fix.avgTime}
              </span>
              <button onClick={reset} className="ml-auto text-xs text-gray-400 hover:text-gray-600 font-semibold transition-colors">
                ← Start over
              </button>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">{fix.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{fix.summary}</p>

            {/* Step-by-step guide */}
            <div className={`rounded-2xl bg-gradient-to-b ${sev.bg} border ${sev.border} mb-6 overflow-hidden`}>
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Step-by-Step Fix Guide</p>
              </div>
              <ol className="divide-y divide-gray-100">
                {fix.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 px-5 py-4"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border ${sev.pill}`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm mb-1">{step.icon} {step.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <motion.a
                href={fix.cta.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 text-white font-black py-4 px-6 rounded-2xl text-base transition-all"
                style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", boxShadow: "0 4px 20px rgba(220,38,38,0.4)" }}
              >
                {fix.cta.label}
              </motion.a>
              {fix.ctaSecondary && (
                <Link href={fix.ctaSecondary.href}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-all">
                  {fix.ctaSecondary.label}
                </Link>
              )}
            </div>

            {/* Callback CTA */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 mb-3">
              <div className="text-2xl">📞</div>
              <div className="text-sm">
                <p className="font-bold text-emerald-700">Want us to call you?</p>
                <p className="text-emerald-500 text-xs">Free callback · Average response under 5 min</p>
              </div>
              <CallbackButton
                className="ml-auto text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition-colors shrink-0"
              >Call Me Back</CallbackButton>
            </div>

            <p className="text-center text-sm text-gray-500">
              Or call us: <a href={PHONE_HREF} className="text-blue-600 font-bold hover:underline">{PHONE}</a> — 24/7 · No fix = no fee
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
