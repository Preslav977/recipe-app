import { Recipe } from "../Recipe/Recipe";

export interface Recipes {
  recipes: Recipe[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}
