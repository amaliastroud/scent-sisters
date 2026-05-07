import { z } from "zod";

export const CategorySchema = z.enum(["collection", "wishlist", "sampled"]);

export const NotesSchema = z.object({
  top: z.array(z.string()).default([]),
  middle: z.array(z.string()).default([]),
  base: z.array(z.string()).default([]),
});

export const PerfumeCreateSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  category: CategorySchema,
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  review: z.string().default(""),
  notes: NotesSchema,
});

export const PerfumePatchSchema = z.object({
  name: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  category: CategorySchema.optional(),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  review: z.string().optional(),
  notes: NotesSchema.partial().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
export type Notes = z.infer<typeof NotesSchema>;
export type PerfumeCreate = z.infer<typeof PerfumeCreateSchema>;
export type PerfumePatch = z.infer<typeof PerfumePatchSchema>;

