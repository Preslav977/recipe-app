import { getImageURL } from "./getImageURL";
import { uploadImage } from "./uploadImage";

export const uploadAndGetImageURL = async (
  image: File,
  fileName: string,
): Promise<string | void> => {
  if (!image) return;

  try {
    await uploadImage(image, fileName);
    const url = await getImageURL(fileName);

    return url;
  } catch (error) {
    throw error;
  }
};
