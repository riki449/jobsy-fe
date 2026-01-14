"use server";

import { SESSION_COOKIE_NAME } from "@/src/config/auth.config";
import { cookies } from "next/headers";
import { loginApi } from "../api/authApi";
import { LoginFormValues } from "../types";

// This action runs on the server
export async function loginAction(data: LoginFormValues) {
  try {
    // 1. Call your existing Backend API
    const response = await loginApi(data);
    
    if (!response?.tokens?.access) {
      return { error: "Invalid credentials" };
    }

    const token = response.tokens.access;
    const cookieStore = await cookies();

    // 2. Set HTTP Only Cookie for Middleware
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });

    // 3. Optional: Pre-fetch user type to determine redirect URL
    // (You can also do this on the client side, but server side is faster)
    // const userTypeResponse = await checkUserTypeApi({ email: data.email });

    return { 
      success: true, 
      token: token,
      // userType: userTypeResponse?.data 
    };

  } catch (error: any) {
    console.error("Login Action Detailed Error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Extract meaningful error message
    let errorMessage = "Something went wrong during login";
    
    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    return { error: errorMessage };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return { success: true };
}
