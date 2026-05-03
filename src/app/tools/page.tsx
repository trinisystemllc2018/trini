import type { Metadata } from "next";
import { SmartProblemFinder } from "@/components/features/SmartProblemFinder";
import { PrinterSimulator } from "@/components/features/PrinterSimulator";
import { DeviceCompatChecker, OneClickHelpMode } from "@/components/features/CompatChecker";
import { LiveStatusDashboard } from "@/components/features/LiveStatusDashboard";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Free Tech Tools — Printer Setup & Diagnostics",
  description: "Free interactive tools: Smart Problem Finder, Printer Setup Simulator, Device Compatibility Checker, and PC Cleaner Demo. Fix tech issues faster.",
  alternates: { canonical: "https://trinisystem.vercel.app/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <div className="pt-8 pb-16 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
            🛠️ Free Interactive Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Solve Your Tech Problem
            <span className="block text-gradient"> Right Now</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Our interactive tools help you diagnose and fix printer, PC and device issues — no tech knowledge required. And if you get stuck, we&apos;re one call away.
          </p>
          {/* One-Click Help Mode CTA */}
          <div className="max-w-xl mx-auto">
            <OneClickHelpMode />
          </div>
        </div>
      </div>

      {/* Tool: Smart Problem Finder */}
      <SmartProblemFinder />

      {/* Tool: Compatibility Checker */}
      <DeviceCompatChecker />

      {/* Tool: Printer Simulator */}
      <PrinterSimulator />

      {/* Tool: Live Status Dashboard */}
      <LiveStatusDashboard />

      <StickyCTA />
    </>
  );
}
