export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-slate-300">
          Remove backgrounds at a fraction of the cost of other tools.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* FREE PLAN */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Free</h2>
          <p className="mt-1 text-sm text-slate-400">
            Try CleanCut AI for free
          </p>

          <p className="mt-4 text-3xl font-bold text-white">$0</p>

          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>✅ No watermark</li>
            <li>✅ Transparent PNG export</li>
            <li>✅ Batch processing (limited)</li>
            <li>⚠️ Monthly credit limit</li>
            <li>⚠️ Standard processing speed</li>
          </ul>

          <a
            href="/signup"
            className="mt-6 block w-full rounded-full border border-slate-700 py-2 text-center text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Get started
          </a>
        </div>

        {/* PRO MONTHLY */}
        <div className="rounded-3xl border border-indigo-500 bg-indigo-500/10 p-6">
          <h2 className="text-lg font-semibold text-white">Pro Monthly</h2>
          <p className="mt-1 text-sm text-slate-300">
            Best for regular users
          </p>

          <p className="mt-4 text-3xl font-bold text-white">$4.99</p>
          <p className="text-sm text-slate-400">per month</p>

          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            <li>✅ No watermark</li>
            <li>✅ Transparent PNG export</li>
            <li>✅ Large batch processing</li>
            <li>✅ Higher monthly credits</li>
            <li>✅ Faster processing</li>
            <li>✅ Priority queue</li>
          </ul>

          <a
            href="/signup"
            className="mt-6 block w-full rounded-full bg-indigo-500 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Upgrade to Pro
          </a>
        </div>

        {/* LIFETIME */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Lifetime</h2>
          <p className="mt-1 text-sm text-slate-400">
            Pay once, use forever
          </p>

          <p className="mt-4 text-3xl font-bold text-white">$19.99</p>
          <p className="text-sm text-slate-400">one-time payment</p>

          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>✅ No watermark</li>
            <li>✅ Transparent PNG export</li>
            <li>✅ Large batch processing</li>
            <li>✅ Monthly credits forever</li>
            <li>✅ Faster processing</li>
            <li>✅ Best value long-term</li>
          </ul>

          <a
            href="/signup"
            className="mt-6 block w-full rounded-full border border-slate-700 py-2 text-center text-sm font-semibold text-slate-200 hover:border-slate-500"
          >
            Get lifetime access
          </a>
        </div>
      </div>
    </div>
  );
}
