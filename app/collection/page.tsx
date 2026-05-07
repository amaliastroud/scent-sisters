import { Hero } from "@/components/Hero";
import { PerfumeCard } from "@/components/PerfumeCard";
import { fetchPerfumesFromApi } from "@/lib/server-api";

export default async function CollectionPage() {
  const perfumes = await fetchPerfumesFromApi({ category: "collection" });

  return (
    <div className="space-y-8">
      <Hero
        variant="cover"
        title="My Collection"
        tagline="Buy the fragrance you wish to smell in the world."
      />

      <section>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-[rgb(var(--ink))]">In full bloom</h2>
            <p className="mt-1 text-sm text-[rgb(var(--muted))]">
              {perfumes.length} perfumes on your vanity
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] px-5 py-2.5 text-sm font-medium text-[rgb(var(--ink))] shadow-sm transition hover:bg-white sm:self-auto"
          >
            Add to my rotation
          </button>
        </div>

        {perfumes.length === 0 ? (
          <EmptyState message="Nothing here yet — go sniff something new" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perfumes.map((p) => (
              <PerfumeCard key={p.id} perfume={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[1.75rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-10 text-center shadow-md shadow-[rgba(196,113,122,0.14)]">
      <p className="font-display text-2xl text-[rgb(var(--ink))]">Nothing to see, just yet.</p>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{message}</p>
      <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--muted))]">
        Your next obsession is out there
      </p>
    </div>
  );
}
