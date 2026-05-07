import { getAllPerfumes, type Perfume } from "@/lib/perfumes";

type PerfumeInput = Omit<Perfume, "id"> & { id?: string };

let perfumes: Perfume[] = getAllPerfumes();

function nextId() {
  const max = perfumes.reduce((acc, p) => Math.max(acc, Number(p.id) || 0), 0);
  return String(max + 1);
}

export function listPerfumes(query?: { q?: string }) {
  const q = query?.q?.trim().toLowerCase();
  if (!q) return perfumes;
  return perfumes.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.season.toLowerCase().includes(q) ||
      p.sentiment.toLowerCase().includes(q) ||
      p.review.toLowerCase().includes(q) ||
      p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
      p.notes.middle.some((n) => n.toLowerCase().includes(q)) ||
      p.notes.base.some((n) => n.toLowerCase().includes(q)),
  );
}

export function getPerfume(id: string) {
  return perfumes.find((p) => p.id === id) ?? null;
}

export function createPerfume(input: PerfumeInput) {
  const perfume: Perfume = {
    id: input.id ?? nextId(),
    name: input.name,
    brand: input.brand,
    review: input.review,
    notes: input.notes,
    imageLabel: input.imageLabel,
    sentiment: input.sentiment,
    season: input.season,
    ...(input.rating !== undefined ? { rating: input.rating } : {}),
  };

  perfumes = [perfume, ...perfumes];
  return perfume;
}

export function updatePerfume(id: string, patch: Partial<Omit<Perfume, "id">>) {
  const idx = perfumes.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const updated: Perfume = {
    ...perfumes[idx],
    ...patch,
    notes: patch.notes ? { ...perfumes[idx].notes, ...patch.notes } : perfumes[idx].notes,
  };
  perfumes = perfumes.map((p, i) => (i === idx ? updated : p));
  return updated;
}

export function deletePerfume(id: string) {
  const existing = getPerfume(id);
  if (!existing) return null;
  perfumes = perfumes.filter((p) => p.id !== id);
  return existing;
}

