"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Download, Check, QrCode, Sparkles, Loader2 } from "lucide-react";
import { downloadQrPng } from "@/lib/qr-generator";

export default function PremiumQRPreview({ value }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const hasValue = Boolean(value?.trim());

  const handleCopy = async () => {
    if (!hasValue) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

const handleDownload = async () => {
  if (!hasValue || downloading) return;
  setDownloading(true);
  try {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const stamp =
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
      `_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
    await downloadQrPng(value, `qr-code_${stamp}.png`);
  } finally {
    setDownloading(false);
  }
};

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Preview
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasValue ? "bg-emerald-400" : "hidden"}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${hasValue ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"}`} />
        </span>
      </div>

      {/* QR Canvas Container */}
      <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-inner p-6 transition-all duration-300">
        {hasValue ? (
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <QRCodeCanvas
              value={value}
              size={220}
              level="M"
              marginSize={1}
              className="rounded-md"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-zinc-400 dark:text-zinc-600 text-center">
            <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900">
              <QrCode size={32} strokeWidth={1.5} />
            </div>
            <p className="text-xs max-w-[180px] leading-relaxed">
              Fill out the details above to generate your QR code
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!hasValue}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {copied ? (
            <>
              <Check size={16} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!hasValue || downloading}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {downloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          <span>{downloading ? "Saving..." : "Download"}</span>
        </button>
      </div>
    </div>
  );
}