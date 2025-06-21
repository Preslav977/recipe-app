import { addDoc, collection } from "firebase/firestore";
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const createRecipe = async (recipe: Recipe): Promise<string> => {
  try {
    const recipeRef = await addDoc(collection(fireStoreApp, "recipes"), recipe);

    return recipeRef.id;
  } catch (error) {
    throw error;
  }
};
