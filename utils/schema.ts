import { z } from "zod";
import { validateImageFile } from "./schemaFunctions";

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

// Schema for image
export const imageSchema = z.object({
  image: validateImageFile(),
});
