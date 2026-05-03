/**
 * FACEBOOK DATA — Single source of truth for the Facebook help cluster.
 *
 * Pattern matches gmail-data.ts. One entry per page, fully unique content.
 * Routes auto-render via /how-to/[slug]/page.tsx.
 *
 * SEO + AEO architecture (May 2026):
 *  - Long-tail head queries seniors actually type ("i forgot my facebook
 *    password", not "facebook password reset")
 *  - 60-word declarative TL;DR for AI citation extraction (ChatGPT,
 *    Claude, Perplexity, Gemini, Bing Copilot)
 *  - Multi-schema stack per page: Article + HowTo + FAQPage + BreadcrumbList
 *    + WebPage(speakable) + Service
 *  - Pixel-similar Facebook UI walkthrough screens watermarked "Practice Mode"
 *  - Verified against Meta's current help center flows (May 2026):
 *      facebook.com/login/identify
 *      facebook.com/help/105487009541643 (recovery)
 *      facebook.com/help/203305893040179 (hacked)
 *      facebook.com/help/213395615347144 (locked)
 *
 * Critical 2026 facts baked in:
 *  - Facebook killed security questions; recovery is email/phone code,
 *    trusted contacts (3-5 friends), or ID upload via help/contact/183000765122339
 *  - Meta has zero phone support for personal accounts. The 1-877 numbers
 *    in search results are scams. We say this on every relevant page.
 *  - Cloned-account scam is the #1 senior threat (fake duplicate friend
 *    request → "I'm a Facebook official" phone scam)
 */

// ───────────────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────────────

export type WalkthroughScreen = {
  step: number;
  title: string;            // shown above the simulated browser chrome
  caption: string;           // 1-line context shown below the screen
  body: WalkthroughBody;
  arrowTarget: string;       // CSS-friendly id of the element the arrow points to
  tooltipText: string;       // amber tooltip text ("Click here", etc)
  warningNote?: string;
};

export type WalkthroughBody =
  // The main facebook.com login page
  | { kind: "fb-login"; emailValue?: string; showError?: boolean; errorText?: string }
  // After clicking "Forgot password?" — identify your account
  | { kind: "fb-forgot-form"; prefilledValue?: string }
  // Pick how to receive the code (email vs phone vs trusted contacts)
  | { kind: "fb-recovery-options"; emailHint: string; phoneHint: string; showTrustedContacts?: boolean }
  // Enter the 6-digit code
  | { kind: "fb-code-entry"; method: "email" | "sms" | "authapp" }
  // Set a new password
  | { kind: "fb-new-password" }
  // The News Feed (success state)
  | { kind: "fb-feed"; userName: string }
  // Trusted contacts setup or use
  | { kind: "fb-trusted-contacts"; mode: "setup" | "use" }
  // 2FA setup screen
  | { kind: "fb-2fa-setup" }
  // The cloned/fake friend request scam example
  | { kind: "fb-friend-request"; scenarioType: "real" | "fake-clone" }
  // The 3-dot menu showing Block / Report
  | { kind: "fb-block-menu" }
  // Privacy & Security settings page
  | { kind: "fb-privacy-settings" }
  // A suspicious DM example (scam pattern)
  | { kind: "fb-suspicious-message"; messageType: "fake-friend-help" | "prize-winner" | "fake-security" }
  // Hacked-account secure-my-account page
  | { kind: "fb-secure-account" }
  // Account deletion confirmation
  | { kind: "fb-delete-confirm" };

export type FacebookPage = {
  // Routing
  slug: string;
  pageType: "hub" | "guide";
  category: "login" | "recovery" | "security" | "privacy" | "usage" | "scams";

  // SEO essentials
  primaryQuery: string;
  alternateQueries: string[];
  searchVolume: string;
  difficulty: "Easy" | "Medium" | "Hard";
  difficultyLabel: string;
  estimatedTime: string;

  // Metadata
  metaTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeywords: string[];

  // The 60-word AI-citation chunk
  tldrAnswer: string;

  // Hero
  heroIntro: string;
  lastUpdated: string;
  reviewedBy: string;

  // Walkthrough
  walkthrough: WalkthroughScreen[];

  // Text steps (SEO + a11y)
  textSteps: { step: number; title: string; detail: string; warning?: string }[];

  // Follow-up problems
  whatIfNotWork: { problem: string; cause: string; fix: string }[];

  // FAQs (FAQPage schema + AI citation)
  faqs: { q: string; a: string }[];

  // Internal linking
  relatedSlugs: string[];

  // Schema extras
  toolsRequired: string[];
};

// ───────────────────────────────────────────────────────────────────
// FACEBOOK BRAND THEME (used by VisualWalkthrough + page chrome)
// Matches Meta's actual color palette for educational fair use
// ───────────────────────────────────────────────────────────────────

export const FB_THEME = {
  primary: "#1877F2",          // Facebook brand blue (login button, links)
  primaryHover: "#166FE5",
  primaryDark: "#0B5FCC",
  green: "#42B72A",            // "Create new account" green
  greenHover: "#36A420",
  text: "#1C1E21",             // FB's actual body text color
  textSecondary: "#65676B",
  textLink: "#1877F2",
  border: "#DADDE1",
  borderInput: "#CCD0D5",
  bgPage: "#F0F2F5",           // FB's signature page background
  bgCard: "#FFFFFF",
  bgInputFocus: "#F5F6F7",
  bgWarning: "#FFF3CD",
  textWarning: "#856404",
  bgError: "#FFEBE9",
  textError: "#D72C0D",
  bgSuccess: "#E3FCEF",
  textSuccess: "#137333",
  shadowCard: "0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)",
};

// ═══════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════

export const FACEBOOK_PAGES: Record<string, FacebookPage> = {

  // ─────────────────────────────────────────────────────────────────
  // 1. HUB — /how-to/facebook-help
  // ─────────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────────
  // Note: pages are listed in clustered order (login → recovery →
  // security → usage → privacy → scams) for human readability.
  // The hub appears first.
  // ─────────────────────────────────────────────────────────────────

  "facebook-help": {
    slug: "facebook-help",
    pageType: "hub",
    category: "usage",
    primaryQuery: "facebook help for seniors",
    alternateQueries: [
      "facebook help",
      "how to use facebook for seniors",
      "facebook tutorial for elderly",
      "easy facebook help",
      "facebook help center",
      "facebook problems help",
    ],
    searchVolume: "12,100/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "Beginner-friendly",
    estimatedTime: "varies",

    metaTitle: "Facebook Help for Seniors — Plain-English Step-by-Step Guides",
    metaDescription:
      "Easy Facebook help for seniors. Login, password reset, hacked account, fake friend requests, privacy — large-text guides with practice screens. Call 347-953-1531.",
    h1: "Facebook Help for Seniors — Pick What You Need",
    primaryKeywords: [
      "facebook help for seniors",
      "facebook guide for seniors",
      "facebook tutorial elderly",
      "easy facebook help",
      "facebook help",
      "how to use facebook",
    ],

    tldrAnswer:
      "Trini System helps seniors solve every common Facebook problem — login, forgotten passwords, recovering a hacked account, blocking scammers, fake friend requests, and privacy settings. Each guide is plain English with large text and a free practice mode that walks you through real Facebook screens. Facebook itself has no phone support — any '1-800 Facebook help' number you see online is a scam. If you get stuck, call us at 347-953-1531 and a real person answers in under 15 minutes.",

    heroIntro:
      "Facebook can feel like a maze — buttons move, scams arrive in your messages, and account problems are scary. Pick the topic you need below. Every guide has large text, numbered steps, and a free practice mode where you click through copies of the real Facebook screens before doing it yourself.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [],
    textSteps: [],
    whatIfNotWork: [],

    faqs: [
      {
        q: "Is Trini System related to Facebook or Meta?",
        a: "No. Trini System is an independent technology help service for seniors. We are not employed by, endorsed by, or affiliated with Meta or Facebook in any way. We help you understand Facebook's official steps. We never log in to your account; you stay in control of your computer the whole time. Calls to 347-953-1531 are free and we never ask for your password.",
      },
      {
        q: "Does Facebook have a real phone number for help?",
        a: "No. Meta does not offer phone support for personal Facebook accounts and never has. Every phone number that claims to be 'Facebook support' or 'Meta support' for a free account is a scam. If you ever see a phone number when searching 'Facebook help', it is not Facebook. The only official Facebook help is at facebook.com/help — there is no human to call.",
      },
      {
        q: "How do I know which Facebook guide to pick?",
        a: "Start with the problem in front of you right now. If you can't get into Facebook, pick 'Login' or 'Forgot Password'. If your account looks strange or sent messages you didn't write, pick 'My Facebook was hacked'. If you're getting fake friend requests, pick 'Fake Friend Requests'. Each guide is named after the exact problem.",
      },
      {
        q: "Are these Facebook guides current for 2026?",
        a: "Yes. Every Facebook guide on this site is dated and reviewed every 90 days because Meta changes the look of Facebook often. The 'Last updated' date shows at the top of each page. If you ever land on a guide more than 6 months old, please call us — Facebook may have moved buttons since.",
      },
      {
        q: "Do I have to make an account or pay to read these?",
        a: "No. All Facebook help pages on this site are completely free to read with no signup, no email required, and no fee. The phone number 347-953-1531 is only there if you want to talk to a person — there's no charge to call either.",
      },
      {
        q: "What if my problem isn't in your list?",
        a: "Call 347-953-1531. We help seniors with hundreds of Facebook situations every week — even unusual ones. If we can solve it for free over the phone in under 15 minutes, that's what we do. If it needs more time, we'll quote a flat fee before any work begins.",
      },
    ],

    relatedSlugs: [],
    toolsRequired: [],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. /how-to/facebook-login
  // Target: "how to log in to facebook" (huge volume, evergreen)
  // ─────────────────────────────────────────────────────────────────

  "facebook-login": {
    slug: "facebook-login",
    pageType: "guide",
    category: "login",
    primaryQuery: "how to log in to facebook",
    alternateQueries: [
      "how to log in to facebook",
      "how to login to facebook",
      "how do i log into my facebook",
      "facebook sign in for seniors",
      "log into facebook step by step",
      "open my facebook",
      "facebook login page",
      "fb login",
    ],
    searchVolume: "1,200,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "Beginner-friendly",
    estimatedTime: "2 minutes",

    metaTitle: "How to Log In to Facebook — Step-by-Step for Seniors (2026)",
    metaDescription:
      "Plain-English Facebook login guide for seniors. Large text, screen-by-screen practice mode, and free phone help at 347-953-1531. Updated May 2026.",
    h1: "How Do I Log In to My Facebook Account?",
    primaryKeywords: [
      "how to log in to facebook",
      "how to login to facebook",
      "facebook login",
      "log in facebook",
      "facebook sign in",
      "fb login",
      "how to open my facebook account",
    ],

    tldrAnswer:
      "To log in to Facebook: open your web browser, type facebook.com in the address bar, type your email address or phone number in the top box, type your password in the bottom box, and click the blue 'Log In' button. The whole process takes about one minute. If you forgot your password, click the 'Forgotten password?' link below the login button.",

    heroIntro:
      "If staring at the Facebook login page makes you nervous about typing the wrong thing — you're not alone. This guide walks through every box and button in plain English. You can practice on the screens here first, then do it for real when you're ready.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [
      {
        step: 1,
        title: "Step 1 — Go to facebook.com",
        caption: "Type facebook.com in your browser's address bar at the very top",
        body: { kind: "fb-login", emailValue: "" },
        arrowTarget: "address-bar",
        tooltipText: "Type facebook.com here",
        warningNote: "Don't search 'facebook' — type the full address. Some search ads are fake login pages designed to steal passwords.",
      },
      {
        step: 2,
        title: "Step 2 — Type your email or phone in the top box",
        caption: "This is whatever you used when you first signed up — email address or mobile number",
        body: { kind: "fb-login", emailValue: "your.email@example.com" },
        arrowTarget: "email-input",
        tooltipText: "Type your email or phone here",
      },
      {
        step: 3,
        title: "Step 3 — Type your password in the second box",
        caption: "Letters appear as dots (••••) — that's normal for privacy",
        body: { kind: "fb-login", emailValue: "your.email@example.com" },
        arrowTarget: "password-input",
        tooltipText: "Type your password here",
      },
      {
        step: 4,
        title: "Step 4 — Click the blue 'Log In' button",
        caption: "One click — Facebook will sign you in",
        body: { kind: "fb-login", emailValue: "your.email@example.com" },
        arrowTarget: "login-btn",
        tooltipText: "Click here",
      },
      {
        step: 5,
        title: "Step 5 — You're in your News Feed",
        caption: "This is your Facebook home — posts from friends, family, and pages you follow",
        body: { kind: "fb-feed", userName: "Your Name" },
        arrowTarget: "none",
        tooltipText: "All done!",
      },
    ],

    textSteps: [
      {
        step: 1,
        title: "Open your web browser",
        detail: "On a Windows computer, click the Edge icon (blue swirl) or Chrome icon (red, yellow, green ball) on the taskbar at the bottom. On a Mac, click the Safari compass. On an iPad or iPhone, tap the Safari compass icon on your home screen. Any one of these will work fine.",
      },
      {
        step: 2,
        title: "Type facebook.com in the address bar",
        detail: "The address bar is the long white box at the very top of your browser. Click inside it once to highlight whatever's there, then type the eight letters f-a-c-e-b-o-o-k followed by .com — so the full address is facebook.com. Press Enter on your keyboard.",
        warning: "Do not click on 'Facebook' from a Google search result, especially if it's marked 'Sponsored' or 'Ad'. Some are fake login pages that look identical to Facebook. Always type facebook.com directly in the address bar.",
      },
      {
        step: 3,
        title: "Type your email or phone in the top box",
        detail: "Once Facebook loads, you'll see two empty boxes near the top right (on a computer) or in the center (on a phone). In the FIRST box, type whichever you used to sign up — your email address (like jane@yahoo.com) OR your mobile phone number with no dashes (like 3479531531). Either works.",
      },
      {
        step: 4,
        title: "Type your password in the second box",
        detail: "In the box right below, type your Facebook password. The letters will appear as dots (••••) — this is normal, it stops anyone behind you from reading the password. Type carefully because you can't see what you're typing.",
        warning: "Look at your keyboard's Caps Lock light. If it's on, all your letters are typing in CAPITAL LETTERS — and 'Rose' is different from 'rose' to Facebook. Press Caps Lock once to turn it off.",
      },
      {
        step: 5,
        title: "Click the blue 'Log In' button",
        detail: "The 'Log In' button is the bright blue rectangle right below the password box. Click it once. Facebook will check your information and, if correct, take you straight to your News Feed.",
      },
      {
        step: 6,
        title: "If asked for a 6-digit code, check your text messages or app",
        detail: "If you have two-factor authentication on, Facebook may send a 6-digit code to your phone or your authenticator app. Open your phone's text messages, find the message from Facebook (5 or 6-digit number), and type those 6 digits into the box on your computer. Click 'Continue'.",
        warning: "Facebook never asks for this 6-digit code by phone call or email. If anyone calls and asks for it — even claiming they're from Facebook — hang up. Always a scam.",
      },
      {
        step: 7,
        title: "You're at your News Feed",
        detail: "The News Feed shows posts from friends, family, and pages you follow. The newest are at the top. Scroll down to see more. Click any post to read or comment. To go back to the top, click the 'Facebook' logo or the small house icon.",
      },
    ],

    whatIfNotWork: [
      {
        problem: "Facebook says 'The password you've entered is incorrect.'",
        cause: "Either Caps Lock is on, you're typing the wrong password, or someone hacked your account and changed it.",
        fix: "Press Caps Lock once to turn it off, then retype slowly. If you're sure the password is right and it still says wrong, click 'Forgotten password?' to reset it. If you didn't change it yourself recently, your account may be hacked — see our hacked-account guide.",
      },
      {
        problem: "Facebook says 'No account found' or doesn't recognize your email",
        cause: "Either the email is misspelled, or your account was registered with a different email or phone number than you remembered.",
        fix: "Check the spelling carefully — 'gmail.com' not 'gmail.con'. Try your phone number instead. If you have multiple emails, try each one. If still nothing, see our 'Recover My Account' guide.",
      },
      {
        problem: "Facebook keeps asking for a code I'm not getting",
        cause: "Two-factor authentication code isn't arriving — wrong phone number on file, weak signal, or you're entering an old code.",
        fix: "Click 'Send code again' for a fresh one. If still nothing arrives, click 'Need another way to authenticate?' to use a recovery code or trusted contact. Old codes expire in 10 minutes.",
      },
      {
        problem: "The login page is in Spanish or another language",
        cause: "Browser language settings or you accidentally clicked a language at the bottom.",
        fix: "Scroll to the very bottom of the Facebook login page. You'll see small links for languages — click 'English (US)'. The page reloads in English.",
      },
    ],

    faqs: [
      {
        q: "What is the official website to log in to Facebook?",
        a: "The official website is facebook.com. Type those exact letters into your browser's address bar at the top, then press Enter. Do NOT click links from emails, search ads, or text messages — these can be fake. The real Facebook login page has the lowercase 'facebook' wordmark in white on a blue background, with two boxes for email and password and a blue 'Log In' button.",
      },
      {
        q: "Why does Facebook keep asking me to log in every time I visit?",
        a: "This usually happens because your browser deletes cookies when it closes, or you're using 'Private' or 'Incognito' mode. To stay logged in, use a normal browser window (not Incognito) and check the small 'Save your login info?' box when it appears. On a shared or public computer, never check this — anyone using the computer next could open your Facebook.",
      },
      {
        q: "Can I log in to Facebook with just my phone number instead of email?",
        a: "Yes — if you added a phone number to your Facebook account, you can use it instead of email. Just type the number with no dashes or spaces (like 3479531531) into the email box. Facebook accepts either. If you've never added a phone number, only the email works.",
      },
      {
        q: "Is fb.com the same as facebook.com?",
        a: "Yes — fb.com is owned by Meta and redirects automatically to facebook.com. It's safe but the longer address is more reliable to type since fewer fake sites copy it. Stick with facebook.com to be safe.",
      },
      {
        q: "How do I log in to Facebook on my iPad or iPhone?",
        a: "Two ways. (1) Open Safari, type facebook.com, and log in just like on a computer. (2) Download the free 'Facebook' app from the App Store, open it, and log in there. Most seniors prefer the app because the buttons are bigger. Either works fine.",
      },
      {
        q: "What is Facebook Lite and should seniors use it?",
        a: "Facebook Lite is a smaller, simpler version of the Facebook app made for older phones and slower internet. It uses less data and runs faster on older devices, but has fewer features (no live video, fewer photo effects). For most seniors, the regular Facebook app is fine. Switch to Lite only if regular Facebook is too slow.",
      },
      {
        q: "What if Facebook says my account is locked or disabled?",
        a: "These are different. 'Locked' means Facebook is suspicious of recent activity and wants you to verify it's you — usually clears in 15-60 minutes. 'Disabled' means Facebook believes you broke their rules and is more serious — you'll need to submit ID via the form they show. If your account was hacked, see our hacked-account recovery guide.",
      },
      {
        q: "Is it safe to call a 1-800 number for Facebook help?",
        a: "No. Meta does not offer any phone support for personal Facebook accounts. Every phone number on the internet that claims to be 'Facebook support' or 'Meta support' is a scam designed to steal your password, money, or both. Real Facebook help is only at facebook.com/help. Trini System (347-953-1531) is independent — we don't claim to BE Facebook; we just walk you through their official steps for free.",
      },
    ],

    relatedSlugs: ["facebook-forgot-password", "facebook-cant-login", "facebook-recover-account", "facebook-two-factor"],
    toolsRequired: ["A web browser", "Your Facebook email or phone number", "Your Facebook password"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. /how-to/facebook-forgot-password
  // Target: "i forgot my facebook password" (very high volume)
  // ─────────────────────────────────────────────────────────────────

  "facebook-forgot-password": {
    slug: "facebook-forgot-password",
    pageType: "guide",
    category: "recovery",
    primaryQuery: "i forgot my facebook password",
    alternateQueries: [
      "i forgot my facebook password",
      "forgot facebook password",
      "how to reset facebook password",
      "facebook password reset",
      "reset my facebook password",
      "i can't remember my facebook password",
      "change facebook password forgot",
      "facebook forgotten password",
    ],
    searchVolume: "550,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "Quick fix",
    estimatedTime: "5 minutes",

    metaTitle: "I Forgot My Facebook Password — How to Reset It (Senior Guide)",
    metaDescription:
      "Forgot Facebook password? Step-by-step reset guide for seniors with practice mode and large text. Free phone help at 347-953-1531. Updated May 2026.",
    h1: "I Forgot My Facebook Password — How Do I Reset It?",
    primaryKeywords: [
      "i forgot my facebook password",
      "forgot facebook password",
      "facebook password reset",
      "how to reset facebook password",
      "reset facebook password",
      "facebook forgotten password",
    ],

    tldrAnswer:
      "To reset a forgotten Facebook password: go to facebook.com, click the small 'Forgotten password?' link below the login button, type your email or phone number, then choose how Facebook should verify you — usually a 6-digit code by email or text message. Type the code, create a new password, and click Continue. If you have access to your email or phone, the whole reset takes about 5 minutes.",

    heroIntro:
      "Forgetting a password is normal — it happens to almost everyone. Facebook has a 'Forgotten password?' button right on the login page, and the reset is usually quick. This guide walks through every screen in plain English with practice mode.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [
      {
        step: 1,
        title: "Step 1 — Click 'Forgotten password?'",
        caption: "It's the small link below the blue Log In button",
        body: { kind: "fb-login", emailValue: "" },
        arrowTarget: "forgot-link",
        tooltipText: "Click this link",
      },
      {
        step: 2,
        title: "Step 2 — Type your email or phone number",
        caption: "Use whatever you used to sign up for Facebook",
        body: { kind: "fb-forgot-form", prefilledValue: "" },
        arrowTarget: "input",
        tooltipText: "Type your email or phone here",
        warningNote: "If you've forgotten which email you used, try each one you have. Facebook will say 'No account found' for ones that don't match.",
      },
      {
        step: 3,
        title: "Step 3 — Pick how to receive your code",
        caption: "Email is usually fastest. Pick whichever you can check right now.",
        body: { kind: "fb-recovery-options", emailHint: "j••••@example.com", phoneHint: "(•••) •••-3142" },
        arrowTarget: "first-option",
        tooltipText: "Pick the easiest option",
      },
      {
        step: 4,
        title: "Step 4 — Type the 6-digit code from your email or text",
        caption: "The code arrives in seconds. Check your inbox or text messages.",
        body: { kind: "fb-code-entry", method: "email" },
        arrowTarget: "code-input",
        tooltipText: "Type the 6 digits here",
        warningNote: "Codes expire in 10 minutes. If yours is older, click 'Send a new code'.",
      },
      {
        step: 5,
        title: "Step 5 — Create a new password",
        caption: "Pick something at least 8 characters with letters and numbers",
        body: { kind: "fb-new-password" },
        arrowTarget: "input",
        tooltipText: "Type a NEW password you'll remember",
        warningNote: "Write the new password down somewhere safe BEFORE clicking Continue.",
      },
      {
        step: 6,
        title: "Step 6 — All done!",
        caption: "Facebook will sign you in automatically with your new password",
        body: { kind: "fb-feed", userName: "Your Name" },
        arrowTarget: "none",
        tooltipText: "Save your new password!",
      },
    ],

    textSteps: [
      {
        step: 1,
        title: "Go to facebook.com and click 'Forgotten password?'",
        detail: "Open your browser, type facebook.com, and press Enter. On the login page, look just below the blue 'Log In' button — you'll see small text that says 'Forgotten password?'. Click it once.",
      },
      {
        step: 2,
        title: "Type your email or phone number",
        detail: "On the next screen, Facebook asks you to identify your account. Type the email address OR phone number you used to sign up. Click 'Search'.",
        warning: "If you have multiple email addresses, try each one. Facebook only finds the account if you type exactly the email or phone on file.",
      },
      {
        step: 3,
        title: "Confirm the account is yours",
        detail: "Facebook will show a partial view of your account (usually your profile photo and first name) so you can confirm you found the right one. Click 'Continue'.",
      },
      {
        step: 4,
        title: "Choose how to receive your code",
        detail: "Facebook will show options based on what's on your account: send code by email, send code by text, or use a Google account if linked. Pick whichever is easiest. Click 'Continue'.",
      },
      {
        step: 5,
        title: "Open your email or text messages and find the code",
        detail: "Facebook sends a 6-digit code right away. Open your email inbox or your phone's text messages, find the message from Facebook, and write down or remember the 6 digits.",
        warning: "Don't click any LINKS in the email — only use the 6-digit number. Phishing scammers send fake reset emails that look like Facebook but link to fake sites.",
      },
      {
        step: 6,
        title: "Type the 6-digit code into the box",
        detail: "Back on the Facebook page, type the 6 digits into the box. Click 'Continue'.",
        warning: "Codes expire in 10 minutes. If yours is older, click 'Send a new code' to get a fresh one.",
      },
      {
        step: 7,
        title: "Create a new password",
        detail: "Type a new password — at least 8 characters with letters and numbers. Pick something only you would know but is easy for you to remember. Click 'Continue'.",
        warning: "Write the new password on paper kept in a safe place at home. Don't email it to yourself or save in a public document.",
      },
      {
        step: 8,
        title: "You're back in",
        detail: "Facebook signs you in automatically with the new password. From now on, use this new password every time. Your other devices (phone, tablet) will ask for the new password the next time you open Facebook on them.",
      },
    ],

    whatIfNotWork: [
      {
        problem: "Facebook says 'No account found' for my email",
        cause: "The email you typed isn't exactly the one on the account, or you used a different email originally.",
        fix: "Try every email address you've ever owned. Try your phone number too. If you have an old email you haven't checked in years, that might be the one — Facebook accounts often outlive the email address used to create them.",
      },
      {
        problem: "I never receive the code by email or text",
        cause: "Wrong email/phone on file, code went to spam folder, or carrier blocking.",
        fix: "Check your spam/junk folder for the email. For texts, look for a 5- or 6-digit number — sometimes carriers filter Facebook codes. If neither arrives in 5 minutes, try the OTHER option (if it offered both).",
      },
      {
        problem: "I don't have access to the email OR phone on the account anymore",
        cause: "You changed email or phone since creating the Facebook account and never updated it on Facebook.",
        fix: "Click 'No longer have access to these?' on the recovery options screen. Facebook will offer alternative paths — trusted contacts (3-5 friends you set up earlier) or ID upload. See our 'Recover My Facebook Account' guide for the full process.",
      },
      {
        problem: "Facebook accepted the code but rejects my new password",
        cause: "Password too short, too obvious, or matches a previous password on this account.",
        fix: "Use at least 8 characters with both letters and numbers. Avoid your name, birthday, or 'password123'. Try a phrase like 'BlueRose1962Garden' — easy for you, hard for hackers.",
      },
    ],

    faqs: [
      {
        q: "Can I call Facebook to reset my password?",
        a: "No. Meta does not offer phone support for personal Facebook accounts and never has. Any phone number that claims to be 'Facebook support' is a scam. The only way to reset a Facebook password is through facebook.com/login/identify. Trini System (347-953-1531) can walk you through Facebook's official process for free, but we cannot reset the password for you.",
      },
      {
        q: "How long does a Facebook password reset take?",
        a: "If you have access to your email or phone, the reset takes about 5 minutes total — most of that is waiting 30 seconds for the code to arrive. If you've lost both your email and phone, recovery uses trusted contacts or ID upload and can take 24 hours to 7 days.",
      },
      {
        q: "Will resetting my Facebook password log me out of Messenger and Instagram?",
        a: "Yes — Messenger uses the same Facebook account, so it'll sign out and ask for the new password. Instagram is also owned by Meta, but it has its own separate password unless you specifically linked the accounts. After resetting, plan 5 minutes to sign back in on your phone, tablet, and any other devices.",
      },
      {
        q: "Can someone see what my old Facebook password was?",
        a: "No. Facebook stores passwords in encrypted form — even Facebook engineers cannot see what your password is. The only way forward when you forget is to reset it, not to 'find' it. If your browser saved the password, you can sometimes view it in browser settings (Chrome → Google Password Manager).",
      },
      {
        q: "What's a strong Facebook password example?",
        a: "Pick four random words plus a year that means something only to you — for example, 'GardenRoseSummer1962' or 'BlueChairTuesdayMaple'. Easy to remember, very hard to guess. Avoid: your name, birthday, anniversary, address, kids' names, pet names, or 'password' followed by anything.",
      },
      {
        q: "Should I save my new Facebook password in my browser?",
        a: "On your personal computer or phone — yes, it's safer than sticky notes. When the browser asks 'Save password?' click yes. On any shared or public computer (library, hotel) — never save. Also keep one paper copy at home in case browser data gets wiped.",
      },
      {
        q: "After resetting, will I see all my photos and friends?",
        a: "Yes — your account is exactly the same as before. Resetting the password only changes who can sign in; it does not delete, hide, or move any photos, posts, friends, messages, or pages. Everything is right where you left it.",
      },
      {
        q: "Why does Facebook ask me to set up two-factor authentication after resetting?",
        a: "After a password reset, Facebook often prompts to add 2-Step Verification (called 'two-factor' on Facebook). It's a smart idea — even if a hacker steals your password later, they can't get in without your phone. We strongly recommend turning it on. See our 'Facebook 2-Factor' guide.",
      },
    ],

    relatedSlugs: ["facebook-recover-account", "facebook-login", "facebook-cant-login", "facebook-two-factor"],
    toolsRequired: ["Your Facebook email or phone number", "Access to that email or phone to receive a code", "A web browser", "Pen and paper to write the new password"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. /how-to/facebook-recover-account
  // Target: "how to recover facebook account" (huge volume)
  // ─────────────────────────────────────────────────────────────────

  "facebook-recover-account": {
    slug: "facebook-recover-account",
    pageType: "guide",
    category: "recovery",
    primaryQuery: "how to recover facebook account",
    alternateQueries: [
      "how to recover facebook account",
      "recover my facebook account",
      "facebook account recovery",
      "i lost access to facebook",
      "recover facebook without email or phone",
      "facebook account recovery without password",
      "facebook trusted contacts recovery",
    ],
    searchVolume: "368,000/mo (US)",
    difficulty: "Hard",
    difficultyLabel: "Takes patience",
    estimatedTime: "10 minutes to 7 days",

    metaTitle: "How to Recover Your Facebook Account — Senior Guide (2026)",
    metaDescription:
      "Lost access to Facebook? Senior recovery guide covering trusted contacts, ID upload, and Meta's verification process. Call 347-953-1531 for free help.",
    h1: "How Do I Recover My Facebook Account?",
    primaryKeywords: [
      "how to recover facebook account",
      "recover facebook account",
      "facebook account recovery",
      "facebook recovery without email",
      "trusted contacts facebook",
      "facebook id verification",
    ],

    tldrAnswer:
      "Facebook account recovery is for when password reset alone won't work — usually because you've lost both your email and phone, or your account was hacked. Go to facebook.com/login/identify, identify your account, then click 'No longer have access to these?' to use trusted contacts (3-5 friends you set up earlier) or upload a photo ID. Recovery takes from 10 minutes to 7 days depending on which path applies. There is no Facebook phone support — anyone offering it for a fee is a scam.",

    heroIntro:
      "If you've lost access to Facebook completely — different from just forgetting a password — Facebook has a longer recovery process. It uses trusted friends or photo ID to prove you are really you. This guide walks through every option in plain English.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [
      {
        step: 1,
        title: "Step 1 — Go to facebook.com/login/identify",
        caption: "This is Facebook's official account-finding page",
        body: { kind: "fb-forgot-form", prefilledValue: "" },
        arrowTarget: "input",
        tooltipText: "Type your name, email, phone, or username",
      },
      {
        step: 2,
        title: "Step 2 — Confirm the account is yours",
        caption: "Facebook shows your profile photo so you can recognize the right account",
        body: { kind: "fb-recovery-options", emailHint: "(no email access)", phoneHint: "(no phone access)" },
        arrowTarget: "first-option",
        tooltipText: "Click 'No longer have access to these?'",
      },
      {
        step: 3,
        title: "Step 3 — Use trusted contacts (if set up)",
        caption: "Facebook reveals 3-5 friends. Each gets a recovery code you ask them for.",
        body: { kind: "fb-trusted-contacts", mode: "use" },
        arrowTarget: "first-contact",
        tooltipText: "Call or text each friend",
        warningNote: "Trusted contacts only work if you set them up BEFORE losing access. If not, skip to ID upload.",
      },
      {
        step: 4,
        title: "Step 4 — Or upload a photo ID",
        caption: "Driver's license, passport, or government ID. Facebook reviews in 24 hours to 7 days.",
        body: { kind: "fb-secure-account" },
        arrowTarget: "upload-btn",
        tooltipText: "Upload a clear photo of your ID",
      },
      {
        step: 5,
        title: "Step 5 — Account recovered",
        caption: "Set a new password and update your recovery info immediately",
        body: { kind: "fb-feed", userName: "Your Name" },
        arrowTarget: "none",
        tooltipText: "Welcome back!",
      },
    ],

    textSteps: [
      {
        step: 1,
        title: "Go to facebook.com/login/identify",
        detail: "Type the address into your browser. Or, on the login page, click 'Forgotten password?' — both paths reach the same flow.",
      },
      {
        step: 2,
        title: "Identify your account",
        detail: "Type your full name, email address, phone number, or Facebook username (the part after facebook.com/ in your profile URL). Click Search. Facebook shows the closest match.",
      },
      {
        step: 3,
        title: "Confirm it's the right account",
        detail: "Facebook displays your profile photo and partial name. Click 'This is my account' if it matches. If not, click 'No, not this one' and try a different identifier.",
      },
      {
        step: 4,
        title: "Try the standard email or phone code first",
        detail: "Facebook offers to send a 6-digit code to the email or phone on file. If you can access either of those, use the standard reset (see our 'Forgot Password' guide). Only use the longer recovery if both are unavailable.",
      },
      {
        step: 5,
        title: "Click 'No longer have access to these?' for hard recovery",
        detail: "On the code-method screen, click the small link 'No longer have access to these?'. Facebook will offer alternate paths.",
      },
      {
        step: 6,
        title: "Use trusted contacts (if set up earlier)",
        detail: "If you set up trusted contacts before losing access, Facebook reveals 3-5 friends' names. Call or text each one — Facebook gives them a unique link, and they share their recovery code with you. You enter all the codes to regain access.",
        warning: "Trusted contacts only works if you set this up BEFORE losing access. Set yours up after recovery so this works next time.",
      },
      {
        step: 7,
        title: "Or upload a photo ID",
        detail: "If you didn't set up trusted contacts, upload a clear photo of a government ID (driver's license, passport, state ID). Facebook compares the name and birthday to what's on the account. Reviews take 24 hours to 7 days.",
        warning: "Cover any sensitive info on the ID that Facebook doesn't need (like your address) with a piece of tape. Facebook only needs your name, birthday, and photo.",
      },
      {
        step: 8,
        title: "Set a new password and update recovery info",
        detail: "After recovery, change your password and immediately go to Settings → Security and Login → 'Choose 3 to 5 friends to contact if you get locked out'. Set up trusted contacts AND add a current backup email so this never happens again.",
      },
    ],

    whatIfNotWork: [
      {
        problem: "Facebook keeps showing 'We couldn't verify it's your account'",
        cause: "Facebook's algorithm sees your recovery attempt as suspicious — usually because you're on a new device, network, or VPN.",
        fix: "Try again from the computer or phone you've actually used Facebook on before, on your home Wi-Fi. Don't use a VPN. If still failing, wait 24 hours before retrying.",
      },
      {
        problem: "I uploaded my ID but Facebook hasn't responded for 5 days",
        cause: "ID review can take up to 7 business days — and longer if Meta's volume is high.",
        fix: "Wait the full 7 days before doing anything else. Re-uploading restarts the queue. If 14 days pass with no response, try uploading again with a different ID type (passport instead of driver's license).",
      },
      {
        problem: "My account was hacked and the hacker changed the email",
        cause: "Attackers commonly change the recovery email so the real owner can't recover.",
        fix: "Check the email you originally used for Facebook — Facebook sends a 'Your email was changed' message with a 'Secure your account' link valid for 30 days. Click that link. If past 30 days, use the hacked-account flow at facebook.com/hacked.",
      },
      {
        problem: "Facebook won't accept my ID photo",
        cause: "Photo too blurry, glare on ID, ID expired, or name on ID doesn't match account.",
        fix: "Take a new photo in good lighting on a dark background, no glare, no shadow. Make sure all four corners are visible. If your account uses a nickname, you may need to add 'Other names' under About → Details to match the ID.",
      },
    ],

    faqs: [
      {
        q: "How long does Facebook account recovery take?",
        a: "If you have access to your email or phone, recovery is 5-10 minutes. If you're using trusted contacts, plan 1-2 hours (depends how fast your friends respond). If using ID upload, Facebook reviews take 24 hours to 7 business days. In hard cases (account from 10+ years ago, hacked, no trusted contacts), recovery can take longer or fail entirely.",
      },
      {
        q: "What if Facebook denies my recovery and I have no other options?",
        a: "Unfortunately, Facebook does not have a phone or email support line for free accounts. If automated recovery fails repeatedly, the only paths are (a) waiting at least a week and trying again with more accurate info, or (b) creating a new Facebook account and starting over. Trini System (347-953-1531) can review your situation and tell you which is realistic — for free.",
      },
      {
        q: "Are 'Facebook account recovery services' for hire legitimate?",
        a: "No. Every paid service that claims to recover Facebook accounts is a scam. They cannot bypass Meta's verification any more than you can. They take your money, sometimes ask for your password (then steal more), and often vanish. Real Facebook recovery only happens through facebook.com/help. Free help to navigate that process is fine; paid recovery 'services' are not.",
      },
      {
        q: "What is g.co and is it the same as Facebook?",
        a: "g.co is Google's shortlink, NOT Facebook. Facebook's official short links are fb.com and fb.me. Anyone telling you to visit g.co for Facebook recovery is confused or scamming. Stick with facebook.com or fb.com for anything Facebook-related.",
      },
      {
        q: "What are trusted contacts and how do I set them up?",
        a: "Trusted contacts are 3-5 friends you pick in advance who can help you recover if you ever get locked out. Facebook gives them a recovery code link only when you ask for help. Set them up at Settings → Security and Login → 'Choose 3 to 5 friends to contact if you get locked out'. Pick people you can reach by phone outside Facebook (so you don't need Facebook to ask them).",
      },
      {
        q: "Can my child or spouse recover my Facebook for me?",
        a: "Not directly. They can sit with you and help you click through the screens (over the phone or in person), but Facebook's verification is tied to YOU — your devices, your email, your ID. Family members cannot 'log in for you' or contact Meta on your behalf. If you need this kind of help, that's exactly what Trini System (347-953-1531) does for free.",
      },
      {
        q: "Will I lose my photos, friends, and posts if I create a new account instead?",
        a: "Yes — a new account starts blank with no friends, photos, posts, or message history. There's no way to transfer them from the old account if you can't log in to it. This is why ID upload recovery is worth the wait. Only create a new account as last resort, after multiple failed recovery attempts.",
      },
      {
        q: "Can Trini System recover my Facebook account?",
        a: "We can guide you through Facebook's official recovery — for free over the phone — at 347-953-1531. We CANNOT bypass Meta's verification or contact Meta on your behalf. No service can; anyone claiming otherwise is scamming. We're most useful when you're stuck on a specific screen or don't understand what Facebook is asking for.",
      },
    ],

    relatedSlugs: ["facebook-forgot-password", "facebook-hacked-account", "facebook-cant-login", "facebook-two-factor"],
    toolsRequired: ["Your Facebook name, email, phone, or username", "A government photo ID (if going the ID route)", "Phone numbers of 3-5 trusted friends (if you set this up)", "Patience — recovery can take days"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. /how-to/facebook-hacked-account
  // Target: "my facebook was hacked" / "facebook account hacked"
  // (HUGE senior pain point + emotional urgency = high CTR)
  // ─────────────────────────────────────────────────────────────────

  "facebook-hacked-account": {
    slug: "facebook-hacked-account",
    pageType: "guide",
    category: "security",
    primaryQuery: "my facebook was hacked",
    alternateQueries: [
      "my facebook was hacked",
      "facebook account hacked",
      "facebook hacked what to do",
      "someone hacked my facebook",
      "facebook hacked help",
      "report hacked facebook",
      "facebook hacked recovery",
      "my facebook is sending messages i didn't write",
    ],
    searchVolume: "246,000/mo (US)",
    difficulty: "Medium",
    difficultyLabel: "Act quickly",
    estimatedTime: "15 to 30 minutes",

    metaTitle: "My Facebook Was Hacked — What to Do Right Now (Senior Guide)",
    metaDescription:
      "Step-by-step recovery if your Facebook was hacked. Senior-friendly with practice mode. Free help at 347-953-1531. Verified May 2026.",
    h1: "My Facebook Was Hacked — What Should I Do?",
    primaryKeywords: [
      "my facebook was hacked",
      "facebook hacked",
      "facebook account hacked recovery",
      "report hacked facebook",
      "someone hacked my facebook",
      "secure my facebook account",
    ],

    tldrAnswer:
      "If your Facebook was hacked, act in this order: (1) go to facebook.com/hacked and click 'My Account Is Compromised', (2) log in with the password the hacker may not have changed yet, (3) Facebook walks you through securing the account, (4) review recent activity and remove anything you didn't do, (5) change the password and turn on two-factor authentication. If the hacker already changed your password, use facebook.com/login/identify and follow the recovery process. Never call any phone number from a Facebook search result — Meta has no phone support.",

    heroIntro:
      "Discovering your Facebook was hacked is upsetting — but the steps below work, and the sooner you act, the better. Most accounts are recoverable within 30 minutes if you start now. Don't pay anyone who calls offering 'Facebook hack support' — those are all scams.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [
      {
        step: 1,
        title: "Step 1 — Go to facebook.com/hacked",
        caption: "This is Facebook's official 'compromised account' page",
        body: { kind: "fb-secure-account" },
        arrowTarget: "secure-btn",
        tooltipText: "Click 'My Account Is Compromised'",
      },
      {
        step: 2,
        title: "Step 2 — Log in with your most recent password",
        caption: "Try the password you remember — the hacker may not have changed it yet",
        body: { kind: "fb-login", emailValue: "your.email@example.com" },
        arrowTarget: "login-btn",
        tooltipText: "Log in",
        warningNote: "If the password works, do this fast — you're in a race with the hacker.",
      },
      {
        step: 3,
        title: "Step 3 — Facebook walks you through securing the account",
        caption: "Each screen asks to review and undo unauthorized changes",
        body: { kind: "fb-secure-account" },
        arrowTarget: "review-btn",
        tooltipText: "Click each item to review",
      },
      {
        step: 4,
        title: "Step 4 — Change your password to something brand new",
        caption: "Don't reuse a password — the hacker has the old one",
        body: { kind: "fb-new-password" },
        arrowTarget: "input",
        tooltipText: "Type a brand-new password",
      },
      {
        step: 5,
        title: "Step 5 — Turn on two-factor authentication",
        caption: "Single best step to keep this from happening again",
        body: { kind: "fb-2fa-setup" },
        arrowTarget: "enable-btn",
        tooltipText: "Click 'Turn on'",
      },
    ],

    textSteps: [
      {
        step: 1,
        title: "Go to facebook.com/hacked",
        detail: "Type facebook.com/hacked into your browser's address bar. This goes to Facebook's official 'My Account Is Compromised' page. Click the blue button that says 'My Account Is Compromised'.",
      },
      {
        step: 2,
        title: "Try logging in with your most recent password",
        detail: "Facebook asks for your email/phone and password. Try the password you remember — many hackers post fake messages but don't immediately change the password. If it works, you're racing the hacker, so do the rest fast.",
        warning: "If your password DOESN'T work, the hacker changed it. Skip to step 7 (special hacked recovery).",
      },
      {
        step: 3,
        title: "Review login activity and sign out unrecognized sessions",
        detail: "Facebook shows 'Where you're logged in'. Click 'See more' and look at the list. Any device, location, or city you don't recognize is the hacker. Click the three dots next to it and pick 'Log out'. Do this for every unfamiliar entry.",
      },
      {
        step: 4,
        title: "Review recent posts, friend requests, and messages",
        detail: "Go to your profile and scroll your timeline. Delete any post you didn't make. Go to Friends → Friend Requests sent and cancel any you didn't send. Go to Messenger and look at recently sent messages — apologize to friends if the hacker sent them spam links.",
        warning: "If the hacker sent fake 'I'm in trouble, send me money' messages, your friends may have lost real money. Tell them in a public post that your account was hacked so they don't fall for it.",
      },
      {
        step: 5,
        title: "Change your password",
        detail: "Go to Settings → Password and security → Change password. Pick a brand new password (not one you've used before — the hacker has the old one). Use 12+ characters with letters, numbers, and a symbol. Click Save.",
      },
      {
        step: 6,
        title: "Turn on two-factor authentication",
        detail: "Settings → Password and security → Use two-factor authentication. Pick 'Authentication app' (more secure than text message — but text message is OK if you're not comfortable installing apps). Follow the prompts. Save the recovery codes Facebook gives you on paper.",
        warning: "Two-factor stops 99% of hackers even if they steal your password later. Do not skip this step.",
      },
      {
        step: 7,
        title: "If the hacker changed your password — use facebook.com/login/identify",
        detail: "If the password no longer works, you can't log in to use the steps above. Go to facebook.com/login/identify, identify your account, and follow recovery. If your email was also changed by the hacker, check your old email inbox for a 'Your email was changed' message from Facebook — there's a 'Secure your account' link valid for 30 days. Click that.",
      },
      {
        step: 8,
        title: "Tell your friends and family in a public post",
        detail: "Once you're back in, post on your timeline: 'My Facebook was hacked yesterday. If you got any odd messages from me asking for money or clicks, please ignore them — those weren't from me.' This stops the hacker from continuing to scam your friends.",
      },
    ],

    whatIfNotWork: [
      {
        problem: "I can't log in even with the right password",
        cause: "Hacker already changed the password (and possibly email).",
        fix: "Go to facebook.com/login/identify and identify your account. Click 'No longer have access to these?' to use trusted contacts or upload an ID. Also check your email inbox for a Facebook 'Your email was changed' message — there's a special 'Secure your account' link inside that bypasses the hacker's changes (valid 30 days).",
      },
      {
        problem: "My friends are getting scam messages from my account but I can still log in",
        cause: "Hacker has either an active session or has connected a malicious app to your account.",
        fix: "Settings → Apps and Websites → look for any apps you didn't install → click Remove. Then Settings → Where you're logged in → log out all devices except your current one. Change password.",
      },
      {
        problem: "Facebook says my account is 'temporarily locked'",
        cause: "Facebook auto-detected suspicious activity and locked the account to protect you.",
        fix: "Follow the on-screen prompts — usually identify yourself by typing names of friends shown in photos, or upload an ID. The lock auto-clears once you complete verification.",
      },
      {
        problem: "I deleted the 'email changed' notification by mistake",
        cause: "Many seniors delete these as 'spam' before realizing they're real.",
        fix: "Check your email's Trash or Deleted folder — the message is recoverable for up to 30 days in most email services. The 'Secure your account' link in it is the fastest way back in.",
      },
    ],

    faqs: [
      {
        q: "How can I tell if my Facebook was actually hacked?",
        a: "Common signs: friends receive messages you didn't send, your name or birthday changed, posts appear that you didn't make, you see logins from cities you've never been to, you get an email from Facebook saying 'Your email was changed' or 'New device login' that you didn't do. If even one of these is true, treat it as hacked and follow this guide right away.",
      },
      {
        q: "Should I pay someone advertising 'Facebook hack recovery service'?",
        a: "Absolutely not — every single one is a scam. They cannot bypass Meta's verification any more than you can. They take your money, often ask for your password (then steal more), and disappear. Real Facebook recovery is FREE through facebook.com/hacked. If you need help navigating it, call us free at 347-953-1531.",
      },
      {
        q: "How did the hacker get my Facebook password?",
        a: "Most common ways: (1) you clicked a phishing link in an email or message that looked like Facebook but stole your password, (2) you used the same password on another website that got breached, (3) malware on your computer recorded what you typed. After recovery, scan your computer for viruses and never reuse passwords.",
      },
      {
        q: "Can the hacker still see my private messages even after I change my password?",
        a: "No — once you change the password and sign out all devices, the hacker is locked out. They keep whatever they already read or screenshot, but they can't see new messages. Review the 'Where you're logged in' list carefully and log out anything unfamiliar to be sure.",
      },
      {
        q: "Should I delete my Facebook and start over?",
        a: "Usually no. Recovery is almost always faster than starting over and rebuilding your friends list, photo history, and group memberships. Only delete if Meta refuses recovery after multiple ID submissions over several weeks. See our 'Recover My Facebook Account' guide before considering deletion.",
      },
      {
        q: "Will Facebook tell my friends my account was hacked?",
        a: "Not automatically — that's why you should post about it yourself. Facebook may add a small 'this account was recently recovered' note to your profile, but it's not obvious. Tell your friends in a clear post so they don't fall for any scam messages the hacker sent before you locked the account.",
      },
      {
        q: "What if the hacker stole money from people who messaged me back?",
        a: "Tell those friends to report the loss to (a) their bank for a fraud claim, (b) the FTC at reportfraud.ftc.gov, and (c) the FBI's Internet Crime Center at ic3.gov. The bank may be able to reverse charges if the friend acts within 60 days. Your friends were victims, not careless — sophisticated scams fool many people.",
      },
      {
        q: "How do I prevent this from happening again?",
        a: "Three steps: (1) turn on two-factor authentication on Facebook (Settings → Password and Security → Use two-factor authentication), (2) use a different password for Facebook than for any other site, (3) never click links in messages — even from friends — without checking with them first. With two-factor on, even a stolen password isn't enough for hackers to get in.",
      },
    ],

    relatedSlugs: ["facebook-recover-account", "facebook-two-factor", "facebook-scam-messages", "facebook-friend-requests"],
    toolsRequired: ["Access to your most recent Facebook password", "Access to your email account", "A safe (un-hacked) computer or phone", "Time to review and undo changes — 15-30 minutes"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. /how-to/facebook-cant-login
  // Target: "cant log in to facebook"
  // ─────────────────────────────────────────────────────────────────

  "facebook-cant-login": {
    slug: "facebook-cant-login",
    pageType: "guide",
    category: "login",
    primaryQuery: "can't log in to facebook",
    alternateQueries: [
      "can't log in to facebook",
      "facebook won't let me log in",
      "facebook not signing in",
      "facebook login problems",
      "why can't i log into facebook",
      "facebook sign in not working",
      "facebook keeps saying wrong password",
      "facebook login error",
    ],
    searchVolume: "135,000/mo (US)",
    difficulty: "Medium",
    difficultyLabel: "Step-by-step diagnosis",
    estimatedTime: "5 to 15 minutes",

    metaTitle: "Can't Log In to Facebook? 7 Common Causes and Fixes (2026)",
    metaDescription:
      "Facebook won't let you log in? Senior-friendly checklist of 7 common causes — wrong password, browser, captcha, locked account. Free help at 347-953-1531.",
    h1: "Why Won't Facebook Let Me Log In?",
    primaryKeywords: [
      "can't log in to facebook",
      "facebook won't let me log in",
      "facebook login problems",
      "facebook not working",
      "facebook sign in error",
      "facebook keeps saying wrong password",
    ],

    tldrAnswer:
      "When Facebook won't let you log in, the cause is almost always one of seven things, listed easiest to hardest: Caps Lock on, wrong password, account temporarily locked from too many wrong tries, browser cookie problem, expired Facebook session, missing two-factor code, or you landed on a fake login page. This guide checks all seven in order. Most people fix it by step 3.",

    heroIntro:
      "If Facebook keeps refusing your login, don't panic and don't keep trying the same thing 20 times in a row — that makes the problem worse. Walk through this checklist in order, slowly. Most issues clear up within 5 minutes.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [],

    textSteps: [
      {
        step: 1,
        title: "Check Caps Lock on your keyboard",
        detail: "Look at your keyboard's top right area for a small 'Caps Lock' light. If it's on, all your letters are typing as CAPITALS — and 'Rose1962' is different from 'rose1962' to Facebook. Press the Caps Lock key once to turn it off, then retype your password slowly.",
      },
      {
        step: 2,
        title: "Make sure you're on the real facebook.com",
        detail: "Look at the address bar at the top of your browser. The address must start with 'https://' and the domain must be exactly facebook.com (or fb.com). Anything else — facebook-login.com, facebok.com, facebook.support.com — is fake and will steal your password.",
        warning: "If you arrived at the login page by clicking a link in an email, text message, or search ad, close it and type facebook.com directly. Phishing pages look identical to real Facebook.",
      },
      {
        step: 3,
        title: "Wait 15 minutes if you've tried more than 5 times",
        detail: "Facebook temporarily locks accounts after multiple wrong-password attempts to protect you. The lock auto-clears in 15-60 minutes. Just wait — don't keep trying or the lock can extend to several hours.",
      },
      {
        step: 4,
        title: "Clear your browser cookies for Facebook",
        detail: "On Chrome: Settings → Privacy and security → Clear browsing data → check 'Cookies and other site data' → click Clear. On Edge or Safari: same idea, look for 'Clear cookies'. Then close the browser entirely, reopen it, go to facebook.com, and try logging in again.",
      },
      {
        step: 5,
        title: "Try a different web browser",
        detail: "If you usually use Edge, try Chrome or Firefox. If Chrome, try Edge. Sometimes a browser update breaks Facebook login temporarily — using a different browser works around it. All major browsers are free to download.",
      },
      {
        step: 6,
        title: "Try Incognito or Private browsing mode",
        detail: "Press Ctrl+Shift+N (Windows/Chrome) or Cmd+Shift+N (Mac) to open a Private window. Go to facebook.com and try logging in there. If it works in Private mode, the problem is a stored cookie or browser extension. Clear them in normal mode.",
      },
      {
        step: 7,
        title: "Use 'Forgotten password?' if certain the password is wrong",
        detail: "If you've tried slowly without Caps Lock from the real facebook.com and Facebook still says 'wrong password', either you genuinely don't remember it correctly or someone changed it (hacking). Click 'Forgotten password?' to reset. If you didn't change it yourself, also see our hacked-account guide.",
      },
    ],

    whatIfNotWork: [
      {
        problem: "Facebook says 'This browser is no longer supported'",
        cause: "Your browser is too old and Facebook blocked it for security.",
        fix: "Update your browser. On Windows: open Edge → menu → Help and feedback → About Microsoft Edge — it auto-updates. On Mac: Apple menu → System Preferences → Software Update for Safari. Or download Chrome free from google.com/chrome.",
      },
      {
        problem: "Facebook keeps showing 'security check' or CAPTCHA puzzles",
        cause: "Facebook is suspicious of activity from your network — sometimes triggered by a virus on shared Wi-Fi.",
        fix: "Try from a different network — switch from Wi-Fi to your phone's cellular data, or vice versa. If the problem only happens on home Wi-Fi, run an antivirus scan on your computer (Windows Defender is free and built in).",
      },
      {
        problem: "Login works but Facebook immediately logs me back out",
        cause: "Browser is set to delete cookies on close, or a privacy extension is blocking Facebook.",
        fix: "Settings → Privacy → 'Clear cookies on exit' should be OFF for facebook.com. Disable any ad-blocker or privacy extensions on facebook.com to test. Add facebook.com as an exception if needed.",
      },
      {
        problem: "I get a 6-digit code but Facebook says 'code expired' or 'wrong code'",
        cause: "Codes expire in 10 minutes. You may also be using an old code from a previous attempt.",
        fix: "Click 'Send new code'. Use only the most recent code. Enter it within 10 minutes of receiving it. If multiple codes arrived, only the latest one works.",
      },
    ],

    faqs: [
      {
        q: "Why does Facebook say my password is wrong when I'm sure it's right?",
        a: "Three most common causes: (1) Caps Lock is on (passwords are case-sensitive), (2) you have multiple Facebook accounts and are using the wrong one's password, or (3) someone hacked the account and changed the password. Try slowly retyping with Caps Lock off first; if certain it's correct, your account may be hacked — see our hacked-account guide.",
      },
      {
        q: "How long does Facebook lock me out for too many wrong attempts?",
        a: "Usually 15-60 minutes for the first lockout, longer (up to 24 hours) if you keep trying. If locked out, simply wait — don't try again — for at least an hour. Then try once carefully. If still locked, click 'Forgotten password?' to reset rather than continuing to guess.",
      },
      {
        q: "Why does Facebook keep asking me to verify my identity?",
        a: "Facebook flags logins as 'unusual' when they don't match your normal pattern — different device, network, location, browser, or after a long absence. To stop the prompts: log in once from your usual home computer on home Wi-Fi, and check 'Save this device' if offered.",
      },
      {
        q: "Can a virus on my computer prevent Facebook login?",
        a: "Yes — some malware blocks access to social media to hide from antivirus updates, or redirects you to fake Facebook pages. Symptoms: Facebook loads but the login page is broken, redirects to weird pages, or asks for things real Facebook doesn't ask for. Run Windows Defender (free, built in) for a full scan.",
      },
      {
        q: "What if Facebook says 'There was a problem with your request'?",
        a: "Usually a temporary Facebook outage. Check downdetector.com for 'Facebook' to see if it's affecting many people. If yes, wait 30-60 minutes. If only you, clear browser cookies, try a different browser, then a different device.",
      },
      {
        q: "Why does the Facebook app on my phone work but the website doesn't?",
        a: "Browser problem on your computer, not an account problem. The app uses different code than the website. Clear cookies on the computer browser, update the browser, or switch browsers. Your account is fine.",
      },
      {
        q: "Is it normal for Facebook to ask for my password again randomly?",
        a: "Yes — Facebook periodically asks for re-authentication on trusted devices, after major account changes, or after long inactivity. It's a security feature. Just type your password and continue.",
      },
      {
        q: "What if I think my Facebook account was hacked?",
        a: "If your password truly doesn't work and you didn't change it yourself, treat it as hacked. Go to facebook.com/hacked and follow our hacked-account guide. The faster you act, the more recoverable the account is.",
      },
    ],

    relatedSlugs: ["facebook-forgot-password", "facebook-hacked-account", "facebook-login", "facebook-two-factor"],
    toolsRequired: ["A web browser", "Your Facebook password", "Patience between attempts"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 7. /how-to/facebook-two-factor
  // Target: "facebook two factor not working" + 2FA setup
  // ─────────────────────────────────────────────────────────────────

  "facebook-two-factor": {
    slug: "facebook-two-factor",
    pageType: "guide",
    category: "security",
    primaryQuery: "facebook two factor authentication",
    alternateQueries: [
      "facebook two factor authentication",
      "facebook 2fa not working",
      "facebook code not working",
      "facebook authentication code",
      "set up facebook 2fa",
      "facebook security code",
      "facebook login code",
      "turn on two factor facebook",
    ],
    searchVolume: "89,000/mo (US)",
    difficulty: "Medium",
    difficultyLabel: "One-time setup",
    estimatedTime: "5 minutes",

    metaTitle: "Facebook Two-Factor Authentication — Setup and Help (2026)",
    metaDescription:
      "Turn on Facebook two-factor security or fix code problems. Senior-friendly walkthrough with practice mode. Free phone help at 347-953-1531.",
    h1: "Facebook Two-Factor Authentication — Setup and Fixes",
    primaryKeywords: [
      "facebook two factor authentication",
      "facebook 2fa",
      "facebook code not working",
      "facebook authentication code not received",
      "set up facebook two factor",
      "turn on facebook 2fa",
    ],

    tldrAnswer:
      "Two-factor authentication on Facebook adds a second step beyond your password — usually a 6-digit code sent to your phone — so even if a hacker steals your password they can't get in. Turn it on at Settings → Password and security → Use two-factor authentication. Pick text message (easiest) or authenticator app (more secure). If you're getting locked out by a 2FA code that's not arriving, click 'Need another way to authenticate?' on the login screen to use a backup method or recovery code.",

    heroIntro:
      "Two-factor authentication (Facebook calls it 'two-step authentication' too) is the single best protection against account hacking. It takes 5 minutes to set up and saves countless headaches later. This guide covers both setup AND what to do if a code isn't arriving.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",

    walkthrough: [
      {
        step: 1,
        title: "Step 1 — Go to Settings → Password and security",
        caption: "Click the down arrow at the top right, then Settings & Privacy, then Settings",
        body: { kind: "fb-privacy-settings" },
        arrowTarget: "security-link",
        tooltipText: "Click 'Password and security'",
      },
      {
        step: 2,
        title: "Step 2 — Click 'Use two-factor authentication'",
        caption: "It's near the top of the security section",
        body: { kind: "fb-2fa-setup" },
        arrowTarget: "enable-btn",
        tooltipText: "Click here",
      },
      {
        step: 3,
        title: "Step 3 — Pick a method (text message is easiest)",
        caption: "Authenticator app is more secure, but text message is fine for most seniors",
        body: { kind: "fb-recovery-options", emailHint: "(text message)", phoneHint: "(authenticator app)" },
        arrowTarget: "first-option",
        tooltipText: "Pick text message",
      },
      {
        step: 4,
        title: "Step 4 — Enter the code Facebook sends to confirm",
        caption: "Facebook sends a one-time code to confirm the setup worked",
        body: { kind: "fb-code-entry", method: "sms" },
        arrowTarget: "code-input",
        tooltipText: "Type the 6 digits",
      },
      {
        step: 5,
        title: "Step 5 — Save your recovery codes",
        caption: "These let you in if you lose your phone — write them on paper",
        body: { kind: "fb-2fa-setup" },
        arrowTarget: "codes-display",
        tooltipText: "Write these down NOW",
        warningNote: "These codes are the ONLY way back in if you lose your phone. Print them or write them on paper kept in a safe place.",
      },
    ],

    textSteps: [
      {
        step: 1,
        title: "Log in to Facebook on a computer or phone",
        detail: "Go to facebook.com and log in. Two-factor setup is the same on computer and phone, but the computer is usually easier because you can save the recovery codes more easily.",
      },
      {
        step: 2,
        title: "Open Settings & Privacy → Settings",
        detail: "On a computer: click the small down arrow in the very top-right corner. A menu drops down. Click 'Settings & Privacy', then 'Settings'. On a phone: tap the three horizontal lines (menu) at the bottom-right, scroll down, tap 'Settings & Privacy', then 'Settings'.",
      },
      {
        step: 3,
        title: "Click 'Password and security'",
        detail: "On the Settings page, look at the menu on the left (computer) or the list (phone). Click 'Password and security'. This is sometimes called 'Security and login'.",
      },
      {
        step: 4,
        title: "Click 'Use two-factor authentication'",
        detail: "Scroll down to 'Two-factor authentication' and click 'Use two-factor authentication'. Facebook may ask you to type your password again to confirm — type it.",
      },
      {
        step: 5,
        title: "Pick text message (easiest) or authenticator app (most secure)",
        detail: "Text message: Facebook sends a 6-digit code to your phone every time you log in from a new device. Easy and reliable. Authenticator app: install Google Authenticator or Microsoft Authenticator on your phone — more secure because phone-number theft can bypass text. Pick whichever feels comfortable.",
        warning: "If your phone number changes (new carrier, new number), update Facebook BEFORE getting rid of the old number — otherwise you'll be locked out the next time 2FA triggers.",
      },
      {
        step: 6,
        title: "Confirm your phone number",
        detail: "Facebook sends a 6-digit code to confirm your phone is correct. Open your text messages, find the code from Facebook, and type it in. Click Continue.",
      },
      {
        step: 7,
        title: "Save your recovery codes — this step is critical",
        detail: "Facebook gives you 10 recovery codes. Each is a one-time use code that lets you in if you lose your phone. Print the page, write them on paper, or save in a password manager. Keep the paper in a safe place at home.",
        warning: "If you lose your phone AND don't have recovery codes, you may permanently lose access. The codes are the only safety net.",
      },
      {
        step: 8,
        title: "Test by logging out and back in",
        detail: "Sign out of Facebook completely. Log back in. Facebook should now ask for a 6-digit code in addition to the password. Confirm it works as expected, then you're set.",
      },
    ],

    whatIfNotWork: [
      {
        problem: "I'm not getting the 6-digit text code when logging in",
        cause: "Wrong phone number on file, weak signal, carrier blocking, or you're entering an old code.",
        fix: "Click 'Send new code' for a fresh one. If still nothing in 5 minutes, check the partial phone number Facebook shows — make sure it matches your current phone. If it's an old number, click 'Need another way to authenticate?' and use a recovery code instead.",
      },
      {
        problem: "I changed phones and the authenticator app is on the old phone",
        cause: "Authenticator app codes are tied to the device — switching phones doesn't transfer them automatically.",
        fix: "If you saved recovery codes when you set up 2FA, use one of those to log in. Once in, go to Settings → Password and security → Two-factor authentication and re-set up the authenticator on your new phone.",
      },
      {
        problem: "I lost my phone and never wrote down recovery codes",
        cause: "Phone is the only place codes can arrive, and there's no backup.",
        fix: "Try logging in from a 'trusted' device — a computer or tablet you've used before. Facebook sometimes lets trusted devices skip 2FA. If that fails, use facebook.com/login/identify and request ID-upload recovery — see our 'Recover My Facebook Account' guide.",
      },
      {
        problem: "Facebook keeps asking for a code even on devices I've used before",
        cause: "Browser cookies cleared, you're using Incognito mode, or you didn't check 'Save this device' last time.",
        fix: "Next time you log in successfully, check 'Save this device' (or 'Don't ask for a code again on this device'). Don't use Incognito mode for daily Facebook use — it deletes the trusted-device flag every session.",
      },
    ],

    faqs: [
      {
        q: "Is two-factor authentication really worth the extra step every time?",
        a: "Yes, for most accounts. Once set up, 2FA only triggers on NEW devices — your usual computer and phone won't ask for a code every time, only when you log in somewhere new. The extra 30 seconds occasionally is worth it: 2FA stops 99% of password-theft attacks. It's the most important security step you can take.",
      },
      {
        q: "Should seniors use text message 2FA or an authenticator app?",
        a: "For most seniors, text message is fine and easier to understand. Authenticator apps (Google Authenticator, Microsoft Authenticator) are technically more secure because phone numbers can be stolen via 'SIM swap' attacks — but those are rare. Pick whichever you'll actually keep set up. The worst 2FA is the one you turn off because it's confusing.",
      },
      {
        q: "What's a recovery code and where do I find it?",
        a: "Recovery codes are 10 one-time backup codes Facebook gives you when setting up 2FA. Each one logs you in once if you lose your phone. Find them at Settings → Password and security → Two-factor authentication → Recovery codes. Print or write down — keep paper at home in a safe spot.",
      },
      {
        q: "Will 2FA prevent ALL hacking?",
        a: "It prevents about 99% of password-theft hacks because the hacker would also need your phone or recovery codes. The remaining 1% is sophisticated 'phishing' that tricks you into typing the code into a fake site, or 'SIM swap' that steals your phone number. To prevent those: never type a 2FA code into a page you didn't navigate to yourself, and call your phone carrier to set a SIM PIN.",
      },
      {
        q: "Does 2FA cost money?",
        a: "No — 2FA on Facebook is completely free. Standard text message rates may apply if your phone plan charges per text (rare in 2026), but the codes themselves are free from Facebook. Authenticator apps are free downloads.",
      },
      {
        q: "Can I turn off 2FA later if I don't like it?",
        a: "Yes — Settings → Password and security → Two-factor authentication → Turn off. We don't recommend this; once on, the inconvenience is minimal and the security gain is huge. If you're frustrated by 2FA prompts, the cause is usually browser cookies — fixing that is better than turning off 2FA.",
      },
      {
        q: "What if I share my Facebook with my spouse?",
        a: "Both spouses should be reachable on the phone number used for 2FA, or both should have access to the recovery codes. Don't share Facebook accounts ideally — two free accounts is safer. If you must share, use a phone number you both can answer, and keep recovery codes in a place you both know.",
      },
      {
        q: "What's the difference between 2FA and a password?",
        a: "Password = something you KNOW. 2FA = something you HAVE (your phone). Together they form 'two factors'. A hacker who steals your password (knowledge) still can't log in without your phone (possession). That's why 2FA stops most attacks even when passwords are leaked online.",
      },
    ],

    relatedSlugs: ["facebook-login", "facebook-hacked-account", "facebook-recover-account", "facebook-forgot-password"],
    toolsRequired: ["Your Facebook password", "Your phone (for text codes)", "OR an authenticator app", "Paper to save recovery codes"],
  },



  // ─────────────────────────────────────────────────────────────────
  // 8. /how-to/facebook-friend-requests
  // Target: "fake friend requests on facebook"
  // ─────────────────────────────────────────────────────────────────

  "facebook-friend-requests": {
    slug: "facebook-friend-requests",
    pageType: "guide",
    category: "scams",
    primaryQuery: "fake friend requests on facebook",
    alternateQueries: [
      "fake friend requests on facebook",
      "facebook fake friend request",
      "friend request from someone i'm already friends with",
      "duplicate friend request facebook",
      "cloned facebook account",
      "how to spot fake facebook friends",
      "report fake facebook profile",
      "delete friend request facebook",
    ],
    searchVolume: "67,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "5-minute fix",
    estimatedTime: "3 to 5 minutes",
    metaTitle: "Fake Friend Requests on Facebook — Spot, Report, Block (2026)",
    metaDescription: "Senior guide to fake Facebook friend requests. Learn the cloned-account scam, how to spot it, report it, and block. Free help at 347-953-1531.",
    h1: "Why Am I Getting Friend Requests From People Already on My List?",
    primaryKeywords: ["fake friend requests on facebook","duplicate friend request facebook","facebook cloned account","fake facebook profile","report fake facebook account","delete fake friend request"],
    tldrAnswer: "Getting a friend request from someone already on your friends list is a 'cloned account' scam. A scammer copied your real friend's photo and name to make a fake profile, then sent you a request hoping you'll accept and trust their next message. Don't accept and don't delete the request. Click on the fake profile, click the three dots, click 'Find support or report profile', and pick 'Pretending to be someone'. Then tell your real friend so they can warn others. Never click links or send money in response to messages from a 'friend' you just re-added.",
    heroIntro: "If you've gotten a Facebook friend request from someone who's already in your friends list, you didn't accidentally unfriend them — their account was cloned by a scammer. This is the most common scam targeting seniors on Facebook. Here's how to spot it, report it, and protect everyone.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    walkthrough: [
      { step: 1, title: "Step 1 — Don't accept yet, examine the profile", caption: "Click their name to view the fake profile", body: { kind: "fb-friend-request", scenarioType: "fake-clone" }, arrowTarget: "profile-name", tooltipText: "Click the name to inspect" },
      { step: 2, title: "Step 2 — Check the giveaway signs", caption: "Few or no posts, recent creation date, only profile photo of your real friend", body: { kind: "fb-friend-request", scenarioType: "fake-clone" }, arrowTarget: "joined-date", tooltipText: "Notice 'Joined recently'" },
      { step: 3, title: "Step 3 — Click the three dots, then 'Report profile'", caption: "Pick 'Pretending to be someone' as the reason", body: { kind: "fb-block-menu" }, arrowTarget: "report-option", tooltipText: "Click Report Profile" },
      { step: 4, title: "Step 4 — Block them too", caption: "Blocking stops them from seeing your account at all", body: { kind: "fb-block-menu" }, arrowTarget: "block-option", tooltipText: "Then click Block" },
      { step: 5, title: "Step 5 — Tell your real friend", caption: "Call or text them outside Facebook so they can warn other friends", body: { kind: "fb-feed", userName: "Your Name" }, arrowTarget: "none", tooltipText: "Done!" },
    ],
    textSteps: [
      { step: 1, title: "Pause — don't accept and don't delete the request yet", detail: "If a friend request comes from someone who looks like a current friend, take a breath. The scam works by getting you to accept first and ask questions later. We're going to verify before doing either." },
      { step: 2, title: "Click on the requester's name to view their profile", detail: "Don't click 'Confirm' yet. Click the person's name (in the friend request) to open their profile. You're going to look for clues that it's fake." },
      { step: 3, title: "Check the 'Joined Facebook' date", detail: "Click 'About' or 'Intro' on their profile. Look for when they joined Facebook. A real long-time friend has been on Facebook for years. A fake clone usually shows 'Joined recently' (last few weeks)." },
      { step: 4, title: "Look at how many posts they have", detail: "Real accounts have years of posts, photos, and check-ins. Fake clones have just the profile photo and maybe 1-2 posts. If their timeline is empty, it's a clone." },
      { step: 5, title: "Search for your real friend by name", detail: "In Facebook's search bar at the top, type your real friend's name. You should still see the original real account in your friends list. If both the real one AND the new request show up, you have a clone — the request is fake." },
      { step: 6, title: "Click the three dots on the fake profile and pick 'Find support or report profile'", detail: "On the fake profile page, click the three horizontal dots next to the message button. Click 'Find support or report profile'. When asked the reason, pick 'Pretending to be someone' → 'Me' or 'A friend' depending on whose photo they stole." },
      { step: 7, title: "Block the fake account", detail: "After reporting, click the three dots again and pick 'Block'. This stops the fake account from seeing or contacting you. Confirm by clicking 'Block' on the warning popup." },
      { step: 8, title: "Tell your real friend by phone or text", detail: "Call or text your real friend OUTSIDE Facebook (don't message them on Facebook in case THEIR account is also compromised). Tell them their profile was cloned so they can warn other friends.", warning: "Never call any phone number you find in a Facebook message claiming to be 'Facebook security'. Meta has no phone support — those are all scams." },
    ],
    whatIfNotWork: [
      { problem: "I already accepted the fake friend request before realizing", cause: "The scam works by getting you to accept first.", fix: "Go to the fake account's profile, click 'Friends' button, then 'Unfriend'. Then click the three dots and 'Block'. If you sent them any photos or messages, they have copies — but they can't see future activity. If they messaged you asking for money, ignore it." },
      { problem: "The fake account messaged me asking for money 'in an emergency'", cause: "Classic 'grandparent scam' — they pretend a real friend or grandchild is in trouble and needs money fast.", fix: "Do not send money. Call the real person's phone number directly. Real emergencies don't get fixed by Facebook gift card requests, wire transfers to a stranger, or sending Bitcoin. If they pressure you, that's the scam — real friends and family understand if you call to verify." },
      { problem: "Facebook didn't take action on my report", cause: "Facebook's report queue is huge; not every report is reviewed quickly.", fix: "Even if Facebook doesn't remove it, blocking protects you personally. Tell your real friend to also report it from their account — multiple reports are more likely to be acted on." },
      { problem: "I'm getting many fake requests every day", cause: "Your privacy settings allow 'public' or 'friends of friends' to send requests, plus your account may be on a scam list.", fix: "Go to Settings → Privacy → 'Who can send you friend requests?' and change to 'Friends of friends'. This stops random strangers but lets legitimate mutual connections still find you." },
    ],
    faqs: [
      { q: "Why do I keep getting friend requests from my own friends?", a: "Your friends' profiles are being cloned by scammers. The scammer copies your real friend's name and profile photo to create a fake new account, then sends you a friend request hoping you'll accept and assume your friend made a new account. The real friend's account is fine — but their public photos got stolen. After accepting, the scammer typically sends a 'help me, I'm in trouble' message to ask for money." },
      { q: "How do I tell a real friend request from a clone?", a: "Five signs of a clone: (1) you're already friends with the person — Facebook would normally show 'You're already friends', (2) the new account joined Facebook recently, (3) the new account has very few or no posts, (4) the only photo is your friend's profile picture (no other photos, no friends visible), (5) the person hasn't told you about a 'new account' before sending the request. If even 2 of these are true, it's a clone." },
      { q: "Should I delete the fake friend request or report it?", a: "Report it first, then block. Just deleting hides it from you but doesn't stop the scammer from cloning more friends. Reporting (especially from multiple people) increases the chance Facebook removes the fake account entirely. Reporting takes 30 extra seconds and protects others." },
      { q: "What is the 'cloned account' scam exactly?", a: "Scammer copies a real Facebook user's name and profile photo to create a fake account, then sends friend requests to the real user's friends. After being accepted, scammer messages with urgent financial requests ('I'm stuck overseas, send Western Union'), or sends phishing links, or impersonates Facebook security. Highly targeted at seniors who trust the apparent friend connection." },
      { q: "Can I prevent my own profile from being cloned?", a: "You can make it harder. Go to Settings → Privacy → 'Who can see your friends list?' set to 'Only Me'. Set 'Who can see your future posts?' to 'Friends'. Lock down your profile photo viewing if Facebook offers it in your region. Cloners need a public name+photo and a friends list to work — limiting visibility makes you a worse target." },
      { q: "If a 'friend' messages me from a new account asking for help, what should I do?", a: "Call them directly on the phone you have for them. Do not respond to the Facebook message. Real emergencies are reachable by phone. If their phone is 'lost' or 'broken' according to the Facebook message, that's the scam — they want to keep the conversation in Facebook where they can lie. Always verify with a second channel." },
      { q: "Why doesn't Facebook automatically detect cloned accounts?", a: "Facebook does delete millions of fake accounts, but the volume is enormous (thousands created per minute) and clones are designed to look real. Reports from real users (you and your friend) are how Facebook's algorithm learns. The more people who report a clone, the faster it's removed." },
      { q: "Is it safe to call a number a 'Facebook security' message gives me?", a: "Absolutely not. Meta has zero phone support for personal accounts. Every phone number that appears in Facebook messages, posts, or search results claiming to be 'Facebook support' is a scam — almost always followed by remote-control software requests, gift card demands, or password theft. Real Facebook support is only at facebook.com/help." },
    ],
    relatedSlugs: ["facebook-block-someone", "facebook-scam-messages", "facebook-privacy-settings", "facebook-hacked-account"],
    toolsRequired: ["Access to your Facebook account", "Phone number of your real friend (to verify outside Facebook)"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 9. /how-to/facebook-block-someone
  // ─────────────────────────────────────────────────────────────────

  "facebook-block-someone": {
    slug: "facebook-block-someone",
    pageType: "guide",
    category: "privacy",
    primaryQuery: "how to block someone on facebook",
    alternateQueries: ["how to block someone on facebook","block facebook user","stop someone from messaging me on facebook","block facebook messages","remove someone from facebook","block ex on facebook","unblock facebook"],
    searchVolume: "165,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "Quick action",
    estimatedTime: "1 minute",
    metaTitle: "How to Block Someone on Facebook — Senior Step-by-Step (2026)",
    metaDescription: "Block someone on Facebook in 1 minute. Senior-friendly guide with practice mode, plus how to unblock if you change your mind. Call 347-953-1531 for free help.",
    h1: "How Do I Block Someone on Facebook?",
    primaryKeywords: ["how to block someone on facebook","block someone on facebook","block on facebook","facebook block","how to unblock on facebook","stop messages facebook"],
    tldrAnswer: "To block someone on Facebook: go to their profile, click the three dots near their name (or tap the three dots on the top right of their profile on mobile), and click 'Block'. Confirm by clicking 'Block' again on the popup. They can no longer see your profile, send you messages, tag you, or find you in search. To unblock later: Settings → Blocking → click 'Unblock' next to their name. Blocking is private — Facebook does not tell them.",
    heroIntro: "Blocking on Facebook is the strongest privacy tool you have. Once blocked, that person essentially can't see you exist on Facebook — no profile, no posts, no messages, no tags. This guide shows exactly how to do it (and how to undo if needed).",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    walkthrough: [
      { step: 1, title: "Step 1 — Go to the person's profile", caption: "Search their name in the top Facebook search bar, or click their name in any post", body: { kind: "fb-feed", userName: "Your Name" }, arrowTarget: "search-bar", tooltipText: "Search their name here" },
      { step: 2, title: "Step 2 — Click the three dots near their name", caption: "On their profile page, look for the three horizontal dots next to the message button", body: { kind: "fb-block-menu" }, arrowTarget: "menu-button", tooltipText: "Click the three dots" },
      { step: 3, title: "Step 3 — Click 'Block'", caption: "It's near the bottom of the menu", body: { kind: "fb-block-menu" }, arrowTarget: "block-option", tooltipText: "Click Block" },
      { step: 4, title: "Step 4 — Confirm 'Block'", caption: "Facebook asks if you're sure — click Block one more time", body: { kind: "fb-block-menu" }, arrowTarget: "confirm-btn", tooltipText: "Click Confirm Block" },
      { step: 5, title: "Step 5 — Done — they can no longer reach you", caption: "Blocking is private. Facebook never tells them you blocked them.", body: { kind: "fb-feed", userName: "Your Name" }, arrowTarget: "none", tooltipText: "All done!" },
    ],
    textSteps: [
      { step: 1, title: "Find the person's profile", detail: "Use Facebook's search bar at the very top — type their name. Click on their profile from the search results. Or, if they messaged you or commented on a post, click their name to open their profile." },
      { step: 2, title: "Look for the three dots near their name", detail: "On a computer: their profile shows their cover photo at top with their name underneath. Look for a 'message' button — next to it is a button with three horizontal dots (•••). Click the three dots. On a phone: tap their profile, look for three dots at the top right of the screen." },
      { step: 3, title: "Click 'Block'", detail: "A menu drops down with several options. Scroll down (if needed) and click 'Block'. The option may also say 'Block [name]'." },
      { step: 4, title: "Confirm by clicking 'Block' again", detail: "Facebook shows a confirmation popup explaining what blocking does. Read it (briefly) and click 'Block' to confirm. The block takes effect immediately." },
      { step: 5, title: "What blocking does", detail: "Once blocked, the person cannot: see your profile or posts, send you messages, find you in Facebook search, tag you in posts or photos, or invite you to events. They are removed as your friend automatically. They are NOT notified that you blocked them." },
      { step: 6, title: "If you change your mind — how to unblock", detail: "Go to Settings → Blocking. You'll see a list of everyone you've blocked. Click 'Unblock' next to their name. Facebook makes you wait 48 hours after unblocking before you can re-block the same person — this is to prevent on-and-off harassment." },
    ],
    whatIfNotWork: [
      { problem: "I don't see a 'Block' option on their profile", cause: "Either you're already blocked by them (rare reverse), or they have very strict privacy settings, or you're in Facebook Lite which has a different menu.", fix: "Try from a regular browser (facebook.com on Chrome or Edge) instead of the app. Or use Settings → Blocking → 'Block users' and type their full name." },
      { problem: "After blocking, they're still messaging me", cause: "They may have a second Facebook account, or they're using a different platform you're connected on.", fix: "Block the second account too. Check Messenger separately — sometimes Messenger blocks differently from main Facebook. If they're contacting from outside Facebook (text, email), block at those services." },
      { problem: "I want to block someone but they're not on my friends list", cause: "You're not friends, but you can still block any account.", fix: "Settings → Blocking → in the 'Block users' box, type their full name (or email/phone if you know it). Facebook shows matching accounts. Click 'Block' next to the right one." },
      { problem: "I blocked someone but their old comments still show on my posts", cause: "Blocking removes future interaction but doesn't delete comments they made before the block.", fix: "Go to those old posts, hover over their comments, click the three dots → Delete. You can also use Settings → Activity log → filter by 'Comments' to find and remove old interactions." },
    ],
    faqs: [
      { q: "Will Facebook tell the person I blocked them?", a: "No. Facebook never sends a notification or message that you blocked someone. They will simply find that they can no longer see your profile or message you — they have to figure it out from those clues. Most people don't notice for weeks or months unless they're actively trying to contact you." },
      { q: "Can a blocked person see my old comments on a mutual friend's post?", a: "Sometimes — if they go to the mutual friend's profile and see a post you commented on, your comment may still appear (depending on the friend's privacy settings). Future comments and posts are hidden from them, but historical content on third-party profiles is harder to fully hide." },
      { q: "What's the difference between blocking and unfriending?", a: "Unfriending removes the friend connection but they can still see your public posts, send friend requests again, and message you. Blocking is much stronger — they can't see you at all, can't message, can't friend-request, can't tag you. Block when there's harassment or scam concerns. Unfriend when you just want distance from someone you don't dislike." },
      { q: "Can I block someone temporarily?", a: "Sort of. There's no 'timed block' on Facebook, but there is a 'snooze for 30 days' option that hides their posts from your feed without blocking them. From any of their posts, click the three dots → 'Snooze [name] for 30 days'. After 30 days, their posts reappear automatically." },
      { q: "How many people can I block on Facebook?", a: "There's no hard limit, but Facebook may slow down processing if you block hundreds at once. For most users, blocking dozens of people over years is no problem. Use Settings → Blocking to see your full block list." },
      { q: "If I block someone and we have mutual friends, can they still see my activity?", a: "If your privacy is set to 'Friends only' for posts, they cannot see them — even on a mutual friend's profile, your posts won't show to them. If your posts are 'Public', they could view them by signing out and visiting your profile (since blocking applies to logged-in account, not anonymous viewing). For full privacy, set posts to 'Friends only'." },
      { q: "Can I block a Facebook Page or Group instead of a person?", a: "Pages can be 'unliked' or 'unfollowed' so their posts stop appearing — Settings → Pages → unfollow. Groups can be 'left' from the group's main page → 'Leave Group'. There's also Settings → Blocking → Block messages from Pages, which stops Pages from sending you messages." },
      { q: "What happens if a blocked person creates a new account to contact me?", a: "If they create a new account, they're effectively unblocked because Facebook doesn't know it's the same person. If they message you from the new account, block that one too. If it's harassment using multiple accounts, report each as 'Pretending to be someone' or 'Harassment' so Facebook can take action against the person." },
    ],
    relatedSlugs: ["facebook-friend-requests", "facebook-privacy-settings", "facebook-scam-messages", "facebook-help"],
    toolsRequired: ["Access to your Facebook account", "The full name or profile of the person to block"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 10. /how-to/facebook-privacy-settings
  // ─────────────────────────────────────────────────────────────────

  "facebook-privacy-settings": {
    slug: "facebook-privacy-settings",
    pageType: "guide",
    category: "privacy",
    primaryQuery: "how to make facebook private",
    alternateQueries: ["how to make facebook private","facebook privacy settings for seniors","make my facebook private","facebook profile private","hide my facebook from strangers","facebook privacy","who can see my facebook posts","private facebook account"],
    searchVolume: "82,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "10-minute setup",
    estimatedTime: "10 minutes",
    metaTitle: "How to Make Your Facebook Private — Senior Privacy Guide (2026)",
    metaDescription: "Make Facebook private in 10 minutes. Senior-friendly walkthrough of every privacy setting that matters. Practice mode included. Free help: 347-953-1531.",
    h1: "How Do I Make My Facebook Private?",
    primaryKeywords: ["how to make facebook private","facebook privacy settings","make my facebook private","private facebook profile","facebook privacy seniors","hide facebook from strangers"],
    tldrAnswer: "To make Facebook private: go to Settings → Privacy. Set 'Who can see your future posts?' to Friends. Set 'Who can send you friend requests?' to Friends of friends. Set 'Who can look you up using the email address you provided?' and 'phone number' both to Friends. Then go to Privacy → 'Limit Past Posts' and click 'Limit Old Posts' to apply the same Friends-only setting to everything you posted before. Total time: 10 minutes. Privacy settings save automatically as you change them.",
    heroIntro: "Strangers on Facebook can see a lot more than most seniors realize — your old posts, your friends list, photos you're tagged in. This guide walks through every setting that matters in plain English. After 10 minutes, only the people you choose will see your activity.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    walkthrough: [
      { step: 1, title: "Step 1 — Open Settings & Privacy → Settings", caption: "Click the down arrow at the top right of Facebook", body: { kind: "fb-feed", userName: "Your Name" }, arrowTarget: "menu-arrow", tooltipText: "Click here" },
      { step: 2, title: "Step 2 — Click 'Privacy' on the left", caption: "It's between Account and Security in the menu", body: { kind: "fb-privacy-settings" }, arrowTarget: "privacy-link", tooltipText: "Click Privacy" },
      { step: 3, title: "Step 3 — Set posts to 'Friends'", caption: "Click 'Edit' next to 'Who can see your future posts?' and pick Friends", body: { kind: "fb-privacy-settings" }, arrowTarget: "posts-setting", tooltipText: "Pick Friends" },
      { step: 4, title: "Step 4 — Limit who can find you", caption: "Set both email and phone lookup to Friends only", body: { kind: "fb-privacy-settings" }, arrowTarget: "lookup-setting", tooltipText: "Change to Friends" },
      { step: 5, title: "Step 5 — Click 'Limit Past Posts'", caption: "This applies your new privacy to everything you posted before", body: { kind: "fb-privacy-settings" }, arrowTarget: "limit-past", tooltipText: "Click here", warningNote: "This is the most important step — without it, all your old public posts stay public." },
    ],
    textSteps: [
      { step: 1, title: "Open Facebook on a computer (easier than phone for this)", detail: "Privacy settings are easier to manage on a computer because everything fits on one screen. Go to facebook.com and log in." },
      { step: 2, title: "Click the down arrow → Settings & Privacy → Settings", detail: "In the very top-right corner of Facebook, click the small down arrow. A menu appears. Click 'Settings & Privacy', then 'Settings'. The Settings page opens with a menu on the left side." },
      { step: 3, title: "Click 'Privacy' in the left menu", detail: "On the left side of the Settings page, click 'Privacy'. The right side fills with privacy settings — there are about 8 important ones we'll change." },
      { step: 4, title: "Set 'Who can see your future posts?' to Friends", detail: "First setting on the page. Click 'Edit' next to it, click the dropdown, pick 'Friends'. This means new posts only show to your friends — not the public." },
      { step: 5, title: "Set 'Who can send you friend requests?' to Friends of friends", detail: "Click Edit next to it, change from 'Everyone' to 'Friends of friends'. This stops random strangers from sending requests, but legitimate mutual contacts still work." },
      { step: 6, title: "Set both email and phone lookup to Friends", detail: "'Who can look you up using the email address you provided?' and 'phone number?' both default to 'Everyone'. Change both to 'Friends'. This stops strangers from finding your profile by typing your email or phone number." },
      { step: 7, title: "Click 'Limit Past Posts'", detail: "On the same Privacy page, look for 'Limit who can see past posts'. Click it. Click 'Limit Past Posts'. Confirm. This applies your new 'Friends only' setting to everything you've ever posted on Facebook.", warning: "If you skip this step, every post you ever made publicly stays public forever — friends-only setting only affects FUTURE posts unless you do this." },
      { step: 8, title: "Hide your friends list", detail: "Go to your profile → Friends tab. Click the pencil/edit icon → Edit Privacy. Set 'Friends List' to 'Only me'. Hidden friends list makes you a much worse target for cloned-account scams (because cloners need to see who to friend-request)." },
      { step: 9, title: "Turn on 'Profile review' for tagged photos", detail: "Settings → Profile and Tagging. Turn ON 'Review tags people add to your posts before the tags appear on Facebook?' Now anything someone tries to tag you in must be approved by you first." },
    ],
    whatIfNotWork: [
      { problem: "After changing settings, my old posts are still showing publicly", cause: "You skipped the 'Limit Past Posts' step.", fix: "Go to Settings → Privacy → 'Limit who can see past posts' → 'Limit Past Posts'. This is required to retroactively change visibility on old posts. May take a few minutes to apply across thousands of posts." },
      { problem: "I want to block strangers from seeing my profile photo", cause: "Profile photos are public by default in most regions.", fix: "Click your profile photo → 'Edit Profile Picture' → 'Edit Picture Privacy' if your region offers it (varies). Otherwise, the profile photo stays semi-public — but limit it by uploading a generic photo of a flower or pet instead of your face." },
      { problem: "I made it private but my profile still shows in Google search", cause: "Search engines cache old public versions.", fix: "Settings → Privacy → 'Do you want search engines outside of Facebook to link to your profile?' set to OFF. Google's cache will update over weeks." },
      { problem: "Some settings are missing on the phone app", cause: "Mobile app doesn't show every setting — desktop browser shows the full list.", fix: "Use a computer to set up privacy. Open facebook.com in a browser even if you mostly use the app — settings sync across all devices automatically." },
    ],
    faqs: [
      { q: "Can I make my Facebook completely invisible to strangers?", a: "Mostly, yes — but not 100%. Strangers can always see your name, profile photo (in most cases), and gender. Everything else (posts, photos, friends, location, work history, etc.) can be locked to friends-only with the right settings. The 8-step checklist in this guide gets you about 95% private." },
      { q: "Should I make my profile photo private too?", a: "If possible. Some regions support 'Profile Picture Guard' which prevents strangers from saving or screenshotting your profile photo. If your region doesn't have this, the next best step is to use a generic photo (flower, pet, scenery) as your profile picture — you avoid the cloned-account scam since cloners need a real face photo." },
      { q: "What is 'Friends of Friends' and is it private enough?", a: "'Friends of friends' means people who share at least one common friend with you. So if your friend has 500 friends, all 500 might be able to see what you set to 'Friends of friends'. For posts, this is usually too open — pick 'Friends' instead. For friend requests, 'Friends of friends' is a good middle ground." },
      { q: "Will making my Facebook private affect my Messenger?", a: "Not directly — Messenger has separate privacy settings. By default, Messenger lets anyone message you. To restrict: Messenger app → your photo → Privacy → 'Who can reach you' → set to 'Friends and Connections of yours'. Strangers' messages then go to a hidden 'Message Requests' folder that you can ignore." },
      { q: "Can I see what my profile looks like to strangers?", a: "Yes. Go to your profile, click the three dots near 'Edit profile', and click 'View as'. Facebook shows your profile exactly as a stranger would see it. Use this to verify your privacy settings are working — if you see any post or photo there, the public can see it." },
      { q: "How often should I check Facebook privacy settings?", a: "Every 6 months. Facebook periodically adds new types of data (face recognition, location history, etc.) — and often these default to ON. Set a calendar reminder twice a year to revisit Settings → Privacy and Settings → 'Your Facebook Information' to make sure nothing has been turned on without you knowing." },
      { q: "Does Facebook show my information to advertisers?", a: "Yes — for free Facebook accounts, advertising is how Facebook pays for the service. Settings → Ads → 'Ad preferences' lets you remove some interests and categories advertisers target. You cannot opt out of advertising entirely without deleting your account, but you can reduce data sharing significantly here." },
      { q: "What's Facebook's 'Off-Facebook Activity' and should I clear it?", a: "Off-Facebook Activity is data Facebook collects about you from OTHER apps and websites you use. It's how you see ads for things you searched on a different site. Settings → Your Facebook Information → Off-Facebook Activity → Clear History. Then turn OFF future activity. This significantly improves privacy without affecting how Facebook works for you." },
    ],
    relatedSlugs: ["facebook-block-someone", "facebook-friend-requests", "facebook-scam-messages", "facebook-help"],
    toolsRequired: ["A computer (easier than phone for privacy settings)", "Access to your Facebook account", "10 minutes"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 11. /how-to/facebook-delete-account
  // ─────────────────────────────────────────────────────────────────

  "facebook-delete-account": {
    slug: "facebook-delete-account",
    pageType: "guide",
    category: "privacy",
    primaryQuery: "how to delete facebook",
    alternateQueries: ["how to delete facebook","delete my facebook account","permanently delete facebook","deactivate vs delete facebook","remove facebook account","close facebook account","deactivate facebook"],
    searchVolume: "246,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "Reversible for 30 days",
    estimatedTime: "5 minutes (then 30 day wait)",
    metaTitle: "How to Delete Facebook Account — Permanent vs Deactivate (2026)",
    metaDescription: "Senior guide to deleting Facebook permanently or just deactivating. Step-by-step with practice mode. Save your photos first. Free help: 347-953-1531.",
    h1: "How Do I Delete My Facebook Account?",
    primaryKeywords: ["how to delete facebook","delete facebook account","deactivate facebook","permanently delete facebook","close facebook account","deactivate vs delete facebook"],
    tldrAnswer: "There are two ways to leave Facebook: Deactivate (temporary, reversible anytime by logging back in) or Delete (permanent after 30 days, photos and posts gone forever). To delete: download your photos and data first via Settings → Your Facebook Information → Download Your Information. Then go to Settings → Account Center → Personal details → Account ownership and control → Deactivation or deletion → pick 'Delete account'. Facebook waits 30 days before permanent deletion in case you change your mind.",
    heroIntro: "Leaving Facebook is your right — and the process is straightforward. The main thing is to save your photos and important messages BEFORE deleting, because they can't be recovered after 30 days. This guide covers both temporary deactivation and permanent deletion.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    walkthrough: [
      { step: 1, title: "Step 1 — First, download your photos and data", caption: "Settings → Your Facebook Information → Download Your Information", body: { kind: "fb-privacy-settings" }, arrowTarget: "download-link", tooltipText: "Click Download", warningNote: "Skip this step and you lose every photo, post, and message permanently." },
      { step: 2, title: "Step 2 — Open Account Center", caption: "Settings → Account Center on the left", body: { kind: "fb-privacy-settings" }, arrowTarget: "account-center", tooltipText: "Click Account Center" },
      { step: 3, title: "Step 3 — Click 'Personal details' → 'Account ownership and control'", caption: "Then click 'Deactivation or deletion'", body: { kind: "fb-delete-confirm" }, arrowTarget: "deactivation-link", tooltipText: "Click here" },
      { step: 4, title: "Step 4 — Pick 'Delete account' (or 'Deactivate' if temporary)", caption: "Deactivate is reversible anytime; Delete becomes permanent in 30 days", body: { kind: "fb-delete-confirm" }, arrowTarget: "delete-option", tooltipText: "Pick your option" },
      { step: 5, title: "Step 5 — Confirm with your password", caption: "Facebook asks one more time before starting the 30-day countdown", body: { kind: "fb-delete-confirm" }, arrowTarget: "confirm-btn", tooltipText: "Click Continue" },
    ],
    textSteps: [
      { step: 1, title: "Download your photos and data first", detail: "Settings → Your Facebook Information → Download Your Information. Pick what to download (Photos, Posts, Messages, Friends list at minimum). Click 'Request a download'. Facebook prepares the file and emails you when ready (usually 1-24 hours). Download the .zip file to your computer.", warning: "Don't skip this. Once deletion completes after 30 days, every photo, comment, message, and post is gone forever." },
      { step: 2, title: "Tell important contacts you're leaving", detail: "Post a message on your timeline a few days before deleting: 'I'm leaving Facebook on [date]. If we connect through Facebook only, please send me your phone number or email so we can stay in touch.' This way you don't lose contact with people you only know via Facebook." },
      { step: 3, title: "Decide: Deactivate or Delete?", detail: "DEACTIVATE: temporary. Profile is hidden but everything is preserved. Anytime you log back in, the account fully reappears. DELETE: permanent after 30 days. After 30 days everything is gone. Pick deactivate if you might come back; delete if you're sure." },
      { step: 4, title: "Open Settings & Privacy → Settings → Accounts Center", detail: "On a computer: top-right down arrow → Settings & Privacy → Settings → Account Center (left side). On a phone: tap menu (three lines) → Settings & Privacy → Settings → Account Center." },
      { step: 5, title: "Click 'Personal details' → 'Account ownership and control'", detail: "Inside Account Center, click 'Personal details', then 'Account ownership and control'. Then click 'Deactivation or deletion'." },
      { step: 6, title: "Pick the account and the action", detail: "Choose your Facebook account (if you have Instagram linked, both will show — pick just Facebook unless you want to delete both). Then choose 'Deactivate account' or 'Delete account'. Click 'Continue'." },
      { step: 7, title: "Read what's about to happen, then confirm with your password", detail: "Facebook explains exactly what will happen — for delete, that means 30 days then permanent removal. Type your password to confirm. Click 'Continue'." },
      { step: 8, title: "If you change your mind within 30 days", detail: "For 30 days after starting deletion, you can cancel by simply logging back in to Facebook with your password. Facebook will ask 'Are you sure?' and let you cancel deletion. After day 30, deletion is permanent and irreversible." },
    ],
    whatIfNotWork: [
      { problem: "I deleted Facebook but Messenger still works", cause: "Messenger uses your Facebook account behind the scenes — deleting Facebook should remove Messenger, but sometimes the app stays installed.", fix: "Uninstall Messenger from your phone. Sign out of Messenger on any computers. After Facebook deletion completes (day 30), Messenger access is fully gone." },
      { problem: "I need to recover photos after deleting", cause: "If you didn't download data first AND it's been more than 30 days, photos are permanently gone.", fix: "Within the first 30 days: log back in to cancel deletion, then download data, then redo deletion. After 30 days: photos are unrecoverable from Facebook itself, but check your phone's Photos app — many phones automatically saved copies." },
      { problem: "Facebook keeps emailing me even after I deleted", cause: "Other services connected to your Facebook account, or email subscriptions you signed up for through Facebook.", fix: "Click 'Unsubscribe' at the bottom of each email. Also check Settings → Notifications BEFORE deleting to turn them all off." },
      { problem: "I want to delete only specific posts/photos, not the whole account", cause: "You don't actually want to leave Facebook, just clean up.", fix: "Use Settings → Activity Log to scroll through everything you've ever posted, and delete individually. There's also a 'Manage Activity' tool that lets you delete in bulk by date range or topic." },
    ],
    faqs: [
      { q: "What's the difference between deactivating and deleting Facebook?", a: "Deactivating is temporary — your profile is hidden from everyone, but Facebook keeps all your photos, friends, messages, and posts. Logging back in any time fully restores everything. Deleting is permanent — after a 30-day waiting period, everything is removed forever. If you're not sure, deactivate first; you can always come back to delete later." },
      { q: "How long does Facebook take to actually delete my account?", a: "30 days from when you confirm deletion. During those 30 days, your account is hidden from other users but Facebook keeps all the data so you can change your mind. On day 31, Facebook starts permanent deletion which itself takes up to 90 days to fully remove from all backup systems. After ~120 days total, the account is fully gone." },
      { q: "Will my Messenger work after I delete Facebook?", a: "No. Messenger requires a Facebook account. When Facebook is deleted, Messenger stops working too. If you want to keep Messenger but leave Facebook, switch to Messenger-only mode (Settings → Account Center → Personal details → Manage info) which keeps the chat function but hides your Facebook profile." },
      { q: "Can I delete Facebook but keep Instagram?", a: "Yes. If your accounts are linked in Account Center, choose carefully when deleting — you can pick Facebook only, leaving Instagram active. Just make sure to use Instagram's own login (not 'Log in with Facebook') so you can still get in after Facebook is gone." },
      { q: "What happens to messages I sent to friends after I delete?", a: "Your friends keep their copies of your messages — Facebook only deletes the messages from YOUR side. Friends still see what you sent in their own message history, just with your name shown as 'Facebook User' instead of your full name." },
      { q: "Will my photos disappear from friends' tagged photos too?", a: "Tags of you are removed (your name no longer appears under the photo), but the photos themselves stay on whoever uploaded them. If a friend posted a photo of you 5 years ago, that photo stays on their account; only the tag connecting it to your name disappears." },
      { q: "Should I delete or just deactivate if I'm scared of identity theft?", a: "If you're worried about an immediate threat (your account is being hacked, stalker found you on Facebook), deactivate first — it instantly hides your profile. Then download your data, then proceed to delete. Deactivation is faster than the deletion process, so it's better as the immediate response." },
      { q: "Is there any way to leave Facebook without losing my photos?", a: "Yes — always. Use Settings → Your Facebook Information → Download Your Information BEFORE deleting. Pick at minimum 'Posts', 'Photos and Videos', and 'Messages'. You'll get a .zip file with everything in regular formats (JPG photos, .txt messages, .html posts). Save the file before starting deletion." },
    ],
    relatedSlugs: ["facebook-privacy-settings", "facebook-help", "facebook-hacked-account", "facebook-block-someone"],
    toolsRequired: ["Your Facebook password", "Time to download your data first", "30 days patience for permanent deletion"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 12. /how-to/facebook-scam-messages
  // ─────────────────────────────────────────────────────────────────

  "facebook-scam-messages": {
    slug: "facebook-scam-messages",
    pageType: "guide",
    category: "scams",
    primaryQuery: "facebook scam messages",
    alternateQueries: ["facebook scam messages","facebook scams to watch for","common facebook scams seniors","facebook phishing","fake facebook security message","facebook lottery scam","facebook prize winner scam","scam messages on facebook messenger"],
    searchVolume: "54,000/mo (US)",
    difficulty: "Easy",
    difficultyLabel: "Stay alert",
    estimatedTime: "10 minutes to read",
    metaTitle: "Facebook Scam Messages — How to Spot Them (Senior Guide 2026)",
    metaDescription: "Senior guide to the 7 most common Facebook scams in 2026. How to spot them, what to do, and how to report. Free help at 347-953-1531.",
    h1: "How Do I Spot Scam Messages on Facebook?",
    primaryKeywords: ["facebook scam messages","facebook scams","facebook phishing","facebook prize scam","fake facebook message","facebook security message scam","facebook scam seniors"],
    tldrAnswer: "The 7 most common Facebook scams targeting seniors in 2026 are: (1) cloned account 'I'm in trouble' messages from fake friends, (2) 'You won a prize' lottery scams, (3) fake Facebook security warnings asking you to log in, (4) romance scammers in Messenger, (5) fake livestream funeral scams, (6) cryptocurrency 'investment opportunity' scams, and (7) marketplace overpayment scams. Common warning signs in all: urgency, requests for money or gift cards, links to non-Facebook websites, and pressure to act fast. Real Facebook never asks for your password by message and has no phone support.",
    heroIntro: "Scammers target seniors on Facebook because they're often more trusting and less familiar with online tricks. The good news: most scams follow predictable patterns, and once you know the patterns, they're easy to spot. This guide covers the 7 most common scams in 2026.",
    lastUpdated: "2026-05-03",
    reviewedBy: "Trini System Senior Support Team",
    walkthrough: [
      { step: 1, title: "Pattern 1 — The 'cloned friend in trouble'", caption: "A friend you already know messages from a brand new account asking for money", body: { kind: "fb-suspicious-message", messageType: "fake-friend-help" }, arrowTarget: "message-body", tooltipText: "Notice: urgency + money + new account" },
      { step: 2, title: "Pattern 2 — 'You won a prize'", caption: "Random message claiming you won a lottery you never entered", body: { kind: "fb-suspicious-message", messageType: "prize-winner" }, arrowTarget: "message-body", tooltipText: "Real prizes don't require fees" },
      { step: 3, title: "Pattern 3 — Fake 'Facebook Security' warning", caption: "Looks official but Meta never asks for passwords by message", body: { kind: "fb-suspicious-message", messageType: "fake-security" }, arrowTarget: "message-body", tooltipText: "Real Facebook NEVER messages like this" },
    ],
    textSteps: [
      { step: 1, title: "Pattern 1 — Cloned friend asking for money", detail: "A new Facebook account using your friend's name and photo messages: 'I'm stuck overseas / in the hospital / had my wallet stolen — can you send $500 by Western Union?' The real friend is fine. The scammer cloned their profile. RESPONSE: don't send money. Call the real friend on their phone. Block and report the fake account.", warning: "This is the #1 scam targeting seniors. NEVER send money based on a Facebook message — always verify by phone first." },
      { step: 2, title: "Pattern 2 — Lottery or prize winner", detail: "Message says you won a Facebook lottery, a giveaway, or 'Mark Zuckerberg's special program for seniors'. To claim, you need to pay a 'small processing fee' or share bank details. RESPONSE: real prizes don't require fees. Facebook doesn't run senior giveaways. Block and report." },
      { step: 3, title: "Pattern 3 — Fake Facebook security warning", detail: "Message claims to be from 'Facebook Security Team' or 'Meta Support', warning your account is 'compromised' and demanding you click a link to verify. The link goes to a fake Facebook login page that steals your password. RESPONSE: real Facebook NEVER messages users about security. Real warnings appear inside Facebook's notification bell. Delete the message." },
      { step: 4, title: "Pattern 4 — Romance scam in Messenger", detail: "An attractive stranger sends a friend request, becomes very interested in you over weeks, then asks for money for an 'emergency' (medical bill, plane ticket to visit you, military deployment). RESPONSE: scammers use stolen photos and follow scripts. If they refuse video calls, ALWAYS ask for money, or tell you they're working overseas — it's a scam. Block, report, and never send money." },
      { step: 5, title: "Pattern 5 — Fake live funeral or livestream", detail: "Post claims a celebrity died and you can watch their funeral live by clicking a link. Or claims a friend's relative passed and the family is 'streaming the service'. The link is malware or a fake login page. RESPONSE: real funerals aren't streamed via Facebook posts to strangers. Don't click. Report the post as 'spam' or 'fraud'." },
      { step: 6, title: "Pattern 6 — Cryptocurrency or investment scam", detail: "A 'friend' or 'celebrity' messages about a 'guaranteed investment' in Bitcoin, Ethereum, or stocks. Often shows fake screenshots of huge profits. The real friend's account was hacked, or it's an impersonator. RESPONSE: never invest money based on a Facebook message. Talk to a licensed financial advisor before any investment." },
      { step: 7, title: "Pattern 7 — Marketplace overpayment scam", detail: "You're selling something on Facebook Marketplace. A buyer 'accidentally' sends a payment for too much and asks you to refund the difference. The original payment is fake/reversed; you lose the refund money. RESPONSE: only accept exact payments. Don't refund overpayments. Use payment methods Facebook recommends (in-person cash for local sales)." },
      { step: 8, title: "Universal warning signs in all Facebook scams", detail: "The four red flags in every scam: (1) URGENCY ('act now or lose it forever'), (2) SECRECY ('don't tell anyone'), (3) PAYMENT in unusual ways (gift cards, wire transfer, crypto), (4) PRESSURE to skip verifying with a phone call. If even one of these appears, treat the message as a scam. No real friend or company ever needs all four." },
    ],
    whatIfNotWork: [
      { problem: "I already sent money to a scammer", cause: "Scammers move fast and exploit emotional reactions.", fix: "Act immediately: (1) call your bank/credit card company about the charge, (2) report to the FTC at reportfraud.ftc.gov, (3) report to FBI's Internet Crime Center at ic3.gov, (4) report the Facebook account that scammed you so Facebook can ban it. If it was a wire transfer or gift card, recovery is hard but reporting prevents more victims." },
      { problem: "I clicked a suspicious link before realizing it was a scam", cause: "Phishing links can install malware or steal information.", fix: "Immediately change your Facebook password. Check Settings → Password and security → Where you're logged in — sign out unrecognized devices. Run an antivirus scan on your computer (Windows Defender works free). Watch your bank account for unusual charges over the next month." },
      { problem: "Scammer keeps creating new accounts to message me", cause: "Determined scammers create multiple accounts.", fix: "Block each one. Set Settings → Privacy → 'Who can send you friend requests?' to 'Friends of friends'. Set Messenger → Privacy → 'Who can reach you' to 'Friends and Connections of yours'. This puts unknown senders in a 'Message Requests' folder you can ignore." },
      { problem: "A real friend got scammed and is now sending me suspicious messages", cause: "Their account is hacked.", fix: "Don't click any links or respond to money requests. Call them on the phone (not Facebook) and tell them their account was hacked. Send them our 'My Facebook was hacked' guide." },
    ],
    faqs: [
      { q: "What is the most common Facebook scam targeting seniors?", a: "The cloned-account scam — by a wide margin. A scammer copies a real friend's profile photo and name to create a fake account, friend-requests you, then messages with an urgent money request like 'I'm in trouble overseas, please wire $500.' Targets seniors because we're more likely to want to help a friend in distress. Always verify with a phone call before sending any money." },
      { q: "Does Facebook ever message users about security issues?", a: "Real security warnings from Facebook appear in your notifications bell or as banners INSIDE Facebook — never as Messenger messages from random names. Anyone who messages you claiming to be 'Facebook Security' or 'Meta Support' is a scammer. Real Facebook never asks for your password, never threatens to delete your account by tomorrow, and never tells you to click a link to 'verify'." },
      { q: "Why do scammers target seniors on Facebook?", a: "Three reasons: (1) seniors generally have more savings, (2) seniors are more trusting of friend connections — exactly what cloned-account scams exploit, (3) seniors are less likely to know modern scam patterns or have cybersecurity training. None of this means seniors are at fault — these scams are designed by professional criminals to fool anyone. The fault is always the scammer's." },
      { q: "How do I report a scam message on Facebook?", a: "Open the message thread. Tap the person's name at the top to open their profile. Tap the three dots → 'Find support or report' → pick the matching reason ('Pretending to be someone', 'Scam', 'Fraud', etc.). Submit. Facebook reviews the report and may remove the account. Reporting also reduces the scammer's reach to other potential victims." },
      { q: "Can I get my money back if I sent it to a scammer?", a: "Sometimes — depends on payment method. Credit card: high recovery chance, dispute through your card company within 60 days. Bank transfer to a US bank: lower chance, contact your bank immediately. Wire transfer (Western Union, MoneyGram): very low recovery — file a fraud report with the company anyway. Gift cards: nearly impossible to recover — report to the gift card company and FTC. Crypto: essentially zero recovery." },
      { q: "Is it true that Facebook will pay seniors money for being on the platform?", a: "No — that's a scam claim. Facebook does not pay users for using Facebook. There is no 'senior compensation program', 'long-term user payout', or 'Mark Zuckerberg gives money to seniors' offer. Every message claiming otherwise is a scam designed to extract bank account info or 'processing fees'." },
      { q: "What should I do if a scam message looks really convincing and I'm tempted to click?", a: "Stop. Take 10 minutes. The urgency is part of the scam — real situations don't require you to act in the next minute. During those 10 minutes: call the friend the message claims to be from. Search the wording of the message in Google — almost every scam message has been reported many times before. If still unsure, call us free at 347-953-1531 and we'll review it for you." },
      { q: "How do I teach my spouse or sibling to spot Facebook scams?", a: "Share this guide with them. Walk through the seven patterns together. Set a household rule: 'no money sent based on Facebook messages without a phone call first'. Most scams collapse when victims pause for a phone call — that single rule prevents 95% of senior Facebook fraud." },
    ],
    relatedSlugs: ["facebook-friend-requests", "facebook-hacked-account", "facebook-block-someone", "facebook-privacy-settings"],
    toolsRequired: ["Awareness of common patterns", "Willingness to pause before acting", "A phone to verify friends outside Facebook"],
  },

};

export const ALL_FACEBOOK_SLUGS = Object.keys(FACEBOOK_PAGES);
