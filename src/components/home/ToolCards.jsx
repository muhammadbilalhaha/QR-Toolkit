import { QrCode, ScanLine } from "lucide-react";
import ToolCard from "./ToolCard";

const TOOLS = [
  {
    href: "/generator",
    icon: <QrCode size={26} />,
    title: "QR Generator",
    description:
      "Create custom QR codes from URLs, plain text, email, phone numbers, or Wi-Fi credentials.",
    cta: "Open generator",
    accent: "indigo",
  },
  {
    href: "/scanner",
    icon: <ScanLine size={26} />,
    title: "QR Scanner",
    description:
      "Scan live with your camera or upload an image. Instant decoding with zero server uploads.",
    cta: "Open scanner",
    accent: "emerald",
  },
];

export default function PremiumToolCards() {
  return (
    <section className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto w-full animate-fade-up-delay-1">
      {TOOLS.map((tool) => (
        <ToolCard key={tool.href} {...tool} />
      ))}
    </section>
  );
}