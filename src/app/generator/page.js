import QRGenerator from "@/components/generator/QRGenerator";

export const metadata = {
  title: "QR Generator | QR Toolkit",
  description:
    "Generate QR codes for URLs, text, email, phone numbers, and Wi-Fi networks.",
};

export default function GeneratorPage() {
  return (
    <div className="relative space-y-8 sm:space-y-10">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-64 bg-[radial-gradient(ellipse_at_top,var(--accent)/0.12,transparent_60%)]"
      />

      <header className="animate-fade-up space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          Runs entirely in your browser
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            QR{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/60 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
            Pick a type, fill in the details, and download a crisp, print-ready
            QR code. No accounts, no tracking — just fast, private generation.
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-[var(--border)] via-[var(--border)]/40 to-transparent" />
      </header>

      <QRGenerator />
    </div>
  );
}