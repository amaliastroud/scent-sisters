import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { PerfumePlaceholderGradient } from "@/components/PerfumePlaceholderGradient";
import { StarRating } from "@/components/StarRating";
import { fetchPerfumeFromApi } from "@/lib/server-api";

export default async function PerfumeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const perfume = await fetchPerfumeFromApi(id);
  if (!perfume) notFound();

  return (
    <div className="space-y-8">
      <Hero
        eyebrow={perfume.brand}
        title={perfume.name}
        tagline="Live like a candlelit room — warm, lingering, unforgettable."
        subtitle="A scent profile with your personal notes — saved like a page from a fragrance journal."
        subheading="Scent is the sense most tied to memory — track yours."
      />

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] shadow-md shadow-[rgba(196,113,122,0.16)]">
            <div className="relative border-b border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
              <PerfumePlaceholderGradient perfume={perfume} />
            </div>

            <div className="px-6 py-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-[11px] uppercase tracking-[0.32em] text-[rgb(var(--muted))]">
                    Rating
                  </p>
                  <div className="mt-2">
                    <StarRating rating={perfume.rating} />
                  </div>
                  <dl className="mt-5 space-y-1 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                        Category
                      </dt>
                      <dd className="capitalize text-[rgb(var(--ink))]">{perfume.category}</dd>
                    </div>
                  </dl>
                </div>
                <Link
                  href={
                    perfume.category === "wishlist" || perfume.category === "sampled"
                      ? "/wishlist"
                      : "/collection"
                  }
                  className="inline-flex shrink-0 items-center rounded-full border border-[rgb(var(--stroke))] bg-[#FFFAF7] px-4 py-2 text-[13px] font-medium text-[rgb(var(--ink))] shadow-sm transition hover:bg-white"
                >
                  {perfume.category === "wishlist" || perfume.category === "sampled"
                    ? "Back to wishlist"
                    : "Back to collection"}
                </Link>
              </div>

              <div className="mt-7">
                <p className="font-display text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                  Personal notes
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[rgb(var(--muted))]">
                  {perfume.review}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-[2rem] border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] shadow-md shadow-[rgba(196,113,122,0.16)]">
            <div className="border-b border-[rgb(var(--stroke))] bg-[linear-gradient(135deg,#FFFAF7,#FFF5EE)] px-6 py-6">
              <h2 className="font-display text-2xl text-[rgb(var(--ink))]">Scent accords</h2>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                Top, middle, and base — a classic pyramid, edited by you.
              </p>
            </div>

            <div className="grid gap-0 sm:grid-cols-3">
              <NoteColumn title="Top notes" items={perfume.notes.top} />
              <NoteColumn title="Middle notes" items={perfume.notes.middle} />
              <NoteColumn title="Base notes" items={perfume.notes.base} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function NoteColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-[rgb(var(--stroke))] bg-[rgba(var(--cream),0.42)] px-6 py-6 sm:border-t-0 sm:border-l sm:border-[rgb(var(--stroke))] sm:first:border-l-0">
      <p className="font-display text-[10px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-[rgb(var(--ink))]">
        {items.map((n) => (
          <li key={n} className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[rgba(var(--rose),1)]" />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
