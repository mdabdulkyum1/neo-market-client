import axios from "axios";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind + clsx utility
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Image upload to ImgBB
const image_upload_api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_CLIENT_API_KEY}`;

export async function imageUpload(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(image_upload_api, formData);
  return data.data.display_url;
}

export async function uploadMultipleImages(images: File[]): Promise<string[]> {
  try {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(image_upload_api, formData);
      return data.data.display_url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls; // Returns an array of image URLs
  } catch (error) {
    console.error("Image upload failed:", error);
    return [];
  }
}
