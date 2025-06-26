import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { createRecipe } from "../../firebaseConfig/firebaseconfig";
import { getRecipe } from "../../firebaseConfig/firebaseconfig";

export const createRecipeThunk = createAsyncThunk(
  "recipe/create",
  async (recipe: Recipe) => {
    try {
      const createNewRecipe = await createRecipe(recipe);

      const getCreatedRecipeId = await getRecipe(createNewRecipe);

      return getCreatedRecipeId;
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
  error: "",
};

export const createRecipeSlice = createSlice({
  name: "recipe/create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRecipeThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const recipePayload = action.payload;

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

      state.ingredients = [...state.ingredients, ...ingredients];

      state.cookingTimeInMinutes = cookingTimeInMinutes;

      state.servings = servings;

      state.imageURL = imageURL;

      state.createdAt = new Date().toDateString();

      state.authorId = authorId;
    });

    builder.addCase(createRecipeThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default createRecipeSlice.reducer;
