import { AuthProviderState } from "@/components/AuthProvider";
import { createContext } from "react";

export const initialState: AuthProviderState = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  signup: () => {},
};

export const AuthContext = createContext<AuthProviderState>(initialState);
