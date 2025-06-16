import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/userInterface/UserInterface";
import { loginUser } from "../auth/firebaseAuth";
import { auth } from "../firebaseConfig/firebaseconfig";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async (user: UserInterface) => {
    const response = await loginUser(auth, user.email, user.password);

    console.log(response);
  },
);

const initialState: UserInterface = {
  email: "",
  password: "",
  loading: "idle",
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      console.log(state, action);
    });

    builder.addCase(userLoginThunk.rejected, (state, action) => {});
  },
});

export default userLoginSlice.reducer;
