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
}
