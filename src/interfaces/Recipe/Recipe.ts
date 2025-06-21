export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cookingTimeInMinutes: number;
  servings: number;
  imageURL?: string;
  createdAt: string;
  authorId: string;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

export interface RecipeFromFireStore extends Recipe {
  id: string;
  title: string;
}
