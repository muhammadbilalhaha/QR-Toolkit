"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { QrCode, Sparkles } from "lucide-react";

const NAV = [
  { href: "/generator", label: "Generator" },
  { href: "/scanner", label: "Scanner" },
];

export default function PremiumHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl transition-colors">
      {/* Top ambient highlight hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
      />

      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight sm:text-base"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 ring-1 ring-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/30">
            <QrCode
              size={18}
              strokeWidth={2.5}
              className="text-white drop-shadow-sm"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"
            />
          </span>
          <span className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-white transition-colors">
              QR Toolkit
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/20">
              <Sparkles size={10} />
              PRO
            </span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md">
          {NAV.map(({ href, label }) => {
            const active =
              pathname === href || pathname?.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}