"use client";

import React, { useState } from "react";
import type { WalkthroughScreen, WalkthroughBody } from "@/lib/gmail-data";

/* ════════════════════════════════════════════════════════════════════
   VISUAL WALKTHROUGH — "Practice Mode"

   Renders a sequence of pixel-similar Gmail/Google screens with an
   animated arrow + tooltip pointing seniors to the correct element
   on each step. NOT functional Gmail — purely educational.

   Every screen is clearly watermarked "Practice Mode — Trini System"
   so seniors never confuse it with real Gmail.

   Shared across all 12 Gmail pages and reusable for future brands
   (Yahoo, Outlook, Facebook, etc.) by extending the WalkthroughBody type.
════════════════════════════════════════════════════════════════════ */

interface Props {
  screens: WalkthroughScreen[];
  brandColor?: string;
}

export default function VisualWalkthrough({ screens, brandColor = "#1a73e8" }: Props) {
  const [step, setStep] = useState(0);
  const total = screens.length;
  const screen = screens[step];

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => setStep(0);

  const isLast = step === total - 1;

  return (
    <div className="bg-gray-50 rounded-3xl p-6 md:p-8 my-10 border-2 border-blue-100">
      {/* HEADER + PROGRESS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full text-sm font-semibold mb-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Practice Mode — not real Gmail
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{screen.title}</h3>
          <p className="text-lg text-gray-700 mt-1">{screen.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 font-medium">
            Step {step + 1} of {total}
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* THE MOCKUP SCREEN */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-md min-h-[480px] relative">
        <ScreenMockup screen={screen} brandColor={brandColor} />

        {/* Practice mode watermark — diagonal, subtle */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-gray-300 text-6xl font-black opacity-10 -rotate-12 select-none">
            PRACTICE MODE
          </div>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT — plain English */}
      <div className="mt-5 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-1">
          What happens
        </div>
        <p className="text-lg text-gray-800 leading-relaxed">{screen.whatHappens}</p>
      </div>

      {/* NAVIGATION BUTTONS — big, senior-friendly */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={prev}
          disabled={step === 0}
          className="flex-1 py-4 px-6 text-lg font-semibold rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Go to previous step"
        >
          ← Back
        </button>

        {!isLast ? (
          <button
            onClick={next}
            className="flex-[2] py-4 px-6 text-xl font-bold rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
            aria-label="Go to next step"
          >
            Next step →
          </button>
        ) : (
          <button
            onClick={restart}
            className="flex-[2] py-4 px-6 text-xl font-bold rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-lg"
            aria-label="Restart practice tour"
          >
            ↺ Practice again from the start
          </button>
        )}
      </div>

      {/* PHONE CTA — always visible inside walkthrough */}
      <div className="mt-5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="font-bold text-emerald-900 text-lg">Stuck on this step?</div>
          <div className="text-emerald-800">Talk to a real person — free, in under 15 minutes.</div>
        </div>
        <a
          href="tel:3479531531"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-6 py-3 rounded-xl whitespace-nowrap transition"
          aria-label="Call Trini System for free help: 347-953-1531"
        >
          📞 Call 347-953-1531
        </a>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MOCKUP RENDERER — picks the right Gmail/Google screen by `kind`
// ════════════════════════════════════════════════════════════════════

function ScreenMockup({ screen, brandColor }: { screen: WalkthroughScreen; brandColor: string }) {
  const body = screen.body;

  switch (body.kind) {
    case "google-signin":
      return <GoogleSignInScreen arrowText={screen.arrowText} emailValue={body.emailValue} />;
    case "google-password":
      return (
        <GooglePasswordScreen
          arrowText={screen.arrowText}
          arrowTarget={screen.arrowTarget}
          emailEcho={body.emailEcho}
          showForgotLink={body.showForgotLink}
        />
      );
    case "google-2fa":
      return <Google2FAScreen arrowText={screen.arrowText} emailEcho={body.emailEcho} codeMode={body.codeMode} />;
    case "gmail-inbox":
      return <GmailInboxScreen arrowText={screen.arrowText} userName={body.userName} userEmail={body.userEmail} />;
    case "google-recovery-start":
      return <GoogleRecoveryStartScreen arrowText={screen.arrowText} />;
    case "google-recovery-verify":
      return <GoogleRecoveryVerifyScreen arrowText={screen.arrowText} method={body.method} />;
    case "google-new-password":
      return <GoogleNewPasswordScreen arrowText={screen.arrowText} />;
    case "gmail-compose":
      return <GmailComposeScreen arrowText={screen.arrowText} arrowTarget={screen.arrowTarget} />;
    case "gmail-spam-folder":
      return <GmailSpamScreen arrowText={screen.arrowText} />;
    case "gmail-storage-full":
      return <GmailStorageScreen arrowText={screen.arrowText} />;
    case "gmail-suspicious-email":
      return <GmailSuspiciousEmailScreen arrowText={screen.arrowText} senderName={body.senderName} senderEmail={body.senderEmail} />;
    default:
      return <div className="p-12 text-center text-gray-500">Screen unavailable</div>;
  }
}

// ════════════════════════════════════════════════════════════════════
// SHARED UI HELPERS
// ════════════════════════════════════════════════════════════════════

function GoogleLogo() {
  return (
    <svg viewBox="0 0 75 24" width="75" height="24" aria-label="Google">
      <g>
        <path fill="#4285F4" d="M14.11 14.5c0-.83-.07-1.63-.21-2.4H7.2v4.55h3.88c-.17.93-.68 1.71-1.45 2.24v1.85h2.35c1.37-1.27 2.13-3.13 2.13-5.24z"/>
        <path fill="#34A853" d="M7.2 21.5c1.96 0 3.6-.65 4.8-1.76l-2.35-1.85c-.65.43-1.48.69-2.45.69-1.88 0-3.48-1.27-4.05-2.97H.73v1.91A7.5 7.5 0 0 0 7.2 21.5z"/>
        <path fill="#FBBC05" d="M3.15 15.61a4.5 4.5 0 0 1 0-2.72v-1.91H.73a7.5 7.5 0 0 0 0 6.54l2.42-1.91z"/>
        <path fill="#EA4335" d="M7.2 9.92c1.06 0 2.02.36 2.77 1.08l2.08-2.08C10.79 7.65 9.16 7 7.2 7a7.5 7.5 0 0 0-6.47 3.97l2.42 1.91c.57-1.7 2.17-2.97 4.05-2.97z"/>
      </g>
      <text x="20" y="18" fill="#5F6368" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="500">oogle</text>
    </svg>
  );
}

function GmailLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 256 193" width="28" height="22" aria-label="Gmail">
        <path fill="#4285F4" d="M58.182 192.05V93.14L0 51.59V174.5c0 9.69 7.853 17.55 17.545 17.55h40.637z"/>
        <path fill="#34A853" d="M197.818 192.05h40.637c9.7 0 17.545-7.86 17.545-17.55V51.59l-58.182 41.55"/>
        <path fill="#EA4335" d="M58.182 93.14L50.187 21.42 128 79.66l77.813-58.24-7.995 71.72L128 145.05"/>
        <path fill="#FBBC04" d="M197.818 17.95v75.19L256 51.59V26.77c0-23.03-26.292-36.16-44.654-22.42"/>
        <path fill="#C5221F" d="M0 51.59l26.755 20.05L58.182 93.14V17.95L44.655 4.35C26.262-9.39 0 3.74 0 26.77"/>
      </svg>
      <span className="text-xl font-light text-gray-700">Gmail</span>
    </div>
  );
}

function ArrowTooltip({ text, position = "top" }: { text: string; position?: "top" | "left" | "right" | "bottom" }) {
  const arrowPaths: Record<string, string> = {
    top: "M0,40 L20,40 L10,30 M20,40 L10,50",
    left: "M0,20 L40,20 L30,10 M40,20 L30,30",
    right: "M40,20 L0,20 L10,10 M0,20 L10,30",
    bottom: "M20,0 L20,40 L10,30 M20,40 L30,30",
  };
  return (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce-slow">
      <div className="bg-amber-400 text-amber-900 px-4 py-2 rounded-lg font-bold shadow-lg whitespace-nowrap text-sm">
        {text}
      </div>
      <svg width="20" height="40" viewBox="0 0 20 40">
        <path d="M10 0 L10 32 M4 26 L10 32 L16 26" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 1. GOOGLE SIGN-IN SCREEN
// ════════════════════════════════════════════════════════════════════
function GoogleSignInScreen({ arrowText, emailValue }: { arrowText: string; emailValue?: string }) {
  return (
    <div className="bg-white">
      {/* Browser address bar mock */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 accounts.google.com/signin
        </div>
      </div>

      {/* Sign-in card */}
      <div className="flex justify-center py-12 px-6">
        <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <GoogleLogo />
          </div>
          <h2 className="text-2xl font-normal text-center mb-2 text-gray-900">Sign in</h2>
          <p className="text-center text-gray-600 mb-8">to continue to Gmail</p>

          <div className="relative mb-6">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-blue-600 z-10">
              Email or phone
            </label>
            <input
              id="email-input"
              type="text"
              defaultValue={emailValue || ""}
              className="w-full border-2 border-blue-600 rounded px-4 py-4 text-lg outline-none ring-4 ring-blue-100"
              placeholder=""
              readOnly
            />
            <ArrowTooltip text={arrowText} />
          </div>

          <div className="text-blue-600 text-sm mb-8 cursor-default">Forgot email?</div>

          <p className="text-sm text-gray-600 mb-8">
            Not your computer? Use Guest mode to sign in privately.
          </p>

          <div className="flex justify-between items-center">
            <button className="text-blue-600 font-medium text-sm">Create account</button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 2. GOOGLE PASSWORD SCREEN
// ════════════════════════════════════════════════════════════════════
function GooglePasswordScreen({
  arrowText,
  arrowTarget,
  emailEcho,
  showForgotLink,
}: {
  arrowText: string;
  arrowTarget: string;
  emailEcho: string;
  showForgotLink?: boolean;
}) {
  const arrowOnForgot = arrowTarget === "forgot-link";
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 accounts.google.com/signin/v2/challenge
        </div>
      </div>

      <div className="flex justify-center py-12 px-6">
        <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <GoogleLogo />
          </div>
          <h2 className="text-2xl font-normal text-center mb-4 text-gray-900">Welcome</h2>

          <div className="mx-auto inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-8 text-sm text-gray-700 cursor-default">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
              {emailEcho.charAt(0).toUpperCase()}
            </div>
            {emailEcho}
            <span className="text-gray-400">▾</span>
          </div>

          <div className="relative mb-2">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-blue-600 z-10">
              Enter your password
            </label>
            <input
              id="password-input"
              type="password"
              defaultValue=""
              className={`w-full border-2 rounded px-4 py-4 text-lg outline-none ${
                arrowTarget === "password-input"
                  ? "border-blue-600 ring-4 ring-blue-100"
                  : "border-gray-300"
              }`}
              readOnly
            />
            {arrowTarget === "password-input" && <ArrowTooltip text={arrowText} />}
          </div>

          <div className="flex items-center gap-2 mt-3 mb-8 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4" disabled /> Show password
          </div>

          {showForgotLink && (
            <div className="mb-8 relative inline-block">
              <button
                id="forgot-link"
                className={`text-sm font-medium ${
                  arrowOnForgot
                    ? "text-blue-700 underline bg-amber-100 px-2 py-1 rounded"
                    : "text-blue-600"
                }`}
              >
                Forgot password?
              </button>
              {arrowOnForgot && <ArrowTooltip text={arrowText} />}
            </div>
          )}

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 3. GOOGLE 2FA SCREEN
// ════════════════════════════════════════════════════════════════════
function Google2FAScreen({ arrowText, emailEcho, codeMode }: { arrowText: string; emailEcho: string; codeMode: "sms" | "prompt" }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 accounts.google.com/signin/v2/challenge/totp
        </div>
      </div>

      <div className="flex justify-center py-10 px-6">
        <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <GoogleLogo />
          </div>
          <h2 className="text-2xl font-normal text-center mb-2 text-gray-900">2-Step Verification</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            To help keep your account safe, Google wants to make sure it's really you trying to sign in
          </p>

          <div className="mx-auto inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6 text-sm text-gray-700 cursor-default">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
              {emailEcho.charAt(0).toUpperCase()}
            </div>
            {emailEcho}
          </div>

          <p className="text-gray-700 mb-2 font-medium">Get a verification code</p>
          <p className="text-sm text-gray-600 mb-6">
            A text message with a 6-digit verification code was just sent to your phone ending in **31
          </p>

          <div className="relative mb-6">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-blue-600 z-10">
              Enter code
            </label>
            <input
              id="code-input"
              type="text"
              placeholder="G-"
              className="w-full border-2 border-blue-600 rounded px-4 py-4 text-lg outline-none ring-4 ring-blue-100 tracking-widest"
              readOnly
            />
            <ArrowTooltip text={arrowText} />
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm">
            <input type="checkbox" className="w-4 h-4" defaultChecked disabled />
            <span className="text-gray-700">Don't ask again on this computer</span>
          </div>

          <div className="flex justify-between items-center">
            <button className="text-blue-600 text-sm font-medium">Try another way</button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 4. GMAIL INBOX SCREEN
// ════════════════════════════════════════════════════════════════════
function GmailInboxScreen({ arrowText, userName, userEmail }: { arrowText: string; userName: string; userEmail: string }) {
  const emails = [
    { from: "Sarah Johnson", subject: "Birthday party next week", time: "10:30 AM", unread: true },
    { from: "Walgreens", subject: "Your prescription is ready", time: "Yesterday", unread: true },
    { from: "Medicare.gov", subject: "Your enrollment confirmation", time: "Yesterday", unread: false },
    { from: "Grandma Linda", subject: "Photos from the picnic", time: "Mon", unread: false },
    { from: "Chase Bank", subject: "Your monthly statement is ready", time: "May 1", unread: false },
  ];

  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 mail.google.com/mail/u/0/#inbox
        </div>
      </div>

      {/* Gmail header */}
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <GmailLogo />
        <div className="hidden md:block flex-1 max-w-2xl mx-8">
          <input
            type="text"
            placeholder="Search mail"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm border-0 outline-none"
            readOnly
          />
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {userName.charAt(0)}
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        <div className="hidden md:block w-44 border-r border-gray-200 py-4 px-2">
          <button className="bg-red-500 text-white px-5 py-3 rounded-2xl font-semibold mb-4 shadow-md w-full text-left">
            ✏️ Compose
          </button>
          <div className="space-y-1">
            {[
              { name: "Inbox", count: 27, active: true },
              { name: "Starred", count: 0 },
              { name: "Sent", count: 0 },
              { name: "Drafts", count: 2 },
              { name: "Spam", count: 4 },
              { name: "Trash", count: 0 },
            ].map((item) => (
              <div
                key={item.name}
                className={`px-3 py-2 rounded-r-full flex justify-between text-sm ${
                  item.active ? "bg-red-100 text-red-900 font-bold" : "text-gray-700"
                }`}
              >
                <span>{item.name}</span>
                {item.count > 0 && <span>{item.count}</span>}
              </div>
            ))}
          </div>
        </div>

        <div id="inbox-list" className="flex-1 relative">
          <ArrowTooltip text={arrowText} position="top" />
          {emails.map((e, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:shadow ${
                e.unread ? "bg-white font-bold" : "bg-gray-50"
              }`}
            >
              <input type="checkbox" disabled className="w-4 h-4" />
              <span className="text-yellow-400">☆</span>
              <div className="w-32 truncate text-sm">{e.from}</div>
              <div className="flex-1 truncate text-sm">{e.subject}</div>
              <div className="text-xs text-gray-500">{e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 5. RECOVERY START SCREEN
// ════════════════════════════════════════════════════════════════════
function GoogleRecoveryStartScreen({ arrowText }: { arrowText: string }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 accounts.google.com/signin/recovery
        </div>
      </div>

      <div className="flex justify-center py-12 px-6">
        <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <GoogleLogo />
          </div>
          <h2 className="text-2xl font-normal text-center mb-2 text-gray-900">Account recovery</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            This helps show that this account really belongs to you
          </p>

          <div className="relative mb-6">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-blue-600 z-10">
              Email or phone number
            </label>
            <input
              id="email-input"
              type="text"
              className="w-full border-2 border-blue-600 rounded px-4 py-4 text-lg outline-none ring-4 ring-blue-100"
              readOnly
            />
            <ArrowTooltip text={arrowText} />
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 6. RECOVERY VERIFY SCREEN
// ════════════════════════════════════════════════════════════════════
function GoogleRecoveryVerifyScreen({ arrowText, method }: { arrowText: string; method: "email" | "phone" | "lastpassword" }) {
  const labels = {
    email: { title: "Get a code by email", sub: "Code sent to s•••@yahoo.com" },
    phone: { title: "Get a code by text", sub: "Code sent to (•••) •••-••31" },
    lastpassword: { title: "Enter your last password", sub: "Type the most recent password you remember using" },
  };
  const { title, sub } = labels[method];

  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 accounts.google.com/signin/recovery/verify
        </div>
      </div>

      <div className="flex justify-center py-12 px-6">
        <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <GoogleLogo />
          </div>
          <h2 className="text-2xl font-normal text-center mb-2 text-gray-900">{title}</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">{sub}</p>

          <div className="relative mb-6">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-blue-600 z-10">
              {method === "lastpassword" ? "Password" : "Enter code"}
            </label>
            <input
              id="code-input"
              type={method === "lastpassword" ? "password" : "text"}
              placeholder={method === "lastpassword" ? "" : "G-"}
              className="w-full border-2 border-blue-600 rounded px-4 py-4 text-lg outline-none ring-4 ring-blue-100"
              readOnly
            />
            <ArrowTooltip text={arrowText} />
          </div>

          <div className="flex justify-between items-center">
            <button className="text-blue-600 text-sm font-medium">Try another way</button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 7. NEW PASSWORD SCREEN
// ════════════════════════════════════════════════════════════════════
function GoogleNewPasswordScreen({ arrowText }: { arrowText: string }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 myaccount.google.com/signinoptions/password
        </div>
      </div>

      <div className="flex justify-center py-10 px-6">
        <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
          <div className="flex justify-center mb-6">
            <GoogleLogo />
          </div>
          <h2 className="text-2xl font-normal text-center mb-2 text-gray-900">Create a strong password</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Create a new strong password that you don't use for other websites
          </p>

          <div className="relative mb-5">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-blue-600 z-10">
              New password
            </label>
            <input
              id="new-password-input"
              type="password"
              className="w-full border-2 border-blue-600 rounded px-4 py-4 text-lg outline-none ring-4 ring-blue-100"
              readOnly
            />
            <ArrowTooltip text={arrowText} />
          </div>

          <div className="relative mb-8">
            <label className="absolute left-4 -top-2 px-1 bg-white text-xs text-gray-500 z-10">
              Confirm new password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-4 text-lg outline-none"
              readOnly
            />
          </div>

          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4" disabled /> Show password
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-medium">Save password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 8. GMAIL COMPOSE SCREEN
// ════════════════════════════════════════════════════════════════════
function GmailComposeScreen({ arrowText, arrowTarget }: { arrowText: string; arrowTarget: string }) {
  const arrowOnAttach = arrowTarget === "attach-icon";
  return (
    <div className="bg-white relative min-h-[480px]">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 mail.google.com/mail/u/0/#inbox
        </div>
      </div>

      {/* Faded inbox in background */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3 opacity-50">
        <GmailLogo />
      </div>

      {/* Compose window in bottom-right */}
      <div className="absolute right-6 bottom-6 w-[28rem] bg-white border border-gray-300 rounded-t-lg shadow-2xl">
        <div className="bg-gray-700 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
          <span className="font-medium text-sm">New Message</span>
          <div className="flex gap-3 text-gray-300">
            <span>—</span>
            <span>⛶</span>
            <span>×</span>
          </div>
        </div>
        <div className="border-b border-gray-200 px-4 py-2.5 relative">
          <input
            id="to-input"
            type="text"
            placeholder="To"
            className={`w-full text-sm outline-none ${arrowTarget === "to-input" ? "ring-2 ring-blue-300 px-2 -mx-2 rounded" : ""}`}
            readOnly
          />
          {arrowTarget === "to-input" && <ArrowTooltip text={arrowText} />}
        </div>
        <div className="border-b border-gray-200 px-4 py-2.5">
          <input type="text" placeholder="Subject" className="w-full text-sm outline-none" readOnly />
        </div>
        <textarea
          className="w-full px-4 py-3 text-sm h-32 outline-none resize-none"
          readOnly
        />
        <div className="flex items-center justify-between px-2 py-2 border-t border-gray-100">
          <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium">
            Send
          </button>
          <div className="flex gap-3 text-gray-500 relative">
            <span>𝐀</span>
            <span id="attach-icon" className={arrowOnAttach ? "bg-amber-200 px-2 py-1 rounded" : ""}>
              📎
            </span>
            <span>🔗</span>
            <span>😊</span>
            <span>🖼️</span>
            {arrowOnAttach && <ArrowTooltip text={arrowText} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 9. GMAIL SPAM FOLDER SCREEN
// ════════════════════════════════════════════════════════════════════
function GmailSpamScreen({ arrowText }: { arrowText: string }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 mail.google.com/mail/u/0/#inbox/email-open
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <GmailLogo />
      </div>

      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-lg">URGENT — Your account needs attention</h3>
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Sketchy Marketing Co.</span> &lt;noreply@sketchy-marketing.xyz&gt;
              </div>
              <div className="text-xs text-gray-500 mt-1">to me</div>
            </div>
            <div className="flex gap-2 relative">
              <button className="text-gray-500 px-2">↩️</button>
              <button id="block-button" className="bg-amber-100 px-3 py-1 rounded text-amber-900 font-semibold text-sm">
                ⋮ Menu
              </button>
              <ArrowTooltip text={arrowText} />
            </div>
          </div>
          <p className="text-gray-700">
            Click here to claim your free $500 gift card before it expires!
          </p>
        </div>

        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="font-semibold mb-2 text-sm">Menu options:</div>
          <div className="space-y-1 text-sm text-gray-700">
            <div className="px-3 py-2 bg-amber-100 rounded font-bold">→ Block "Sketchy Marketing Co."</div>
            <div className="px-3 py-2">Report spam</div>
            <div className="px-3 py-2">Report phishing</div>
            <div className="px-3 py-2">Mark as not important</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 10. GMAIL STORAGE SCREEN
// ════════════════════════════════════════════════════════════════════
function GmailStorageScreen({ arrowText }: { arrowText: string }) {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 mail.google.com/mail/u/0/#search/larger:10MB
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <GmailLogo />
        <div className="flex-1 max-w-2xl mx-4 relative">
          <input
            id="search-input"
            type="text"
            defaultValue="larger:10MB"
            className="w-full bg-gray-100 rounded-full px-5 py-2.5 text-base border-2 border-blue-500 ring-4 ring-blue-100 outline-none"
            readOnly
          />
          <ArrowTooltip text={arrowText} />
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-500" />
      </div>

      <div className="p-6">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded">
          <div className="font-bold text-amber-900">⚠️ Storage almost full: 14.8 GB of 15 GB used</div>
          <div className="text-sm text-amber-800 mt-1">Free up space by deleting big emails below.</div>
        </div>
        <div className="space-y-2">
          {[
            { from: "Old Vacation Photos", subject: "Beach trip 2018 — 47 photos attached", size: "38 MB" },
            { from: "Family Reunion", subject: "Video clips from the BBQ", size: "24 MB" },
            { from: "Old Newsletter", subject: "Monthly digest with images", size: "12 MB" },
            { from: "Doctor's Office", subject: "Test results scan attached", size: "11 MB" },
          ].map((e, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-3 border-b border-gray-100 hover:bg-gray-50">
              <input type="checkbox" disabled />
              <div className="w-32 text-sm font-medium">{e.from}</div>
              <div className="flex-1 text-sm">{e.subject}</div>
              <div className="text-sm font-bold text-red-600">{e.size}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 11. GMAIL SUSPICIOUS EMAIL SCREEN — for scam-spotting page
// ════════════════════════════════════════════════════════════════════
function GmailSuspiciousEmailScreen({
  arrowText,
  senderName,
  senderEmail,
}: {
  arrowText: string;
  senderName: string;
  senderEmail: string;
}) {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1.5 text-sm text-gray-700 border border-gray-200">
          🔒 mail.google.com/mail/u/0/#inbox/suspicious
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <GmailLogo />
      </div>

      <div className="p-6">
        <div className="bg-white border-2 border-red-200 rounded-lg p-5">
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-sm text-red-900">
            <strong>⚠️ Warning signs to look for in this email — see arrows</strong>
          </div>
          <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100 relative">
            <div>
              <h3 className="font-bold text-lg">URGENT: Your Google account will be deleted in 24 hours!!</h3>
              <div className="text-sm text-gray-600 mt-1 relative inline-block">
                <span className="font-medium">{senderName}</span> &lt;<span id="sender-email" className="bg-red-100 px-1 font-bold text-red-700">{senderEmail}</span>&gt;
                <ArrowTooltip text={arrowText} />
              </div>
              <div className="text-xs text-gray-500 mt-1">to me</div>
            </div>
          </div>
          <div className="space-y-3 text-gray-800">
            <p className="bg-yellow-50 px-2 py-1 inline-block">
              <strong className="text-red-700">Dear Costumer,</strong> ← misspelled, generic
            </p>
            <p>
              Your Google acount has been flag for suspicious activity. You must <strong className="text-red-700">VERIFY YOUR PASSWORD</strong> within 24 hours or your acount will be permanantly deleted.
            </p>
            <p>
              <span className="bg-red-100 px-2 py-1 underline text-blue-700">Click here to verify now</span> ← fake link
            </p>
            <p className="text-sm text-gray-500 italic">
              ↑ Real Google never asks you to verify your password by email. Real Google emails come from @google.com, not from random web addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
