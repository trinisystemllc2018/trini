import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Free Tech Support 347-953-1531",
  description: "Contact Trini System LLC — call 347-953-1531 for free printer, GPS & PC tech support. Remote service all 50 states. Fast callback — usually under 5 min.",
  alternates: { canonical: "https://trinisystem.vercel.app/contact" },
  keywords: [
    "contact trini system","tech support phone number","printer repair phone",
    "call printer technician","trini system contact","tech support callback",
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
