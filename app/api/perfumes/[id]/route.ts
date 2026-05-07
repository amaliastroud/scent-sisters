import { NextRequest, NextResponse } from "next/server";
import { requireApiKey } from "@/lib/apiAuth";
import { PerfumePatchSchema } from "@/lib/perfumeSchemas";
import { deletePerfume, getPerfumeById, patchPerfume } from "@/lib/perfumeRepo";
import { seedPerfumes } from "@/lib/perfumes";
import {
  deleteFromStore,
  ensureSeeded,
  getByIdFromStore,
  patchInStore,
} from "@/lib/inMemoryPerfumeStore";
import { withUnsplashImage } from "@/lib/unsplash";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    ensureSeeded(seedPerfumes);
    const perfume = await getPerfumeById(id);
    if (perfume) return NextResponse.json({ perfume: await withUnsplashImage(perfume) });
  } catch {
    // ignore and fall back to seed
  }

  const mem = getByIdFromStore(id);
  if (!mem) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ perfume: await withUnsplashImage(mem) });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireApiKey(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = PerfumePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update payload." }, { status: 400 });
  }

  try {
    const updated = await patchPerfume(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ perfume: updated });
  } catch {
    const updated = patchInStore(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ perfume: updated });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireApiKey(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  const { id } = await params;
  try {
    const deleted = await deletePerfume(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ deleted: true });
  } catch {
    const deleted = deleteFromStore(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ deleted: true });
  }
}

