import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFavoriteRecipe } from "../../services/userFavoriteRecipes/addFavoriteRecipe";
import { UserFavoriteList } from "../../interfaces/UserFavoriteList/UserFavoriteList";

export const addRecipeUserFavoriteRecipeListThunk = createAsyncThunk(
  "user/addRecipeFavoriteRecipeList",

  async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
    try {
      const addNewRecipeToUserFavoriteRecipeList = await addFavoriteRecipe(
        userId,
        recipeId,
      );

      return addNewRecipeToUserFavoriteRecipeList;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: UserFavoriteList = {
  id: "",
  favorites: [],
  loading: "idle",
  error: "",
};

export const addRecipeUserFavoriteRecipeListSlice = createSlice({
  name: "user/addRecipeFavoriteRecipeList",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      addRecipeUserFavoriteRecipeListThunk.fulfilled,
      (state, action) => {
        state.loading = "succeeded";

        const getAllIdsFromFavoriteRecipeList = action.payload;

        const filteredNewIds = getAllIdsFromFavoriteRecipeList.map(
          (recipeId: string) => {
            if (!state.favorites.includes(recipeId)) {
              state.favorites = [recipeId];
            }
          },
        );

        // const [firstRecipeId, ...rest] = getAllIdsFromFavoriteRecipeList;

        // state.favorites = [firstRecipeId, ...rest];
      },
    );

    builder.addCase(
      addRecipeUserFavoriteRecipeListThunk.rejected,
      (state, action) => {
        state.loading = "failed";

        state.error =
          "Failed to add a recipe to favorites. Check if an ID is provided!";

        state.favorites = [];
      },
    );
  },
});

export default addRecipeUserFavoriteRecipeListSlice.reducer;
