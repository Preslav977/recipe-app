import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig/firebaseconfig";

export const getImageURL = async (fileName: string) => {
  try {
    const imageRef = ref(storage, `${fileName}`);

    const url = await getDownloadURL(imageRef);

    return url;
  } catch (error) {
    throw error;
  }
};
