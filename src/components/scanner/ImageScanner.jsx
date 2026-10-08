"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  UploadCloud,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  FileImage,
  Sparkles,
} from "lucide-react";
import { decodeQRFromFile } from "@/lib/qr-scanner";

export default function ImageScanner({ onResult }) {
  const inputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | scanning | success
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);

  // Revoke preview URL on cleanup
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleClick = () => {
    if (status === "idle") inputRef.current?.click();
  };

  // Simulated progress ticker for a richer feel
  useEffect(() => {
    if (status !== "scanning") return;
    setProgress(8);
    const id = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 14));
    }, 180);
    return () => clearInterval(id);
  }, [status]);

  const reset = () => {
    setStatus("idle");
    setFileName("");
    setProgress(0);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
  };

  const processFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError("");
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("scanning");

    try {
      const data = await decodeQRFromFile(file);

      if (data) {
        setProgress(100);
        setStatus("success");
        // Let success state breathe before emitting result
        setTimeout(() => {
          onResult(data);
          reset();
        }, 1100);
      } else {
        setError("No QR code found in this image. Try a clearer photo.");
        reset();
      }
    } catch {
      setError("Could not read that file. Try a clearer PNG or JPG.");
      reset();
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleFile = (e) => processFile(e.target.files?.[0]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.length) processFile(files[0]);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Dropzone / Preview Stage ─────────────── */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full aspect-square rounded-2xl overflow-hidden
          border-2 border-dashed transition-all duration-200
          ${isDragging
            ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-500/10 scale-[1.01]"
            : "border-zinc-300 dark:border-zinc-700"}
          ${status === "idle"
            ? "cursor-pointer hover:border-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
            : "cursor-default"}
        `}
      >
        {/* ── Idle: instructional ───────────────── */}
        {status === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            {/* Faux QR frame to hint purpose */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <UploadCloud
                  size={30}
                  className={isDragging ? "text-indigo-600" : "text-zinc-400"}
                />
              </div>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-indigo-400 rounded-tl-md" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-indigo-400 rounded-tr-md" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-indigo-400 rounded-bl-md" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-indigo-400 rounded-br-md" />
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Drop an image here
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                or click to browse · PNG, JPG, WebP
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
              <Sparkles size={12} className="text-indigo-400" />
              Works with screenshots &amp; photos
            </div>
          </div>
        )}

        {/* ── Scanning: preview + overlay ───────── */}
        {status === "scanning" && (
          <>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-contain bg-zinc-950/90"
              />
            )}
            {/* Scanning beam over preview */}
            <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
              <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent animate-scan" />
            </div>
            {/* Bottom progress bar + label */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2 text-white text-xs font-medium mb-2">
                <Loader2 size={14} className="animate-spin" />
                Decoding QR…
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-indigo-400 transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        )}

        {/* ── Success: confirmation ─────────────── */}
        {status === "success" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-emerald-500/95 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <CheckCircle2 size={36} className="text-emerald-500" />
            </div>
            <p className="text-white font-semibold">QR Decoded</p>
            <p className="text-emerald-50 text-xs">Loading result…</p>
          </div>
        )}
      </div>

      {/* ── Filename chip (while scanning / after) ── */}
      {fileName && status !== "success" && (
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
          <FileImage size={14} className="shrink-0 text-indigo-500" />
          <span className="truncate font-mono">{fileName}</span>
        </div>
      )}

      {/* ── Error ─────────────────────────────── */}
      {error && (
        <div className="flex items-start gap-3 text-sm text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 rounded-xl px-4 py-3 animate-in slide-in-from-top-2">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="leading-tight">{error}</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}