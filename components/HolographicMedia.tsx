"use client";

import dynamic from "next/dynamic";

const NovatrixBackdrop = dynamic(() => import("@/components/ui/novatrix-demo"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-gradient-to-br from-[#fdf0f0] via-[#faf5f0] to-[#f7d6c8]"
      aria-hidden
    />
  ),
});

type Variant = "welcome" | "hero-strip" | "card";

const variantClasses: Record<Variant, string> = {
  /** Full bleed behind welcome hero (block layout) */
  welcome: "min-h-[min(88vh,640px)] w-full md:min-h-[min(92vh,680px)]",
  /** Wide shallow band atop `<Hero />` sections */
  "hero-strip": "aspect-[21/9] min-h-[100px] w-full sm:min-h-[128px]",
  /** Perfume grid cards & detail sidebar */
  card: "aspect-[4/3] w-full",
};

/**
 * Iridescent **Novatrix** (uvcanvas) layer + soft blush overlays so typography stays readable.
 *
 * **`fill`** — absolutely fill a positioned ancestor (welcome panel with `min-h` on parent).
 */
export function HolographicMedia({
  variant,
  className = "",
  fill = false,
}: {
  variant: Variant;
  className?: string;
  /** Pin to layer `absolute inset-0` inside a relative parent */
  fill?: boolean;
}) {
  const positioning = fill
    ? "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
    : "relative isolate w-full overflow-hidden";

  const sizing = fill ? "h-full min-h-full w-full" : variantClasses[variant];

  return (
    <div className={[positioning, sizing, className].filter(Boolean).join(" ")}>
      <div className="absolute inset-0 z-0">
        <NovatrixBackdrop />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(135deg,rgba(253,240,240,0.82)_0%,rgba(250,245,240,0.5)_45%,rgba(247,214,200,0.42)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(255,253,251,0.65)_0%,transparent_50%,rgba(255,247,246,0.25)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-soft-light opacity-90"
        style={{
          background:
            "radial-gradient(circle at 28% 18%, rgba(255, 192, 220, 0.45), transparent 52%), radial-gradient(circle at 78% 88%, rgba(196, 170, 255, 0.35), transparent 48%)",
        }}
        aria-hidden
      />
    </div>
  );
}
