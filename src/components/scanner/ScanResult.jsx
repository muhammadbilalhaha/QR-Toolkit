"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, X, FileText, Link2, Mail, Phone, Wifi } from "lucide-react";

// --------------------------------------------------
// Detect the kind of content the QR represents
// --------------------------------------------------
function classify(value) {
    if (!value) return { kind: "unknown", Icon: FileText };

    // URL
    try {
        const u = new URL(value);
        if (u.protocol === "http:" || u.protocol === "https:") {
            return { kind: "url", Icon: Link2 };
        }
    } catch { }

    // Email
    if (/^mailto:/i.test(value)) return { kind: "email", Icon: Mail };

    // Phone
    if (/^tel:/i.test(value)) return { kind: "phone", Icon: Phone };

    // Wi-Fi
    if (/^WIFI:/i.test(value)) return { kind: "wifi", Icon: Wifi };

    return { kind: "text", Icon: FileText };
}

// --------------------------------------------------
// Result panel
// --------------------------------------------------
export default function ScanResult({ value, onClear }) {
    const [copied, setCopied] = useState(false);

    if (!value) return null;

    const { kind, Icon } = classify(value);
    const isUrl = kind === "url";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="card flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
                        <Icon size={14} className="text-[var(--accent)]" />
                    </div>
                    <span className="text-sm font-semibold capitalize">{kind}</span>
                </div>

                <button
                    type="button"
                    onClick={onClear}
                    className="w-7 h-7 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/5 transition flex items-center justify-center"
                    aria-label="Clear result"
                >
                    <X size={15} />
                </button>
            </div>

            {/* Value */}
            <div className="rounded-lg bg-[var(--bg)] border border-[var(--border)] p-3">
                <p className="text-sm font-mono break-all whitespace-pre-wrap">
                    {value}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleCopy}
                    className="btn flex-1"
                >
                    {copied ? (
                        <>
                            <Check size={15} /> Copied
                        </>
                    ) : (
                        <>
                            <Copy size={15} /> Copy
                        </>
                    )}
                </button>

                {isUrl && (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary flex-1"
                    >
                        <ExternalLink size={15} /> Open URL
                    </a>
                )}
            </div>
        </div>
    );
}