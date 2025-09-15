import z, { ZodType } from "zod";

// Helper function that validates data and returns error if fails
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

// Helper function that validates uploaded image
export function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image")
    .refine((file) => {
      return file.size <= maxUploadSize;
    }, "File size must be less than 1Mb");
}
