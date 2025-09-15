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

// Type for Delete Image function
type DeleteImageProps = {
  url: string;
  folder?: string;
};
// Delete old image function
export const deleteImage = ({ url, folder = "products" }: DeleteImageProps) => {
  // Getting the image name
  const imageName = url.split("/").pop();

  // Guard clause
  if (!imageName) throw new Error("Invalid URL");

  // Delete the image from supabase
  return supabase.storage.from(bucket).remove([`${folder}/${imageName}`]);
};
