import { z, ZodType } from "zod";

// Schema for product
export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must be less than 100 characters.",
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 200;
    },
    {
      message: "Description must be between 10 and 200 words.",
    }
  ),
});

export function validatedWithZodSchema<T>(
  schema: ZodType<T>,
  data: unknown
): T {
  // Parse the data
  const result = schema.safeParse(data);

  // Throw custom error message if validation fails
  if (!result.success) {
    const error = result.error.issues.map((err) => err.message);
    throw new Error(error.join(", "));
  }

  return result.data;
}
