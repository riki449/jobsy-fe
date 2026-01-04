import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../constants/roles";
import { Tokens } from "../types/login";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<Tokens>) {
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.setItem("token", "");
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
