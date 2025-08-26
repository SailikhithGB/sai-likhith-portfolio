import { strToU8, zlibSync, unzipSync } from 'fflate';

export async function compressImageToJpeg(blob: Blob, maxWidth = 720, quality = 0.5): Promise<Blob> {
  const img = await createImageBitmap(blob);
  const scale = Math.min(1, maxWidth / img.width);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, w, h);
  const out = await canvas.convertToBlob({ type: 'image/jpeg', quality });
  return out;
}

export function compressJson(obj: any): Uint8Array {
  const s = JSON.stringify(obj);
  return zlibSync(strToU8(s));
}

export function decompressJson(data: Uint8Array): any {
  const u = unzipSync(data);
  const first = Object.values(u)[0];
  const text = new TextDecoder().decode(first);
  return JSON.parse(text);
}