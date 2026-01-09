"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loginSuccess({ access: token, refresh: "" }));
    }
  }, [dispatch]);

  return null;
}

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AuthInit />
          {children}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
