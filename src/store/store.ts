import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userRegisterReducer from "../thunks/userThunks/userRegisterThunk";
import userLoginReducer from "../thunks/userThunks/userLoginThunk";
import userLogoutReducer from "../thunks/userThunks/userLogoutThunk";
import createRecipeReducer from "../thunks/recipeThunks/createRecipeThunk";
import getAllRecipesReducer from "../thunks/recipeThunks/getAllRecipesThunk";
import getRecipeReducer from "../thunks/recipeThunks/getRecipeThunk";
import updateRecipeReducer from "../thunks/recipeThunks/updateRecipeThunk";
import deleteRecipeReducer from "../thunks/recipeThunks/deleteRecipeThunk";
import getUserFavoriteRecipeListReducer from "../thunks/userFavoriteRecipeThunk/getUserFavoriteRecipeListThunk";
import addRecipeUserFavoriteRecipeListReducer from "../thunks/userFavoriteRecipeThunk/addRecipeUserFavoriteRecipeListThunk";
import removeRecipeUserFavoriteRecipeListReducer from "../thunks/userFavoriteRecipeThunk/removeRecipeUserFavoriteRecipeListThunk";

const rootReducer = combineReducers({
  userRegisterThunk: userRegisterReducer,
  userLoginThunk: userLoginReducer,
  userLogoutThunk: userLogoutReducer,
  createRecipeThunk: createRecipeReducer,
  getAllRecipesThunk: getAllRecipesReducer,
  getRecipeThunk: getRecipeReducer,
  updateRecipeThunk: updateRecipeReducer,
  deleteRecipeThunk: deleteRecipeReducer,
  getUserFavoriteRecipeListThunk: getUserFavoriteRecipeListReducer,
  addRecipeUserFavoriteRecipeListThunk: addRecipeUserFavoriteRecipeListReducer,
  removeRecipeUserFavoriteRecipeListThunk:
    removeRecipeUserFavoriteRecipeListReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userLoginThunk"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
