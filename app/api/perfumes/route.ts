import { NextRequest, NextResponse } from "next/server";
import { requireApiKey } from "@/lib/apiAuth";
import { PerfumeCreateSchema } from "@/lib/perfumeSchemas";
import { createPerfume, listPerfumes } from "@/lib/perfumeRepo";
import { seedPerfumes } from "@/lib/perfumes";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;

  try {
    const perfumes = await listPerfumes({
      q,
      category:
        category === "collection" || category === "wishlist" || category === "sampled"
          ? category
          : undefined,
    });

    // If Supabase is empty (or not yet seeded), show sample data so the UI isn't blank.
    return NextResponse.json({ perfumes: perfumes.length ? perfumes : seedPerfumes });
  } catch {
    // If Supabase isn't configured yet, fall back to sample data.
    return NextResponse.json({ perfumes: seedPerfumes });
  }
}

export async function POST(req: NextRequest) {
  const auth = requireApiKey(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = PerfumeCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Missing or invalid perfume fields." }, { status: 400 });
  }

  const created = await createPerfume(parsed.data);
  return NextResponse.json({ perfume: created }, { status: 201 });
}

