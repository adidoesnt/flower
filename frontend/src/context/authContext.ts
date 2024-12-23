/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthProviderState } from "@/components/AuthProvider";
import { createContext } from "react";

export const initialState: AuthProviderState = {
  isLoggedIn: false,
  user: null,
  login: (_setError: (msg: string) => void, _params: Record<string, any>) => {},
  logout: () => {},
  signup: (
    _setError: (msg: string) => void,
    _params: Record<string, any>,
  ) => {},
};

export const AuthContext = createContext<AuthProviderState>(initialState);
