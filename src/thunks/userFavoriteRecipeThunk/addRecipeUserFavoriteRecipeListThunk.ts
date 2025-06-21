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

        const [firstRecipeId, ...rest] = getAllIdsFromFavoriteRecipeList;

        state.favorites = [...state.favorites, firstRecipeId, ...rest];
      },
    );

    builder.addCase(
      addRecipeUserFavoriteRecipeListThunk.rejected,
      (state, action) => {
        state.loading = "failed";
      },
    );
  },
});

export default addRecipeUserFavoriteRecipeListSlice.reducer;
