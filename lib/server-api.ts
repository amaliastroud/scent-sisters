import { headers } from "next/headers";
import type { Perfume } from "@/lib/perfumes";

/**
 * Builds the app's own origin so server components can fetch public GET routes (`/api/...`).
 * Prefer request headers during requests; fallback to NEXT_PUBLIC_APP_URL or localhost for build-time.
 */
export async function apiBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const forwardedProto = h.get("x-forwarded-proto");
  const proto =
    forwardedProto ??
    (process.env.NODE_ENV === "production" ? "https" : "http");
  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function fetchPerfumesFromApi(opts?: {
  category?: "collection" | "wishlist" | "sampled";
  q?: string;
}): Promise<Perfume[]> {
  try {
    const base = await apiBaseUrl();
    const url = new URL(`${base}/api/perfumes`);
    if (opts?.category) url.searchParams.set("category", opts.category);
    if (opts?.q) url.searchParams.set("q", opts.q);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as { perfumes?: Perfume[] };
    return data.perfumes ?? [];
  } catch {
    // If the API is temporarily unavailable (e.g. missing Supabase env vars),
    // keep pages rendering with an empty state rather than crashing.
    return [];
  }
}

export async function fetchPerfumeFromApi(id: string): Promise<Perfume | null> {
  try {
    const base = await apiBaseUrl();
    const res = await fetch(
      `${base}/api/perfumes/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const data = (await res.json()) as { perfume?: Perfume };
    return data.perfume ?? null;
  } catch {
    return null;
  }
}
