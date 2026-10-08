import QRScanner from "@/components/scanner/QRScanner";

export const metadata = {
  title: "QR Scanner | QR Toolkit",
  description:
    "Scan QR codes with your camera or upload an image. Instant decoding, nothing uploaded.",
};

export default function ScannerPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="space-y-2 animate-fade-up">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          QR Scanner
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-2xl">
          Scan with your device camera or upload an image. Everything is
          decoded in your browser nothing is uploaded.
        </p>
      </header>

      <QRScanner />
    </div>
  );
}