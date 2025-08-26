import React, { useRef, useState } from 'react';
import { compressImageToJpeg } from '../lib/ai/compression';

const HologramComposer: React.FC = () => {
  const [preview, setPreview] = useState<string>('');
  const [sizeInfo, setSizeInfo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImageToJpeg(file, 640, 0.4);
    setSizeInfo(`${(file.size / 1024).toFixed(1)}KB → ${(compressed.size / 1024).toFixed(1)}KB`);
    const url = URL.createObjectURL(compressed);
    setPreview(url);
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="text-lg font-semibold">Hologram Composer (Low-Data)</div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} />
      {sizeInfo && <div className="text-xs opacity-70">{sizeInfo}</div>}
      {preview && (
        <div className="aspect-video w-full rounded overflow-hidden bg-black/5 grid place-items-center">
          <img src={preview} alt="preview" className="max-h-full" />
        </div>
      )}
      <div className="text-sm opacity-70">
        This preview is optimized for AR overlays. 3D/holographic capture can be added with WebXR later.
      </div>
    </div>
  );
};

export default HologramComposer;