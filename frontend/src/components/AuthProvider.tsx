import { AuthContext } from "@/context/authContext";
import apiClient from "@/utils/apiClient";
import { useCallback, useMemo, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type SignupParams = {
  email: string;
  username: string;
  password: string;
};

export type User = {
  username: string;
  email: string;
  token: string;
  isAdmin: boolean;
  createdAt: string;
  lastUpdatedAt: string;
};

export type AuthProviderState = {
  user: User | null;
  isLoggedIn: boolean;
  login: ({ username, password }: LoginParams) => void;
  logout: () => void;
  signup: ({ email, username, password }: SignupParams) => void;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    async ({ username, password }: LoginParams) => {
      try {
        const response = await apiClient.post("/users/login", {
          username: username,
          password: password,
        });
        const fetchedUser = response.data as User;
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
      }
    },
    [setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const signup = useCallback(
    async ({ email, username, password }: SignupParams) => {
      try {
        const response = await apiClient.post("/users/signup", {
          email,
          username,
          password,
        });
        const fetchedUser = response.data as User;
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
      }
    },
    [setUser],
  );

  const isLoggedIn = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
