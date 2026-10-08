// ============================================
// QR Scanner — pure functions, no React
// ============================================

import jsQR from "jsqr";

/**
 * Decode a QR code from an image File.
 *
 * Uses createImageBitmap for fast, off-thread decoding,
 * then draws to a canvas to read pixel data for jsQR.
 *
 * @param {File} file - image file from <input type="file">
 * @returns {Promise<string|null>} decoded text, or null if no QR found
 */
export async function decodeQRFromFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Not an image file");
  }

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  bitmap.close?.(); // free memory if supported

  const result = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "attemptBoth", // handles inverted (light-on-dark) QRs
  });

  return result?.data || null;
}