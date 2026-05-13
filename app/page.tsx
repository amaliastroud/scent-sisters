import { HolographicMedia } from "@/components/HolographicMedia";
import { HomeLandingCtas } from "@/components/HomeLandingCtas";
import { ScentSistersBottleMark } from "@/components/ScentSistersBottleMark";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <HolographicMedia variant="welcome" fill />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(255,251,249,0.42)_0%,transparent_38%,rgba(255,246,246,0.55)_100%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col items-center justify-center px-6 py-10 text-center sm:px-8 sm:py-14">
          <div className="mb-10 inline-flex items-center gap-5 sm:mb-12 sm:gap-7 lg:gap-8">
            <ScentSistersBottleMark className="h-16 w-16 shrink-0 sm:h-[4.75rem] sm:w-[4.75rem] lg:h-20 lg:w-20" />
            <div className="text-left leading-[1.02] drop-shadow-[0_1px_12px_rgba(255,255,255,0.85)]">
              <p className="text-[11px] uppercase tracking-[0.38em] text-[rgb(var(--muted))] sm:text-xs">
                SCENT SISTERS
              </p>
              <h1 className="font-display text-[clamp(2.6rem,11vw,5.85rem)] font-medium tracking-tight text-[rgb(var(--ink))] sm:text-[clamp(3.25rem,9.5vw,5.85rem)]">
                Scent Sisters
              </h1>
            </div>
          </div>

          <p className="mx-auto max-w-[32rem] text-lg font-medium leading-snug text-[#C4717A] drop-shadow-[0_1px_8px_rgba(255,252,251,0.9)] sm:max-w-2xl sm:text-xl md:text-[1.75rem] md:leading-relaxed lg:text-[1.875rem]">
            Every memory has a scent. Wear your story.
          </p>

          <HomeLandingCtas />

          <p className="mt-14 text-sm tracking-[0.22em] text-[rgb(var(--muted))] sm:mt-16 sm:text-[0.8125rem]">
            Community collections coming soon
          </p>
        </div>
      </section>
    </div>
  );
}
