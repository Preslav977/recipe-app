import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { getRecipe, updateRecipe } from "../../firebaseConfig/firebaseconfig";

export const updateRecipeThunk = createAsyncThunk(
  "recipe/updateRecipe",
  async ({ recipeId, recipe }: { recipeId: string; recipe: Recipe }) => {
    try {
      const getRecipeById = await getRecipe(recipeId);

      const updateTheRecipe = await updateRecipe(recipeId, recipe);

      return updateTheRecipe;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: Recipe = {
  title: "",
  description: "",
  ingredients: [],
  instructions: "",
  cookingTimeInMinutes: 0,
  servings: 0,
  imageURL: "",
  createdAt: "",
  authorId: "",
  loading: "idle",
};

export const updateRecipeSlice = createSlice({
  name: "recipe/updateRecipe",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(updateRecipeThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const recipePayload: Recipe = action.payload!;

      console.log(recipePayload);

      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTimeInMinutes,
        servings,
        imageURL,
        authorId,
      } = recipePayload;

      state.title = title;

      state.description = description;

      state.instructions = instructions;

      state.ingredients = [...ingredients];

      state.cookingTimeInMinutes = cookingTimeInMinutes;

      state.servings = servings;

      state.imageURL = imageURL;

      state.authorId = authorId;
    });

    builder.addCase(updateRecipeThunk.rejected, (state, action) => {
      state.loading = "failed";

      state.error =
        "Failed to update a recipe. Check if all information is provided!";
    });
  },
});

export default updateRecipeSlice.reducer;
