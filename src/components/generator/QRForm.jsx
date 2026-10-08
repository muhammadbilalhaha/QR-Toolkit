"use client";

import { QR_TYPES } from "@/config/qr-types";
import { ChevronDown } from "lucide-react";

export default function PremiumQRForm({ type, values, onChange }) {
  const schema = QR_TYPES[type];
  if (!schema) return null;

  return (
    <div className="w-full space-y-5">
      {schema.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name] ?? field.default ?? ""}
          onChange={(val) => onChange(field.name, val)}
        />
      ))}
    </div>
  );
}

function Field({ field, value, onChange }) {
  const id = `field-${field.name}`;

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
      >
        <span>{field.label}</span>
        {field.required && (
          <span className="text-rose-500 font-bold" title="Required field">
            *
          </span>
        )}
      </label>

      {/* Inputs */}
      {field.type === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none text-sm shadow-sm"
        />
      ) : field.type === "select" ? (
        <div className="relative w-full">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none px-4 py-3 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm shadow-sm pr-10 cursor-pointer"
          >
            {field.options?.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
            <ChevronDown size={18} />
          </div>
        </div>
      ) : (
        <input
          id={id}
          type={field.type || "text"}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm shadow-sm"
        />
      )}

      {/* Optional Description / Hint */}
      {field.description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {field.description}
        </p>
      )}
    </div>
  );
}