import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHONE, PHONE_HREF } from "@/lib/utils";
import { GARMIN_MODELS, type GarminKey } from "@/lib/seo-data";

interface Props { params: { model: string } }

export async function generateStaticParams() {
  return Object.keys(GARMIN_MODELS).map(model => ({ model }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const model = GARMIN_MODELS[params.model as GarminKey];
  if (!model) return {};
  const title = `Garmin ${model.name} Map Update Guide`;
  const description = `Update maps on Garmin ${model.name} step-by-step with Garmin Express. Free guide. Call 347-953-1531 — we update your GPS remotely.`;
  const url = `https://trinisystem.vercel.app/garmin-update/${params.model}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Trini System`, description, url },
    keywords: [`garmin ${model.name.toLowerCase()} update`, "garmin map update", "garmin gps update", "garmin express help"],
  };
}

export default function GarminUpdatePage({ params }: Props) {
  const model = GARMIN_MODELS[params.model as GarminKey];
  if (!model) notFound();

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Update Garmin ${model.name} Maps`,
    "description": `Step-by-step guide to update maps on Garmin ${model.name} using Garmin Express`,
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Install Garmin Express", "text": "Download Garmin Express from garmin.com/express on your computer." },
      { "@type": "HowToStep", "position": 2, "name": "Connect GPS", "text": `Connect your Garmin ${model.name} to your computer via USB while it's powered on.` },
      { "@type": "HowToStep", "position": 3, "name": "Sign in", "text": "Sign in to your free Garmin account to link your device to your map license." },
      { "@type": "HowToStep", "position": 4, "name": "Download updates", "text": "Click Add Map Updates. The download is 4-8GB — keep computer on and GPS connected throughout." },
      { "@type": "HowToStep", "position": 5, "name": "Eject safely", "text": "Click eject in Garmin Express before unplugging. Verify new map date in Settings → About." },
    ],
  };

  const steps = [
    { icon: "💻", title: "Download Garmin Express (official only)", detail: `Go to garmin.com/express on your computer. Download and install Garmin Express — the official, free map update tool. Do not use third-party "Garmin update" sites — most are scams or malware.` },
    { icon: "🔌", title: `Connect your ${model.name} via USB`, detail: `Find the USB cable that came in the Garmin box${model.connection === "USB only" ? " (micro-USB)" : " (micro-USB or the included cable)"}. Power on your ${model.name} first, then connect to your computer. Garmin Express should detect it within 30 seconds.` },
    { icon: "📧", title: "Sign in to your Garmin account", detail: "Create a free account at connect.garmin.com if you don't have one. Signing in links your device to your map license and activates any Lifetime Map updates that came with your GPS." },
    { icon: "🗺️", title: "Download map updates", detail: `Click "Add Map Updates" or "Install All." North America maps are 4-8GB — let the download run completely. Keep your computer on, the GPS connected, and do not let the computer sleep. This takes 30-90 minutes.` },
    { icon: "✅", title: "Eject safely and verify", detail: `When Garmin Express shows "Update complete," click the eject icon next to your ${model.name} before unplugging the cable. Power on the GPS → Settings → About → confirm the new map date.` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="bg-amber-600 text-white py-2 text-center text-sm font-semibold">
        🗺️ Garmin {model.name} Map Update — Remote Help Available ·{" "}
        <a href={PHONE_HREF} className="underline">Call {PHONE}</a>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-gray-600">Home</Link> /
          <span>Garmin Update</span> /
          <span className="text-amber-600">{model.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Garmin {model.name} Map Update
        </h1>

        {/* Quick answer block — LLM optimized */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Quick Answer</p>
          <p className="text-gray-800 text-sm leading-relaxed">
            To update your Garmin {model.name}: install Garmin Express from garmin.com/express, connect via USB while powered on, sign in to a free Garmin account, then click Add Map Updates. The download is 4-8GB and takes 30-90 minutes. Do not disconnect during the update.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Screen size",   value: model.screen },
            { label: "Connection",    value: model.connection },
            { label: "Update method", value: "Garmin Express" },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="font-black text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-black text-gray-900 mb-5">How to update Garmin {model.name} maps</h2>
        <div className="space-y-4 mb-10">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 bg-white border-2 border-gray-100 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">{i + 1}</div>
              <div className="text-2xl shrink-0 mt-0.5">{step.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 text-white text-center mb-8">
          <h3 className="font-black text-xl mb-2">Garmin update stuck or not working?</h3>
          <p className="text-gray-300 text-sm mb-4">We update Garmin GPS devices remotely while you watch — every model, including {model.name}. Free diagnosis.</p>
          <a href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-black px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition-colors">
            📞 Call {PHONE}
          </a>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="font-bold text-gray-900 mb-3 text-sm">Other Garmin models we support:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(GARMIN_MODELS)
              .filter(([key]) => key !== params.model)
              .map(([key, m]) => (
                <Link key={key} href={`/garmin-update/${key}`}
                  className="text-xs bg-white border border-gray-200 hover:border-amber-300 px-3 py-1.5 rounded-xl text-gray-600 hover:text-amber-700 transition-colors">
                  Garmin {m.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
