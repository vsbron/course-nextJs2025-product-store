import { features } from "process";
import { z, ZodSchema } from "zod";

// Schema for product
export const productSchema = z.object({
  name: z.string().min(4),
  company: z.string().min(4),
  price: z.coerce.number().int().min(0),
  description: z.string(),
  featured: z.coerce.boolean(),
});
