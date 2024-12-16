import { AuthContext } from "@/context/authContext";
import { useCallback, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthProviderState = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  signup: () => void;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const signup = useCallback(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
