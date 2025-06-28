import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User/User";
import { signOutUser } from "../../firebaseConfig/firebaseconfig";
import { persistor } from "../../store/store";
import { logout } from "./userLoginThunk";

export const userLogoutThunk = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    try {
      const response = await signOutUser();
      await persistor.purge();
      dispatch(logout());
      return response;
    } catch (error) {
      throw error;
    }
  },
);

const initialState: User = {
  uid: "",
  email: "",
  password: "",
  emailVerified: false,
  favorites: [],
  isUserLoggedIn: false,
  loading: "idle",
  error: "",
};

export const userLogoutSlice = createSlice({
  name: "userLogout",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(userLogoutThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      state.email = "";

      state.uid = "";

      state.emailVerified = false;

      state.isUserLoggedIn = false;
    });

    builder.addCase(userLogoutThunk.rejected, (state, action) => {
      state.loading = "failed";

      state.isUserLoggedIn = false;

      state.error = "Logout failed!";
    });
  },
});

export default userLogoutSlice.reducer;
