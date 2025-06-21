import { deleteDoc, doc } from "firebase/firestore";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const deleteRecipe = async (recipeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(fireStoreApp, "recipes", recipeId));
  } catch (error) {
    throw error;
  }
};
