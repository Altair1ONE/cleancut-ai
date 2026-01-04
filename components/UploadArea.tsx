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
    <div className="space-y-4">
      <div
        className={[
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition",
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-slate-200 bg-white hover:border-slate-300",
        ].join(" ")}
        onClick={openFileDialog}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <span className="text-xl">⬆️</span>
        </div>

        <p className="mt-4 text-base font-semibold text-slate-900">
          Drag &amp; drop images here
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Or click to browse. We accept <span className="font-semibold">PNG, JPG, WEBP</span>.
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Batch upload supported — we automatically apply your plan limits.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            No watermark
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            Transparent PNG
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            Fast workflow
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* URL input */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-semibold text-slate-900">Or use an image URL</div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image URL (PNG/JPG/WEBP)..."
            className="w-full flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={handleUrlUpload}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Use URL
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Tip: Use direct image links ending in .png, .jpg, .jpeg, or .webp.
        </p>
      </div>
    </div>
  );
}
