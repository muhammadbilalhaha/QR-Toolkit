"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Camera,
  Loader2,
  AlertCircle,
  CameraOff,
  ScanLine,
  CheckCircle2,
  Activity,
  Maximize2,
} from "lucide-react";

const REGION_ID = "qr-camera-region";

export default function PremiumCameraScanner({ onResult }) {
  const scannerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | starting | active | success | error
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({ resolution: "", fps: 10 });
  const [elapsed, setElapsed] = useState(0);

  // ── Start camera ─────────────────────────────
  const start = async () => {
    setStatus("starting");
    setError("");
    setElapsed(0);

    try {
      const scanner = new Html5Qrcode(REGION_ID, { verbose: false });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          aspectRatio: 1,
          qrbox: (vw, vh) => {
            const size = Math.min(vw, vh) * 0.7;
            return { width: size, height: size };
          },
        },
        (decodedText) => {
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(200);
          }
          setStatus("success");
          setTimeout(() => {
            onResult(decodedText);
            stop();
          }, 900);
        },
        () => {} // silent per-frame failures
      );

      // Capture camera metadata for the status strip
      try {
        const video = document.querySelector(`#${REGION_ID} video`);
        if (video) {
          video.onloadedmetadata = () => {
            setMeta({
              resolution: `${video.videoWidth}×${video.videoHeight}`,
              fps: 10,
            });
          };
        }
      } catch {}

      setStatus("active");
    } catch (err) {
      console.error(err);
      scannerRef.current = null;
      setError(friendlyError(err));
      setStatus("error");
    }
  };

  // ── Stop camera ──────────────────────────────
  const stop = async () => {
    const scanner = scannerRef.current;
    if (!scanner) {
      setStatus("idle");
      return;
    }
    try {
      await scanner.stop();
    } catch {}
    try {
      scanner.clear();
    } catch {}
    scannerRef.current = null;
    if (status !== "success") setStatus("idle");
    setElapsed(0);
  };

  // ── Elapsed-time ticker while active ─────────
  useEffect(() => {
    if (status !== "active") return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(100%); }
        }
        .animate-scan { animation: scan 3s ease-in-out infinite; }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .pulse-ring { animation: pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>

      <div className="flex flex-col gap-4">
        {/* ── Camera Stage ─────────────────────── */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-inner">
          {/* Html5Qrcode target */}
          <div
            id={REGION_ID}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              status === "active" || status === "success"
                ? "opacity-100"
                : "opacity-0"
            }`}
          />

          {/* ── Idle ───────────────────────────── */}
          {status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center">
                  <Camera size={30} className="text-zinc-400" />
                </div>
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-indigo-400 rounded-tl-md" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-indigo-400 rounded-tr-md" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-indigo-400 rounded-bl-md" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-indigo-400 rounded-br-md" />
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Camera is off
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Point at a QR code after starting
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                <Activity size={12} className="text-indigo-400" />
                Auto-detects · No upload needed
              </div>
            </div>
          )}

          {/* ── Starting ───────────────────────── */}
          {status === "starting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-100/90 dark:bg-zinc-950/90 backdrop-blur-sm z-20 px-6">
              {/* Pulsing camera ring */}
              <div className="relative">
                <span className="pulse-ring absolute inset-0 rounded-full bg-indigo-500/40" />
                <div className="relative w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center">
                  <Camera size={26} className="text-indigo-500" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin text-indigo-500" />
                  Accessing camera…
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Please allow permission if prompted
                </p>
              </div>
            </div>
          )}

          {/* ── Active scanning overlay ────────── */}
          {status === "active" && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%] border-2 border-white/20 rounded-xl shadow-[0_0_0_999px_rgba(0,0,0,0.4)] overflow-hidden">
                <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-indigo-500/50 animate-scan border-b-2 border-indigo-500 shadow-[0_4px_15px_rgba(99,102,241,0.5)]" />
              </div>
              <div className="absolute top-[12%] left-[12%] w-[76%] h-[76%]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-500 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-500 rounded-br-2xl" />
              </div>

              {/* Live badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1">
                <span className="flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-medium text-white tracking-wide">
                  LIVE · {elapsed}s
                </span>
              </div>
            </div>
          )}

          {/* ── Success ────────────────────────── */}
          {status === "success" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-emerald-500/95 backdrop-blur-md z-30 animate-in fade-in duration-200">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <p className="text-white font-semibold">QR Detected</p>
              <p className="text-emerald-50 text-xs">Loading result…</p>
            </div>
          )}
        </div>

        {/* ── Status strip (like filename chip) ─ */}
        {status === "active" && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
            <span className="flex items-center gap-2 truncate">
              <ScanLine size={14} className="shrink-0 text-indigo-500" />
              <span className="font-mono truncate">
                {meta.resolution || "Detecting resolution…"}
              </span>
            </span>
            <span className="flex items-center gap-1.5 shrink-0 text-emerald-600 dark:text-emerald-400">
              <Maximize2 size={12} />
              {meta.fps} fps
            </span>
          </div>
        )}

        {/* ── Error banner ───────────────────── */}
        {error && (
          <div className="flex items-start gap-3 text-sm text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 rounded-xl px-4 py-3 animate-in slide-in-from-top-2">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        {/* ── Controls ───────────────────────── */}
        <div className="flex gap-3">
          {status === "active" ? (
            <button
              type="button"
              onClick={stop}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200"
            >
              <CameraOff size={18} /> Stop Scanning
            </button>
          ) : (
            <button
              type="button"
              onClick={start}
              disabled={status === "starting" || status === "success"}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {status === "starting" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Camera size={18} />
              )}
              {status === "starting" ? "Warming up…" : "Start Camera"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ── Friendly errors ───────────────────────────
function friendlyError(err) {
  const msg = String(err?.message || err || "").toLowerCase();

  if (msg.includes("permission") || msg.includes("denied"))
    return "Camera access denied. Please enable permissions in your browser settings.";
  if (msg.includes("notfound") || msg.includes("no camera") || msg.includes("requested device not found"))
    return "No camera detected. Please ensure your device has a working camera.";
  if (msg.includes("secure") || msg.includes("https"))
    return "Camera requires a secure connection (HTTPS).";
  if (msg.includes("notallowed") || msg.includes("notallowederror"))
    return "Camera access was blocked by your browser.";
  return "Could not initialize camera. Another app might be using it.";
}