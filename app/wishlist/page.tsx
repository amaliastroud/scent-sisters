"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { PerfumeCard } from "@/components/PerfumeCard";
import type { Perfume } from "@/lib/perfumes";
import {
  filterWishlistNeedToSample,
  filterWishlistSampled,
} from "@/lib/wishlistFilters";

export default function WishlistPage() {
  const [sampled, setSampled] = useState<Perfume[]>([]);
  const [needToSample, setNeedToSample] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/perfumes")
      .then((res) => {
        if (!res.ok) throw new Error(`GET /api/perfumes ${res.status}`);
        return res.json() as Promise<{ perfumes: Perfume[] }>;
      })
      .then((data) => {
        const all = data.perfumes ?? [];
        setSampled(filterWishlistSampled(all));
        setNeedToSample(filterWishlistNeedToSample(all));
      })
      .catch(() => {
        setSampled([]);
        setNeedToSample([]);
      })
      .finally(() => setLoading(false));
  }, []);

  function markSpritzed(perfume: Perfume) {
    setNeedToSample((prev) => prev.filter((p) => p.id !== perfume.id));
    setSampled((prev) => [perfume, ...prev]);
  }

  return (
    <div className="space-y-8">
      <Hero
        eyebrow="The ones that got away"
        title="My Wishlist — warm, playful, and a little unhinged (in the best way)."
        tagline="Live like a candlelit room — warm, lingering, unforgettable."
        subtitle="Perfumes you’ve smelled, flirted with, and saved for later — the kind of bottles you remember like a line from a novel."
        subheading="Scent is the sense most tied to memory — track yours."
        accent="apricot"
      />

      <section className="space-y-10">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-[rgb(var(--ink))]">Still deciding</h2>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                Tried, not owned (yet) — a soft maybe. {sampled.length} perfumes
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-[rgb(var(--muted))]">Dusting off testers…</p>
          ) : sampled.length === 0 ? (
            <EmptyState message="Nothing here yet — go sniff something new" />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sampled.map((p) => (
                <PerfumeCard key={p.id} perfume={p} />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-[rgb(var(--ink))]">Uncharted territory</h2>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                Unsniffed, untested — waiting for a first spritz. {needToSample.length} perfumes
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-[rgb(var(--muted))]">Fetching your testers…</p>
          ) : needToSample.length === 0 ? (
            <EmptyState message="Your next obsession is out there" />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {needToSample.map((p) => (
                <div key={p.id} className="space-y-3">
                  <PerfumeCard perfume={p} />
                  <button
                    type="button"
                    onClick={() => markSpritzed(p)}
                    className="w-full rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--ink))] shadow-sm transition hover:bg-[#FFFAF7]"
                  >
                    I’ve been spritzed
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-10 text-center shadow-md shadow-[rgba(196,113,122,0.14)]">
      <p className="font-display text-2xl text-[rgb(var(--ink))]">Quiet shelves, for now.</p>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{message}</p>
    </div>
  );
}
