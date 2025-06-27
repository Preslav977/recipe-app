import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRecipe } from "../../firebaseConfig/firebaseconfig";

export const deleteRecipeThunk = createAsyncThunk(
  "recipe/deleteRecipe",
  async (recipeId: string) => {
    try {
      const deleteRecipeById = await deleteRecipe(recipeId);

      return deleteRecipeById;
    } catch (error) {
      throw error;
    }
  },
);

interface DeletedRecipe {
  id: string;
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}

const initialState: DeletedRecipe = {
  id: "",
  loading: "idle",
  error: "",
};

export const deleteRecipeSlice = createSlice({
  name: "recipe/deleteRecipe",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(deleteRecipeThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const id = action.payload;

      state.id = id;
    });

    builder.addCase(deleteRecipeThunk.rejected, (state, action) => {
      state.loading = "failed";

      state.error =
        "Failed to delete a recipe. Check if correct ID is provided!";
    });
  },
});

export default deleteRecipeSlice.reducer;
