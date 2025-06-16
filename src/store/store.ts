import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../thunks/userLoginThunk";

const store = configureStore({
  reducer: {
    userLoginThunk: userLoginReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
