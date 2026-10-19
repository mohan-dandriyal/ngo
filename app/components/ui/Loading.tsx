export default function Loading() {
  return (
    <main
      aria-live="polite"
      aria-label="Loading page"
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-white px-6 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#cfe4e0]/15 blur-3xl motion-reduce:blur-0"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#71927b]/25 blur-3xl motion-reduce:blur-0"
      />

      <section className="relative flex  w-full max-w-sm flex-col items-center rounded-[2rem] border border-white/15 px-8 py-12 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-12">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-blue-500/40"
          />
          <span
            aria-hidden="true"
            className="absolute inset-1 animate-[spin_4s_linear_infinite] rounded-full border border-transparent border-t-red-200 border-r-red-500 motion-reduce:animate-none"
          />
          <span
            aria-hidden="true"
            className="absolute h-3 w-3 animate-pulse rounded-full bg-[#e4cfcf] shadow-[0_0_24px_8px_rgba(207,228,224,0.28)] motion-reduce:animate-none"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="relative h-11 w-11 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 38S8 29.5 8 17.5C8 12.8 11.2 10 15.2 10c3.2 0 6 1.9 8.8 5.1C26.8 11.9 29.6 10 32.8 10 36.8 10 40 12.8 40 17.5 40 29.5 24 38 24 38Z" />
          </svg>
        </div>

        <p className="mt-8 italic text-xs font-bold uppercase tracking-[0.28em] text-[#cfe4e0]">
          Loading...
        </p>
 
      </section>
    </main>
  );
}
