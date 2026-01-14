import { Role } from "@/src/constants/roles";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CheckAccountType, Tokens, UserType } from "../types";

// State Interface
interface AuthState {
  // Data
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  accountName: string | null;
  email: string | null;
  id: string | null;

  // Actions
  login: (tokens: Tokens) => void;
  setUserType: (info: CheckAccountType) => void;
  logout: () => void;
}

// Create Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      token: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      userType: null,
      accountName: null,
      email: null,
      id: null,

      // Actions
      login: (tokens: Tokens) =>
        set({
          token: tokens.access,
          refreshToken: tokens.refresh,
          isAuthenticated: true,
        }),

      setUserType: (info: CheckAccountType) =>
        set({
          userType: info.type,
          accountName: info.main_account.account_name,
          email: info.main_account.email,
          id: info.main_account.id,
        }),

      logout: () => {
        // Clear Local Storage (if needed manually) or cookies
        // localStorage.removeItem("token");
        set({
          token: null,
          refreshToken: null,
          role: null,
          isAuthenticated: false,
          userType: null,
          accountName: null,
          email: null,
          id: null,
        });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      // partialize: (state) => ({ token: state.token }), // Optional: whitelist specific fields
    }
  )
);
