import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md mt-auto transition-colors">
      {/* Top ambient highlight hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
        {/* Brand Copyright */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            QR Toolkit Pro
          </span>
          <span className="opacity-40">©</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>100% Client-Side</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
            <span>·</span>
            <span>Free & Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}