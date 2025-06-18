import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../thunks/userLoginThunk";
import userRegisterReducer from "../thunks/userRegisterThunk";

const store = configureStore({
  reducer: {
    userRegisterThunk: userRegisterReducer,
    userLoginThunk: userLoginReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
