import { HttpMethod } from "@/types/";

export async function uploadImage(images: FileList) {
  const formData = new FormData();

  for (const image of Array.from(images)) {
    formData.append("file", image);
  }

  formData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: HttpMethod.POST,
        body: formData,
      }
    );
    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
