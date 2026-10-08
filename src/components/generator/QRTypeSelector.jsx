"use client";

import * as Icons from "lucide-react";
import { QR_TYPES, QR_TYPE_ORDER } from "@/config/qr-types";

export default function PremiumQRTypeSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
      {QR_TYPE_ORDER.map((typeId) => {
        const type = QR_TYPES[typeId];
        const Icon = Icons[type.icon] || Icons.Circle;
        const active = value === typeId;

        return (
          <button
            key={typeId}
            type="button"
            onClick={() => onChange(typeId)}
            aria-pressed={active}
            className={`
              inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold
              rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer
              ${
                active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60"
              }
            `}
          >
            <Icon size={16} strokeWidth={2.25} />
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}