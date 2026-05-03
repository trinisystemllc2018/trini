/* ═══════════════════════════════════════════════════════════
   PROGRAMMATIC SEO DATA MODEL
   Powers /fix-printer/[brand]/[problem] and /garmin-update/[model]
   Each combination = a unique, indexable, high-intent page
═══════════════════════════════════════════════════════════ */

export const PRINTER_BRANDS = {
  hp: {
    name: "HP",
    fullName: "Hewlett-Packard",
    color: "#0096D6",
    popular: true,
    models: [
      "DeskJet 4155e","DeskJet 2755e","DeskJet 3755","ENVY 6055e","ENVY 6455e",
      "OfficeJet Pro 9015e","OfficeJet Pro 9025e","LaserJet M404n","LaserJet Pro M404dn",
    ],
    driverUrl: "https://123.hp.com",
    supportUrl: "https://support.hp.com",
  },
  canon: {
    name: "Canon",
    fullName: "Canon Inc.",
    color: "#CC0000",
    popular: true,
    models: [
      "PIXMA MX922","PIXMA TR4520","PIXMA TR4722","PIXMA MG3620",
      "imageCLASS MF644Cdw","MAXIFY MB5420","PIXMA G620",
    ],
    driverUrl: "https://www.usa.canon.com/support",
    supportUrl: "https://www.usa.canon.com/support",
  },
  epson: {
    name: "Epson",
    fullName: "Epson America Inc.",
    color: "#007AB8",
    popular: true,
    models: [
      "EcoTank ET-2720","EcoTank ET-4760","EcoTank ET-3850","EcoTank ET-2800",
      "WorkForce WF-7720","WorkForce WF-2930","Expression XP-7100",
    ],
    driverUrl: "https://epson.com/support",
    supportUrl: "https://epson.com/support",
  },
  brother: {
    name: "Brother",
    fullName: "Brother Industries",
    color: "#004B9C",
    popular: true,
    models: [
      "MFC-L2710DW","MFC-J995DW","HL-L2350DW","HL-L3270CDW",
      "DCP-L2550DW","MFC-L8900CDW",
    ],
    driverUrl: "https://support.brother.com",
    supportUrl: "https://support.brother.com",
  },
};

export const PRINTER_PROBLEMS = {
  offline: {
    slug: "offline",
    title: "Printer Offline",
    searchTerms: ["printer offline","printer showing offline","printer says offline","fix printer offline"],
    severity: "medium" as const,
    successRate: 94,
    avgTime: "8 min",
    summary: "Your computer lost communication with the printer. This is the #1 most common printer complaint and is almost always fixed without any hardware replacement.",
    steps: [
      { title: "Restart both devices", detail: "Power off printer and WiFi router. Unplug both from the wall for 30 seconds. Restart router first, wait 60 seconds, then restart printer." },
      { title: "Remove offline flag in Windows", detail: "Settings → Bluetooth & Devices → Printers → click your printer → Open print queue → Printer menu → uncheck 'Use Printer Offline'." },
      { title: "Set as default printer", detail: "In Printers & Scanners, click your printer → Set as Default → Print a test page." },
      { title: "Reinstall driver if still offline", detail: "Remove the printer from Windows. Visit the manufacturer's support site, download the full driver, and reinstall choosing Wireless setup." },
    ],
    faqs: [
      { q: "Why does my printer keep going offline?", a: "The most common causes are: WiFi router IP address changes, Windows driver conflicts after updates, or the 'Use Printer Offline' flag getting set accidentally. A router restart fixes this 70% of the time." },
      { q: "Can I fix an offline printer without calling anyone?", a: "Yes — follow the 4 steps above. If those don't work in 10 minutes, call us at 347-953-1531 for a free remote fix." },
    ],
  },
  "not-printing": {
    slug: "not-printing",
    title: "Printer Not Printing",
    searchTerms: ["printer not printing","printer won't print","printer queue stuck","print job not printing"],
    severity: "medium" as const,
    successRate: 91,
    avgTime: "10 min",
    summary: "A stuck print queue or corrupted print job is the most common cause of 'won't print'. The fix is fast and doesn't require technical skills.",
    steps: [
      { title: "Clear the print queue", detail: "On Windows: Settings → Printers → click your printer → Open print queue → select all jobs → Delete. Then restart the printer." },
      { title: "Restart the Print Spooler service", detail: "Press Win+R, type 'services.msc', find 'Print Spooler', right-click → Restart. This clears any stuck system-level print jobs." },
      { title: "Print from a different program", detail: "Try printing from Notepad or WordPad. If that works, the original document or program is the issue — not the printer." },
      { title: "Update or reinstall the driver", detail: "An outdated driver is often the real culprit. Visit your printer manufacturer's support site and download the latest driver for your exact model." },
    ],
    faqs: [
      { q: "Why is my printer not printing even though it's connected?", a: "Stuck print jobs, corrupted spooler data, or an outdated driver are the most common causes. Clearing the print queue and restarting the Print Spooler service solves this in 80% of cases." },
    ],
  },
  "wifi-setup": {
    slug: "wifi-setup",
    title: "WiFi Setup & Connection",
    searchTerms: ["printer wifi setup","printer won't connect wifi","printer wireless setup","connect printer to wifi"],
    severity: "easy" as const,
    successRate: 96,
    avgTime: "12 min",
    summary: "Connecting a printer to WiFi is straightforward once you know the right sequence. Most failures happen because of wrong order or incorrect password entry.",
    steps: [
      { title: "Use the printer's wireless setup wizard", detail: "On the printer's touchscreen or button panel: find Network Settings or WiFi Setup → Wireless Setup Wizard → select your network name → enter your WiFi password carefully (case-sensitive)." },
      { title: "Or use WPS if your router supports it", detail: "Press the WPS button on your router. Within 2 minutes, press the WPS or WiFi button on your printer. They'll connect automatically without entering a password." },
      { title: "Install the manufacturer's app on your phone", detail: "HP Smart, Canon PRINT, or Epson iPrint apps often provide the easiest wireless setup. Download the app and follow the on-screen instructions." },
      { title: "Confirm connection and install driver on PC", detail: "Once the printer shows connected on its screen, go to your PC → Settings → Printers → Add a printer. Windows will find it on your network." },
    ],
    faqs: [
      { q: "My printer says 'Connected' but I still can't print — why?", a: "The printer may be connected to WiFi but the Windows driver isn't set up yet. Go to Settings → Printers → Add a printer. If that doesn't work, reinstall the driver from the manufacturer's website." },
    ],
  },
  "error-code": {
    slug: "error-code",
    title: "Error Code",
    searchTerms: ["printer error code","printer error message","hp error oxc19a0035","canon error b200","epson error"],
    severity: "urgent" as const,
    successRate: 87,
    avgTime: "15 min",
    summary: "Printer error codes sound alarming but most are fixable without any hardware replacement. The key is identifying the exact code and applying the right fix.",
    steps: [
      { title: "Note the exact error code", detail: "Write down or photograph the complete error code. Different codes have completely different fixes — OXc19a0035 vs 0x83c0000a require totally different solutions." },
      { title: "Power cycle with a long wait", detail: "Turn off the printer, unplug from wall for 2 full minutes (longer than a normal restart). This clears the printer's memory buffers which often causes error loops." },
      { title: "Update printer firmware", detail: "Many error codes are caused by outdated firmware. Check your printer's settings menu for a firmware update, or use the manufacturer's app on your PC." },
      { title: "Call with the exact error code", detail: "Each code has a specific fix. Call 347-953-1531 with your exact code and we'll tell you the solution in under 2 minutes — free." },
    ],
    faqs: [
      { q: "What does HP error OXc19a0035 mean?", a: "This is an HP ink system failure error on DeskJet and ENVY printers. Remove all cartridges, check for packing tape, clean the gold contacts with a dry cloth, and reinsert firmly. Call us if it persists." },
      { q: "What does Canon B200 error mean?", a: "B200 is a printhead overheating error. Unplug the printer, slide the cartridge to center position, wait 15 minutes, then try the Stop/Reset + Power button reset sequence. 76% of B200 errors fix without any new parts." },
    ],
  },
};

export const GARMIN_MODELS = {
  "drivesmart-65": {
    name: "DriveSmart 65",
    screen: '6.95"',
    connection: "WiFi + USB",
    popular: true,
  },
  "drivesmart-55": {
    name: "DriveSmart 55",
    screen: '5.5"',
    connection: "WiFi + USB",
    popular: true,
  },
  "drivesmart-76": {
    name: "DriveSmart 76",
    screen: '6.95"',
    connection: "WiFi + USB",
    popular: false,
  },
  "nuvi-2597": {
    name: "nüvi 2597LMT",
    screen: '5"',
    connection: "USB only",
    popular: true,
  },
  "rv-890": {
    name: "RV 890",
    screen: '8"',
    connection: "WiFi + USB",
    popular: false,
  },
  "drivesmart-61": {
    name: "DriveSmart 61",
    screen: '6.95"',
    connection: "WiFi + USB",
    popular: false,
  },
};

export type BrandKey   = keyof typeof PRINTER_BRANDS;
export type ProblemKey = keyof typeof PRINTER_PROBLEMS;
export type GarminKey  = keyof typeof GARMIN_MODELS;
