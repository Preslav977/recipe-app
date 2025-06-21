import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../thunks/userThunks/userRegisterThunk";
import userLoginReducer from "../thunks/userThunks/userLoginThunk";
import createRecipeReducer from "../thunks/recipeThunks/createRecipeThunk";
import getAllRecipesReducer from "../thunks/recipeThunks/getAllRecipesThunk";
import getRecipeReducer from "../thunks/recipeThunks/getRecipeThunk";

const store = configureStore({
  reducer: {
    userRegisterThunk: userRegisterReducer,
    userLoginThunk: userLoginReducer,
    createRecipeThunk: createRecipeReducer,
    getAllRecipesThunk: getAllRecipesReducer,
    getRecipeThunk: getRecipeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
