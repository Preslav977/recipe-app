import { RecipeFromFireStore } from "../Recipe/Recipe";

export interface Recipes {
  recipes: RecipeFromFireStore[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}
