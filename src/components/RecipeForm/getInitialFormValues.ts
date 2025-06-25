import { RecipeFromFireStore } from "../../interfaces/Recipe/Recipe";
import RecipeFormValues from "../../interfaces/RecipeForm/RecipeFormValues";

// This function returns default values for the recipe form.
// If a recipe is passed (edit mode), it fills in the fields with existing data.
// If no recipe, it provides empty/default values for creating a new one.

export function getInitialFormValues(
  recipe?: RecipeFromFireStore,
): RecipeFormValues {
  return {
    title: recipe?.title || "", // recipe name or empty
    description: recipe?.description || "", // recipe description
    ingredients: recipe?.ingredients || [""], // at least 1 empty ingredient
    instructions: recipe?.instructions || "", // cooking steps
    cookingTimeInMinutes: recipe?.cookingTimeInMinutes?.toString() || "", // convert number to string
    servings: recipe?.servings?.toString() || "", // convert number to string
    image: null, // local image file (starts empty)
    imageUrl: recipe?.imageURL || "", // image URL from Firestore
    createdAt: recipe?.createdAt || "", // creation date
    id: recipe?.id || "", // ID used only when editing to be able to pass to the thunk
  };
}
