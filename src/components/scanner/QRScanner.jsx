"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ImageScanner from "./ImageScanner";
import ScanResult from "./ScanResult";
import { Camera, UploadCloud, ScanLine } from "lucide-react";

const CameraScanner = dynamic(() => import("./CameraScanner"), {
  ssr: false,
  loading: () => (
    <div className="py-16 text-center text-sm text-[var(--muted)]">
      Loading camera…
    </div>
  ),
});

export default function QRScanner() {
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("camera");

  return (
    <div className="w-full max-w-md mx-auto space-y-5 animate-fade-up-delay-1">
      {/* ── Scanner Card ───────────────────────────── */}
      <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-3">
          <ScanLine className="w-5 h-5 text-indigo-500" />
          <h2 className="font-semibold text-zinc-900 dark:text-white">
            Scan QR Code
          </h2>
        </div>

        {/* Tabs */}
        <div className="px-5">
          <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl">
            <button
              type="button"
              onClick={() => setMode("camera")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "camera"
                  ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <Camera size={16} /> Camera
            </button>
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "upload"
                  ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <UploadCloud size={16} /> Upload
            </button>
          </div>
        </div>

        {/* Panel */}
        <div className="p-5">
          {mode === "camera" ? (
            <CameraScanner onResult={setResult} />
          ) : (
            <ImageScanner onResult={setResult} />
          )}
        </div>
      </div>

      {/* ── Result (always below) ──────────────────── */}
      {result && (
        <ScanResult value={result} onClear={() => setResult("")} />
      )}
    </div>
  );
}