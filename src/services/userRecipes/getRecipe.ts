import { Recipe, RecipeFromFireStore } from "../../interfaces/Recipe/Recipe";
import { doc, getDoc } from "firebase/firestore";
import { fireStoreApp } from "../../firebaseConfig/firebaseconfig";

export const getRecipe = async (
  recipeId: string,
): Promise<RecipeFromFireStore> => {
  try {
    const recipeRef = doc(fireStoreApp, "recipes", recipeId);
    const recipeSnap = await getDoc(recipeRef);

    if (!recipeSnap.exists()) {
      // return null;
      console.log("Recipe doesn't exist");
    }

    const recipe: RecipeFromFireStore = {
      id: recipeId,
      ...(recipeSnap.data() as Recipe),
    };

    return recipe;
  } catch (error) {
    throw error;
  }
};
