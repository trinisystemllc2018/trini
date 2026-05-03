# Trini System LLC — Next.js Website v2.0

Premium tech support & SaaS platform built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📦 Deploy to Vercel (Recommended)

### Option 1 — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
# Follow prompts — it auto-detects Next.js
```

### Option 2 — Vercel Dashboard
1. Push this folder to GitHub
2. Go to vercel.com → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click Deploy

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout + SEO metadata
│   ├── globals.css               # Global styles + animations
│   ├── page.tsx                  # Homepage
│   ├── products/page.tsx         # TriniCleaner product page
│   ├── services/page.tsx         # All services (HP, Canon, Epson, Brother)
│   ├── tools/page.tsx            # Interactive tools page
│   ├── guides/page.tsx           # Step-by-step guides library
│   ├── downloads/page.tsx        # Download center
│   └── contact/page.tsx          # Contact form + methods
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky nav with scroll progress bar
│   │   └── Footer.tsx            # Full footer with all links
│   ├── ui/
│   │   ├── Button.tsx            # Button variants + StickyCTA bar
│   │   ├── FloatingSupport.tsx   # Animated floating chat widget
│   │   └── ExitIntentPopup.tsx   # Exit intent modal
│   ├── sections/
│   │   ├── HeroSection.tsx       # Homepage hero with typing effect + mockup
│   │   └── ReviewsSection.tsx    # Carousel + animated stats
│   └── features/
│       ├── SmartProblemFinder.tsx # 2-step diagnosis wizard → solution
│       ├── PrinterSimulator.tsx   # Animated printer setup walkthrough
│       ├── CompatChecker.tsx      # Model → drivers + issues + OneClickHelpMode
│       └── DownloadAssistant.tsx  # Install guide + live scan dashboard
│
├── hooks/
│   └── useAnimations.ts          # useReveal, useCountUp, useParallax, useTyping, etc.
│
└── lib/
    └── utils.ts                  # cn(), constants, BRANDS, REVIEWS, SERVICES
```

## 🎨 Design System

- **Colors**: Blue brand (#2563eb) + sky backgrounds + emerald accents
- **Typography**: Inter — accessible large sizes for 40+ audience
- **Animations**: Framer Motion page transitions + scroll reveals
- **Shadows**: Custom soft shadow scale (shadow-soft, soft-lg, soft-xl)
- **Senior-friendly**: 48px+ tap targets, high contrast, clear CTAs

## ✨ Key Features Built

| Feature | Location |
|---------|----------|
| Smart Problem Finder (2-step wizard) | `features/SmartProblemFinder.tsx` |
| Printer Setup Simulator (animated) | `features/PrinterSimulator.tsx` |
| Device Compatibility Checker | `features/CompatChecker.tsx` |
| One-Click Help Mode (senior mode) | `features/CompatChecker.tsx` |
| Live Status Dashboard | `features/DownloadAssistant.tsx` |
| Download Install Assistant | `features/DownloadAssistant.tsx` |
| Exit Intent Popup | `ui/ExitIntentPopup.tsx` |
| Floating Support Widget | `ui/FloatingSupport.tsx` |
| Sticky CTA Bar | `ui/Button.tsx → StickyCTA` |
| Scroll Progress Bar | `layout/Navbar.tsx` |
| Animated Stats Counter | `sections/ReviewsSection.tsx` |
| Reviews Carousel | `sections/ReviewsSection.tsx` |
| Typing Effect Hero | `sections/HeroSection.tsx` |
| Parallax Hero | `sections/HeroSection.tsx` |
| Geek Squad Comparison Table | `app/page.tsx → ComparisonSection` |

## 📱 Pages & SEO

| Page | URL | Focus Keywords |
|------|-----|----------------|
| Homepage | / | printer repair USA, tech support |
| TriniCleaner | /products | free computer cleaner, make PC faster |
| Services | /services | HP printer repair, Canon printer support |
| Tools | /tools | printer setup guide, compatibility checker |
| Guides | /guides | HP DeskJet 4155e setup, Canon B200 fix |
| Downloads | /downloads | free Windows optimizer, TriniCleaner |
| Contact | /contact | tech support 347-953-1531 |

## 🔧 Customization

### Update phone number
Edit `src/lib/utils.ts` → `PHONE` and `PHONE_HREF`

### Add new printer models
Edit `src/lib/utils.ts` → `BRANDS` array

### Add new guides
Edit `src/app/guides/page.tsx` → `GUIDES` array

### Add new reviews
Edit `src/lib/utils.ts` → `REVIEWS` array

## 📊 Performance

- Next.js Image optimization built-in
- Lazy-loaded components with dynamic imports
- Static generation for all pages
- Vercel Edge Network CDN on deploy
- Core Web Vitals optimized

## 📞 Contact
**Trini System LLC** · 347-953-1531 · Available 24/7
