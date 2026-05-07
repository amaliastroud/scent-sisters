import Link from "next/link";
import type { Perfume } from "@/lib/perfumes";
import { PerfumePlaceholderGradient } from "@/components/PerfumePlaceholderGradient";
import { StarRating } from "@/components/StarRating";

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <Link
      href={`/perfumes/${perfume.id}`}
      className={[
        "group relative overflow-hidden rounded-3xl",
        "border border-[rgb(var(--stroke))] bg-[rgb(var(--card))]",
        "shadow-md shadow-[rgba(196,113,122,0.16)] transition",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(196,113,122,0.22)]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(var(--blush),0.9),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative p-5">
        <div className="relative mb-4 overflow-hidden rounded-[1.25rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
          <PerfumePlaceholderGradient perfume={perfume} />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
              {perfume.brand}
            </p>
            <h3 className="mt-1 truncate font-display text-lg leading-snug text-[rgb(var(--ink))]">
              {perfume.name}
            </h3>
          </div>
          <div className="shrink-0 pt-1 text-right">
            {perfume.rating != null ? (
              <StarRating rating={perfume.rating} />
            ) : (
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[rgb(var(--muted))]">
                Wishlist · not rated
              </span>
            )}
          </div>
        </div>

        <p className="mt-2 text-[11px] text-[rgb(var(--muted))]">
          <span className="font-medium capitalize text-[rgb(var(--ink))]">
            {perfume.category}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {perfume.notes.top.slice(0, 1).map((n) => (
            <span
              key={`top-${n}`}
              className="rounded-full border border-[rgb(var(--stroke))] bg-[rgba(var(--cream),0.7)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgb(var(--muted))]"
            >
              {n}
            </span>
          ))}
          {perfume.notes.middle.slice(0, 1).map((n) => (
            <span
              key={`mid-${n}`}
              className="rounded-full border border-[rgb(var(--stroke))] bg-[rgba(var(--cream),0.7)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgb(var(--muted))]"
            >
              {n}
            </span>
          ))}
          {perfume.notes.base.slice(0, 1).map((n) => (
            <span
              key={`base-${n}`}
              className="rounded-full border border-[rgb(var(--stroke))] bg-[rgba(var(--cream),0.7)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgb(var(--muted))]"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
