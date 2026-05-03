import type { Metadata } from "next";
import { TechER } from "@/components/features/TechER";
import { StickyCTA } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Reparación de Impresoras — HP, Canon, Epson",
  description: "Reparación de impresoras HP, Canon, Epson, Brother. Servicio técnico remoto en español. Errores de tinta, configuración WiFi. Llame: 347-953-1531.",
  alternates: { canonical: "https://trinisystem.vercel.app/reparacion-impresoras" },
  keywords: [
    "reparacion de impresoras cerca de mi","impresoras epson","impresoras hp","impresoras canon",
    "servicio tecnico impresoras","reparacion impresoras new york","impresora no imprime",
    "error impresora","configurar impresora wifi","reparar impresora epson ecotank",
    "impresora hp no imprime","impresora canon error b200","soporte tecnico impresoras",
  ],
};

const SPANISH_TRENDING = [
  "Impresora HP no imprime","Error tinta Epson EcoTank","Impresora Canon B200",
  "Configurar impresora WiFi","Impresora offline Windows","Actualizar GPS Garmin",
  "Computadora lenta","Reparacion impresora Brother",
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://trinisystem.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://trinisystem.vercel.app/services" },
      { "@type": "ListItem", "position": 3, "name": "Reparación de Impresoras", "item": "https://trinisystem.vercel.app/reparacion-impresoras" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "es",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo arreglo mi impresora HP que no imprime?",
        "acceptedAnswer": { "@type": "Answer", "text": "Apague la impresora y el router de internet. Desconéctelos por 30 segundos. Vuelva a conectar el router primero y espere 60 segundos. Luego encienda la impresora. Si sigue sin imprimir, llame a Trini System al 347-953-1531 — resolvemos problemas de HP de forma remota en menos de 15 minutos." }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta la reparación de impresoras en Trini System?",
        "acceptedAnswer": { "@type": "Answer", "text": "La reparación remota de impresoras comienza desde $49 — aproximadamente la mitad del precio de Geek Squad. La mayoría de los problemas se resuelven en una sesión remota de 30 minutos. Sin solución = sin pago." }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen soporte técnico en español?",
        "acceptedAnswer": { "@type": "Answer", "text": "Sí. Trini System ofrece soporte técnico remoto completamente en español para impresoras HP, Canon, Epson y Brother, así como para computadoras lentas, eliminación de virus y actualizaciones de GPS Garmin. Llame al 347-953-1531." }
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Reparación de Impresoras en Español",
    "inLanguage": "es",
    "provider": { "@type": "LocalBusiness", "name": "Trini System LLC", "telephone": "+13479531531" },
    "areaServed": "United States",
    "serviceType": "Printer Repair — Spanish Language Support",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
  },
];

export default function ReparacionImprisorasPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="bg-orange-600 text-white py-3 text-center text-sm font-semibold">
        🇪🇸 Soporte en Español — Servicio Remoto, Los 50 Estados ·{" "}
        <a href="tel:+13479531531" className="underline font-bold">Llame: 347-953-1531</a>
      </div>
      {/* Spanish intro section */}
      <section className="py-10 bg-gradient-to-b from-orange-50 to-white border-b border-orange-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-orange-200">
            🇪🇸 Soporte Técnico en Español
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Reparación de Impresoras
            <span className="block text-orange-600">¡En Español!</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Reparamos impresoras HP, Canon, Epson y Brother de forma remota — sin salir de su casa. Servicio disponible en los 50 estados de EE.UU. <strong>Sin solución = sin pago.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+13479531531"
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition-all">
              📞 Llame: 347-953-1531
            </a>
          </div>
        </div>
      </section>
      <TechER pageTrending={SPANISH_TRENDING} />
      <StickyCTA />
    </>
  );
}
