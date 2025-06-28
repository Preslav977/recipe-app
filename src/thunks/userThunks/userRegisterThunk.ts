import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User/User";
import { createUser } from "../../firebaseConfig/firebaseconfig";
import { createUseFavoriteList } from "../../firebaseConfig/firebaseconfig";
import { auth } from "../../firebaseConfig/firebaseconfig";

export const userRegisterThunk = createAsyncThunk(
  "user/register",
  async (userRegister: User) => {
    try {
      const response = await createUser(
        auth,
        userRegister.email,
        userRegister.password,
      );

      const { email, uid, emailVerified } = response.user;

      //doesn't return anything
      const createUserFavoriteList = await createUseFavoriteList();

      return { email, uid, emailVerified };
    } catch (error) {
      throw error;
    }
  },
);

const initialState: User = {
  uid: "",
  email: "",
  password: "",
  confirm_password: "",
  emailVerified: false,
  favorites: [],
  loading: "idle",
};

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(userRegisterThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const userRegister = action.payload;

      const { email, uid, emailVerified } = userRegister;

      state.email = email!;

      state.uid = uid;

      state.emailVerified = emailVerified;
    });

    builder.addCase(userRegisterThunk.rejected, (state, action) => {
      state.loading = "failed";

      state.error = "Email in use! Choose a different one!";
    });
  },
});

export default userRegisterSlice.reducer;
