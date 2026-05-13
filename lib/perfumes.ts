export type PerfumeCategory = "collection" | "wishlist" | "sampled";

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  category: PerfumeCategory;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
};

/**
 * Built-in sample perfumes.
 *
 * Used as:
 * - a fallback for public GET endpoints when Supabase isn't configured yet
 * - an input source for the one-time seed route
 */
export const seedPerfumes: Perfume[] = [
  {
    id: "seed-1",
    name: "Boardwalk Delight",
    brand: "Skylar",
    category: "collection",
    rating: 5,
    review: "HOLY GRAIL. The blueprint.",
    notes: {
      top: ["Cotton candy", "Aquatic"],
      middle: ["Water lily", "Musk"],
      base: ["Soft musk", "Amber"],
    },
  },
  {
    id: "seed-2",
    name: "What the Fluff",
    brand: "Phlur",
    category: "collection",
    rating: 5,
    review: "Everyday comfort, airy and sweet.",
    notes: {
      top: ["Marshmallow"],
      middle: ["Sugar"],
      base: ["Vanilla", "Soft musk"],
    },
  },
  {
    id: "seed-3",
    name: "Walk on Cotton Candy",
    brand: "Dua",
    category: "collection",
    rating: 5,
    review: "Boardwalk Delight dupe but better longevity. Own x2.",
    notes: {
      top: ["Aquatic", "Watery apple"],
      middle: ["Raspberry sorbet", "Water lily", "Guava"],
      base: ["Cotton candy", "Vanilla", "Solar amber"],
    },
  },
  {
    id: "seed-4",
    name: "Gentle Fluidity Gold",
    brand: "Maison Francis Kurkdjian",
    category: "collection",
    rating: 5,
    review: "Warm, complex, sparkling metallic warmth.",
    notes: {
      top: ["Juniper berries", "Nutmeg"],
      middle: ["Coriander"],
      base: ["Vanilla", "Musk", "Caramel", "Amberwood"],
    },
  },
  {
    id: "seed-5",
    name: "Bianco Latte",
    brand: "Giardini di Toscana",
    category: "wishlist",
    rating: 3,
    review: "Need to sample. Everyone says it's creamy dessert.",
    notes: {
      top: ["Caramel"],
      middle: ["Vanilla", "Milk"],
      base: ["Musk", "Amber"],
    },
  },
];

export const collectionIds = new Set(
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
);

export const wishlistSampledIds = new Set<string>([]);

export const wishlistNeedToSampleIds = new Set(["18", "19", "20"]);

export const wishlistIds = new Set([...wishlistSampledIds, ...wishlistNeedToSampleIds]);

// Back-compat alias for older modules that expect `perfumes`.
export const perfumes: Perfume[] = seedPerfumes;

export function getAllPerfumes() {
  return perfumes;
}

export function getCollection() {
  return perfumes.filter((p) => collectionIds.has(p.id));
}

export function getWishlist() {
  return perfumes.filter((p) => wishlistIds.has(p.id));
}

export function getWishlistSampled() {
  return perfumes.filter((p) => wishlistSampledIds.has(p.id));
}

export function getWishlistNeedToSample() {
  return perfumes.filter((p) => wishlistNeedToSampleIds.has(p.id));
}

export function getPerfumeById(id: string) {
  return perfumes.find((p) => p.id === id) ?? null;
}
