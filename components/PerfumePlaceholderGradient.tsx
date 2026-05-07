import type { Perfume } from "@/lib/perfumes";

import { perfumePlaceholderLayers } from "@/lib/perfumePlaceholderGradients";

type Props = {
  perfume: Pick<Perfume, "id">;
  aspectClassName?: string;
  className?: string;
};

/**
 * Soft editorial placeholders — blush / lilac / apricot washes before bespoke photography.
 */
export function PerfumePlaceholderGradient({
  perfume,
  aspectClassName = "aspect-[4/3] w-full",
  className = "",
}: Props) {
  const layers = perfumePlaceholderLayers(perfume.id);

  return (
    <div className={`relative isolate overflow-hidden ${aspectClassName} ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: layers.paint,
          backgroundColor: layers.baseColor ?? undefined,
        }}
        aria-hidden
      />
      {layers.overlay ? (
        <div
          className={`pointer-events-none absolute inset-0 ${layers.overlay}`}
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-95 shadow-[inset_0_0_72px_rgba(253,246,246,0.55)] mix-blend-multiply"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_100%,transparent_40%,rgba(95,74,74,0.065)_100%)]"
        aria-hidden
      />
    </div>
  );
}
