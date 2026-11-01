export default function Loading() {
  return (
    <main
      aria-live="polite"
      aria-label="Loading page"
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#faf8f5] px-6 text-[#0f291e]"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#e6efea] blur-3xl motion-reduce:blur-0"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#f9ebe5] blur-3xl motion-reduce:blur-0"
      />

      <section className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-[#0f291e]/10 bg-white/90 px-8 py-12 text-center shadow-xl shadow-[#0f291e]/5 backdrop-blur-xl sm:px-12">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-[#e6efea]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-1 animate-[spin_3s_linear_infinite] rounded-full border-2 border-transparent border-t-[#d96b43] border-r-[#2d6a4f] motion-reduce:animate-none"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="relative h-10 w-10 text-[#d96b43]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 38S8 29.5 8 17.5C8 12.8 11.2 10 15.2 10c3.2 0 6 1.9 8.8 5.1C26.8 11.9 29.6 10 32.8 10 36.8 10 40 12.8 40 17.5 40 29.5 24 38 24 38Z" />
          </svg>
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#2d6a4f]">
          KindredHope Foundation
        </p>
      </section>
    </main>
  );
}
