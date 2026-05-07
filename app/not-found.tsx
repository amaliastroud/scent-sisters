import Link from "next/link";
import { HolographicMedia } from "@/components/HolographicMedia";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-[2rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] shadow-md shadow-[rgba(196,113,122,0.16)]">
        <HolographicMedia variant="hero-strip" />

        <div className="relative border-t border-[rgb(var(--stroke))] bg-[rgba(var(--card),0.94)] px-8 py-12 backdrop-blur-sm">
          <p className="text-[11px] tracking-[0.3em] text-[rgb(var(--muted))]">PAGE NOT FOUND</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-[rgb(var(--ink))]">
            A page that doesn’t exist — yet.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[rgb(var(--muted))]">
            The link may be outdated, or we haven&apos;t bottled that destination.
          </p>
        </div>

        <div className="px-8 py-8">
          <Link
            href="/collection"
            className="inline-flex rounded-full bg-[#C4717A] px-6 py-3 text-sm font-medium text-white shadow-md shadow-[rgba(196,113,122,0.35)] transition hover:brightness-95"
          >
            Go to My Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
