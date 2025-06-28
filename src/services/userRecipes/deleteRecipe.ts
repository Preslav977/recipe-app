import { deleteDoc, doc } from "firebase/firestore";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const deleteRecipe = async (recipeId: string): Promise<string> => {
  try {
    await deleteDoc(doc(fireStoreApp, "recipes", recipeId));

    return recipeId;
  } catch (error) {
    throw error;
  }
};
