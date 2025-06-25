import { doc, updateDoc } from "firebase/firestore";
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const updateRecipe = async (
  recipeId: string,
  recipe: Recipe,
): Promise<Recipe> => {
  try {
    const recipeRef = doc(fireStoreApp, "recipes", recipeId);

    const recipeCopy = { ...recipe };

    await updateDoc(recipeRef, recipeCopy);

    return recipeCopy;
  } catch (error) {
    throw error;
  }
};
