import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/userInterface/UserInterface";
import { loginUser } from "../auth/firebaseAuth";
import { auth } from "../firebaseConfig/firebaseconfig";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (userLogin: UserInterface) => {
    const response = await loginUser(auth, userLogin.email, userLogin.password);

    const { user, email, password, uid, emailVerified }: UserInterface =
      response.user;

    return { user, email, password, uid, emailVerified };
  },
);

const initialState: UserInterface = {
  uid: "",
  email: "",
  password: "",
  emailVerified: false,
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

      const { email, password, uid, emailVerified }: UserInterface = userLogin;

      state.email = email;

      state.password = password;

      state.uid = uid;

      state.emailVerified = emailVerified;
    });

    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default userLoginSlice.reducer;
