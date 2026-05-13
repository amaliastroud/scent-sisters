/**
 * Deterministic, editorial placeholders — blush / rose / lilac / violet / apricot.
 * Each perfume id maps to its own layered treatment (linear + radial; no collisions for 1–20).
 */

export type PerfumePlaceholderLayers = {
  /** Compound `background` value (often multiple gradients). */
  paint: string;
  /** Fallback solid if gradients fail parsing in edge UA. */
  baseColor?: string;
  /** Tailwind arbitrary gradient class(es) optional second pass. */
  overlay?: string;
};

/** Curated combos: angle + creamy stops distinct per id. */
const byId: Record<string, PerfumePlaceholderLayers> = {
  "1": {
    baseColor: "#fdf6f8",
    paint: [
      "linear-gradient(152deg,#fff9fb 0%,#fcdce8 42%,#e5d8f8 100%)",
      "radial-gradient(ellipse 92% 70% at 18% 12%,rgba(255,218,236,0.9),transparent 55%)",
      "radial-gradient(circle at 88% 78%,rgba(196,174,246,0.38),transparent 52%)",
    ].join(","),
    overlay: "bg-[linear-gradient(180deg,rgba(255,251,251,0.55)_0%,transparent_45%,rgba(248,226,238,0.35)_100%)]",
  },
  "2": {
    baseColor: "#fff8fb",
    paint: [
      "linear-gradient(168deg,#fffbfd 10%,#f8dfeb 52%,#f0dff6 94%)",
      "radial-gradient(circle at 74% 16%,rgba(255,232,246,0.95),transparent 50%)",
      "radial-gradient(ellipse at 12% 90%,rgba(250,216,228,0.55),transparent 58%)",
    ].join(","),
    overlay:
      "opacity-90 bg-[linear-gradient(120deg,rgba(255,255,255,0.4)_0%,transparent_50%)] mix-blend-soft-light",
  },
  "3": {
    baseColor: "#f8f7ff",
    paint: [
      "linear-gradient(128deg,#f4f9ff 0%,#fcdcf0 46%,#e3d4fa 100%)",
      "radial-gradient(circle at 82% 24%,rgba(180,212,255,0.25),transparent 48%)",
      "radial-gradient(circle at 22% 70%,rgba(255,206,226,0.75),transparent 55%)",
    ].join(","),
    overlay: "bg-[radial-gradient(ellipse_80%_50%_at_40%_0%,rgba(255,255,255,0.6),transparent_72%)]",
  },
  "4": {
    baseColor: "#fdf5ef",
    paint: [
      "linear-gradient(142deg,#fffbf7 0%,#eec9a8 38%,#c9afe5 94%)",
      "radial-gradient(circle at 64% 10%,rgba(255,226,206,0.85),transparent 46%)",
      "radial-gradient(circle at 8% 88%,rgba(125,104,164,0.18),transparent 50%)",
    ].join(","),
    overlay: "mix-blend-multiply opacity-80 bg-[linear-gradient(200deg,rgba(255,240,236,0.7)_0%,transparent_60%)]",
  },
  "5": {
    baseColor: "#fff5fb",
    paint: [
      "linear-gradient(176deg,#ffffff 8%,#f8cadb 52%,#d7c9f9 100%)",
      "radial-gradient(circle at 92% 40%,rgba(255,218,238,0.75),transparent 52%)",
      "radial-gradient(ellipse at 30% 8%,rgba(244,226,252,0.9),transparent 54%)",
    ].join(","),
    overlay:
      "bg-[linear-gradient(45deg,rgba(255,255,255,0.35)_0%,transparent_40%,rgba(233,218,246,0.25)_85%)]",
  },
  "6": {
    baseColor: "#f6fdfb",
    paint: [
      "linear-gradient(134deg,#f0fcf8 0%,#cae8ea 42%,#e6e0fb 92%)",
      "radial-gradient(circle at 48% 18%,rgba(200,246,238,0.55),transparent 48%)",
      "radial-gradient(circle at 70% 86%,rgba(214,206,246,0.45),transparent 54%)",
    ].join(","),
    overlay:
      "mix-blend-overlay opacity-[0.72] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5)_0%,transparent_100%)]",
  },
  "7": {
    baseColor: "#fdf4f8",
    paint: [
      "linear-gradient(158deg,#fff6fa 6%,#e8afd2 46%,#8c7aa8 100%)",
      "radial-gradient(circle at 16% 30%,rgba(255,226,246,1),transparent 52%)",
      "radial-gradient(circle at 88% 12%,rgba(180,154,206,0.35),transparent 44%)",
    ].join(","),
    overlay:
      "mix-blend-soft-light opacity-[0.92] bg-[radial-gradient(circle_at_60%_50%,transparent_42%,rgba(255,246,246,0.45)_95%)]",
  },
  "8": {
    baseColor: "#f8f6ff",
    paint: [
      "linear-gradient(118deg,#f2faff 4%,#d4e8fb 46%,#e8cfeb 94%)",
      "radial-gradient(ellipse at 28% 80%,rgba(255,218,246,0.65),transparent 56%)",
      "radial-gradient(circle at 90% 30%,rgba(190,226,255,0.4),transparent 48%)",
    ].join(","),
    overlay: "bg-[linear-gradient(305deg,rgba(255,255,255,0.5)_25%,transparent_55%)]",
  },
  "9": {
    baseColor: "#f4fff8",
    paint: [
      "linear-gradient(166deg,#f6fff9 12%,#bfead4 42%,#e5f2d9 92%)",
      "radial-gradient(circle at 50% 92%,rgba(210,246,226,0.75),transparent 58%)",
      "radial-gradient(circle at 10% 20%,rgba(255,246,246,0.85),transparent 50%)",
    ].join(","),
    overlay: "opacity-75 mix-blend-multiply bg-[linear-gradient(to_top,rgba(244,226,246,0.35)_0%,transparent_50%)]",
  },
  "10": {
    baseColor: "#fff5fb",
    paint: [
      "linear-gradient(144deg,#fff9fb 8%,#ffc8dc 52%,#b8aaf2 96%)",
      "radial-gradient(circle at 78% 70%,rgba(255,226,246,0.85),transparent 48%)",
      "radial-gradient(circle at 24% 16%,rgba(255,246,246,1),transparent 54%)",
    ].join(","),
    overlay:
      "bg-[radial-gradient(circle_at_40%_100%,rgba(255,246,246,0.55),transparent_60%)] opacity-95",
  },
  "11": {
    baseColor: "#fdf3ef",
    paint: [
      "linear-gradient(132deg,#fff9f7 10%,#f4c09a 40%,#9b7abf 94%)",
      "radial-gradient(circle at 70% 8%,rgba(255,226,218,1),transparent 46%)",
      "radial-gradient(ellipse at 12% 86%,rgba(120,94,154,0.22),transparent 52%)",
    ].join(","),
    overlay:
      "mix-blend-soft-light opacity-90 bg-[linear-gradient(90deg,rgba(255,255,255,0.22)_0%,transparent_50%,rgba(255,228,246,0.3)_100%)]",
  },
  "12": {
    baseColor: "#fff4f8",
    paint: [
      "linear-gradient(172deg,#fffbfc 14%,#e8afc8 54%,#6b7bc2 100%)",
      "radial-gradient(circle at 22% 64%,rgba(255,246,246,1),transparent 50%)",
      "radial-gradient(circle at 88% 40%,rgba(190,216,246,0.35),transparent 48%)",
    ].join(","),
    overlay: "bg-[linear-gradient(to_bottom_left,rgba(255,246,246,0.55),transparent)]",
  },
  "13": {
    baseColor: "#fff7fb",
    paint: [
      "linear-gradient(156deg,#fff8fc 12%,#f8b8dc 42%,#c8b4f8 96%)",
      "radial-gradient(circle at 36% 8%,rgba(255,246,246,1),transparent 44%)",
      "radial-gradient(circle at 92% 90%,rgba(214,246,246,0.4),transparent 52%)",
    ].join(","),
    overlay: "opacity-90 bg-[linear-gradient(200deg,rgba(255,255,255,0.45)_10%,transparent_55%)]",
  },
  "14": {
    baseColor: "#fef6ff",
    paint: [
      "linear-gradient(124deg,#fff6ff 10%,#f2c4f0 50%,#b4cfff 94%)",
      "radial-gradient(circle at 58% 12%,rgba(255,246,254,1),transparent 48%)",
      "radial-gradient(ellipse at 8% 75%,rgba(248,226,246,0.72),transparent 56%)",
    ].join(","),
    overlay:
      "mix-blend-overlay opacity-[0.82] bg-[radial-gradient(ellipse_70%_40%_at_72%_50%,transparent_52%,rgba(255,246,246,0.4)_92%)]",
  },
  "15": {
    baseColor: "#f8fcf8",
    paint: [
      "linear-gradient(162deg,#f9fdf9 14%,#c8ebe0 48%,#d8d2f8 96%)",
      "radial-gradient(circle at 24% 30%,rgba(255,246,246,1),transparent 50%)",
      "radial-gradient(circle at 86% 70%,rgba(180,246,246,0.32),transparent 50%)",
    ].join(","),
    overlay:
      "bg-[linear-gradient(220deg,rgba(255,255,255,0.35)_22%,transparent_58%)] opacity-95",
  },
  "16": {
    baseColor: "#fff5fb",
    paint: [
      "linear-gradient(138deg,#fff9fc 14%,#e8aaf0 52%,#7ecfeb 94%)",
      "radial-gradient(circle at 48% 6%,rgba(255,246,246,1),transparent 42%)",
      "radial-gradient(circle at 92% 86%,rgba(210,246,246,0.42),transparent 54%)",
    ].join(","),
    overlay:
      "mix-blend-soft-light opacity-90 bg-[linear-gradient(285deg,rgba(255,255,255,0.25)_36%,transparent_70%)]",
  },
  "17": {
    baseColor: "#fff8f8",
    paint: [
      "linear-gradient(148deg,#fffefb 14%,#f8d4c8 44%,#d8bafc 94%)",
      "radial-gradient(circle at 62% 20%,rgba(255,246,246,1),transparent 48%)",
      "radial-gradient(ellipse at 16% 90%,rgba(250,226,246,0.65),transparent 56%)",
    ].join(","),
    overlay: "bg-[radial-gradient(circle_at_50%_-10%,rgba(255,246,246,0.72),transparent_62%)]",
  },
  "18": {
    baseColor: "#f6fcf8",
    paint: [
      "linear-gradient(178deg,#f7fcf8 6%,#a8e8d4 48%,#c6b8f8 98%)",
      "radial-gradient(circle at 18% 24%,rgba(255,246,246,1),transparent 50%)",
      "radial-gradient(circle at 84% 80%,rgba(180,246,226,0.45),transparent 54%)",
    ].join(","),
    overlay:
      "opacity-[0.94] bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_32%,transparent_68%)]",
  },
  "19": {
    baseColor: "#fff6f9",
    paint: [
      "linear-gradient(116deg,#fff8fb 14%,#e8bcf4 54%,#8ecfeb 94%)",
      "radial-gradient(circle at 72% 8%,rgba(255,246,246,1),transparent 44%)",
      "radial-gradient(circle at 12% 70%,rgba(248,246,246,1),transparent 54%)",
    ].join(","),
    overlay:
      "mix-blend-multiply opacity-85 bg-[linear-gradient(45deg,rgba(255,255,255,0.32)_48%,transparent_78%)]",
  },
  "20": {
    baseColor: "#fdf6f6",
    paint: [
      "linear-gradient(154deg,#fff9f9 22%,#e8c49a 50%,#7a6295 94%)",
      "radial-gradient(circle at 48% 8%,rgba(255,226,246,0.92),transparent 46%)",
      "radial-gradient(ellipse at 88% 86%,rgba(180,246,246,0.18),transparent 58%)",
    ].join(","),
    overlay:
      "mix-blend-soft-light opacity-90 bg-[radial-gradient(ellipse_90%_50%_at_52%_100%,transparent_52%,rgba(255,246,246,0.38)_94%)]",
  },
};

const fallbackPool: PerfumePlaceholderLayers[] = Array.from({ length: 12 }, (_, i) => ({
  baseColor: "#fff8fb",
  paint: [
    `linear-gradient(${128 + ((i * 17) % 44)}deg,#fffbfb 14%, hsl(${326 + ((i * 13) % 24)} 76% ${88 + (i % 6)}%), hsl(${274 + ((i * 11) % 18)} 48% ${72 + (i % 8)}%))`,
    `radial-gradient(circle at ${18 + ((i * 29) % 60)}% ${12 + ((i * 23) % 40)}%,rgba(255,230,246,0.92),transparent 52%)`,
    `radial-gradient(circle at ${88 - ((i * 31) % 40)}% ${78 + ((i * 17) % 18)}%,rgba(196,186,246,${0.26 + ((i % 5) / 40)}),transparent 54%)`,
  ].join(","),
  overlay:
    i % 2 === 0
      ? "bg-[linear-gradient(180deg,rgba(255,251,251,0.5)_0%,transparent_50%)] opacity-95"
      : "mix-blend-soft-light opacity-[0.88] bg-[linear-gradient(300deg,rgba(255,255,255,0.25)_42%,transparent_72%)]",
}));

function hashStable(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function perfumePlaceholderLayers(perfumeId: string): PerfumePlaceholderLayers {
  const direct = byId[perfumeId];
  if (direct) return direct;

  // Seed data uses ids like `seed-1` — reuse the same curated palettes as numeric ids.
  const seedMatch = /^seed-(\d+)$/.exec(perfumeId);
  if (seedMatch) {
    const numericId = seedMatch[1];
    const fromSeed = byId[numericId];
    if (fromSeed) return fromSeed;
  }

  const h = hashStable(perfumeId);
  return fallbackPool[h % fallbackPool.length]!;
}
