import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/userInterface/UserInterface";
import { loginUser } from "../firebaseConfig/firebaseconfig";
import { auth } from "../firebaseConfig/firebaseconfig";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (userLogin: UserInterface) => {
    const response = await loginUser(auth, userLogin.email, userLogin.password);

    const { email, uid, emailVerified } = response.user;

    return { email, uid, emailVerified };
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

      // console.log(userLogin);

      const { email, uid, emailVerified } = userLogin;

      if (email !== null) {
        state.email = email;
      }

      state.uid = uid;

      state.emailVerified = emailVerified;
    });

    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export default userLoginSlice.reducer;
