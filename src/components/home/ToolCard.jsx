import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ href, icon, title, description, cta, accent = "indigo" }) {
  // Theme variants for subtle hover accents
  const isEmerald = accent === "emerald";

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/70 dark:hover:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-black/5 overflow-hidden"
    >
      {/* Top reflection line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Content */}
      <div className="flex flex-col gap-4">
        {/* Icon Wrapper */}
        <div
          className={`w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 transition-all duration-300 group-hover:scale-110 shadow-sm ${
            isEmerald
              ? "group-hover:bg-emerald-500/10 group-hover:text-emerald-500 group-hover:shadow-emerald-500/10"
              : "group-hover:bg-indigo-500/10 group-hover:text-indigo-500 group-hover:shadow-indigo-500/10"
          }`}
        >
          {icon}
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
            {title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* CTA Button Link */}
      <div className="flex items-center gap-2 text-sm font-semibold transition-colors">
        <span
          className={
            isEmerald
              ? "text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500"
              : "text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-500"
          }
        >
          {cta}
        </span>
        <ArrowRight
          size={16}
          className={`transition-transform duration-300 group-hover:translate-x-1.5 ${
            isEmerald
              ? "text-zinc-400 group-hover:text-emerald-500"
              : "text-zinc-400 group-hover:text-indigo-500"
          }`}
        />
      </div>
    </Link>
  );
}