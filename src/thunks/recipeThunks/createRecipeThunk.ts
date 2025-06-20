import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { createRecipe } from "../../firebaseConfig/firebaseconfig";
import { getRecipe } from "../../firebaseConfig/firebaseconfig";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const createRecipeThunk = createAsyncThunk(
  "recipe/create",
  async (recipe: Recipe) => {
    const createNewRecipe = await createRecipe(recipe);

    const getCreatedRecipeId = await getRecipe(createNewRecipe);

    return getCreatedRecipeId;
  },
);

const initialState: Recipe = {
  title: "",
  description: "",
  ingredients: [""],
  instructions: "",
  cookingTimeInMinutes: 0,
  servings: 0,
  imageURL: "",
  createdAt: "",
  authorId: "",
  error: "",
};

export const createRecipeSlice = createSlice({
  name: "recipe/create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRecipeThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const getLoggedUserId = useSelector(
        (state: RootState) => state.userLoginThunk.uid,
      );

      const recipePayload = action.payload;

      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTimeInMinutes,
        servings,
        imageURL,
      } = recipePayload;

      state.title = title;

      state.description = description;

      state.instructions = instructions;

      state.ingredients = [...state.ingredients, ...ingredients];

      state.cookingTimeInMinutes = cookingTimeInMinutes;

      state.servings = servings;

      state.imageURL = imageURL;

      state.createdAt = new Date().toDateString();

      state.authorId = getLoggedUserId!;
    });

    builder.addCase(createRecipeThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default createRecipeSlice.reducer;
