import { NextRequest, NextResponse } from "next/server";
import { requireApiKey } from "@/lib/apiAuth";
import { supabaseServer } from "@/lib/supabase/server";
import { seedPerfumes } from "@/lib/perfumes";

/**
 * One-time seed endpoint for development / initial setup.
 * Protected with the same API key as other mutations.
 *
 * POST /api/admin/seed
 */
export async function POST(req: NextRequest) {
  const auth = requireApiKey(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  // Optional: allow overriding seed payload (for quick experiments)
  const body = await req.json().catch(() => null);
  const perfumes = (body?.perfumes as unknown) ?? seedPerfumes;

  if (!Array.isArray(perfumes) || perfumes.length === 0) {
    return NextResponse.json({ error: "No perfumes to seed." }, { status: 400 });
  }

  const { data, error } = await supabaseServer()
    .from("perfumes")
    .insert(
      perfumes.map((p) => ({
        name: p.name,
        brand: p.brand,
        category: p.category,
        rating: p.rating,
        review: p.review ?? "",
        top_notes: p.notes?.top ?? [],
        middle_notes: p.notes?.middle ?? [],
        base_notes: p.notes?.base ?? [],
      })),
      { defaultToNull: false },
    )
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inserted: data?.length ?? 0 });
}

