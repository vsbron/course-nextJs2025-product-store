import { createClient } from "@supabase/supabase-js";

// Setting the bucket name
const bucket = "main-bucket";

// Create a supabase client for interacting with the database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

// Upload image function
export const uploadImage = async (image: File, folder = "products") => {
  const timestamp = Date.now();

  // Setting the path and upload the image
  const newName = `/${folder}/${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  // Guard clause
  if (!data) throw new Error("Image upload failed");

  // Return the image url
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
