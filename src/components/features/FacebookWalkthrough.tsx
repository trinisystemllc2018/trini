"use client";

import React, { useState } from "react";
import type { WalkthroughScreen, WalkthroughBody } from "@/lib/facebook-data";
import { FB_THEME } from "@/lib/facebook-data";

/* ════════════════════════════════════════════════════════════════════
   FACEBOOK WALKTHROUGH — "Practice Mode"

   Renders pixel-similar Facebook UI screens with FB blue (#1877F2)
   theming, an animated arrow + amber tooltip pointing seniors to
   the correct element on each step. NOT functional Facebook —
   purely educational fair use.

   Every screen carries a diagonal "PRACTICE MODE" watermark so
   seniors never confuse it with real Facebook.

   Used across all 12 Facebook help pages.
════════════════════════════════════════════════════════════════════ */

interface Props {
  screens: WalkthroughScreen[];
}

export default function FacebookWalkthrough({ screens }: Props) {
  const [step, setStep] = useState(0);
  const total = screens.length;
  if (total === 0) return null;
  const screen = screens[step];

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => setStep(0);

  const isLast = step === total - 1;
  const isFirst = step === 0;

  return (
    <div
      className="rounded-3xl p-6 md:p-8 my-10 border-2"
      style={{ backgroundColor: FB_THEME.bgPage, borderColor: FB_THEME.primary + "30" }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-2"
            style={{ backgroundColor: FB_THEME.bgWarning, color: FB_THEME.textWarning }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#F59E0B" }} />
            Practice Mode — not real Facebook
          </div>
          <h3 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
            {screen.title}
          </h3>
          <p className="text-lg mt-1" style={{ color: FB_THEME.textSecondary }}>
            {screen.caption}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium" style={{ color: FB_THEME.textSecondary }}>
            Step {step + 1} of {total}
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2 rounded-full overflow-hidden mb-5" style={{ backgroundColor: FB_THEME.border }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${((step + 1) / total) * 100}%`, backgroundColor: FB_THEME.primary }}
        />
      </div>

      {/* MOCKUP CONTAINER */}
      <div
        className="rounded-2xl border-2 overflow-hidden shadow-md min-h-[520px] relative"
        style={{ backgroundColor: FB_THEME.bgCard, borderColor: FB_THEME.border }}
      >
        <ScreenMockup screen={screen} />

        {/* Practice Mode watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-6xl font-black opacity-10 -rotate-12 select-none" style={{ color: FB_THEME.textSecondary }}>
            PRACTICE MODE
          </div>
        </div>
      </div>

      {/* TOOLTIP / WHAT HAPPENS */}
      <div
        className="mt-5 border-l-4 p-4 rounded-r-xl"
        style={{ backgroundColor: FB_THEME.primary + "10", borderColor: FB_THEME.primary }}
      >
        <div className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: FB_THEME.primaryDark }}>
          What to do
        </div>
        <p className="text-lg leading-relaxed" style={{ color: FB_THEME.text }}>
          {screen.tooltipText}
        </p>
      </div>

      {/* WARNING NOTE */}
      {screen.warningNote && (
        <div
          className="mt-3 border-l-4 p-4 rounded-r-xl"
          style={{ backgroundColor: FB_THEME.bgWarning, borderColor: "#F59E0B" }}
        >
          <div className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: FB_THEME.textWarning }}>
            ⚠ Important
          </div>
          <p className="text-base leading-relaxed" style={{ color: FB_THEME.textWarning }}>
            {screen.warningNote}
          </p>
        </div>
      )}

      {/* CONTROLS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={isFirst}
            className="px-5 py-3 rounded-lg text-base font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isFirst ? FB_THEME.border : FB_THEME.bgCard,
              color: FB_THEME.text,
              border: `1px solid ${FB_THEME.borderInput}`,
            }}
          >
            ← Back
          </button>
          <button
            onClick={restart}
            className="px-5 py-3 rounded-lg text-base font-semibold transition"
            style={{
              backgroundColor: FB_THEME.bgCard,
              color: FB_THEME.text,
              border: `1px solid ${FB_THEME.borderInput}`,
            }}
          >
            ↺ Restart
          </button>
        </div>
        <button
          onClick={next}
          disabled={isLast}
          className="px-6 py-3 rounded-lg text-base font-bold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: isLast ? FB_THEME.textSecondary : FB_THEME.primary }}
          onMouseEnter={(e) => {
            if (!isLast) (e.currentTarget as HTMLButtonElement).style.backgroundColor = FB_THEME.primaryHover;
          }}
          onMouseLeave={(e) => {
            if (!isLast) (e.currentTarget as HTMLButtonElement).style.backgroundColor = FB_THEME.primary;
          }}
        >
          {isLast ? "✓ Finished" : "Next step →"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCREEN MOCKUP DISPATCHER
───────────────────────────────────────────────────────────────── */

function ScreenMockup({ screen }: { screen: WalkthroughScreen }) {
  const body = screen.body;
  const arrowTarget = screen.arrowTarget;
  const tooltipText = screen.tooltipText;

  switch (body.kind) {
    case "fb-login":
      return <FbLoginMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-forgot-form":
      return <FbForgotFormMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-recovery-options":
      return <FbRecoveryOptionsMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-code-entry":
      return <FbCodeEntryMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-new-password":
      return <FbNewPasswordMockup arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-feed":
      return <FbFeedMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-trusted-contacts":
      return <FbTrustedContactsMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-2fa-setup":
      return <Fb2faSetupMockup arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-friend-request":
      return <FbFriendRequestMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-block-menu":
      return <FbBlockMenuMockup arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-privacy-settings":
      return <FbPrivacySettingsMockup arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-suspicious-message":
      return <FbSuspiciousMessageMockup body={body} arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-secure-account":
      return <FbSecureAccountMockup arrowTarget={arrowTarget} tooltipText={tooltipText} />;
    case "fb-delete-confirm":
      return <FbDeleteConfirmMockup arrowTarget={arrowTarget} tooltipText={tooltipText} />;
  }
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED ARROW + TOOLTIP (shared)
───────────────────────────────────────────────────────────────── */

function ArrowTooltip({ text, position = "right" }: { text: string; position?: "right" | "left" | "above" | "below" }) {
  return (
    <div className={`absolute z-20 flex items-center gap-2 ${
      position === "right" ? "left-full ml-2" :
      position === "left" ? "right-full mr-2" :
      position === "above" ? "bottom-full mb-2 left-1/2 -translate-x-1/2" :
      "top-full mt-2 left-1/2 -translate-x-1/2"
    }`}>
      {position === "right" && <span className="text-3xl animate-pulse" style={{ color: "#F59E0B" }}>👉</span>}
      <div
        className="px-3 py-2 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap"
        style={{ backgroundColor: "#F59E0B", color: "#000" }}
      >
        {text}
      </div>
      {position === "left" && <span className="text-3xl animate-pulse" style={{ color: "#F59E0B" }}>👈</span>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   INDIVIDUAL FB SCREEN MOCKUPS
════════════════════════════════════════════════════════════════════ */

/* The blue Facebook header bar shared across most screens */
function FbHeader() {
  return (
    <div
      className="flex items-center px-4 h-14"
      style={{ backgroundColor: FB_THEME.primary }}
    >
      <div className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
        facebook
      </div>
    </div>
  );
}

/* ─── FB LOGIN ─── */
function FbLoginMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-login" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  return (
    <div className="relative w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      {/* Browser address bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ backgroundColor: "#f1f3f4", borderColor: FB_THEME.border }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div
          id="address-bar"
          className="relative flex-1 ml-3 px-3 py-1 rounded-full bg-white border text-sm"
          style={{ borderColor: FB_THEME.borderInput, color: FB_THEME.text }}
        >
          🔒 https://www.facebook.com
          {arrowTarget === "address-bar" && <ArrowTooltip text={tooltipText} position="below" />}
        </div>
      </div>

      {/* Centered login card */}
      <div className="flex justify-center items-start pt-12 pb-8 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div
            className="text-center font-bold mb-6"
            style={{ color: FB_THEME.primary, fontSize: "60px", fontFamily: "Helvetica, Arial, sans-serif", letterSpacing: "-2px" }}
          >
            facebook
          </div>

          {/* Login card */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}
          >
            {/* Email input */}
            <div className="relative mb-3">
              <input
                id="email-input"
                type="text"
                placeholder="Email address or phone number"
                defaultValue={body.emailValue || ""}
                className="w-full px-4 py-3 rounded-md text-base focus:outline-none"
                style={{
                  border: `1px solid ${FB_THEME.borderInput}`,
                  color: FB_THEME.text,
                }}
                readOnly
              />
              {arrowTarget === "email-input" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>

            {/* Password input */}
            <div className="relative mb-3">
              <input
                id="password-input"
                type="password"
                placeholder="Password"
                defaultValue={body.emailValue ? "••••••••••" : ""}
                className="w-full px-4 py-3 rounded-md text-base focus:outline-none"
                style={{
                  border: `1px solid ${FB_THEME.borderInput}`,
                  color: FB_THEME.text,
                }}
                readOnly
              />
              {arrowTarget === "password-input" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>

            {body.showError && (
              <div className="text-sm mb-3 px-2 py-2 rounded" style={{ color: FB_THEME.textError, backgroundColor: FB_THEME.bgError }}>
                {body.errorText || "The password you've entered is incorrect."}
              </div>
            )}

            {/* Log in button */}
            <div className="relative">
              <button
                id="login-btn"
                className="w-full py-3 rounded-md text-white text-lg font-bold"
                style={{ backgroundColor: FB_THEME.primary }}
              >
                Log In
              </button>
              {arrowTarget === "login-btn" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>

            {/* Forgot link */}
            <div className="text-center mt-4">
              <a
                id="forgot-link"
                className="relative text-sm hover:underline"
                style={{ color: FB_THEME.primary }}
              >
                Forgotten password?
                {arrowTarget === "forgot-link" && <ArrowTooltip text={tooltipText} position="right" />}
              </a>
            </div>

            <hr className="my-4" style={{ borderColor: FB_THEME.border }} />

            {/* Create account button */}
            <div className="flex justify-center">
              <button
                className="px-5 py-3 rounded-md text-white text-base font-bold"
                style={{ backgroundColor: FB_THEME.green }}
              >
                Create new account
              </button>
            </div>
          </div>

          <div className="text-center text-sm mt-4" style={{ color: FB_THEME.textSecondary }}>
            <strong>Create a Page</strong> for a celebrity, brand or business.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FORGOT PASSWORD FORM ─── */
function FbForgotFormMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-forgot-form" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-10 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                Find Your Account
              </h2>
            </div>
            <div className="px-5 py-5">
              <p className="text-base mb-4" style={{ color: FB_THEME.textSecondary }}>
                Please enter your email address or mobile number to search for your account.
              </p>
              <div className="relative mb-5">
                <input
                  id="input"
                  type="text"
                  placeholder="Email address or mobile number"
                  defaultValue={body.prefilledValue || ""}
                  className="w-full px-4 py-3 rounded-md text-base focus:outline-none"
                  style={{ border: `1px solid ${FB_THEME.borderInput}`, color: FB_THEME.text }}
                  readOnly
                />
                {arrowTarget === "input" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t" style={{ backgroundColor: "#F5F6F7", borderColor: FB_THEME.border }}>
              <button className="px-5 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgCard, color: FB_THEME.text, border: `1px solid ${FB_THEME.borderInput}` }}>
                Cancel
              </button>
              <button className="px-5 py-2 rounded-md text-base font-semibold text-white" style={{ backgroundColor: FB_THEME.primary }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── RECOVERY OPTIONS (pick how to receive the code) ─── */
function FbRecoveryOptionsMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-recovery-options" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-10 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                Reset your password
              </h2>
              <p className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                How would you like to receive the code to reset your password?
              </p>
            </div>
            <div className="px-5 py-5 space-y-3">
              {/* Option 1 — Email */}
              <div
                id="first-option"
                className="relative flex items-start gap-3 p-3 rounded-lg cursor-pointer"
                style={{ border: `2px solid ${FB_THEME.primary}`, backgroundColor: FB_THEME.primary + "08" }}
              >
                <div className="w-5 h-5 rounded-full mt-0.5" style={{ border: `5px solid ${FB_THEME.primary}` }} />
                <div className="flex-1">
                  <div className="text-2xl mb-1">📧</div>
                  <div className="font-semibold text-base" style={{ color: FB_THEME.text }}>
                    Send code via email
                  </div>
                  <div className="text-sm" style={{ color: FB_THEME.textSecondary }}>
                    {body.emailHint}
                  </div>
                </div>
                {arrowTarget === "first-option" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>

              {/* Option 2 — SMS */}
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ border: `1px solid ${FB_THEME.borderInput}` }}>
                <div className="w-5 h-5 rounded-full mt-0.5 border" style={{ borderColor: FB_THEME.borderInput }} />
                <div className="flex-1">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="font-semibold text-base" style={{ color: FB_THEME.text }}>
                    Send code via text message
                  </div>
                  <div className="text-sm" style={{ color: FB_THEME.textSecondary }}>
                    {body.phoneHint}
                  </div>
                </div>
              </div>

              {body.showTrustedContacts && (
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{ border: `1px solid ${FB_THEME.borderInput}` }}>
                  <div className="w-5 h-5 rounded-full mt-0.5 border" style={{ borderColor: FB_THEME.borderInput }} />
                  <div className="flex-1">
                    <div className="text-2xl mb-1">👥</div>
                    <div className="font-semibold text-base" style={{ color: FB_THEME.text }}>
                      Use trusted contacts
                    </div>
                    <div className="text-sm" style={{ color: FB_THEME.textSecondary }}>
                      Get help from 3-5 friends you trust
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm pt-2" style={{ color: FB_THEME.primary }}>
                No longer have access to these?
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t" style={{ backgroundColor: "#F5F6F7", borderColor: FB_THEME.border }}>
              <button className="px-5 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgCard, color: FB_THEME.text, border: `1px solid ${FB_THEME.borderInput}` }}>
                Cancel
              </button>
              <button className="px-5 py-2 rounded-md text-base font-semibold text-white" style={{ backgroundColor: FB_THEME.primary }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CODE ENTRY ─── */
function FbCodeEntryMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-code-entry" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  const methodLabel = body.method === "email" ? "your email" : body.method === "sms" ? "your phone" : "your authenticator app";
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-10 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                Enter security code
              </h2>
              <p className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                Please check {methodLabel} for a 6-digit code and enter it below.
              </p>
            </div>
            <div className="px-5 py-6">
              <div className="relative">
                <input
                  id="code-input"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-4 rounded-md text-2xl text-center tracking-widest focus:outline-none"
                  style={{ border: `2px solid ${FB_THEME.primary}`, color: FB_THEME.text, letterSpacing: "0.5em" }}
                  readOnly
                />
                {arrowTarget === "code-input" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
              <div className="text-sm mt-3" style={{ color: FB_THEME.primary }}>
                Send a new code · Need another way to authenticate?
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t" style={{ backgroundColor: "#F5F6F7", borderColor: FB_THEME.border }}>
              <button className="px-5 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgCard, color: FB_THEME.text, border: `1px solid ${FB_THEME.borderInput}` }}>
                Back
              </button>
              <button className="px-5 py-2 rounded-md text-base font-semibold text-white" style={{ backgroundColor: FB_THEME.primary }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── NEW PASSWORD ─── */
function FbNewPasswordMockup({ arrowTarget, tooltipText }: { arrowTarget: string; tooltipText: string }) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-10 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                Create new password
              </h2>
              <p className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                Your password must be at least 8 characters with letters and numbers.
              </p>
            </div>
            <div className="px-5 py-5 space-y-3">
              <div className="relative">
                <input
                  id="input"
                  type="password"
                  placeholder="New password"
                  className="w-full px-4 py-3 rounded-md text-base focus:outline-none"
                  style={{ border: `1px solid ${FB_THEME.borderInput}`, color: FB_THEME.text }}
                  readOnly
                />
                {arrowTarget === "input" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-md text-base focus:outline-none"
                style={{ border: `1px solid ${FB_THEME.borderInput}`, color: FB_THEME.text }}
                readOnly
              />
              <label className="flex items-center gap-2 text-sm pt-2" style={{ color: FB_THEME.text }}>
                <input type="checkbox" defaultChecked className="w-4 h-4" readOnly />
                Log out of other devices
              </label>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t" style={{ backgroundColor: "#F5F6F7", borderColor: FB_THEME.border }}>
              <button className="px-5 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgCard, color: FB_THEME.text, border: `1px solid ${FB_THEME.borderInput}` }}>
                Cancel
              </button>
              <button className="px-5 py-2 rounded-md text-base font-semibold text-white" style={{ backgroundColor: FB_THEME.primary }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FB FEED (success state / starting point) ─── */
function FbFeedMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-feed" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      {/* Top blue header with search */}
      <div className="flex items-center px-4 h-14 gap-3" style={{ backgroundColor: FB_THEME.primary }}>
        <div className="text-white font-bold text-2xl">facebook</div>
        <div id="search-bar" className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search Facebook"
            className="w-full px-3 py-2 rounded-full text-sm bg-white/90"
            readOnly
          />
          {arrowTarget === "search-bar" && <ArrowTooltip text={tooltipText} position="below" />}
        </div>
        <div className="flex-1" />
        <div className="flex gap-2">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">🏠</div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">👥</div>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">🔔</div>
          <div id="menu-arrow" className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
            ▾
            {arrowTarget === "menu-arrow" && <ArrowTooltip text={tooltipText} position="below" />}
          </div>
        </div>
      </div>

      {/* Welcome banner */}
      <div className="m-4 p-4 rounded-lg" style={{ backgroundColor: FB_THEME.bgSuccess, border: `1px solid ${FB_THEME.textSuccess}33` }}>
        <div className="font-bold text-lg" style={{ color: FB_THEME.textSuccess }}>
          Welcome back, {body.userName}! 🎉
        </div>
        <div className="text-sm mt-1" style={{ color: FB_THEME.text }}>
          You're now logged in. Posts from your friends will appear below.
        </div>
      </div>

      {/* Sample post */}
      <div className="mx-4 mb-3 p-4 rounded-lg" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: FB_THEME.primary }} />
          <div>
            <div className="font-semibold" style={{ color: FB_THEME.text }}>Mary Johnson</div>
            <div className="text-xs" style={{ color: FB_THEME.textSecondary }}>2 hours ago · 🌍</div>
          </div>
        </div>
        <div className="text-base" style={{ color: FB_THEME.text }}>
          Beautiful sunset at the lake today. Hope everyone is having a wonderful weekend! 🌅
        </div>
        <div className="flex gap-4 mt-3 pt-3 border-t" style={{ borderColor: FB_THEME.border }}>
          <button className="text-sm font-semibold" style={{ color: FB_THEME.textSecondary }}>👍 Like</button>
          <button className="text-sm font-semibold" style={{ color: FB_THEME.textSecondary }}>💬 Comment</button>
          <button className="text-sm font-semibold" style={{ color: FB_THEME.textSecondary }}>↗ Share</button>
        </div>
      </div>
    </div>
  );
}

/* ─── TRUSTED CONTACTS ─── */
function FbTrustedContactsMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-trusted-contacts" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  const contacts = ["Mary Johnson", "Robert Williams", "Patricia Davis", "James Brown", "Linda Wilson"];
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-8 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                {body.mode === "setup" ? "Choose Trusted Contacts" : "Your Trusted Contacts"}
              </h2>
              <p className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                {body.mode === "setup"
                  ? "Pick 3 to 5 friends who can help you log in if you're locked out."
                  : "Call or text each friend below to get a recovery code."}
              </p>
            </div>
            <div className="px-5 py-3 space-y-2">
              {contacts.map((name, i) => (
                <div
                  key={name}
                  id={i === 0 ? "first-contact" : undefined}
                  className="relative flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    border: `1px solid ${i === 0 ? FB_THEME.primary : FB_THEME.borderInput}`,
                    backgroundColor: i === 0 ? FB_THEME.primary + "08" : "transparent",
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: FB_THEME.primary }}>
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold" style={{ color: FB_THEME.text }}>{name}</div>
                    {body.mode === "use" && (
                      <div className="text-xs" style={{ color: FB_THEME.textSecondary }}>
                        Recovery code: pending
                      </div>
                    )}
                  </div>
                  {body.mode === "use" && (
                    <button className="px-3 py-1.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: FB_THEME.primary }}>
                      Get code
                    </button>
                  )}
                  {arrowTarget === "first-contact" && i === 0 && <ArrowTooltip text={tooltipText} position="right" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 2FA SETUP ─── */
function Fb2faSetupMockup({ arrowTarget, tooltipText }: { arrowTarget: string; tooltipText: string }) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-8 px-4">
        <div className="w-full max-w-2xl">
          <div className="rounded-lg" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                Two-factor authentication
              </h2>
              <p className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                Add a second layer of security beyond your password.
              </p>
            </div>

            <div className="px-5 py-5">
              <div className="flex items-start justify-between p-4 rounded-lg mb-4" style={{ border: `1px solid ${FB_THEME.border}` }}>
                <div className="flex-1">
                  <div className="font-semibold mb-1" style={{ color: FB_THEME.text }}>Two-factor authentication</div>
                  <div className="text-sm" style={{ color: FB_THEME.textSecondary }}>
                    Off — your account uses only password protection
                  </div>
                </div>
                <div className="relative">
                  <button
                    id="enable-btn"
                    className="px-5 py-2 rounded-md text-white text-base font-semibold"
                    style={{ backgroundColor: FB_THEME.primary }}
                  >
                    Turn on
                  </button>
                  {arrowTarget === "enable-btn" && <ArrowTooltip text={tooltipText} position="left" />}
                </div>
              </div>

              {/* Recovery codes box */}
              <div id="codes-display" className="relative p-4 rounded-lg" style={{ backgroundColor: FB_THEME.bgWarning, border: `1px solid #F59E0B` }}>
                <div className="font-bold mb-2" style={{ color: FB_THEME.textWarning }}>
                  📝 Your recovery codes
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-sm" style={{ color: FB_THEME.text }}>
                  <div>5829-3147</div>
                  <div>9472-1058</div>
                  <div>3681-7204</div>
                  <div>2596-4831</div>
                  <div>7314-5826</div>
                  <div>1908-3675</div>
                </div>
                <div className="text-xs mt-3" style={{ color: FB_THEME.textWarning }}>
                  Write these down on paper. Each can be used once if you lose your phone.
                </div>
                {arrowTarget === "codes-display" && <ArrowTooltip text={tooltipText} position="above" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FRIEND REQUEST (real or fake clone) ─── */
function FbFriendRequestMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-friend-request" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  const isFake = body.scenarioType === "fake-clone";
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-6 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            {/* Cover photo strip */}
            <div className="h-20" style={{ backgroundColor: FB_THEME.primary + "30" }} />

            <div className="px-5 pb-5 -mt-10">
              {/* Profile photo */}
              <div className="w-20 h-20 rounded-full border-4 mb-3 flex items-center justify-center text-white text-3xl font-bold"
                style={{ backgroundColor: FB_THEME.primary, borderColor: FB_THEME.bgCard }}
              >
                M
              </div>

              <div className="relative">
                <div id="profile-name" className="text-xl font-bold" style={{ color: FB_THEME.text }}>
                  Mary Johnson
                </div>
                {arrowTarget === "profile-name" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>

              {isFake && (
                <div id="joined-date" className="relative inline-block mt-2 px-2 py-1 rounded text-xs font-semibold"
                  style={{ backgroundColor: FB_THEME.bgError, color: FB_THEME.textError }}
                >
                  ⚠ Joined recently · 0 mutual friends · No posts
                  {arrowTarget === "joined-date" && <ArrowTooltip text={tooltipText} position="right" />}
                </div>
              )}
              {!isFake && (
                <div className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                  Joined 8 years ago · 247 mutual friends
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-md text-white text-base font-bold" style={{ backgroundColor: FB_THEME.primary }}>
                  Confirm
                </button>
                <button className="flex-1 px-4 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgPage, color: FB_THEME.text }}>
                  Delete
                </button>
              </div>

              {isFake && (
                <div className="mt-4 p-3 rounded-md text-sm" style={{ backgroundColor: FB_THEME.bgError, color: FB_THEME.textError }}>
                  ⚠ <strong>Possible cloned account.</strong> You may already be friends with the real Mary.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BLOCK / REPORT MENU ─── */
function FbBlockMenuMockup({ arrowTarget, tooltipText }: { arrowTarget: string; tooltipText: string }) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-6 px-4">
        <div className="w-full max-w-lg">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="h-20" style={{ backgroundColor: FB_THEME.primary + "30" }} />
            <div className="px-5 pb-3 -mt-10">
              <div className="w-20 h-20 rounded-full border-4" style={{ backgroundColor: FB_THEME.primary, borderColor: FB_THEME.bgCard }} />
              <div className="text-xl font-bold mt-3" style={{ color: FB_THEME.text }}>
                Mary Johnson
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 rounded-md text-white text-sm font-bold" style={{ backgroundColor: FB_THEME.primary }}>
                  ➕ Add friend
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-semibold" style={{ backgroundColor: FB_THEME.bgPage, color: FB_THEME.text }}>
                  💬 Message
                </button>
                <div className="relative">
                  <button id="menu-button" className="px-3 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgPage, color: FB_THEME.text }}>
                    •••
                  </button>
                  {arrowTarget === "menu-button" && <ArrowTooltip text={tooltipText} position="right" />}
                </div>
              </div>
            </div>

            {/* Drop-down menu */}
            <div className="mx-5 mb-5 rounded-lg overflow-hidden" style={{ border: `1px solid ${FB_THEME.border}`, backgroundColor: FB_THEME.bgCard }}>
              <div className="px-4 py-3 hover:bg-gray-50" style={{ color: FB_THEME.text }}>
                🔕 Snooze for 30 days
              </div>
              <div id="report-option" className="relative px-4 py-3 hover:bg-gray-50" style={{ color: FB_THEME.text, borderTop: `1px solid ${FB_THEME.border}` }}>
                🚩 Find support or report profile
                {arrowTarget === "report-option" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
              <div id="block-option" className="relative px-4 py-3 hover:bg-gray-50 font-semibold" style={{ color: FB_THEME.textError, borderTop: `1px solid ${FB_THEME.border}` }}>
                🚫 Block
                {arrowTarget === "block-option" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
            </div>

            {arrowTarget === "confirm-btn" && (
              <div className="mx-5 mb-5 p-4 rounded-lg relative" style={{ backgroundColor: FB_THEME.bgError + "60", border: `1px solid ${FB_THEME.textError}` }}>
                <div className="font-bold mb-2" style={{ color: FB_THEME.textError }}>
                  Block Mary Johnson?
                </div>
                <div className="text-sm mb-3" style={{ color: FB_THEME.text }}>
                  They won't be able to find your profile, message you, or tag you. You can unblock anytime.
                </div>
                <button id="confirm-btn" className="relative px-5 py-2 rounded-md text-white font-bold" style={{ backgroundColor: FB_THEME.textError }}>
                  Confirm Block
                  <ArrowTooltip text={tooltipText} position="right" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PRIVACY SETTINGS PANEL ─── */
function FbPrivacySettingsMockup({ arrowTarget, tooltipText }: { arrowTarget: string; tooltipText: string }) {
  const settings = [
    { id: "posts-setting", label: "Who can see your future posts?", value: "Friends" },
    { id: "lookup-setting", label: "Who can look you up using your email?", value: "Friends" },
    { id: "lookup-setting-2", label: "Who can look you up using your phone?", value: "Friends" },
    { id: "limit-past", label: "Limit who can see past posts", value: "Limit Old Posts" },
  ];
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex pt-4 px-4 gap-4">
        {/* Side menu */}
        <div className="w-56 flex-shrink-0">
          <div className="rounded-lg p-2" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-3 py-2 text-xs font-bold uppercase" style={{ color: FB_THEME.textSecondary }}>
              Settings
            </div>
            <div className="px-3 py-2 rounded text-sm" style={{ color: FB_THEME.text }}>Account Settings</div>
            <div id="privacy-link" className="relative px-3 py-2 rounded text-sm font-bold" style={{ color: FB_THEME.primary, backgroundColor: FB_THEME.primary + "10" }}>
              Privacy
              {arrowTarget === "privacy-link" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>
            <div id="security-link" className="relative px-3 py-2 rounded text-sm" style={{ color: FB_THEME.text }}>
              Password and security
              {arrowTarget === "security-link" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>
            <div id="account-center" className="relative px-3 py-2 rounded text-sm" style={{ color: FB_THEME.text }}>
              Account Center
              {arrowTarget === "account-center" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>
            <div id="download-link" className="relative px-3 py-2 rounded text-sm" style={{ color: FB_THEME.text }}>
              Your Facebook Information
              {arrowTarget === "download-link" && <ArrowTooltip text={tooltipText} position="right" />}
            </div>
          </div>
        </div>

        {/* Main settings panel */}
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>Privacy Settings</h2>
            </div>
            {settings.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="relative px-5 py-4 flex items-center justify-between border-b"
                style={{ borderColor: FB_THEME.border }}
              >
                <div className="text-base" style={{ color: FB_THEME.text }}>{s.label}</div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold" style={{ color: FB_THEME.text }}>{s.value}</span>
                  <button className="text-sm font-semibold" style={{ color: FB_THEME.primary }}>Edit</button>
                </div>
                {arrowTarget === s.id && <ArrowTooltip text={tooltipText} position="left" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SUSPICIOUS MESSAGE (scam examples) ─── */
function FbSuspiciousMessageMockup({
  body,
  arrowTarget,
  tooltipText,
}: {
  body: Extract<WalkthroughBody, { kind: "fb-suspicious-message" }>;
  arrowTarget: string;
  tooltipText: string;
}) {
  const messages = {
    "fake-friend-help":
      "Hi! It's me Mary, I'm in trouble overseas, my wallet was stolen and I need $500 by Western Union urgently. Please don't tell anyone, I'm so embarrassed 😢 Can you help?",
    "prize-winner":
      "🎉 CONGRATULATIONS! 🎉 You have been selected by Mark Zuckerberg's special senior compensation program. You won $850,000! To claim your prize, send your bank details and a $99 processing fee to claim@meta-prize-2026.tk",
    "fake-security":
      "FACEBOOK SECURITY TEAM: Your account has been flagged for suspicious activity and will be PERMANENTLY DELETED in 24 hours. To prevent deletion, verify your password immediately at: facebook-security-verify.com/login",
  };
  const senderName = {
    "fake-friend-help": "Mary J. (NEW)",
    "prize-winner": "Meta Prize Center",
    "fake-security": "Facebook Security Team",
  };
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center pt-6 px-4">
        <div className="w-full max-w-md">
          {/* Messenger-style header */}
          <div className="rounded-t-lg flex items-center gap-3 px-4 py-3" style={{ backgroundColor: FB_THEME.bgCard, borderBottom: `1px solid ${FB_THEME.border}` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: FB_THEME.textError }}>
              ⚠
            </div>
            <div>
              <div className="font-bold" style={{ color: FB_THEME.text }}>{senderName[body.messageType]}</div>
              <div className="text-xs" style={{ color: FB_THEME.textError }}>⚠ Suspicious sender</div>
            </div>
          </div>

          {/* Message body */}
          <div className="p-4" style={{ backgroundColor: FB_THEME.bgCard }}>
            <div
              id="message-body"
              className="relative p-4 rounded-2xl text-base"
              style={{ backgroundColor: FB_THEME.bgPage, color: FB_THEME.text, border: `2px solid ${FB_THEME.textError}` }}
            >
              {messages[body.messageType]}
              {arrowTarget === "message-body" && <ArrowTooltip text={tooltipText} position="below" />}
            </div>

            <div className="mt-4 p-3 rounded-md text-sm" style={{ backgroundColor: FB_THEME.bgError, color: FB_THEME.textError }}>
              <strong>Red flags spotted:</strong>
              <ul className="mt-1 list-disc pl-5 space-y-0.5">
                <li>Urgency / pressure</li>
                <li>Unusual payment request</li>
                <li>Suspicious sender</li>
                <li>Asks you to keep it secret</li>
              </ul>
            </div>
          </div>

          {/* Reply box */}
          <div className="rounded-b-lg p-3 flex gap-2" style={{ backgroundColor: FB_THEME.bgCard, borderTop: `1px solid ${FB_THEME.border}` }}>
            <input
              type="text"
              placeholder="Don't reply — block & report"
              disabled
              className="flex-1 px-3 py-2 rounded-full text-sm"
              style={{ backgroundColor: FB_THEME.bgPage, color: FB_THEME.textSecondary }}
              readOnly
            />
            <button className="px-3 py-2 rounded-full text-white text-sm font-bold" style={{ backgroundColor: FB_THEME.textError }}>
              🚫 Block
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECURE ACCOUNT (hacked-account flow) ─── */
function FbSecureAccountMockup({ arrowTarget, tooltipText }: { arrowTarget: string; tooltipText: string }) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-8 px-4">
        <div className="w-full max-w-xl">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: FB_THEME.border, backgroundColor: FB_THEME.bgError }}>
              <div className="text-3xl">🔓</div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: FB_THEME.textError }}>
                  My Account is Compromised
                </h2>
                <p className="text-sm" style={{ color: FB_THEME.text }}>
                  We'll help you secure your account.
                </p>
              </div>
            </div>

            <div className="px-5 py-5 space-y-4">
              {/* Recent activity to review */}
              <div id="review-btn" className="relative p-4 rounded-lg" style={{ border: `1px solid ${FB_THEME.border}` }}>
                <div className="font-semibold mb-2" style={{ color: FB_THEME.text }}>Review recent activity</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: FB_THEME.bgError + "40" }}>
                    <span style={{ color: FB_THEME.text }}>📍 Login from Lagos, Nigeria — Yesterday</span>
                    <button className="text-xs font-semibold" style={{ color: FB_THEME.textError }}>Not me</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: FB_THEME.bgError + "40" }}>
                    <span style={{ color: FB_THEME.text }}>✉️ Email changed — 2 hours ago</span>
                    <button className="text-xs font-semibold" style={{ color: FB_THEME.textError }}>Undo</button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: FB_THEME.bgError + "40" }}>
                    <span style={{ color: FB_THEME.text }}>💬 5 messages sent — 1 hour ago</span>
                    <button className="text-xs font-semibold" style={{ color: FB_THEME.textError }}>Review</button>
                  </div>
                </div>
                {arrowTarget === "review-btn" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>

              {/* Upload ID */}
              <div id="upload-btn" className="relative p-4 rounded-lg" style={{ border: `1px solid ${FB_THEME.border}` }}>
                <div className="font-semibold mb-2" style={{ color: FB_THEME.text }}>Verify with photo ID</div>
                <div className="text-sm mb-3" style={{ color: FB_THEME.textSecondary }}>
                  If standard recovery isn't working, upload a clear photo of a government ID.
                </div>
                <button className="px-4 py-2 rounded-md text-white text-base font-semibold" style={{ backgroundColor: FB_THEME.primary }}>
                  📎 Upload ID
                </button>
                {arrowTarget === "upload-btn" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>

              <div id="secure-btn" className="relative">
                <button className="w-full px-5 py-3 rounded-md text-white text-base font-bold" style={{ backgroundColor: FB_THEME.textError }}>
                  My Account Is Compromised
                </button>
                {arrowTarget === "secure-btn" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DELETE CONFIRMATION ─── */
function FbDeleteConfirmMockup({ arrowTarget, tooltipText }: { arrowTarget: string; tooltipText: string }) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: FB_THEME.bgPage }}>
      <FbHeader />
      <div className="flex justify-center items-start pt-8 px-4">
        <div className="w-full max-w-xl">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: FB_THEME.bgCard, boxShadow: FB_THEME.shadowCard }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: FB_THEME.border }}>
              <h2 className="text-2xl font-bold" style={{ color: FB_THEME.text }}>
                Deactivation or deletion
              </h2>
              <p id="deactivation-link" className="relative text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                Choose what happens to your account
                {arrowTarget === "deactivation-link" && <ArrowTooltip text={tooltipText} position="right" />}
              </p>
            </div>

            <div className="px-5 py-5 space-y-3">
              <div className="p-4 rounded-lg" style={{ border: `1px solid ${FB_THEME.borderInput}` }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="action" className="mt-1 w-5 h-5" readOnly />
                  <div>
                    <div className="font-semibold" style={{ color: FB_THEME.text }}>Deactivate account (temporary)</div>
                    <div className="text-sm mt-1" style={{ color: FB_THEME.textSecondary }}>
                      Profile is hidden but everything is preserved. Reverse anytime by logging back in.
                    </div>
                  </div>
                </label>
              </div>

              <div id="delete-option" className="relative p-4 rounded-lg" style={{ border: `2px solid ${FB_THEME.textError}`, backgroundColor: FB_THEME.bgError + "40" }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="action" defaultChecked className="mt-1 w-5 h-5" readOnly />
                  <div>
                    <div className="font-semibold" style={{ color: FB_THEME.textError }}>Delete account (permanent)</div>
                    <div className="text-sm mt-1" style={{ color: FB_THEME.text }}>
                      30-day grace period to change your mind. After day 30, all photos, posts, and messages are permanently deleted.
                    </div>
                  </div>
                </label>
                {arrowTarget === "delete-option" && <ArrowTooltip text={tooltipText} position="right" />}
              </div>
            </div>

            <div className="flex justify-end gap-2 px-5 py-3 border-t" style={{ backgroundColor: "#F5F6F7", borderColor: FB_THEME.border }}>
              <button className="px-5 py-2 rounded-md text-base font-semibold" style={{ backgroundColor: FB_THEME.bgCard, color: FB_THEME.text, border: `1px solid ${FB_THEME.borderInput}` }}>
                Cancel
              </button>
              <div className="relative">
                <button id="confirm-btn" className="px-5 py-2 rounded-md text-base font-bold text-white" style={{ backgroundColor: FB_THEME.textError }}>
                  Continue
                </button>
                {arrowTarget === "confirm-btn" && <ArrowTooltip text={tooltipText} position="left" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
