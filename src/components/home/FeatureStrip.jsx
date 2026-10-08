import { Zap, Shield, QrCode } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap size={20} />,
    title: "Instant Speed",
    text: "Runs entirely in your browser. Zero loading, zero waiting.",
    accent: "group-hover:bg-amber-500/10 group-hover:text-amber-500 group-hover:shadow-amber-500/10",
  },
  {
    icon: <Shield size={20} />,
    title: "100% Private",
    text: "Nothing leaves your device. No servers, no analytics, no tracking.",
    accent: "group-hover:bg-emerald-500/10 group-hover:text-emerald-500 group-hover:shadow-emerald-500/10",
  },
  {
    icon: <QrCode size={20} />,
    title: "Complete Suite",
    text: "Five generator types plus advanced camera and image scanning.",
    accent: "group-hover:bg-indigo-500/10 group-hover:text-indigo-500 group-hover:shadow-indigo-500/10",
  },
];

export default function PremiumFeatureStrip() {
  return (
    <section className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto w-full pt-4 sm:pt-8 animate-fade-up-delay-2">
      {FEATURES.map((f) => (
        <div
          key={f.title}
          className="group relative flex flex-col items-start gap-4 p-6 rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/70 dark:hover:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-black/5"
        >
          {/* Subtle top reflection line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />

          {/* Icon Badge */}
          <div
            className={`w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-all duration-300 group-hover:scale-110 shadow-sm ${f.accent}`}
          >
            {f.icon}
          </div>

          {/* Feature Text */}
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1.5 transition-colors duration-300">
              {f.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {f.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}