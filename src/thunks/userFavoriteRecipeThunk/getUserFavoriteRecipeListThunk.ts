import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserFavoriteList } from "../../interfaces/UserFavoriteList/UserFavoriteList";
import { getUserFavoriteList } from "../../firebaseConfig/firebaseconfig";

export const getUserFavoriteRecipeListThunk = createAsyncThunk(
  "user/getFavoriteRecipeList",
  async (userId: string) => {
    try {
      const getUserFavoriteRecipeList = await getUserFavoriteList(userId);

      return getUserFavoriteRecipeList;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: UserFavoriteList = {
  email: "",
  favorites: [],
  id: "",
  loading: "idle",
  error: "",
};

export const getUserFavoriteRecipeListSlice = createSlice({
  name: "user/getFavoriteRecipeList",
  initialState,
  reducers: {
    resetUserList(state) {
      Object.assign(state, initialState);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getUserFavoriteRecipeListThunk.fulfilled,
      (state, action) => {
        state.loading = "succeeded";

        const userFavoriteRecipeList = action.payload;

        const { email, id, favorites } = userFavoriteRecipeList!;

        state.email = email;

        state.id = id;

        state.favorites = [...favorites];
      },
    );

    builder.addCase(
      getUserFavoriteRecipeListThunk.rejected,
      (state, action) => {
        state.loading = "failed";

        state.error =
          "Failed to fetch the favorite recipes. Check if you are logged in!";
      },
    );
  },
});
export const { resetUserList } = getUserFavoriteRecipeListSlice.actions;
export default getUserFavoriteRecipeListSlice.reducer;
