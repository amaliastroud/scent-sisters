import type { Perfume } from "@/lib/perfumes";

type UnsplashCacheEntry = { url: string; fetchedAtMs: number };

const imageCache = new Map<string, UnsplashCacheEntry>();

function stableSig(input: string) {
  // Deterministic small hash for `sig=` so Source URLs vary per perfume id.
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function fallbackSourceUrl(perfume: Pick<Perfume, "id" | "name" | "brand">) {
  const sig = stableSig(`${perfume.id}:${perfume.brand}:${perfume.name}`);
  const query = encodeURIComponent("perfume,fragrance,floral,bottle");
  return `https://source.unsplash.com/featured/1200x900?${query}&sig=${sig}`;
}

async function fetchRandomUnsplashUrl(perfume: Pick<Perfume, "id" | "name" | "brand">) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return fallbackSourceUrl(perfume);

  const cached = imageCache.get(perfume.id);
  if (cached) return cached.url;

  const query = encodeURIComponent(
    `${perfume.brand} ${perfume.name} perfume bottle floral still life`,
  );

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&content_filter=high`,
    {
      headers: {
        Authorization: `Client-ID ${key}`,
        "Accept-Version": "v1",
      },
      // Keep it dynamic; cache in-memory ourselves.
      cache: "no-store",
    },
  ).catch(() => null);

  if (!res || !res.ok) return fallbackSourceUrl(perfume);

  const json = (await res.json().catch(() => null)) as
    | { urls?: { regular?: string; small?: string } }
    | null;

  const url = json?.urls?.regular ?? json?.urls?.small;
  if (!url) return fallbackSourceUrl(perfume);

  imageCache.set(perfume.id, { url, fetchedAtMs: Date.now() });
  return url;
}

export async function withUnsplashImages(perfumes: Perfume[]) {
  const out: Perfume[] = [];
  for (const p of perfumes) {
    if (p.imageUrl) {
      out.push(p);
      continue;
    }
    const imageUrl = await fetchRandomUnsplashUrl(p);
    out.push({ ...p, imageUrl });
  }
  return out;
}

export async function withUnsplashImage(perfume: Perfume | null) {
  if (!perfume) return null;
  if (perfume.imageUrl) return perfume;
  return { ...perfume, imageUrl: await fetchRandomUnsplashUrl(perfume) };
}

