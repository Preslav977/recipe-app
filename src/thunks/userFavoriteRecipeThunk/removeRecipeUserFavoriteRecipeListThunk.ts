import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeFavoriteRecipe } from "../../services/userFavoriteRecipes/removeFavoriteRecipe";
import { UserFavoriteList } from "../../interfaces/UserFavoriteList/UserFavoriteList";

export const removeRecipeUserFavoriteRecipeListThunk = createAsyncThunk(
  "user/removeRecipeFavoriteRecipeList",

  async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
    try {
      const removeRecipeFromUserFavoriteList = await removeFavoriteRecipe(
        userId,
        recipeId,
      );

      return removeRecipeFromUserFavoriteList;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: UserFavoriteList = {
  id: "",
  favorites: [],
  loading: "idle",
};

export const removeRecipeUserFavoriteRecipeListSlice = createSlice({
  name: "user/removeRecipeFavoriteRecipeList",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      removeRecipeUserFavoriteRecipeListThunk.fulfilled,
      (state, action) => {
        state.loading = "succeeded";

        const getAllNewFilteredUserRecipeIdsFromFavoriteList = action.payload;

        const filterRemoveRecipesIds = state.favorites.filter(
          (id) => !getAllNewFilteredUserRecipeIdsFromFavoriteList?.includes(id),
        );

        state.favorites = filterRemoveRecipesIds;
      },
    );

    builder.addCase(
      removeRecipeUserFavoriteRecipeListThunk.rejected,
      (state, action) => {
        state.loading = "failed";

        state.error =
          "Failed to remove favorite recipe. Check if an ID is provided!";
      },
    );
  },
});

export default removeRecipeUserFavoriteRecipeListSlice.reducer;
