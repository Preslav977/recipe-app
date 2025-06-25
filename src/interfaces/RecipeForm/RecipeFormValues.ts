export default interface RecipeFormValues {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cookingTimeInMinutes: string;
  servings: string;
  image: File | null;
  imageUrl: string;
  createdAt: string;
  id?: string;
}
