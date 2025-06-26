import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig/firebaseconfig";

export const uploadImage = async (image: File, fileName: string) => {
  if (!image) return;

  try {
    const imageRef = ref(storage, `${fileName}`);

    await uploadBytes(imageRef, image);
  } catch (error) {
    throw error;
  }
};
