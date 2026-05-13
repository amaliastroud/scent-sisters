import { NextRequest, NextResponse } from "next/server";
import { requireApiKey } from "@/lib/apiAuth";
import { PerfumeCreateSchema } from "@/lib/perfumeSchemas";
import { createPerfume, listPerfumes } from "@/lib/perfumeRepo";
import { seedPerfumes } from "@/lib/perfumes";
import {
  createInStore,
  ensureSeeded,
  listFromStore,
} from "@/lib/inMemoryPerfumeStore";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;

  try {
    ensureSeeded(seedPerfumes);
    const perfumes = await listPerfumes({
      q,
      category:
        category === "collection" || category === "wishlist" || category === "sampled"
          ? category
          : undefined,
    });

    // If Supabase is empty (or not yet seeded), show sample data so the UI isn't blank.
    if (perfumes.length) {
      return NextResponse.json({ perfumes });
    }
    return NextResponse.json({
      perfumes: listFromStore({
        q,
        category:
          category === "collection" || category === "wishlist" || category === "sampled"
            ? category
            : undefined,
      }),
    });
  } catch {
    // If Supabase isn't configured yet, fall back to in-memory seeded data.
    return NextResponse.json({
      perfumes: listFromStore({
        q,
        category:
          category === "collection" || category === "wishlist" || category === "sampled"
            ? category
            : undefined,
      }),
    });
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

  try {
    const created = await createPerfume(parsed.data);
    return NextResponse.json({ perfume: created }, { status: 201 });
  } catch {
    // No DB configured yet — keep mutations working via in-memory store.
    const created = createInStore(parsed.data);
    return NextResponse.json({ perfume: created }, { status: 201 });
  }
}

