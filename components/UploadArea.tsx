// components/UploadArea.tsx
"use client";

import { useCallback, useRef, useState } from "react";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

export function UploadArea({ onFilesSelected }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const files = Array.from(fileList).filter((file) =>
        ["image/png", "image/jpeg", "image/webp"].includes(file.type)
      );
      if (files.length === 0) {
        alert("Please upload PNG, JPG, or WEBP files.");
        return;
      }
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function openFileDialog() {
    inputRef.current?.click();
  }

  async function handleUrlUpload() {
    if (!urlInput.trim()) return;
    try {
      const res = await fetch(urlInput);
      if (!res.ok) throw new Error("Failed to fetch image from URL");
      const contentType = res.headers.get("content-type") || "";
      if (
        !contentType.includes("image/png") &&
        !contentType.includes("image/jpeg") &&
        !contentType.includes("image/webp")
      ) {
        alert("URL must point to a PNG, JPG, or WEBP image.");
        return;
      }
      const blob = await res.blob();
      const file = new File([blob], "remote-image", { type: blob.type });
      onFilesSelected([file]);
    } catch (err: any) {
      console.error(err);
      alert("Could not download image from URL. Please check the link.");
    }
  }

  return (
    <div>
      <div
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-10 text-xs ${
          isDragging
            ? "border-brand bg-slate-900/80 text-slate-100"
            : "border-slate-700 bg-slate-900/60 text-slate-300"
        }`}
        onClick={openFileDialog}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <p className="text-sm font-semibold text-slate-100">
          Drag &amp; drop images here
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          or click to browse. We accept PNG, JPG, WEBP.
        </p>
        <p className="mt-2 text-[11px] text-slate-400">
          Batch upload supported – we&apos;ll automatically apply your plan&apos;s
          limits.
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      <div className="mt-3 flex gap-2 text-[11px]">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Paste image URL (PNG/JPG/WEBP)..."
          className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-100 placeholder:text-slate-500"
        />
        <button
          onClick={handleUrlUpload}
          className="rounded-full bg-slate-800 px-3 py-1 font-semibold text-slate-100 hover:bg-slate-700"
        >
          Use URL
        </button>
      </div>
    </div>
  );
}
