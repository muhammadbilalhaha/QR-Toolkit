// ============================================
// QR Generator — pure functions, no React
// ============================================

import QRCode from "qrcode";

/**
 * Returns a PNG data URL for the given text.
 * Used for the "Download PNG" button.
 */
export async function generatePngDataUrl(text, options = {}) {
  if (!text?.trim()) return null;

  return QRCode.toDataURL(text, {
    width: 1024,
    margin: 2,
    errorCorrectionLevel: "M",
    color: {
      dark: "#0a0a0a",
      light: "#ffffff",
    },
    ...options,
  });
}

/**
 * Triggers a browser download of a PNG QR code.
 */
export async function downloadQrPng(text, filename = "qr-code.png") {
  const dataUrl = await generatePngDataUrl(text);
  if (!dataUrl) return;

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}