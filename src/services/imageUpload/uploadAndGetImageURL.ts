import { getImageURL } from "./getImageURL";
import { uploadImage } from "./uploadImage";

export const uploadAndGetImageURL = async (
  image: File,
  fileName: string,
): Promise<string | void> => {
  if (!image) return;

  try {
    await uploadImage(image, fileName);
    const ulr = await getImageURL(fileName);

    return ulr;
  } catch (error) {
    throw error;
  }
};
