import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/User/User";
import { loginUser } from "../firebaseConfig/firebaseconfig";
import { auth } from "../firebaseConfig/firebaseconfig";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (userLogin: User) => {
    const response = await loginUser(auth, userLogin.email, userLogin.password);

    const { email, uid, emailVerified } = response.user;

    console.log(email, uid, emailVerified);

    return { email, uid, emailVerified };
  },
);

const initialState: User = {
  uid: "",
  email: "",
  password: "",
  emailVerified: false,
  favorites: [],
  loading: "idle",
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

      console.log(email, uid, emailVerified);

      state.email = email!;

      state.uid = uid;

      state.emailVerified = emailVerified;
    });

    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default userLoginSlice.reducer;
