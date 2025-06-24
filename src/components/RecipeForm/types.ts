import { RecipeFromFireStore } from "../../interfaces/Recipe/Recipe";

export interface RecipeFormProps {
  recipeToEdit?: RecipeFromFireStore | null;
  recipeId?: string;
}
