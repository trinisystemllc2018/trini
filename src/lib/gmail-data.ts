/* ═══════════════════════════════════════════════════════════════════════
   GMAIL HELP CLUSTER — SENIOR-FOCUSED SEO DATA
   Powers all /how-to/gmail-* pages

   Each entry produces ONE indexable, AI-citable, ranking-ready page.
   Content researched against current Gmail UI (verified May 2026)
   and the actual long-tail queries seniors type into Google.

   Pattern matches /lib/garmin-data.ts — same dynamic [slug] handler.
═══════════════════════════════════════════════════════════════════════ */

export type WalkthroughScreen = {
  id: string;
  title: string;          // What this screen represents
  brandHeader: string;    // Header bar text (e.g., "Google")
  description: string;    // Short hint shown above the mockup
  body: WalkthroughBody;  // The visual mockup definition
  arrowTarget: string;    // Element id to point arrow at
  arrowText: string;      // Senior-friendly tooltip text
  whatHappens: string;    // Plain-English explanation below
};

export type WalkthroughBody =
  | { kind: "google-signin"; emailValue?: string; showError?: boolean }
  | { kind: "google-password"; emailEcho: string; showForgotLink?: boolean }
  | { kind: "google-2fa"; emailEcho: string; codeMode: "sms" | "prompt" }
  | { kind: "gmail-inbox"; userName: string; userEmail: string }
  | { kind: "google-recovery-start" }
  | { kind: "google-recovery-verify"; method: "email" | "phone" | "lastpassword" }
  | { kind: "google-new-password" }
  | { kind: "gmail-compose" }
  | { kind: "gmail-spam-folder" }
  | { kind: "gmail-storage-full" }
  | { kind: "gmail-suspicious-email"; senderName: string; senderEmail: string };

export type GmailPage = {
  slug: string;
  // ── Search intent ──
  primaryQuery: string;            // The exact phrase a senior types
  alternateQueries: string[];      // Variations Google clusters together
  searchVolume: "very-high" | "high" | "medium-high" | "medium";
  difficulty: "low" | "medium" | "high";

  // ── SEO meta ──
  metaTitle: string;               // <title> — must contain primary query
  metaDescription: string;         // <meta description> — 150-160 chars
  h1: string;                      // Page H1 — written as the senior asks it
  primaryKeywords: string;         // Comma-separated for <meta keywords>

  // ── Above-the-fold ──
  tldrAnswer: string;              // First 60 words — AI extraction sweet spot
  heroIntro: string;               // Subtitle shown below the H1
  estimatedTime: string;           // e.g., "5 minutes"
  difficultyLabel: string;         // "Easy" | "Medium" — set seniors' expectations
  category: string;                // e.g., "Password", "Account"
  pageType: "guide" | "hub";       // hub = card grid; guide = step-by-step

  // ── E-E-A-T ──
  lastUpdated: string;             // ISO date string e.g. "2026-05-03"
  reviewedBy: string;              // Author / reviewer name

  // ── Visual walkthrough ──
  walkthrough: WalkthroughScreen[];

  // ── Long-form content ──
  toolsRequired: string[];
  textSteps: { step: number; title: string; detail: string; warning?: string }[];
  whatIfNotWork: { problem: string; cause: string; fix: string }[];
  faqs: { q: string; a: string }[];

  // ── Internal linking ──
  relatedSlugs: string[];          // Other slugs in the Gmail cluster
};

// ════════════════════════════════════════════════════════════════════
// REUSABLE WALKTHROUGH SCREENS — built once, referenced by many pages
// ════════════════════════════════════════════════════════════════════

const SCREEN_GMAIL_HOMEPAGE: WalkthroughScreen = {
  id: "homepage",
  title: "Step 1 — Open Gmail",
  brandHeader: "Google",
  description: "Open your web browser and type gmail.com into the address bar.",
  body: { kind: "google-signin" },
  arrowTarget: "address-bar",
  arrowText: "Type gmail.com here →",
  whatHappens: "When you press Enter, Google takes you to the sign-in page where you'll type your email address.",
};

const SCREEN_EMAIL_ENTRY: WalkthroughScreen = {
  id: "email-entry",
  title: "Step 2 — Type your email address",
  brandHeader: "Google",
  description: "This is the Google sign-in screen. Type your full email address here.",
  body: { kind: "google-signin", emailValue: "" },
  arrowTarget: "email-input",
  arrowText: "Type your email here",
  whatHappens: "Type the email address you use, like yourname@gmail.com. Then click the blue 'Next' button.",
};

const SCREEN_PASSWORD_ENTRY: WalkthroughScreen = {
  id: "password-entry",
  title: "Step 3 — Type your password",
  brandHeader: "Google",
  description: "Now Google asks for your password. Type carefully — passwords are case-sensitive.",
  body: { kind: "google-password", emailEcho: "yourname@gmail.com", showForgotLink: true },
  arrowTarget: "password-input",
  arrowText: "Type your password here",
  whatHappens: "If you cannot remember your password, click 'Forgot password?' below the box. Otherwise type it and click Next.",
};

const SCREEN_2FA: WalkthroughScreen = {
  id: "2fa",
  title: "Step 4 — Verify it's really you",
  brandHeader: "Google",
  description: "Google may send a 6-digit code to your phone or ask you to tap 'Yes' on a phone notification.",
  body: { kind: "google-2fa", emailEcho: "yourname@gmail.com", codeMode: "sms" },
  arrowTarget: "code-input",
  arrowText: "Type the 6-digit code here",
  whatHappens: "Open your text messages on your phone — you'll see a 6-digit number from Google. Type it here.",
};

const SCREEN_INBOX: WalkthroughScreen = {
  id: "inbox",
  title: "You're in! This is your Gmail inbox",
  brandHeader: "Gmail",
  description: "This is what your real Gmail inbox looks like. Your emails appear in the list.",
  body: { kind: "gmail-inbox", userName: "Sarah", userEmail: "yourname@gmail.com" },
  arrowTarget: "inbox-list",
  arrowText: "Your emails appear here",
  whatHappens: "Click any email to open it. To write a new email, click the red 'Compose' button on the left.",
};

// ════════════════════════════════════════════════════════════════════
// THE 12 GMAIL PAGES
// ════════════════════════════════════════════════════════════════════

export const GMAIL_PAGES: Record<string, GmailPage> = {

  // ─── 1. HUB / OVERVIEW PAGE ─────────────────────────────────────
  "gmail-help": {
    slug: "gmail-help",
    primaryQuery: "gmail help for seniors",
    alternateQueries: [
      "gmail for seniors",
      "gmail help",
      "how to use gmail for seniors",
      "gmail guide for older adults",
    ],
    searchVolume: "very-high",
    difficulty: "medium",
    metaTitle: "Gmail Help for Seniors — Complete Plain-English Guide (2026)",
    metaDescription: "Easy Gmail help written for seniors. Login, password reset, recovery, sending email, and more. Big text, simple steps, free phone help: 347-953-1531.",
    h1: "Gmail Help for Seniors — All Your Questions Answered",
    primaryKeywords: "gmail for seniors, gmail help, how to use gmail, gmail guide, easy gmail",
    tldrAnswer: "This is your friendly Gmail help center, written in plain English for seniors. Below you'll find step-by-step guides for the most common things people ask about Gmail: how to log in, what to do when you forget your password, how to recover your account, how to send emails and photos, and how to spot scam emails. Each guide has large pictures showing exactly where to click.",
    estimatedTime: "Browse at your own pace",
    difficultyLabel: "Easy",
    heroIntro: "Your plain-English guide to everything Gmail — pick the topic you need below.",
    category: "Overview",
    pageType: "hub",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer, tablet, or smartphone", "internet connection"],
    walkthrough: [SCREEN_GMAIL_HOMEPAGE, SCREEN_EMAIL_ENTRY, SCREEN_PASSWORD_ENTRY, SCREEN_INBOX],
    textSteps: [
      { step: 1, title: "Pick the topic that matches your question", detail: "Use the list of guides on this page. Each one is written for a specific question seniors ask about Gmail." },
      { step: 2, title: "Read the short answer at the top", detail: "Every guide starts with a quick answer in 2-3 sentences. If that's enough, you're done. If not, keep reading." },
      { step: 3, title: "Try the picture walkthrough", detail: "Each guide has a 'Practice Mode' you can click through. It shows you exactly what Gmail looks like and where to click." },
      { step: 4, title: "Call us if you get stuck", detail: "If anything is confusing, call Trini System at 347-953-1531. We'll walk you through it on the phone — free." },
    ],
    whatIfNotWork: [
      { problem: "I can't find a guide for my problem", cause: "See fix below.", fix: "Call us at 347-953-1531 and tell us what you're trying to do. We'll help you over the phone." },
      { problem: "The steps don't look like my Gmail", cause: "See fix below.", fix: "Gmail looks slightly different on phones, tablets, and computers. Tell us what you're using when you call and we'll match the right instructions." },
    ],
    faqs: [
      { q: "Is Gmail free for seniors?", a: "Yes. Gmail is free for everyone — there is no senior fee, no monthly cost, and no premium version you need to buy. Anyone can use Gmail for free with up to 15 GB of storage." },
      { q: "Is Gmail safe to use?", a: "Yes. Gmail is one of the safest free email services because Google blocks most spam and scam emails before they reach you. Always turn on 2-Step Verification (we explain how in our login guide) for extra protection." },
      { q: "Do I need a smartphone to use Gmail?", a: "No. You can use Gmail on a regular computer, a laptop, a tablet, or any phone with internet. Just type gmail.com into your web browser." },
      { q: "What if I share a computer with my spouse — can we both have Gmail?", a: "Yes. Each person needs their own Gmail account, but you can both use the same computer. Just sign out when you're done, and your spouse signs in with their own account." },
      { q: "Will Gmail charge me money if I run out of storage?", a: "Only if you choose to upgrade. If your 15 GB fills up, Google will email you about buying more storage, but you can also delete old emails to free up space — we have a guide for that." },
      { q: "Can I call someone at Google for help?", a: "No. Google does not offer phone support for free Gmail accounts. If anyone calls you saying they're 'Google Support,' it's a scam — hang up. For real, free phone help with Gmail, call Trini System at 347-953-1531." },
    ],
    relatedSlugs: ["gmail-login", "gmail-forgot-password", "gmail-recover-account", "gmail-send-email", "gmail-scam-emails"],
  },

  // ─── 2. LOGIN ─────────────────────────────────────────────────────
  "gmail-login": {
    slug: "gmail-login",
    primaryQuery: "how to login to gmail",
    alternateQueries: [
      "gmail login",
      "how to sign in to gmail",
      "log in to my gmail",
      "gmail.com login",
      "how do i get into my gmail",
      "open my gmail account",
    ],
    searchVolume: "very-high",
    difficulty: "low",
    metaTitle: "How to Login to Gmail — Step-by-Step Guide for Seniors (2026)",
    metaDescription: "Easy Gmail login guide for seniors. Big pictures, plain English, every step shown. Free phone help if you get stuck: 347-953-1531.",
    h1: "How to Login to Gmail — Easy Steps for Seniors",
    primaryKeywords: "gmail login, how to login gmail, sign in gmail, gmail.com login, login to my gmail",
    tldrAnswer: "To login to Gmail: open your web browser and go to gmail.com. Type your full email address (yourname@gmail.com) and click Next. Type your password and click Next. If Google asks for a 6-digit code, check your text messages and type the code in. Your inbox will open. Total time: about 1 minute.",
    estimatedTime: "1-2 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Signing in to Gmail is easier than it looks — follow these pictures step by step.",
    category: "Login",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your Gmail address", "your Gmail password"],
    walkthrough: [SCREEN_GMAIL_HOMEPAGE, SCREEN_EMAIL_ENTRY, SCREEN_PASSWORD_ENTRY, SCREEN_2FA, SCREEN_INBOX],
    textSteps: [
      { step: 1, title: "Open your web browser", detail: "On your computer, open Chrome, Safari, Edge, or Firefox. Any web browser works." },
      { step: 2, title: "Go to gmail.com", detail: "Click on the address bar at the top of the browser. Type gmail.com and press the Enter key on your keyboard." },
      { step: 3, title: "Type your email address", detail: "Click in the box that says 'Email or phone' and type your full Gmail address — for example, yourname@gmail.com. Then click the blue Next button." },
      { step: 4, title: "Type your password", detail: "Click in the password box and carefully type your password. Passwords are case-sensitive — capital letters matter. Click the blue Next button." },
      { step: 5, title: "Verify it's you (if asked)", detail: "Google may send a 6-digit code to your phone by text message, or send a notification asking 'Is it you?' Open your phone, find the code or tap Yes." },
      { step: 6, title: "You're in!", detail: "Your inbox will load. You'll see a list of your emails. Click any email to read it." },
    ],
    whatIfNotWork: [
      { problem: "It says 'Wrong password'", cause: "See fix below.", fix: "Click 'Forgot password?' under the password box and follow our password reset guide. Capital letters and lowercase letters are different — make sure your Caps Lock key is off." },
      { problem: "I don't see the 6-digit code text message", cause: "See fix below.", fix: "Check your phone's text messages. The code comes from Google — it's a short number. If it doesn't arrive in 1 minute, click 'Try another way' on the screen." },
      { problem: "It says my account doesn't exist", cause: "See fix below.", fix: "Check your spelling — the email address must be exactly right. If you can't remember your full email, see our guide on recovering your Gmail address." },
      { problem: "The page won't load at all", cause: "See fix below.", fix: "Try closing and reopening your web browser. Check that your internet is working by visiting another website. If it still doesn't work, restart your computer." },
    ],
    faqs: [
      { q: "What is the website to login to Gmail?", a: "The official Gmail login website is gmail.com. You can also use mail.google.com — both go to the same place. Always type the address yourself instead of clicking links from emails to avoid scam websites." },
      { q: "Why does Gmail keep asking me for a code on my phone?", a: "This is called 2-Step Verification — it's a safety feature that protects your account. Google asks for the code when you sign in from a new device or browser. It's a good thing — leave it turned on." },
      { q: "Can I stay logged in to Gmail so I don't have to sign in every time?", a: "Yes — on your own personal computer, Gmail will remember you. But never check 'Stay signed in' on a public computer like at the library. If you share your computer with family, sign out when you're done." },
      { q: "What if I have two Gmail accounts?", a: "You can be logged into both at the same time. After signing in to the first one, click your profile picture in the top-right corner and click 'Add another account'. Then sign in to the second one." },
      { q: "Why does it say 'Couldn't find your Google Account'?", a: "Google can't find an account with that email address. Common reasons: a typo in the email, you used a different email when you signed up, or you're spelling your name wrong. Try your other email addresses." },
      { q: "How do I login to Gmail on my iPhone or iPad?", a: "Open the Gmail app (download it free from the App Store if you don't have it). Tap 'Sign In' at the bottom, then enter your email and password just like on a computer." },
      { q: "How do I login to Gmail on my Android phone?", a: "Most Android phones come with Gmail already installed. Open the Gmail app, tap 'Sign in,' choose Google, and enter your email and password." },
      { q: "Is it safe to login to Gmail on a public computer?", a: "Only if you absolutely have to. Always sign out when finished by clicking your profile picture in the top-right and clicking 'Sign out'. Never check 'Stay signed in' on public computers." },
    ],
    relatedSlugs: ["gmail-forgot-password", "gmail-cant-sign-in", "gmail-two-factor", "gmail-help"],
  },

  // ─── 3. FORGOT PASSWORD ──────────────────────────────────────────
  "gmail-forgot-password": {
    slug: "gmail-forgot-password",
    primaryQuery: "i forgot my gmail password",
    alternateQueries: [
      "forgot gmail password",
      "gmail password reset",
      "how to reset gmail password",
      "i forgot my password for gmail",
      "lost gmail password",
    ],
    searchVolume: "very-high",
    difficulty: "low",
    metaTitle: "I Forgot My Gmail Password — How to Reset It (Senior Guide 2026)",
    metaDescription: "Forgot your Gmail password? Easy reset guide for seniors with big pictures. Reset in 3 minutes. Free phone help: 347-953-1531.",
    h1: "I Forgot My Gmail Password — How to Reset It",
    primaryKeywords: "forgot gmail password, reset gmail password, gmail password reset, lost gmail password",
    tldrAnswer: "To reset a forgotten Gmail password: go to gmail.com, type your email, then click 'Forgot password?' under the password box. Google will send a 6-digit code to your recovery phone or email. Type the code in, then create a new password (at least 8 characters). You'll be back in your account in about 3 minutes.",
    estimatedTime: "3-5 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Forgot your Gmail password? Don't worry — Google makes it easy to reset.",
    category: "Password",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "access to your recovery email or phone number"],
    walkthrough: [
      SCREEN_GMAIL_HOMEPAGE,
      SCREEN_EMAIL_ENTRY,
      {
        ...SCREEN_PASSWORD_ENTRY,
        title: "Step 3 — Click 'Forgot password?'",
        description: "Don't type a password. Instead, click the small 'Forgot password?' link under the password box.",
        arrowTarget: "forgot-link",
        arrowText: "Click here →",
        whatHappens: "Google will start the password reset process. The next screen asks how you want to verify it's really you.",
      },
      {
        id: "recovery-verify",
        title: "Step 4 — Get your verification code",
        brandHeader: "Google",
        description: "Google will send a code to your recovery phone number or backup email.",
        body: { kind: "google-recovery-verify", method: "phone" },
        arrowTarget: "code-input",
        arrowText: "Type the 6-digit code",
        whatHappens: "Check your text messages or your other email account for the 6-digit number, then type it here.",
      },
      {
        id: "new-password",
        title: "Step 5 — Create a new password",
        brandHeader: "Google",
        description: "Now you'll create a brand new password. Pick something you can remember.",
        body: { kind: "google-new-password" },
        arrowTarget: "new-password-input",
        arrowText: "Type a new password",
        whatHappens: "Make it at least 8 characters with a mix of letters and numbers. Write it down somewhere safe.",
      },
      SCREEN_INBOX,
    ],
    textSteps: [
      { step: 1, title: "Go to gmail.com", detail: "Open your web browser and go to gmail.com." },
      { step: 2, title: "Type your email address", detail: "Type your full Gmail address (yourname@gmail.com) and click Next." },
      { step: 3, title: "Click 'Forgot password?'", detail: "Don't type a password. Instead, click the small blue text that says 'Forgot password?' below the password box." },
      { step: 4, title: "Verify your identity", detail: "Google will offer one or more ways to verify it's you: a code by text message to your phone, a code by email to your backup email, or your last password. Pick the one that works for you." },
      { step: 5, title: "Type the 6-digit code", detail: "Check the place Google sent the code (your phone or backup email) and type the 6-digit code into the box. Click Next." },
      { step: 6, title: "Create a new password", detail: "Type a new password — at least 8 characters with letters and numbers. Type it again to confirm. Click Save Password." },
      { step: 7, title: "You're back in!", detail: "You'll be signed in automatically. Write your new password down somewhere safe so you don't forget it again." },
    ],
    whatIfNotWork: [
      { problem: "I don't have my recovery phone anymore", cause: "See fix below.", fix: "Click 'Try another way' on each screen. Google will offer alternatives like your backup email or security questions. If nothing works, see our guide 'How to Recover a Gmail Account Without Phone or Email'." },
      { problem: "I'm not getting the text message code", cause: "See fix below.", fix: "Wait 2 minutes — sometimes texts are slow. Check that your phone has signal. If still nothing, click 'Try another way' to use a different recovery method." },
      { problem: "Google says it can't verify me", cause: "See fix below.", fix: "This happens if you're trying from a new computer or location. Try again from a device or location where you've signed in before — like your home computer on home WiFi." },
      { problem: "I never set up a recovery phone or email", cause: "See fix below.", fix: "You'll need to answer Google's identity questions. Be patient and answer as honestly as possible. If recovery fails, call us at 347-953-1531 — we can help you decide whether to recover or create a new account." },
    ],
    faqs: [
      { q: "How long does it take to reset a Gmail password?", a: "About 3 to 5 minutes if you have access to your recovery phone or email. Without those, it can take up to 24 hours because Google has extra security checks." },
      { q: "Will I lose my emails if I reset my password?", a: "No. Resetting your password only changes how you sign in — all your emails, contacts, and photos stay exactly where they are. Nothing is lost." },
      { q: "What makes a strong Gmail password?", a: "At least 12 characters, a mix of capital letters, lowercase letters, numbers, and symbols. Don't use your name, birthday, or 'password' — those are easy for hackers to guess. Try a phrase like 'BlueCoffee$Morning7' that you can remember." },
      { q: "Can I use my old password again?", a: "No. Google won't let you re-use a password you've used before on the same account. You must pick a brand new one." },
      { q: "What if I keep getting 'incorrect password' but I'm sure it's right?", a: "Check your Caps Lock key — passwords are case-sensitive. Also check the keyboard language (some computers switch to international keyboards by accident). If it's still wrong, just reset it using these steps." },
      { q: "Will I need to sign in again on my phone after resetting my password?", a: "Yes. After you change your password, all your other devices will sign you out. Just open Gmail on your phone and type the new password to sign back in." },
      { q: "Is there a phone number to call Google for password help?", a: "No. Google does not offer phone support for free accounts. Anyone calling you claiming to be 'Google Password Support' is running a scam — hang up. For free, real phone help with Gmail, call Trini System at 347-953-1531." },
    ],
    relatedSlugs: ["gmail-login", "gmail-recover-account", "gmail-cant-sign-in", "gmail-forgot-username"],
  },

  // ─── 4. RECOVER ACCOUNT ──────────────────────────────────────────
  "gmail-recover-account": {
    slug: "gmail-recover-account",
    primaryQuery: "how to recover my gmail account",
    alternateQueries: [
      "gmail account recovery",
      "recover my gmail",
      "lost my gmail account",
      "get my gmail back",
      "gmail account locked help",
    ],
    searchVolume: "very-high",
    difficulty: "medium",
    metaTitle: "How to Recover Your Gmail Account — Senior-Friendly Guide (2026)",
    metaDescription: "Lost access to your Gmail? Step-by-step recovery guide for seniors. Big pictures, every option explained. Free phone help: 347-953-1531.",
    h1: "How to Recover Your Gmail Account",
    primaryKeywords: "gmail account recovery, recover gmail, lost gmail account, get gmail back",
    tldrAnswer: "To recover your Gmail account: go to accounts.google.com/signin/recovery, type your email, and click Next. Google will offer ways to prove it's you — a code by text, a backup email, your last password, or security questions. Answer what you can. Recovery works in about 5 minutes if you have your recovery info, longer if you don't.",
    estimatedTime: "5-30 minutes",
    difficultyLabel: "Medium",
    heroIntro: "Can't get into your Gmail at all? Here's how to get it back, step by step.",
    category: "Account Recovery",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your recovery phone number or email if possible"],
    walkthrough: [
      {
        id: "recovery-page",
        title: "Step 1 — Open the Account Recovery page",
        brandHeader: "Google",
        description: "Type accounts.google.com/signin/recovery into your browser and press Enter.",
        body: { kind: "google-recovery-start" },
        arrowTarget: "email-input",
        arrowText: "Type your Gmail address here",
        whatHappens: "Type your full Gmail email address — even if you can't remember the password — and click Next.",
      },
      {
        id: "recovery-options",
        title: "Step 2 — Pick how to verify it's you",
        brandHeader: "Google",
        description: "Google shows the recovery options available for your account.",
        body: { kind: "google-recovery-verify", method: "email" },
        arrowTarget: "code-input",
        arrowText: "Type the code Google sent",
        whatHappens: "Pick the option that works for you — a code by text, code by email, or last password. Get the code and type it in.",
      },
      {
        id: "new-password",
        title: "Step 3 — Set a new password",
        brandHeader: "Google",
        description: "Once Google confirms it's you, create a brand new password.",
        body: { kind: "google-new-password" },
        arrowTarget: "new-password-input",
        arrowText: "Type a new password",
        whatHappens: "Pick something at least 8 characters long. Write it down on paper and keep it in a safe place.",
      },
      SCREEN_INBOX,
    ],
    textSteps: [
      { step: 1, title: "Go to the recovery page", detail: "Open your browser and type: accounts.google.com/signin/recovery — or just go to gmail.com and click 'Forgot password?'" },
      { step: 2, title: "Type your email address", detail: "Even if you've forgotten everything else, type the email address you're trying to recover. Click Next." },
      { step: 3, title: "Try entering your last remembered password", detail: "Even an old one helps. If you don't remember any, click 'Try another way'." },
      { step: 4, title: "Use your recovery phone or email", detail: "If you have one set up, Google will send a 6-digit code. Type the code in." },
      { step: 5, title: "If those don't work, answer Google's questions", detail: "Google may ask when you created the account, recent emails you've received, or security questions. Answer as best you can — be patient and don't rush." },
      { step: 6, title: "Create a new password", detail: "Once Google confirms it's you, set a new password. Make it strong (at least 12 characters) and write it down somewhere safe." },
      { step: 7, title: "Update your recovery options", detail: "After getting back in, go to Google Account → Security and add a recovery phone and email so this doesn't happen again." },
    ],
    whatIfNotWork: [
      { problem: "Google says 'We couldn't verify it's you'", cause: "See fix below.", fix: "Try recovery from a familiar device — a computer or phone you've signed in from before — and on familiar WiFi like your home network. Google trusts these and is more likely to let you in." },
      { problem: "I've tried too many times and got locked out", cause: "See fix below.", fix: "Wait 24 hours and try again. Multiple failed attempts trigger a temporary security lock. Don't keep trying — it makes it worse." },
      { problem: "I don't remember my old password or have any recovery info", cause: "See fix below.", fix: "It's still possible to recover but takes longer. Google will ask detailed questions about your account history. If recovery fails after multiple attempts, you may need to create a new Gmail account. Call us at 347-953-1531 for help deciding." },
      { problem: "I think someone hacked my account", cause: "See fix below.", fix: "Use the same recovery process to take it back, then change your password immediately. After that, go to Security settings and turn on 2-Step Verification, and check 'Recent security activity' to see what was changed." },
    ],
    faqs: [
      { q: "How long do I have to recover a Gmail account?", a: "If your account is just locked or you forgot the password — there's no time limit. But if Google deletes the account due to long inactivity (about 2 years), recovery becomes much harder or impossible. Don't wait." },
      { q: "Can I recover a hacked Gmail account?", a: "Yes. Use the recovery process above. After you get back in, change your password right away, turn on 2-Step Verification, and review 'Recent security activity' under your Google Account → Security." },
      { q: "Do I lose my emails if I recover the account?", a: "No. Recovery just gives you back access — your emails, contacts, photos, and Drive files are all still there." },
      { q: "What if Google asks for old passwords I never used?", a: "It's not a trick — Google sometimes asks about passwords from years ago. Type the closest thing you remember. If you really don't know, click 'Try another way'." },
      { q: "Can a family member recover my Gmail for me?", a: "Only if you give them your recovery information. Google won't talk to family members directly because of privacy rules. The best plan is to set up recovery options now while you have access." },
      { q: "Is there a Gmail recovery phone number to call?", a: "No. Google does not offer phone-based account recovery for free accounts. Anyone claiming to be 'Google Account Recovery Support' on the phone is a scammer. For real, free phone help with the recovery steps, call Trini System at 347-953-1531." },
      { q: "What happens if I can never recover my account?", a: "If recovery fails completely, you can create a new Gmail account. You'll lose access to old emails on that account, but you can tell important contacts your new address. Set up recovery info on the new one immediately." },
    ],
    relatedSlugs: ["gmail-forgot-password", "gmail-cant-sign-in", "gmail-forgot-username", "gmail-help"],
  },

  // ─── 5. CAN'T SIGN IN ─────────────────────────────────────────────
  "gmail-cant-sign-in": {
    slug: "gmail-cant-sign-in",
    primaryQuery: "i can't sign in to my gmail",
    alternateQueries: [
      "cant sign in to gmail",
      "gmail wont let me sign in",
      "gmail not letting me login",
      "locked out of gmail",
      "gmail sign in not working",
    ],
    searchVolume: "high",
    difficulty: "medium",
    metaTitle: "Can't Sign In to Gmail? Easy Fixes for Seniors (2026)",
    metaDescription: "Locked out of Gmail? Quick fixes for the most common sign-in problems. Big pictures, plain English. Free phone help: 347-953-1531.",
    h1: "Can't Sign In to Gmail? Here's How to Fix It",
    primaryKeywords: "cant sign in gmail, gmail wont login, locked out gmail, gmail sign in problem",
    tldrAnswer: "If you can't sign in to Gmail, try these in order: (1) Check your Caps Lock key — passwords are case-sensitive. (2) Reset your password using 'Forgot password?'. (3) Try a different web browser. (4) Make sure you're on gmail.com — not a fake site. (5) If you see 'Account temporarily locked,' wait 24 hours and try again from your home computer.",
    estimatedTime: "5-10 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Locked out of Gmail? Here are the most common causes and how to fix each one.",
    category: "Login",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "internet connection"],
    walkthrough: [SCREEN_GMAIL_HOMEPAGE, SCREEN_EMAIL_ENTRY, SCREEN_PASSWORD_ENTRY, SCREEN_INBOX],
    textSteps: [
      { step: 1, title: "Check your Caps Lock key", detail: "Look at your keyboard — if 'Caps Lock' has a light on, press it once to turn off. Passwords are case-sensitive, so 'PASSWORD' is different from 'password'." },
      { step: 2, title: "Carefully retype your email and password", detail: "Type slowly. Don't paste — typos in copy-paste are a common cause of sign-in failures." },
      { step: 3, title: "Try the 'Forgot password?' link", detail: "If your password really doesn't work, click 'Forgot password?' under the password box and follow our password reset guide." },
      { step: 4, title: "Try a different web browser", detail: "If you usually use Chrome, try Edge or Safari. Sometimes a browser glitch blocks sign-in. Just open another browser and go to gmail.com." },
      { step: 5, title: "Make sure you're on the real Gmail", detail: "The address bar should say gmail.com or accounts.google.com. If it says anything else, close it — that's a scam site trying to steal your password." },
      { step: 6, title: "Wait if Google says you're locked", detail: "If Google says 'Account temporarily locked,' it's a security pause. Wait 24 hours, then try again from your home computer on home WiFi." },
    ],
    whatIfNotWork: [
      { problem: "It says 'Couldn't find your Google account'", cause: "See fix below.", fix: "Your email is wrong. Check the spelling carefully. Common mistakes: missing letters, wrong domain (gmail.com not gmail.co.uk), or using your name instead of your full email address." },
      { problem: "It says 'Wrong password' even though I typed it right", cause: "See fix below.", fix: "Reset the password using 'Forgot password?' — sometimes accounts get auto-changed by security alerts. See our forgot password guide for steps." },
      { problem: "Sign-in works but kicks me right back out", cause: "See fix below.", fix: "This is usually a browser cookie problem. Close all browser windows, reopen, and try gmail.com again. If that doesn't work, restart your computer." },
      { problem: "I get a 6-digit code prompt but the code doesn't work", cause: "See fix below.", fix: "Codes expire after 5 minutes. Click 'Resend' for a new code. If still no luck, click 'Try another way'." },
    ],
    faqs: [
      { q: "Why does Gmail keep saying my password is wrong?", a: "Most common reasons: Caps Lock is on, the keyboard is set to a different language, or the password was actually changed (e.g. by a security alert). Reset it using 'Forgot password?' to be safe." },
      { q: "What does 'Account temporarily locked' mean?", a: "Google noticed suspicious sign-in activity — usually too many wrong passwords or an attempt from a strange location. Wait 24 hours and try again from a familiar device on familiar WiFi." },
      { q: "Why does Gmail keep asking me to sign in over and over?", a: "Your browser is probably blocking cookies, or you have a browser extension blocking Google. Try a different browser. If that works, the original browser has a cookie problem you can fix in its settings." },
      { q: "Why won't Gmail open at all?", a: "Either your internet is down, gmail.com is having a problem (check downdetector.com), or your browser is too old. Try restarting your router and your computer." },
      { q: "Can a virus stop me from signing in to Gmail?", a: "Yes — some viruses redirect Google to fake sites or steal passwords. If sign-in stops working suddenly along with other strange computer behavior, run a virus scan. Trini System can help — call 347-953-1531." },
      { q: "Should I worry if I see 'Sign-in attempt blocked'?", a: "No — this is Google protecting you. It usually means an old app is trying to use your password. Follow Google's instructions to allow the app, or just ignore it if you don't recognize it." },
    ],
    relatedSlugs: ["gmail-login", "gmail-forgot-password", "gmail-recover-account", "gmail-two-factor"],
  },

  // ─── 6. FORGOT USERNAME / EMAIL ──────────────────────────────────
  "gmail-forgot-username": {
    slug: "gmail-forgot-username",
    primaryQuery: "i forgot my gmail email address",
    alternateQueries: [
      "forgot gmail username",
      "what is my gmail address",
      "find my gmail email",
      "i don't remember my gmail",
      "forgot my email address",
    ],
    searchVolume: "high",
    difficulty: "low",
    metaTitle: "I Forgot My Gmail Email Address — How to Find It (Senior Guide)",
    metaDescription: "Forgot your Gmail address? Find your email in 2 minutes using a phone number or backup email. Step-by-step for seniors. Free help: 347-953-1531.",
    h1: "I Forgot My Gmail Email Address — How to Find It",
    primaryKeywords: "forgot gmail username, find my gmail address, what is my gmail email",
    tldrAnswer: "To find your Gmail address: go to accounts.google.com/signin/usernamerecovery, type your recovery phone number or backup email, and click Next. Type your full first and last name (the one on the account). Google will send you a list of Gmail addresses linked to that phone or email. Total time: about 2 minutes.",
    estimatedTime: "2-3 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Can't remember your Gmail address? These steps help you find it quickly.",
    category: "Account",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your recovery phone number or email"],
    walkthrough: [
      {
        id: "username-recovery",
        title: "Step 1 — Open the Username Recovery page",
        brandHeader: "Google",
        description: "Go to accounts.google.com/signin/usernamerecovery in your browser.",
        body: { kind: "google-recovery-start" },
        arrowTarget: "email-input",
        arrowText: "Type your phone or backup email",
        whatHappens: "Type the phone number or backup email you used when you set up Gmail.",
      },
      {
        id: "name-entry",
        title: "Step 2 — Type your first and last name",
        brandHeader: "Google",
        description: "Type the same name you used when creating your Gmail account.",
        body: { kind: "google-recovery-verify", method: "phone" },
        arrowTarget: "code-input",
        arrowText: "Type the verification code",
        whatHappens: "Google will send a code to your phone to confirm it's really you.",
      },
      {
        id: "username-list",
        title: "Step 3 — Pick your email from the list",
        brandHeader: "Google",
        description: "Google shows you the Gmail addresses linked to your phone or backup email.",
        body: { kind: "google-signin", emailValue: "yourname@gmail.com" },
        arrowTarget: "email-input",
        arrowText: "Click your email address",
        whatHappens: "Click the address that's yours, then sign in normally with your password.",
      },
    ],
    textSteps: [
      { step: 1, title: "Go to the username recovery page", detail: "Open your browser and type: accounts.google.com/signin/usernamerecovery — or go to gmail.com, click Sign In, then 'Forgot email?'" },
      { step: 2, title: "Enter your recovery phone or email", detail: "Type the phone number or backup email address you set up when you created the Gmail account. Click Next." },
      { step: 3, title: "Type your full first and last name", detail: "Use the exact name you registered with — including middle initial if you used one." },
      { step: 4, title: "Get the verification code", detail: "Google sends a 6-digit code to your phone or backup email. Type the code in." },
      { step: 5, title: "Pick your Gmail from the list", detail: "Google shows all Gmail addresses tied to that phone or email. Click yours." },
      { step: 6, title: "Sign in with your password", detail: "Now that you have your Gmail address, sign in normally. If you've also forgotten the password, see our forgot password guide." },
    ],
    whatIfNotWork: [
      { problem: "I don't remember my recovery phone or backup email", cause: "See fix below.", fix: "Without one of these, finding your Gmail address gets very hard. Try common phone numbers you've owned. If nothing works, you may need to create a new Gmail and tell contacts the new address." },
      { problem: "Google says 'No accounts found'", cause: "See fix below.", fix: "The phone or email you typed isn't linked to any Gmail account. Try a different phone number or email — even old ones from years ago." },
      { problem: "I see multiple Gmails in the list and don't know which is mine", cause: "See fix below.", fix: "Look at the addresses carefully — yours probably has your name in it. If you still can't tell, try signing in to each one (you only need the password). The one that works is yours." },
    ],
    faqs: [
      { q: "Can I find my Gmail address using just my name?", a: "No. Google requires a phone number or backup email to look up usernames. This is for privacy — otherwise anyone could look up your email by name." },
      { q: "Is there a way to see all Gmail addresses I've ever made?", a: "Only the ones linked to your current recovery phone or email. There's no 'master list' of every account you've ever created." },
      { q: "What if my Gmail uses an old phone number I no longer have?", a: "You'll have a hard time. You may need to use other recovery methods (security questions, backup email) or accept that the account is lost." },
      { q: "Can scammers find my Gmail using my phone number?", a: "No. Google requires verification codes sent to YOUR phone — scammers don't have access to your phone messages, so they can't complete the recovery process." },
      { q: "What's the difference between Gmail username and Gmail email?", a: "They're the same thing. Your Gmail username is the part before @gmail.com — like 'sarahsmith1948'. Your full Gmail email is sarahsmith1948@gmail.com." },
    ],
    relatedSlugs: ["gmail-login", "gmail-forgot-password", "gmail-recover-account"],
  },

  // ─── 7. TWO-FACTOR / VERIFICATION CODE ───────────────────────────
  "gmail-two-factor": {
    slug: "gmail-two-factor",
    primaryQuery: "gmail verification code not working",
    alternateQueries: [
      "gmail 2 step verification problem",
      "gmail wont send code",
      "gmail verification code not coming",
      "how to get gmail code",
      "gmail 2fa help",
    ],
    searchVolume: "high",
    difficulty: "medium",
    metaTitle: "Gmail Verification Code Not Working — How to Fix (Senior Guide)",
    metaDescription: "Not getting your Gmail 6-digit code? Easy fixes for seniors. Try another method, fix your phone, get a backup code. Free help: 347-953-1531.",
    h1: "Gmail Verification Code Not Working — How to Fix It",
    primaryKeywords: "gmail verification code, gmail 2 step verification, gmail 2fa not working, gmail code not coming",
    tldrAnswer: "If your Gmail verification code isn't working: (1) Wait 1-2 minutes — texts can be slow. (2) Click 'Resend code'. (3) Click 'Try another way' to get the code by phone call or backup email instead. (4) Check that you typed the code correctly — they expire in 5 minutes. (5) Make sure your phone has signal.",
    estimatedTime: "3-5 minutes",
    difficultyLabel: "Medium",
    heroIntro: "2-Step Verification keeps hackers out of your Gmail — here's how to set it up safely.",
    category: "Security",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer", "your mobile phone for verification codes"],
    walkthrough: [
      SCREEN_2FA,
      {
        ...SCREEN_2FA,
        title: "Try another verification method",
        description: "If the text isn't coming, click 'Try another way' to get a phone call or use backup codes.",
        arrowTarget: "code-input",
        arrowText: "Click 'Try another way'",
        whatHappens: "Google will offer different options: a phone call instead of text, your backup email, or backup codes you saved earlier.",
      },
      SCREEN_INBOX,
    ],
    textSteps: [
      { step: 1, title: "Wait a full 2 minutes", detail: "Text messages can be delayed, especially in rural areas. Don't keep clicking 'Resend' — wait 2 minutes first." },
      { step: 2, title: "Check your text messages app", detail: "Open the messaging app on your phone. Look for a recent text from a 5-digit number with a 6-digit code." },
      { step: 3, title: "Click 'Resend code'", detail: "If after 2 minutes there's still no code, click 'Resend code' on the Gmail screen." },
      { step: 4, title: "Try 'Try another way'", detail: "Click this link on the verification screen. Google will offer alternatives like a voice call to your phone, code by email, or your backup codes." },
      { step: 5, title: "Check that the code isn't expired", detail: "Codes only work for 5 minutes after Google sends them. If you waited too long, request a fresh one." },
      { step: 6, title: "Type the code carefully", detail: "Six digits, no spaces. The numbers '0' and 'O' are different — codes only use digits 0-9." },
    ],
    whatIfNotWork: [
      { problem: "I changed phones and don't have the old number", cause: "See fix below.", fix: "Click 'Try another way' on the verification screen. Use your backup email instead. If you don't have one set up, you'll need to use account recovery — see our recover Gmail guide." },
      { problem: "I don't see any 'Try another way' option", cause: "See fix below.", fix: "Scroll down on the verification page — it's sometimes a small link. If it's not there, your account only has one verification method set up. You'll need account recovery." },
      { problem: "Where do I find backup codes?", cause: "See fix below.", fix: "If you saved backup codes when you set up 2-Step Verification, look on paper — they're usually 8-digit codes. If you didn't save any, use 'Try another way' for other options." },
      { problem: "The code arrived but it says 'Code is wrong'", cause: "See fix below.", fix: "Make sure you didn't include any spaces or extra digits. Codes are exactly 6 digits. If still wrong, request a fresh code — old ones expire." },
    ],
    faqs: [
      { q: "What is 2-Step Verification?", a: "It's an extra safety check after your password. When you sign in, Google sends a 6-digit code to your phone. You type the code to prove it's really you. Even if a hacker has your password, they can't get in without your phone." },
      { q: "Should I turn off 2-Step Verification?", a: "No — it's the single best protection your Gmail has against hackers. Don't turn it off. If it's annoying, set up 'Trusted devices' so your home computer doesn't ask every time." },
      { q: "Can I use Gmail without 2-Step Verification?", a: "Yes — you can turn it off in Google Account → Security. But please don't. It's the difference between an account that gets hacked and one that doesn't." },
      { q: "What's a passkey vs. a verification code?", a: "A passkey is newer — it uses your phone's fingerprint or Face ID instead of typing a code. Most seniors prefer codes because they're familiar. Use whichever is easier for you." },
      { q: "Why does Google ask for a code every time on my computer?", a: "Click the box that says 'Don't ask again on this computer' when you verify. Then it'll only ask once a month or when you sign in from a new device." },
      { q: "Are there scams where someone calls asking for my Google code?", a: "Yes — and they're very common. Google never calls you and asks for your verification code. Anyone who does is a scammer. Hang up immediately." },
    ],
    relatedSlugs: ["gmail-login", "gmail-cant-sign-in", "gmail-scam-emails"],
  },

  // ─── 8. SEND EMAIL ───────────────────────────────────────────────
  "gmail-send-email": {
    slug: "gmail-send-email",
    primaryQuery: "how to send an email in gmail",
    alternateQueries: [
      "how to write email gmail",
      "compose email gmail",
      "send first email gmail",
      "how to send a message in gmail",
    ],
    searchVolume: "high",
    difficulty: "low",
    metaTitle: "How to Send an Email in Gmail — Easy Steps for Seniors (2026)",
    metaDescription: "Step-by-step guide to writing and sending email in Gmail. Big pictures, plain English. Includes attaching photos. Free help: 347-953-1531.",
    h1: "How to Send an Email in Gmail",
    primaryKeywords: "send email gmail, compose email gmail, write email gmail, how to email someone gmail",
    tldrAnswer: "To send an email in Gmail: click the red 'Compose' button on the left. Type the recipient's email in the 'To' box. Type a short subject in the 'Subject' line. Type your message in the big white box. Click the blue 'Send' button at the bottom. Your email is sent instantly.",
    estimatedTime: "2-3 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Sending an email in Gmail is simple — follow these steps and you'll be a pro.",
    category: "Email Basics",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your Gmail account open"],
    walkthrough: [
      SCREEN_INBOX,
      {
        id: "compose",
        title: "Step 2 — The Compose window opens",
        brandHeader: "Gmail",
        description: "A new email form appears in the bottom-right corner.",
        body: { kind: "gmail-compose" },
        arrowTarget: "to-input",
        arrowText: "Type the recipient's email",
        whatHappens: "Fill in the To, Subject, and message body — then click the blue Send button.",
      },
    ],
    textSteps: [
      { step: 1, title: "Click the red 'Compose' button", detail: "It's the big red or blue button in the top-left corner of Gmail. Click it." },
      { step: 2, title: "Type the recipient's email", detail: "In the 'To' box, type the email address of the person you want to email. Like grandkid@gmail.com." },
      { step: 3, title: "Add a subject", detail: "In the 'Subject' line, type a short description of your email — like 'Birthday wishes' or 'Doctor appointment'." },
      { step: 4, title: "Write your message", detail: "Click in the big white box and type whatever you want to say. Don't worry about being formal — just write like you'd talk." },
      { step: 5, title: "Add a photo (optional)", detail: "To attach a photo, click the small paperclip icon at the bottom of the compose window. Find your photo and click Open." },
      { step: 6, title: "Click Send", detail: "When you're done, click the blue 'Send' button at the bottom-left. Your email is sent right away." },
    ],
    whatIfNotWork: [
      { problem: "The Send button is grey and won't click", cause: "See fix below.", fix: "You probably haven't typed an email address in the 'To' box. Click 'To' and type at least one email — Send will turn blue." },
      { problem: "It says 'Address not found'", cause: "See fix below.", fix: "The recipient's email is misspelled or doesn't exist. Double-check the spelling. Common mistakes: missing letters, wrong domain (gmail.com vs yahoo.com)." },
      { problem: "My photo is too big to send", cause: "See fix below.", fix: "Gmail allows up to 25 MB. For big videos or many photos, Gmail will automatically offer to send them via Google Drive — just click 'OK'." },
      { problem: "I sent it but want to take it back", cause: "See fix below.", fix: "Right after clicking Send, look at the bottom-left for a small black bar that says 'Undo'. You have about 5 seconds to click it. After that, the email is gone for good." },
    ],
    faqs: [
      { q: "Is sending email free in Gmail?", a: "Yes. Sending and receiving emails in Gmail is completely free — no charges, no per-message fees, no limits on how many emails you can send to friends and family." },
      { q: "How many people can I email at once?", a: "Up to 500 in a single email. Use the 'To' box for one or two recipients. For bigger lists, use 'Bcc' so each person can't see everyone else's email." },
      { q: "Can I send a photo from my phone with my email?", a: "Yes. On the Gmail app, tap the paperclip when composing. Pick 'Attach file' and choose photos from your phone's gallery." },
      { q: "What's the difference between To, Cc, and Bcc?", a: "To = the main person you're emailing. Cc = others who should see it (everyone sees who got it). Bcc = others who should see it but their address is hidden from everyone else." },
      { q: "Can I save a draft and finish later?", a: "Yes — Gmail saves your draft automatically. Close the compose window and your email goes into the 'Drafts' folder on the left. Click Drafts to find and finish it." },
      { q: "How do I know if my email was delivered?", a: "Most emails are delivered in seconds. If there's a problem, Gmail sends you a 'Delivery failed' message within minutes. No bad message = it went through." },
    ],
    relatedSlugs: ["gmail-login", "gmail-attach-photo", "gmail-help"],
  },

  // ─── 9. ATTACH PHOTO ─────────────────────────────────────────────
  "gmail-attach-photo": {
    slug: "gmail-attach-photo",
    primaryQuery: "how to attach a photo in gmail",
    alternateQueries: [
      "how to send a picture in gmail",
      "attach photo gmail",
      "send photo email gmail",
      "how to email a picture",
    ],
    searchVolume: "high",
    difficulty: "low",
    metaTitle: "How to Attach a Photo in Gmail — Senior-Friendly Guide (2026)",
    metaDescription: "Easy step-by-step for attaching photos to Gmail emails. Big pictures, plain English. Works on computer and phone. Free help: 347-953-1531.",
    h1: "How to Attach a Photo to a Gmail Email",
    primaryKeywords: "attach photo gmail, send picture gmail, email photo gmail",
    tldrAnswer: "To attach a photo to a Gmail email: click 'Compose' to start a new email. At the bottom of the compose window, click the small paperclip icon. A window opens — find your photo on your computer or phone and click 'Open'. Wait for it to upload (usually a few seconds), then click Send.",
    estimatedTime: "2 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Want to send a photo by email? Here's exactly how to attach one in Gmail.",
    category: "Email Basics",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your Gmail account open", "a photo saved on your device"],
    walkthrough: [
      SCREEN_INBOX,
      {
        id: "compose-with-attach",
        title: "Step 2 — Click the paperclip icon",
        brandHeader: "Gmail",
        description: "After you click Compose, look for the paperclip icon at the bottom of the new-email window.",
        body: { kind: "gmail-compose" },
        arrowTarget: "attach-icon",
        arrowText: "Click the paperclip",
        whatHappens: "A window opens letting you pick a photo from your computer or phone.",
      },
    ],
    textSteps: [
      { step: 1, title: "Click Compose", detail: "Click the red 'Compose' button at the top-left to start a new email." },
      { step: 2, title: "Fill in the email basics", detail: "Type the recipient's email in 'To' and a short subject in 'Subject'." },
      { step: 3, title: "Click the paperclip icon", detail: "At the bottom of the compose window, find the small paperclip icon. Click it." },
      { step: 4, title: "Find your photo", detail: "A window opens. Browse to where your photo is — on a computer, that's usually 'Pictures'. On a phone, it's your photo gallery." },
      { step: 5, title: "Click on the photo and click Open", detail: "The photo will upload — you'll see a progress bar. Wait for it to finish (usually 5-10 seconds)." },
      { step: 6, title: "Type a message and click Send", detail: "Add a short note in the email body, then click the blue Send button." },
    ],
    whatIfNotWork: [
      { problem: "My photo is too big — it says 'Attachment too large'", cause: "See fix below.", fix: "Gmail allows up to 25 MB per email. For larger files, Gmail will offer to send the photo via Google Drive — just click 'Yes' and the recipient gets a link to download." },
      { problem: "I don't see a paperclip icon", cause: "See fix below.", fix: "If you're using Gmail in 'basic HTML' mode (older browsers), click 'Standard view' at the top. Or update your browser to the latest version." },
      { problem: "The photo won't upload — it just spins", cause: "See fix below.", fix: "Your internet may be slow. Wait 1 minute, then try again. If still stuck, close the compose window (it saves as a draft), reopen, and try again." },
      { problem: "I want to send several photos", cause: "See fix below.", fix: "Click the paperclip icon, hold the Ctrl key (or Command key on a Mac), and click each photo one by one. They all attach together." },
    ],
    faqs: [
      { q: "How big a photo can I send in Gmail?", a: "Up to 25 MB total in one email. Most phone photos are 2-5 MB so you can usually send 5-10 in one email." },
      { q: "Can I send a photo from my phone to a Gmail account?", a: "Yes. On the Gmail app, tap Compose, tap the paperclip icon, choose 'Attach file', and pick photos from your gallery." },
      { q: "Will the recipient be able to see my photo?", a: "Yes — anyone with email can see attached photos. They just click the photo in the email to view or download." },
      { q: "Can the photo be too small to send?", a: "No — there's no minimum size. Even a tiny image works. The 25 MB limit is the maximum, not minimum." },
      { q: "Why does my photo show up sideways for the person who got it?", a: "Some phones save photo orientation in a way email doesn't read. Before sending, open the photo on your computer and rotate it to the correct orientation, then save and re-attach." },
    ],
    relatedSlugs: ["gmail-send-email", "gmail-storage-full", "gmail-help"],
  },

  // ─── 10. SPAM FILTER ──────────────────────────────────────────────
  "gmail-spam-filter": {
    slug: "gmail-spam-filter",
    primaryQuery: "how to block spam in gmail",
    alternateQueries: [
      "stop junk email gmail",
      "block sender gmail",
      "gmail spam filter",
      "how to stop spam emails",
    ],
    searchVolume: "high",
    difficulty: "low",
    metaTitle: "How to Block Spam in Gmail — Senior Guide to Stopping Junk Mail",
    metaDescription: "Easy guide to blocking spam in Gmail. Step-by-step for seniors. Stop junk emails, block senders, set up filters. Free help: 347-953-1531.",
    h1: "How to Block Spam and Junk Email in Gmail",
    primaryKeywords: "block spam gmail, stop junk email gmail, block sender gmail",
    tldrAnswer: "To block spam in Gmail: open the unwanted email. Click the three vertical dots in the top-right of the email. Click 'Block [sender name]'. Future emails from that sender will go straight to your Spam folder. To report it as spam, click the 'Report spam' button (it has an exclamation mark icon) instead.",
    estimatedTime: "1 minute per sender",
    difficultyLabel: "Easy",
    heroIntro: "Tired of junk mail cluttering your inbox? Gmail can filter it automatically.",
    category: "Inbox Management",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your Gmail account open"],
    walkthrough: [
      SCREEN_INBOX,
      {
        id: "spam-folder",
        title: "Block a sender from spam",
        brandHeader: "Gmail",
        description: "Open any email you want to block, click the three dots, and choose Block.",
        body: { kind: "gmail-spam-folder" },
        arrowTarget: "block-button",
        arrowText: "Click 'Block sender'",
        whatHappens: "All future emails from this sender go straight to spam — you'll never see them.",
      },
    ],
    textSteps: [
      { step: 1, title: "Open the unwanted email", detail: "Click on the email in your inbox to open it." },
      { step: 2, title: "Click the three vertical dots", detail: "In the top-right of the open email (next to the reply arrow), click the three small dots." },
      { step: 3, title: "Click 'Block [sender name]'", detail: "A menu appears. Click the line that says 'Block' followed by the sender's name." },
      { step: 4, title: "Click 'Block' to confirm", detail: "Gmail asks if you're sure — click Block. From now on, emails from this address skip your inbox and go to Spam." },
      { step: 5, title: "For real spam, click 'Report spam'", detail: "Instead of Block, you can click the exclamation-mark icon at the top of the open email. This tells Google the email is spam and helps protect other people too." },
    ],
    whatIfNotWork: [
      { problem: "Spam keeps coming from different addresses", cause: "See fix below.", fix: "Real spammers change addresses. Use 'Report spam' instead of 'Block' — Google then blocks similar emails automatically." },
      { problem: "I accidentally blocked someone I want to hear from", cause: "See fix below.", fix: "Open Gmail Settings (gear icon) → 'See all settings' → 'Filters and Blocked Addresses'. Find the address and click 'unblock'." },
      { problem: "The Block option isn't there", cause: "See fix below.", fix: "You're probably using the basic Gmail view. Click 'Standard view' at the bottom of the screen, then try again." },
      { problem: "Important emails are going to spam", cause: "See fix below.", fix: "Open the Spam folder (left side), find the email, and click 'Not spam' at the top. Future emails from that sender will go to your inbox." },
    ],
    faqs: [
      { q: "What's the difference between Block and Report Spam?", a: "Block stops emails from one specific sender. Report Spam tells Google an email is junk so it can block similar emails from many senders. For real spam, use Report Spam — it helps everyone." },
      { q: "How does Gmail decide what's spam?", a: "Google uses smart filters that look at the email's words, sender, and how other people have marked similar emails. Most spam never reaches your inbox at all — it goes straight to Spam folder." },
      { q: "Can I unsubscribe from a sender instead?", a: "Yes — and it's better for legitimate newsletters. Open the email and look for an 'Unsubscribe' link near the top. Click it. The sender removes you from their list." },
      { q: "Will the blocked sender know I blocked them?", a: "No. Gmail doesn't tell them. Their emails just silently go to your Spam folder where you'll never see them." },
      { q: "How do I empty my Spam folder?", a: "Click 'Spam' on the left side of Gmail. At the top, click 'Delete all spam messages now'. Your spam is permanently deleted. Gmail also auto-deletes spam after 30 days." },
      { q: "Are 'Block' and 'Mark as Spam' the same on my phone?", a: "Slightly different. On the Gmail app, tap the three dots next to an email, then tap either 'Block' or 'Report spam'. Same effect as on a computer." },
    ],
    relatedSlugs: ["gmail-scam-emails", "gmail-help"],
  },

  // ─── 11. STORAGE FULL ────────────────────────────────────────────
  "gmail-storage-full": {
    slug: "gmail-storage-full",
    primaryQuery: "gmail storage is full",
    alternateQueries: [
      "free up gmail space",
      "gmail full how to fix",
      "delete old emails gmail",
      "gmail out of storage",
    ],
    searchVolume: "medium-high",
    difficulty: "low",
    metaTitle: "Gmail Storage Full? How to Free Space (Senior Guide 2026)",
    metaDescription: "Gmail says storage full? Easy steps to free up space without losing important emails. Senior-friendly guide. Free help: 347-953-1531.",
    h1: "Gmail Storage Is Full — How to Free Up Space",
    primaryKeywords: "gmail storage full, free up gmail space, delete old emails, gmail out of space",
    tldrAnswer: "To free up Gmail storage: type 'larger:10MB' into the search box at the top — this finds big emails. Delete old ones with attachments you don't need. Also delete emails from the 'Promotions' tab and old emails from Spam/Trash. Most people free up several GB this way without losing anything important.",
    estimatedTime: "10-15 minutes",
    difficultyLabel: "Easy",
    heroIntro: "Getting a 'storage full' warning? Here's how to free up space quickly.",
    category: "Storage",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your Gmail account open"],
    walkthrough: [
      SCREEN_INBOX,
      {
        id: "storage-status",
        title: "Find big emails to delete",
        brandHeader: "Gmail",
        description: "Type 'larger:10MB' in the search box to find big emails wasting space.",
        body: { kind: "gmail-storage-full" },
        arrowTarget: "search-input",
        arrowText: "Type 'larger:10MB' here",
        whatHappens: "Gmail shows the biggest emails first — usually old ones with photos or videos attached.",
      },
    ],
    textSteps: [
      { step: 1, title: "Check your current storage", detail: "Scroll to the bottom of Gmail. You'll see something like '12.5 GB of 15 GB used'. That tells you how full you are." },
      { step: 2, title: "Search for big emails", detail: "Click the search box at the top of Gmail. Type: larger:10MB and press Enter. Gmail shows your biggest emails." },
      { step: 3, title: "Delete the biggest ones you don't need", detail: "Look through the list. Old work emails, emails with videos attached, emails from years ago — delete them by clicking the trash can icon." },
      { step: 4, title: "Empty your Trash and Spam", detail: "Click 'More' on the left, then 'Trash'. Click 'Empty Trash now'. Do the same for Spam folder. This frees up everything you've already deleted." },
      { step: 5, title: "Clean out Promotions tab", detail: "Click the Promotions tab at the top of your inbox. Select all emails (small box at the top) and click the trash can. These are usually marketing emails you don't need." },
      { step: 6, title: "Check Google Drive and Photos", detail: "Your 15 GB is shared with Drive and Photos. Visit drive.google.com and photos.google.com to delete old files there too." },
    ],
    whatIfNotWork: [
      { problem: "I'm afraid to delete emails I might need", cause: "See fix below.", fix: "Don't delete emails from people you know — only delete obvious junk like old marketing or notifications. If unsure, archive instead of delete (the archive button is right next to delete)." },
      { problem: "I cleaned up but storage is still full", cause: "See fix below.", fix: "It can take Gmail up to 24 hours to update your storage number. Wait a day. Also check if Google Photos is using your storage — that's the most common cause." },
      { problem: "I need more space than 15 GB", cause: "See fix below.", fix: "You can buy more storage from Google — $1.99 a month for 100 GB. Go to one.google.com to upgrade. But most seniors don't need this — just clean up old emails." },
      { problem: "Storage is full and I can't get new emails", cause: "See fix below.", fix: "When you're 100% full, no new emails arrive — they bounce back to senders. Free up at least 1 GB right away by clearing Trash and Spam, then continue cleaning." },
    ],
    faqs: [
      { q: "How much storage does Gmail give me free?", a: "15 GB total — but that's shared with Google Drive and Google Photos. Most seniors use 1-3 GB of email and 5-10 GB of photos." },
      { q: "What does 'archive' do vs 'delete'?", a: "Archive removes the email from your inbox but keeps it forever. Delete moves it to Trash, which empties after 30 days. If unsure, archive — you can always find it later." },
      { q: "Will deleting emails from years ago hurt me?", a: "Probably not. Most old emails are notifications, marketing, or social updates you'll never need. Important emails (medical, legal, family photos) you should keep — but those are usually small in size." },
      { q: "Why is Google Photos using so much of my Gmail storage?", a: "Photos used to be free but isn't anymore. Every photo your phone uploads counts toward your 15 GB. Visit photos.google.com → Storage to delete old ones." },
      { q: "Can I save my emails before deleting them?", a: "Yes. Use Google Takeout (takeout.google.com) to download all your emails as a file you can save on your computer. Then delete the originals from Gmail." },
      { q: "What happens if I never clean up storage?", a: "When you hit 100%, new emails bounce back to senders, you can't add to Drive, and Photos won't back up. Cleaning up before you hit the limit is best." },
    ],
    relatedSlugs: ["gmail-help", "gmail-spam-filter"],
  },

  // ─── 12. SCAM EMAILS ──────────────────────────────────────────────
  "gmail-scam-emails": {
    slug: "gmail-scam-emails",
    primaryQuery: "how to spot a fake gmail",
    alternateQueries: [
      "gmail scam emails",
      "fake email gmail how to tell",
      "gmail phishing",
      "is this email from google real",
      "scam email warning gmail",
    ],
    searchVolume: "very-high",
    difficulty: "low",
    metaTitle: "How to Spot Fake Emails in Gmail — Senior Scam Guide (2026)",
    metaDescription: "Protect yourself from email scams. Easy guide for seniors to spot fake Gmail emails, phishing, and scams. Real examples. Free help: 347-953-1531.",
    h1: "How to Spot Fake Emails and Scams in Gmail",
    primaryKeywords: "fake gmail email, gmail scam, phishing gmail, scam email warning",
    tldrAnswer: "Five warning signs of a fake email: (1) The sender's email looks weird — extra letters or numbers. (2) It says 'urgent' or threatens to close your account. (3) Asks for your password, Social Security number, or bank info. (4) Has bad spelling or grammar. (5) The link goes to a strange website. When in doubt, don't click — call the company directly.",
    estimatedTime: "5 minutes to learn the signs",
    difficultyLabel: "Easy",
    heroIntro: "Learning to spot fake emails is one of the most important things you can do online.",
    category: "Security",
    pageType: "guide",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    toolsRequired: ["a computer or phone", "your Gmail account open"],
    walkthrough: [
      SCREEN_INBOX,
      {
        id: "suspicious-email",
        title: "What a scam email looks like",
        brandHeader: "Gmail",
        description: "Here's a real-looking scam — let's spot the warning signs together.",
        body: { kind: "gmail-suspicious-email", senderName: "Google Security", senderEmail: "google-security@suspicious-domain.xyz" },
        arrowTarget: "sender-email",
        arrowText: "Look at the address — not gmail.com!",
        whatHappens: "Real Google emails come from @google.com or @gmail.com. This one is fake — delete it.",
      },
    ],
    textSteps: [
      { step: 1, title: "Look at the sender's email address closely", detail: "Click the small arrow next to the sender's name to see the full address. Real Google emails come from @google.com. Scams use addresses like google-security@xyz.com." },
      { step: 2, title: "Watch for urgent or scary language", detail: "Scams say things like 'Your account will be closed in 24 hours!' or 'Suspicious activity detected — verify NOW!' Real companies don't pressure you like that." },
      { step: 3, title: "Never give passwords by email", detail: "Google, your bank, and the IRS will NEVER ask for your password by email. If an email asks, it's a scam. Always." },
      { step: 4, title: "Check the spelling", detail: "Real companies have professional writers. Lots of typos, weird grammar, or strange phrases ('Dear Valued Costumer') = scam." },
      { step: 5, title: "Don't click links — go directly", detail: "Even if the email looks real, don't click the link. Open a new browser tab and type the company's website yourself (like google.com or chase.com). Sign in there to check." },
      { step: 6, title: "Report it as spam and delete", detail: "Click the exclamation-mark icon at the top to report it as spam. Then delete it. Don't reply, don't unsubscribe — that just confirms your email is real to scammers." },
    ],
    whatIfNotWork: [
      { problem: "I already clicked a link in a scam email", cause: "See fix below.", fix: "Don't panic. Close the browser tab right away. Don't enter any passwords. Run a virus scan. If you typed a password before realizing, change that password immediately at the real website." },
      { problem: "I gave them my password — what now?", cause: "See fix below.", fix: "Change your password right now at the real website. Turn on 2-Step Verification. Check your account for unauthorized changes. Call us at 347-953-1531 if you need help." },
      { problem: "Scammer is calling my phone now", cause: "See fix below.", fix: "Hang up immediately. Do not give them any information. They got your phone from somewhere — likely the email scam. Block their number. Tell family members." },
      { problem: "I'm getting tons of these emails", cause: "See fix below.", fix: "Mark each as spam (not delete — Spam helps Gmail learn). After a few weeks, Gmail's filter gets very good at catching them automatically." },
    ],
    faqs: [
      { q: "What is phishing?", a: "Phishing is when scammers send fake emails pretending to be a real company (Google, your bank, Amazon) to trick you into giving them your password or money. The word comes from 'fishing' — they're fishing for your info." },
      { q: "How can I tell a real Google email from a fake one?", a: "Real Google emails come from @google.com or @accounts.google.com. They never ask for your password. They show your account name (not 'Dear Customer'). When unsure, go directly to google.com instead of clicking links." },
      { q: "What should I do if I get a scam email about my Social Security?", a: "Delete it. Real Social Security never emails about benefits — they mail you a letter. If you want to check, call SSA at 1-800-772-1213 (don't use any number from the email)." },
      { q: "Are emails saying I won a lottery real?", a: "No. 100% scam, every time. You cannot win a lottery you didn't enter. They want you to send 'fees' to claim a prize that doesn't exist. Delete and don't reply." },
      { q: "What about emails from my 'grandchild' asking for money?", a: "This is a common scam. If you get one, call your grandchild directly at their normal phone number to check. Never send money based on an email — even one that sounds like it's from family." },
      { q: "Should I open suspicious emails to see what they say?", a: "It's safer not to. Just opening an email tells scammers your address is real. If you want to look, do it carefully — don't click any links or buttons inside." },
      { q: "What if Gmail marks a real email as spam?", a: "It happens occasionally. Check your Spam folder once a week. If you find a real email there, click it and click 'Not spam' at the top. Future emails from that sender will go to your inbox." },
    ],
    relatedSlugs: ["gmail-spam-filter", "gmail-two-factor", "gmail-help"],
  },
};

export const ALL_GMAIL_SLUGS = Object.keys(GMAIL_PAGES);
