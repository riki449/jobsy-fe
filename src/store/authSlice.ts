import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../constants/roles";
import { CheckAccountType, Tokens, UserType } from "../types/login";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  accountName: string | null;
  email: string | null;
  id: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  role: null,
  isAuthenticated: false,
  userType: null,
  accountName: null,
  email: null,
  id: null,
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
      state.userType = null;
      state.accountName = null;
      state.email = null;
      state.id = null;
      localStorage.setItem("token", "");
    },
    saveUserType: (state, action: PayloadAction<CheckAccountType>) => {
      state.userType = action.payload.type;
      state.accountName = action.payload.main_account.account_name;
      state.email = action.payload.main_account.email;
      state.id = action.payload.main_account.id;
    },
  },
});
export const { loginSuccess, logout, saveUserType } = authSlice.actions;
export default authSlice.reducer;
