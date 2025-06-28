import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRecipes } from "../../firebaseConfig/firebaseconfig";
import { Recipes } from "../../interfaces/Recipes/Recipes";
import { revertAllSlicesToInitialState } from "../../actions/revertAllSlicesToInitialState";

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
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllRecipesThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const recipesPayload = action.payload;

      state.recipes = recipesPayload;
    });

    builder.addCase(getAllRecipesThunk.rejected, (state, action) => {
      state.loading = "failed";

      state.error = "Failed to fetch the recipes. Check if they exists!";

      state.recipes = [];
    });
  },
});

export const { reset } = getRecipesSlice.actions;
export default getRecipesSlice.reducer;
