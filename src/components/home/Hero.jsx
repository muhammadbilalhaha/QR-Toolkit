import { Sparkles, ArrowRight } from "lucide-react";

export default function PremiumHero() {
  return (
    <section className="relative flex flex-col items-center text-center gap-6 pt-12 sm:pt-20 pb-6 sm:pb-10 overflow-hidden">
      {/* Subtle Background Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-emerald-500/5 blur-3xl rounded-full pointer-events-none -z-10"
      />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:border-indigo-500/40">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Sparkles size={13} className="text-indigo-500" />
        <span>Free · No Signup · 100% Client-Side</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.15] text-zinc-900 dark:text-white">
        Create and scan QR codes{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
          in seconds.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed font-normal">
        A fast, private, and complete QR toolkit. Everything processes directly in your browser — zero servers, zero tracking.
      </p>
    </section>
  );
}