import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRecipe } from "../../firebaseConfig/firebaseconfig";

export const deleteRecipeThunk = createAsyncThunk(
  "recipe/deleteRecipe",
  async (recipeId: string) => {
    const deleteRecipeById = await deleteRecipe(recipeId);

    return deleteRecipeById;
  },
);

interface DeletedRecipe {
  loading?: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}

const initialState: DeletedRecipe = {
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
    });

    builder.addCase(deleteRecipeThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default deleteRecipeSlice.reducer;
