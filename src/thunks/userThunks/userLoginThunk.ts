import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User/User";
import { loginUser } from "../../firebaseConfig/firebaseconfig";
import { auth } from "../../firebaseConfig/firebaseconfig";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (userLogin: User) => {
    try {
      const response = await loginUser(
        auth,
        userLogin.email,
        userLogin.password,
      );

      const { email, uid, emailVerified } = response.user;

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
  emailVerified: false,
  favorites: [],
  isUserLoggedIn: false,
  loading: "idle",
  error: "",
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const userLogin = action.payload;

      // console.log(userLogin);

      const { email, uid, emailVerified } = userLogin;

      state.email = email!;

      state.uid = uid;

      state.emailVerified = emailVerified;

      state.isUserLoggedIn = true;
    });

    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.loading = "failed";

      state.isUserLoggedIn = false;

      state.error = "Login failed. Check you credentials!";
    });
  },
});

export default userLoginSlice.reducer;
