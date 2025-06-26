import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRecipe } from "../../firebaseConfig/firebaseconfig";
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const getRecipeThunk = createAsyncThunk(
  "recipes/getRecipe",

  async (recipeId: string) => {
    try {
      const getRecipeFromFireBase = await getRecipe(recipeId);

      return getRecipeFromFireBase;
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

export const getRecipeSlice = createSlice({
  name: "recipe/getRecipe",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getRecipeThunk.fulfilled, (state, action) => {
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

      state.ingredients = [...ingredients];

      state.cookingTimeInMinutes = cookingTimeInMinutes;

      state.servings = servings;

      state.imageURL = imageURL;

      state.createdAt = new Date().toDateString();

      state.authorId = authorId;
    });

    builder.addCase(getRecipeThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default getRecipeSlice.reducer;
