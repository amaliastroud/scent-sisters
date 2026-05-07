import { HolographicMedia } from "@/components/HolographicMedia";

export function Hero({
  eyebrow,
  title,
  tagline,
  subtitle,
  subheading,
  accent: _accent,
  variant = "default",
}: {
  eyebrow?: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  subheading?: string;
  /** Reserved for alternating holo overlays */
  accent?: "blush" | "apricot";
  /** Compact magazine-style band with type over the holographic field */
  variant?: "default" | "cover";
}) {
  if (variant === "cover") {
    return (
      <section className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/[0.06] shadow-[0_10px_36px_-12px_rgba(196,113,122,0.14)]">
        <div className="relative isolate h-[clamp(206px,min(38vw),300px)] max-h-[300px] min-h-[200px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0 rounded-[inherit]">
            <HolographicMedia variant="welcome" fill />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,251,249,0.38)_0%,transparent_44%,rgba(255,246,246,0.48)_100%)]"
            aria-hidden
          />
          <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 pb-7 pt-6 text-center sm:px-10">
            {eyebrow ? (
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[rgb(var(--ink))] drop-shadow-[0_1px_6px_rgba(255,252,251,0.9)]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-xl font-display text-[clamp(1.56rem,min(6vw),2.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[rgb(var(--ink))] drop-shadow-[0_1px_10px_rgba(255,253,252,0.95)]">
              {title}
            </h1>
            {tagline ? (
              <p className="mt-3 max-w-md text-[0.9275rem] font-medium leading-snug text-[#C4717A] drop-shadow-[0_1px_8px_rgba(255,252,251,0.85)] sm:text-[1.0625rem]">
                {tagline}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--stroke))] bg-white/80 shadow-sm backdrop-blur">
      <HolographicMedia variant="hero-strip" />

      <div className="relative border-t border-[rgb(var(--stroke))] bg-[rgba(var(--card),0.94)] px-6 py-10 backdrop-blur-sm sm:px-10 sm:py-12">
        {eyebrow ? (
          <p className="text-[11px] uppercase tracking-[0.3em] text-[rgb(var(--muted))]">{eyebrow}</p>
        ) : null}
        <h1
          className={`max-w-3xl font-display text-[1.72rem] leading-[1.08] tracking-tight text-[rgb(var(--ink))] sm:text-[2.6rem] lg:text-[3.1rem] ${eyebrow ? "mt-2" : ""}`}
        >
          {title}
        </h1>
        {tagline ? (
          <p className="mt-3 max-w-2xl text-sm font-medium text-[#C4717A] sm:text-[1rem]">{tagline}</p>
        ) : null}
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-[1rem]">
            {subtitle}
          </p>
        ) : null}
        {subheading ? (
          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--muted))]">{subheading}</p>
        ) : null}
      </div>
    </section>
  );
}
