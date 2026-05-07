import { supabaseServer } from "@/lib/supabase/server";
import type { PerfumeCreate, PerfumePatch } from "@/lib/perfumeSchemas";

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  category: "collection" | "wishlist" | "sampled";
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
};

type PerfumeRow = {
  id: string;
  name: string;
  brand: string;
  category: "collection" | "wishlist" | "sampled";
  rating: number;
  review: string;
  top_notes: string[];
  middle_notes: string[];
  base_notes: string[];
};

function rowToPerfume(row: PerfumeRow): Perfume {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    rating: row.rating as 1 | 2 | 3 | 4 | 5,
    review: row.review,
    notes: {
      top: row.top_notes ?? [],
      middle: row.middle_notes ?? [],
      base: row.base_notes ?? [],
    },
  };
}

export async function listPerfumes(opts?: { q?: string; category?: Perfume["category"] }) {
  const q = opts?.q?.trim().toLowerCase();

  let query = supabaseServer()
    .from("perfumes")
    .select("id,name,brand,category,rating,review,top_notes,middle_notes,base_notes")
    .order("created_at", { ascending: false });

  if (opts?.category) {
    query = query.eq("category", opts.category);
  }

  // Supabase doesn't have a great cross-column substring search without full-text.
  // We'll do a simple filter in memory for now (small dataset).
  const { data, error } = await query;
  if (error) throw error;

  const perfumes = (data ?? []).map((r) => rowToPerfume(r as PerfumeRow));
  if (!q) return perfumes;

  return perfumes.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.review.toLowerCase().includes(q) ||
      p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
      p.notes.middle.some((n) => n.toLowerCase().includes(q)) ||
      p.notes.base.some((n) => n.toLowerCase().includes(q)),
  );
}

export async function getPerfumeById(id: string) {
  const { data, error } = await supabaseServer()
    .from("perfumes")
    .select("id,name,brand,category,rating,review,top_notes,middle_notes,base_notes")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return rowToPerfume(data as PerfumeRow);
}

export async function createPerfume(input: PerfumeCreate) {
  const { data, error } = await supabaseServer()
    .from("perfumes")
    .insert({
      name: input.name,
      brand: input.brand,
      category: input.category,
      rating: input.rating,
      review: input.review ?? "",
      top_notes: input.notes.top ?? [],
      middle_notes: input.notes.middle ?? [],
      base_notes: input.notes.base ?? [],
    })
    .select("id,name,brand,category,rating,review,top_notes,middle_notes,base_notes")
    .single();

  if (error) throw error;
  return rowToPerfume(data as PerfumeRow);
}

export async function patchPerfume(id: string, patch: PerfumePatch) {
  const update: Partial<PerfumeRow> = {};

  if (patch.name !== undefined) update.name = patch.name;
  if (patch.brand !== undefined) update.brand = patch.brand;
  if (patch.category !== undefined) update.category = patch.category;
  if (patch.rating !== undefined) update.rating = patch.rating;
  if (patch.review !== undefined) update.review = patch.review;

  if (patch.notes) {
    if (patch.notes.top !== undefined) update.top_notes = patch.notes.top;
    if (patch.notes.middle !== undefined) update.middle_notes = patch.notes.middle;
    if (patch.notes.base !== undefined) update.base_notes = patch.notes.base;
  }

  const { data, error } = await supabaseServer()
    .from("perfumes")
    .update(update)
    .eq("id", id)
    .select("id,name,brand,category,rating,review,top_notes,middle_notes,base_notes")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return rowToPerfume(data as PerfumeRow);
}

export async function deletePerfume(id: string) {
  const { data, error } = await supabaseServer()
    .from("perfumes")
    .delete()
    .eq("id", id)
    .select("id,name,brand,category,rating,review,top_notes,middle_notes,base_notes")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return rowToPerfume(data as PerfumeRow);
}

