// components/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} CleanCut AI. All rights reserved.</p>
        <p>
          Not affiliated with Remove.bg, Adobe, Canva, or ClipDrop. We&apos;re
          just cheaper. 🙂
        </p>
      </div>
    </footer>
  );
}
