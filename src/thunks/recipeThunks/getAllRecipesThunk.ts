import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRecipes } from "../../firebaseConfig/firebaseconfig";
import { Recipes } from "../../interfaces/Recipes/Recipes";

export const getAllRecipesThunk = createAsyncThunk(
  "recipes/getRecipes",

  async () => {
    try {
      const getAllRecipesFromFireBase = await getAllRecipes();

      return getAllRecipesFromFireBase;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: Recipes = {
  recipes: [],
  loading: "idle",
  error: "",
};

export const getRecipesSlice = createSlice({
  name: "recipe/getRecipes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllRecipesThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const recipesPayload = action.payload;

      recipesPayload.forEach((recipes) => {
        if (!state.recipes.some((obj) => obj.title === recipes.title)) {
          state.recipes = [...state.recipes, recipes];
        }
      });
    });

    builder.addCase(getAllRecipesThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default getRecipesSlice.reducer;
