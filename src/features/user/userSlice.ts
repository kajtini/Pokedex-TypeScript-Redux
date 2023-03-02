import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { auth } from "../../config/firebase";

interface UserInfo {
  displayName: string;
  email: string;
  uid: string;
}

interface UserSliceState {
  user: UserInfo | null;
}

const initialState: UserSliceState = {
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
