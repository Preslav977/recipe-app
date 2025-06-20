import { deleteDoc, doc } from "firebase/firestore";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const deleteUserFavoriteList = async (userId: string): Promise<void> => {
  try {
    await deleteDoc(doc(fireStoreApp, "users", userId));
  } catch (error) {
    throw error;
  }
};
