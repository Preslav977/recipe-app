import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../thunks/userThunks/userRegisterThunk";
import userLoginReducer from "../thunks/userThunks/userLoginThunk";
import createRecipeReducer from "../thunks/recipeThunks/createRecipeThunk";
import getAllRecipesReducer from "../thunks/recipeThunks/getAllRecipesThunk";
import getRecipeReducer from "../thunks/recipeThunks/getRecipeThunk";
import updateRecipeReducer from "../thunks/recipeThunks/updateRecipeThunk";
import deleteRecipeReducer from "../thunks/recipeThunks/deleteRecipeThunk";
import getUserFavoriteRecipeListReducer from "../thunks/userFavoriteRecipeThunk/getUserFavoriteRecipeListThunk";
import addRecipeUserFavoriteRecipeListReducer from "../thunks/userFavoriteRecipeThunk/addRecipeUserFavoriteRecipeListThunk";
import removeRecipeUserFavoriteRecipeListReducer from "../thunks/userFavoriteRecipeThunk/removeRecipeUserFavoriteRecipeListThunk";

const store = configureStore({
  reducer: {
    userRegisterThunk: userRegisterReducer,
    userLoginThunk: userLoginReducer,
    createRecipeThunk: createRecipeReducer,
    getAllRecipesThunk: getAllRecipesReducer,
    getRecipeThunk: getRecipeReducer,
    updateRecipeThunk: updateRecipeReducer,
    deleteRecipeThunk: deleteRecipeReducer,
    getUserFavoriteRecipeListThunk: getUserFavoriteRecipeListReducer,
    addRecipeUserFavoriteRecipeListThunk:
      addRecipeUserFavoriteRecipeListReducer,
    removeRecipeUserFavoriteRecipeListThunk:
      removeRecipeUserFavoriteRecipeListReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
