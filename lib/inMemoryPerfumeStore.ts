import type { Perfume } from "@/lib/perfumes";
import type { PerfumeCreate, PerfumePatch } from "@/lib/perfumeSchemas";
import { seedPerfumes } from "@/lib/perfumes";

let store: Perfume[] | null = null;

function normalizeSeed(source: Perfume[]): Perfume[] {
  // Clone so callers can't mutate module state through references.
  return source.map((p) => ({
    ...p,
    notes: {
      top: [...(p.notes?.top ?? [])],
      middle: [...(p.notes?.middle ?? [])],
      base: [...(p.notes?.base ?? [])],
    },
  }));
}

export function ensureSeeded(source: Perfume[] = seedPerfumes) {
  if (store && store.length) return { seeded: false, count: store.length };
  store = normalizeSeed(source);
  return { seeded: true, count: store.length };
}

export function resetStore(source: Perfume[] = seedPerfumes) {
  store = normalizeSeed(source);
  return { count: store.length };
}

export function listFromStore(opts?: { q?: string; category?: Perfume["category"] }) {
  ensureSeeded();
  const perfumes = store ?? [];

  const category = opts?.category;
  const q = opts?.q?.trim().toLowerCase();

  let out = category ? perfumes.filter((p) => p.category === category) : perfumes;
  if (!q) return out;

  return out.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.review.toLowerCase().includes(q) ||
      p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
      p.notes.middle.some((n) => n.toLowerCase().includes(q)) ||
      p.notes.base.some((n) => n.toLowerCase().includes(q)),
  );
}

export function getByIdFromStore(id: string) {
  ensureSeeded();
  return (store ?? []).find((p) => p.id === id) ?? null;
}

export function createInStore(input: PerfumeCreate) {
  ensureSeeded();
  const perfume: Perfume = {
    id: `mem-${crypto.randomUUID()}`,
    name: input.name,
    brand: input.brand,
    category: input.category,
    rating: input.rating,
    review: input.review ?? "",
    notes: {
      top: input.notes?.top ?? [],
      middle: input.notes?.middle ?? [],
      base: input.notes?.base ?? [],
    },
  };

  store = [perfume, ...(store ?? [])];
  return perfume;
}

export function patchInStore(id: string, patch: PerfumePatch) {
  ensureSeeded();
  const idx = (store ?? []).findIndex((p) => p.id === id);
  if (idx === -1 || !store) return null;

  const current = store[idx];
  const updated: Perfume = {
    ...current,
    ...patch,
    review: patch.review ?? current.review,
    notes: patch.notes
      ? {
          top: patch.notes.top ?? current.notes.top,
          middle: patch.notes.middle ?? current.notes.middle,
          base: patch.notes.base ?? current.notes.base,
        }
      : current.notes,
  };

  store = store.map((p, i) => (i === idx ? updated : p));
  return updated;
}

export function deleteFromStore(id: string) {
  ensureSeeded();
  if (!store) return null;
  const existing = store.find((p) => p.id === id) ?? null;
  if (!existing) return null;
  store = store.filter((p) => p.id !== id);
  return existing;
}

