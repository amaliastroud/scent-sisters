import type { Perfume } from "@/lib/perfumes";

export function filterWishlistSampled(perfumes: Perfume[]): Perfume[] {
  return perfumes.filter((p) => p.category === "sampled");
}

export function filterWishlistNeedToSample(perfumes: Perfume[]): Perfume[] {
  return perfumes.filter((p) => p.category === "wishlist");
}
